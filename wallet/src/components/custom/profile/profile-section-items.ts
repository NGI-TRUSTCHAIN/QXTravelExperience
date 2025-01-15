import { routes } from "@/constants/routes";
import { useLanguage } from "@/hooks/use-language";
import { useModal } from "@/hooks/use-modal";
import { useFetchUserInfo, useFetchUserLogs } from "@/hooks/use-user";
import { ProfileInfoItemProps } from "@/interface/profile";
import { useNavigate } from "react-router-dom";

const ProfileSectionItems = () => {
  const { languageData } = useLanguage();
  const { changeEmail, changeUserInfo } = useModal();
  const { userInfo } = useFetchUserInfo();
  const { userLogs } = useFetchUserLogs();
  const navigate = useNavigate();

  const handleOnChangeEmailModal = () => {
    changeEmail.onOpen();
  };

  const handleOnChangeUserInfoModal = () => {
    changeUserInfo.onOpen();
  };

  const handleNavigation = ({ route }: { route: string }) => {
    navigate(route);
  };

  //TODO: CHECK IF POST USER INFO SHOULD BE ALLOWED SECOND TIME
  const profileDetailsItems: ProfileInfoItemProps[] = [
    {
      title:
        userInfo?.first_name ?? languageData.ProfileLabels.details.firstName,
      action: () => handleOnChangeUserInfoModal(),
    },
    {
      title: userInfo?.last_name ?? languageData.ProfileLabels.details.lastName,
      action: () => handleOnChangeUserInfoModal(),
    },
    {
      title: userInfo?.birthday
        ? userInfo.birthday.toString()
        : languageData.ProfileLabels.details.birthday,
      action: () => handleOnChangeUserInfoModal(),
    },
  ];

  const profileAccountItems: ProfileInfoItemProps[] = [
    {
      title: userInfo?.email
        ? userInfo.email
        : languageData.ProfileLabels.account.email,
      action: () => handleOnChangeEmailModal(),
    },
    {
      title: languageData.ProfileLabels.account.walletKeys,
      action: () => handleNavigation({ route: routes.wallet }),
    },
    {
      title: languageData.ProfileLabels.account.privacyPolicy,
      action: () => handleNavigation({ route: routes.policy }),
    },
  ];

  const profileHistoryItems: ProfileInfoItemProps[] = userLogs  && userLogs?.length < 0
    ? userLogs.map((log) => ({
        // ${languageData.ProfileLabels.history.registered}
        title: `
      ${log.name}`,
      }))
    : [
        {
          title: languageData.ProfileLabels.history.transaction,
        },
      ];

  return {
    profileDetailsItems,
    profileAccountItems,
    profileHistoryItems,
  };
};

export default ProfileSectionItems;
