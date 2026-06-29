import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const stats = [
  { value: '15', suffix: 'лет', label: 'на рынке ремонта' },
  { value: '12k+', suffix: '', label: 'выполненных заказов' },
  { value: '98%', suffix: '', label: 'положительных отзывов' },
  { value: '60', suffix: 'мин', label: 'среднее время выезда' },
];

const advantages = [
  'Только оригинальные запчасти',
  'Фиксированная цена в договоре',
  'Работаем без выходных',
  'Безналичная оплата и чек',
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <Badge variant="secondary" className="bg-accent text-accent-foreground mb-4">О компании</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5">
            Сервисный центр, которому <span className="text-gradient">доверяют</span>
          </h2>
          <p className="text-muted-foreground mb-6">
            Уже 15 лет мы возвращаем технику к жизни. В нашей команде только сертифицированные мастера с многолетним опытом. Мы дорожим репутацией, поэтому работаем честно и даём реальную гарантию.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {advantages.map((a) => (
              <div key={a} className="flex items-center gap-2.5">
                <div className="gradient-brand w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                  <Icon name="Check" size={14} className="text-white" />
                </div>
                <span className="text-sm font-medium">{a}</span>
              </div>
            ))}
          </div>
          <Button size="lg" className="gradient-blue text-white shadow-lg shadow-secondary/30">
            <Icon name="Users" size={18} className="mr-2" /> Познакомиться с командой
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {stats.map((s, i) => (
            <Card key={s.label} className={`border-border/60 hover-scale ${i % 2 ? 'mt-8' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold text-gradient">{s.value}</span>
                  <span className="text-sm text-muted-foreground font-semibold">{s.suffix}</span>
                </div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
