import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import "./Manual.css";
import "./Home.css";
import "./Exp.css";
//pages
import Home from "./pages/Home";
import Exp from "./pages/Exp";
import Manual from "./pages/Manual";


//components
import Navbar from "./components/Navbar";


export default function App() {
  return (
    <>
      <Navbar />

      <Routes >
        <Route exact path="/" element={<Home />} />
        <Route exact path="/manual" element={<Manual />} />
        <Route exact path="/export" element={<Exp />} />
      </Routes>
    </>
  );
}