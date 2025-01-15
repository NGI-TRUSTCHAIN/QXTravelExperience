import MediolanumImage from '@/assets/images/mediolanum-image.png'
import MediolanumLogo from '@/assets/images/mediolanum-logo.png'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { useLanguage } from '@/hooks/use-language'
import { sendOtp } from '@/services/user'
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import CreateIdForm from '../form/create-id-form'


const CreateIdModal: React.FC = () => {
    const { languageData } = useLanguage();
    const [hasSubmitted, setHasSubmitted] = React.useState<boolean>(false)

    const createIdFormSchema = z.object({
        email: z.string().email({
            message: languageData.CreateIdMediolanumLabels.error.email
        })
    })

    const createIdForm = useForm<z.infer<typeof createIdFormSchema>>({
        resolver: zodResolver(createIdFormSchema),
        defaultValues: {
            email: ''
        }
    })

    async function onSubmitCreateId(data: z.infer<typeof createIdFormSchema>) {
        if (data.email && !hasSubmitted) {
            const {detail} = await sendOtp({ body: data })

            if(detail) {
                setHasSubmitted(true)
            }
        }
    }

    return (
        <Dialog open>
            {/* <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
            </DialogTrigger> */}
            <DialogContent
                hasClose={false}
                className="max-w-xl h-full sm:h-fit bg-anakiwaSailBlueGradient gap-0">
                {/* <DialogContent className="max-w-xl h-full sm:h-fit bg-gradient-to-b from-blue-300"> */}
                <DialogHeader>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <img className='w-32' src={MediolanumLogo} />
                        <DialogTitle className='text-4xl text-luckyBlue'>
                            {!hasSubmitted ?
                                languageData.CreateIdMediolanumLabels.title.id :
                                languageData.CreateIdMediolanumLabels.title.email
                            }
                        </DialogTitle>
                    </div>
                    <div className='pt-2 flex flex-col gap-4 justify-center items-center'>
                        <DialogDescription className='text-luckyBlue'>
                            {!hasSubmitted ?
                                languageData.CreateIdMediolanumLabels.description.id :
                                languageData.CreateIdMediolanumLabels.description.email
                                    .replace(languageData.CreateIdMediolanumLabels.label.input, createIdForm.getValues().email)
                            }
                        </DialogDescription>
                        <img className='w-64' src={MediolanumImage} />
                    </div>
                </DialogHeader>

                <CreateIdForm
                    createIdForm={createIdForm}
                    onSubmitCreateId={onSubmitCreateId}
                    languageData={languageData}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreateIdModal