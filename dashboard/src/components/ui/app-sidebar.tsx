import QXLogo from '@/assets/images/QX_Logo.png'
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from "@/components/ui/sidebar"
import { useNavbar, useTitle } from "../../hooks/use-navbar"
import * as React from "react"
import { Link } from 'react-router-dom'
import { Separator } from "./separator"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { setTitle, resetTitle } = useTitle()
    const { appSideBarList, activeTitle, updateAppSideBarList } = useNavbar()

    React.useEffect(() => {
        updateAppSideBarList()
    }, [updateAppSideBarList])

    React.useEffect(() => {
        if (activeTitle) {
            setTitle(activeTitle)
        }
        return () => {
            resetTitle()
        }
    }, [activeTitle, setTitle, resetTitle])

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className="flex items-center justify-center py-4 pr-4">
                    <img src={QXLogo} alt="QX Logo" className="w-40" />
                </div>
            </SidebarHeader>
            <Separator className="bg-border mb-4" />
            <SidebarContent>
                <SidebarMenu>
                    {appSideBarList && appSideBarList.length > 0 ? (
                        appSideBarList.map((item) => {
                            return (
                                <SidebarMenuItem key={item.link}>
                                    <SidebarMenuButton asChild isActive={item.active} size="lg">
                                        <Link to={item.link}>
                                            <span>
                                                {item.icon}
                                            </span>
                                            <span>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })
                    ) : (
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg">
                                <span>No items available</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )}
                </SidebarMenu>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
