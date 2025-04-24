import { useFetchNetworks, useTokenById, useUploadToken } from "@/hooks/use-blockchain";
import { useLanguage } from "@/hooks/use-language";
import { useModal } from "@/hooks/use-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import TokenForm from "../form/token-form";

export const TokenFormSchema = z.object({
    name: z.string().min(3, { message: "Name is required" }),
    symbol: z.string().min(3),
    active: z.boolean(),
    network_id: z.number(),
})

const TokenModal: React.FC = () => {
    const { languageData } = useLanguage();
    const { token, resetToken, loading } = useTokenById();
    const { uploadToken } = useUploadToken();
    const {networks} = useFetchNetworks()

    const {
        token: { isOpen, onClose },
    } = useModal();

    const tokenForm = useForm<z.infer<typeof TokenFormSchema>>({
        resolver: zodResolver(TokenFormSchema),
        defaultValues: {
            name: "",
            active: true,
            network_id: undefined,
        }
    })

    React.useEffect(() => {
        if (token) {
            tokenForm.reset({
                name: token.name,
                active: token.active,
                network_id: token.network_id,
            })
        }
        else {
            tokenForm.reset({
                name: "",
                active: true,
                network_id: undefined,
            })
        }
    }, [token, tokenForm])


    const handleResetState = () => {
        resetToken()
    }

    const handleCloseModal = () => {
        onClose();
        setTimeout(() => {
            handleResetState();
        },200)
    }

    async function onSubmitToken(data: z.infer<typeof TokenFormSchema>) {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('symbol', data.symbol);
        formData.append('active', data.active.toString());
        formData.append('network_id', data.network_id.toString());

        await uploadToken({  body: formData })
        handleCloseModal();
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={handleCloseModal}>
            <DialogContent
                hasClose={false}
                onClose={handleCloseModal}
                className="rounded-none md:rounded-lg h-fit min-h-fit md:max-h-[96vh] mx-auto overflow-hidden">
                {
                    loading ?
                        //TODO: Add skeleton loader
                        null
                        :
                        <>
                            <DialogHeader>
                                <div className='flex flex-col gap-2'>
                                    <DialogTitle className='text-3xl font-bold text-left'>
                                        {!token ?
                                            languageData.TokenModalLabels.title.add :
                                            languageData.TokenModalLabels.title.edit
                                        }
                                    </DialogTitle>
                                    <DialogDescription className="text-left">
                                        {languageData.TokenModalLabels.description.add}
                                    </DialogDescription>
                                </div>

                            </DialogHeader>

                            <TokenForm
                                tokenForm={tokenForm}
                                onSubmitToken={onSubmitToken}
                                languageData={languageData}
                                initialValues={token}
                                handleCloseModal={handleCloseModal}
                                networks={networks}
                                // tokenCategories={tokenCategories}
                            />
                        </>
                }
            </DialogContent>
        </Dialog>
    );
}

export default TokenModal;