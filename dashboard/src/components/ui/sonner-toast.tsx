// import * as React from "react"
// import { toast as sonnerToast, Toast as SonnerToastPrimitive } from "sonner"
// import { cva, type VariantProps } from "class-variance-authority"
// import { X } from "lucide-react"

// import { cn } from "@/lib/utils"

// // Re-export the Toaster component
// export { Toaster } from "./sonner"

// // Define variants similar to Radix toast
// const toastVariants = cva(
//   "group flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-6 pr-8 shadow-lg",
//   {
//     variants: {
//       variant: {
//         default: "border-input bg-background text-foreground",
//         destructive:
//           "destructive border-destructive bg-destructive text-destructive-foreground",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// )

// // Types to match Radix toast API
// type ToastProps = {
//   title?: React.ReactNode
//   description?: React.ReactNode
//   action?: React.ReactNode
//   variant?: "default" | "destructive"
//   duration?: number
//   className?: string
// }

// // Toast function that mimics Radix toast API
// const toast = ({ title, description, action, variant = "default", duration, className }: ToastProps) => {
//   return sonnerToast(title as string, {
//     description,
//     action,
//     duration,
//     className: cn(toastVariants({ variant }), className),
//   })
// }

// // Add methods to match Radix toast API
// toast.dismiss = sonnerToast.dismiss
// toast.error = (props: Omit<ToastProps, "variant">) => toast({ ...props, variant: "destructive" })
// toast.success = (props: ToastProps) => sonnerToast.success(props.title as string, { description: props.description, action: props.action, duration: props.duration })
// toast.promise = sonnerToast.promise

// // Type definitions to match Radix toast
// type ToastActionElement = React.ReactElement

// export {
//   type ToastProps,
//   type ToastActionElement,
//   toast,
// }
