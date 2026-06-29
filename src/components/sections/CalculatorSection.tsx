import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const base: Record<string, number> = {
  fridge: 1200, washer: 900, tv: 1100, dishwasher: 950, oven: 800,
};
const labels: Record<string, string> = {
  fridge: 'Холодильник', washer: 'Стиральная машина', tv: 'Телевизор', dishwasher: 'Посудомойка', oven: 'Духовка',
};

const CalculatorSection = () => {
  const [type, setType] = useState('fridge');
  const [urgency, setUrgency] = useState('normal');
  const [warranty, setWarranty] = useState(false);

  const price = base[type] * (urgency === 'express' ? 1.5 : 1) + (warranty ? 500 : 0);

  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="secondary" className="bg-accent text-accent-foreground mb-4">Калькулятор</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Рассчитайте стоимость ремонта</h2>
          <p className="text-muted-foreground">Примерная цена за минуту — точную назовёт мастер после диагностики</p>
        </div>

        <Card className="max-w-3xl mx-auto border-border/60 shadow-xl shadow-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Calculator" className="text-primary" /> Параметры ремонта
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Тип техники</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(labels).map((k) => (
                      <SelectItem key={k} value={k}>{labels[k]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Срочность</Label>
                <RadioGroup value={urgency} onValueChange={setUrgency}>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="normal" id="normal" />
                    <Label htmlFor="normal" className="font-normal cursor-pointer">Обычная (в течение дня)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="font-normal cursor-pointer">Экспресс (+50%, за 60 мин)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <Label htmlFor="warranty" className="font-normal cursor-pointer">Расширенная гарантия 3 года</Label>
                <Switch id="warranty" checked={warranty} onCheckedChange={setWarranty} />
              </div>
            </div>

            <div className="gradient-hero text-white rounded-2xl p-6 flex flex-col justify-center">
              <p className="text-white/60 text-sm mb-1">Примерная стоимость</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-extrabold">от {price.toLocaleString('ru')}</span>
                <span className="text-xl">₽</span>
              </div>
              <Separator className="bg-white/10 mb-4" />
              <ul className="space-y-2 text-sm text-white/70 mb-6">
                <li className="flex items-center gap-2"><Icon name="Check" size={16} className="text-primary" /> {labels[type]}</li>
                <li className="flex items-center gap-2"><Icon name="Check" size={16} className="text-primary" /> Бесплатная диагностика</li>
                <li className="flex items-center gap-2"><Icon name="Check" size={16} className="text-primary" /> Гарантия на работы</li>
              </ul>
              <Button className="gradient-brand text-white w-full">
                <Icon name="Phone" size={16} className="mr-2" /> Вызвать мастера
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CalculatorSection;
