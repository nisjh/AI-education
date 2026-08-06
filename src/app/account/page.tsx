import type { Metadata } from "next";

import { AccountPageHeader, AccountView } from "@/components/auth/account-view";

export const metadata: Metadata = {
  title: "Your account",
  description: "Your details and everything saved against this account.",
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      <AccountPageHeader />
      <div className="mt-10">
        <AccountView />
      </div>
    </div>
  );
}
