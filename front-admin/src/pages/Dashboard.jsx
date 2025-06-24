import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Componentes de Usuarios
import UserForm from '../components/users/UserForm';
import AlumnoList from '../components/users/AlumnoList';
import ProfesorList from '../components/users/ProfesorList';
import AdminList from '../components/users/AdminList';

// Componentes Académicos - Listas
import CareerList from '../components/academic/CareerList';
import SubjectList from '../components/academic/SubjectList';
import AcademicPeriodList from '../components/academic/AcademicPeriodList';

// Componentes Académicos - Formularios
import CareerForm from '../components/academic/CareerForm';
import SubjectForm from '../components/academic/SubjectForm';
import AcademicPeriodForm from '../components/academic/AcademicPeriodForm';
import CourseForm from '../components/academic/CourseForm';  // Importamos el formulario para designar profesor

function Dashboard() {
  // Estados para Listas de Usuarios
  const [showAlumnoList, setShowAlumnoList] = useState(false);
  const [showProfesorList, setShowProfesorList] = useState(false);
  const [showAdminList, setShowAdminList] = useState(false);
  
  // Estados para Listas Académicas
  const [showCarreras, setShowCarreras] = useState(false);
  const [showCursos, setShowCursos] = useState(false);
  const [showPeriodosAcademicos, setShowPeriodosAcademicos] = useState(false);
  
  // Estados para Formularios
  const [showUserForm, setShowUserForm] = useState(false); 
  const [showCarreraForm, setShowCarreraForm] = useState(false);
  const [showCursoForm, setShowCursoForm] = useState(false);
  const [showPeriodoForm, setShowPeriodoForm] = useState(false);
  const [showAssignProfessorForm, setShowAssignProfessorForm] = useState(false);  // Nuevo estado para el formulario de asignación de profesor

  // Función para esconder todos los componentes excepto el seleccionado
  const showOnly = (setter, type) => {
    // Ocultar todas las listas
    setShowAlumnoList(false);
    setShowProfesorList(false);
    setShowAdminList(false);
    setShowCarreras(false);
    setShowCursos(false);
    setShowPeriodosAcademicos(false);
    
    // Ocultar todos los formularios
    setShowUserForm(false);
    setShowCarreraForm(false);
    setShowCursoForm(false);
    setShowPeriodoForm(false);
    setShowAssignProfessorForm(false);  // Ocultar el formulario de asignación de profesor

    // Mostrar solo el componente seleccionado
    setter(true);

    // Si es la lista de Carreras, asegurarse de ocultar el formulario de Carreras
    if (type !== "carrera") {
      setShowCarreraForm(false);
    }
  };

  // Función para determinar qué título mostrar
  const getCurrentTitle = () => {
    if (showAlumnoList) return "Lista de Alumnos";
    if (showProfesorList) return "Lista de Profesores";
    if (showAdminList) return "Lista de Administradores";
    if (showCarreras) return "Lista de Carreras";
    if (showCursos) return "Lista de Cursos";
    if (showPeriodosAcademicos) return "Lista de Períodos Académicos";
    if (showUserForm) return "Formulario de Usuario";
    if (showCarreraForm) return "Formulario de Carrera";
    if (showCursoForm) return "Formulario de Curso";
    if (showPeriodoForm) return "Formulario de Período Académico";
    if (showAssignProfessorForm) return "Designar Profesor a Curso";  // Título para el formulario de asignación
    return "Bienvenido al Dashboard - Selecciona una opción del menú";
  };
  
  

  return (
    <div className="dashboard-page">
      <Header
        // Funciones para Listas
        onShowAlumnoList={() => showOnly(setShowAlumnoList)}
        onShowProfesorList={() => showOnly(setShowProfesorList)}
        onShowAdminList={() => showOnly(setShowAdminList)}
        onShowCarreras={(type) => showOnly(setShowCarreras, type)}
        onShowCursos={() => showOnly(setShowCursos)}
        onShowPeriodosAcademicos={() => showOnly(setShowPeriodosAcademicos)}
        
        // Funciones para Formularios
        onShowUserForm={() => showOnly(setShowUserForm)}
        onShowCarreraForm={() => showOnly(setShowCarreraForm, "carrera")}
        onShowCursoForm={() => showOnly(setShowCursoForm)}
        onShowPeriodoForm={() => showOnly(setShowPeriodoForm)} // Aquí pasas la función
        onShowAssignProfessorForm={() => showOnly(setShowAssignProfessorForm)} // Nueva función para asignar profesor
      />
      
      <div className="dashboard-container">
        {/* Título dinámico */}
        <div className="container-fluid py-3">
          <div className="row">
            <div className="col">
              <h2 className="text-center mb-4">
                <i className="bi bi-speedometer2 me-2"></i>
                {getCurrentTitle()}
              </h2>
            </div>
          </div>
        </div>

        {/* Renderizado condicional de componentes */}
        
        {/* Página de bienvenida por defecto */}
        {!showAlumnoList && !showProfesorList && !showAdminList && 
         !showCarreras && !showCursos && !showPeriodosAcademicos &&
         !showUserForm && !showCarreraForm && !showCursoForm && !showPeriodoForm && !showAssignProfessorForm && (
          <div className="container text-center py-5">
            <div className="row justify-content-center">
              <div className="col-md-8">
                <i className="bi bi-speedometer2 display-1 text-danger mb-4"></i>
                <h3 className="mb-3">Bienvenido a MentorIA</h3>
                <p className="lead text-muted">
                  Selecciona una opción del menú superior para comenzar a gestionar 
                  usuarios, carreras, cursos y períodos académicos.
                </p>
                <div className="row mt-5">
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body">
                        <i className="bi bi-person-lines-fill display-4 text-primary mb-3"></i>
                        <h5>Gestión de Usuarios</h5>
                        <p className="text-muted">Administra alumnos, profesores y administradores</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body">
                        <i className="bi bi-book display-4 text-success mb-3"></i>
                        <h5>Gestión Académica</h5>
                        <p className="text-muted">Administra carreras, cursos y períodos académicos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Listas de Usuarios */}
        {showAlumnoList && <AlumnoList />}
        {showProfesorList && <ProfesorList />}
        {showAdminList && <AdminList />}
        
        {/* Listas Académicas */}
        {showCarreras && <CareerList onShowCarreraForm={() => showOnly(setShowCarreraForm, "carrera")}/>}
        {showCursos && <SubjectList onShowCursoForm={() => showOnly(setShowCursoForm)} />}
        {showPeriodosAcademicos && <AcademicPeriodList onShowPeriodoForm={() => showOnly(setShowPeriodoForm)} />}
        
        {/* Formularios */}
        {showUserForm && <UserForm />}
        {showCarreraForm && <CareerForm />}
        {showCursoForm && <SubjectForm />}
        {showPeriodoForm && <AcademicPeriodForm />}
        {showAssignProfessorForm && <CourseForm />} {/* Renderizamos el formulario de asignación de profesor */}
      </div>
      
      <Footer />
    </div>
  );
}

export default Dashboard;
