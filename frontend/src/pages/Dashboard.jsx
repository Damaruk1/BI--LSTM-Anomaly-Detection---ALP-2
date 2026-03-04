import { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

const API = import.meta.env.VITE_API_BASE

function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0)
  const [anomalyCount, setAnomalyCount] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const empRes = await axios.get(`${API}/employees`)
        setEmployeeCount(empRes.data.length)

        const historyRes = await axios.get(`${API}/history`)

        const count = historyRes.data.reduce((total, employee) => {
          return total + employee.logs.filter(
            log => log.prediction === "Anomaly"
          ).length
        }, 0)

        setAnomalyCount(count)

      } catch (err) {
        console.log("Backend not reachable", err)
      }
    }

    fetchData()
  }, [])

  const systemSecure = anomalyCount === 0

  return (
    <div>
      <h1 style={{ fontSize: "36px", marginBottom: "40px" }}>
        Security Overview
      </h1>

      <div style={{ display: "flex", gap: "40px" }}>

        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            padding: "40px",
            borderRadius: "20px",
            background: "rgba(0,255,255,0.08)",
            border: "1px solid rgba(0,255,255,0.2)",
            width: "300px"
          }}
        >
          <h2>Total Employees</h2>
          <h1 style={{ fontSize: "48px" }}>{employeeCount}</h1>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            padding: "40px",
            borderRadius: "20px",
            background: "rgba(255,0,255,0.08)",
            border: "1px solid rgba(255,0,255,0.2)",
            width: "300px"
          }}
        >
          <h2>Anomalies Detected</h2>
          <h1 style={{ fontSize: "48px" }}>{anomalyCount}</h1>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            padding: "40px",
            borderRadius: "20px",
            background: "rgba(0,255,120,0.08)",
            border: "1px solid rgba(0,255,120,0.2)",
            width: "300px"
          }}
        >
          <h2>System Status</h2>
          <h1 style={{ color: systemSecure ? "#00ff88" : "#ff4444" }}>
            {systemSecure ? "SECURE" : "ALERT"}
          </h1>
        </motion.div>

      </div>
    </div>
  )
}

export default Dashboard