import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const steps = [
  { icon: 'PhoneCall', title: 'Заявка', text: 'Оставьте заявку или позвоните — подберём удобное время.' },
  { icon: 'Truck', title: 'Выезд', text: 'Мастер приезжает за 60 минут с инструментом и запчастями.' },
  { icon: 'Search', title: 'Диагностика', text: 'Бесплатно определяем причину поломки и называем точную цену.' },
  { icon: 'Wrench', title: 'Ремонт', text: 'Чиним технику на месте и выдаём гарантийный талон.' },
];

const ProcessSection = () => {
  return (
    <section className="py-20 gradient-hero text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge className="gradient-brand text-white border-0 mb-4">Как мы работаем</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">4 простых шага до рабочей техники</h2>
          <p className="text-white/60">От заявки до результата — обычно меньше одного дня</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={s.title} className="relative animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="glass text-foreground rounded-2xl p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="gradient-brand w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                    <Icon name={s.icon} size={24} className="text-white" />
                  </div>
                  <span className="text-4xl font-extrabold text-primary/20">{i + 1}</span>
                </div>
                <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{s.text}</p>
                <Progress value={(i + 1) * 25} className="h-1.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
