// Configuration globale de l'état
const state = {
  powerLimit: 3500, // Watts
  voltMin: 207,
  voltMax: 253,
  historyData: [],
  isSimulator: false,
  simInterval: null,
  // Récupération des clés Supabase depuis le localStorage avec les valeurs par défaut
  supabaseUrl: localStorage.getItem('pzem_supabase_url') || 'https://jjwudgxkitmmyjhzafis.supabase.co',
  supabaseKey: localStorage.getItem('pzem_supabase_key') || 'sb_publishable_Ulogmr9FDFtsy3i8dXqLJg_pKZHQa5_',
  supabaseClient: null,
  realtimeSubscription: null,
  lastSyncTime: 0,
  watchdogTimer: null,
  watchdogTimeout: 20000 // 20s
};

// ==========================================
// 1. Navigation (Onglets)
// ==========================================
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('.nav-item').forEach(el => {
    el.style.background = 'transparent';
    el.style.color = 'var(--theme-muted)';
  });

  document.getElementById('tab-' + tabId).classList.remove('hidden');
  const activeNav = document.getElementById('nav-' + tabId);
  if (activeNav) {
    activeNav.style.background = 'rgba(255,255,255,0.05)';
    activeNav.style.color = 'var(--theme-accent)';
  }
}

// ==========================================
// 2. Gestion des Thèmes
// ==========================================
function toggleThemePanel() {
  const panel = document.getElementById('theme-panel');
  if (panel.classList.contains('hidden')) {
    panel.classList.remove('hidden');
  } else {
    panel.classList.add('hidden');
  }
}

function setTheme(themeName) {
  localStorage.setItem('pzem_theme', themeName);
  const root = document.documentElement;
  
  switch(themeName) {
    case 'minimal':
      root.style.setProperty('--theme-bg', '#f5f5f5');
      root.style.setProperty('--theme-panel', '#ffffff');
      root.style.setProperty('--theme-border', '#e5e5e5');
      root.style.setProperty('--theme-text', '#171717');
      root.style.setProperty('--theme-muted', '#737373');
      root.style.setProperty('--theme-accent', '#000000');
      root.style.setProperty('--theme-danger', '#dc2626');
      break;
    case 'terminal':
      root.style.setProperty('--theme-bg', '#000000');
      root.style.setProperty('--theme-panel', '#000000');
      root.style.setProperty('--theme-border', '#22c55e');
      root.style.setProperty('--theme-text', '#4ade80');
      root.style.setProperty('--theme-muted', '#166534');
      root.style.setProperty('--theme-accent', '#22c55e');
      root.style.setProperty('--theme-danger', '#dc2626');
      break;
    case 'botanical':
      root.style.setProperty('--theme-bg', '#064e3b');
      root.style.setProperty('--theme-panel', '#022c22');
      root.style.setProperty('--theme-border', '#047857');
      root.style.setProperty('--theme-text', '#ecfdf5');
      root.style.setProperty('--theme-muted', '#6ee7b7');
      root.style.setProperty('--theme-accent', '#10b981');
      root.style.setProperty('--theme-danger', '#ef4444');
      break;
    case 'abyss':
      root.style.setProperty('--theme-bg', '#020617');
      root.style.setProperty('--theme-panel', '#0f172a');
      root.style.setProperty('--theme-border', '#1e293b');
      root.style.setProperty('--theme-text', '#f8fafc');
      root.style.setProperty('--theme-muted', '#64748b');
      root.style.setProperty('--theme-accent', '#38bdf8');
      root.style.setProperty('--theme-danger', '#f43f5e');
      break;
    case 'industrial':
    default:
      root.style.setProperty('--theme-bg', '#0a0a0a');
      root.style.setProperty('--theme-panel', '#121212');
      root.style.setProperty('--theme-border', '#333333');
      root.style.setProperty('--theme-text', '#e5e5e5');
      root.style.setProperty('--theme-muted', '#a3a3a3');
      root.style.setProperty('--theme-accent', '#3b82f6');
      root.style.setProperty('--theme-danger', '#ef4444');
      break;
  }
  
  toggleThemePanel();
  updateChartColors();
}

function loadThemeSettings() {
  const savedTheme = localStorage.getItem('pzem_theme') || 'industrial';
  setTheme(savedTheme);
}

// ==========================================
// 3. Graphiques (Chart.js)
// ==========================================
let liveChartInstance = null;
let viChartInstance = null;

const chartData = {
  labels: [],
  power: [],
  voltage: [],
  current: []
};

function initCharts() {
  Chart.defaults.font.family = "'JetBrains Mono', monospace";
  Chart.defaults.color = '#a3a3a3';
  
  const liveCtx = document.getElementById('liveChart').getContext('2d');
  const gradient = liveCtx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)'); 
  gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

  liveChartInstance = new Chart(liveCtx, {
    type: 'line',
    data: {
      labels: chartData.labels,
      datasets: [{
        label: 'Puissance Active (W)',
        data: chartData.power,
        borderColor: 'var(--theme-accent, #3b82f6)',
        backgroundColor: gradient,
        borderWidth: 2,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: {
          grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
          beginAtZero: true
        }
      },
      animation: { duration: 0 }
    }
  });

  const viCtx = document.getElementById('viChart').getContext('2d');
  viChartInstance = new Chart(viCtx, {
    type: 'line',
    data: {
      labels: chartData.labels,
      datasets: [
        {
          label: 'Tension (V)',
          data: chartData.voltage,
          borderColor: '#10b981',
          borderWidth: 1.5,
          tension: 0.2,
          yAxisID: 'y'
        },
        {
          label: 'Courant (A)',
          data: chartData.current,
          borderColor: '#f59e0b',
          borderWidth: 1.5,
          tension: 0.2,
          yAxisID: 'y1'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: { 
          type: 'linear', display: true, position: 'left',
          grid: { color: 'rgba(255,255,255,0.05)' },
          suggestedMin: 200, suggestedMax: 250
        },
        y1: {
          type: 'linear', display: true, position: 'right',
          grid: { drawOnChartArea: false }
        }
      },
      animation: { duration: 0 }
    }
  });
}

function updateChartColors() {
  if(liveChartInstance) {
    const isLight = document.documentElement.style.getPropertyValue('--theme-bg') === '#f5f5f5';
    Chart.defaults.color = isLight ? '#737373' : '#a3a3a3';
    
    const rootStyles = getComputedStyle(document.documentElement);
    const accentColor = rootStyles.getPropertyValue('--theme-accent').trim();
    
    if(accentColor && accentColor.startsWith('#')) {
       liveChartInstance.data.datasets[0].borderColor = accentColor;
    }
    
    liveChartInstance.update();
    viChartInstance.update();
  }
}

function addDataToCharts(label, p, v, i) {
  if (chartData.labels.length > 30) {
    chartData.labels.shift();
    chartData.power.shift();
    chartData.voltage.shift();
    chartData.current.shift();
  }
  chartData.labels.push(label);
  chartData.power.push(p);
  chartData.voltage.push(v);
  chartData.current.push(i);

  if (liveChartInstance) liveChartInstance.update();
  if (viChartInstance) viChartInstance.update();
}

// ==========================================
// 4. Interface Update & Logique
// ==========================================
function updateUI(data) {
  document.getElementById('val-power').textContent = data.power.toFixed(1);
  document.getElementById('val-voltage').textContent = data.voltage.toFixed(1);
  document.getElementById('val-current').textContent = data.current.toFixed(3);
  document.getElementById('val-energy').textContent = data.energy.toFixed(3);
  document.getElementById('val-pf').textContent = data.pf.toFixed(2);
  document.getElementById('val-freq').textContent = data.frequency.toFixed(1);

  const indicator = document.getElementById('live-indicator');
  indicator.classList.remove('hidden');
  indicator.classList.add('flex');
  setTimeout(() => {
    indicator.classList.remove('flex');
    indicator.classList.add('hidden');
  }, 1000);

  const alertBox = document.getElementById('overpower-alert');
  if (data.power > state.powerLimit) {
    alertBox.classList.remove('hidden');
    document.getElementById('alert-val').textContent = data.power.toFixed(0) + ' W';
  } else {
    alertBox.classList.add('hidden');
  }

  const timeLabel = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  addDataToCharts(timeLabel, data.power, data.voltage, data.current);

  resetWatchdog();
}

function renderHistoryTable(dataRows) {
  const tbody = document.getElementById('history-table-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  
  if (!dataRows || dataRows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-6 text-center" style="color: var(--theme-muted);">Aucune donnée pour cette période</td></tr>';
    return;
  }

  dataRows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-4 py-2 border-b" style="border-color: var(--theme-border);">${new Date(r.created_at || Date.now()).toLocaleString('fr-FR')}</td>
      <td class="px-4 py-2 border-b" style="border-color: var(--theme-border);">${r.voltage.toFixed(1)}</td>
      <td class="px-4 py-2 border-b" style="border-color: var(--theme-border);">${r.current.toFixed(3)}</td>
      <td class="px-4 py-2 border-b" style="border-color: var(--theme-border);">${r.power.toFixed(1)}</td>
      <td class="px-4 py-2 border-b" style="border-color: var(--theme-border); color: var(--theme-accent);">${r.energy.toFixed(3)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ==========================================
// 5. Watchdog & Connexion Réelle (Supabase)
// ==========================================
function resetWatchdog() {
  state.lastSyncTime = Date.now();
  if (state.watchdogTimer) clearTimeout(state.watchdogTimer);
  
  document.getElementById('status-text').textContent = 'EN LIGNE';
  document.getElementById('status-dot').style.backgroundColor = 'var(--theme-accent)';

  state.watchdogTimer = setTimeout(() => {
    document.getElementById('status-text').textContent = 'HORS LIGNE';
    document.getElementById('status-dot').style.backgroundColor = 'var(--theme-danger)';
  }, state.watchdogTimeout);
}

async function connectSupabase() {
  if (state.isSimulator) return;

  if (!state.supabaseUrl || !state.supabaseKey) {
    document.getElementById('status-text').textContent = 'CONFIG MANQUANTE';
    document.getElementById('status-dot').style.backgroundColor = 'var(--theme-danger)';
    console.warn("L'URL ou la clé Supabase n'ont pas été trouvés dans le cache (localStorage). Les données réelles ne peuvent pas être chargées.");
    return;
  }

  try {
    document.getElementById('status-text').textContent = 'CONNEXION...';
    state.supabaseClient = window.supabase.createClient(state.supabaseUrl, state.supabaseKey);

    // Récupérer la dernière ligne
    const { data: recent, error: fetchErr } = await state.supabaseClient
      .from('telemetry')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);

    if (!fetchErr && recent && recent.length > 0) {
      updateUI(recent[0]);
    }

    // Calcul de la consommation d'aujourd'hui
    fetchDailyConsumption();
    // Charger l'historique initial (Aujourd'hui)
    fetchHistoryData('today');

    if (state.realtimeSubscription) state.realtimeSubscription.unsubscribe();

    state.realtimeSubscription = state.supabaseClient
      .channel('telemetry_live')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'telemetry' }, (payload) => {
        updateUI(payload.new);
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          document.getElementById('status-text').textContent = 'EN LIGNE';
          document.getElementById('status-dot').style.backgroundColor = 'var(--theme-accent)';
        }
      });
  } catch(e) {
    console.error(e);
    document.getElementById('status-text').textContent = 'ERREUR';
  }
}

// ==========================================
// 6. Historique (Périodes & Coûts journaliers)
// ==========================================
async function fetchDailyConsumption() {
  if (!state.supabaseClient) return;

  const startOfDay = new Date();
  startOfDay.setHours(0,0,0,0);

  // Chercher la plus petite et la plus grande valeur d'énergie d'aujourd'hui
  const { data: minData } = await state.supabaseClient
    .from('telemetry')
    .select('energy')
    .gte('created_at', startOfDay.toISOString())
    .order('created_at', { ascending: true })
    .limit(1);
    
  const { data: maxData } = await state.supabaseClient
    .from('telemetry')
    .select('energy')
    .gte('created_at', startOfDay.toISOString())
    .order('created_at', { ascending: false })
    .limit(1);

  let dailyKwh = 0;
  if (minData && maxData && minData.length > 0 && maxData.length > 0) {
    dailyKwh = maxData[0].energy - minData[0].energy;
    if(dailyKwh < 0) dailyKwh = 0;
  }

  document.getElementById('val-daily-kwh').textContent = dailyKwh.toFixed(3) + ' kWh cons.';
  const cost = Math.round(dailyKwh * 112.87);
  document.getElementById('val-daily-cost').textContent = cost.toLocaleString('fr-FR') + ' FCFA';
}

async function fetchHistoryData(period) {
  if (!state.supabaseClient) {
    document.getElementById('history-table-body').innerHTML = '<tr><td colspan="5" class="px-4 py-6 text-center" style="color: var(--theme-muted);">Connexion base de données requise.</td></tr>';
    return;
  }

  document.getElementById('history-table-body').innerHTML = '<tr><td colspan="5" class="px-4 py-6 text-center" style="color: var(--theme-muted);">Chargement depuis la base de données...</td></tr>';

  let startDate = new Date();
  if (period === 'today') {
    startDate.setHours(0,0,0,0);
  } else if (period === '7days') {
    startDate.setDate(startDate.getDate() - 7);
  } else if (period === '30days') {
    startDate.setDate(startDate.getDate() - 30);
  }

  // Pour des raisons de performance sur l'UI, on limite à 100 résultats
  const { data, error } = await state.supabaseClient
    .from('telemetry')
    .select('*')
    .gte('created_at', startDate.toISOString())
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error("Erreur chargement historique:", error);
    return;
  }

  state.historyData = data;
  renderHistoryTable(data);
}

// ==========================================
// 7. Simulateur (Optionnel)
// ==========================================
function toggleSimulator(isActive) {
  state.isSimulator = isActive;
  
  if (isActive) {
    if (state.realtimeSubscription) state.realtimeSubscription.unsubscribe();
    document.getElementById('status-text').textContent = 'SIMULATEUR';
    document.getElementById('status-dot').style.backgroundColor = 'var(--theme-accent)';
    
    let simE = 12.5; 
    state.simInterval = setInterval(() => {
      const v = 220 + (Math.random() * 10 - 5);
      const i = 5 + (Math.random() * 5);
      const p = v * i * 0.95; 
      simE += (p / 3600000) * 2; 
      
      updateUI({
        voltage: v,
        current: i,
        power: p,
        energy: simE,
        frequency: 49.9 + Math.random() * 0.2,
        pf: 0.95 + Math.random() * 0.04,
        created_at: new Date().toISOString()
      });
    }, 2000);
  } else {
    clearInterval(state.simInterval);
    document.getElementById('status-text').textContent = 'HORS LIGNE';
    document.getElementById('status-dot').style.backgroundColor = 'var(--theme-danger)';
    connectSupabase();
  }
}

// ==========================================
// 8. Paramètres & Outils
// ==========================================
function saveThresholds() {
  const p = parseFloat(document.getElementById('cfg-power-limit').value);
  const vMin = parseFloat(document.getElementById('cfg-volt-min').value);
  const vMax = parseFloat(document.getElementById('cfg-volt-max').value);
  
  if(p > 0) state.powerLimit = p;
  if(vMin > 0) state.voltMin = vMin;
  if(vMax > 0) state.voltMax = vMax;
  
  alert('Seuils de sécurité mis à jour.');
}

function exportCSV() {
  if (state.historyData.length === 0) {
    alert('Aucune donnée à exporter.');
    return;
  }
  let csv = 'Timestamp,Voltage(V),Current(A),Power(W),Energy(kWh)\n';
  state.historyData.forEach(r => {
    csv += `${r.created_at || Date.now()},${r.voltage},${r.current},${r.power},${r.energy}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `pzem_export_historique_${new Date().getTime()}.csv`;
  a.click();
}

// ==========================================
// 9. Démarrage
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  initCharts();
  loadThemeSettings();
  
  // Par défaut, on ne lance plus le simulateur automatiquement 
  // On tente de se connecter aux vraies données de la carte ESP32
  const simToggle = document.getElementById('sim-toggle');
  if (simToggle) simToggle.checked = false;
  toggleSimulator(false);
});
