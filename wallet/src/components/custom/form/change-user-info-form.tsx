import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeUserInfoProps } from "@/interface/form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React from "react";
import DialogSubmit from "./dialog-submit";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";


const ChangeUserInfoForm: React.FC<ChangeUserInfoProps> = ({
    changeUserInfoForm,
    onSubmitChangeUserInfo,
    languageData
}) => {
    return (
        <Form {...changeUserInfoForm}>
            <form className='flex flex-col justify-between gap-4' onSubmit={changeUserInfoForm.handleSubmit(onSubmitChangeUserInfo)}>
                <FormField
                    control={changeUserInfoForm.control}
                    name='profile_picture'
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { onChange, value, ...fieldProps } }) => (
                        <FormItem className='relative'>
                            <FormLabel className='text-luckyBlue pl-2'>
                                {languageData.ProfileLabels.details.changeUserInfo.profilePicture.label}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*jpg, image/*jpeg, image/*png"
                                    onChange={(e) => onChange(e.target.files && e.target.files[0])}
                                    placeholder={languageData.ProfileLabels.details.profilePicture}
                                    multiple={false}
                                    {...fieldProps} // "value" omitted to keep the input uncontrolled
                                />
                            </FormControl>
                            <FormMessage className='absolute text-maroonPink pl-2' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={changeUserInfoForm.control}
                    name='first_name'
                    render={({ field }) => (
                        <FormItem className='relative'>
                            <FormLabel className='text-luckyBlue pl-2'>
                                {languageData.ProfileLabels.details.changeUserInfo.firstName.label}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder={languageData.ProfileLabels.details.firstName}
                                    {...field} />
                            </FormControl>
                            <FormMessage className='absolute text-maroonPink pl-2' />
                        </FormItem>
                    )}
                />
                <FormField
                    control={changeUserInfoForm.control}
                    name='last_name'
                    render={({ field }) => {
                        return (
                            <FormItem className='relative'>
                                <FormLabel className='text-luckyBlue pl-2'>
                                    {languageData.ProfileLabels.details.changeUserInfo.lastName.label}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder={languageData.ProfileLabels.details.lastName}
                                        {...field} />
                                </FormControl>
                                <FormMessage className='absolute text-maroonPink pl-2' />
                            </FormItem>
                        )
                    }}
                />
                <FormField
                    control={changeUserInfoForm.control}
                    name='phone_number'
                    render={({ field }) => (
                        <FormItem className='relative'>
                            <FormLabel className='text-luckyBlue pl-2'>
                                {languageData.ProfileLabels.details.changeUserInfo.phoneNumber.label}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="tel"
                                    // TODO: REVIDATE THIS TELEPHONE PATTERN
                                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    placeholder={languageData.ProfileLabels.details.phoneNumber}
                                    {...field} />
                            </FormControl>
                            <FormMessage className='absolute text-maroonPink pl-2' />
                        </FormItem>
                    )}
                />


                <FormField
                    control={changeUserInfoForm.control}
                    name="birthday"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel className='text-luckyBlue pl-2'>
                                {languageData.ProfileLabels.details.changeUserInfo.birthday.label}
                            </FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                " pl-2 w-full font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                        captionLayout="dropdown-buttons"
                                        fromYear={1900}
                                        toYear={new Date().getFullYear()}
                                    />
                                </PopoverContent>
                            </Popover>
                            {/* <FormDescription>
                                Your date of birth is used to calculate your age.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogSubmit
                    variant="default"
                    text={languageData.ProfileLabels.details.changeUserInfo.action.toLocaleUpperCase()}
                />
            </form>
        </Form>
    )
}
export default ChangeUserInfoForm;