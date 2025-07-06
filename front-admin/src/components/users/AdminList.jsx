import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAdmins } from "../../services/userService"; // Importamos el servicio
import UserDetailModal from "./modals/UserDetailModal"; // Importamos el modal reutilizable

function AdminList() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // Filtros
  const [searchName, setSearchName] = useState(""); // Filtro por nombre

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const adminUsers = await getAdmins(); // Usamos el servicio para obtener los admins
        setAdmins(adminUsers);
        setFilteredAdmins(adminUsers);
      } catch (error) {
        console.error("Error fetching admins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  // Filtrar administradores según los criterios
  const filterAdmins = () => {
    let filtered = admins;

    if (searchName) {
      filtered = filtered.filter((admin) =>
        `${admin.username}`.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    setFilteredAdmins(filtered);
  };

  // Manejo de cambios en los filtros
  useEffect(() => {
    filterAdmins();
  }, [searchName]);

  const handleShowDetails = (admin) => {
    setSelectedAdmin(admin);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAdmin(null);
  };

  const handleEditUser = (admin) => {
    // Navegar a la ruta de crear usuario pero pasando el usuario a editar
    navigate('/create-user', { 
      state: { 
        userToEdit: admin,
        mode: 'edit' 
      } 
    });
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-danger">
              <i className="bi bi-shield-lock me-2"></i>
              Lista de Administradores
            </h2>
            <span className="badge bg-secondary fs-6">
              Total: {filteredAdmins.length} administradores
            </span>
          </div>

          {/* Filtros de búsqueda */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Buscar por nombre..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>

          {/* Tabla de administradores */}
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Código de Administrador</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      <div className="alert alert-info">
                        <i className="bi bi-info-circle me-2"></i>
                        No hay administradores registrados
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredAdmins.map((admin) => (
                    <tr key={admin.id} style={{ textAlign: "center" }}>
                      <td>{admin.username}</td>
                      <td>{admin.id}</td>
                      <td>{admin.role}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleShowDetails(admin)}
                            title="Ver detalles"
                          >
                            <i className="bi bi-eye me-1"></i>
                            Ver detalles
                          </button>
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => handleEditUser(admin)}
                            title="Editar usuario"
                          >
                            <i className="bi bi-pencil-square me-1"></i>
                            Editar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal con los detalles del administrador */}
      <UserDetailModal
        show={showModal}
        handleClose={handleCloseModal}
        selectedUser={selectedAdmin}
        userType="Administrador" // Aquí le pasamos el tipo de usuario
      />
    </div>
  );
}

export default AdminList;