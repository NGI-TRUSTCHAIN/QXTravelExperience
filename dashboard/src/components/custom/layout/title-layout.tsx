// import { ModeToggle } from "@/components/ui/mode-toggle";
// import { NavbarActions } from "../navbar/navbar-actions";

export default function TitleLayout({ title, subTitle }: { title: string, subTitle: string }) {
  return (
    <div className="z-10 sm:grid md:flex flex-row items-center justify-between pr-16 md:pr-4 overflow-hidden whitespace-nowrap text-ellipsis">
      <h1 className="text-lg md:text-xl lg:text-2xl flex flex-col md:flex-row md:gap-2 font-semibold overflow-hidden whitespace-nowrap text-ellipsis uppercase ">
        {title}
        {subTitle ?
          <>
            <span className="hidden md:block">/</span>
            <span className="text-maroonPink">{subTitle}</span>
          </>
          : null}
      </h1>
      {/* <ModeToggle /> */}
      {/* <NavbarActions /> */}
    </div>
  )
}