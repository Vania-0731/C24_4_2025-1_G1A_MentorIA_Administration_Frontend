// hooks/useUserFormEffects.js
import { useEffect } from "react";

export const useUserFormEffects = ({ 
  formState, 
  updateField, 
  userToEdit, 
  isEditing, 
  resetForm 
}) => {
  // Inicializar formulario cuando userToEdit cambia
  useEffect(() => {
    if (isEditing && userToEdit) {
      loadUserData();
    } else {
      resetForm();
    }
  }, [userToEdit, isEditing]);

  // Auto-generar email solo en modo creación
  useEffect(() => {
    if (!isEditing && formState.firstName && formState.lastName) {
      const email = `${formState.firstName.toLowerCase()}.${formState.lastName.toLowerCase()}@tecsup.edu.pe`;
      updateField('email', email);
    }
  }, [formState.firstName, formState.lastName, isEditing]);

  // Auto-generar contraseña solo en modo creación y para admins
  useEffect(() => {
    if (!isEditing && formState.role === "admin" && formState.firstName && formState.lastName && formState.phone) {
      const tempPassword = `${formState.firstName.toLowerCase()}${formState.lastName.toLowerCase()}${formState.phone.slice(-4)}`;
      updateField('password', tempPassword);
    } else if (formState.role !== "admin") {
      updateField('password', '');
    }
  }, [formState.firstName, formState.lastName, formState.phone, formState.role, isEditing]);

  // Auto-generar código de estudiante solo en modo creación
  useEffect(() => {
    if (!isEditing && formState.role === "student" && formState.firstName && formState.lastName) {
      const generatedStudentCode = `${formState.firstName.substring(0, 3)}${formState.lastName.substring(0, 3)}${Math.floor(Math.random() * 1000)}`;
      updateField('studentCode', generatedStudentCode);
    }
  }, [formState.role, formState.firstName, formState.lastName, isEditing]);

  // Auto-generar código de empleado solo en modo creación
  useEffect(() => {
    if (!isEditing && formState.role === "professor" && formState.firstName && formState.lastName) {
      const currentYear = new Date().getFullYear();
      const generatedEmployeeCode = `PROF${currentYear}${formState.firstName.substring(0, 2).toUpperCase()}${formState.lastName.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 100).toString().padStart(2, "0")}`;
      updateField('employeeCode', generatedEmployeeCode);
    }
  }, [formState.role, formState.firstName, formState.lastName, isEditing]);

  // Asignar fecha de matrícula solo en modo creación
  useEffect(() => {
    if (!isEditing) {
      const currentDate = new Date().toISOString().split("T")[0];
      updateField('enrollmentDate', currentDate);
    }
  }, [isEditing]);

  const loadUserData = () => {
    updateField('username', userToEdit.username || "");
    updateField('firstName', userToEdit.first_name || "");
    updateField('lastName', userToEdit.last_name || "");
    updateField('phone', userToEdit.phone || "");
    updateField('role', userToEdit.role || "student");
    updateField('email', userToEdit.email || "");
    updateField('profilePictureUrl', userToEdit.profile_picture_url || "");
    updateField('password', "");

    // Cargar datos específicos según el rol
    if (userToEdit.role === "student") {
      const careerId = userToEdit.career ? userToEdit.career.split("/").filter(Boolean).pop() : "";
      updateField('career', careerId);
      updateField('studentCode', userToEdit.student_code || "");
      updateField('enrollmentDate', userToEdit.enrollment_date || "");
      updateField('currentSemester', userToEdit.current_semester || 1);
      updateField('averageGrade', userToEdit.average_grade || 0.0);
    } else if (userToEdit.role === "professor") {
      updateField('employeeCode', userToEdit.employee_code || "");
      updateField('hireDate', userToEdit.hire_date || "");
      updateField('department', userToEdit.department || "");
      updateField('academicTitle', userToEdit.academic_title || "");
      updateField('officeLocation', userToEdit.office_location || "");
    }
  };
};