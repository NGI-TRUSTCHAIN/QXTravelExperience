import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { usePostLogin } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"
import { AuthFormProps } from "@/interface/form"

const LoginForm: React.FC<AuthFormProps> = () => {
  const { languageData } = useLanguage()

  const { postLogin } = usePostLogin()

  const formSchema = z.object({
    email: z.string().email({
      message: languageData.LoginLabels.error.email,
    }),
    password: z.string().min(1, {
      message: languageData.LoginLabels.error.password,
    }),
    rememberMe: z.boolean().default(false),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { rememberMe, ...loginBody } = values;
    await postLogin({ body: loginBody, rememberMe });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-1">
                {languageData.LoginLabels.email.label}
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder={languageData.LoginLabels.email.placeholder}
                  {...field} />
              </FormControl>
              <FormMessage className="pl-1" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-1">
                {languageData.LoginLabels.password.label}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
                  placeholder={languageData.LoginLabels.password.placeholder}
                  {...field} />
              </FormControl>
              <FormMessage className="pl-1" />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-between gap-4 items-center flex-wrap">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className=""
                  />
                </FormControl>
                <div className="pb-2">
                  <FormLabel>
                    {languageData.LoginLabels.rememberMe}
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          {/* <div className="min-w-20" />
          <Button
            type="button"
            variant={"secondary"}
            className="rounded-lg min-w-36"
            onClick={() => handleAuthCardFormTypeChange(AuthCardFormTypeEnum.register)}>
            {languageData.LoginLabels.register}
          </Button> */}
        </div>

        <Button type="submit" variant={"oxfordBlue"} className="w-full uppercase rounded-lg">
          {languageData.LoginLabels.login}
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm;