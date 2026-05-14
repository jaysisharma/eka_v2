"use client";

import { AuthWrapper } from "@/components/auth/auth-wrapper";
import { AdminLoginForm } from "@/components/auth/admin-login-form";

export default function AdminLoginPage() {
  return (
    <AuthWrapper 
      title="Admin Portal" 
      subtitle="Authorized access only."
      slogan="Mission Control."
      visualType="login"
    >
      <AdminLoginForm />
    </AuthWrapper>
  );
}
