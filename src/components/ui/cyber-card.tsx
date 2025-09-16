import * as React from "react";
import { cn } from "@/lib/utils";

const CyberCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "terminal" | "danger" | "glow";
    scanLines?: boolean;
  }
>(({ className, variant = "default", scanLines = false, ...props }, ref) => {
  const variants = {
    default: "bg-card text-card-foreground border border-cyber-green/30",
    terminal: "bg-cyber-dark text-cyber-green border border-cyber-green terminal-window",
    danger: "bg-card text-card-foreground border border-destructive/50 shadow-danger",
    glow: "bg-card text-card-foreground border border-primary shadow-cyber",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg p-6 shadow-lg relative",
        variants[variant],
        scanLines && "scan-lines",
        className
      )}
      {...props}
    />
  );
});
CyberCard.displayName = "CyberCard";

const CyberCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  />
));
CyberCardHeader.displayName = "CyberCardHeader";

const CyberCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold font-orbitron tracking-wider text-primary uppercase",
      className
    )}
    {...props}
  />
));
CyberCardTitle.displayName = "CyberCardTitle";

const CyberCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground font-mono", className)}
    {...props}
  />
));
CyberCardDescription.displayName = "CyberCardDescription";

const CyberCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
));
CyberCardContent.displayName = "CyberCardContent";

const CyberCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  />
));
CyberCardFooter.displayName = "CyberCardFooter";

export {
  CyberCard,
  CyberCardHeader,
  CyberCardFooter,
  CyberCardTitle,
  CyberCardDescription,
  CyberCardContent,
};