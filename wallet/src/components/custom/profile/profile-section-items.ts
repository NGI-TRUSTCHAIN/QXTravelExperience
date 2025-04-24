import { routes } from "@/constants/routes";
import { useFetchDIDs } from "@/hooks/use-blockchain";
import { useLanguage } from "@/hooks/use-language";
import { useModal } from "@/hooks/use-modal";
import { useFetchUserInfo, useFetchUserLogs } from "@/hooks/use-user";
import { ProfileInfoItemProps } from "@/interface/profile";
import { useNavigate } from "react-router-dom";

const ProfileSectionItems = () => {
  const { languageData } = useLanguage();
  const { changeEmail, changeUserInfo, createDID } = useModal();
  const { userInfo } = useFetchUserInfo();
  const { userLogs } = useFetchUserLogs();
  const { dids } = useFetchDIDs();
  const navigate = useNavigate();

  const handleOnChangeEmailModal = () => {
    changeEmail.onOpen();
  };

  const handleOnChangeUserInfoModal = () => {
    changeUserInfo.onOpen();
  };

  const handleCreateDID = () => {
    createDID.onOpen();
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
    {
      title: languageData.ProfileLabels.account.did,
      action: () => handleNavigation({ route: routes.did }),
    }
  ];

  const profileHistoryItems: ProfileInfoItemProps[] =
    userLogs && userLogs?.length < 0
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

  const DIDItems: ProfileInfoItemProps[] =
    dids && dids?.length > 0
      ? dids.map((did) => ({
          title: `${did.name}`,
          action: handleCreateDID,
        }))
      : [
          {
            title: "DID",
            // title: languageData.ProfileLabels.history.did,
            action: handleCreateDID,
          },
        ];

  return {
    profileDetailsItems,
    profileAccountItems,
    profileHistoryItems,
    DIDItems,
  };
};

export default ProfileSectionItems;
