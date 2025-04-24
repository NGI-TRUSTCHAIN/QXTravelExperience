import { useLogout } from "@/hooks/use-auth";
import { Button } from "./button";
import { LogOutIcon } from "lucide-react";

export default function Logout() {
    const { handleLogout } = useLogout()

    return (
        <Button variant="outline" size="icon" className="border-border" onClick={handleLogout}>
            <LogOutIcon className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Logout</span>
        </Button>
    )
}