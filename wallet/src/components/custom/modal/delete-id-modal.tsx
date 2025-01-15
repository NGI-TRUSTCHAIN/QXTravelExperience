import { useLanguage } from '@/hooks/use-language'
import { useModal } from '@/hooks/use-modal'
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { Button } from '../../ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '../../ui/dialog'
import DeleteIdForm from '../form/delete-id-form'
import { deleteUserAccount } from '@/services/user'
import { toast } from '@/components/ui/use-toast'
import { useAuthStore } from '@/hooks/use-auth'

const DeleteIdModal: React.FC = () => {

    const { languageData } = useLanguage();
    const { deleteId: {
        isOpen,
        onOpen,
        onClose,
    } } = useModal()

    const { clearTokens, setIsAuthenticated } = useAuthStore()

    // const [onDeleteIdForm, setOnDeleteIdForm] = React.useState<boolean>(false);
    // const [onDonateFundsForm, setOnDonateFundsForm] = React.useState<boolean>(false);


    const deleteIdFormSchema = z.object({
        delete: z.boolean().default(false)
    })

    // const donateFundsSchema = z.object({
    //     type: z.enum([donateFundsTypes.network, donateFundsTypes.charity],
    //         {
    //             required_error: "You need to select a donation type.",
    //         }
    //     ),
    // })

    const deleteIdForm = useForm<z.infer<typeof deleteIdFormSchema>>({
        resolver: zodResolver(deleteIdFormSchema),
    })

    // const donateFundsForm = useForm<z.infer<typeof donateFundsSchema>>({
    //     resolver: zodResolver(donateFundsSchema),
    // })

    async function onSubmitDeleteId(data: z.infer<typeof deleteIdFormSchema>) {
        // if (data.delete && onDeleteIdForm) {
        //     setOnDeleteIdForm(false);
        //     setOnDonateFundsForm(true);
        // }
        if (data.delete) {
            const { detail } = await deleteUserAccount()
            if (detail) {
                toast({ title: detail, variant: 'destructive' })
                clearTokens();
                setIsAuthenticated(false);
                handleCloseModal();
            }
            else {
                toast({
                    title: languageData.ToastAlertLabels.deleteId.error,
                    variant: 'destructive'
                })
            }
        }
    }

    // async function onSubmitDonateFunds(data: z.infer<typeof donateFundsSchema>) {
    //     handleCloseModal();
    // }

    const handleOpenModal = () => {
        onOpen()
        // setOnDeleteIdForm(true);
    }

    const handleResetState = () => {
        // setOnDeleteIdForm(false);
        // setOnDonateFundsForm(false);
        deleteIdForm.reset({ delete: false });
        // donateFundsForm.reset({ type: undefined });
    }

    const handleCloseModal = () => {
        onClose();
        handleResetState();
    }


    return (
        <Dialog open={isOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={handleOpenModal}
                    variant="default"
                    className='w-52 text-lg rounded-3xl mx-auto mt-10 mb-6'>
                    {languageData.PolicyLabels.action.toLocaleUpperCase()}
                </Button>
            </DialogTrigger>
            <DialogContent
                hasClose={true}
                onClose={handleCloseModal}
                className="rounded-2xl mx-auto max-w-xs min-h-max bg-slate-200">
                <DialogHeader>
                    <div className='flex flex-col items-center gap-10 py-6'>
                        <DialogTitle className='text-3xl font-bold text-center'>
                            {/* {onDeleteIdForm && !onDonateFundsForm ?
                                languageData.PolicyLabels.modal.delete.title :
                                languageData.PolicyLabels.modal.funds.title
                                } */}
                            {languageData.PolicyLabels.modal.delete.title}
                        </DialogTitle>

                        <DialogDescription className='text-black font-bold'>
                            {/* {onDeleteIdForm && !onDonateFundsForm ?
                                languageData.PolicyLabels.modal.delete.description :
                                languageData.PolicyLabels.modal.funds.description
                                } */}
                            {languageData.PolicyLabels.modal.delete.description}
                        </DialogDescription>
                    </div>

                </DialogHeader>
                <DeleteIdForm
                    deleteIdForm={deleteIdForm}
                    onSubmitDeleteId={onSubmitDeleteId}
                    languageData={languageData} />

                {/* {onDeleteIdForm && !onDonateFundsForm ?
                    <DeleteIdForm
                        deleteIdForm={deleteIdForm}
                        onSubmitDeleteId={onSubmitDeleteId}
                        languageData={languageData}
                    />
                    :
                    <DonateFundsForm
                        donateFundsForm={donateFundsForm}
                        onSubmitDonateFunds={onSubmitDonateFunds}
                        languageData={languageData}
                    />
                } */}
            </DialogContent>
        </Dialog>
    )
}

export default DeleteIdModal