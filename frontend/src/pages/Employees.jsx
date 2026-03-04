import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"

const API = import.meta.env.VITE_API_BASE

function Employees() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await axios.get(`${API}/employees`)
        setEmployees(res.data)
      } catch (err) {
        console.log("Backend not reachable", err)
      }
    }

    fetchEmployees()
  }, [])

  return (
    <div>
      <h1 style={{ fontSize: "32px", marginBottom: "40px" }}>
        Employee Monitoring
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "30px"
      }}>
        {employees.map(emp => (
          <motion.div
            key={emp.employee_id}
            whileHover={{ scale: 1.05 }}
            style={{
              padding: "25px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)"
            }}
          >
            <h3>{emp.name}</h3>
            <p>Department: {emp.department}</p>
            <p>Role: {emp.role}</p>

            <div style={{
              marginTop: "15px",
              color: "#00ff88"
            }}>
              Active
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Employees