import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Lock, Mail, User, ArrowLeft, CheckCircle } from 'lucide-react';
import logo from '@/assets/logo.png';

const AdminSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [adminExists, setAdminExists] = useState(false);

  useEffect(() => {
    checkAdminExists();
  }, []);

  const checkAdminExists = async () => {
    const { data, error } = await supabase.rpc('admin_exists');
    
    if (!error && data === true) {
      setAdminExists(true);
    }
    setChecking(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: 'Erro',
        description: 'As senhas não coincidem.',
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: 'Erro',
        description: 'A senha deve ter pelo menos 6 caracteres.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`
        }
      });

      if (signUpError) throw signUpError;

      if (!authData.user) {
        throw new Error('Erro ao criar usuário');
      }

      // Add admin role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: 'admin'
        });

      if (roleError) throw roleError;

      toast({
        title: 'Admin criado com sucesso!',
        description: 'Você será redirecionado para o painel.',
      });

      // Wait a moment then redirect
      setTimeout(() => {
        navigate('/admin');
      }, 1500);

    } catch (error: any) {
      toast({
        title: 'Erro ao criar admin',
        description: error.message || 'Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (adminExists) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="rounded-lg border border-border bg-card p-8">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-black mb-2">Admin já configurado</h1>
            <p className="text-muted-foreground mb-6">
              O sistema já possui um administrador configurado.
            </p>
            <Button variant="glow" onClick={() => navigate('/admin/login')}>
              Ir para Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar ao site
        </Button>

        <div className="rounded-lg border border-border bg-card p-8">
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="Colossal Burguer" className="h-16 mb-4" />
            <h1 className="text-2xl font-black">Configurar Admin</h1>
            <p className="text-muted-foreground text-center text-sm mt-2">
              Crie a primeira conta de administrador para gerenciar os pedidos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@colossalburguer.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="pl-10"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repita a senha"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="glow"
              className="w-full font-bold"
              disabled={loading}
            >
              <User className="mr-2 h-4 w-4" />
              {loading ? 'Criando...' : 'Criar Conta Admin'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
