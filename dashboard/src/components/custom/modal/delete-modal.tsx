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

export function DeleteModal({ isOpen, onClose, onConfirmDelete }: { isOpen: boolean, onClose: () => void, onConfirmDelete: () => void }) {
    const { languageData } = useLanguage()

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{languageData.DeleteRecord.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {languageData.DeleteRecord.description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>{languageData.DeleteRecord.cancel}</AlertDialogCancel>
                    <AlertDialogAction className="" onClick={onConfirmDelete}>{languageData.DeleteRecord.confirm}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
