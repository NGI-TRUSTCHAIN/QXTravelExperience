export interface ProfileInfoSectionProps {
  title: string;
  icon: React.ReactNode;
  sectionItems: ProfileInfoItemProps[];
  loading: boolean
}

export interface ProfileInfoItemProps {
  title: string;
  action?: () => void;
}