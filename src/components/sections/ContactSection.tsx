import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { api } from '@/lib/api';
import Icon from '@/components/ui/icon';

const contacts = [
  { icon: 'Phone', title: 'Телефон', value: '+7 (495) 123-45-67' },
  { icon: 'Mail', title: 'E-mail', value: 'info@remontpro.ru' },
  { icon: 'MapPin', title: 'Адрес', value: 'г. Москва, ул. Мастеров, 15' },
  { icon: 'Clock', title: 'Режим работы', value: 'Ежедневно 8:00 – 22:00' },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [appliance, setAppliance] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.createRequest({ name, phone, appliance, message });
      toast({ title: 'Заявка отправлена!', description: 'Мы перезвоним вам в течение 5 минут.' });
      setName('');
      setPhone('');
      setAppliance('');
      setMessage('');
    } catch {
      toast({ title: 'Ошибка', description: 'Не удалось отправить заявку. Попробуйте позвонить нам.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-card">
      <div className="container grid lg:grid-cols-2 gap-12">
        <div>
          <Badge variant="secondary" className="bg-accent text-accent-foreground mb-4">Контакты</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5">Оставьте заявку на ремонт</h2>
          <p className="text-muted-foreground mb-8">Заполните форму — и наш мастер свяжется с вами в ближайшее время.</p>

          <div className="grid sm:grid-cols-2 gap-5">
            {contacts.map((c) => (
              <div key={c.title} className="flex items-start gap-3">
                <div className="gradient-blue w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                  <Icon name={c.icon} size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{c.title}</p>
                  <p className="font-bold">{c.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="border-border/60 shadow-xl shadow-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Send" className="text-primary" /> Форма заявки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Имя</Label>
                  <Input id="name" placeholder="Иван" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Тип техники</Label>
                <Select value={appliance} onValueChange={setAppliance}>
                  <SelectTrigger><SelectValue placeholder="Выберите технику" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fridge">Холодильник</SelectItem>
                    <SelectItem value="washer">Стиральная машина</SelectItem>
                    <SelectItem value="tv">Телевизор</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="msg">Описание проблемы</Label>
                <Textarea id="msg" placeholder="Опишите, что случилось с техникой..." rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="agree" required />
                <Label htmlFor="agree" className="font-normal text-sm text-muted-foreground cursor-pointer">
                  Согласен с обработкой персональных данных
                </Label>
              </div>
              <Button type="submit" size="lg" disabled={loading} className="gradient-brand text-white w-full shadow-lg shadow-primary/30">
                <Icon name={loading ? 'Loader2' : 'Send'} size={18} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Отправляем...' : 'Отправить заявку'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;