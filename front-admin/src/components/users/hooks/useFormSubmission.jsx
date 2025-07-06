import { useState } from "react";
import { createStudent, updateStudent } from "../../../services/studentService";
import { createProfessor, updateProfessor } from "../../../services/professorService";
import { createAdmin, updateAdmin } from "../../../services/userService";

export const useFormSubmission = ({ 
  formState, 
  isEditing, 
  userToEdit, 
  navigate, 
  resetForm 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showErrorMessage = (error) => {
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      let errorMessage = "Error al procesar el formulario:\n";
      
      for (const [field, errors] of Object.entries(errorData)) {
        if (Array.isArray(errors)) {
          errorMessage += `${field}: ${errors.join(", ")}\n`;
        } else {
          errorMessage += `${field}: ${errors}\n`;
        }
      }
      
      alert(errorMessage);
    } else {
      alert("Error de conexión. Verifica que el servidor esté funcionando.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validar contraseña para admins en modo creación
    if (!isEditing && formState.role === "admin" && !formState.password) {
      alert("Los administradores deben tener una contraseña");
      setIsSubmitting(false);
      return;
    }

    try {
      // Datos básicos del usuario
      const baseUserData = {
        username: formState.username,
        first_name: formState.firstName,
        last_name: formState.lastName,
        phone: formState.phone,
        email: formState.email,
        profile_picture_url: formState.profilePictureUrl,
      };

      let result;

      // Manejar según el rol
      if (formState.role === "student") {
        const studentData = {
          ...baseUserData,
          career: `http://localhost:8000/api-django/academic/careers/${formState.career}/`,
          student_code: formState.studentCode,
          enrollment_date: formState.enrollmentDate,
          current_semester: parseInt(formState.currentSemester),
          average_grade: parseFloat(formState.averageGrade),
          status: "active",
        };

        if (isEditing) {
          result = await updateStudent(userToEdit.id, studentData);
        } else {
          result = await createStudent(studentData);
        }
      } else if (formState.role === "professor") {
        const professorData = {
          ...baseUserData,
          employee_code: formState.employeeCode,
          hire_date: formState.hireDate,
          department: formState.department,
          academic_title: formState.academicTitle,
          office_location: formState.officeLocation,
          status: "active",
        };

        if (isEditing) {
          result = await updateProfessor(userToEdit.id, professorData);
        } else {
          result = await createProfessor(professorData);
        }
      } else if (formState.role === "admin") {
        const adminData = {
          ...baseUserData,
          role: "admin",
        };

        // Solo incluir contraseña si estamos creando un usuario admin
        if (!isEditing && formState.password) {
          adminData.password = formState.password;
        }

        if (isEditing) {
          result = await updateAdmin(userToEdit.id, adminData);
        } else {
          result = await createAdmin(adminData);
        }
      }

      console.log("Success:", result);
      alert(
        isEditing
          ? "¡Usuario actualizado exitosamente!"
          : "¡Usuario creado exitosamente!"
      );

      if (isEditing) {
        navigate(-1);
      } else {
        resetForm();
      }
    } catch (error) {
      console.error("Error:", error);
      showErrorMessage(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting
  };
};