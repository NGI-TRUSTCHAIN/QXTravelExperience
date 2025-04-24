import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils"

type StatusEnum = {
    label: string
    value: string
}

export function StatusModal({ isOpen, onClose, onHandleAction, statusEnum }: { isOpen: boolean, onClose: () => void, onHandleAction: (status: string) => void, statusEnum: StatusEnum[] }) {
    const { languageData } = useLanguage()

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{languageData.StatusModalLabels.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {languageData.StatusModalLabels.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="min-w-20" onClick={onClose}>{languageData.StatusModalLabels.cancel}</AlertDialogCancel>
                    {statusEnum.map((status, index) => (
                        <AlertDialogAction
                            key={index}
                            className={cn(
                                status.value === "denied" ?
                                    "bg-destructive text-destructive-foreground hover:bg-destructive/80" :
                                status.value === "approved" ?
                                    "bg-forestGreen text-white hover:bg-forestGreen-darker" :
                                "",
                                "min-w-20"
                            )}
                            onClick={() => onHandleAction(status.value)}>
                            {status.label}
                        </AlertDialogAction>
                    ))}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
