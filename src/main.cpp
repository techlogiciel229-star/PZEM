#include <Arduino.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <PZEM004Tv30.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>

/*
 * =====================================================================================
 * PROJET : PZEM-004T Energy Monitor & Supabase Telemetry
 * =====================================================================================
 * Architecture : ESP32 + PZEM-004T v3.0 ---> Supabase (PostgreSQL REST) --->
 * Dashboard Web
 *
 * Câblage ESP32 vers PZEM-004T :
 * - ESP32 5V (VIN)      <---> PZEM 5V
 * - ESP32 GND           <---> PZEM GND
 * - ESP32 GPIO 16 (RX2) <---> PZEM TX
 * - ESP32 GPIO 17 (TX2) <---> PZEM RX
 * =====================================================================================
 */

// ---------------------- 1. CONFIGURATION WI-FI & SUPABASE --------------------

const char *WIFI_SSID = "Airtel_4G_SMARTCONNECT_422D";
const char *WIFI_PASSWORD = "7CBBAF62";

const char *SUPABASE_URL = "https://jjwudgxkitmmyjhzafis.supabase.co";
const char *SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9."
    "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqd3VkZ3hraXRtbXlqaHphZmlzIiwicm9sZSI6Im"
    "Fub24iLCJpYXQiOjE3OTA3MDY2NjksImV4cCI6MjEwNjI4MjY2OX0.OWbvCxN8DuCJrFuLP-"
    "wWehU3DQNqUBaab7OMt5o3ziY";

// Seuil d'alerte de surpuissance en Watts (ex: 3500 W pour un disjoncteur 16A
// sous 230V)
const float POWER_ALERT_THRESHOLD = 3500.0;

// ---------------------- 2. BROCHES & MATÉRIEL -------------------------------
#define PZEM_RX_PIN 16
#define PZEM_TX_PIN 17
#define PZEM_SERIAL Serial2
#define LED_STATUS 2 // LED d'état (GPIO 2)

PZEM004Tv30 pzem(PZEM_SERIAL, PZEM_RX_PIN, PZEM_TX_PIN);

// ---------------------- 3. INTERVALLES TEMPORELS ----------------------------
const unsigned long TELEMETRY_INTERVAL =
    2000; // Envoi à Supabase toutes les 2 secondes
unsigned long lastTelemetryTime = 0;

// ---------------------- 4. FONCTIONS AUXILIAIRES ----------------------------

// Connexion au réseau Wi-Fi avec gestion non-bloquante
void connectWiFi() {
  if (WiFi.status() == WL_CONNECTED)
    return;

  Serial.printf("\n[Wi-Fi] Connexion à : %s", WIFI_SSID);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    digitalWrite(LED_STATUS, !digitalRead(LED_STATUS));
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(LED_STATUS, HIGH);
    Serial.println(F("\n[Wi-Fi] Connecté ! 🎉"));
    Serial.printf("[Wi-Fi] IP : %s | Signal : %d dBm\n\n",
                  WiFi.localIP().toString().c_str(), WiFi.RSSI());
  } else {
    digitalWrite(LED_STATUS, LOW);
    Serial.println(
        F("\n[Wi-Fi] ⚠️ Échec de connexion (vérifiez SSID/Mot de passe)."));
  }
}

// Envoi des données vers la table PostgreSQL Supabase via REST API PostgREST
bool sendToSupabase(float voltage, float current, float power, float energy,
                    float frequency, float pf) {
  if (WiFi.status() != WL_CONNECTED) {
    connectWiFi();
    if (WiFi.status() != WL_CONNECTED)
      return false;
  }

  // 1. Préparation du payload JSON
  JsonDocument doc;
  doc["voltage"] = serialized(String(voltage, 1));
  doc["current"] = serialized(String(current, 3));
  doc["power"] = serialized(String(power, 1));
  doc["energy"] = serialized(String(energy, 3));
  doc["frequency"] = serialized(String(frequency, 1));
  doc["pf"] = serialized(String(pf, 2));
  doc["wifi_rssi"] = WiFi.RSSI();
  doc["alert"] = (power > POWER_ALERT_THRESHOLD);

  String jsonPayload;
  serializeJson(doc, jsonPayload);

  // 2. Préparation du client HTTPS
  WiFiClientSecure client;
  client.setInsecure(); // Accepte le certificat SSL Supabase

  HTTPClient http;
  String endpoint = String(SUPABASE_URL) + "/rest/v1/telemetry";

  if (!http.begin(client, endpoint)) {
    Serial.println(F("[Supabase] ❌ Échec initialisation HTTPS"));
    return false;
  }

  // Headers d'authentification et format Supabase
  http.addHeader("Content-Type", "application/json");
  http.addHeader("apikey", SUPABASE_ANON_KEY);
  http.addHeader("Authorization", String("Bearer ") + SUPABASE_ANON_KEY);
  http.addHeader("Prefer",
                 "return=minimal"); // Évite de renvoyer la ligne insérée pour
                                    // économiser la bande passante

  // 3. Envoi de la requête HTTP POST pour insérer la nouvelle ligne
  digitalWrite(LED_STATUS, HIGH);
  int httpResponseCode = http.POST(jsonPayload);
  digitalWrite(LED_STATUS, LOW);

  if (httpResponseCode == 201 || httpResponseCode == 200 ||
      httpResponseCode == 204) {
    Serial.printf("[Supabase] 🚀 Mesure insérée avec succès (HTTP %d) : %.1f W "
                  "| %.1f V\n",
                  httpResponseCode, power, voltage);
    http.end();
    return true;
  } else {
    Serial.printf("[Supabase] ❌ Erreur HTTP %d : %s\n", httpResponseCode,
                  http.getString().c_str());
    http.end();
    return false;
  }
}

// ---------------------- 5. SETUP & LOOP -------------------------------------
void setup() {
  pinMode(LED_STATUS, OUTPUT);
  digitalWrite(LED_STATUS, LOW);

  Serial.begin(115200);
  delay(1000);

  Serial.println(F("\n=================================================="));
  Serial.println(F("     ⚡ PZEM-004T + Supabase Energy Monitor ⚡     "));
  Serial.println(F("=================================================="));

  connectWiFi();

  Serial.println(F("[PZEM] Initialisation du capteur sur UART2..."));
  Serial.printf("[PZEM] Adresse capteur : 0x%X\n\n", pzem.readAddress());
}

void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - lastTelemetryTime >= TELEMETRY_INTERVAL) {
    lastTelemetryTime = currentMillis;

    float voltage = pzem.voltage();
    float current = pzem.current();
    float power = pzem.power();
    float energy = pzem.energy();
    float frequency = pzem.frequency();
    float pf = pzem.pf();

    if (isnan(voltage)) {
      // Serial.println(F("⚠️ [PZEM] En attente de signal secteur 230V..."));
    } else {
      Serial.printf("⚡ U=%.1fV | I=%.3fA | P=%.1fW | E=%.3fkWh | F=%.1fHz | "
                    "CosPhi=%.2f\n",
                    voltage, current, power, energy, frequency, pf);

      sendToSupabase(voltage, current, power, energy, frequency, pf);
    }
  }
}