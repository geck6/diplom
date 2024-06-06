import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
//pages
import Home from "./pages/Home";
import DB from "./pages/DB";
import Exp from "./pages/Exp";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

//components
import Navbar from "./components/Navbar";


export default function App() {
  return (
    <>
      <Navbar />

      <Routes >
        <Route exact path="/registration" element={<Registration />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/database" element={<DB />} />
        <Route exact path="/export" element={<Exp />} />
      </Routes>
    </>
  );
}