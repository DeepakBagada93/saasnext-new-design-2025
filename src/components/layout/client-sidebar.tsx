'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  PlusCircle,
  User,
  LogOut,
  CalendarClock,
  Bell,
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
import { useAuth, useUser } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";

const menuItems = [
  { href: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/client/projects", label: "Projects", icon: Briefcase },
  { href: "/client/requests", label: "My Requests", icon: Bell },
  { href: "/client/requests/new", label: "New Request", icon: PlusCircle },
  { href: "/client/invoices", label: "Invoices", icon: FileText },
  { href: "/client/schedule-meeting", label: "Schedule Meeting", icon: CalendarClock },
  { href: "/client/profile", label: "Profile", icon: User },
];

export default function ClientSidebar() {
  const auth = useAuth();
  const { user, loading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/');
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Logout Failed",
        description: error.message,
      });
    }
  };

  return (
    <Sidebar>
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
      <SidebarFooter>
         <div className="p-2">
            {loading ? (
                <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                </div>
            ) : user && (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL || ''} alt={user.displayName || user.email || ''} />
                        <AvatarFallback>{(user.displayName || 'C').charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 truncate">
                        <p className="text-sm font-medium truncate">{user.displayName || user.email}</p>
                    </div>
                </div>
            )}
        </div>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
            variant="ghost"
            className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
            >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
