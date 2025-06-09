
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TermsOfServiceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TermsOfServiceModal = ({ open, onOpenChange }: TermsOfServiceModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>📄 Terms of Service</DialogTitle>
          <DialogDescription>
            Effective Date: June 9, 2025 | Website: https://orientation.com.tr
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-semibold text-lg mb-3">Acceptance of Terms</h3>
              <p className="text-muted-foreground leading-relaxed">
                By using Orientation.com.tr, you agree to these terms. If you do not agree, please do not use the platform.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">Service Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                Orientation.com.tr is a digital training platform where companies can provide training modules, track employee progress, and share documents.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">User Accounts</h3>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Users log in via Supabase-based authentication.</li>
                <li>Users are responsible for keeping their credentials secure.</li>
                <li>Creating fake or impersonated accounts is prohibited.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">Acceptable Use</h3>
              <p className="text-muted-foreground mb-2">Users must:</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Use the platform for lawful purposes only</li>
                <li>Not upload content that infringes copyrights, harasses, or violates data privacy</li>
                <li>Not attempt to harm or disrupt platform security</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">Role-Based Access</h3>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>The employee role can access only assigned training content</li>
                <li>The company_admin role can manage content and users within their company</li>
                <li>Users can only view pages related to their own company</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">Intellectual Property</h3>
              <p className="text-muted-foreground leading-relaxed">
                All content, design, code, and visuals are owned by Orientation.com.tr and cannot be copied or used without permission.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">Limitation of Liability</h3>
              <p className="text-muted-foreground leading-relaxed">
                Orientation.com.tr is not responsible for any damages arising from service interruptions, data loss, or third-party access.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">Termination</h3>
              <p className="text-muted-foreground leading-relaxed">
                Users may request account deletion at any time. Violation of terms may result in suspension or termination without prior notice.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">Governing Law</h3>
              <p className="text-muted-foreground leading-relaxed">
                These terms are governed by the laws of the Republic of Turkey. Any disputes will be settled in Istanbul central courts.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfServiceModal;
