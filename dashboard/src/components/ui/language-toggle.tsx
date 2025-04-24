import { CheckIcon, Languages } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/hooks/use-language"
import { ILanguageOptions, LanguageEnum } from "@/interface/language"
import { GB } from 'country-flag-icons/react/3x2'

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage()

    const languageOptions: ILanguageOptions[] = [
        {
            value: LanguageEnum.EN,
            label: "English",
            icon: <GB className="h-5 w-5" />,
            disabled: false,
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="border-border">
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languageOptions.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        disabled={option.disabled}
                        onClick={() => setLanguage(option.value)}>
                        <div className="flex items-center">
                            {language === option.value ? (
                                <CheckIcon className="h-4 w-4 mr-2 text-primary" />
                            ) : <span className="h-4 w-4 mr-2"></span>}
                            <div className="flex gap-2">
                                <span>{option.label}</span>
                                <span>
                                    {option.icon}
                                </span>
                            </div>
                        </div>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
