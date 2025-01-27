import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/";
import Client from "./pages/Client";
import Coach from "./pages/Coach";
import Developer from "./pages/Developer";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/client" element={<Client />} />
        <Route path="/user/coach" element={<Coach />} />
        <Route path="/user/developer" element={<Developer />} />
        <Route path="/user/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
