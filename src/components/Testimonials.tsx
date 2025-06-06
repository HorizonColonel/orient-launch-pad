
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director",
      company: "TechCorp Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b60ce2cc?w=150&h=150&fit=crop&crop=face",
      content: "Orientation.com.tr has revolutionized our onboarding process. New employees are now productive 40% faster, and our HR team saves countless hours on administrative tasks.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Training Manager",
      company: "Global Industries Inc.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The reporting dashboard gives us incredible insights into employee progress. We can identify training gaps early and provide targeted support where needed.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Chief People Officer",
      company: "InnovateLab",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Implementation was seamless, and the support team was exceptional. Our new hire satisfaction scores have increased by 30% since we started using the platform.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
              ⭐ Customer Stories
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Trusted by
              <span className="text-primary"> HR leaders</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what HR professionals and training managers are saying about their experience with orientation.com.tr.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm text-primary font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
