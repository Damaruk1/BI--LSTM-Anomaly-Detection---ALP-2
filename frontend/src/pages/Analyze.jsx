import { useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

function Analyze() {
  const [employeeId, setEmployeeId] = useState("")
  const [logData, setLogData] = useState("")
  const [result, setResult] = useState(null)

  async function handleAnalyze() {
    try {
      const parsedSequence = JSON.parse(logData)

      const res = await axios.post("http://127.0.0.1:8000/analyze", {
        employee_id: employeeId,
        sequence: parsedSequence
      })

      setResult(res.data)
    } catch (err) {
      alert("Invalid log format or backend error")
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>
        Analyze Employee Log
      </h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px"
          }}
        />
      </div>

      <textarea
        placeholder="Paste log sequence JSON here"
        value={logData}
        onChange={(e) => setLogData(e.target.value)}
        rows="10"
        style={{
          width: "100%",
          marginBottom: "20px",
          padding: "10px",
          borderRadius: "8px"
        }}
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={handleAnalyze}
        style={{
          padding: "12px 20px",
          borderRadius: "10px",
          cursor: "pointer"
        }}
      >
        Run Analysis
      </motion.button>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            marginTop: "30px",
            padding: "20px",
            borderRadius: "15px",
            background: "rgba(255,255,255,0.05)"
          }}
        >
          <h2>Result</h2>
          <p><strong>Employee:</strong> {result.employee_name}</p>
          <p><strong>Prediction:</strong> {result.prediction}</p>
          <p><strong>Reconstruction Error:</strong> {result.reconstruction_error}</p>
        </motion.div>
      )}
    </div>
  )
}

export default Analyze