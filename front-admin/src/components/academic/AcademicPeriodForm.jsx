import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const AcademicPeriodForm = ({ periodId, onCancel }) => {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [isEditMode, setIsEditMode] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (periodId) {
            setIsEditMode(true);
            setMessage({ type: '', text: '' }); // Limpiar mensajes
            axios.get(`http://127.0.0.1:8000/api-django/academic/periods/${periodId}/`)
                .then(response => {
                    const periodData = response.data;
                    setValue('name', periodData.name);
                    setValue('year', periodData.year);
                    setValue('term', periodData.term);
                    setValue('start_date', periodData.start_date);
                    setValue('end_date', periodData.end_date);
                })
                .catch(error => {
                    console.error("Error fetching academic period data:", error);
                    setMessage({ type: 'danger', text: 'Error al cargar los datos del período académico' });
                });
        } else {
            setIsEditMode(false);
            setMessage({ type: '', text: '' });
            reset(); // Limpiar el formulario
        }
    }, [periodId, setValue, reset]);

    const onSubmit = (data) => {
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        if (isEditMode) {
            axios.put(`http://127.0.0.1:8000/api-django/academic/periods/${periodId}/`, data)
                .then(response => {
                    setMessage({ type: 'success', text: 'Período académico actualizado exitosamente' });
                    // Eliminamos onFormSubmit, no es necesario
                    setTimeout(() => setMessage({ type: '', text: '' }), 3000); // Ocultar mensaje después de 3 segundos
                })
                .catch(error => {
                    console.error("Error updating academic period:", error);
                    setMessage({ type: 'danger', text: 'Error al actualizar el período académico' });
                })
                .finally(() => setIsLoading(false));
        } else {
            axios.post('http://127.0.0.1:8000/api-django/academic/periods/', data)
                .then(response => {
                    setMessage({ type: 'success', text: 'Período académico creado exitosamente' });
                    reset(); // Limpiar formulario después de crear
                    setTimeout(() => setMessage({ type: '', text: '' }), 3000); // Ocultar mensaje después de 3 segundos
                })
                .catch(error => {
                    console.error("Error creating academic period:", error);
                    setMessage({ type: 'danger', text: 'Error al crear el período académico' });
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
                                {isEditMode ? "Editar Período Académico" : "Agregar Nuevo Período Académico"}
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
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input
                                        id="name"
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        {...register("name", { required: "El nombre es obligatorio" })}
                                        disabled={isLoading}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="year" className="form-label">Año</label>
                                    <input
                                        id="year"
                                        type="number"
                                        className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                                        {...register("year", { required: "El año es obligatorio" })}
                                        disabled={isLoading}
                                    />
                                    {errors.year && <div className="invalid-feedback">{errors.year.message}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="term" className="form-label">Término</label>
                                    <input
                                        id="term"
                                        type="number"
                                        className={`form-control ${errors.term ? 'is-invalid' : ''}`}
                                        {...register("term", { required: "El término es obligatorio" })}
                                        disabled={isLoading}
                                    />
                                    {errors.term && <div className="invalid-feedback">{errors.term.message}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="start_date" className="form-label">Fecha de inicio</label>
                                    <input
                                        id="start_date"
                                        type="datetime-local"
                                        className={`form-control ${errors.start_date ? 'is-invalid' : ''}`}
                                        {...register("start_date", { required: "La fecha de inicio es obligatoria" })}
                                        disabled={isLoading}
                                    />
                                    {errors.start_date && <div className="invalid-feedback">{errors.start_date.message}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="end_date" className="form-label">Fecha de fin</label>
                                    <input
                                        id="end_date"
                                        type="datetime-local"
                                        className={`form-control ${errors.end_date ? 'is-invalid' : ''}`}
                                        {...register("end_date", { required: "La fecha de fin es obligatoria" })}
                                        disabled={isLoading}
                                    />
                                    {errors.end_date && <div className="invalid-feedback">{errors.end_date.message}</div>}
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

export default AcademicPeriodForm;
