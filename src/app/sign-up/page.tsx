import { Suspense } from "react";
import type { Metadata } from "next";

import { AuthForm } from "@/components/auth/auth-form";
import { AuthPageFrame, AuthFormSkeleton } from "@/components/auth/auth-page-frame";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Create an account to keep bookmarks, template drafts, and generation history. Everything else works without one.",
};

export default function SignUpPage() {
  return (
    <AuthPageFrame>
      <Suspense fallback={<AuthFormSkeleton />}>
        <AuthForm mode="sign-up" />
      </Suspense>
    </AuthPageFrame>
  );
}
