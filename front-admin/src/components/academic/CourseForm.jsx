import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const CourseForm = ({ courseId, onFormSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [professors, setProfessors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    // Obtener lista de profesores (solo los que tengan el rol de profesor)
    axios
      .get("http://127.0.0.1:8000/api-django/auth/professors/")
      .then((response) => {
        setProfessors(response.data);
        console.log("Profesores recibidos:", response.data); // Verifica que los datos sean correctos
      })
      .catch((error) => {
        console.error("Error fetching professors:", error);
      });

    // Obtener lista de asignaturas (subjects)
    axios
      .get("http://127.0.0.1:8000/api-django/academic/subjects/")
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });

    if (courseId) {
      setIsEditMode(true);
      setMessage({ type: "", text: "" });
      axios
        .get(`http://127.0.0.1:8000/api-django/courses/courses/${courseId}/`)
        .then((response) => {
          const courseData = response.data;
          setValue("subject", courseData.subject);
          setValue("professor", courseData.professor);
        })
        .catch((error) => {
          console.error("Error fetching course data:", error);
          setMessage({
            type: "danger",
            text: "Error al cargar los datos del curso",
          });
        });
    } else {
      setIsEditMode(false);
      reset();
    }
  }, [courseId, setValue, reset]);

  const onSubmit = (data) => {
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    // Convertir professor y subject a enteros
    const formattedData = {
      ...data,
      professor: parseInt(data.professor, 10), // Convertir a entero
      subject: parseInt(data.subject, 10), // Convertir a entero
    };

    console.log("Datos enviados:", formattedData); // Verifica los datos convertidos

    if (isEditMode) {
      axios
        .put(
          `http://127.0.0.1:8000/api-django/courses/courses/${courseId}/`,
          formattedData
        )
        .then((response) => {
          setMessage({
            type: "success",
            text: "Curso actualizado exitosamente",
          });
          if (onFormSubmit) {
            onFormSubmit(response.data);  // Asegurándonos de que `onFormSubmit` sea una función
          }
          setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        })
        .catch((error) => {
          console.error("Error updating course:", error);
          if (error.response) {
            console.error("Detalles del error:", error.response.data); // Muestra el error detallado
            setMessage({
              type: "danger",
              text: `Error al actualizar el curso: ${
                error.response.data.detail || error.response.data
              }`,
            });
          } else {
            setMessage({
              type: "danger",
              text: "Error al actualizar el curso",
            });
          }
        })
        .finally(() => setIsLoading(false));
    } else {
      axios
        .post(
          "http://127.0.0.1:8000/api-django/courses/courses/",
          formattedData
        )
        .then((response) => {
          setMessage({ type: "success", text: "Curso creado exitosamente" });
          if (onFormSubmit) {
            onFormSubmit(response.data);  // Asegurándonos de que `onFormSubmit` sea una función
          }
          reset();
          setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        })
        .catch((error) => {
          console.error("Error creating course:", error);
          if (error.response) {
            console.error("Detalles del error:", error.response.data); // Muestra el error detallado
            setMessage({
              type: "danger",
              text: `Error al crear el curso: ${
                error.response.data.detail || error.response.data
              }`,
            });
          } else {
            setMessage({ type: "danger", text: "Error al crear el curso" });
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleCancel = () => {
    setMessage({ type: "", text: "" });
    reset();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title mb-0">
                {isEditMode ? "Editar Curso" : "Agregar Nuevo Curso"}
              </h2>
            </div>
            <div className="card-body">
              {message.text && (
                <div
                  className={`alert alert-${message.type} alert-dismissible fade show`}
                  role="alert"
                >
                  {message.text}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setMessage({ type: "", text: "" })}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Asignatura
                  </label>
                  <select
                    id="subject"
                    className={`form-select ${
                      errors.subject ? "is-invalid" : ""
                    }`}
                    {...register("subject", {
                      required: "La asignatura es obligatoria",
                    })}
                  >
                    <option value="">Seleccionar asignatura</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <div className="invalid-feedback">
                      {errors.subject.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="professor" className="form-label">
                    Profesor
                  </label>
                  <select
                    id="professor"
                    className={`form-select ${
                      errors.professor ? "is-invalid" : ""
                    }`}
                    {...register("professor", {
                      required: "El profesor es obligatorio",
                    })}
                  >
                    <option value="">Seleccionar profesor</option>
                    {professors.length > 0 ? (
                      professors.map((professor) => (
                        <option key={professor.id} value={professor.id}>
                          {professor.user_details
                            ? `${professor.user_details.first_name} ${professor.user_details.last_name}`
                            : "Sin nombre"}
                        </option>
                      ))
                    ) : (
                      <option disabled>Cargando profesores...</option> // Muestra un mensaje si no hay profesores cargados
                    )}
                  </select>

                  {errors.professor && (
                    <div className="invalid-feedback">
                      {errors.professor.message}
                    </div>
                  )}
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  {isEditMode && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCancel}
                      disabled={isLoading}
                    >
                      Cancelar
                    </button>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        {isEditMode ? "Actualizando..." : "Creando..."}
                      </>
                    ) : isEditMode ? (
                      "Actualizar"
                    ) : (
                      "Crear"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
