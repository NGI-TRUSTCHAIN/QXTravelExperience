import { useLanguage } from '@/hooks/use-language'
import React from 'react'
import { BlockchainAddress } from './blockchain-address'
import { Mnemonic } from './mnemonic'
import WalletDrawer from './wallet-drawer'
import { saveAs } from 'file-saver';
import { BlobText } from '@/utils/blob'
import { useFetchBlockchainAddress, useFetchMnemonic } from '@/hooks/use-user'
import { MnemonicSkeleton, WalletDrawerSkeleton } from '../skeleton'

const WalletLayout: React.FC = () => {
    const { languageData } = useLanguage()

    const { mnemonic, fetchMnemonic, loading: mnemonicLoading } = useFetchMnemonic()

    const { blockchainAddress, fetchBlockchainAddress, loading: blockchainAddressLoading } = useFetchBlockchainAddress()

    React.useEffect(() => {
        fetchMnemonic()
    }, [fetchMnemonic])

    React.useEffect(() => {
        fetchBlockchainAddress()
    }, [fetchBlockchainAddress])

    const handleBackupWalletKeys = () => {
        if (mnemonic?.mnemonic) {
            const blob = BlobText({ text: mnemonic?.mnemonic })
            //TODO: Add a better file name
            saveAs(blob, 'wallet-keys.txt')
        }
    }

    return (
        <div className='px-4 flex flex-col flex-grow justify-between gap-6 mt-6'>
            <div className='text-center'>
                <h2 className="text-3xl font-bold mb-4">
                    {languageData.WalletLabels.title}
                </h2>
                <p className='font-bold'>
                    {languageData.WalletLabels.description}
                </p>
            </div>


            {
                mnemonicLoading ?
                    <MnemonicSkeleton /> :
                    mnemonic ?
                        <Mnemonic mnemonic={mnemonic.mnemonic ?? []} /> :
                        null
            }

            <BlockchainAddress
                title={languageData.WalletLabels.address}
                address={blockchainAddress?.blockchain_address}
                loading={blockchainAddressLoading}
            />

            {
                mnemonicLoading || blockchainAddressLoading ?
                    <WalletDrawerSkeleton /> :
                    mnemonic?.mnemonic && blockchainAddress?.blockchain_address ?

                        <WalletDrawer
                            languageData={languageData}
                            handleBackupWalletKeys={handleBackupWalletKeys}
                            address={blockchainAddress?.blockchain_address}
                            mnemonic={mnemonic?.mnemonic}
                        /> :
                        null
            }

        </div>
    )
}

export default WalletLayout