
import { Card } from "@/components/ui/card";
import { Shield, Zap, Globe, Lock } from "lucide-react";
import { motion } from "framer-motion";

const Integrations = () => {
  const integrations = [
    "Slack", "Microsoft Teams", "Google Workspace", "Salesforce", 
    "BambooHR", "Workday", "ADP", "SAP", "Zoom", "Jira", "Trello", "Asana"
  ];

  const securityFeatures = [
    {
      icon: Shield,
      title: "SOC 2 Compliant",
      description: "Enterprise-grade security standards and compliance certifications."
    },
    {
      icon: Lock,
      title: "Data Encryption",
      description: "End-to-end encryption for all data in transit and at rest."
    },
    {
      icon: Globe,
      title: "Global Infrastructure",
      description: "99.9% uptime with servers across multiple regions worldwide."
    },
    {
      icon: Zap,
      title: "Single Sign-On",
      description: "Seamless integration with your existing SSO providers."
    }
  ];

  return (
    <section id="integrations" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center space-y-6 mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
              🔗 Integrations & Security
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Seamlessly integrate with
              <span className="text-primary block"> your existing tools</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Connect with your favorite productivity tools and maintain enterprise-grade security standards.
            </p>
          </motion.div>

          {/* Integrations Grid */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Popular Integrations</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-gray-200 hover:-translate-y-1">
                    <div className="text-gray-700 font-medium text-sm">{integration}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Enterprise Security</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 border-gray-200 h-full">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
