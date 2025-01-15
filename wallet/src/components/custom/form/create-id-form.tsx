import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CreateIdFormProps } from '@/interface/form'
import React from 'react'

const CreateIdForm: React.FC<CreateIdFormProps> = ({
    createIdForm,
    onSubmitCreateId,
    languageData,
}) => {
    return (

        <Form {...createIdForm}>
            <form className='flex flex-col justify-between w-full gap-6' onSubmit={createIdForm.handleSubmit(onSubmitCreateId)}>
                <FormField
                    control={createIdForm.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem className='relative'>
                            <FormLabel className='text-secondary pl-2'>
                                {languageData.CreateIdLabels.label.form}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='email'
                                    placeholder={languageData.CreateIdLabels.label.placeholder}
                                    {...field} />
                            </FormControl>
                            <FormMessage className='absolute text-secondary pl-2' />
                        </FormItem>
                    )}
                />
                <DialogFooter
                    className='flex flex-col md:flex-col justify-center items-center mb-2'
                >
                    <Button
                        type={'submit'}
                        variant={'oxfordBlue'}
                        className='w-52 text-lg rounded-3xl'
                        disabled={!createIdForm.formState.isValid}
                    >
                        {languageData.CreateIdLabels.button.form.toLocaleUpperCase()}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    )
}

export default CreateIdForm;