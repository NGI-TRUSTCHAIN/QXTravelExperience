import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { NetworkFormProps } from "@/interface/form"

export default function NetworkForm({
    networkForm,
    onSubmitNetwork,
    languageData,
    handleCloseModal,
}: NetworkFormProps) {
    return (
        <Form {...networkForm}>
            <form
                className="space-y-2 px-1 w-full flex flex-col justify-between h-full"
                onSubmit={networkForm.handleSubmit(onSubmitNetwork)}>

                <FormField
                    control={networkForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{languageData.NetworkModalLabels.name.label}</FormLabel>
                            <FormControl>
                                <Input placeholder={languageData.NetworkModalLabels.name.placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={networkForm.control}
                    name="chain_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{languageData.NetworkModalLabels.chainId.label}</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder={languageData.NetworkModalLabels.chainId.placeholder}
                                    {...field}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(value === "" ? "" : value);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={networkForm.control}
                    name="rpc_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{languageData.NetworkModalLabels.rpcUrl.label}</FormLabel>
                            <FormControl>
                                <Input placeholder={languageData.NetworkModalLabels.rpcUrl.placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={networkForm.control}
                    name="currency_symbol"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{languageData.NetworkModalLabels.currencySymbol.label}</FormLabel>
                            <FormControl>
                                <Input placeholder={languageData.NetworkModalLabels.currencySymbol.placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-center items-center gap-4 pt-8">
                    <Button
                        type="reset"
                        onClick={handleCloseModal}
                        variant="outline"
                        className="min-w-24 w-full max-w-32 rounded-lg"
                    >
                        {languageData.FormActionLabels.cancel}
                    </Button>
                    <Button
                        type="submit"
                        variant="oxfordBlue"
                        className="min-w-24 w-full max-w-32 rounded-lg"
                    >
                        {languageData.FormActionLabels.save}
                    </Button>
                </div>
            </form>
        </Form>
    )
}