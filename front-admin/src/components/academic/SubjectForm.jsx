import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const SubjectForm = ({ subjectId, onCancel }) => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [isEditMode, setIsEditMode] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (subjectId) {
            setIsEditMode(true);
            setMessage({ type: '', text: '' }); // Limpiar mensajes
            axios.get(`http://127.0.0.1:8000/api-django/academic/subjects/${subjectId}/`)
                .then(response => {
                    const subjectData = response.data;
                    setValue('name', subjectData.name);
                })
                .catch(error => {
                    console.error("Error fetching subject data:", error);
                    setMessage({ type: 'danger', text: 'Error al cargar los datos de la materia' });
                });
        } else {
            setIsEditMode(false);
            setMessage({ type: '', text: '' });
            reset(); // Limpiar el formulario
        }
    }, [subjectId, setValue, reset]);

    const onSubmit = (data) => {
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        if (isEditMode) {
            axios.put(`http://127.0.0.1:8000/api-django/academic/subjects/${subjectId}/`, data)
                .then(response => {
                    setMessage({ type: 'success', text: 'Materia actualizada exitosamente' });
                    // Aquí ya no usamos onFormSubmit, todo se maneja internamente
                    setTimeout(() => setMessage({ type: '', text: '' }), 3000); // Auto-ocultar mensaje después de 3 segundos
                })
                .catch(error => {
                    console.error("Error updating subject:", error);
                    setMessage({ type: 'danger', text: 'Error al actualizar la materia' });
                })
                .finally(() => setIsLoading(false));
        } else {
            axios.post('http://127.0.0.1:8000/api-django/academic/subjects/', data)
                .then(response => {
                    setMessage({ type: 'success', text: 'Materia creada exitosamente' });
                    reset(); // Limpiar formulario después de crear
                    setTimeout(() => setMessage({ type: '', text: '' }), 3000); // Auto-ocultar mensaje después de 3 segundos
                })
                .catch(error => {
                    console.error("Error creating subject:", error);
                    setMessage({ type: 'danger', text: 'Error al crear la materia' });
                })
                .finally(() => setIsLoading(false));
        }
    };

    const handleCancel = () => {
        setMessage({ type: '', text: '' });
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
                                {isEditMode ? "Editar Materia" : "Agregar Nueva Materia"}
                            </h2>
                        </div>
                        <div className="card-body">
                            {message.text && (
                                <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
                                    {message.text}
                                    <button 
                                        type="button" 
                                        className="btn-close" 
                                        onClick={() => setMessage({ type: '', text: '' })}
                                    ></button>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nombre de la Materia</label>
                                    <input
                                        id="name"
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        {...register("name", { required: "El nombre es obligatorio" })}
                                        disabled={isLoading}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
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
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                {isEditMode ? "Actualizando..." : "Creando..."}
                                            </>
                                        ) : (
                                            isEditMode ? "Actualizar" : "Crear"
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

export default SubjectForm;
