import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { useAuthStore } from '@/hooks/use-auth'
import { useLanguage } from '@/hooks/use-language'
import { CreateIdSteps } from '@/interface/modal'
import { cn } from '@/lib/utils'
import { sendOtp } from '@/services/user'
import { zodResolver } from "@hookform/resolvers/zod"
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import CreateIdForm from '../form/create-id-form'


const CreateIdModal: React.FC = () => {
    const { languageData } = useLanguage();
    const { isAuthenticated, authToken } = useAuthStore()
    const [step, setStep] = React.useState<CreateIdSteps>(CreateIdSteps.start)

    const createIdFormSchema = z.object({
        email: z.string().email({
            message: languageData.CreateIdLabels.error.form
        })
    })

    const createIdForm = useForm<z.infer<typeof createIdFormSchema>>({
        resolver: zodResolver(createIdFormSchema),
        defaultValues: {
            email: ''
        }
    })

    async function onSubmitCreateId(data: z.infer<typeof createIdFormSchema>) {
        if (data.email) {
            const { detail } = await sendOtp({ body: data })

            if (detail) {
                handleNextStep();
            }
        }
    }

    const ButtonLabel = () => {
        const labelMap = {
            [CreateIdSteps.start]: languageData.CreateIdLabels.button.start,
            [CreateIdSteps.information]: languageData.CreateIdLabels.button.information,
            [CreateIdSteps.form]: languageData.CreateIdLabels.button.form,
            [CreateIdSteps.success]: languageData.CreateIdLabels.button.success,
        };

        return (labelMap[step]).toUpperCase();
    };

    const DialogTitleLabel = () => {
        const titleMap = {
            [CreateIdSteps.start]: languageData.CreateIdLabels.title.start,
            [CreateIdSteps.information]: languageData.CreateIdLabels.title.information,
            [CreateIdSteps.form]: languageData.CreateIdLabels.title.form,
            [CreateIdSteps.success]: languageData.CreateIdLabels.title.success,
        };
        return titleMap[step]
    }

    const DialogDescriptionLabel = () => {
        const descriptionMap = {
            [CreateIdSteps.start]: languageData.CreateIdLabels.description.start,
            [CreateIdSteps.information]: languageData.CreateIdLabels.description.information,
            [CreateIdSteps.form]: languageData.CreateIdLabels.description.form,
            [CreateIdSteps.success]: languageData.CreateIdLabels.description.success.verification.replace(languageData.CreateIdLabels.label.placeholder, createIdForm.getValues().email),
        };
        return descriptionMap[step];
    }

    function handleNextStep() {
        switch (step) {
            case CreateIdSteps.start:
                setStep(CreateIdSteps.form);
                break;
            // case CreateIdSteps.information:
            //     setStep(CreateIdSteps.form);
            //     break;
            case CreateIdSteps.form:
                setStep(CreateIdSteps.success);
                break;
            case CreateIdSteps.success:
                return;
            default: return;
        }
    }

    return (
        <Dialog open={!isAuthenticated && !authToken}>
            <DialogContent
                hasClose={false}
                className={`max-w-xl h-full sm:h-fit min-h-screen gap-0 bg-[url('./assets/images/landing.png')] bg-no-repeat bg-cover bg-center md:min-h-fit md:h-[96vh]`}>
                <div className={cn('flex flex-col gap-4 w-full pt-6 justify-between')}>

                    <DialogHeader className='flex flex-col justify-center items-center gap-6'>
                        {/* <img className='w-64' src={QXIDImage} /> */}
                        <DialogTitle className='text-3xl text-secondary'>
                            {/* {languageData.CreateIdLabels.title.start} */}
                            <DialogTitleLabel />
                        </DialogTitle>

                        <DialogDescription className={cn('text-secondary text-md text-center',
                            // step === CreateIdSteps.success ? 'flex flex-col gap-4 text-2xl font-semibold' : ''
                        )}>
                            {/* {
                                step === CreateIdSteps.information ?
                                    languageData.CreateIdLabels.description.information :
                                    null
                            }
                            {step === CreateIdSteps.success ?
                                <>
                                    {languageData.CreateIdLabels.description.success.email}
                                    <span className='text-base'>
                                        {languageData.CreateIdLabels.description.success.verification.replace(languageData.CreateIdLabels.label.placeholder, createIdForm.getValues().email)}
                                    </span>
                                </>

                                :
                                null
                            } */}
                            <DialogDescriptionLabel />
                        </DialogDescription>
                    </DialogHeader>

                    {/* <div className={cn('w-full',
                        step === CreateIdSteps.start ? '' : ' min-h-74'
                    )}> */}


                    {step === CreateIdSteps.form ?
                        <CreateIdForm
                            createIdForm={createIdForm}
                            onSubmitCreateId={onSubmitCreateId}
                            languageData={languageData}
                        /> : null
                    }

                    {/* {step === CreateIdSteps.success ?
                            <div className='flex justify-center items-center mx-auto mt-12'>

                                <img className='w-28 h-28' src={CheckMark} />
                            </div> :
                            null
                        } */}

                    {
                        step !== CreateIdSteps.form ?
                            <DialogFooter
                                className='flex flex-col md:flex-col justify-center items-center mb-2'
                            >
                                <Button
                                    type={'button'}
                                    variant={'oxfordBlue'}
                                    className='w-52 text-lg rounded-3xl'
                                    onClick={handleNextStep}
                                >
                                    {<ButtonLabel />}
                                </Button>
                                {step === CreateIdSteps.success ?
                                    <p className='text-secondary absolute bottom-2'>
                                        {languageData.CreateIdLabels.helper}
                                    </p> :
                                    null
                                }
                            </DialogFooter> :
                            null
                    }

                </div>
            </DialogContent>
        </Dialog>

    )
}

export default CreateIdModal