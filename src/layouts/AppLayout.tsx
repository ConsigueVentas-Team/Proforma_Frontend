import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/toaster";
import { UserDropdownMenu } from "@/components/UserDropdownMenu";
import { LogoIcon } from "@/components/icons/icons";
import UserNotification from "@/components/UserNotification";

import { Breadcrumb } from "@/components/Breadcrumb";

function AppLayout() {

  return (
    <div className="w-full h-screen flex flex-col ">
      <div className="bg-background h-[4.5rem] relative border-b-2 z-50">
        <div className="h-full flex items-center justify-end p-6 gap-16 ">
          <div className={`flex gap-16 justify-between w-full items-center`}>
            <div className="flex gap-8">
              <Link to="/" className="flex items-center gap-4">
                <LogoIcon className="w-[3rem] h-16" />
              </Link>
              <Breadcrumb />
            </div>

            <div className="flex gap-16">
              <UserNotification />
              <UserDropdownMenu />
            </div>
          </div>
        </div>
      </div>
      <div className={`relative px-8 lg:px-20 xl:px-60`}>
        <Outlet />
      </div>
      <Toaster />
      <TailwindIndicator />
    </div>
  );
}

export default AppLayout;
