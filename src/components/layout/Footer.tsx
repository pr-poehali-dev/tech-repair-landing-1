import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const columns = [
  {
    title: 'Услуги',
    links: ['Ремонт холодильников', 'Ремонт стиральных машин', 'Ремонт посудомоек', 'Ремонт духовых шкафов', 'Ремонт телевизоров'],
  },
  {
    title: 'Компания',
    links: ['О нас', 'Портфолио', 'Отзывы', 'Блог', 'Вакансии'],
  },
  {
    title: 'Клиентам',
    links: ['Цены', 'Гарантия', 'Сертификаты', 'FAQ', 'Контакты'],
  },
];

const socials = ['Send', 'MessageCircle', 'Phone', 'Mail'];

const Footer = () => {
  return (
    <footer id="contacts" className="bg-foreground text-background pt-16 pb-8">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="gradient-brand w-10 h-10 rounded-xl flex items-center justify-center">
                <Icon name="Wrench" className="text-white" size={22} />
              </div>
              <span className="font-extrabold text-xl">
                Ремонт<span className="text-primary">Про</span>
              </span>
            </div>
            <p className="text-background/60 text-sm mb-5 max-w-xs">
              Экспресс-ремонт бытовой техники с гарантией до 3 лет. Выезд мастера в день обращения по всему городу.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-background/10 hover:bg-primary transition-colors flex items-center justify-center"
                >
                  <Icon name={s} size={18} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="font-bold mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-background/60 hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-2">
            <h4 className="font-bold mb-4">Рассылка</h4>
            <p className="text-sm text-background/60 mb-3">Акции и советы по уходу за техникой</p>
            <div className="flex gap-2">
              <Input placeholder="E-mail" className="bg-background/10 border-background/20 text-background placeholder:text-background/40" />
              <Button size="icon" className="gradient-brand text-white shrink-0">
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-background/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-sm text-background/50">
          <p>© 2026 РемонтПро. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-primary transition-colors">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
