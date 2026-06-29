import { useEffect, useState } from 'react';
import { SectionDef } from './config';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Row = Record<string, string | number | boolean>;

const SectionEditor = ({ section }: { section: SectionDef }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [form, setForm] = useState<Row>({});
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const items = await api.getTable(section.table);
      setRows(items);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section.table]);

  const openCreate = () => {
    const empty: Row = {};
    section.fields.forEach((f) => {
      empty[f.key] = f.type === 'boolean' ? false : f.type === 'number' ? 0 : '';
    });
    setForm(empty);
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (row: Row) => {
    setForm({ ...row });
    setEditing(row);
    setOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload: Row = {};
      section.fields.forEach((f) => (payload[f.key] = form[f.key]));
      if (editing) {
        payload.id = editing.id;
        await api.updateItem(section.table, payload);
        toast({ title: 'Сохранено', description: 'Запись обновлена' });
      } else {
        await api.createItem(section.table, payload);
        toast({ title: 'Добавлено', description: 'Новая запись создана' });
      }
      setOpen(false);
      load();
    } catch (err) {
      toast({ title: 'Ошибка', description: (err as Error).message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteId == null) return;
    try {
      await api.deleteItem(section.table, deleteId);
      toast({ title: 'Удалено', description: 'Запись удалена' });
      load();
    } catch (err) {
      toast({ title: 'Ошибка', description: (err as Error).message, variant: 'destructive' });
    } finally {
      setDeleteId(null);
    }
  };

  const previewFields = section.fields.slice(0, 3);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-extrabold flex items-center gap-2">
            <Icon name={section.icon} className="text-primary" /> {section.title}
          </h2>
          <p className="text-sm text-muted-foreground">Всего записей: {rows.length}</p>
        </div>
        <Button onClick={openCreate} className="gradient-brand text-white">
          <Icon name="Plus" size={16} className="mr-1" /> Добавить
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      ) : (
        <div className="bg-card border rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {previewFields.map((f) => <TableHead key={f.key}>{f.label}</TableHead>)}
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={String(row.id)}>
                  {previewFields.map((f) => (
                    <TableCell key={f.key} className="max-w-xs truncate">
                      {f.type === 'boolean'
                        ? (row[f.key] ? <Badge className="bg-green-100 text-green-700">Да</Badge> : <Badge variant="secondary">Нет</Badge>)
                        : String(row[f.key] ?? '')}
                    </TableCell>
                  ))}
                  <TableCell className="text-right whitespace-nowrap">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(row)}>
                      <Icon name="Pencil" size={16} />
                    </Button>
                    {user?.role === 'admin' && (
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleteId(Number(row.id))}>
                        <Icon name="Trash2" size={16} />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow><TableCell colSpan={previewFields.length + 1} className="text-center text-muted-foreground py-8">Записей пока нет</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Редактировать' : 'Новая запись'} · {section.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {section.fields.map((f) => (
              <div key={f.key} className="space-y-1.5">
                <Label>{f.label}</Label>
                {f.type === 'textarea' && (
                  <Textarea value={String(form[f.key] ?? '')} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} rows={3} />
                )}
                {f.type === 'text' && (
                  <Input value={String(form[f.key] ?? '')} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} />
                )}
                {f.type === 'number' && (
                  <Input type="number" value={Number(form[f.key] ?? 0)} onChange={(e) => setForm({ ...form, [f.key]: Number(e.target.value) })} />
                )}
                {f.type === 'boolean' && (
                  <div className="flex items-center gap-2">
                    <Switch checked={Boolean(form[f.key])} onCheckedChange={(v) => setForm({ ...form, [f.key]: v })} />
                  </div>
                )}
                {f.type === 'select' && (
                  <Select value={String(form[f.key] ?? '')} onValueChange={(v) => setForm({ ...form, [f.key]: v })}>
                    <SelectTrigger><SelectValue placeholder="Выберите" /></SelectTrigger>
                    <SelectContent>
                      {f.options?.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Отмена</Button>
            <Button onClick={save} disabled={saving} className="gradient-brand text-white">
              {saving ? 'Сохраняем...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId != null} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить запись?</AlertDialogTitle>
            <AlertDialogDescription>Это действие нельзя отменить. Запись будет удалена навсегда.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">Удалить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SectionEditor;
