"use client";

import { AuthWrapper } from "../../../components/auth/auth-wrapper";
import { SignupForm } from "../../../components/auth/signup-form";

export default function SignupPage() {
  console.log("SIGNUP_PAGE: Rendering");
  return (
    <AuthWrapper
      title="Create Identity"
      subtitle="Join the planetary research intelligence network."
      visualType="signup"
    >
      <SignupForm />
    </AuthWrapper>
  );
}
