import React, { useEffect, useState } from "react";
import Button74 from "./component/Button74";
import "./Button74.css"
function App() {
  const [status, setStatus] = useState("UNKNOWN");

  // 🔴 YOUR RENDER BACKEND URL
  const BASE_URL = "https://relay-backend-2b2b.onrender.com";

  // 🔹 Fetch relay status
  const getStatus = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/relay/status`);
      const data = await res.text();
      setStatus(data);
    } catch (error) {
      console.error("Error fetching status", error);
    }
  };

  // 🔹 Turn relay ON
  const relayOn = async () => {
    await fetch(`${BASE_URL}/api/relay/on`);
    setStatus("ON");
  };
  

  // 🔹 Turn relay OFF
  const relayOff = async () => {
    await fetch(`${BASE_URL}/api/relay/off`);
    setStatus("OFF");
  };

  // 🔹 Get status on page load
  useEffect(() => {
    getStatus();
  }, []);

  return (
    <div style={styles.container}>
      <h1>IoT Relay Control</h1>

      <h2>
        Status :{" "}
        <span style={{ color: status === "ON" ? "green" : "red" }}>
          {status}
        </span>
      </h2>

      <div>
        {/* <button onClick={relayOn} style={styles.onBtn}>
          ON
        </button>

        <button onClick={relayOff} style={styles.offBtn}>
          OFF
        </button> */}


        <button className="button-74" onClick={relayOff}>
off
      </button>

      <button className="button-74" onClick={relayOn}>
On
      </button>

      </div>
      {/* <div>
      <button className="button-74" onClick={relayOn}>
On
      </button>
        
      </div>
      <div>
      <button className="button-74" onClick={relayOff}>
off
      </button>

      </div> */}
    </div>

    
  );
  
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "80px",
    fontFamily: "Arial",
  },
  onBtn: {
    backgroundColor: "green",
    color: "white",
    padding: "15px 40px",
    fontSize: "18px",
    border: "none",
    margin: "10px",
    cursor: "pointer",
  },
  offBtn: {
    backgroundColor: "red",
    color: "white",
    padding: "15px 40px",
    fontSize: "18px",
    border: "none",
    margin: "10px",
    cursor: "pointer",
  },
};

export default App;
