import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import Icon from '@/components/ui/icon';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob" />
      <Card className="w-full max-w-md relative animate-scale-in border-border/60 shadow-2xl">
        <CardHeader className="text-center">
          <div className="gradient-brand w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Icon name="Wrench" size={28} className="text-white" />
          </div>
          <CardTitle className="text-2xl">Вход в админ-панель</CardTitle>
          <p className="text-sm text-muted-foreground">РемонтПро · управление контентом</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            {error && (
              <Alert variant="destructive">
                <Icon name="AlertCircle" size={16} />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="admin@remontpro.ru" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pass">Пароль</Label>
              <Input id="pass" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="gradient-brand text-white w-full">
              <Icon name={loading ? 'Loader2' : 'LogIn'} size={18} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Входим...' : 'Войти'}
            </Button>
          </form>
          <div className="mt-5 p-3 rounded-lg bg-muted text-xs text-muted-foreground space-y-1">
            <p className="font-semibold">Демо-доступ:</p>
            <p>Админ: admin@remontpro.ru / admin123</p>
            <p>Редактор: editor@remontpro.ru / admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
