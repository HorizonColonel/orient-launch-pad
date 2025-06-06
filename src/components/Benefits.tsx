
import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, DollarSign, Award } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "85% Faster Onboarding",
      description: "Reduce onboarding time from weeks to days with streamlined digital processes.",
      metric: "85%",
      color: "text-green-600"
    },
    {
      icon: Clock,
      title: "50% Time Savings",
      description: "Automate repetitive tasks and let HR focus on strategic initiatives.",
      metric: "50%",
      color: "text-blue-600"
    },
    {
      icon: DollarSign,
      title: "40% Cost Reduction",
      description: "Lower training costs with digital materials and automated workflows.",
      metric: "40%",
      color: "text-purple-600"
    },
    {
      icon: Award,
      title: "95% Employee Satisfaction",
      description: "Improve new hire experience with engaging, interactive content.",
      metric: "95%",
      color: "text-orange-600"
    }
  ];

  return (
    <section id="benefits" className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              📊 Proven Results
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Measurable impact on your
              <span className="text-primary"> business</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join hundreds of companies that have transformed their onboarding process and achieved remarkable results with our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow duration-300 border-gray-200">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                  </div>
                  <div className={`text-4xl font-bold ${benefit.color}`}>
                    {benefit.metric}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Ready to transform your onboarding process?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  See how orientation.com.tr can help your company create more engaging, efficient, and trackable onboarding experiences for new employees.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Schedule a Demo
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                    Download Case Study
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Implementation Time</span>
                    <span className="font-semibold text-gray-900">2-4 weeks</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Training Required</span>
                    <span className="font-semibold text-gray-900">Minimal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">ROI Timeline</span>
                    <span className="font-semibold text-gray-900">3-6 months</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Support Level</span>
                    <span className="font-semibold text-gray-900">24/7 Premium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
