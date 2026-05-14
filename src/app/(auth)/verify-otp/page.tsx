"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { OtpForm } from "@/components/auth/otp-form";

export default function VerifyOtpPage() {
  return (
    <AuthWrapper 
      title="Verify Identity" 
      subtitle="Enter the 6-digit verification protocol sent to your email."
      visualType="login"
    >
      <OtpForm />
    </AuthWrapper>
  );
}
