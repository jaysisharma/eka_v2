"use client";

import { AuthWrapper } from "../../../components/auth/auth-wrapper";
import { LoginForm } from "../../../components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthWrapper 
      title="Login" 
      subtitle="Sign in to your account."
      visualType="login"
    >
      <LoginForm />
    </AuthWrapper>
  );
}
