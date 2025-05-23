import {
  Users,
  Home,
  LayoutDashboard,
  Layers,
  ListOrdered,
  UserRoundPen,
  Warehouse,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import LogoutButton from "../buttons/LogoutButton";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Admin Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },

  {
    title: "Books",
    url: "/admin/books",
    icon: Layers,
  },
  {
    title: "Authors",
    url: "/admin/authors",
    icon: UserRoundPen,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },

  {
    title: "Publishers",
    url: "/admin/publishers",
    icon: Warehouse,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ListOrdered,
  },
];

export function AdminDashboardSidebar() {
  return (
    <Sidebar side="left" collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <LogoutButton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
