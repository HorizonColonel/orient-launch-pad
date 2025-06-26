
import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director",
      company: "TechCorp Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b60ce2cc?w=150&h=150&fit=crop&crop=face",
      content: "orientation.com.tr has revolutionized our onboarding process. New employees are now productive 40% faster, and our HR team saves countless hours on administrative tasks. The platform is intuitive and our employees love the interactive training modules.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Training Manager",
      company: "Global Industries Inc.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The reporting dashboard gives us incredible insights into employee progress. We can identify training gaps early and provide targeted support where needed. The integration with our existing tools was seamless and the support team was exceptional.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Chief People Officer",
      company: "InnovateLab",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Implementation was incredibly smooth, and the results exceeded our expectations. Our new hire satisfaction scores have increased by 30% since we started using the platform. The customizable workflows have made our onboarding process much more efficient.",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Operations Director",
      company: "StartupFlow",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "As a growing startup, we needed a solution that could scale with us. Orientation.com.tr has been perfect - it's user-friendly, cost-effective, and has helped us maintain consistent onboarding quality as we've doubled our team size.",
      rating: 5
    },
    {
      name: "Lisa Thompson",
      role: "HR Business Partner",
      company: "Enterprise Solutions Co.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      content: "The security features and compliance tracking have been game-changers for our enterprise environment. We can ensure all employees complete required training and maintain detailed audit trails for compliance reporting.",
      rating: 5
    },
    {
      name: "James Wilson",
      role: "Learning & Development Lead",
      company: "TechStart Innovations",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
      content: "The interactive elements and gamification features have significantly improved employee engagement. Our completion rates have gone from 60% to 95%, and employees actually look forward to their training sessions now.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center space-y-6 mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
              ⭐ Customer Stories
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Trusted by
              <span className="text-primary block"> HR leaders worldwide</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              See what HR professionals and training managers are saying about their experience with orientation.com.tr.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 hover:shadow-xl transition-all duration-300 border-gray-200 h-full relative">
                  <div className="space-y-6">
                    <Quote className="w-8 h-8 text-primary/20" />
                    
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center space-x-4 pt-6 border-t border-gray-100">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                        <div className="text-sm text-primary font-medium">{testimonial.company}</div>
                      </div>
                    </div>
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

export default Testimonials;
