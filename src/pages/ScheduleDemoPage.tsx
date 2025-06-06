
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Video, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ScheduleDemoPage = () => {
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const benefits = [
    "Personalized walkthrough",
    "Q&A with product experts",
    "Custom use case scenarios",
    "Implementation planning",
    "ROI discussion"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">Schedule Demo</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Book your <span className="text-primary">personalized demo</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Choose a time that works for you. Our experts will show you how Orientation can transform your onboarding process.
            </p>
          </div>
        </div>
      </section>

      {/* Scheduling Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Select Date & Time</CardTitle>
                  <CardDescription>
                    All times shown in your local timezone (GMT+3)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-sm font-semibold text-gray-600 p-2">
                        {day}
                      </div>
                    ))}
                    {/* Calendar days */}
                    {Array.from({ length: 35 }, (_, i) => {
                      const date = i + 1;
                      const isAvailable = date > 10 && date < 25 && i % 7 !== 0 && i % 7 !== 6;
                      const isSelected = date === 15;
                      
                      return (
                        <button
                          key={i}
                          className={`p-2 text-sm rounded-md ${
                            date > 31 ? 'text-gray-300' :
                            isSelected ? 'bg-primary text-white' :
                            isAvailable ? 'hover:bg-gray-100 border border-gray-200' :
                            'text-gray-300 cursor-not-allowed'
                          }`}
                          disabled={!isAvailable || date > 31}
                        >
                          {date > 31 ? '' : date}
                        </button>
                      );
                    })}
                  </div>

                  {/* Time Slots */}
                  <div>
                    <h4 className="font-semibold mb-3">Available Times - March 15, 2024</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time, index) => (
                        <Button
                          key={index}
                          variant={index === 2 ? "default" : "outline"}
                          size="sm"
                          className="text-sm"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name *</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email *</label>
                        <input
                          type="email"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="your.email@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Company *</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          placeholder="+90 (212) 555-0123"
                        />
                      </div>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Confirm Demo - March 15 at 11:00 AM
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Demo Information */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Video className="w-5 h-5 text-primary" />
                    <span>Demo Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">45 minutes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">1-on-1 with expert</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <span className="text-sm">Via Google Meet/Zoom</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-lg">Preparation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>To make the most of your demo:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Think about your current challenges</li>
                    <li>• Prepare specific questions</li>
                    <li>• Consider inviting key stakeholders</li>
                    <li>• Have your employee count ready</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="text-center text-sm text-gray-600">
                <p>Need a different time?</p>
                <Button variant="link" className="p-0 h-auto">
                  Contact us directly
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ScheduleDemoPage;
