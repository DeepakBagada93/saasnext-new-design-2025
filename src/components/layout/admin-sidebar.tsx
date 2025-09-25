import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  BarChart2,
  Bell,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/admin/clients", label: "Client Management", icon: Users },
  { href: "/admin/requests", label: "Service Requests", icon: Bell },
  { href: "/admin/projects", label: "Project Management", icon: Briefcase },
  { href: "/admin/invoices", label: "Invoice Management", icon: FileText },
];

export default function AdminSidebar() {
  return (
    <Sidebar className="border-r bg-card">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/" className="w-full">
                <SidebarMenuButton
                variant="ghost"
                className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
