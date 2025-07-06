// hooks/useUserFormState.js
import { useState } from "react";

export const useUserFormState = () => {
  const [formState, setFormState] = useState({
    // Información básica
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "student",
    email: "",
    password: "",
    profilePictureUrl: "",
    showPassword: false,
    isUploading: false,
    isSubmitting: false,
    
    // Datos de profesor
    employeeCode: "",
    hireDate: "",
    department: "",
    academicTitle: "",
    officeLocation: "",
    
    // Datos de estudiante
    career: "",
    studentCode: "",
    enrollmentDate: "",
    currentSemester: 1,
    averageGrade: 0.0,
  });

  const updateField = (field, value) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormState({
      username: "",
      firstName: "",
      lastName: "",
      phone: "",
      role: "student",
      email: "",
      password: "",
      profilePictureUrl: "",
      showPassword: false,
      isUploading: false,
      isSubmitting: false,
      employeeCode: "",
      hireDate: "",
      department: "",
      academicTitle: "",
      officeLocation: "",
      career: "",
      studentCode: "",
      enrollmentDate: new Date().toISOString().split("T")[0],
      currentSemester: 1,
      averageGrade: 0.0,
    });
  };

  return {
    formState,
    setFormState,
    resetForm,
    updateField
  };
};