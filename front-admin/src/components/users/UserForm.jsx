import { useState, useEffect } from "react";

function UserForm() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  // Campos para Profesor
  const [employeeCode, setEmployeeCode] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [department, setDepartment] = useState("");
  const [academicTitle, setAcademicTitle] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");

  // Estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Campos para Estudiante
  const [career, setCareer] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState(""); // Inicializamos en blanco
  const [currentSemester, setCurrentSemester] = useState(1);
  const [averageGrade, setAverageGrade] = useState(0.0);

  // Estado para las carreras
  const [careers, setCareers] = useState([]);

  // Cargar las carreras
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api-django/academic/careers/"
        );
        const data = await response.json();
        setCareers(data.results || data); // Maneja tanto paginación como array directo
      } catch (error) {
        console.error("Error loading careers:", error);
      }
    };

    fetchCareers();
  }, []);

  // Generar correo automáticamente basado en nombre y apellido
  useEffect(() => {
    if (firstName && lastName) {
      setEmail(
        `${firstName.toLowerCase()}.${lastName.toLowerCase()}@tecsup.edu.pe`
      );
    }
  }, [firstName, lastName]);

  // Generar contraseña automáticamente basada en nombre, apellido y teléfono
  useEffect(() => {
    if (firstName && lastName && phone) {
      const tempPassword = `${firstName.toLowerCase()}${lastName.toLowerCase()}${phone.slice(-4)}`;
      setPassword(tempPassword);
    }
  }, [firstName, lastName, phone]);

  // Generar código de estudiante automáticamente
  useEffect(() => {
    if (role === "student" && firstName && lastName) {
      const generatedStudentCode = `${firstName.substring(0, 3)}${lastName.substring(0, 3)}${Math.floor(Math.random() * 1000)}`;
      setStudentCode(generatedStudentCode);
    }
  }, [role, firstName, lastName]);

  // Generar código de empleado automáticamente para profesores
  useEffect(() => {
    if (role === "professor" && firstName && lastName) {
      const currentYear = new Date().getFullYear();
      const generatedEmployeeCode = `PROF${currentYear}${firstName.substring(0, 2).toUpperCase()}${lastName.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`;
      setEmployeeCode(generatedEmployeeCode);
    }
  }, [role, firstName, lastName]);

  // Asignar la fecha actual como fecha de matrícula
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    setEnrollmentDate(currentDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let apiEndpoint = "";
    let userData = {};

    // Datos básicos del usuario
    const baseUserData = {
      username,
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      profile_picture_url: profilePictureUrl,
      password,
    };

    if (role === "student") {
      apiEndpoint = "http://localhost:8000/api-django/auth/students/";
      userData = {
        ...baseUserData,
        career: `http://localhost:8000/api-django/academic/careers/${career}/`,
        student_code: studentCode,
        enrollment_date: enrollmentDate,
        current_semester: parseInt(currentSemester),
        average_grade: parseFloat(averageGrade),
        status: 'active'
      };
    } else if (role === "professor") {
      apiEndpoint = "http://localhost:8000/api-django/auth/professors/";
      userData = {
        ...baseUserData,
        employee_code: employeeCode,
        hire_date: hireDate,
        department,
        academic_title: academicTitle,
        office_location: officeLocation,
        status: 'active'
      };
    } else if (role === "admin") {
      // Para admin, usar el endpoint de usuarios directamente
      apiEndpoint = "http://localhost:8000/api-django/auth/users/";
      userData = {
        ...baseUserData,
        role: 'admin'
      };
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User created successfully:", data);
        alert("Usuario creado exitosamente!");
        
        // Limpiar el formulario
        resetForm();
      } else {
        const errorData = await response.json();
        console.error("Error creating user:", errorData);
        
        // Mostrar errores específicos
        let errorMessage = "Error al crear el usuario:\n";
        for (const [field, errors] of Object.entries(errorData)) {
          if (Array.isArray(errors)) {
            errorMessage += `${field}: ${errors.join(', ')}\n`;
          } else {
            errorMessage += `${field}: ${errors}\n`;
          }
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Error de conexión. Verifica que el servidor esté funcionando.");
    }
  };

  const resetForm = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setProfilePictureUrl("");
    setEmployeeCode("");
    setHireDate("");
    setDepartment("");
    setAcademicTitle("");
    setOfficeLocation("");
    setCareer("");
    setStudentCode("");
    setEnrollmentDate(""); // Limpiar la fecha de matrícula también
    setCurrentSemester(1);
    setAverageGrade(0.0);
    setShowPassword(false); // Resetear también el estado de mostrar contraseña
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="card-title mb-0">
                <i className="fas fa-user-plus mr-2"></i>
                Crear Usuario
              </h3>
            </div>
            <div className="card-body">
              <div onSubmit={handleSubmit}>
                {/* Información Básica */}
                <div className="form-section mb-4">
                  <h5 className="text-secondary mb-3">
                    <i className="fas fa-info-circle mr-2"></i>
                    Información Básica
                  </h5>
                  
                  <div className="form-group">
                    <label htmlFor="username" className="font-weight-bold">
                      <i className="fas fa-user mr-1"></i>
                      Nombre de Usuario
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Ingrese el nombre de usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="firstName" className="font-weight-bold">
                          <i className="fas fa-user mr-1"></i>
                          Nombre
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder="Nombre"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="lastName" className="font-weight-bold">
                          <i className="fas fa-user mr-1"></i>
                          Apellido
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Apellido"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phone" className="font-weight-bold">
                          <i className="fas fa-phone mr-1"></i>
                          Teléfono
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          placeholder="Número de teléfono"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="role" className="font-weight-bold">
                          <i className="fas fa-user-tag mr-1"></i>
                          Tipo de Usuario
                        </label>
                        <select 
                          className="form-control" 
                          id="role"
                          value={role} 
                          onChange={(e) => setRole(e.target.value)}
                        >
                          <option value="student">Estudiante</option>
                          <option value="professor">Profesor</option>
                          <option value="admin">Administrador</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="font-weight-bold">
                      <i className="fas fa-envelope mr-1"></i>
                      Correo Electrónico
                      <span className="badge badge-info ml-2">Generado automáticamente</span>
                    </label>
                    <input 
                      type="email" 
                      className="form-control bg-light"
                      id="email"
                      placeholder="Email" 
                      value={email} 
                      readOnly 
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="profilePictureUrl" className="font-weight-bold">
                      <i className="fas fa-image mr-1"></i>
                      URL de Foto de Perfil
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="profilePictureUrl"
                      placeholder="https://ejemplo.com/foto.jpg"
                      value={profilePictureUrl}
                      onChange={(e) => setProfilePictureUrl(e.target.value)}
                    />
                  </div>
                </div>

                {/* Campos específicos para Profesor */}
                {role === "professor" && (
                  <div className="form-section mb-4">
                    <h5 className="text-secondary mb-3">
                      <i className="fas fa-chalkboard-teacher mr-2"></i>
                      Información del Profesor
                    </h5>
                    
                    <div className="form-group">
                      <label htmlFor="employeeCode" className="font-weight-bold">
                        <i className="fas fa-id-badge mr-1"></i>
                        Código de Empleado
                        <span className="badge badge-info ml-2">Generado automáticamente</span>
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        id="employeeCode"
                        placeholder="Código de empleado"
                        value={employeeCode}
                        readOnly
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="hireDate" className="font-weight-bold">
                            <i className="fas fa-calendar-alt mr-1"></i>
                            Fecha de Contratación
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="hireDate"
                            value={hireDate}
                            onChange={(e) => setHireDate(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="department" className="font-weight-bold">
                            <i className="fas fa-building mr-1"></i>
                            Departamento
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="department"
                            placeholder="Departamento"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="academicTitle" className="font-weight-bold">
                            <i className="fas fa-graduation-cap mr-1"></i>
                            Título Académico
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="academicTitle"
                            placeholder="Ej: Dr., Mg., Ing."
                            value={academicTitle}
                            onChange={(e) => setAcademicTitle(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="officeLocation" className="font-weight-bold">
                            <i className="fas fa-map-marker-alt mr-1"></i>
                            Ubicación de Oficina
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="officeLocation"
                            placeholder="Ej: Piso 2, Oficina 201"
                            value={officeLocation}
                            onChange={(e) => setOfficeLocation(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Campos específicos para Estudiante */}
                {role === "student" && (
                  <div className="form-section mb-4">
                    <h5 className="text-secondary mb-3">
                      <i className="fas fa-user-graduate mr-2"></i>
                      Información del Estudiante
                    </h5>
                    
                    <div className="form-group">
                      <label htmlFor="career" className="font-weight-bold">
                        <i className="fas fa-book mr-1"></i>
                        Carrera
                      </label>
                      <select
                        className="form-control"
                        id="career"
                        value={career}
                        onChange={(e) => setCareer(e.target.value)}
                        required
                      >
                        <option value="">Seleccionar Carrera</option>
                        {careers.map((career) => (
                          <option key={career.id} value={career.id}>
                            {career.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="studentCode" className="font-weight-bold">
                        <i className="fas fa-id-card mr-1"></i>
                        Código de Estudiante
                        <span className="badge badge-info ml-2">Generado automáticamente</span>
                      </label>
                      <input
                        type="text"
                        className="form-control bg-light"
                        id="studentCode"
                        placeholder="Código de estudiante"
                        value={studentCode}
                        readOnly
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="enrollmentDate" className="font-weight-bold">
                            <i className="fas fa-calendar-plus mr-1"></i>
                            Fecha de Matrícula
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            id="enrollmentDate"
                            value={enrollmentDate}
                            onChange={(e) => setEnrollmentDate(e.target.value)}
                            required
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="currentSemester" className="font-weight-bold">
                            <i className="fas fa-layer-group mr-1"></i>
                            Semestre Actual
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="currentSemester"
                            placeholder="Semestre actual"
                            value={currentSemester}
                            onChange={(e) => setCurrentSemester(e.target.value)}
                            min="1"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="averageGrade" className="font-weight-bold">
                        <i className="fas fa-chart-line mr-1"></i>
                        Promedio General
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="averageGrade"
                        placeholder="Promedio general (0-20)"
                        value={averageGrade}
                        onChange={(e) => setAverageGrade(e.target.value)}
                        min="0"
                        max="20"
                        step="0.1"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Contraseña */}
                <div className="form-section mb-4">
                  <h5 className="text-secondary mb-3">
                    <i className="fas fa-lock mr-2"></i>
                    Credenciales de Acceso
                  </h5>
                  
                  <div className="form-group">
                    <label htmlFor="password" className="font-weight-bold">
                      <i className="fas fa-key mr-1"></i>
                      Contraseña
                      <span className="badge badge-info ml-2">Generada automáticamente</span>
                    </label>
                    <div className="input-group">
                      <input 
                        type={showPassword ? "text" : "password"}
                        className="form-control bg-light"
                        id="password"
                        placeholder="Contraseña generada" 
                        value={password} 
                        readOnly 
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <i className="fas fa-eye-slash"></i>
                          ) : (
                            <i className="fas fa-eye"></i>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="form-group text-center">
                  <button 
                    onClick={handleSubmit}
                    className="btn btn-primary btn-lg mr-3"
                  >
                    <i className="fas fa-plus-circle mr-2"></i>
                    Crear Usuario
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-lg"
                    onClick={resetForm}
                  >
                    <i className="fas fa-redo mr-2"></i>
                    Limpiar Formulario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
