import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateDIDFormProps } from "@/interface/form";
import React from "react";
import DialogSubmit from "./dialog-submit";


const CreateDIDForm: React.FC<CreateDIDFormProps> = ({
    createDIDForm,
    onSubmitCreateDID,
    languageData,
}) => {
    return (
        <Form {...createDIDForm}>
            <form className='flex flex-col justify-between' onSubmit={createDIDForm.handleSubmit(onSubmitCreateDID)}>
                <div className="flex flex-col gap-6">
                    <FormField
                        control={createDIDForm.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem className='relative'>
                                <FormLabel className='text-luckyBlue pl-2'>
                                    {languageData.DIDLabels.modal.name.label}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder={languageData.DIDLabels.modal.name.placeholder}
                                        {...field} />
                                </FormControl>
                                <FormMessage className='absolute text-maroonPink pl-2' />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={createDIDForm.control}
                        name='did'
                        render={({ field }) => (
                            <FormItem className='relative'>
                                <FormLabel className='text-luckyBlue pl-2'>
                                    {languageData.DIDLabels.modal.did.label}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder={languageData.DIDLabels.modal.did.placeholder}
                                        {...field} />
                                </FormControl>
                                <FormMessage className='absolute text-maroonPink pl-2' />
                            </FormItem>
                        )}
                    />

                </div>
                <DialogSubmit
                    variant="default"
                    text={languageData.DIDLabels.modal.action.toLocaleUpperCase()}
                />
            </form>
        </Form>
    )
}
export default CreateDIDForm;
