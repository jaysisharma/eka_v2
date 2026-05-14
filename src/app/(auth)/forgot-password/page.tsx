"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { ForgotPasswordForm } from "../../../components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthWrapper
      title="Recover Access"
      subtitle="Enter your email to receive recovery instructions."
      visualType="login"
    >
      <ForgotPasswordForm />
    </AuthWrapper>
  );
}
