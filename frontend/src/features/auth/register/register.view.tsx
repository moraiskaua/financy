import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Eye, EyeOff, Lock, Mail, User as UserIcon } from 'lucide-react';
import type { useRegisterModel } from './use-register.model';

type RegisterViewProps = ReturnType<typeof useRegisterModel>;

export function RegisterView({
  isLoading,
  error,
  register,
  errors,
  handleSubmit,
  showPassword,
  togglePasswordVisibility,
  navigateToLogin,
}: RegisterViewProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <img src={logo} alt="FINANCY" className="h-8" />
      </div>
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Criar conta</h1>
          <p className="text-sm text-gray-600">
            Comece a controlar suas finanças ainda hoje
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
              {...register('name')}
              id="name"
              type="text"
              label="Nome completo"
              icon={UserIcon}
              autoComplete="name"
              error={errors.name?.message}
              placeholder="Seu nome completo"
            />

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
              autoComplete="new-password"
              error={errors.password?.message}
              helper="A senha deve ter no mínimo 8 caracteres"
              placeholder="Digite sua senha"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600">ou</span>
            </div>
          </div>

          <div className="text-center text-sm mb-4">
            <span className="text-gray-600">Já tem uma conta? </span>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="md"
            icon={ArrowRight}
            className="w-full"
            onClick={navigateToLogin}
          >
            Fazer login
          </Button>
        </form>
      </div>
    </div>
  );
}
