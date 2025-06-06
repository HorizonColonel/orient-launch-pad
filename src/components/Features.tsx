
import { Card } from "@/components/ui/card";
import { Upload, Users, BarChart3, Shield, Clock, Target } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Upload,
      title: "Easy Content Upload",
      description: "Upload training materials, videos, documents, and interactive content with our intuitive drag-and-drop interface."
    },
    {
      icon: Users,
      title: "Employee Access Control",
      description: "Manage user permissions, create groups, and control access to specific training modules based on roles and departments."
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor employee progress with detailed analytics, completion rates, and engagement metrics in real-time."
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security with SSO integration, data encryption, and compliance with industry standards."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Set training deadlines, send automated reminders, and create customized learning paths for different roles."
    },
    {
      icon: Target,
      title: "Custom Modules",
      description: "Build tailored orientation programs with quizzes, assessments, and interactive elements to maximize engagement."
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              ✨ Powerful Features
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Everything you need for
              <span className="text-primary"> effective onboarding</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools your HR team needs to create, manage, and track successful employee orientation programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 border-gray-200">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
