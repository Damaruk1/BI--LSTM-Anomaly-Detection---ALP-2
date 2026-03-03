import { Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"
import Dashboard from "./pages/Dashboard"
import Analyze from "./pages/Analyze"
import Employees from "./pages/Employees"
import History from "./pages/History"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analyze" element={<Analyze />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Layout>
  )
}

export default App