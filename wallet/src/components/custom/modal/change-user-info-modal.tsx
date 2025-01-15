import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { useLanguage } from '@/hooks/use-language'
import { useModal } from '@/hooks/use-modal'
import { usePostUserInfo } from '@/hooks/use-user'
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeftIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import ChangeUserInfoForm from '../form/change-user-info-form'
import { formatDate } from '@/utils/formatDate'
import { toast } from '@/components/ui/use-toast'


const ChangeUserInfoModal: React.FC = () => {
    const { userInfo, postUserInfoData, loading } = usePostUserInfo()
    const { languageData } = useLanguage();
    const { changeUserInfo } = useModal();

    const changeUserInfoFormSchema = z.object({
        first_name: z.string().min(2, {
            message: languageData.ProfileLabels.details.changeUserInfo.firstName.error
        }),
        last_name: z.string().min(2, {
            message: languageData.ProfileLabels.details.changeUserInfo.lastName.error
        }),
        // profile_picture: z.instanceof(File).refine((file) => file.size < 7000000, {
        //     message: 'Your resume must be less than 7MB.',
        //   }).nullish(),
        profile_picture: z.any().nullish(),
        phone_number: z.string().min(10, {
            message: languageData.ProfileLabels.details.changeUserInfo.phoneNumber.error
        }),
        birthday: z.date({
            message: languageData.ProfileLabels.details.changeUserInfo.birthday.error
        })
    })

    const changeUserInfoForm = useForm<z.infer<typeof changeUserInfoFormSchema>>({
        resolver: zodResolver(changeUserInfoFormSchema),
        defaultValues: {
            first_name: '',
            last_name: '',
            profile_picture: null,
            phone_number: '',
            birthday: new Date(),
        }
    })

    React.useEffect(() => {
        if (userInfo) {
            changeUserInfoForm.reset({
                first_name: userInfo.first_name || '',
                last_name: userInfo.last_name || '',
                // profile_picture: userInfo.profile_picture || '',
                phone_number: userInfo.phone_number || '',
                birthday: userInfo.birthday ? new Date(userInfo.birthday) : new Date()
            });
        }
    }, [userInfo, changeUserInfoForm]);

    async function onSubmitChangeUserInfo(data: z.infer<typeof changeUserInfoFormSchema>) {
        const formData = new FormData();

        formData.append('first_name', data.first_name);
        formData.append('last_name', data.last_name);
        formData.append('phone_number', data.phone_number);


        formData.append('birthday', formatDate({ date: data.birthday }));

        if (data.profile_picture) {
            formData.append('profile_picture', data.profile_picture);
        }

        const response = await postUserInfoData({ body: formData });

        if (!loading) {
            if (response) {
                toast({
                    title: languageData.ToastAlertLabels.changeUserInfo.title,
                })
                handleCloseModal();
            }
            else {
                toast({
                    title: languageData.ToastAlertLabels.changeUserInfo.error,
                    variant: 'destructive'
                })

            }
        }
    }

    const handleCloseModal = () => {
        changeUserInfo.onClose();
    }

    return (
        <Dialog open={changeUserInfo.isOpen}>
            <DialogContent
                hasClose={false}
                className="max-w-xl h-full sm:h-fit bg-slate-200 gap-0">
                <DialogHeader >
                    <button onClick={handleCloseModal} className='rounded-full bg-white w-8 h-8 '>
                        <ChevronLeftIcon size={28} className='text-gray-800 text-xl' />
                    </button>

                    <div className='flex flex-col items-center gap-10 py-6'>
                        <DialogTitle className='text-3xl font-bold text-center'>
                            {languageData.ProfileLabels.details.changeUserInfo.title}
                        </DialogTitle>

                        <DialogDescription className=' text-luckyBlue'>
                            {
                                languageData.ProfileLabels.details.changeUserInfo.description
                            }
                        </DialogDescription>
                    </div>

                </DialogHeader>

                <ChangeUserInfoForm
                    changeUserInfoForm={changeUserInfoForm}
                    onSubmitChangeUserInfo={onSubmitChangeUserInfo}
                    languageData={languageData}
                />
            </DialogContent>
        </Dialog>
    )
}

export default ChangeUserInfoModal;