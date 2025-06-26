
import { Card } from "@/components/ui/card";
import { Users, Target, Award, Globe, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const AboutUs = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Companies Served" },
    { icon: Globe, value: "50K+", label: "Employees Onboarded" },
    { icon: Award, value: "95%", label: "Customer Satisfaction" },
    { icon: Target, value: "75%", label: "Time Saved on Average" }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We continuously evolve our platform with cutting-edge technology to meet the changing needs of modern workplaces."
    },
    {
      title: "Customer Success",
      description: "Your success is our success. We're committed to helping you achieve your onboarding goals with dedicated support."
    },
    {
      title: "Security & Privacy",
      description: "We prioritize the security of your data with enterprise-grade protection and compliance with global standards."
    },
    {
      title: "Simplicity",
      description: "Complex problems deserve simple solutions. We make powerful onboarding tools accessible to everyone."
    }
  ];

  const team = [
    {
      name: "Ufuk Albay",
      role: "Co-Founder & Chief Product Officer (CPO)",
      bio: "Product visionary with deep expertise in user experience design and platform development for enterprise solutions.",
      linkedin: "#"
    },
    {
      name: "Öznur İleri",
      role: "Co-Founder & Chief Operating Officer (COO)",
      bio: "Operations leader focused on scaling business processes and ensuring exceptional customer experiences.",
      linkedin: "#"
    },
    {
      name: "Burak Dere",
      role: "Lead Backend Engineer",
      bio: "Backend architecture expert specializing in scalable systems and database optimization for high-performance applications.",
      linkedin: "#"
    },
    {
      name: "Hüseyin Emir Kara",
      role: "Full-Stack Developer",
      bio: "Full-stack engineer with expertise in modern web technologies and seamless frontend-backend integration.",
      linkedin: "#"
    },
    {
      name: "Deniz Eren Arıcı",
      role: "DevOps & Infrastructure Engineer",
      bio: "Infrastructure specialist ensuring reliable, secure, and scalable deployment environments for our platform.",
      linkedin: "#"
    },
    {
      name: "Elif Yılmaz",
      role: "Customer Support Specialist",
      bio: "Customer success advocate dedicated to providing exceptional support and ensuring client satisfaction.",
      linkedin: "#"
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-50">
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
              🏢 About Us
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Transforming employee onboarding
              <span className="text-primary block"> since 2020</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're on a mission to help companies create exceptional first impressions and accelerate employee success through innovative onboarding technology.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300 border-gray-200">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Story */}
          <motion.div 
            className="grid lg:grid-cols-2 gap-16 items-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">Our Story</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                <p>
                  Founded in 2020 by a team of HR professionals and technology experts, Orientation.com.tr was born from a simple observation: employee onboarding was broken at most companies.
                </p>
                <p>
                  We witnessed talented new hires struggling with fragmented, outdated processes that left them confused and disengaged. Meanwhile, HR teams were drowning in administrative tasks that could be automated.
                </p>
                <p>
                  Today, we're proud to serve over 500 companies worldwide, helping them create onboarding experiences that employees actually enjoy and that deliver measurable business results.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop"
                alt="Our team collaborating"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 text-center hover:shadow-lg transition-shadow duration-300 border-gray-200 h-full">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h4>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                    <a 
                      href={member.linkedin} 
                      className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors"
                      aria-label={`${member.name} LinkedIn profile`}
                    >
                      <Linkedin className="w-5 h-5 text-primary" />
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">Our Values</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-8 hover:shadow-lg transition-shadow duration-300 border-gray-200 h-full">
                    <h4 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
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

export default AboutUs;
