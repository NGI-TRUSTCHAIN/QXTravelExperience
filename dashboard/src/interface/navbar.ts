
export enum AppSidebarEnum {
    tokens = "tokens",
    customers = "customers",
}

export interface IAppSidebarProps {
    title: string;
    label: string;
    link: string;
    icon: JSX.Element;
    active: boolean;
    disabled: boolean;
    requireAdmin: boolean;
    key: AppSidebarEnum;
}

export interface TitleI {
    title: string | null;
    setTitle: (title: string) => void;
    resetTitle: () => void;
    subTitle: string | null;
    setSubTitle: (subTitle: string) => void;
    resetSubTitle: () => void;
}