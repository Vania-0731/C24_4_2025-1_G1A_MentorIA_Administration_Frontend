const onLoginSuccess = (data) => {
  const userRole = data.user.role; // Asegúrate de que esta propiedad esté en la respuesta

  // Verifica si el rol es 'admin' antes de redirigir
  if (userRole === 'admin') {
    localStorage.setItem('access_token', data.token);  // Guardar el token
    localStorage.setItem('user', JSON.stringify(data.user));  // Guardar los datos del usuario
    navigate('/dashboard');  // Redirigir al dashboard si es admin
  } else {
    setError('Acceso denegado. Solo los administradores pueden acceder.');
  }
};
