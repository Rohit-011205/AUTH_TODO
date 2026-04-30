import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import Verification from './Pages/Verification.jsx';
import Projects from './Pages/Projects.jsx';
import Task from './Pages/Task.jsx';
import useStore from './Store/useStore.js';

const ProtectedRoute = ({ children }) => {
    const { token } = useStore();
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/verify-otp" element={<Verification />} />
                <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
                <Route path="/tasks/:projectId/tasks" element={<ProtectedRoute><Task /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;