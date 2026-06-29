import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ProcessSection from '@/components/sections/ProcessSection';
import PricesSection from '@/components/sections/PricesSection';
import AboutSection from '@/components/sections/AboutSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import GallerySection from '@/components/sections/GallerySection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import CalculatorSection from '@/components/sections/CalculatorSection';
import BlogSection from '@/components/sections/BlogSection';
import CertificatesSection from '@/components/sections/CertificatesSection';
import FaqSection from '@/components/sections/FaqSection';
import CtaSection from '@/components/sections/CtaSection';
import TrustSection from '@/components/sections/TrustSection';
import ContactSection from '@/components/sections/ContactSection';
import { useContent } from '@/hooks/useContent';

const Index = () => {
  const { data } = useContent();

  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <ServicesSection items={data.services} />
      <ProcessSection />
      <PricesSection items={data.prices} />
      <AboutSection />
      <PortfolioSection items={data.portfolio} />
      <GallerySection />
      <ReviewsSection items={data.reviews} />
      <CalculatorSection />
      <BlogSection items={data.blog_posts} />
      <CertificatesSection />
      <FaqSection items={data.faqs} />
      <CtaSection />
      <TrustSection items={data.team_members} />
      <ContactSection />
    </Layout>
  );
};

export default Index;