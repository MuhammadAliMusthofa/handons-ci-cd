import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cyberButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-mono uppercase tracking-wider relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-cyber hover:shadow-[0_0_20px_hsl(120_100%_50%)] border border-primary",
        secondary: "bg-secondary text-secondary-foreground shadow-secondary hover:shadow-[0_0_20px_hsl(195_100%_50%)] border border-secondary",
        danger: "bg-destructive text-destructive-foreground shadow-danger hover:shadow-[0_0_20px_hsl(355_100%_50%)] border border-destructive",
        ghost: "border border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-cyber",
        terminal: "bg-cyber-dark border border-cyber-green text-cyber-green hover:bg-cyber-green hover:text-black hover:shadow-cyber",
        hacker: "bg-gradient-to-r from-cyber-green to-cyber-blue text-black hover:from-cyber-blue hover:to-cyber-green hover:shadow-[0_0_25px_hsl(120_100%_50%)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface CyberButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof cyberButtonVariants> {
  asChild?: boolean;
  glitch?: boolean;
}

const CyberButton = React.forwardRef<HTMLButtonElement, CyberButtonProps>(
  ({ className, variant, size, asChild = false, glitch = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          cyberButtonVariants({ variant, size, className }),
          glitch && "animate-glitch"
        )}
        ref={ref}
        {...props}
      >
        {children}
        {variant === "hacker" && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse-cyber opacity-0 hover:opacity-100 transition-opacity duration-300" />
        )}
      </Comp>
    );
  }
);
CyberButton.displayName = "CyberButton";

export { CyberButton, cyberButtonVariants };