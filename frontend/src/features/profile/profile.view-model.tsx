import { ProfileView } from './profile.view';
import { useProfileModel } from './use-profile.model';

export default function ProfileViewModel() {
  const model = useProfileModel();

  return <ProfileView {...model} />;
}
