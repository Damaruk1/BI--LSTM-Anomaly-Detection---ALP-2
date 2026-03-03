import Sidebar from "../components/Sidebar"
import AnimatedBackground from "../components/AnimatedBackground"

function Layout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <AnimatedBackground />
      <Sidebar />
      <div style={{
        flex: 1,
        padding: "40px",
        color: "white",
        position: "relative",
        zIndex: 2,
        overflowY: "auto"
      }}>
        {children}
      </div>
    </div>
  )
}

export default Layout