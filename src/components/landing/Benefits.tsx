
import { Card } from "@/components/ui/card";
import { TrendingUp, Clock, DollarSign, Award, Users, Target, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const Benefits = () => {
  const hrBenefits = [
    {
      icon: Clock,
      title: "75% Time Savings",
      description: "Reduce administrative tasks and focus on strategic HR initiatives."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      description: "Track progress, identify bottlenecks, and optimize training programs."
    },
    {
      icon: DollarSign,
      title: "Cost Reduction",
      description: "Lower training costs with digital materials and automated workflows."
    }
  ];

  const employeeBenefits = [
    {
      icon: Target,
      title: "Personalized Learning",
      description: "Customized training paths based on role, department, and skill level."
    },
    {
      icon: Users,
      title: "Better Integration",
      description: "Connect with colleagues and understand company culture faster."
    },
    {
      icon: Award,
      title: "Achievement Tracking",
      description: "Celebrate milestones and track professional development progress."
    }
  ];

  const metrics = [
    { value: "85%", label: "Faster Onboarding", color: "text-green-600" },
    { value: "95%", label: "Employee Satisfaction", color: "text-blue-600" },
    { value: "60%", label: "Cost Reduction", color: "text-purple-600" },
    { value: "40%", label: "Better Retention", color: "text-orange-600" }
  ];

  return (
    <section id="benefits" className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center space-y-6 mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              📊 Proven Results
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Measurable impact on your
              <span className="text-primary block"> business</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join hundreds of companies that have transformed their onboarding process with remarkable results.
            </p>
          </motion.div>

          {/* Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300 border-gray-200">
                  <div className={`text-5xl font-bold ${metric.color} mb-2`}>
                    {metric.value}
                  </div>
                  <div className="text-gray-600 font-medium">{metric.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Benefits for HR and Employees */}
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-8">For HR Managers</h3>
              <div className="space-y-6">
                {hrBenefits.map((benefit, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 border-gray-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-8">For Employees</h3>
              <div className="space-y-6">
                {employeeBenefits.map((benefit, index) => (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 border-gray-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <benefit.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
