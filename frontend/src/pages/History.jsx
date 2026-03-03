import { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

function History() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchHistory() {
      const res = await axios.get("http://127.0.0.1:8000/history")
      setData(res.data)
    }
    fetchHistory()
  }, [])

  return (
    <div>
      <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>
        Employee Log History
      </h1>

      {data.map((employee) => (
        <motion.div
          key={employee.employee_id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            marginBottom: "30px",
            padding: "20px",
            borderRadius: "15px",
            background: "rgba(255,255,255,0.05)"
          }}
        >
          <h2>
            {employee.employee_name} (ID: {employee.employee_id})
          </h2>

          {employee.logs.map((log, index) => (
            <div
              key={index}
              style={{
                marginTop: "15px",
                padding: "15px",
                borderRadius: "10px",
                background:
                  log.prediction === "Anomaly"
                    ? "rgba(255,0,0,0.2)"
                    : "rgba(0,255,0,0.1)"
              }}
            >
              <p><strong>Prediction:</strong> {log.prediction}</p>
              <p><strong>Error:</strong> {log.reconstruction_error}</p>
              <p><strong>Threshold:</strong> {log.threshold}</p>
              <p><strong>Time:</strong> {log.timestamp}</p>
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

export default History