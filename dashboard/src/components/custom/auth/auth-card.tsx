import LoginForm from "@/components/custom/form/login-form"
import { AuthCardSkeleton } from "@/components/custom/layout/skeletons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthCardFormTypeEnum } from "@/constants/form"
import { usePostLogin } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"
import React from "react"

const AuthCard: React.FC = () => {
    const { languageData } = useLanguage()
    const [authCardFormType, setAuthCardFormType] = React.useState<AuthCardFormTypeEnum>(AuthCardFormTypeEnum.login)
    const { loading } = usePostLogin()

    const handleAuthCardFormTypeChange = (type: AuthCardFormTypeEnum) => {
        setAuthCardFormType(type)
    }

    const AuthCardTitle = () => {
        switch (authCardFormType) {
            case AuthCardFormTypeEnum.login:
                return languageData.LoginLabels.signIn
            // case AuthCardFormTypeEnum.register:
            //     return languageData.LoginLabels.register
            default:
                return languageData.LoginLabels.signIn
        }
    }

    const AuthCardForm: React.FC = () => {
        switch (authCardFormType) {

            case AuthCardFormTypeEnum.login:
                return (
                    <LoginForm
                        authCardFormType={authCardFormType}
                        handleAuthCardFormTypeChange={handleAuthCardFormTypeChange}
                    />
                )
            // case AuthCardFormTypeEnum.register:
            //     return (
            //         <RegisterForm
            //             authCardFormType={authCardFormType}
            //             handleAuthCardFormTypeChange={handleAuthCardFormTypeChange}
            //         />
            //     )
            default:
                return (
                    <LoginForm
                        authCardFormType={authCardFormType}
                        handleAuthCardFormTypeChange={handleAuthCardFormTypeChange}
                    />
                )
        }
    }

    return (
        <>
            {
                loading ?
                    <AuthCardSkeleton /> :
                    <Card className="w-full max-w-96 mx-4">
                        <CardHeader>
                            <CardTitle className="text-2xl text-center">
                                <AuthCardTitle />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AuthCardForm />
                        </CardContent>
                    </Card>
            }
        </>
    )
}

export default AuthCard;