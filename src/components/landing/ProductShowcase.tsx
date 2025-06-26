
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Users, BarChart3, FileText, CheckCircle, Clock, Target } from "lucide-react";
import { motion } from "framer-motion";

const ProductShowcase = () => {
  return (
    <section id="product-showcase" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center space-y-6 mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="text-primary border-primary">
              🎯 Product Overview
            </Badge>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900">
              Two powerful views,
              <span className="text-primary block"> one seamless experience</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              See how our platform serves both employees and administrators with intuitive, purpose-built interfaces.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Employee View */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Users className="w-4 h-4" />
                  <span>Employee Experience</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">My Training Dashboard</h3>
                <p className="text-lg text-gray-600 mb-8">
                  Employees access their personalized training portal with progress tracking, 
                  interactive modules, and clear completion milestones.
                </p>
              </div>

              {/* Mock Employee Dashboard */}
              <div className="relative">
                <Card className="p-6 lg:p-8 shadow-2xl bg-gradient-to-br from-white to-blue-50 border-blue-200">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-semibold text-gray-900">Welcome back, Sarah!</h4>
                      <Badge className="bg-green-100 text-green-700">3 of 5 Complete</Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Company Policies</span>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full w-full"></div>
                        </div>
                        <span className="text-sm text-gray-500 mt-1">Completed</span>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Safety Training</span>
                          <Clock className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                        </div>
                        <span className="text-sm text-gray-500 mt-1">75% Complete</span>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">Team Introduction</span>
                          <Target className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full w-1/3"></div>
                        </div>
                        <span className="text-sm text-gray-500 mt-1">In Progress</span>
                      </div>
                    </div>

                    <Button className="w-full">
                      Continue Training
                      <Play className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </Card>

                {/* Floating Stats */}
                <motion.div 
                  className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">8.5h</div>
                    <div className="text-sm text-gray-500">Time Saved</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Admin View */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <BarChart3 className="w-4 h-4" />
                  <span>Admin Experience</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Management Dashboard</h3>
                <p className="text-lg text-gray-600 mb-8">
                  HR administrators get comprehensive analytics, user management tools, 
                  and content creation capabilities in one unified platform.
                </p>
              </div>

              {/* Mock Admin Dashboard */}
              <div className="relative">
                <Card className="p-6 lg:p-8 shadow-2xl bg-gradient-to-br from-white to-purple-50 border-purple-200">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-semibold text-gray-900">Training Analytics</h4>
                      <Badge className="bg-purple-100 text-purple-700">125 Active Users</Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-green-600">94%</div>
                        <div className="text-sm text-gray-500">Completion Rate</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">28</div>
                        <div className="text-sm text-gray-500">Active Modules</div>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                        <div className="text-2xl font-bold text-purple-600">4.8</div>
                        <div className="text-sm text-gray-500">Avg. Rating</div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h5 className="font-medium text-gray-900 mb-3">Recent Activity</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Sarah completed "Company Policies"</span>
                          <span className="text-gray-500">2 min ago</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Mike started "Safety Training"</span>
                          <span className="text-gray-500">5 min ago</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>New module "HR Guidelines" created</span>
                          <span className="text-gray-500">1h ago</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      <FileText className="mr-2 w-4 h-4" />
                      Create New Module
                    </Button>
                  </div>
                </Card>

                {/* Floating Analytics */}
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl border border-gray-100"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">↗ 23%</div>
                    <div className="text-sm text-gray-500">Engagement</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
