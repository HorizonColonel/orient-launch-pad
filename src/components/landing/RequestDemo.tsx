
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, CheckCircle, Users, BarChart3, Shield } from "lucide-react";
import { motion } from "framer-motion";

const RequestDemo = () => {
  const demoFeatures = [
    {
      icon: <Users className="w-5 h-5 text-primary" />,
      text: "Employee dashboard walkthrough"
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-primary" />,
      text: "Admin analytics & reporting"
    },
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      text: "Security & compliance overview"
    }
  ];

  const customerLogos = [
    "TechCorp", "GlobalTech", "InnovateLab", "StartupFlow", "Enterprise Co."
  ];

  return (
    <section id="request-demo" className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                <Badge variant="outline" className="text-primary border-primary">
                  <Play className="w-4 h-4 mr-2" />
                  Live Demo Available
                </Badge>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
                  See our platform <span className="text-primary">in action</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Get a personalized 30-minute demo tailored to your company's onboarding needs. 
                  See how leading companies streamline their employee training process.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">What you'll see in the demo:</h3>
                <div className="space-y-3">
                  {demoFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {feature.icon}
                      <span className="text-gray-600">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Logos */}
              <div className="space-y-4">
                <p className="text-sm text-gray-500">Trusted by 500+ companies worldwide</p>
                <div className="flex flex-wrap items-center gap-6">
                  {customerLogos.map((logo, index) => (
                    <div key={index} className="text-gray-400 font-medium text-sm">
                      {logo}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Request Your Demo</CardTitle>
                  <CardDescription>
                    Get started in less than 2 minutes. No commitment required.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="demoFirstName">First Name *</Label>
                      <Input id="demoFirstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="demoLastName">Last Name *</Label>
                      <Input id="demoLastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demoEmail">Business Email *</Label>
                    <Input id="demoEmail" type="email" placeholder="john@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demoCompany">Company Name *</Label>
                    <Input id="demoCompany" placeholder="Your Company" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="demoRole">Job Role</Label>
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                      <option value="">Select your role</option>
                      <option value="hr-manager">HR Manager</option>
                      <option value="hr-director">HR Director</option>
                      <option value="training-manager">Training Manager</option>
                      <option value="cpo">Chief People Officer</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" id="terms" className="mt-1" />
                    <label htmlFor="terms" className="text-xs text-gray-600">
                      I agree to receive communications from orientation.com.tr about their services.
                    </label>
                  </div>
                  <Button className="w-full" size="lg">
                    Get My Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <p className="text-xs text-center text-gray-500">
                    We'll contact you within 24 hours to schedule your demo.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestDemo;
