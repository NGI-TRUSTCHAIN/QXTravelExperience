import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { useLanguage } from '@/hooks/use-language'
import { useModal } from '@/hooks/use-modal'
import { useChangeEmail } from '@/hooks/use-user'
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeftIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import ChangeEmailForm from '../form/change-email-form'



const ChangeEmailModal: React.FC = () => {
    const { languageData } = useLanguage();
    const { changeEmail } = useModal();
    const { loading, postChangeUserEmail, detail } = useChangeEmail()

    const changeEmailFormSchema = z.object({
        new_email: z.string().email({
            message: languageData.CreateIdLabels.error.form
        })
    })

    const changeEmailForm = useForm<z.infer<typeof changeEmailFormSchema>>({
        resolver: zodResolver(changeEmailFormSchema),
        defaultValues: {
            new_email: ''
        }
    })

    async function onSubmitChangeEmail(data: z.infer<typeof changeEmailFormSchema>) {
        await postChangeUserEmail({ body: data })
        if (!loading) {
            if(detail?.detail !== null && detail?.detail !== undefined) {
                toast({ title: detail.detail, variant: 'default' })
                handleCloseModal();
            }
            else {
                toast({title: languageData.ToastAlertLabels.changeEmail.error, variant: 'destructive'})
            }
        }
    }

    const handleCloseModal = () => {
        changeEmail.onClose();
    }

    //TODO: SEE ACTION ON SUBMIT
    return (
        <Dialog open={changeEmail.isOpen}>
            <DialogContent
                hasClose={false}
                className="max-w-xl h-full sm:h-fit bg-slate-200 gap-0">
                <DialogHeader >
                    <button onClick={handleCloseModal} className='rounded-full bg-white w-8 h-8 '>
                        <ChevronLeftIcon size={28} className='text-gray-800 text-xl' />
                    </button>

                    <div className='flex flex-col items-center gap-10 py-6'>
                        <DialogTitle className='text-3xl font-bold text-center'>
                            {languageData.CreateIdLabels.resetEmail.title}
                        </DialogTitle>

                        <DialogDescription className=' text-luckyBlue'>
                            {
                                languageData.CreateIdLabels.resetEmail.description
                            }
                        </DialogDescription>
                    </div>

                </DialogHeader>

                <ChangeEmailForm
                    changeEmailForm={changeEmailForm}
                    onSubmitChangeEmail={onSubmitChangeEmail}
                    languageData={languageData}
                />
            </DialogContent>
        </Dialog>
    )
}

export default ChangeEmailModal