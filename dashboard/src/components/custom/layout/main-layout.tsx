import { AppSidebar } from "@/components/ui/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar"
import TitleActionLayout from "./title-action-layout"
// import { Separator } from "@/components/ui/separator"

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 h-16 shrink-0 bg-sidebar items-center gap-2 border-b px-4 z-50">
          <SidebarTrigger className="-ml-1 md:hidden" />
          {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
          <TitleActionLayout />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout
