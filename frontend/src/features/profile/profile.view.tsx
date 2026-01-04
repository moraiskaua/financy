import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, LogOut } from 'lucide-react';
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome completo
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <Input
              value={user?.email || ''}
              disabled
              className="bg-gray-50 text-gray-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              O e-mail não pode ser alterado
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <Button
              className="w-full bg-green-700 hover:bg-green-800 text-white"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar alterações'}
            </Button>

            <Button
              variant="ghost"
              className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-red-600 group"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2 group-hover:text-red-600 transition-colors" />
              Sair da conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
