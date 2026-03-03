import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

function Sidebar() {
  const location = useLocation()

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Analyze", path: "/analyze" },
    { name: "Employees", path: "/employees" },
    { name: "History", path: "/history" }
  ]

  return (
    <div style={{
      width: "250px",
      background: "rgba(10,15,30,0.8)",
      backdropFilter: "blur(10px)",
      padding: "30px",
      position: "relative",
      zIndex: 2
    }}>
      <h2 style={{ color: "#00ffff", marginBottom: "40px" }}>AI SOC</h2>

      {links.map(link => (
        <motion.div
          key={link.path}
          whileHover={{ scale: 1.05 }}
          style={{
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "8px",
            background: location.pathname === link.path ? "#00ffff22" : "transparent"
          }}
        >
          <Link to={link.path} style={{ color: "white", textDecoration: "none" }}>
            {link.name}
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

export default Sidebar