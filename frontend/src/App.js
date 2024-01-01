import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import { BrowserRouter, BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
// import CreateNote from "./screens/CreateNote/CreateNote";
// import CreateNote from "./screens/CreateNote/CreateNote";
// import RegisterScreen1 from "./screens/RegisterScreen/RegisterScreen";

// import MyNotes from './screens/LandingPage/MyNotes/MyNotes';
  const App = () => {
   const [search,setSearch]=useState("");
   console.log(search)
    return (
      <Router>
        <Header setSearch={setSearch} />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} exact />

            <Route path="/login" element={<LoginScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/createnote" element={<CreateNote />} />
            <Route path="/note/:id" element={<SingleNote />} />
            <Route path="/mynotes" element={<MyNotes search={search} />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    );};

export default App;
