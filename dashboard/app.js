/**
 * PZEM Monitor — Logique Frontend & Synchronisation Supabase PostgreSQL Realtime
 */

// 1. État global de l'application
const state = {
  isSimulator: false,
  simulatorInterval: null,
  supabaseUrl: localStorage.getItem('pzem_supabase_url') || 'https://jjwudgxkitmmyjhzafis.supabase.co',
  supabaseKey: localStorage.getItem('pzem_supabase_key') || 'sb_publishable_Ulogmr9FDFtsy3i8dXqLJg_pKZHQa5_',
  supabaseClient: null,
  realtimeSubscription: null,
  maxPoints: 30,
  powerLimit: parseFloat(localStorage.getItem('pzem_power_limit')) || 3500,
  voltMin: parseFloat(localStorage.getItem('pzem_volt_min')) || 207,
  voltMax: parseFloat(localStorage.getItem('pzem_volt_max')) || 253,
  simulatedEnergy: 12.450,
  historyData: []
};

// 2. Gestion des Onglets
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  
  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.remove('bg-primary-container', 'text-white');
    btn.classList.add('text-on-surface-variant');
  });

  const activeBtn = document.getElementById(`nav-${tabId}`);
  if (activeBtn) {
    activeBtn.classList.remove('text-on-surface-variant');
    activeBtn.classList.add('bg-primary-container', 'text-white');
  }
}

// 3. Initialisation des Graphiques Chart.js
let liveChart, viChart, pfChart, historyBarChart;

function initCharts() {
  const chartTextColor = '#8d90a0';
  const gridColor = 'rgba(45, 52, 73, 0.4)';

  // A. Graphique Puissance en Temps Réel
  const ctxLive = document.getElementById('liveChart')?.getContext('2d');
  if (ctxLive) {
    liveChart = new Chart(ctxLive, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Puissance Active (W)',
          data: [],
          borderColor: '#4cd7f6',
          backgroundColor: 'rgba(76, 215, 246, 0.1)',
          fill: true,
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 400 },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: chartTextColor, font: { family: 'JetBrains Mono', size: 10 } } },
          y: { grid: { color: gridColor }, ticks: { color: chartTextColor, font: { family: 'JetBrains Mono', size: 10 } }, beginAtZero: true }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  // B. Oscilloscope Tension / Courant
  const ctxVI = document.getElementById('viChart')?.getContext('2d');
  if (ctxVI) {
    viChart = new Chart(ctxVI, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Tension (V)',
            data: [],
            borderColor: '#b4c5ff',
            yAxisID: 'yVoltage',
            tension: 0.3,
            borderWidth: 1.5,
            pointRadius: 0
          },
          {
            label: 'Courant (A)',
            data: [],
            borderColor: '#45dfa4',
            yAxisID: 'yCurrent',
            tension: 0.3,
            borderWidth: 1.5,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: chartTextColor, font: { size: 9 } } },
          yVoltage: { type: 'linear', position: 'left', min: 200, max: 260, grid: { color: gridColor }, ticks: { color: '#b4c5ff' } },
          yCurrent: { type: 'linear', position: 'right', min: 0, max: 20, grid: { display: false }, ticks: { color: '#45dfa4' } }
        },
        plugins: {
          legend: { labels: { color: '#dae2fd', font: { family: 'Inter', size: 11 } } }
        }
      }
    });
  }

  // C. Graphique Qualité Réseau
  const ctxPF = document.getElementById('pfChart')?.getContext('2d');
  if (ctxPF) {
    pfChart = new Chart(ctxPF, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Facteur de Puissance (Cos φ)',
          data: [],
          borderColor: '#45dfa4',
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: chartTextColor, font: { size: 9 } } },
          y: { min: 0.5, max: 1.0, grid: { color: gridColor }, ticks: { color: '#45dfa4' } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  // D. Graphique Consommation Journalière (Barres)
  const ctxHist = document.getElementById('historyBarChart')?.getContext('2d');
  if (ctxHist) {
    historyBarChart = new Chart(ctxHist, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        datasets: [{
          label: 'Consommation (kWh)',
          data: [14.2, 16.8, 12.5, 18.1, 15.4, 22.3, 19.8],
          backgroundColor: '#2563eb',
          borderRadius: 6,
          hoverBackgroundColor: '#4cd7f6'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { display: false }, ticks: { color: chartTextColor } },
          y: { grid: { color: gridColor }, ticks: { color: chartTextColor }, beginAtZero: true }
        },
        plugins: { legend: { display: false } }
      }
    });
  }
}

// 4. Mise à jour de l'interface avec de nouvelles mesures
function updateUI(data) {
  if (!data) return;

  const v = parseFloat(data.voltage) || 0;
  const i = parseFloat(data.current) || 0;
  const p = parseFloat(data.power) || 0;
  const e = parseFloat(data.energy) || 0;
  const f = parseFloat(data.frequency) || 50.0;
  const pf = parseFloat(data.pf) || 1.0;

  // Mise à jour des valeurs textuelles
  document.getElementById('val-power').textContent = p.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  document.getElementById('val-voltage').textContent = v.toFixed(1);
  document.getElementById('val-current').textContent = i.toFixed(3);
  document.getElementById('val-energy').textContent = e.toFixed(3);
  document.getElementById('val-pf').textContent = pf.toFixed(2);
  document.getElementById('val-freq').textContent = `${f.toFixed(1)} Hz`;

  // Coût estimé (0.2516 € / kWh)
  const cost = (e * 0.2516).toFixed(2);
  document.getElementById('val-cost').textContent = `${cost} €`;

  // Pourcentages et jauges
  const powerPct = Math.min(100, Math.round((p / 7000) * 100));
  document.getElementById('power-percent').textContent = `${powerPct}% (${(p / 1000).toFixed(2)} kW)`;
  document.getElementById('power-bar').style.width = `${powerPct}%`;

  const currentPct = Math.min(100, Math.round((i / 16) * 100));
  document.getElementById('current-percent').textContent = `${currentPct}% (16A max)`;

  // Horodatage
  const now = new Date();
  const timeStr = now.toLocaleTimeString('fr-FR');
  document.getElementById('last-sync-time').textContent = timeStr;

  // Signal Wi-Fi
  if (data.wifi_rssi) {
    document.getElementById('header-rssi').textContent = `Signal : ${data.wifi_rssi} dBm`;
  }

  // Vérification des Alertes
  checkAlerts(p, v, timeStr);

  // Mise à jour des graphiques
  appendChartPoint(timeStr, p, v, i, pf);

  // Sauvegarde dans l'historique exportable
  state.historyData.push({ timestamp: data.created_at || now.toISOString(), voltage: v, current: i, power: p, energy: e, frequency: f, pf: pf });
  if (state.historyData.length > 500) state.historyData.shift();
}

// 5. Ajout des points sur les graphiques
function appendChartPoint(timeLabel, power, voltage, current, pf) {
  if (liveChart) {
    liveChart.data.labels.push(timeLabel);
    liveChart.data.datasets[0].data.push(power);
    if (liveChart.data.labels.length > state.maxPoints) {
      liveChart.data.labels.shift();
      liveChart.data.datasets[0].data.shift();
    }
    liveChart.update('none');
  }

  if (viChart) {
    viChart.data.labels.push(timeLabel);
    viChart.data.datasets[0].data.push(voltage);
    viChart.data.datasets[1].data.push(current);
    if (viChart.data.labels.length > state.maxPoints) {
      viChart.data.labels.shift();
      viChart.data.datasets[0].data.shift();
      viChart.data.datasets[1].data.shift();
    }
    viChart.update('none');
  }

  if (pfChart) {
    pfChart.data.labels.push(timeLabel);
    pfChart.data.datasets[0].data.push(pf);
    if (pfChart.data.labels.length > state.maxPoints) {
      pfChart.data.labels.shift();
      pfChart.data.datasets[0].data.shift();
    }
    pfChart.update('none');
  }
}

// 6. Gestion des Alertes
function checkAlerts(power, voltage, timeStr) {
  const overpowerAlertEl = document.getElementById('overpower-alert');
  const alertBadge = document.getElementById('alert-badge');
  const alertValEl = document.getElementById('alert-val');

  let hasAlert = false;

  if (power > state.powerLimit) {
    hasAlert = true;
    overpowerAlertEl.classList.remove('hidden');
    alertValEl.textContent = `${power.toFixed(0)} W > ${state.powerLimit} W`;
    logAlert(`⚠️ Surpuissance : ${power.toFixed(0)} W (seuil: ${state.powerLimit} W)`, timeStr, 'error');
  } else {
    overpowerAlertEl.classList.add('hidden');
  }

  if (voltage < state.voltMin || voltage > state.voltMax) {
    hasAlert = true;
    logAlert(`⚡ Anomalie Tension Réseau : ${voltage.toFixed(1)} V (Norme: ${state.voltMin}-${state.voltMax}V)`, timeStr, 'warning');
  }

  if (hasAlert) {
    alertBadge.classList.remove('hidden');
  }
}

function logAlert(message, timeStr, type = 'error') {
  const list = document.getElementById('alert-logs-list');
  if (!list) return;

  const borderColor = type === 'error' ? 'border-error' : 'border-secondary';
  const item = document.createElement('div');
  item.className = `p-3 rounded-lg bg-surface-container flex items-center justify-between border-l-4 ${borderColor}`;
  item.innerHTML = `<span class="text-white">${message}</span><span class="text-outline text-[11px]">${timeStr}</span>`;
  list.prepend(item);

  while (list.children.length > 20) {
    list.removeChild(list.lastChild);
  }
}

function clearAlertLogs() {
  const list = document.getElementById('alert-logs-list');
  if (list) list.innerHTML = '';
  document.getElementById('alert-badge').classList.add('hidden');
}

function saveThresholds() {
  state.powerLimit = parseFloat(document.getElementById('cfg-power-limit').value) || 3500;
  state.voltMin = parseFloat(document.getElementById('cfg-volt-min').value) || 207;
  state.voltMax = parseFloat(document.getElementById('cfg-volt-max').value) || 253;

  localStorage.setItem('pzem_power_limit', state.powerLimit);
  localStorage.setItem('pzem_volt_min', state.voltMin);
  localStorage.setItem('pzem_volt_max', state.voltMax);

  alert('✅ Seuils de sécurité enregistrés avec succès !');
}

// 7. Mode Simulateur Démo
function toggleSimulator(enabled) {
  state.isSimulator = enabled;
  if (enabled) {
    if (state.realtimeSubscription) state.realtimeSubscription.unsubscribe();
    document.getElementById('status-text').textContent = 'Simulateur Actif';
    document.getElementById('status-dot').className = 'inline-block h-2 w-2 rounded-full bg-secondary animate-pulse';

    state.simulatorInterval = setInterval(() => {
      const volt = 229.0 + (Math.random() * 4.0 - 2.0);
      const current = 1.5 + Math.random() * 8.0;
      const pf = 0.92 + Math.random() * 0.07;
      const power = volt * current * pf;
      state.simulatedEnergy += (power / 1000) * (2 / 3600);

      updateUI({
        voltage: volt,
        current: current,
        power: power,
        energy: state.simulatedEnergy,
        frequency: 50.0 + (Math.random() * 0.2 - 0.1),
        pf: pf,
        wifi_rssi: -55 + Math.floor(Math.random() * 5)
      });
    }, 2000);
  } else {
    if (state.simulatorInterval) clearInterval(state.simulatorInterval);
    connectSupabase();
  }
}

// 8. Connexion Supabase Realtime
async function connectSupabase() {
  if (!state.supabaseUrl || !state.supabaseKey) {
    document.getElementById('sim-toggle').checked = true;
    toggleSimulator(true);
    return;
  }

  try {
    // Initialisation du client Supabase
    state.supabaseClient = window.supabase.createClient(state.supabaseUrl, state.supabaseKey);

    // 1. Récupérer les 20 dernières mesures pour pré-remplir les graphiques
    const { data: recentRows, error: fetchErr } = await state.supabaseClient
      .from('telemetry')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(20);

    if (!fetchErr && recentRows && recentRows.length > 0) {
      recentRows.forEach(row => updateUI(row));
    }

    // 2. Écouter les insertions en temps réel via Supabase Realtime Channels
    if (state.realtimeSubscription) {
      state.realtimeSubscription.unsubscribe();
    }

    state.realtimeSubscription = state.supabaseClient
      .channel('telemetry_live')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'telemetry' },
        (payload) => {
          document.getElementById('status-text').textContent = 'Supabase Direct';
          document.getElementById('status-dot').className = 'inline-block h-2 w-2 rounded-full bg-tertiary animate-pulse';
          updateUI(payload.new);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          document.getElementById('status-text').textContent = 'Supabase Connecté';
          document.getElementById('status-dot').className = 'inline-block h-2 w-2 rounded-full bg-tertiary';
        }
      });

  } catch (err) {
    console.error('Erreur Supabase:', err);
    document.getElementById('status-text').textContent = 'Erreur Connexion';
    document.getElementById('status-dot').className = 'inline-block h-2 w-2 rounded-full bg-error';
  }
}

function saveSupabaseConfig() {
  const url = document.getElementById('cfg-supabase-url').value.trim();
  const key = document.getElementById('cfg-supabase-key').value.trim();

  if (!url || !key) {
    alert('Veuillez saisir l\'URL du projet Supabase et la clé Anon.');
    return;
  }

  state.supabaseUrl = url;
  state.supabaseKey = key;
  localStorage.setItem('pzem_supabase_url', url);
  localStorage.setItem('pzem_supabase_key', key);

  document.getElementById('sim-toggle').checked = false;
  toggleSimulator(false);
  connectSupabase();
  alert('✅ Configuration Supabase enregistrée !');
}

async function testSupabaseConnection() {
  const url = document.getElementById('cfg-supabase-url').value.trim();
  const key = document.getElementById('cfg-supabase-key').value.trim();

  if (!url || !key) {
    alert('Veuillez remplir l\'URL et la clé Supabase avant de tester.');
    return;
  }

  try {
    const testClient = window.supabase.createClient(url, key);
    const { data, error } = await testClient.from('telemetry').select('id').limit(1);

    if (error) {
      alert(`⚠️ Erreur Supabase : ${error.message}\n(Vérifiez que vous avez bien créé la table "telemetry" avec le script SQL fourni)`);
    } else {
      alert('🎉 Connexion à Supabase et accès à la table "telemetry" réussis !');
    }
  } catch (e) {
    alert(`❌ Impossible de joindre Supabase : ${e.message}`);
  }
}

// 9. Export CSV
function exportCSV() {
  if (state.historyData.length === 0) {
    alert('Aucune donnée à exporter pour le moment.');
    return;
  }

  let csv = 'Timestamp,Tension(V),Courant(A),Puissance(W),Energie(kWh),Frequence(Hz),FacteurPuissance(CosPhi)\n';
  state.historyData.forEach(row => {
    csv += `"${row.timestamp}",${row.voltage},${row.current},${row.power},${row.energy},${row.frequency},${row.pf}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pzem_telemetry_${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '_')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// 10. Démarrage de l'application
window.addEventListener('DOMContentLoaded', () => {
  initCharts();

  const inputUrl = document.getElementById('cfg-supabase-url');
  if (inputUrl && state.supabaseUrl) inputUrl.value = state.supabaseUrl;

  const inputKey = document.getElementById('cfg-supabase-key');
  if (inputKey && state.supabaseKey) inputKey.value = state.supabaseKey;

  const inputPower = document.getElementById('cfg-power-limit');
  if (inputPower) inputPower.value = state.powerLimit;

  if (!state.supabaseUrl || !state.supabaseKey) {
    document.getElementById('sim-toggle').checked = true;
    toggleSimulator(true);
  } else {
    connectSupabase();
  }
});
