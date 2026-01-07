import { useState } from 'react';
import { Camera, Leaf, Bug, Droplets, MessageCircle, ArrowRight, Sun, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { FeatureCard } from '@/components/FeatureCard';
import { DiagnosisChat } from '@/components/DiagnosisChat';
import heroImage from '@/assets/hero-farm.jpg';

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return <DiagnosisChat onBack={() => setShowChat(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Healthy farm field at sunrise"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
        </div>

        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-2xl animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Leaf className="w-4 h-4 text-wheat" />
              <span className="text-sm font-medium text-primary-foreground">AI-Powered Crop Health</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-6 leading-tight">
              Protect Your Crops,{' '}
              <span className="text-wheat">Grow Better</span>
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Instantly identify pests, diseases, and get expert solutions for your crops. 
              Just snap a photo and let our AI help you grow healthier plants.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" onClick={() => setShowChat(true)}>
                <Camera className="mr-2" />
                Start Diagnosis
                <ArrowRight className="ml-2" />
              </Button>
              <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Your Complete Crop Care Companion
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From pest identification to treatment recommendations, we've got everything you need to keep your crops healthy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Bug}
              title="Pest Detection"
              description="Identify harmful insects and pests affecting your crops with our AI-powered image recognition."
            />
            <FeatureCard
              icon={Leaf}
              title="Disease Diagnosis"
              description="Detect plant diseases early and get accurate treatment recommendations before they spread."
            />
            <FeatureCard
              icon={Droplets}
              title="Watering Guide"
              description="Get personalized watering schedules based on your crop type and local weather conditions."
            />
            <FeatureCard
              icon={Sun}
              title="Growing Tips"
              description="Receive expert advice on sunlight, soil, and nutrition for optimal crop growth."
            />
            <FeatureCard
              icon={Shield}
              title="Prevention"
              description="Learn preventive measures to protect your crops from common threats and diseases."
            />
            <FeatureCard
              icon={MessageCircle}
              title="24/7 Support"
              description="Chat with our AI assistant anytime to get instant answers to your farming questions."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get crop diagnosis in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Take a Photo', desc: 'Capture a clear image of your affected plant or pest' },
              { step: '02', title: 'Get Analysis', desc: 'Our AI instantly analyzes and identifies the issue' },
              { step: '03', title: 'Apply Solution', desc: 'Follow expert recommendations to treat your crops' }
            ].map((item, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="w-20 h-20 rounded-2xl gradient-hero mx-auto mb-4 flex items-center justify-center shadow-medium">
                  <span className="text-2xl font-bold text-primary-foreground">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="gradient-hero rounded-3xl p-8 md:p-12 text-center shadow-large">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Protect Your Crops?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Join thousands of farmers who are already using CropCare to grow healthier crops and increase their yield.
            </p>
            <Button 
              variant="secondary" 
              size="xl" 
              onClick={() => setShowChat(true)}
              className="shadow-medium"
            >
              <Camera className="mr-2" />
              Start Free Diagnosis
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">CropCare</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 CropCare. Helping farmers grow better.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
