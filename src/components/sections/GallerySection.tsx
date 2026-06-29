import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Icon from '@/components/ui/icon';

const gallery = [
  { icon: 'Wrench', label: 'Мастерская', color: 'gradient-brand' },
  { icon: 'Refrigerator', label: 'Ремонт холодильника', color: 'gradient-blue' },
  { icon: 'WashingMachine', label: 'Диагностика стиралки', color: 'gradient-brand' },
  { icon: 'CircuitBoard', label: 'Пайка платы', color: 'gradient-blue' },
  { icon: 'Tv', label: 'Замена матрицы', color: 'gradient-brand' },
  { icon: 'Truck', label: 'Выезд мастера', color: 'gradient-blue' },
  { icon: 'Package', label: 'Оригинальные запчасти', color: 'gradient-brand' },
  { icon: 'Award', label: 'Сертификаты', color: 'gradient-blue' },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="secondary" className="bg-accent text-accent-foreground mb-4">Галерея</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Наша работа в фотографиях</h2>
          <p className="text-muted-foreground">Загляните за кулисы сервисного центра</p>
        </div>

        <Carousel opts={{ align: 'start', loop: true }} className="px-4">
          <CarouselContent>
            {gallery.map((g) => (
              <CarouselItem key={g.label} className="sm:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden border-border/60 group">
                  <AspectRatio ratio={4 / 3}>
                    <div className={`${g.color} w-full h-full flex flex-col items-center justify-center gap-3 group-hover:scale-105 transition-transform`}>
                      <Icon name={g.icon} size={56} className="text-white/80" />
                      <span className="text-white font-semibold text-sm">{g.label}</span>
                    </div>
                  </AspectRatio>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default GallerySection;
