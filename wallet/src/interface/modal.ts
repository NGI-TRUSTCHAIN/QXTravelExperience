export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export interface ModalMap {
    createId: ModalProps;
    deleteId: ModalProps;
    changeEmail: ModalProps;
    changeUserInfo: ModalProps;
    createDID: ModalProps;
}

export enum CreateIdSteps {
  start = 'start',
  information = 'information',
  form = 'form',
  success = 'success',
}