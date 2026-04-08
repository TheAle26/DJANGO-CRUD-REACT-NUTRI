import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TaskPages } from "./pages/TaskPages.tsx";
import { TaskFormPage } from "./pages/TaskForm.tsx";
import { Navigation } from "./components/Navigation.tsx";
import { LoginForm } from "./components/LoginForm.tsx";
import { NutriDashboard } from './components/NutriDashboard.tsx'

function App() {
  return (
    <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/tasks" element={<TaskPages />} />
      <Route path="/tasks-create" element={<TaskFormPage />} />
      <Route path="/tasks/:id" element={<TaskFormPage />} />
      <Route path="/dashboard" element={<NutriDashboard />} />
    </Routes>

    </BrowserRouter>
  );
}

export default App;
