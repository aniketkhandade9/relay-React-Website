import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [relayStatus, setRelayStatus] = useState("UNKNOWN");
  const [waterStatus, setWaterStatus] = useState("UNKNOWN");
  const [hardwareStatus, setHardwareStatus] = useState("UNKNOWN");
  const [loading, setLoading] = useState(true);

  // 🔴 YOUR RENDER BACKEND URL
  const BASE_URL = "https://relay-backend-2b2b.onrender.com";

  const fetchStatus = async () => {
    try {
      const relayRes = await fetch(`${BASE_URL}/api/relay/status`);
      const relayData = await relayRes.text();
      setRelayStatus(relayData);

      const waterRes = await fetch(`${BASE_URL}/api/water/status`);
      const waterData = await waterRes.text();
      setWaterStatus(waterData);

      const hcRes = await fetch(`${BASE_URL}/api/hardware/status`);
      const hcData = await hcRes.text();
      setHardwareStatus(hcData);
    } catch (error) {
      console.error("Error fetching status", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRelay = async () => {
    if (hardwareStatus === "OFFLINE") return;
    const newState = relayStatus === "ON" ? "off" : "on";
    // Send command to backend, but do NOT optimistically update. 
    // The UI will only update when backend returns accurate hardware status on the next poll.
    await fetch(`${BASE_URL}/api/relay/${newState}`);
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const isRelayOn = relayStatus === "ON";
  const isWaterActive = waterStatus === "Active";
  const isHardwareOffline = hardwareStatus === "OFFLINE";

  return (
    <div className={`color-universe ${isRelayOn ? 'universe-on' : 'universe-off'} ${isWaterActive ? 'universe-water' : ''} ${isHardwareOffline ? 'universe-offline' : ''}`}>
      <div className="aurora-bg"></div>
      <div className="dashboard-container">
        
        <div className={`vibrant-card ${isHardwareOffline ? 'card-offline' : ''}`}>
          
          {isHardwareOffline && (
            <div style={styles.offlineBanner}>
              ⚠️ HARDWARE DISCONNECTED
            </div>
          )}

          <header className="card-header">
            <div className={`rainbow-orb ${isHardwareOffline ? 'orb-offline' : ''}`}></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h1>Smart IoT</h1>
              <span style={{ fontSize: "0.75rem", color: isHardwareOffline ? "#ff4444" : "#00d2ff", fontWeight: "800", letterSpacing: "1px", textTransform: "uppercase" }}>
                {isHardwareOffline ? "🔴 Power: Offline" : "🟢 Power: Online"}
              </span>
            </div>
          </header>

          {loading ? (
            <div className="loader">Connecting Magic...</div>
          ) : (
            <div className="grid-controls">
              
              <div className={`candy-widget ${isHardwareOffline ? 'widget-offline' : isWaterActive ? 'widget-water-active' : 'widget-water-idle'}`}>
                <div className="widget-icon">🌊</div>
                <div className="widget-info">
                  <h3>Water Core</h3>
                  <span className="pill">
                    {isHardwareOffline ? "UNREACHABLE" : isWaterActive ? "FLOW ACTIVE" : "SYSTEM DRY"}
                  </span>
                </div>
              </div>

              <div className={`candy-widget ${isHardwareOffline ? 'widget-offline' : isRelayOn ? 'widget-relay-active' : 'widget-relay-idle'}`}>
                <div className="widget-icon">⚡</div>
                <div className="widget-info">
                  <h3>Power Relay</h3>
                  <span className="pill">
                    {isHardwareOffline ? "UNREACHABLE" : isRelayOn ? "ON" : "OFF"}
                  </span>
                </div>
              </div>

            </div>
          )}

          <div className="action-area">
            <button 
              className={`magic-button ${isHardwareOffline ? 'btn-offline' : isRelayOn ? 'btn-red-pink' : 'btn-emerald-blue'}`} 
              onClick={toggleRelay}
              disabled={isHardwareOffline}
              style={{ opacity: isHardwareOffline ? 0.4 : 1, cursor: isHardwareOffline ? 'not-allowed' : 'pointer' }}
            >
              {isHardwareOffline ? "SYSTEM OFFLINE" : isRelayOn ? "TURN OFF POWER" : "TURN ON POWER"}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

const styles = {
  offlineBanner: {
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    color: "#ff4444",
    padding: "10px",
    borderRadius: "15px",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "20px",
    border: "1px solid rgba(255, 0, 0, 0.4)"
  }
};

export default App;
