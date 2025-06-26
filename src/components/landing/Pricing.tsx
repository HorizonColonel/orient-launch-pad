
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$49",
      period: "per month",
      description: "Perfect for small teams getting started with employee onboarding.",
      features: [
        "Up to 50 employees",
        "Basic training modules",
        "Progress tracking",
        "Email support",
        "Mobile app access",
        "Basic analytics"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$149",
      period: "per month",
      description: "Ideal for growing companies with advanced onboarding needs.",
      features: [
        "Up to 250 employees",
        "Advanced training modules",
        "Custom workflows",
        "Priority support",
        "Advanced analytics",
        "API access",
        "Custom branding",
        "SSO integration"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "Tailored solutions for large organizations with complex requirements.",
      features: [
        "Unlimited employees",
        "White-label solution",
        "Dedicated support",
        "Custom integrations",
        "Advanced security",
        "Compliance reporting",
        "On-premise deployment",
        "Custom development"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-gray-50">
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
              💰 Simple Pricing
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Choose the perfect plan
              <span className="text-primary block"> for your team</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Start with a 14-day free trial. No credit card required. Upgrade or downgrade at any time.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
                <Card className={`p-8 lg:p-10 h-full ${plan.popular ? 'border-primary shadow-xl scale-105' : 'border-gray-200'} hover:shadow-xl transition-all duration-300`}>
                  <div className="space-y-8">
                    <div className="text-center space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                      <div className="space-y-2">
                        <div className="flex items-baseline justify-center space-x-2">
                          <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                          {plan.price !== "Custom" && (
                            <span className="text-gray-600">/{plan.period}</span>
                          )}
                        </div>
                        {plan.price === "Custom" && (
                          <div className="text-gray-600">{plan.period}</div>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed">{plan.description}</p>
                    </div>

                    <div className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      {plan.name === "Enterprise" ? (
                        <Link to="/contact">
                          <Button className="w-full" size="lg" variant={plan.popular ? "default" : "outline"}>
                            Contact Sales
                          </Button>
                        </Link>
                      ) : (
                        <Link to="/start-trial">
                          <Button className="w-full" size="lg" variant={plan.popular ? "default" : "outline"}>
                            Start Free Trial
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-600 mb-6">
              Need help choosing the right plan? Our team is here to help.
            </p>
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Talk to Sales Team
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
