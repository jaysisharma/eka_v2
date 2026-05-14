"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthWrapper 
      title="Reset Protocol" 
      subtitle="Establish a new security credential for your identity."
      visualType="login"
    >
      <ResetPasswordForm />
    </AuthWrapper>
  );
}
