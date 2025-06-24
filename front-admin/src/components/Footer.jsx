import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-auto py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-danger">
              <i className="bi bi-mortarboard-fill me-2"></i>
              MentorIA
            </h5>
            <p className="mb-2">
              Sistema de gestión educativa para administradores, profesores y
              alumnos.
            </p>
            <p className="small text-muted mb-0">
              Desarrollado con React y Django
            </p>
          </div>

          <div className="col-md-3">
            <h6 className="text-danger">Enlaces Rápidos</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white-50 text-decoration-none">
                  <i className="bi bi-house me-1"></i>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" className="text-white-50 text-decoration-none">
                  <i className="bi bi-people me-1"></i>
                  Usuarios
                </a>
              </li>
              <li>
                <a href="#" className="text-white-50 text-decoration-none">
                  <i className="bi bi-gear me-1"></i>
                  Configuración
                </a>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="text-danger">Contacto</h6>
            <ul className="list-unstyled">
              <li className="text-white-50">
                <i className="bi bi-envelope me-1"></i>
                admin@mentoria.com
              </li>
              <li className="text-white-50">
                <i className="bi bi-telephone me-1"></i>
                +51 999 888 777
              </li>
              <li className="text-white-50">
                <i className="bi bi-geo-alt me-1"></i>
                Lima, Perú
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-3 border-secondary" />

        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0 text-white-50 small">
              © {new Date().getFullYear()} MentorIA. Todos los derechos
              reservados.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end justify-content-start gap-3">
              <a href="#" className="text-white-50">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="text-white-50">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="#" className="text-white-50">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a href="#" className="text-white-50">
                <i className="bi bi-instagram fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
