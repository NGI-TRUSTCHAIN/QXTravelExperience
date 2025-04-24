import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { LanguageToggle } from "@/components/ui/language-toggle";
import Logout from "@/components/ui/logout";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useTitle } from "@/hooks/use-navbar";


export default function TitleActionLayout() {
  const { title, subTitle } = useTitle();

  return (
    <div className="flex justify-between items-center w-full">
      <Breadcrumb className="z-50">
        <BreadcrumbList className="flex items-center justify-center">
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbPage>
              <BreadcrumbLink className="text-xl font-semibold">{title}</BreadcrumbLink>
            </BreadcrumbPage>
          </BreadcrumbItem>
          {subTitle && (
            <>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem className="">
                <BreadcrumbPage className="text-xl font-semibold text-maroonPink">{subTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
      {/* <NavbarActions /> */}
      <div className="flex gap-4">
        <LanguageToggle />
        <ModeToggle />
        <Logout />
      </div>
    </div>
  );
}