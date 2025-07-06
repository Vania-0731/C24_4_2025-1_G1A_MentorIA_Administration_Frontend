import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createCareer, getCareer, editCareer } from '../../services/careerService'; // Importamos las funciones del servicio

const CareerForm = ({ careerId, onCancel }) => {
    const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm();
    const [isEditMode, setIsEditMode] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    // Obtenemos el valor de 'name' para generar el código
    const name = watch('name', ''); // Detectar cambios en el nombre

    // Función para generar el código a partir del nombre de la carrera
    const generateCode = (name) => {
        const initials = name
            .split(' ') // Divide por espacios
            .map(word => word.charAt(0).toUpperCase()) // Toma la primera letra de cada palabra
            .join(''); // Une las iniciales
        return initials;
    };

    useEffect(() => {
        if (careerId) {
            setIsEditMode(true);
            setMessage({ type: '', text: '' }); // Limpiar mensajes
            // Llamamos al servicio de edición de carrera
            getCareer(careerId)
                .then((careerData) => {
                    setValue('code', careerData.code); // No editable en modo edición
                    setValue('name', careerData.name);
                })
                .catch(error => {
                    console.error("Error fetching career data:", error);
                    setMessage({ type: 'danger', text: 'Error al cargar los datos de la carrera' });
                });
        } else {
            setIsEditMode(false);
            setMessage({ type: '', text: '' });
            reset(); // Limpiar el formulario
        }
    }, [careerId, setValue, reset]);

    // Actualizamos el código automáticamente cuando el nombre cambia
    useEffect(() => {
        if (!isEditMode && name) {
            const generatedCode = generateCode(name);
            setValue('code', generatedCode); // Asignamos el código generado al campo 'code'
        }
    }, [name, isEditMode, setValue]);

    const onSubmit = (data) => {
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        if (isEditMode) {
            // Llamamos al servicio de actualización de carrera
            editCareer(careerId, data)
                .then(() => {
                    setMessage({ type: 'success', text: 'Carrera actualizada exitosamente' });
                    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
                })
                .catch((error) => {
                    console.error("Error updating career:", error);
                    setMessage({ type: 'danger', text: 'Error al actualizar la carrera' });
                })
                .finally(() => setIsLoading(false));
        } else {
            // Llamamos al servicio de creación de carrera
            createCareer(data)
                .then(() => {
                    setMessage({ type: 'success', text: 'Carrera creada exitosamente' });
                    reset(); // Limpiar formulario después de crear
                    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
                })
                .catch((error) => {
                    console.error("Error creating career:", error);
                    setMessage({ type: 'danger', text: 'Error al crear la carrera' });
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
                                {isEditMode ? "Editar Carrera" : "Agregar Nueva Carrera"}
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
                                    <label htmlFor="code" className="form-label">Código</label>
                                    <input
                                        id="code"
                                        type="text"
                                        className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                                        {...register("code", { required: "El código es obligatorio" })}
                                        value={watch('code')}  // Muestra el código generado
                                        readOnly // Solo lectura (no editable)
                                    />
                                    {errors.code && <div className="invalid-feedback">{errors.code.message}</div>}
                                </div>

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

export default CareerForm;
