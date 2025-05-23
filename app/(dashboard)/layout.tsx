import React from "react";

import { DashboardSidebar } from "@/components/dashboard/sidebar/app-sidebar";
import ProfileAvatar from "@/components/shared/ProfileAvatar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <div className="relative">
          <div className="sticky flex items-center justify-between px-6 py-4">
            <SidebarTrigger />
            <div className="flex items-center justify-between gap-x-4">
              <ProfileAvatar />
            </div>
          </div>
        </div>
        <section className="flex w-full flex-1 flex-col items-center justify-center px-6 pb-6 pt-16 max-md:pb-14 sm:px-14">
          <div className="mx-auto  w-full max-w-7xl">{children}</div>
        </section>
      </main>
    </SidebarProvider>
  );
};
export default DashboardLayout;
