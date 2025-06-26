
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";

const Careers = () => {
  const openPositions = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Istanbul, Turkey / Remote",
      type: "Full-time",
      description: "Join our engineering team to build the next generation of onboarding experiences."
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "Istanbul, Turkey",
      type: "Full-time",
      description: "Lead product strategy and roadmap for our core onboarding platform."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description: "Help our customers achieve success with their onboarding programs."
    },
    {
      title: "Sales Development Representative",
      department: "Sales",
      location: "Istanbul, Turkey / Remote",
      type: "Full-time",
      description: "Drive growth by connecting with HR leaders who need better onboarding solutions."
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Comprehensive Health Coverage",
      description: "Full medical, dental, and vision insurance for you and your family."
    },
    {
      icon: Clock,
      title: "Flexible Work Arrangements",
      description: "Work remotely or from our Istanbul office with flexible hours."
    },
    {
      icon: Users,
      title: "Professional Development",
      description: "Annual learning budget and conference attendance opportunities."
    },
    {
      icon: MapPin,
      title: "Beautiful Office Space",
      description: "Modern office in the heart of Istanbul with all amenities."
    }
  ];

  return (
    <section id="careers" className="py-20 lg:py-32 bg-white">
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
              🚀 Join Our Team
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Build the future of
              <span className="text-primary block"> employee onboarding</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join a passionate team that's transforming how companies welcome and train their employees. We're looking for talented individuals who share our vision.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Work With Us</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300 border-gray-200 h-full">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Open Positions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Open Positions</h3>
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 hover:shadow-lg transition-shadow duration-300 border-gray-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                          <h4 className="text-xl font-semibold text-gray-900">{position.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{position.department}</span>
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{position.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{position.type}</span>
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{position.description}</p>
                      </div>
                      <div className="lg:ml-8">
                        <Button className="w-full lg:w-auto">Apply Now</Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-gray-600 mb-6 text-lg">
                Don't see a perfect fit? We're always looking for talented people.
              </p>
              <Button variant="outline" size="lg">
                Send Us Your Resume
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
