import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./routes/Home/Home";
import { DevDashboard } from "./routes/DevDashboard";

export function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dev-dashboard" element={<DevDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}






