import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserContextProvider from "./context/UserContext";
import CreateNewPost from "./Pages/CreateNewPost";
import Home from "./Pages/Home";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-post" element={<CreateNewPost />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
