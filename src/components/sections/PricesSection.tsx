import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const data: Record<string, { name: string; price: string; time: string }[]> = {
  fridge: [
    { name: 'Диагностика', price: 'Бесплатно', time: '20 мин' },
    { name: 'Заправка фреоном', price: 'от 2 500 ₽', time: '1 час' },
    { name: 'Замена компрессора', price: 'от 4 900 ₽', time: '2 часа' },
    { name: 'Замена термостата', price: 'от 1 800 ₽', time: '40 мин' },
  ],
  washer: [
    { name: 'Диагностика', price: 'Бесплатно', time: '20 мин' },
    { name: 'Замена ТЭНа', price: 'от 1 900 ₽', time: '1 час' },
    { name: 'Замена подшипников', price: 'от 3 500 ₽', time: '2.5 часа' },
    { name: 'Чистка сливного насоса', price: 'от 1 200 ₽', time: '40 мин' },
  ],
  tv: [
    { name: 'Диагностика', price: 'Бесплатно', time: '20 мин' },
    { name: 'Замена подсветки', price: 'от 2 800 ₽', time: '1.5 часа' },
    { name: 'Ремонт блока питания', price: 'от 2 200 ₽', time: '1 час' },
    { name: 'Замена матрицы', price: 'от 6 500 ₽', time: '2 часа' },
  ],
};

const tabs = [
  { value: 'fridge', label: 'Холодильники', icon: 'Refrigerator' },
  { value: 'washer', label: 'Стиралки', icon: 'WashingMachine' },
  { value: 'tv', label: 'Телевизоры', icon: 'Tv' },
];

const PricesSection = () => {
  return (
    <section id="prices" className="py-20 mesh-bg">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="secondary" className="bg-accent text-accent-foreground mb-4">Цены</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Прозрачные цены без сюрпризов</h2>
          <p className="text-muted-foreground">Озвучиваем стоимость до начала работ. Диагностика — бесплатно</p>
        </div>

        <Tabs defaultValue="fridge" className="max-w-3xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8 h-auto p-1.5 bg-card border">
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="data-[state=active]:gradient-brand data-[state=active]:text-white py-2.5">
                <Icon name={t.icon} size={16} className="mr-1.5" /> {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(data).map((key) => (
            <TabsContent key={key} value={key}>
              <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Услуга</TableHead>
                      <TableHead>Стоимость</TableHead>
                      <TableHead className="text-right">Время</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data[key].map((row) => (
                      <TableRow key={row.name}>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell className="text-primary font-bold">{row.price}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{row.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center mt-8">
          <Button size="lg" className="gradient-brand text-white shadow-lg shadow-primary/30">
            <Icon name="FileText" size={18} className="mr-2" /> Полный прайс-лист
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricesSection;
