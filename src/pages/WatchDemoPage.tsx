
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, Users, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WatchDemoPage = () => {
  const demoSections = [
    { title: "Platform Overview", duration: "2:30", description: "Introduction to the main dashboard and navigation" },
    { title: "Creating Training Modules", duration: "3:45", description: "Step-by-step guide to building engaging content" },
    { title: "Employee Management", duration: "2:15", description: "Adding users, setting permissions, and organizing teams" },
    { title: "Analytics & Reporting", duration: "3:00", description: "Tracking progress and generating insights" },
    { title: "Mobile Experience", duration: "1:30", description: "How employees access training on mobile devices" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Video Demo</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Watch Orientation <span className="text-primary">in action</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              See how easy it is to create, manage, and deliver engaging onboarding experiences with our platform.
            </p>
          </div>
        </div>
      </section>

      {/* Video Player Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Video Player */}
              <div className="lg:col-span-2">
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="aspect-video bg-gray-900 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button size="lg" className="rounded-full w-20 h-20">
                        <Play className="w-8 h-8 ml-1" />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">13:00 total runtime</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Complete Platform Demo</h3>
                    <p className="text-gray-600 mb-4">
                      This comprehensive demo covers all major features of the Orientation platform, 
                      showing you exactly how to transform your employee onboarding process.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>1,247 views</span>
                      </span>
                      <span>Updated: March 2024</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Demo Sections */}
                <div className="mt-8 space-y-4">
                  <h3 className="text-xl font-bold">Demo Chapters</h3>
                  {demoSections.map((section, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-semibold">{section.title}</div>
                              <div className="text-sm text-gray-600">{section.description}</div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">{section.duration}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ready to get started?</CardTitle>
                    <CardDescription>
                      Start your free trial or schedule a personalized demo
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full">Start Free Trial</Button>
                    <Button variant="outline" className="w-full">Schedule Live Demo</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What you'll see</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      "Intuitive dashboard design",
                      "Drag-and-drop content builder",
                      "Real-time progress tracking",
                      "Mobile-first experience",
                      "Advanced reporting features",
                      "Integration capabilities"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Download Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full text-sm">
                      Product Overview PDF
                    </Button>
                    <Button variant="outline" className="w-full text-sm">
                      ROI Calculator
                    </Button>
                    <Button variant="outline" className="w-full text-sm">
                      Implementation Guide
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WatchDemoPage;
