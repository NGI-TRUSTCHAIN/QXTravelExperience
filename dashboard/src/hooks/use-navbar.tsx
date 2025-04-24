import { routes } from "../constants/routes"
import { useLanguage } from '@/hooks/use-language'
import { AppSidebarEnum, IAppSidebarProps, TitleI } from '@/interface/navbar'
import { UsersIcon, WalletIcon } from 'lucide-react'
import * as React from "react"
import { useLocation } from 'react-router-dom'
import { create } from "zustand"

 const useTitle = create<TitleI>((set) => ({
    title: null,
    setTitle: (title) => set({ title }),
    resetTitle: () => set({ title: null }),
    subTitle: null,
    setSubTitle: (subTitle) => set({ subTitle }),
    resetSubTitle: () => set({ subTitle: null }),
}));

 const useNavbar = () => {
    const { pathname } = useLocation()
    const { languageData, language } = useLanguage()
    const languageRef = React.useRef(language)
    const [appSideBarList, setAppSideBarList] = React.useState<IAppSidebarProps[]>([
        {
            title: languageData.SideNavbarLabels.tokens.title,
            label: languageData.SideNavbarLabels.tokens.label,
            link: routes.tokens.base,
            icon: <WalletIcon className="h-4 w-4" />,
            active: false,
            disabled: false,
            requireAdmin: false,
            key: AppSidebarEnum.tokens,
        },
        {
            title: languageData.SideNavbarLabels.customers.title,
            label: languageData.SideNavbarLabels.customers.label,
            link: routes.customers.base,
            icon: <UsersIcon className="h-4 w-4" />,
            active: false,
            disabled: false,
            requireAdmin: false,
            key: AppSidebarEnum.customers,
        }
    ])

    const activeTitle = React.useMemo(() => appSideBarList.find((item) => item.active)?.title ?? "", [appSideBarList])

    const updateAppSideBarList = React.useCallback(() => {
        if (languageRef.current !== language) {
            setAppSideBarList((prevList) =>
                prevList.map((item) => {
                    const labelData = languageData.SideNavbarLabels[item.key as keyof typeof languageData.SideNavbarLabels];
                    if (labelData) {
                        return {
                            ...item,
                            title: labelData.title,
                            label: labelData.label,
                        };
                    }
                    return item;
                })
            )
            languageRef.current = language
        }
        setAppSideBarList((prevList) =>
            prevList.map((item) => ({
                ...item,
                active: pathname.startsWith(item.link)
            }))
        )
    }, [pathname, setAppSideBarList, language, languageData])

    // Call updateAppSideBarList when pathname changes
    React.useEffect(() => {
        updateAppSideBarList()
    }, [pathname, updateAppSideBarList])

    return { appSideBarList, setAppSideBarList, activeTitle, updateAppSideBarList }
}

export { useNavbar, useTitle }