import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { ContentItem } from '@/hooks/useContent';

interface Props {
  items?: ContentItem[];
}

const fallback = [
  { question: 'Сколько стоит вызов мастера?', answer: 'Вызов мастера и диагностика абсолютно бесплатны при заказе ремонта. Вы платите только за сами работы и запчасти.' },
  { question: 'Как быстро приедет мастер?', answer: 'В среднем мастер приезжает в течение 60 минут после заявки. При экспресс-режиме — ещё быстрее. Работаем без выходных.' },
  { question: 'Какая гарантия на ремонт?', answer: 'На все виды работ и установленные запчасти мы даём официальную гарантию от 1 до 3 лет в зависимости от типа ремонта.' },
  { question: 'Вы используете оригинальные запчасти?', answer: 'Да, мы устанавливаем только оригинальные или сертифицированные аналоги, на которые распространяется гарантия.' },
  { question: 'Можно ли оплатить картой?', answer: 'Конечно. Принимаем наличные и безналичную оплату, выдаём чек и договор с фиксированной стоимостью.' },
] as unknown as ContentItem[];

const FaqSection = ({ items }: Props) => {
  const faqs = (items && items.length ? items : fallback).map((f) => ({
    q: String(f.question),
    a: String(f.answer),
  }));

  return (
    <section id="faq" className="py-20 mesh-bg">
      <div className="container grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Badge variant="secondary" className="bg-accent text-accent-foreground mb-4">FAQ</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5">Частые вопросы</h2>
          <p className="text-muted-foreground mb-6">Собрали ответы на самые популярные вопросы наших клиентов.</p>
          <Alert className="border-primary/30 bg-primary/5">
            <Icon name="MessageCircleQuestion" className="text-primary" size={18} />
            <AlertTitle>Не нашли ответ?</AlertTitle>
            <AlertDescription className="text-muted-foreground">
              Позвоните по телефону +7 (495) 123-45-67 — ответим на любой вопрос.
            </AlertDescription>
          </Alert>
        </div>

        <div className="lg:col-span-7">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border rounded-xl px-5">
                <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;