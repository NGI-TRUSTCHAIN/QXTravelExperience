import { DataSetKeyEnum } from "./set";

export enum ModalTypeEnum {
  token = "token",
  transaction = "transaction",
  network = "network",
  customer = "customer",
}
export interface DeleteRecord {
  key: DataSetKeyEnum | null;
  id: number | null;
}
export interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  isOpenSuspend: boolean;
  onOpenSuspend: () => void;
  onCloseSuspend: () => void;
  isOpenDelete: boolean;
  onOpenDelete: () => void;
  onCloseDelete: () => void;
  deleteRecord: DeleteRecord;
  setDeleteRecord: (key: DataSetKeyEnum, id: number) => void;
  resetDeleteRecord: () => void;
}


export interface ModalMap {
  network: ModalProps;
  customer: ModalProps;
  token: ModalProps;
}
