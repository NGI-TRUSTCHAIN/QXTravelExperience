import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { usePostDID } from '@/hooks/use-blockchain'
import { useModal } from '@/hooks/use-modal'
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeftIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import CreateDIDForm from '../form/create-did-form'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/use-language'

const CreateDIDModal: React.FC = () => {
    const { languageData } = useLanguage();
    const { createDID, } = useModal();
    const { loading, postDID } = usePostDID();

    const createDIDFormSchema = z.object({
        name: z.string().min(3, {
            message: "DID name must be at least 3 characters long"
        }),
        did: z.string().min(1, {
            message: "DID value is required"
        })
    });

    const createDIDForm = useForm<z.infer<typeof createDIDFormSchema>>({
        resolver: zodResolver(createDIDFormSchema),
        defaultValues: {
            name: '',
            did: ''
        }
    });

    async function onSubmitCreateDID(data: z.infer<typeof createDIDFormSchema>) {
        const response = await postDID({
            name: data.name,
            did: data.did
        });

        if (!loading) {
            if (response) {
                toast({ title: "DID created successfully", variant: 'default' });
                handleCloseModal();
            } else {
                toast({ title: "Failed to create DID", variant: 'destructive' });
            }
        }
    }

    const handleCloseModal = () => {
        createDID.onClose();
        createDIDForm.reset();
        createDIDForm.clearErrors();
    }

    const handleOpenModal = () => {
        createDID.onOpen();
    }

    return (
        <Dialog open={createDID.isOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={handleOpenModal}
                    variant="default"
                    className='w-52 text-lg rounded-3xl mx-auto mt-10 mb-6'>
                    {languageData.DIDLabels.modal.action.toLocaleUpperCase()}
                </Button>
            </DialogTrigger>
            <DialogContent
                hasClose={false}
                className="max-w-xl h-full sm:h-fit bg-slate-200 gap-0">
                <DialogHeader>
                    <button onClick={handleCloseModal} className='rounded-full bg-white w-8 h-8'>
                        <ChevronLeftIcon size={28} className='text-gray-800 text-xl' />
                    </button>

                    <div className='flex flex-col items-center gap-10 py-6'>
                        <DialogTitle className='text-3xl font-bold text-center'>
                            {languageData.DIDLabels.modal.title}
                        </DialogTitle>

                        <DialogDescription className='text-luckyBlue'>
                            {languageData.DIDLabels.modal.description}
                        </DialogDescription>
                    </div>
                </DialogHeader>

                <CreateDIDForm
                    createDIDForm={createDIDForm}
                    onSubmitCreateDID={onSubmitCreateDID}
                    languageData={languageData}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreateDIDModal
