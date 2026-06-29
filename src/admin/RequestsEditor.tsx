import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Icon from '@/components/ui/icon';

interface Req {
  id: number;
  name: string;
  phone: string;
  appliance: string;
  message: string;
  status: string;
  created_at: string;
}

const STATUS: Record<string, { label: string; cls: string }> = {
  new: { label: 'Новая', cls: 'bg-blue-100 text-blue-700' },
  in_progress: { label: 'В работе', cls: 'bg-amber-100 text-amber-700' },
  done: { label: 'Завершена', cls: 'bg-green-100 text-green-700' },
};

const APPLIANCE: Record<string, string> = {
  fridge: 'Холодильник', washer: 'Стиралка', tv: 'Телевизор', other: 'Другое',
};

const RequestsEditor = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rows, setRows] = useState<Req[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      setRows(await api.getRequests());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const changeStatus = async (id: number, status: string) => {
    await api.updateRequest(id, status);
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
    toast({ title: 'Статус обновлён' });
  };

  const remove = async (id: number) => {
    try {
      await api.deleteRequest(id);
      setRows((r) => r.filter((x) => x.id !== id));
      toast({ title: 'Заявка удалена' });
    } catch (err) {
      toast({ title: 'Ошибка', description: (err as Error).message, variant: 'destructive' });
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-extrabold flex items-center gap-2">
          <Icon name="Inbox" className="text-primary" /> Заявки клиентов
        </h2>
        <p className="text-sm text-muted-foreground">Всего: {rows.length}</p>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
      ) : (
        <div className="bg-card border rounded-xl overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Имя</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Техника</TableHead>
                <TableHead>Проблема</TableHead>
                <TableHead>Статус</TableHead>
                {user?.role === 'admin' && <TableHead></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell>{r.phone}</TableCell>
                  <TableCell><Badge variant="secondary">{APPLIANCE[r.appliance] || r.appliance || '—'}</Badge></TableCell>
                  <TableCell className="max-w-xs truncate">{r.message}</TableCell>
                  <TableCell>
                    <Select value={r.status} onValueChange={(v) => changeStatus(r.id, v)}>
                      <SelectTrigger className="w-36 h-8">
                        <Badge className={STATUS[r.status]?.cls}>{STATUS[r.status]?.label || r.status}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(STATUS).map((s) => <SelectItem key={s} value={s}>{STATUS[s].label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  {user?.role === 'admin' && (
                    <TableCell>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => remove(r.id)}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">Заявок пока нет</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default RequestsEditor;
