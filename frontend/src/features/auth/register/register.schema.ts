import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
