import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { TokenFormProps } from "@/interface/form"


export default function TokenForm({
    tokenForm,
    onSubmitToken,
    languageData,
    initialValues,
    handleCloseModal,
    networks,
}: TokenFormProps) {

    return (
        <Form {...tokenForm}>
            <form
                id="token-form"
                encType="multipart/form-data"
                className="space-y-2 px-1 overflow-y-auto w-full"
                onSubmit={tokenForm.handleSubmit(onSubmitToken)}>

                {initialValues ?
                    <FormField
                        control={tokenForm.control}
                        name='active'
                        render={({ field }) => {
                            return (
                                <FormItem className='absolute right-6 top-6 flex items-center gap-4'>
                                    <FormLabel className='mt-2'>
                                        {languageData.TokenModalLabels.active}
                                    </FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className=''
                                        />
                                    </FormControl>
                                    {/* <FormMessage className='absolute text-maroonPink pl-2' /> */}
                                </FormItem>
                            )
                        }}
                    /> : null
                }
                <FormField
                    control={tokenForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{languageData.TokenModalLabels.name.label}</FormLabel>
                            <FormControl>
                                <Input placeholder={languageData.TokenModalLabels.name.placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={tokenForm.control}
                    name="symbol"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{languageData.TokenModalLabels.symbol.label}</FormLabel>
                            <FormControl>
                                <Input placeholder={languageData.TokenModalLabels.symbol.placeholder} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={tokenForm.control}
                    name="network_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{languageData.TokenModalLabels.network.label}</FormLabel>
                            <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={field.value?.toString()}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={languageData.TokenModalLabels.network.placeholder} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {/* TODO: ADD SKELETON */}
                                    {!networks ?
                                        null :
                                        networks.map((network) => (
                                            <SelectItem key={network.id} value={network.id.toString()}>
                                                {network.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-center items-center gap-4 pt-6">
                    <Button
                        type="reset"
                        onClick={handleCloseModal}
                        variant={"outline"}
                        className="min-w-24 w-full max-w-32 rounded-lg"
                    >
                        {languageData.TokenModalLabels.cancel}
                    </Button>
                    <Button
                        type="submit"
                        variant={"oxfordBlue"}
                        className="min-w-24 w-full max-w-32 rounded-lg"
                    >
                        {languageData.TokenModalLabels.save}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
