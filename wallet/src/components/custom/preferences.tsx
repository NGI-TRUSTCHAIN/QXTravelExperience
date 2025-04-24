import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from '@/hooks/use-language';
import localStorageHelper from '@/utils/local-storage';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from '../ui/separator';
import React from "react";
import { toast } from "../ui/use-toast";
import { usePostUserInfo } from "@/hooks/use-user";

export function PreferencesForm(): JSX.Element {
    const { languageData } = useLanguage();
    const { userInfo, postUserInfoData, loading } = usePostUserInfo()

    const FormSchema = z.object({
        specialOffers: z.boolean().default(true),
        anonymous: z.boolean().default(false),
    });

    type FormSchemaType = z.infer<typeof FormSchema>;
    type PreferencesKeys = keyof FormSchemaType;

    // Retrieve preferences object from localStorage or use defaults
    const defaultValues: FormSchemaType = {
        specialOffers: localStorageHelper.exists('preferences') ? localStorageHelper.getItem<{ [key in PreferencesKeys]: boolean }>('preferences')!.specialOffers : true,
        anonymous: userInfo ? userInfo.anonymous : localStorageHelper.exists('preferences') ? localStorageHelper.getItem<{ [key in PreferencesKeys]: boolean }>('preferences')!.anonymous : true,
    };

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(FormSchema),
        defaultValues,
    });

    const watchedValues = form.watch();

    const isFormUnchanged =
        localStorageHelper.exists('preferences') &&
        Object.keys(defaultValues).every((key) => {
            return watchedValues[key as PreferencesKeys] === defaultValues[key as PreferencesKeys];
        });

    async function onSubmit(data: FormSchemaType) {
        const formData = new FormData();
        formData.append('anonymous', data.anonymous.toString());

        const response = await postUserInfoData({ body: formData });


        if (!loading) {
            if (response) {
                localStorageHelper.setItem('preferences', data);
                toast({
                    title: languageData.ToastAlertLabels.changeUserInfo.title,
                })
                form.reset(data);
            }
            else {
                toast({
                    title: languageData.ToastAlertLabels.changeUserInfo.error,
                    variant: 'destructive'
                })

            }
        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-grow space-y-6 mt-8 px-2">
                <h2 className="mb-4 text-3xl font-bold text-center">
                    {languageData.PreferencesLabels.title}
                </h2>
                <div className="w-full h-full flex flex-col flex-grow justify-between space-y-6">
                    <div className="bg-white rounded-lg">
                        {Object.keys(defaultValues).map((key) => (
                            <React.Fragment key={key}>
                                <FormField
                                    control={form.control}
                                    name={key as PreferencesKeys}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg p-4 gap-2">
                                            <FormLabel className="text-base">
                                                {languageData.PreferencesLabels[key as PreferencesKeys]}
                                            </FormLabel>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className=""
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Separator />
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="flex justify-center items-center mx-auto pt-10">
                        <Button
                            variant="maroonPink"
                            className="items-center rounded-3xl whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 flex justify-center w-52 text-lg mx-auto mb-6"
                            type="submit"
                            disabled={isFormUnchanged}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}

export default PreferencesForm;
