import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubjectForm from './SubjectForm';

const SubjectList = ({onShowCursoForm}) => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjectId, setSelectedSubjectId] = useState(null);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api-django/academic/subjects/')
            .then(response => {
                setSubjects(response.data);
            })
            .catch(error => {
                console.error("Error fetching subjects:", error);
            });
    }, []);

    const handleFormSubmit = (subject) => {
        if (selectedSubjectId) {
            setSubjects(subjects.map(item => (item.id === subject.id ? subject : item)));
        } else {
            setSubjects([...subjects, subject]);
        }
        setSelectedSubjectId(null); // Limpiar el ID seleccionado después de enviar el formulario
    };

    const handleEditSubject = (id) => {
        setSelectedSubjectId(id); // Seleccionar la materia para editar
    };

    const handleDeleteSubject = (id) => {
        axios.delete(`http://127.0.0.1:8000/api-django/academic/subjects/${id}/`)
            .then(() => {
                setSubjects(subjects.filter(subject => subject.id !== id));
            })
            .catch(error => {
                console.error("Error deleting subject:", error);
            });
    };

    // Función para mostrar el formulario vacío para agregar una nueva materia
    const handleNewSubject = () => {
        setSelectedSubjectId(null);
    };

    // Función para cancelar y cerrar el formulario de edición
    const handleCancel = () => {
        setSelectedSubjectId(null);
    };

    return (
        <div className="container mt-4">
            {/* Solo renderizar el formulario si hay un ID seleccionado (editar) o si estamos creando uno nuevo */}
            {(selectedSubjectId || selectedSubjectId === 0) && (
                <SubjectForm 
                    subjectId={selectedSubjectId} 
                    onFormSubmit={handleFormSubmit}
                    onCancel={handleCancel}
                />
            )}
            
            <div className="mt-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0"></h2>
                    <button
                        className="btn btn-outline-success"
                        onClick={() => onShowCursoForm()}// Mostrar el formulario vacío para una nueva materia
                    >
                        Agregar Nueva Materia
                    </button>
                </div>

                {subjects.length === 0 ? (
                    <div className="alert alert-info text-center">
                        <h5>No hay materias registradas</h5>
                        <p className="mb-0">Agrega tu primera materia usando el formulario de arriba.</p>
                    </div>
                ) : (
                    <div className="row">
                        {subjects.map(subject => (
                            <div key={subject.id} className="col-md-6 col-lg-4 mb-3">
                                <div className="card h-100">
                                    <div className="card-header bg-warning text-dark">
                                        <h5 className="card-title mb-0">{subject.name}</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <i className="fas fa-book me-2 text-warning"></i>
                                            <span className="text-muted">Materia académica</span>
                                        </div>
                                    </div>
                                    <div className="card-footer bg-transparent">
                                        <div className="d-grid gap-2 d-md-flex">
                                            <button 
                                                className="btn btn-outline-primary btn-sm flex-fill"
                                                onClick={() => handleEditSubject(subject.id)} // Editar materia
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-outline-danger btn-sm flex-fill"
                                                onClick={() => {
                                                    if (window.confirm('¿Estás seguro de que deseas eliminar esta materia?')) {
                                                        handleDeleteSubject(subject.id); // Eliminar materia
                                                    }
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubjectList;
