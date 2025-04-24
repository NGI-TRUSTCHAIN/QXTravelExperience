import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline:
            "border border-border bg-sidebar hover:bg-sidebar-accent sidebar-accent-foreground hover:text-accent-foreground",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-sidebar hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
          maroonPink: "bg-maroonPink text-white",
          oxfordBlue: "bg-oxfordBlue hover:bg-oxfordBlue-foreground text-white",
          forestGreen: "bg-forestGreen text-white hover:bg-forestGreen",
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-lg px-3",
          lg: "h-11 rounded-lg px-8",
          icon: "h-10 w-10",
          smIcon: "h-8 w-8"
        },
    },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  )