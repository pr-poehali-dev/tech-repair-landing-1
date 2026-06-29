import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const CtaSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="gradient-brand rounded-3xl p-10 md:p-16 relative overflow-hidden text-white text-center">
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-secondary/30 rounded-full blur-2xl" />
          <div className="relative max-w-2xl mx-auto">
            <Badge className="bg-white/20 text-white border-0 mb-5 backdrop-blur">
              <Icon name="Gift" size={14} className="mr-1" /> Скидка 15% на первый ремонт
            </Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5">Техника сломалась? Починим сегодня!</h2>
            <p className="text-white/80 text-lg mb-8">
              Оставьте заявку — перезвоним за 5 минут и пришлём мастера в удобное время
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-base font-bold shadow-xl">
                <Icon name="Phone" size={18} className="mr-2" /> Вызвать мастера
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10 h-14 px-8 text-base">
                <Icon name="MessageCircle" size={18} className="mr-2" /> Написать в чат
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
