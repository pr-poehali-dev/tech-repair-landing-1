import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { ContentItem } from '@/hooks/useContent';

interface Props {
  items?: ContentItem[];
}

const fallback = [
  { name: 'Андрей Смирнов', role: 'Старший мастер', experience: '12 лет опыта', skill: 'Холодильное оборудование' },
  { name: 'Павел Громов', role: 'Мастер-электронщик', experience: '9 лет опыта', skill: 'Телевизоры и СВЧ' },
  { name: 'Сергей Белов', role: 'Мастер по стиралкам', experience: '11 лет опыта', skill: 'Стиральные машины' },
  { name: 'Олег Зайцев', role: 'Климат-техник', experience: '8 лет опыта', skill: 'Кондиционеры' },
] as unknown as ContentItem[];

const guarantees = [
  { icon: 'FileCheck', text: 'Договор с фиксированной ценой' },
  { icon: 'RotateCcw', text: 'Бесплатный повторный выезд' },
  { icon: 'Wallet', text: 'Оплата после ремонта' },
  { icon: 'ShieldCheck', text: 'Гарантия до 3 лет' },
];

const TrustSection = ({ items }: Props) => {
  const team = (items && items.length ? items : fallback).map((m) => ({
    name: String(m.name),
    role: String(m.role),
    exp: String(m.experience),
    skill: String(m.skill),
  }));

  return (
    <section className="py-20 mesh-bg">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="secondary" className="bg-accent text-accent-foreground mb-4">Наша команда</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Мастера, которым можно доверять</h2>
          <p className="text-muted-foreground">Опытные специалисты с допусками и реальной практикой</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {team.map((m, i) => (
            <Card key={m.name} className="border-border/60 hover-scale text-center animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
              <CardContent className="p-6">
                <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-primary/10">
                  <AvatarImage src={`https://i.pravatar.cc/120?u=${m.name}`} />
                  <AvatarFallback className="gradient-brand text-white text-xl">{m.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold">{m.name}</h3>
                <p className="text-sm text-primary font-medium">{m.role}</p>
                <Separator className="my-3" />
                <p className="text-xs text-muted-foreground">{m.exp}</p>
                <p className="text-xs text-muted-foreground">{m.skill}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {guarantees.map((g) => (
            <div key={g.text} className="flex items-center gap-3 bg-card border rounded-xl p-4">
              <div className="gradient-blue w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                <Icon name={g.icon} size={20} className="text-white" />
              </div>
              <span className="font-medium text-sm">{g.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;