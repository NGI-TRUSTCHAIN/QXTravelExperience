import React from 'react'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { XIcon } from 'lucide-react'
import { WalletDrawerProps } from '@/interface/wallet';
import WalletLogo from '@/assets/images/wallet-logo.png'

const WalletDrawer: React.FC<WalletDrawerProps> = ({
    languageData,
    handleBackupWalletKeys,
    mnemonic,
    address,
}) => {
    return (
        <Drawer>
            <DrawerTrigger asChild className='flex justify-center w-full'>
                <Button
                    className='w-52 text-lg rounded-3xl mx-auto mb-6'
                >
                    {languageData.WalletLabels.action.toLocaleUpperCase()}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className='w-12 h-12 rounded-full overflow-hidden bg-maroonPink absolute top-6 left-4 p-1'>
                    <img
                        src={WalletLogo}
                        alt="wallet-logo" />
                </div>
                <DrawerClose className='absolute top-8 right-4'>
                    <XIcon className="h-8 w-8" />
                    <span className="sr-only">Close</span>
                </DrawerClose>
                <DrawerHeader className='flex flex-col gap-6 text-left mt-10'>
                    <DrawerTitle className='text-xl font-bold'>
                        {languageData.WalletLabels.modal.title}
                    </DrawerTitle>
                    <DrawerDescription className="flex flex-col gap-2 text-oxfordBlue font-bold">
                        <span >
                            {languageData.WalletLabels.modal.description.download}
                        </span>
                        <span>
                            {languageData.WalletLabels.modal.description.meta}
                        </span>
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button
                        onClick={handleBackupWalletKeys}
                        className='w-52 text-lg rounded-3xl mx-auto mb-2 mt-6'
                        disabled={!mnemonic || !address}
                    >
                        {languageData.WalletLabels.action.toLocaleUpperCase()}
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default WalletDrawer