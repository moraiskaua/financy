import { useRegisterModel } from './use-register.model';
import { RegisterView } from './register.view';

export default function RegisterViewModel() {
  const model = useRegisterModel();

  return <RegisterView {...model} />;
}
