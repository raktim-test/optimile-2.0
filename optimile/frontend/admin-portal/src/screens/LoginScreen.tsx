import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginValues } from '@/lib/schemas/auth';
import { FormField } from '@/components/ui/FormField';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { apiClient } from '@/api/apiClient';
import { useAuthStore } from '@/store/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LoginScreen() {
  const [error, setError] = useState('');
  const login = useAuthStore((s) => s.login);
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema), defaultValues: { username: 'admin', password: 'admin' } });

  const onSubmit = handleSubmit(async (values) => {
    const res = await apiClient.login(values.username, values.password);
    if (!res.success) return setError(res.error.message);
    login(res.data.token, res.data.name);
    nav('/tenants');
  });

  return (
    <div className="grid h-screen place-items-center bg-slate-100">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-3 rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Super Admin Login</h1>
        <FormField label="Username" error={errors.username?.message}><Input {...register('username')} /></FormField>
        <FormField label="Password" error={errors.password?.message}><Input type="password" {...register('password')} /></FormField>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <Button disabled={isSubmitting} className="w-full">Sign In</Button>
      </form>
    </div>
  );
}
