import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/b349cacc-3e18-40d8-9a1c-d5a1ee5c5a0a/files/cce0ca02-9b4f-4cd3-ba0d-63ed04d8e34d.jpg';

const HeroSection = () => {
  return (
    <section id="hero" className="relative gradient-hero text-white overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <Badge className="gradient-brand text-white border-0 mb-6 px-4 py-1.5 text-sm">
            <Icon name="Zap" size={14} className="mr-1" /> Выезд мастера за 60 минут
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Ремонт бытовой техники <span className="text-gradient">с гарантией</span> до 3 лет
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-lg">
            Экспресс-ремонт холодильников, стиральных машин и другой техники у вас дома. Бесплатная диагностика и честные цены.
          </p>
          <div className="flex flex-wrap gap-4 mb-10">
            <Button size="lg" className="gradient-brand text-white shadow-xl shadow-primary/30 hover:opacity-90 h-14 px-8 text-base">
              <Icon name="Phone" size={18} className="mr-2" /> Вызвать мастера
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-14 px-8 text-base">
              <Icon name="Calculator" size={18} className="mr-2" /> Узнать цену
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {['АП', 'МС', 'ИК', 'ЕВ'].map((i) => (
                <Avatar key={i} className="border-2 border-white/30 w-10 h-10">
                  <AvatarImage src={`https://i.pravatar.cc/80?u=${i}`} />
                  <AvatarFallback className="bg-secondary text-white text-xs">{i}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={14} className="fill-current" />
                ))}
              </div>
              <p className="text-sm text-white/70">12 000+ довольных клиентов</p>
            </div>
          </div>
        </div>

        <div className="relative animate-scale-in">
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
            <img src={HERO_IMG} alt="Мастер по ремонту техники" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 glass text-foreground rounded-2xl p-4 shadow-xl animate-float hidden sm:flex items-center gap-3">
            <div className="gradient-blue w-12 h-12 rounded-xl flex items-center justify-center">
              <Icon name="ShieldCheck" size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm">Гарантия 3 года</p>
              <p className="text-xs text-muted-foreground">на все работы</p>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 glass text-foreground rounded-2xl p-4 shadow-xl animate-float hidden sm:flex items-center gap-3" style={{ animationDelay: '2s' }}>
            <div className="gradient-brand w-12 h-12 rounded-xl flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm">60 минут</p>
              <p className="text-xs text-muted-foreground">время выезда</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
