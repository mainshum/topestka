import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  "rounded-lg font-medium font-outfit flex items-center",
  {
    variants: {
      variant: {
        panel: "bg-eblue text-ewhite text-base",
        kupkurs:
          "bg-eblue text-ewhite text-xl h-14 px-6 py-4 hover:text-electric-600",
        program:
          "bg-butter-100 text-eblue-600 text-xl border border-eblue transform-discrete hover:text-white hover:bg-electric-600",
        powiadom: "bg-butter-100 text-eblue hover:bg-electric-500",
        program2:
          "bg-transparent border border-electric-600 rounded text-ewhite hover:bg-electric-500 hover:text-ewhite",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 text-lg",
        sm: "h-9 rounded-md px-3",
        lg: "h-14 rounded-md px-8 text-xl",
        xl: "h-20 text-4xl px-8 py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "panel",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
