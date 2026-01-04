import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginSchema, type LoginFormData } from './login.schema';
import type { useLoginModel } from './use-login.model';

type LoginViewProps = ReturnType<typeof useLoginModel>;

export function LoginView({ isLoading, error, onSubmit }: LoginViewProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = (data: LoginFormData) => {
    onSubmit(data.email, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Financy
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Manage your personal finances
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
          {error && (
            <div className="rounded-md bg-red-50 p-4 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                {...register('password')}
                id="password"
                type="password"
                autoComplete="current-password"
                error={errors.password?.message}
                placeholder="Password"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            <Link to="/register" className="font-medium text-brand-base hover:text-brand-dark">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
