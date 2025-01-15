import { NavbarActionProps } from "@/interface/navbar";
import { LayoutListIcon, LockIcon, UserIcon } from 'lucide-react';
import { routes } from "./routes";

export const navbarActions: NavbarActionProps[] = [
    {
        route: routes.home,
        icon: <LayoutListIcon size={24} />,
    },
    {
        route: routes.profile,
        icon: <UserIcon size={24} />,
    },
    {
        route: routes.preferences,
        icon: <LockIcon size={24} />,
    },
];
