import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, PieChart, Wallet, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-travel.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Wallet className="h-8 w-8 text-primary" />,
      title: "Smart Budgeting",
      description: "Set your travel budget and track every expense with ease across 10+ categories"
    },
    {
      icon: <PieChart className="h-8 w-8 text-accent" />,
      title: "Visual Insights",
      description: "Beautiful charts and graphs help you understand your spending patterns at a glance"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-success" />,
      title: "Real-time Tracking",
      description: "Watch your budget progress in real-time and stay on track with your travel goals"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-accent" />
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                  Smart Travel Planning
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Plan Your Dream Trip with
                <span className="text-primary"> TravelWise</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                Track expenses, manage budgets, and visualize your spending across every adventure. Travel smarter, not harder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" onClick={() => navigate("/dashboard")} className="gap-2 shadow-medium hover:shadow-strong transition-shadow">
                  Get Started
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline"  onClick={() => navigate("/places")}>
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl transform rotate-3 blur-2xl opacity-20" />
              <img 
                src={heroImage} 
                alt="Travel destination" 
                className="relative rounded-3xl shadow-strong w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose TravelWise?
            </h1>
            <p className="text-lg text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your travel budget in one beautiful, intuitive platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 shadow-soft hover:shadow-medium transition-all hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Benefits Section */}
          <Card className="p-8 md:p-12 bg-gradient-primary text-primary-foreground shadow-strong">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold">Ready to Travel Smarter?</h3>
                <ul className="space-y-3">
                  {[
                    "Track expenses in 10+ categories",
                    "Beautiful visualizations with charts",
                    "Set and monitor budget goals",
                    "Mobile-optimized for on-the-go tracking",
                    "Secure local storage of your data"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center md:text-right">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => navigate("/dashboard")}
                  className="gap-2 shadow-medium hover:shadow-strong"
                >
                  Start Planning Now  
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 TravelWise. Built for travelers worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
