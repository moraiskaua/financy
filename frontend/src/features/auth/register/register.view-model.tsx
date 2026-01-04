import { useNavigate } from 'react-router-dom';
import { useRegisterModel } from './use-register.model';
import { RegisterView } from './register.view';

export default function RegisterViewModel() {
  const model = useRegisterModel();
  const navigate = useNavigate();

  const handleSubmit = async (email: string, password: string) => {
    const success = await model.onSubmit(email, password);
    if (success) {
      navigate('/');
    }
    return success;
  };

  return <RegisterView {...model} onSubmit={handleSubmit} />;
}