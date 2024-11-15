import {
  Calendar,
  Home,
  Inbox,
  Search,
  Book,
  Users,
  Presentation,
  GraduationCap,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

// Menu items.

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Groups",
    url: "/groups",
    icon: Users,
  },
  {
    title: "Subjects",
    url: "/subjects",
    icon: Book,
  },
  {
    title: "Upcoming classes",
    url: "#",
    icon: GraduationCap,
  },
  {
    title: "Schedule classes",
    url: "#",
    icon: Presentation,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>BloodBank</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
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
    </Sidebar>
  );
}
