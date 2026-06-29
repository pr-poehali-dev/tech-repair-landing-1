import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { ContentItem } from '@/hooks/useContent';

interface Props {
  items?: ContentItem[];
}

const fallback = [
  { name: 'Анна Петрова', role: 'Холодильник Bosch', text: 'Мастер приехал через 40 минут, быстро нашёл поломку и всё починил. Холодильник работает как новый. Очень довольна!', rating: 5 },
  { name: 'Михаил Соколов', role: 'Стиральная машина LG', text: 'Честные цены, никаких навязанных услуг. Заменили подшипники, дали гарантию 2 года. Рекомендую всем знакомым.', rating: 5 },
  { name: 'Ирина Кузнецова', role: 'Телевизор Samsung', text: 'Думала, придётся покупать новый ТВ, но ребята восстановили подсветку за полтора часа. Спасибо за профессионализм!', rating: 5 },
  { name: 'Елена Волкова', role: 'Посудомойка', text: 'Приятный мастер, всё объяснил и показал. Посудомойка снова сливает воду. Оплатила картой, выдали чек.', rating: 5 },
  { name: 'Дмитрий Орлов', role: 'Кондиционер Daikin', text: 'Заправили фреоном, почистили — в квартире снова прохладно. Приехали в тот же день. Отличный сервис!', rating: 5 },
] as unknown as ContentItem[];

const ReviewsSection = ({ items }: Props) => {
  const source = (items && items.length ? items : fallback).filter((r) => r.is_published !== false);
  const reviews = source.map((r) => ({
    name: String(r.name),
    role: String(r.role),
    text: String(r.text),
    rating: Number(r.rating) || 5,
  }));

  return (
    <section id="reviews" className="py-20 gradient-hero text-white relative overflow-hidden">
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge className="gradient-brand text-white border-0 mb-4">Отзывы</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Что говорят наши клиенты</h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => <Icon key={i} name="Star" size={20} className="fill-current" />)}
            </div>
            <span className="font-bold">4.9</span>
            <span className="text-white/60">· на основе 12 000+ отзывов</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <Card key={r.name} className="glass text-foreground border-white/10 animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
              <CardContent className="pt-6">
                <div className="flex gap-1 text-primary mb-3">
                  {[...Array(r.rating)].map((_, j) => <Icon key={j} name="Star" size={16} className="fill-current" />)}
                </div>
                <p className="text-sm text-muted-foreground">{r.text}</p>
              </CardContent>
              <CardFooter className="gap-3">
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/80?u=${r.name}`} />
                  <AvatarFallback className="gradient-blue text-white">{r.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-sm">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;