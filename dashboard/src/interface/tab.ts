import { StatusEnum, TabTypeEnum } from "@/constants/form"
import { DataSet, DataSetKeyEnum, ItemComponentProps } from "./set";
import { PageTypeEnum } from "./page";

export interface TabLayoutProps<T> {
  dataSets: DataSet<T>[];
  handlePrimaryAction: () => void;
  handleSecondaryAction?: () => void;
  onEdit: (item: T, dataSetKey: DataSetKeyEnum) => void;
  onChangeActiveStatus: (item: T, dataSetKey: DataSetKeyEnum) => void;
  searchCriteriaProps: (item: T, dataSetKey: DataSetKeyEnum) => string[];
  tabTypes: TabTypeEnum[] | StatusEnum[];
  itemComponent: React.ComponentType<ItemComponentProps<T>>;
  optionalItemComponent?: JSX.Element;
  getItemActive: (item: T, dataSetKey: DataSetKeyEnum) => boolean;
  primaryActionLabel: string | null;
  secondaryActionLabel?: string | null;
  maxHeight?: boolean;
  notFoundMessage: string;
  pageTypeEnum: PageTypeEnum
}
