
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Video } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RequestDemoPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Request Demo</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              See Orientation in <span className="text-primary">action</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get a personalized demo tailored to your company's needs. See how we can transform your onboarding process.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Request Form */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Schedule Your Demo</CardTitle>
                <CardDescription>
                  Tell us about your needs and we'll customize the demo for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Work Email *</Label>
                  <Input id="email" type="email" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+90 (212) 555-0123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input id="company" placeholder="Your Company" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" placeholder="HR Manager" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employees">Company Size *</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Implementation Timeline</Label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                    <option value="">Select timeline</option>
                    <option value="immediate">Immediate (within 1 month)</option>
                    <option value="quarter">This quarter (1-3 months)</option>
                    <option value="later">Later this year (3-6 months)</option>
                    <option value="exploring">Just exploring</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="challenges">Current Challenges</Label>
                  <Textarea 
                    id="challenges" 
                    placeholder="Tell us about your current onboarding challenges..."
                    className="min-h-[100px]"
                  />
                </div>
                <Button className="w-full" size="lg">
                  Request Demo
                </Button>
              </CardContent>
            </Card>

            {/* Demo Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Calendar className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Flexible Scheduling</div>
                      <div className="text-gray-600">Choose a time that works for you. We accommodate all time zones.</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">30-45 Minutes</div>
                      <div className="text-gray-600">Comprehensive walkthrough tailored to your needs.</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Users className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Bring Your Team</div>
                      <div className="text-gray-600">Invite stakeholders from HR, IT, and leadership.</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Video className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <div className="font-semibold">Interactive Demo</div>
                      <div className="text-gray-600">See the platform in action with your use cases.</div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg">Demo Agenda</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <div className="font-semibold">Discovery (5 min)</div>
                    <div className="text-gray-600">Understanding your current process</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">Platform Overview (15 min)</div>
                    <div className="text-gray-600">Core features and capabilities</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">Custom Scenarios (15 min)</div>
                    <div className="text-gray-600">Tailored to your use cases</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold">Q&A & Next Steps (10 min)</div>
                    <div className="text-gray-600">Questions and implementation planning</div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-2">Preparation Tips</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Think about your current onboarding process</li>
                  <li>• Prepare questions about specific features</li>
                  <li>• Consider your team size and growth plans</li>
                  <li>• Have your current pain points in mind</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RequestDemoPage;
