import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'Цены', href: '#prices' },
  { label: 'О компании', href: '#about' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Блог', href: '#blog' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-black/5 py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <div className="gradient-brand w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <Icon name="Wrench" className="text-white" size={22} />
          </div>
          <div className="leading-tight">
            <span className="font-extrabold text-lg block">
              Ремонт<span className="text-primary">Про</span>
            </span>
            <span className="text-[11px] text-muted-foreground">бытовая техника</span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="text-right leading-tight">
            <a href="tel:+74951234567" className="font-bold text-sm hover:text-primary transition-colors">
              +7 (495) 123-45-67
            </a>
            <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700 hover:bg-green-100 text-[10px]">
              онлайн
            </Badge>
          </div>
          <Button className="gradient-brand text-white shadow-lg shadow-primary/30 hover:opacity-90">
            <Icon name="Phone" size={16} className="mr-1" /> Вызвать мастера
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Icon name="Menu" size={22} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-1 mt-8">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="px-4 py-3 rounded-lg font-medium hover:bg-accent transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <Button className="gradient-brand text-white mt-4">
                <Icon name="Phone" size={16} className="mr-1" /> Вызвать мастера
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
