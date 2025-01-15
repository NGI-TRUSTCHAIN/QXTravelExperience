import { DonateFundsFormProps } from '@/interface/form'
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../../ui/form'
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group"
import DialogSubmit from './dialog-submit'
import { cn } from "@/lib/utils";
import { donateFundsTypes } from '@/constants/form'
import { CheckIcon } from 'lucide-react'

const DonateFundsForm: React.FC<DonateFundsFormProps> = ({
    donateFundsForm,
    onSubmitDonateFunds,
    languageData
}) => {
    return (
        <Form {...donateFundsForm}>
            <form onSubmit={donateFundsForm.handleSubmit(onSubmitDonateFunds)}>
                <FormField
                    control={donateFundsForm.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormControl>
                                <RadioGroup
                                    value={field.value}
                                    onValueChange={(value) => field.onChange(value)}
                                    className="flex flex-col space-y-2"
                                >
                                    <FormItem className={cn(
                                        "flex items-center space-x-2 space-y-0 border rounded-lg p-2",
                                        field.value === donateFundsTypes.network ? 'border-maroonPink text-maroonPink' : 'border-slate-400'
                                    )}>
                                        <FormControl className="w-full h-full">
                                            <RadioGroupItem value={donateFundsTypes.network} className="hidden" />
                                        </FormControl>
                                        <FormLabel className={cn("w-full h-full py-1",
                                            field.value === donateFundsTypes.network ? 'font-semibold' : 'font-normal'
                                        )}>
                                            {languageData.PolicyLabels.modal.funds.network}
                                        </FormLabel>
                                        {field.value === donateFundsTypes.network ?
                                            <CheckIcon className='bg-maroonPink text-white rounded-full' size={20} /> :
                                            null
                                        }
                                    </FormItem>

                                    <FormItem className={cn(
                                        "flex justify-between items-center space-x-2 space-y-0 border rounded-lg p-2",
                                        field.value === donateFundsTypes.charity ? 'border-maroonPink text-maroonPink font-semibold' : 'border-slate-400'
                                    )}>
                                        <FormControl className="w-full h-full">
                                            <RadioGroupItem value={donateFundsTypes.charity} className="hidden" />
                                        </FormControl>
                                        <FormLabel className={cn("w-full h-full py-1",
                                            field.value === donateFundsTypes.charity ? 'font-semibold' : 'font-normal'
                                        )}>
                                            {languageData.PolicyLabels.modal.funds.charity}
                                        </FormLabel>
                                        {field.value === donateFundsTypes.charity ?
                                            <CheckIcon className='bg-maroonPink text-white rounded-full' size={20} /> :
                                            null
                                        }
                                    </FormItem>

                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <DialogSubmit
                    variant='maroonPink'
                    text={languageData.PolicyLabels.modal.funds.action}
                />
            </form>
        </Form>
    )
}

export default DonateFundsForm;