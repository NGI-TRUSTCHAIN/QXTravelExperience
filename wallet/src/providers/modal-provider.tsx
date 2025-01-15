import CreateIdModal from "@/components/custom/modal/create-id-modal";
import React from "react";

export const ModalProvider = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [isMounted, setIsMounted] = React.useState<boolean>(false)

  React.useEffect(() => {
    if(isAuthenticated) {
      setIsMounted(true)
    }
  }, [isAuthenticated])

  if (isMounted) return null

  return (
    <>
      <CreateIdModal />
    </>
  )
}