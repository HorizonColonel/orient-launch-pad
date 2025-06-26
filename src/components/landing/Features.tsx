
import { Card } from "@/components/ui/card";
import { Upload, Users, BarChart3, Shield, Clock, Target, Video, FileText } from "lucide-react";
import { motion } from "framer-motion";

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
      title: "Enterprise Security",
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
    },
    {
      icon: Video,
      title: "Interactive Training",
      description: "Create engaging video content with embedded quizzes, interactive elements, and progress checkpoints."
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Centralized document library with version control, approval workflows, and automated distribution."
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center space-y-6 mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              ✨ Powerful Features
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Everything you need for
              <span className="text-primary block"> effective onboarding</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our comprehensive platform provides all the tools your HR team needs to create, manage, and track successful employee orientation programs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 hover:shadow-xl transition-all duration-300 border-gray-200 h-full group hover:-translate-y-2">
                  <div className="space-y-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
