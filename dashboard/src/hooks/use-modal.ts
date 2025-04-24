import { ModalMap, ModalTypeEnum } from "@/interface/modal";
import { DataSetKeyEnum } from "@/interface/set";
import { create } from "@/lib/store";

export const useModal = create<ModalMap>((set) => {
  const createModal = ({
    key,
    hasSuspend = false,
    hasDelete = false,
  }: {
    key: keyof ModalMap;
    hasSuspend: boolean;
    hasDelete: boolean;
  }) => {
    const base = {
      isOpen: false,
      onOpen: () =>
        set((state) => ({ [key]: { ...state[key], isOpen: true } })),
      onClose: () =>
        set((state) => ({ [key]: { ...state[key], isOpen: false } })),
      isOpenSuspend: false,
      onOpenSuspend: () =>
        set((state) => ({
          [key]: { ...state[key], isOpenSuspend: true },
        })),
      onCloseSuspend: () =>
        set((state) => ({
          [key]: { ...state[key], isOpenSuspend: false },
        })),
      isOpenDelete: false,
      onOpenDelete: () =>
        set((state) => ({
          [key]: { ...state[key], isOpenDelete: true },
        })),
      onCloseDelete: () =>
        set((state) => ({
          [key]: { ...state[key], isOpenDelete: false },
        })),
      deleteRecord: { key: null, id: null },
      setDeleteRecord: (dataSetKey: DataSetKeyEnum, id: number) =>
        set((state) => ({
          [key]: {
            ...state[key],
            deleteRecord: { key: dataSetKey, id: id },
          },
        })),
      resetDeleteRecord: () =>
        set((state) => ({
          [key]: {
            ...state[key],
            deleteRecord: { key: null, id: null },
          },
        })),
    };

    if (hasSuspend) {
      base.onOpenSuspend = () =>
        set((state) => ({
          [key]: { ...state[key], isOpenSuspend: true },
        }));
      base.onCloseSuspend = () =>
        set((state) => ({
          [key]: { ...state[key], isOpenSuspend: false },
        }));
    }

    if (hasDelete) {
      base.onOpenDelete = () =>
        set((state) => ({
          [key]: { ...state[key], isOpenDelete: true },
        }));
      base.onCloseDelete = () =>
        set((state) => ({
          [key]: { ...state[key], isOpenDelete: false },
        }));
      base.setDeleteRecord = (dataSetKey, recordId) =>
        set((state) => ({
          [key]: {
            ...state[key],
            deleteRecord: { key: dataSetKey, id: recordId },
          },
        }));
      base.resetDeleteRecord = () =>
        set((state) => ({
          [key]: {
            ...state[key],
            deleteRecord: { key: null, id: null },
          },
        }));
    }

    return base;
  };

  return {
    network: createModal({
      key: ModalTypeEnum.network,
      hasSuspend: true,
      hasDelete: false,
    }),
    token: createModal({
      key: ModalTypeEnum.token,
      hasSuspend: true,
      hasDelete: false,
    }),
    customer: createModal({
      key: ModalTypeEnum.customer,
      hasSuspend: true,
      hasDelete: false,
    }),
  };
});

// registerStore(useModal)