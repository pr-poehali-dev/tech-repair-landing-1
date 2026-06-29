import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const posts = [
  { cat: 'Советы', icon: 'Refrigerator', title: 'Как продлить срок службы холодильника', date: '25 июня 2026', read: '5 мин', color: 'gradient-blue' },
  { cat: 'Инструкции', icon: 'WashingMachine', title: 'Что делать, если стиралка не сливает воду', date: '20 июня 2026', read: '7 мин', color: 'gradient-brand' },
  { cat: 'Обзоры', icon: 'Lightbulb', title: '7 признаков, что технике нужен ремонт', date: '15 июня 2026', read: '4 мин', color: 'gradient-blue' },
];

const BlogSection = () => {
  return (
    <section id="blog" className="py-20 mesh-bg">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <Badge variant="secondary" className="bg-accent text-accent-foreground mb-4">Блог</Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold">Полезные статьи о технике</h2>
          </div>
          <Button variant="outline" className="hover:bg-primary hover:text-white hover:border-primary self-start md:self-auto">
            Все статьи <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <Card key={p.title} className="group overflow-hidden border-border/60 hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <div className={`${p.color} aspect-[16/9] flex items-center justify-center`}>
                <Icon name={p.icon} size={56} className="text-white/40 group-hover:scale-110 transition-transform" />
              </div>
              <CardContent className="pt-5">
                <Badge variant="secondary" className="mb-3 bg-accent text-accent-foreground">{p.cat}</Badge>
                <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors">{p.title}</h3>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground gap-4">
                <span className="flex items-center gap-1"><Icon name="Calendar" size={14} /> {p.date}</span>
                <span className="flex items-center gap-1"><Icon name="Clock" size={14} /> {p.read}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
