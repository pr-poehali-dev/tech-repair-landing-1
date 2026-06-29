import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Icon from '@/components/ui/icon';

const services = [
  { icon: 'Refrigerator', title: 'Холодильники', from: '1 200', popular: true, list: ['Не морозит', 'Течёт вода', 'Шум и стук', 'Замена компрессора'] },
  { icon: 'WashingMachine', title: 'Стиральные машины', from: '900', popular: true, list: ['Не сливает', 'Не отжимает', 'Замена ТЭНа', 'Ошибки на дисплее'] },
  { icon: 'Microwave', title: 'СВЧ и духовки', from: '800', popular: false, list: ['Не греет', 'Не включается', 'Замена магнетрона', 'Ремонт панели'] },
  { icon: 'Tv', title: 'Телевизоры', from: '1 100', popular: false, list: ['Нет изображения', 'Полосы на экране', 'Нет звука', 'Замена подсветки'] },
  { icon: 'AirVent', title: 'Кондиционеры', from: '1 500', popular: false, list: ['Не охлаждает', 'Течёт вода', 'Заправка фреоном', 'Чистка'] },
  { icon: 'CookingPot', title: 'Посудомойки', from: '950', popular: false, list: ['Не сливает', 'Не моет', 'Замена насоса', 'Протечки'] },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="secondary" className="bg-accent text-accent-foreground mb-4">Услуги</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ремонтируем любую технику</h2>
          <p className="text-muted-foreground">Более 50 видов бытовой техники всех известных брендов</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Card
              key={s.title}
              className="relative overflow-hidden border-border/60 hover:shadow-xl hover:shadow-primary/10 transition-all hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {s.popular && (
                <Badge className="absolute top-4 right-4 gradient-brand text-white border-0">Хит</Badge>
              )}
              <CardHeader>
                <div className="gradient-blue w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
                  <Icon name={s.icon} size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-xl">{s.title}</h3>
                <p className="text-sm text-muted-foreground">
                  от <span className="text-primary font-bold text-lg">{s.from} ₽</span>
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-5">
                  {s.list.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-secondary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="outline" className="w-full hover:bg-primary hover:text-white hover:border-primary">
                      Подробнее
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <p className="text-sm">Диагностика {s.title.toLowerCase()} бесплатна при заказе ремонта. Гарантия до 3 лет.</p>
                  </HoverCardContent>
                </HoverCard>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
