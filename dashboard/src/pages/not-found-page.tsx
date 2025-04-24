import { Button } from "@/components/ui/button"
import { routes } from "@/constants/routes"
import { useNavigate } from "react-router-dom"

const NotFoundPage = () => {
    const navigate = useNavigate()
    const handleNavigation = () => {
        navigate(routes.tokens.base)
    }
    return (
        <div className="flex flex-col items-center justify-center gap-4 h-[calc(100vh-4rem)]">
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
            <Button
                variant="default"
                className="min-w-36"
                onClick={handleNavigation}
            >
                Go Home
            </Button>
        </div>
    )
}

export default NotFoundPage