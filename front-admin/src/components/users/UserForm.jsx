// UserForm.jsx - Componente principal refactorizado
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCareers } from "../../services/careerService";
import { getPeriods } from "../../services/academicPeriodService";

// Componentes separados
import BasicInfoForm from "./components/BasicInfoForm";
import ProfilePictureForm from "./components/ProfilePictureForm";
import PasswordForm from "./components/PasswordForm";
import StudentForm from "./StudentForm";
import ProfessorForm from "./ProfessorForm";
import FormButtons from "./components/FormButtons";

// Hooks personalizados
import { useUserFormState } from "./hooks/useUserFormState";
import { useUserFormEffects } from "./hooks/useUserFormEffects";
import { useFormSubmission } from "./hooks/useFormSubmission";

function UserForm() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const userToEdit = location.state?.userToEdit || null;
  const mode = location.state?.mode || "create";
  const isEditing = !!userToEdit;

  // Estado del formulario usando hook personalizado
  const {
    formState,
    setFormState,
    resetForm,
    updateField
  } = useUserFormState();

  // Estados para cargar datos
  const [careers, setCareers] = useState([]);
  const [periods, setPeriods] = useState([]);

  // Hook para manejar efectos del formulario
  useUserFormEffects({
    formState,
    updateField,
    userToEdit,
    isEditing,
    resetForm
  });

  // Hook para manejar el envío del formulario
  const { handleSubmit, isSubmitting } = useFormSubmission({
    formState,
    isEditing,
    userToEdit,
    navigate,
    resetForm
  });

  // Cargar carreras y períodos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [careerData, periodData] = await Promise.all([
          getCareers(),
          getPeriods(),
        ]);
        setCareers(careerData.results || careerData);
        setPeriods(periodData.results || periodData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCancel = () => {
    if (isEditing) {
      navigate(-1);
    } else {
      resetForm();
    }
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="card shadow-lg border-0">
            {/* Header */}
            <div
              className="card-header bg-gradient-primary text-white py-3"
              style={{ backgroundColor: "black" }}
            >
              <div className="d-flex align-items-center">
                <div className="bg-white bg-opacity-25 rounded-circle p-2 me-3">
                  <i
                    className={`fas ${
                      isEditing ? "fa-user-edit" : "fa-user-plus"
                    } fa-lg text-white`}
                  ></i>
                </div>
                <div>
                  <h3 className="card-title mb-0 fw-bold">
                    {isEditing ? "Editar Usuario" : "Crear Usuario"}
                  </h3>
                  <small className="opacity-75">
                    {isEditing
                      ? "Modifique la información del usuario seleccionado"
                      : "Complete la información para crear un nuevo usuario"}
                  </small>
                </div>
              </div>
            </div>

            {/* Form Body */}
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Información Básica */}
                <BasicInfoForm
                  formState={formState}
                  updateField={updateField}
                  isEditing={isEditing}
                />

                {/* Imagen de Perfil */}
                <ProfilePictureForm
                  profilePictureUrl={formState.profilePictureUrl}
                  setProfilePictureUrl={(url) => updateField('profilePictureUrl', url)}
                  isUploading={formState.isUploading}
                  setIsUploading={(uploading) => updateField('isUploading', uploading)}
                />

                {/* Contraseña */}
                <PasswordForm
                  formState={formState}
                  updateField={updateField}
                  isEditing={isEditing}
                />

                {/* Formulario específico por rol */}
                {formState.role === "professor" && (
                  <ProfessorForm
                    employeeCode={formState.employeeCode}
                    hireDate={formState.hireDate}
                    setHireDate={(date) => updateField('hireDate', date)}
                    department={formState.department}
                    setDepartment={(dept) => updateField('department', dept)}
                    academicTitle={formState.academicTitle}
                    setAcademicTitle={(title) => updateField('academicTitle', title)}
                    officeLocation={formState.officeLocation}
                    setOfficeLocation={(location) => updateField('officeLocation', location)}
                    isEditing={isEditing}
                  />
                )}

                {formState.role === "student" && (
                  <StudentForm
                    career={formState.career}
                    setCareer={(career) => updateField('career', career)}
                    careers={careers}
                    studentCode={formState.studentCode}
                    enrollmentDate={formState.enrollmentDate}
                    setEnrollmentDate={(date) => updateField('enrollmentDate', date)}
                    currentSemester={formState.currentSemester}
                    setCurrentSemester={(semester) => updateField('currentSemester', semester)}
                    averageGrade={formState.averageGrade}
                    setAverageGrade={(grade) => updateField('averageGrade', grade)}
                    periods={periods}
                    isEditing={isEditing}
                  />
                )}

                {/* Botones */}
                <FormButtons
                  isEditing={isEditing}
                  isSubmitting={isSubmitting}
                  isUploading={formState.isUploading}
                  onCancel={handleCancel}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;