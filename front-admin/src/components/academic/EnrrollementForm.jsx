
import { useState, useEffect } from 'react';
import enrollmentService from '../../services/enrrollementService'; // Importamos el servicio

const EnrollmentForm = () => {
  const [formData, setFormData] = useState({
    student: '',
    course: '',
    period: '',
    status: '', // Asumo que 'status' también es un campo, si no, puedes quitarlo
  });

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchSelectOptions = async () => {
      try {
        setLoading(true);
        // Aquí llamamos a las funciones del servicio para obtener los datos de los selects
        // Asegúrate de que tu API tenga estos endpoints o proporciona datos mock.
        const studentsData = await enrollmentService.getStudents();
        const coursesData = await enrollmentService.getCourses();
        const periodsData = await enrollmentService.getPeriods();

        setStudents(studentsData);
        setCourses(coursesData);
        setPeriods(periodsData);
      } catch (err) {
        setError("Error al cargar las opciones del formulario: " + err.message);
        console.error("Error fetching select options:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSelectOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores previos
    setSuccessMessage(null); // Limpiar mensajes de éxito previos

    try {
      // Los valores enviados a la API deben ser los IDs de los objetos relacionados
      // si tu API de Django espera claves foráneas como IDs.
      const enrollmentToCreate = {
        student: parseInt(formData.student), // Convertir a entero si el ID es numérico
        course: parseInt(formData.course),
        period: parseInt(formData.period),
        status: formData.status,
      };

      const newEnrollment = await enrollmentService.createEnrollment(enrollmentToCreate);
      console.log('Matrícula creada con éxito:', newEnrollment);
      setSuccessMessage('Matrícula creada con éxito!');
      // Opcional: limpiar el formulario después de la creación exitosa
      setFormData({
        student: '',
        course: '',
        period: '',
        status: '',
      });
    } catch (err) {
      setError("Error al crear la matrícula: " + err.message);
      console.error("Error creating enrollment:", err);
    }
  };

  if (loading) {
    return <p>Cargando opciones del formulario...</p>;
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2>Crear Nueva Matrícula</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="student" style={{ display: 'block', marginBottom: '5px' }}>Estudiante:</label>
          <select
            id="student"
            name="student"
            value={formData.student}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="">Selecciona un estudiante</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.first_name} {student.last_name} - {student.code} {/* Ajusta esto según los campos de tu modelo Student */}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="course" style={{ display: 'block', marginBottom: '5px' }}>Curso:</label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="">Selecciona un curso</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name} {/* Ajusta esto según los campos de tu modelo Course */}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="period" style={{ display: 'block', marginBottom: '5px' }}>Período:</label>
          <select
            id="period"
            name="period"
            value={formData.period}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="">Selecciona un período</option>
            {periods.map((period) => (
              <option key={period.id} value={period.id}>
                {period.name} {/* Ajusta esto según los campos de tu modelo Period */}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="status" style={{ display: 'block', marginBottom: '5px' }}>Estado:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            <option value="">Selecciona un estado</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="completado">Completado</option>
            {/* Agrega más opciones de estado según tus necesidades */}
          </select>
        </div>

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Crear Matrícula
        </button>
      </form>
    </div>
  );
};

export default EnrollmentForm;