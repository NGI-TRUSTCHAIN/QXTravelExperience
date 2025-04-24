import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeEmailFormProps } from "@/interface/form";
import React from "react";
import DialogSubmit from "./dialog-submit";

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({
    changeEmailForm,
    onSubmitChangeEmail,
    languageData
}) => {
    return (
        <Form {...changeEmailForm}>
            <form className='flex flex-col justify-between' onSubmit={changeEmailForm.handleSubmit(onSubmitChangeEmail)}>
                <FormField
                    control={changeEmailForm.control}
                    name='new_email'
                    render={({ field }) => (
                        <FormItem className='relative'>
                            <FormLabel className='text-luckyBlue pl-2'>
                                {languageData.CreateIdQXLabels.resetEmail.label}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder={languageData.CreateIdLabels.label.placeholder}
                                    {...field} />
                            </FormControl>
                            <FormMessage className='absolute text-maroonPink pl-2' />
                        </FormItem>
                    )}
                />
                <DialogSubmit
                    variant="default"
                    text={languageData.CreateIdQXLabels.resetEmail.action.toLocaleUpperCase()}
                />
            </form>
        </Form>
    )
}
export default ChangeEmailForm;