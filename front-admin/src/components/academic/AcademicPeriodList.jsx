import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AcademicPeriodForm from './AcademicPeriodForm';

const AcademicPeriodList = ({ onShowPeriodoForm }) => {
    const [periods, setPeriods] = useState([]);
    const [selectedPeriodId, setSelectedPeriodId] = useState(null); // Estado para editar

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api-django/academic/periods/')
            .then(response => {
                setPeriods(response.data);
            })
            .catch(error => {
                console.error("Error fetching academic periods:", error);
            });
    }, []);

    const handleFormSubmit = (period) => {
        if (selectedPeriodId) {
            setPeriods(periods.map(item => (item.id === period.id ? period : item))); // Editar período académico
        } else {
            setPeriods([...periods, period]); // Nuevo período académico
        }
        setSelectedPeriodId(null); // Limpiar el ID seleccionado después de enviar el formulario
    };

    const handleEditPeriod = (id) => {
        setSelectedPeriodId(id); // Seleccionar período académico para editar
    };

    const handleDeletePeriod = (id) => {
        axios.delete(`http://127.0.0.1:8000/api-django/academic/periods/${id}/`)
            .then(() => {
                setPeriods(periods.filter(period => period.id !== id)); // Eliminar período académico
            })
            .catch(error => {
                console.error("Error deleting academic period:", error);
            });
    };

    return (
        <div className="container mt-4">
            {/* Solo renderizar el formulario si hay un período seleccionado para editar o si estamos creando uno nuevo */}
            {(selectedPeriodId || selectedPeriodId === 0) && (
                <AcademicPeriodForm 
                    periodId={selectedPeriodId} 
                    onFormSubmit={handleFormSubmit}
                />
            )}
            
            <div className="mt-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0">Lista de Períodos Académicos</h2>
                    <button
                        className="btn btn-outline-success"
                        onClick={() => onShowPeriodoForm()} // Cambia el estado para mostrar el formulario
                    >
                        Agregar Nuevo Período Académico
                    </button>
                </div>

                {periods.length === 0 ? (
                    <div className="alert alert-info text-center">
                        <h5>No hay períodos académicos registrados</h5>
                        <p className="mb-0">Agrega tu primer período académico usando el formulario de arriba.</p>
                    </div>
                ) : (
                    <div className="row">
                        {periods.map(period => (
                            <div key={period.id} className="col-md-6 col-lg-4 mb-3">
                                <div className="card h-100">
                                    <div className="card-header bg-primary text-white">
                                        <h5 className="card-title mb-0">{period.name}</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-2">
                                            <strong>Año:</strong> {period.year}
                                        </div>
                                        <div className="mb-2">
                                            <strong>Término:</strong> {period.term}
                                        </div>
                                        {period.start_date && (
                                            <div className="mb-2">
                                                <strong>Inicio:</strong> {new Date(period.start_date).toLocaleDateString()}
                                            </div>
                                        )}
                                        {period.end_date && (
                                            <div className="mb-3">
                                                <strong>Fin:</strong> {new Date(period.end_date).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-footer bg-transparent">
                                        <div className="d-grid gap-2 d-md-flex">
                                            <button 
                                                className="btn btn-outline-primary btn-sm flex-fill"
                                                onClick={() => handleEditPeriod(period.id)} // Seleccionamos el período a editar
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                className="btn btn-outline-danger btn-sm flex-fill"
                                                onClick={() => {
                                                    if (window.confirm('¿Estás seguro de que deseas eliminar este período académico?')) {
                                                        handleDeletePeriod(period.id); // Eliminamos el período
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

export default AcademicPeriodList;
