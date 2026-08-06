import { Suspense } from "react";
import type { Metadata } from "next";

import { AuthForm } from "@/components/auth/auth-form";
import { AuthPageFrame, AuthFormSkeleton } from "@/components/auth/auth-page-frame";

export const metadata: Metadata = {
  title: "Log in",
  description:
    "Log in to keep your saved resources, template drafts, and generation history.",
};

export default function LogInPage() {
  return (
    <AuthPageFrame>
      <Suspense fallback={<AuthFormSkeleton />}>
        <AuthForm mode="log-in" />
      </Suspense>
    </AuthPageFrame>
  );
}
