
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyPolicyModal = ({ open, onOpenChange }: PrivacyPolicyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>🔐 Privacy Policy</DialogTitle>
          <DialogDescription>
            Effective Date: June 9, 2025 | Website: https://orientation.com.tr
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-semibold text-lg mb-3">Introduction</h3>
              <p className="text-muted-foreground leading-relaxed">
                At Orientation.com.tr, we take the privacy of our users very seriously. This privacy policy explains how we collect, process, store, and protect your personal data.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">What We Collect</h3>
              <p className="text-muted-foreground mb-2">We may collect the following personal data:</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Name and surname</li>
                <li>Email address</li>
                <li>Company information</li>
                <li>Training history and progress</li>
                <li>IP address and session data</li>
                <li>In-platform behavior data</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">How We Use Your Data</h3>
              <p className="text-muted-foreground mb-2">Collected data is used for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Creating accounts and authenticating identity</li>
                <li>Managing the training process</li>
                <li>Creating progress reports for HR managers</li>
                <li>Identifying and resolving technical issues</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">Data Sharing</h3>
              <p className="text-muted-foreground mb-2">We only share data in the following cases:</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>With service partners (e.g., Supabase) to provide the service</li>
                <li>When legally required</li>
                <li>With the user's explicit consent</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">Data Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                Data is securely stored with encryption on Supabase infrastructure. Access is strictly controlled.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">Your Rights</h3>
              <p className="text-muted-foreground mb-2">Users have the right to:</p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Be informed</li>
                <li>Request access to their data</li>
                <li>Request correction of data</li>
                <li>Request deletion (right to be forgotten)</li>
                <li>Object to data processing</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">Cookies</h3>
              <p className="text-muted-foreground leading-relaxed">
                The platform uses cookies solely for session management and user experience. No third-party tracking cookies are used.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-3">Changes to This Policy</h3>
              <p className="text-muted-foreground leading-relaxed">
                This policy may be updated periodically. Updates are effective once published.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyModal;
