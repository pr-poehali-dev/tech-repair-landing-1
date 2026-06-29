import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const features = [
  { icon: 'Zap', title: 'Экспресс-ремонт', text: 'Устраняем большинство поломок в день обращения за 1 визит мастера.', color: 'gradient-brand' },
  { icon: 'ShieldCheck', title: 'Гарантия до 3 лет', text: 'Официальная гарантия на все работы и установленные запчасти.', color: 'gradient-blue' },
  { icon: 'MapPin', title: 'Выезд мастера', text: 'Приедем в удобное время по всему городу и области, бесплатно.', color: 'gradient-brand' },
  { icon: 'Award', title: 'Сертификация', text: 'Сертифицированные мастера с допусками от производителей техники.', color: 'gradient-blue' },
  { icon: 'Headphones', title: 'Консультация', text: 'Бесплатная консультация и диагностика до начала любых работ.', color: 'gradient-brand' },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 mesh-bg">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="secondary" className="bg-accent text-accent-foreground mb-4">Почему мы</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">5 причин выбрать РемонтПро</h2>
          <p className="text-muted-foreground">Мы делаем ремонт техники простым, быстрым и безопасным для вашего бюджета</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((f, i) => (
            <Card
              key={f.title}
              className="border-border/60 hover-scale group cursor-default animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className={`${f.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon name={f.icon} size={26} className="text-white" />
                </div>
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
