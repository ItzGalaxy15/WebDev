import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import { MainHome } from './MainHome/MainHome';
import { Home } from './Home/Home';
import { RegistrationForm } from './registration/registration';
import { MyEvents } from './MyEvents/MyEvents';
import { AdminDashBoard } from './Admindashboard/admindashboard';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login backToMainHome={() => console.log("Back to home")} />} />
        <Route path="/home" element={<Home backToMainHome={() => console.log("Back to main home")} IsAdmin/>} />
        <Route path="/registration" element={<RegistrationForm backToMainHome={() => console.log("Back to main home")} />} />
        <Route path="/myevents" element={<MyEvents backToHome={() => console.log("Back to home")} />} />
        <Route path="/admindashboard" element={<AdminDashBoard backToHome={() => console.log("Back to home")} />} />
        <Route path="/" element={<MainHome />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  );
};

export default App;



