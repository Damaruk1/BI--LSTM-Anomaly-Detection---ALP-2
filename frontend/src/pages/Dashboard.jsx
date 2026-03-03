import { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0)

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/employees")
        setEmployeeCount(res.data.length)
      } catch (err) {
        console.log("Backend not reachable")
      }
    }

    fetchEmployees()
  }, [])

  return (
    <div>
      <h1 style={{ fontSize: "36px", marginBottom: "40px" }}>
        Security Overview
      </h1>

      <div style={{
        display: "flex",
        gap: "40px"
      }}>

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
          <h1>--</h1>
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
          <h1 style={{ color: "#00ff88" }}>SECURE</h1>
        </motion.div>

      </div>
    </div>
  )
}

export default Dashboard