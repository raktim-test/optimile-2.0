
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

const schema = z.object({ username: z.string().min(3), password: z.string().min(3) });

type LoginForm = z.infer<typeof schema>;

export default function LoginScreen() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  return (
    <div className="min-h-screen grid place-items-center bg-slate-100">
      <form
        onSubmit={handleSubmit(() => {
          login('mock-jwt');
          navigate('/');
        })}
        className="bg-white p-6 rounded-xl shadow w-96 space-y-3"
      >
        <h1 className="text-xl font-semibold">Login</h1>
        <input className="w-full border p-2 rounded" placeholder="username" {...register('username')} />
        {errors.username && <p className="text-rose-500 text-xs">Username is required.</p>}
        <input className="w-full border p-2 rounded" type="password" placeholder="password" {...register('password')} />
        {errors.password && <p className="text-rose-500 text-xs">Password is required.</p>}
        <button className="w-full bg-indigo-600 text-white rounded p-2" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
