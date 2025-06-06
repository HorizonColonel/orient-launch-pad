
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, BarChart3, Shield, Clock, FileText, Video, Settings } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FeaturesPage = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Employee Management",
      description: "Complete employee onboarding with role-based access control and user management.",
      features: ["Role-based permissions", "Bulk user import", "Department organization", "Custom user fields"]
    },
    {
      icon: <Video className="w-8 h-8 text-primary" />,
      title: "Interactive Training Modules",
      description: "Create engaging training content with videos, quizzes, and interactive elements.",
      features: ["Video integration", "Interactive quizzes", "Progress tracking", "Mobile responsive"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and analytics to track training effectiveness.",
      features: ["Real-time dashboards", "Custom reports", "Progress analytics", "Export capabilities"]
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Security & Compliance",
      description: "Enterprise-grade security with compliance tracking and audit trails.",
      features: ["SOC 2 compliant", "GDPR ready", "Audit trails", "Data encryption"]
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Automated Workflows",
      description: "Streamline onboarding with automated assignments and notifications.",
      features: ["Auto-assignment", "Email notifications", "Reminder system", "Workflow templates"]
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Content Management",
      description: "Easy-to-use content creation and management tools for training materials.",
      features: ["Drag-drop editor", "Template library", "Version control", "Multi-format support"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Features Overview</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Everything you need for <span className="text-primary">employee onboarding</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Comprehensive features designed to streamline your onboarding process and improve employee engagement from day one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    {feature.icon}
                    <div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Connect with your existing HR systems and tools for a unified experience.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {["Slack", "Microsoft Teams", "Google Workspace", "Salesforce", "BambooHR", "Workday", "ADP", "SAP"].map((integration) => (
                <div key={integration} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="text-gray-600 font-medium">{integration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
