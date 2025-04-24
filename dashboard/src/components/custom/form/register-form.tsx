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
import { AuthFormProps } from "@/interface/form"
import { usePostRegister } from "@/hooks/use-auth"
import { useLanguage } from "@/hooks/use-language"
import { AuthCardFormTypeEnum } from "@/constants/form"

const RegisterForm: React.FC<AuthFormProps> = ({
  // authCardFormType,
  handleAuthCardFormTypeChange,
}) => {
  const { languageData } = useLanguage()
  const { postRegister } = usePostRegister()

  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
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
    const { ...registerBody } = values;
    await postRegister({ body: registerBody });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="pl-1">User</FormLabel>
              <FormControl>
                <Input placeholder="Your email address..." {...field} />
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
              <FormLabel className="pl-1">Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your password..." {...field} />
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
          <Button
            type="button"
            variant={"secondary"}
            className="w-full"
            onClick={() => handleAuthCardFormTypeChange(AuthCardFormTypeEnum.login)}
          >
            {languageData.LoginLabels.customer.already}
            {" "}
            {languageData.LoginLabels.backToLogin}

          </Button>
        </div>
        <Button type="submit" variant={"oxfordBlue"} className="w-full uppercase">
          {languageData.LoginLabels.register}
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm;