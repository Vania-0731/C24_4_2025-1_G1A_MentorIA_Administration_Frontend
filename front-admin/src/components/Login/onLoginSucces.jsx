import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const onLoginSuccess = (data) => {
  localStorage.setItem('access_token', data.token);
  navigate('/dashboard');
};
