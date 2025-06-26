
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Target, Award, Globe } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUsPage = () => {
  const values = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "People First",
      description: "We believe that great onboarding experiences create lasting positive impressions and set employees up for success."
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Innovation",
      description: "We continuously innovate to provide cutting-edge solutions that adapt to the evolving needs of modern workplaces."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from product design to customer support and beyond."
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Global Impact",
      description: "We're committed to helping organizations worldwide create better employee experiences and build stronger teams."
    }
  ];

  const team = [
    {
      name: "Ufuk Albay",
      role: "Co-Founder & Chief Product Officer (CPO)",
      bio: "Product visionary with deep expertise in user experience design and platform development for enterprise solutions."
    },
    {
      name: "Öznur İleri",
      role: "Co-Founder & Chief Operating Officer (COO)",
      bio: "Operations leader focused on scaling business processes and ensuring exceptional customer experiences."
    },
    {
      name: "Burak Dere",
      role: "Lead Backend Engineer",
      bio: "Backend architecture expert specializing in scalable systems and database optimization for high-performance applications."
    },
    {
      name: "Hüseyin Emir Kara",
      role: "Full-Stack Developer",
      bio: "Full-stack engineer with expertise in modern web technologies and seamless frontend-backend integration."
    },
    {
      name: "Deniz Eren Arıcı",
      role: "DevOps & Infrastructure Engineer",
      bio: "Infrastructure specialist ensuring reliable, secure, and scalable deployment environments for our platform."
    },
    {
      name: "Elif Yılmaz",
      role: "Customer Support Specialist",
      bio: "Customer success advocate dedicated to providing exceptional support and ensuring client satisfaction."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">About Us</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transforming <span className="text-primary">employee onboarding</span> across Turkey
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Founded in 2020, we're on a mission to help organizations create exceptional first impressions and set their employees up for long-term success.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Orientation.com.tr was born from a simple observation: most companies struggle to create engaging, 
                    consistent onboarding experiences for their new employees. Traditional methods were time-consuming, 
                    inconsistent, and often left new hires feeling disconnected.
                  </p>
                  <p>
                    Our founders, coming from HR and technology backgrounds, recognized the need for a platform that 
                    could streamline the onboarding process while maintaining the human touch that makes employees feel valued.
                  </p>
                  <p>
                    Today, we're proud to serve over 500 companies across Turkey, helping them transform their employee 
                    onboarding with our comprehensive platform that combines ease of use with powerful features.
                  </p>
                </div>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary">500+</div>
                    <div className="text-gray-600">Companies</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">50K+</div>
                    <div className="text-gray-600">Employees Onboarded</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">4.8/5</div>
                    <div className="text-gray-600">Customer Rating</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">2020</div>
                    <div className="text-gray-600">Founded</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                These core values guide everything we do and shape how we build products and serve our customers.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Meet the passionate team behind Orientation.com.tr, dedicated to revolutionizing employee onboarding.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl text-blue-100 mb-8">
              Ready to transform your employee onboarding? Let's create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-50">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
