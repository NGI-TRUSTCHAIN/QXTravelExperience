import React from 'react'
import { ProfileInfoSectionProps } from '@/interface/profile'
import { Separator } from '@/components/ui/separator'
import { ProfileInfoSectionSkeleton } from '../skeleton'

const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = (
    { title, icon, sectionItems, loading }
) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row gap-2 items-center'>
                {icon}
                <h3 className='text-xl font-bold leading-10'>
                    {title}
                </h3>
            </div>
            {
            loading ?
            <ProfileInfoSectionSkeleton /> :
                <div className='rounded-xl overflow-hidden shadow-md'>
                {sectionItems.map((item, index) => (
                    <div
                    key={index}
                    className='w-full bg-white px-6 cursor-pointer'
                    onClick={item.action}
                    >
                        <p className='my-auto h-auto py-4'>
                            {item.title}
                        </p>

                        <Separator />
                    </div>
                ))}
            </div>
            }
        </div>
    )
}

export default ProfileInfoSection