import ProfileLogo from '@/assets/images/profile-logo.png'
import { useLanguage } from '@/hooks/use-language'
import { useFetchUserInfo, useFetchUserLogs } from '@/hooks/use-user'
import { HistoryIcon, InfoIcon, UserIcon } from 'lucide-react'
import React from 'react'
import ChangeEmailModal from '../modal/change-email-modal'
import ChangeUserInfoModal from '../modal/change-user-info-modal'
import { AvatarLogoSkeleton } from '../skeleton'
import ProfileInfoSection from './profile-info-section'
import ProfileSectionItems from './profile-section-items'

const ProfileLayout: React.FC = () => {
  const { languageData } = useLanguage();
  const { userInfo, fetchUserInfo, loading: userInfoLoading } = useFetchUserInfo();
  const { fetchUserLogs, loading: userLogsLoading } = useFetchUserLogs();

  const {
    profileDetailsItems,
    profileAccountItems,
    profileHistoryItems,
    // DIDItems,
  } = ProfileSectionItems();

  React.useEffect(() => {
    fetchUserLogs();
  }, [fetchUserLogs]);

  React.useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <div className='w-full mt-8 px-2 flex flex-col gap-6 pb-4'>
      <div className='flex justify-center items-center'>
        {
          userInfoLoading ?
            <AvatarLogoSkeleton /> :
            <img className='w-32 h-32 rounded-full object-cover overflow-hidden border border-white shadow-md'
              src={userInfo?.profile_picture ?? ProfileLogo}
              alt='profile-logo' />
        }
      </div>

      <ProfileInfoSection
        icon={<UserIcon size={26} className='bg-black text-white border-2 border-white rounded-full' />}
        title={languageData.ProfileLabels.details.title}
        sectionItems={profileDetailsItems}
        loading={userInfoLoading}
      />
      <ProfileInfoSection
        icon={<InfoIcon size={26} className='bg-black text-white  rounded-full' />}
        title={languageData.ProfileLabels.account.title}
        sectionItems={profileAccountItems}
        loading={userInfoLoading}
      />
      {/* <ProfileInfoSection
        icon={<UserIcon size={26} className='bg-black text-white  rounded-full' />}
        title={"DID"}
        sectionItems={DIDItems}
        loading={DIDloading}
      /> */}
      <ProfileInfoSection
        icon={<HistoryIcon size={26} className='bg-black text-white  rounded-full' />}
        title={languageData.ProfileLabels.history.title}
        sectionItems={profileHistoryItems}
        loading={userLogsLoading}
      />

      <ChangeEmailModal />
      <ChangeUserInfoModal />
    </div>
  )
}

export const IconWrapper: React.FC<{ icon: React.ReactNode }> = ({ icon }) => {
  return (
    <div className='w-6 h-6 mr-2'>
      {icon}
    </div>
  )
}

export default ProfileLayout