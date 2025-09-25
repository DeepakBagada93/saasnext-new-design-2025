import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  PlusCircle,
  User,
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
  { href: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/client/projects", label: "Projects", icon: Briefcase },
  { href: "/client/requests/new", label: "New Request", icon: PlusCircle },
  { href: "/client/invoices", label: "Invoices", icon: FileText },
  { href: "/client/profile", label: "Profile", icon: User },
];

export default function ClientSidebar() {
  return (
    <Sidebar className="border-r">
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
