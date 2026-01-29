"use client"

import * as React from "react"
import {
  BarChart,
  BookOpen,
  Calendar,
  Clock,
  GalleryVerticalEnd,
  Heart,
  Home,
  LayoutDashboard,
  Search,
  ShoppingCart,
  Star,
  User,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useUser } from "@/context/UserContext"

// This is sample data.
const data = {
  user: {
    name: "Arfan Ahmed",
    email: "arfan@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams:
  {
    name: "TasteTrail",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  }
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser()

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const navUser = [
    {
      title: "Dashboard",
      url: "/user",
      icon: Home
    },
    {
      title: "Recipes",
      url: "/user/recipes",
      icon: Search
    },
    {
      title: "My Cookbook",
      url: "/user/cookbook",
      icon: Heart
    },
    {
      title: "Meal Planner",
      url: "/user/meal-planner",
      icon: Calendar
    },
    {
      title: "Cooking History",
      url: "/user/cooking-history",
      icon: Clock
    },
    {
      title: "Grocery List",
      url: "/user/grocery-list",
      icon: ShoppingCart
    },
    {
      title: "Analytics",
      url: "/user/analytics",
      icon: BarChart
    },
    {
      title: "Profile",
      url: "/user/profile",
      icon: User
    }
  ]

  const navAdmin = [
    {
      title: "Overview",
      url: "/admin",
      icon: LayoutDashboard
    },
    {
      title: "Manage Categories",
      url: "/admin/manage-category",
      icon: BookOpen
    },
    {
      title: "Manage Cuisines",
      url: "/admin/manage-cuisine",
      icon: GalleryVerticalEnd
    },
    {
      title: "Manage Recipes",
      url: "/admin/manage-recipe",
      icon: BookOpen
    },
    {
      title: "Reviews",
      url: "/admin/reviews",
      icon: Star
    }
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={user?.user?.role === "admin" ? navAdmin : navUser} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
