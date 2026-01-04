import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Link } from '@/components/ui/link';
import { Eye, EyeOff, Lock, Mail, UserPlus } from 'lucide-react';
import type { useLoginModel } from './use-login.model';
import logo from '@/assets/logo.svg';

type LoginViewProps = ReturnType<typeof useLoginModel>;

export function LoginView({
  isLoading,
  error,
  showPassword,
  register,
  errors,
  handleSubmit,
  togglePasswordVisibility,
  navigateToRegister,
}: LoginViewProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <img src={logo} alt="FINANCY" className="h-8" />
      </div>
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Fazer login
          </h1>
          <p className="text-sm text-gray-600">
            Entre na sua conta para continuar
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-red-light p-4 border border-danger">
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <Input
              {...register('email')}
              id="email"
              type="email"
              label="E-mail"
              icon={Mail}
              autoComplete="email"
              error={errors.email?.message}
              placeholder="mail@exemplo.com"
            />

            <Input
              {...register('password')}
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Senha"
              icon={Lock}
              rightIcon={showPassword ? EyeOff : Eye}
              onRightIconClick={togglePasswordVisibility}
              autoComplete="current-password"
              error={errors.password?.message}
              placeholder="Digite sua senha"
            />
          </div>

          <div className="flex items-center justify-between">
            <Checkbox
              {...register('rememberMe')}
              id="rememberMe"
              label="Lembrar-me"
            />
            <Link to="/forgot-password" className="text-sm">
              Recuperar senha
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600">ou</span>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="md"
            icon={UserPlus}
            className="w-full"
            onClick={navigateToRegister}
          >
            Criar conta
          </Button>
        </form>
      </div>
    </div>
  );
}
