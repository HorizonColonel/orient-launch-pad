
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, MessageSquare, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const ContactForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    employees: '',
    inquiry: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission - In production, this would send to info@touristico.com.tr
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form submitted to info@touristico.com.tr:', formData);
      setIsSubmitted(true);
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        employees: '',
        inquiry: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["info@touristico.com.tr", "hr@touristico.com.tr"],
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+90 (536) 728 13 41", "+90 (535) 624 98 53"],
      action: "Call Now"
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["Levent Business Center", "Büyükdere Cad. No: 185", "34394 Şişli, Istanbul, Turkey"],
      action: "Get Directions"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM (GMT+3)", "Saturday: 10:00 AM - 2:00 PM (GMT+3)", "Sunday: Closed"],
      action: null
    }
  ];

  const quickActions = [
    {
      icon: Calendar,
      title: "Schedule a Demo",
      description: "Book a personalized demo with our team",
      action: "Schedule Now"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat"
    },
    {
      icon: Phone,
      title: "Request Callback",
      description: "We'll call you back within 24 hours",
      action: "Request Call"
    }
  ];

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-12 border-0 shadow-xl bg-green-50">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h2>
                <p className="text-xl text-gray-600 mb-6">
                  Thank you for reaching out to us. We've received your message and will get back to you within 24 hours at the email address you provided.
                </p>
                <p className="text-gray-600 mb-8">
                  Your message has been sent to <strong>info@touristico.com.tr</strong>
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)} 
                  className="bg-green-600 hover:bg-green-700"
                >
                  Send Another Message
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gray-50">
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
              📞 Get In Touch
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Let's discuss your
              <span className="text-primary block"> onboarding needs</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our team is here to help you transform your employee onboarding experience. Get in touch to learn more about how we can help.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 lg:p-10 border-0 shadow-xl">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h3>
                    <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input 
                          id="firstName" 
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input 
                          id="lastName" 
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company *</Label>
                        <Input 
                          id="company" 
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          placeholder="+90 (536) 728 13 41"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employees">Number of Employees</Label>
                        <Select onValueChange={(value) => handleInputChange('employees', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-100">51-100 employees</SelectItem>
                            <SelectItem value="101-500">101-500 employees</SelectItem>
                            <SelectItem value="500+">500+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="inquiry">Inquiry Type</Label>
                        <Select onValueChange={(value) => handleInputChange('inquiry', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="demo">Request Demo</SelectItem>
                            <SelectItem value="pricing">Pricing Information</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your onboarding challenges and goals..."
                        className="min-h-[120px]"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Quick Actions */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Need immediate help?</h3>
                <div className="space-y-4">
                  {quickActions.map((action, index) => (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300 border-gray-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <action.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{action.title}</h4>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          {action.action}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <info.icon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1">{info.title}</div>
                        {info.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="text-gray-600 text-sm">
                            {info.title === "Email" ? (
                              <a 
                                href={`mailto:${detail}`} 
                                className="hover:text-primary transition-colors"
                              >
                                {detail}
                              </a>
                            ) : info.title === "Phone" ? (
                              <a 
                                href={`tel:${detail.replace(/\s/g, '')}`} 
                                className="hover:text-primary transition-colors"
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </div>
                        ))}
                        {info.action && (
                          <Button variant="link" className="p-0 h-auto text-primary mt-2">
                            {info.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
