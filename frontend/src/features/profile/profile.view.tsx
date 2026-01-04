import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';
import {
    Bell,
    Camera,
    CreditCard,
    Globe,
    Loader2,
    Lock,
    LogOut,
    Mail,
    Moon,
    Save,
    Shield,
    Smartphone,
    User,
    X
} from 'lucide-react';
import { Switch } from '../../components/ui/switch';
import type { useProfileModel } from './use-profile.model';

type ProfileViewProps = ReturnType<typeof useProfileModel>;

export function ProfileView({
  profile,
  isLoading,
  isEditing,
  handleEditToggle,
  handleSave,
  handleInputChange,
  handleNotificationChange,
  handleAvatarChange
}: ProfileViewProps) {
  if (isLoading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="relative mb-20">
        <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-sm"></div>
        <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleAvatarChange(e.target.files[0])}
                />
              </label>
            )}
          </div>
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-500">{profile.role} • Membro desde {profile.joinDate}</p>
          </div>
        </div>
        <div className="absolute bottom-4 right-8">
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <Button variant="ghost" onClick={handleEditToggle} className="border-red-200 text-red-600 hover:bg-red-50">
                  <X className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </Button>
              </>
            ) : (
              <Button onClick={handleEditToggle} variant="ghost" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                Editar Perfil
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <User className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Informações Pessoais</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="name"
                label="Nome Completo"
                value={profile.name}
                disabled={!isEditing}
                onChange={(e) => handleInputChange('name', e.target.value)}
                icon={User}
              />

              <Input
                id="email"
                type="email"
                label="Email"
                value={profile.email}
                disabled={!isEditing}
                onChange={(e) => handleInputChange('email', e.target.value)}
                icon={Mail}
              />

              <Input
                id="phone"
                label="Telefone"
                value={profile.phone}
                disabled={!isEditing}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                icon={Smartphone}
                placeholder="(00) 00000-0000"
              />

              <div className="space-y-1">
                <label htmlFor="language" className="block text-sm font-medium text-gray-800 mb-1">Idioma</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select
                    id="language"
                    value={profile.language}
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className={cn(
                      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                      "pl-9"
                    )}
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <Shield className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Segurança</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white rounded-md shadow-sm">
                    <Lock className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Senha</p>
                    <p className="text-sm text-gray-500">Última alteração há 3 meses</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" disabled={!isEditing}>Alterar Senha</Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white rounded-md shadow-sm">
                    <Smartphone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Autenticação em Dois Fatores</p>
                    <p className="text-sm text-gray-500">Adicione uma camada extra de segurança</p>
                  </div>
                </div>
                <Switch disabled={!isEditing} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Preferências</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">Moeda Principal</label>
                <select
                  value={profile.currency}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="BRL">Real Brasileiro (BRL)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-800">Tema</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleInputChange('theme', 'light')}
                    disabled={!isEditing}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-lg border transition-all",
                      profile.theme === 'light' 
                        ? "border-blue-600 bg-blue-50 text-blue-600" 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-current mb-2" />
                    <span className="text-xs font-medium">Claro</span>
                  </button>
                  <button
                    onClick={() => handleInputChange('theme', 'dark')}
                    disabled={!isEditing}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-lg border transition-all",
                      profile.theme === 'dark' 
                        ? "border-blue-600 bg-blue-50 text-blue-600" 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <Moon className="w-4 h-4 mb-2" />
                    <span className="text-xs font-medium">Escuro</span>
                  </button>
                  <button
                    onClick={() => handleInputChange('theme', 'system')}
                    disabled={!isEditing}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-lg border transition-all",
                      profile.theme === 'system' 
                        ? "border-blue-600 bg-blue-50 text-blue-600" 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <Smartphone className="w-4 h-4 mb-2" />
                    <span className="text-xs font-medium">Auto</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <Bell className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Notificações</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-sm font-medium text-gray-800">Email Marketing</span>
                  <p className="text-xs text-gray-500">Novidades e dicas</p>
                </div>
                <Switch
                  checked={profile.notifications.email}
                  disabled={!isEditing}
                  onCheckedChange={() => handleNotificationChange('email')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-sm font-medium text-gray-800">Push Notifications</span>
                  <p className="text-xs text-gray-500">Alertas em tempo real</p>
                </div>
                <Switch
                  checked={profile.notifications.push}
                  disabled={!isEditing}
                  onCheckedChange={() => handleNotificationChange('push')}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-sm font-medium text-gray-800">Relatório Mensal</span>
                  <p className="text-xs text-gray-500">Resumo financeiro</p>
                </div>
                <Switch
                  checked={profile.notifications.monthlyReport}
                  disabled={!isEditing}
                  onCheckedChange={() => handleNotificationChange('monthlyReport')}
                />
              </div>
            </div>
          </div>

          <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-2" />
            Sair da Conta
          </Button>
        </div>
      </div>
    </div>
  );
}
