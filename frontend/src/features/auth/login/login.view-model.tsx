import { useLoginModel } from './use-login.model';
import { LoginView } from './login.view';

export default function LoginViewModel() {
  const model = useLoginModel();

  return <LoginView {...model} />;
}