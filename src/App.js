import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import NoteState from "./context/NoteState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert";
import { useState } from "react";
import AddNote from "./components/AddNote";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message) => {
    setAlert({
      msg: message,
    });
    setTimeout(() => {
      setAlert(null);
    },3000);
  };
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />

        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route
            exact
            path="/addnote"
            element={<AddNote showAlert={showAlert} />}
          />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
