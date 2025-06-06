
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-blue-600">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-5xl font-bold text-white">
                Ready to get started?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Join hundreds of companies that have transformed their employee onboarding with our platform. Start your free trial today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/start-trial">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-50 text-lg px-8 py-4 font-semibold">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/request-demo">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 font-semibold">
                  Request Demo
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center justify-center space-x-2 text-blue-100">
                <CheckCircle className="w-5 h-5" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-blue-100">
                <CheckCircle className="w-5 h-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-blue-100">
                <CheckCircle className="w-5 h-5" />
                <span>Setup in under 30 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
