import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const cases = [
  { title: 'Холодильник Bosch', problem: 'Не охлаждал камеру', solution: 'Заменили компрессор и заправили систему', time: '2 часа', img: 'Refrigerator' },
  { title: 'Стиральная LG', problem: 'Сильный шум при отжиме', solution: 'Замена подшипников и сальника', time: '2.5 часа', img: 'WashingMachine' },
  { title: 'Телевизор Samsung', problem: 'Тёмный экран', solution: 'Восстановили подсветку матрицы', time: '1.5 часа', img: 'Tv' },
  { title: 'Посудомойка Electrolux', problem: 'Не сливала воду', solution: 'Замена сливного насоса', time: '1 час', img: 'CookingPot' },
  { title: 'Духовка Hansa', problem: 'Не набирала температуру', solution: 'Замена нагревательного элемента', time: '40 мин', img: 'Microwave' },
  { title: 'Кондиционер Daikin', problem: 'Не охлаждал воздух', solution: 'Заправка фреоном, чистка', time: '1.5 часа', img: 'AirVent' },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-20 mesh-bg">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="secondary" className="bg-accent text-accent-foreground mb-4">Портфолио</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Примеры наших работ</h2>
          <p className="text-muted-foreground">Реальные кейсы — от поломки до результата</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <Dialog key={c.title}>
              <DialogTrigger asChild>
                <Card className="group cursor-pointer overflow-hidden border-border/60 hover:shadow-xl hover:shadow-secondary/10 transition-all hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="gradient-hero aspect-video flex items-center justify-center relative overflow-hidden">
                    <Icon name={c.img} size={64} className="text-white/30 group-hover:scale-110 transition-transform" />
                    <Badge className="absolute top-3 right-3 gradient-brand text-white border-0">{c.time}</Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold mb-1">{c.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Icon name="AlertCircle" size={14} className="text-primary" /> {c.problem}
                    </p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <div className="gradient-blue w-14 h-14 rounded-2xl flex items-center justify-center mb-2">
                    <Icon name={c.img} size={28} className="text-white" />
                  </div>
                  <DialogTitle>{c.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 text-sm">
                  <p><span className="font-semibold text-primary">Проблема:</span> {c.problem}</p>
                  <p><span className="font-semibold text-secondary">Решение:</span> {c.solution}</p>
                  <p><span className="font-semibold">Время ремонта:</span> {c.time}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
