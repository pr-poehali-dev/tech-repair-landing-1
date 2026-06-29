import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const faqs = [
  { q: 'Сколько стоит вызов мастера?', a: 'Вызов мастера и диагностика абсолютно бесплатны при заказе ремонта. Вы платите только за сами работы и запчасти.' },
  { q: 'Как быстро приедет мастер?', a: 'В среднем мастер приезжает в течение 60 минут после заявки. При экспресс-режиме — ещё быстрее. Работаем без выходных.' },
  { q: 'Какая гарантия на ремонт?', a: 'На все виды работ и установленные запчасти мы даём официальную гарантию от 1 до 3 лет в зависимости от типа ремонта.' },
  { q: 'Вы используете оригинальные запчасти?', a: 'Да, мы устанавливаем только оригинальные или сертифицированные аналоги, на которые распространяется гарантия.' },
  { q: 'Можно ли оплатить картой?', a: 'Конечно. Принимаем наличные и безналичную оплату, выдаём чек и договор с фиксированной стоимостью.' },
  { q: 'Что если технику нельзя починить?', a: 'Если ремонт нецелесообразен, мы честно об этом скажем на этапе диагностики. В этом случае вы ничего не платите.' },
];

const FaqSection = () => {
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
