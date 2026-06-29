import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { SECTIONS } from '@/admin/config';
import SectionEditor from '@/admin/SectionEditor';
import RequestsEditor from '@/admin/RequestsEditor';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

const Admin = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState('requests');

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Icon name="Loader2" size={32} className="animate-spin text-primary" /></div>;
  }
  if (!user) return <Navigate to="/login" replace />;

  const onLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menu = [
    { key: 'requests', title: 'Заявки', icon: 'Inbox' },
    ...SECTIONS.map((s) => ({ key: s.table, title: s.title, icon: s.icon })),
  ];

  const Nav = () => (
    <nav className="space-y-1">
      {menu.map((m) => (
        <button
          key={m.key}
          onClick={() => setActive(m.key)}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
            active === m.key ? 'gradient-brand text-white shadow-lg shadow-primary/30' : 'hover:bg-accent'
          }`}
        >
          <Icon name={m.icon} size={18} /> {m.title}
        </button>
      ))}
    </nav>
  );

  const current = SECTIONS.find((s) => s.table === active);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="glass border-b sticky top-0 z-40">
        <div className="px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden"><Icon name="Menu" size={20} /></Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="mt-8"><Nav /></div>
              </SheetContent>
            </Sheet>
            <div className="gradient-brand w-9 h-9 rounded-xl flex items-center justify-center">
              <Icon name="Wrench" size={18} className="text-white" />
            </div>
            <span className="font-extrabold">Ремонт<span className="text-primary">Про</span> · Админка</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold leading-tight">{user.name}</p>
              <Badge variant="secondary" className={user.role === 'admin' ? 'bg-primary/15 text-primary' : ''}>
                {user.role === 'admin' ? 'Администратор' : 'Редактор'}
              </Badge>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              <Icon name="ExternalLink" size={16} className="mr-1" /> Сайт
            </Button>
            <Button variant="ghost" size="icon" onClick={onLogout}><Icon name="LogOut" size={18} /></Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden lg:block w-64 shrink-0 border-r bg-card min-h-[calc(100vh-4rem)] p-4">
          <ScrollArea className="h-full"><Nav /></ScrollArea>
        </aside>
        <main className="flex-1 p-4 lg:p-8 max-w-6xl">
          {active === 'requests' ? <RequestsEditor /> : current ? <SectionEditor key={current.table} section={current} /> : null}
        </main>
      </div>
    </div>
  );
};

export default Admin;
