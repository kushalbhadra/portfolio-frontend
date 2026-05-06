import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ManageProjects from './pages/admin/ManageProjects';
import ManageSkills from './pages/admin/ManageSkills';
import Messages from './pages/admin/Messages';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin/login" element={<Login />} />
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/projects" element={<ManageProjects />} />
                    <Route path="/admin/skills" element={<ManageSkills />} />
                    <Route path="/admin/messages" element={<Messages />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;