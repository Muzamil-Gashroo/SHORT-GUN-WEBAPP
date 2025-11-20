import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface TerminalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  prefix?: string;
}

export const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(
  ({ className, prefix = "$", ...props }, ref) => {
    return (
      <div className="flex items-center gap-2">
        <span className="text-primary terminal-glow font-bold">{prefix}</span>
        <Input
          ref={ref}
          className={cn(
            "bg-input border-border text-foreground terminal-glow",
            "focus-visible:ring-primary focus-visible:border-primary",
            "placeholder:text-muted-foreground",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

TerminalInput.displayName = "TerminalInput";
