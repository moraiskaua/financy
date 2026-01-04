import { useNavigate } from 'react-router-dom';
import { useLoginModel } from './use-login.model';
import { LoginView } from './login.view';

export default function LoginViewModel() {
  const model = useLoginModel();
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    const success = await model.onSubmit(email, password);
    if (success) {
      navigate('/');
    }
    return success;
  };

  return <LoginView {...model} onSubmit={handleSubmit} />;
}
