import { DeleteIdFormProps } from '@/interface/form'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../ui/form'
import { Switch } from '../../ui/switch'
import DialogSubmit from './dialog-submit'


const DeleteIdForm: React.FC<DeleteIdFormProps> = ({
    deleteIdForm,
    onSubmitDeleteId,
    languageData
}) => {
    return (
        <Form {...deleteIdForm}>
            <form
                onSubmit={deleteIdForm.handleSubmit(onSubmitDeleteId)}
                className='flex flex-col justify-between'
            >
                <FormField
                    control={deleteIdForm.control}
                    name='delete'
                    render={({ field }) => {
                        return (
                            <FormItem className='flex flex-row justify-between items-center px-4 mt-12 mb-6'>
                                <FormLabel className='text-luckyBlue pl-2'>
                                    {languageData.PolicyLabels.modal.delete.label}
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
                />
                <DialogSubmit
                    variant='maroonPink'
                    text={languageData.PolicyLabels.action.toLocaleUpperCase()}
                    disabled={!deleteIdForm.watch('delete')}
                />

            </form>
        </Form>
    )
}

export default DeleteIdForm;