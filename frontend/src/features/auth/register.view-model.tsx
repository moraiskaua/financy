import { useRegisterModel } from './use-register.model';
import { RegisterView } from './register.view';

export default function RegisterViewModel() {
  const modelProps = useRegisterModel();

  return <RegisterView {...modelProps} />;
}
