import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import useStore from "./store/store";

// Listados
import AlumnoList from "./components/users/AlumnoList";
import ProfesorList from "./components/users/ProfesorList";
import AdminList from "./components/users/AdminList";
// Formularios
import UserForm from "./components/users/UserForm";
import CareerForm from "./components/academic/CareerForm";
import SubjectForm from "./components/academic/SubjectForm";
import AcademicPeriodForm from "./components/academic/AcademicPeriodForm";
// Académico
import CareerList from "./components/academic/CareerList";
import SubjectList from "./components/academic/SubjectList";
import AcademicPeriodList from "./components/academic/AcademicPeriodList";
import CourseForm from "./components/academic/CourseForm";
// Dashboard principal
import Dashboard from "./pages/Dashboard";
import LoginAdmin from "./components/Login/LoginAdmin";
// Importaciones específicas para matrículas
import EnrollmentForm from "./components/academic/EnrrollementForm"; // Asegúrate que la ruta sea correcta
import EnrollmentList from "./components/academic/EnrrollementList"; // Asegúrate que la ruta sea correcta

function App() {
  const { token, user, logout } = useStore();

  useEffect(() => {
    // Verificar si el token existe pero no hay usuario, o viceversa
    // Esto puede pasar si el localStorage se corrompe
    if ((token && !user) || (!token && user)) {
      logout(); // Limpiar estado inconsistente
    }
  }, [token, user, logout]);

  return (
    <Router>
      <Header />
      <div className="container py-5">
        <Routes>
          {/* Rutas públicas */}
          <Route
            path="/login"
            element={<PublicRoute element={<LoginAdmin />} />}
          />

          {/* Rutas protegidas - todas requieren autenticación y rol de admin */}
          <Route
            path="/"
            element={
              <PrivateRoute element={<Dashboard />} roleRequired="admin" />
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute element={<Dashboard />} roleRequired="admin" />
            }
          />

          {/* Gestión de Usuarios */}
          <Route
            path="/list-alumnos"
            element={
              <PrivateRoute element={<AlumnoList />} roleRequired="admin" />
            }
          />
          <Route
            path="/list-profesores"
            element={
              <PrivateRoute element={<ProfesorList />} roleRequired="admin" />
            }
          />
          <Route
            path="/list-admins"
            element={
              <PrivateRoute element={<AdminList />} roleRequired="admin" />
            }
          />
          <Route
            path="/create-user"
            element={
              <PrivateRoute element={<UserForm />} roleRequired="admin" />
            }
          />

          {/* Gestión Académica */}
          <Route
            path="/list-carreras"
            element={
              <PrivateRoute element={<CareerList />} roleRequired="admin" />
            }
          />
          <Route
            path="/create-career"
            element={
              <PrivateRoute element={<CareerForm />} roleRequired="admin" />
            }
          />
          <Route
            path="/list-courses"
            element={
              <PrivateRoute element={<SubjectList />} roleRequired="admin" />
            }
          />
          <Route
            path="/create-course"
            element={
              <PrivateRoute element={<SubjectForm />} roleRequired="admin" />
            }
          />
          <Route
            path="/list-periods"
            element={
              <PrivateRoute
                element={<AcademicPeriodList />}
                roleRequired="admin"
              />
            }
          />
          <Route
            path="/create-academic-period"
            element={
              <PrivateRoute
                element={<AcademicPeriodForm />}
                roleRequired="admin"
              />
            }
          />
          <Route
            path="/assign-professor"
            element={
              <PrivateRoute element={<CourseForm />} roleRequired="admin" />
            }
          />

          <Route
            path="/list-enrollments"
            element={
              <PrivateRoute element={<EnrollmentList />} roleRequired="admin" />
            }
          />

          <Route
            path="/create-enrollment"
            element={
              <PrivateRoute element={<EnrollmentForm />} roleRequired="admin" />
            }
          />

          <Route
            path="/create-enrollment"
            element={
              <PrivateRoute element={<EnrollmentForm />} roleRequired="admin" />
            }
          />

          {/* Ruta catch-all: redirige a la página principal si la ruta no coincide */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
