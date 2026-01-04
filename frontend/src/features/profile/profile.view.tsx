import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, LogOut, Mail, User as UserIcon } from 'lucide-react';
import type { useProfileModel } from './use-profile.model';

type ProfileViewProps = ReturnType<typeof useProfileModel>;

export function ProfileView({
  isLoading,
  user,
  name,
  setName,
  initials,
  handleSave,
  handleLogout,
}: ProfileViewProps) {
  if (isLoading && !user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="flex justify-center pt-10">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl font-medium text-gray-600">{initials}</span>
          </div>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h1>
        <p className="text-sm text-gray-500 mb-8">{user?.email}</p>

        <div className="space-y-4 text-left">
          <Input
            label="Nome completo"
            icon={UserIcon}
            value={name || user?.name || ''}
            onChange={(e) => setName(e.target.value)}
            className="bg-white"
          />

          <Input
            label="E-mail"
            icon={Mail}
            value={user?.email || ''}
            disabled
            helper="O e-mail não pode ser alterado"
          />

          <div className="pt-4 space-y-3">
            <Button
              variant="primary"
              className="w-full"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar alterações'}
            </Button>

            <Button
              variant="ghost"
              icon={LogOut}
              className="w-full border-gray-200 text-red-600 hover:text-red-700"
              onClick={handleLogout}
            >
              Sair da conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
