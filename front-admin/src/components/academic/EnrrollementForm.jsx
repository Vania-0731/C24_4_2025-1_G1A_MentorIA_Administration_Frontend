// components/Enrollments/EnrrollementForm.jsx

import { useState, useEffect } from "react";
import enrollmentService from "../../services/enrrollementService";

const EnrollmentForm = ({ onCancel, onFormSubmit }) => { // enrollmentId ya no es necesario
  const [formData, setFormData] = useState({
    student: "",
    course: "",
    period: "",
    status: "",
  });
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // useEffect para cargar las opciones de los select (estudiantes, cursos, períodos)
  useEffect(() => {
    const fetchSelectOptions = async () => {
      try {
        setLoadingOptions(true);
        setError(null);
        const studentsData = await enrollmentService.getStudents();
        const coursesData = await enrollmentService.getCourses();
        const periodsData = await enrollmentService.getPeriods();
        setStudents(studentsData);
        setCourses(coursesData);
        setPeriods(periodsData);
      } catch (err) {
        setError("Error al cargar las opciones del formulario.");
        console.error("Error fetching select options:", err);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchSelectOptions();
  }, []); // Se ejecuta solo una vez al montar

  // Resetear el formulario cuando se va a crear una nueva matrícula
  useEffect(() => {
    setFormData({
      student: "",
      course: "",
      period: "",
      status: "",
    });
    setSuccessMessage(null);
    setError(null);
  }, [onFormSubmit]); // Se reinicia cada vez que se envía el formulario

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const enrollmentDataToSend = {
      student: formData.student,
      course: formData.course,
      period: formData.period,
      status: formData.status,
    };

    try {
      await enrollmentService.createEnrollment(enrollmentDataToSend); // Solo crear
      setSuccessMessage("Matrícula creada con éxito!");
      // Llamar a onFormSubmit para que EnrollmentList actualice la tabla
      if (onFormSubmit) {
        onFormSubmit();
      }
      // Opcional: limpiar el formulario después de una creación exitosa
      setFormData({
        student: "",
        course: "",
        period: "",
        status: "",
      });
    } catch (err) {
      let errorMessage = "Error al crear la matrícula.";
      if (err.response && err.response.data) {
        errorMessage += " Detalles: " + JSON.stringify(err.response.data);
      } else {
        errorMessage += " " + err.message;
      }
      setError(errorMessage);
      console.error("Error creating enrollment:", err);
    }
  };

  if (loadingOptions) { // Solo necesitamos loadingOptions ahora
    return <p className="text-center text-primary">Cargando formulario...</p>;
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Crear Nueva Matrícula</h2> {/* Título fijo */}
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="student" style={{ display: "block", marginBottom: "5px" }}>
            Estudiante:
          </label>
          <select
            id="student"
            name="student"
            value={formData.student}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          >
            <option value="">Selecciona un estudiante</option>
            {students.map((student) => (
              <option key={student.id} value={student.url}>
                {student.user_details.first_name} {student.user_details.last_name} - {student.student_code}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="course" style={{ display: "block", marginBottom: "5px" }}>
            Curso:
          </label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          >
            <option value="">Selecciona un curso</option>
            {courses.map((course) => (
              <option key={course.id} value={course.url}>
                {course.display_name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="period" style={{ display: "block", marginBottom: "5px" }}>
            Período:
          </label>
          <select
            id="period"
            name="period"
            value={formData.period}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          >
            <option value="">Selecciona un período</option>
            {periods.map((period) => (
              <option key={period.id} value={period.url}>
                {period.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="status" style={{ display: "block", marginBottom: "5px" }}>
            Estado:
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }}
          >
            <option value="">Selecciona un estado</option>
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
            <option value="completed">Completado</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%", marginBottom: "10px" }}
        >
          Crear Matrícula
        </button>
      </form>
    </div>
  );
};

export default EnrollmentForm;