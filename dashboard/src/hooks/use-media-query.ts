import { Extra2LargeScreen, ExtraLargeScreen, LargeScreen, MediumScreen, SmallScreen } from "@/constants/screen"
import { useMediaQuery } from "@react-hook/media-query"

export const useMediaQuerySize = () => {
    const isExtraLarge2Screen = useMediaQuery(Extra2LargeScreen)
    const isExtraLargeScreen = useMediaQuery(ExtraLargeScreen)
    const isLargeScreen = useMediaQuery(LargeScreen)
    const isMediumScreen = useMediaQuery(MediumScreen)
    const isSmallScreen = useMediaQuery(SmallScreen)
    return {
        isExtraLarge2Screen,
        isExtraLargeScreen,
        isLargeScreen,
        isMediumScreen,
        isSmallScreen
    }
}