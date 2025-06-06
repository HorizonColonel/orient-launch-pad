
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Users, DollarSign, Target, Award } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BenefitsPage = () => {
  const benefits = [
    {
      icon: <Clock className="w-12 h-12 text-primary" />,
      title: "75% Faster Onboarding",
      description: "Reduce onboarding time from weeks to days with automated workflows and streamlined processes.",
      metric: "Average 3-day onboarding vs 12-day traditional process"
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "90% Employee Satisfaction",
      description: "Higher employee satisfaction rates with structured, engaging onboarding experiences.",
      metric: "Based on post-onboarding surveys from 500+ companies"
    },
    {
      icon: <DollarSign className="w-12 h-12 text-primary" />,
      title: "60% Cost Reduction",
      description: "Significant cost savings through automation and reduced administrative overhead.",
      metric: "Average savings of $2,400 per new hire"
    },
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      title: "85% Better Retention",
      description: "Improved employee retention rates with comprehensive onboarding programs.",
      metric: "First-year retention improvement of 25%"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
      title: "50% Faster Productivity",
      description: "New employees reach full productivity faster with structured training paths.",
      metric: "Time to productivity reduced from 90 to 45 days"
    },
    {
      icon: <Award className="w-12 h-12 text-primary" />,
      title: "100% Compliance",
      description: "Ensure all employees complete required training with automated tracking and reporting.",
      metric: "Zero compliance violations reported by clients"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Proven Results</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transform your <span className="text-primary">onboarding ROI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of companies that have dramatically improved their onboarding process and employee satisfaction with measurable results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                See ROI Calculator
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                Download Case Study
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Measurable Business Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform delivers concrete results that directly impact your bottom line and employee experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-2xl mb-2">{benefit.title}</CardTitle>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-primary font-semibold">{benefit.metric}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              See how much you could save with our onboarding platform
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="text-3xl font-bold mb-2">$2,400</div>
                <div className="text-blue-100">Average savings per hire</div>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="text-3xl font-bold mb-2">15 hours</div>
                <div className="text-blue-100">HR time saved per hire</div>
              </div>
              <div className="bg-white/10 p-6 rounded-lg">
                <div className="text-3xl font-bold mb-2">30 days</div>
                <div className="text-blue-100">Faster time to productivity</div>
              </div>
            </div>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-50 text-lg px-8 py-4">
              Calculate Your Savings
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BenefitsPage;
