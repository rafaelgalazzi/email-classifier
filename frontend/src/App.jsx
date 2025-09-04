import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./page/Home/Home";
import { About } from "./page/About/About";

function NotFound() {
  return <h1>404 - Página não encontrada</h1>;
}

function App() {
  return (
    <Router>
      <nav style={{ margin: "10px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/about">Sobre</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
