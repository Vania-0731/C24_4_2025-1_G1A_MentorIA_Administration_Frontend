import { useState, useEffect } from "react";
import axios from "axios";  // Add this import to avoid ReferenceError: axios is not defined
import enrollmentService from "../../services/enrrollementService"; // Asegúrate de que la ruta sea correcta

const EnrollmentList = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const data = await enrollmentService.getAllEnrollments();

        // Para mostrar nombres legibles en lugar de URLs, necesitamos obtener los detalles
        // de estudiante, curso y período para cada matrícula.
        const enrollmentsWithDetails = await Promise.all(
          data.map(async (enrollment) => {
            let studentDetails = {};
            let courseDetails = {};
            let periodDetails = {};

            try {
              // Obtener detalles del estudiante
              const studentRes = await axios.get(enrollment.student);
              studentDetails = studentRes.data.user_details; // Asume que user_details tiene first_name y last_name
            } catch (err) {
              console.error(`Error fetching student details for ${enrollment.student}:`, err);
              studentDetails = { first_name: "Error", last_name: "Cargando" };
            }

            try {
              // Obtener detalles del curso (ya tienes lógica para display_name en getCourses, podríamos reutilizarla)
              const courseRes = await axios.get(enrollment.course);
              const courseData = courseRes.data;

              // Para el display_name del curso en la lista, podrías necesitar una llamada adicional si courseData
              // no incluye los detalles del subject y professor directamente, o usar los getCourses del servicio.
              // Para simplificar aquí, asumimos que courseData tiene 'display_name' o 'name'.
              let courseDisplayName = courseData.display_name || courseData.name || `Curso ${courseData.id}`;

              // Si necesitas los detalles completos como en getCourses, podrías modificar así:
              try {
                  const subjectRes = await axios.get(courseData.subject);
                  const professorRes = await axios.get(courseData.professor);
                  courseDisplayName = `${subjectRes.data.name || subjectRes.data.title || 'Sin nombre'} - ${professorRes.data.first_name} ${professorRes.data.last_name}`;
              } catch (subErr) {
                  console.warn("Could not fetch full course details for display name:", subErr);
              }
              
              courseDetails = { name: courseDisplayName };

            } catch (err) {
              console.error(`Error fetching course details for ${enrollment.course}:`, err);
              courseDetails = { name: "Error cargando Curso" };
            }

            try {
              // Obtener detalles del período
              const periodRes = await axios.get(enrollment.period);
              periodDetails = periodRes.data;
            } catch (err) {
              console.error(`Error fetching period details for ${enrollment.period}:`, err);
              periodDetails = { name: "Error cargando Período" };
            }

            return {
              ...enrollment,
              student_name: `${studentDetails.first_name} ${studentDetails.last_name}`,
              course_name: courseDetails.name,
              period_name: periodDetails.name,
            };
          })
        );
        setEnrollments(enrollmentsWithDetails);
      } catch (err) {
        setError("Error al cargar las matrículas: " + err.message);
        console.error("Error fetching enrollments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  if (loading) {
    return <p>Cargando matrículas...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Lista de Matrículas</h2>
      {enrollments.length === 0 ? (
        <p>No hay matrículas registradas.</p>
      ) : (
        <table
          style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={tableHeaderStyle}>ID</th>
              <th style={tableHeaderStyle}>Estudiante</th>
              <th style={tableHeaderStyle}>Curso</th>
              <th style={tableHeaderStyle}>Período</th>
              <th style={tableHeaderStyle}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={tableCellStyle}>{enrollment.id}</td>
                <td style={tableCellStyle}>{enrollment.student_name}</td>
                <td style={tableCellStyle}>{enrollment.course_name}</td>
                <td style={tableCellStyle}>{enrollment.period_name}</td>
                <td style={tableCellStyle}>{enrollment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const tableHeaderStyle = {
  padding: "12px 8px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const tableCellStyle = {
  padding: "8px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

export default EnrollmentList;
