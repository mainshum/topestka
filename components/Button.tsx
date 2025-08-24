import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  "rounded-lg font-medium font-outfit flex items-center",
  {
    variants: {
      variant: {
        navlink: "text-eblue-600 hover:text-electric-600 duration-[400ms] ease-in-out",
        panel: "bg-eblue text-ewhite text-base transform-discrete hover:text-electric-500 duration-[400ms] ease-in-out",
        kupkurs:
          "bg-eblue text-ewhite text-xl hover:text-electric-600",
        program:
          "bg-butter-100 text-eblue-600 border border-eblue transform-discrete hover:bg-electric-500 hover:border-electric-500 duration-[400ms] ease-in-out",
        powiadom: "bg-butter-100 text-eblue hover:bg-electric-500",
        program2:
          "bg-transparent border border-electric-600 rounded text-ewhite hover:bg-electric-500 hover:text-ewhite",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        powrot: "bg-electric-500 text-ewhite hover:bg-electric-600",
      },
      size: {
        default: "h-10 px-4 py-2 text-base md:text-lg",
        sm: "h-9 rounded-md px-3",
        lg: "!h-14 rounded-md px-4 text-lg md:text-xl",
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
