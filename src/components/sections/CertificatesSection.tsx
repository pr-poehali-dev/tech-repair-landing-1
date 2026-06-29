import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Icon from '@/components/ui/icon';

const certs = [
  { icon: 'Award', title: 'Сертификат Bosch', desc: 'Авторизованный сервис' },
  { icon: 'BadgeCheck', title: 'Сертификат Samsung', desc: 'Официальный партнёр' },
  { icon: 'ShieldCheck', title: 'ISO 9001', desc: 'Стандарт качества' },
  { icon: 'GraduationCap', title: 'Допуски мастеров', desc: 'Профильное обучение' },
];

const brands = ['Bosch', 'Samsung', 'LG', 'Electrolux', 'Indesit', 'Whirlpool', 'Siemens', 'Daikin'];

const CertificatesSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="secondary" className="bg-accent text-accent-foreground mb-4">Сертификация</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Официальные документы и допуски</h2>
          <p className="text-muted-foreground">Мы работаем легально и подтверждаем квалификацию документами</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certs.map((c, i) => (
            <Tooltip key={c.title}>
              <TooltipTrigger asChild>
                <Card className="border-border/60 hover-scale cursor-help text-center animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
                  <CardContent className="p-6">
                    <div className="gradient-brand w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Icon name={c.icon} size={30} className="text-white" />
                    </div>
                    <h3 className="font-bold mb-1">{c.title}</h3>
                    <p className="text-sm text-muted-foreground">{c.desc}</p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>Нажмите, чтобы посмотреть документ</TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="text-center mb-6">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Ремонтируем технику этих брендов</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {brands.map((b) => (
            <Badge key={b} variant="outline" className="text-base px-5 py-2 hover:bg-accent transition-colors">{b}</Badge>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
