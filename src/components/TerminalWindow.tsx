import { ReactNode } from "react";

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
}

export const TerminalWindow = ({ children, title = "URL_SHORTENER.exe" }: TerminalWindowProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Terminal header */}
      <div className="bg-card border border-border rounded-t-sm p-1.5 sm:p-2 flex items-center gap-2 terminal-border-glow">
        <div className="flex gap-1 sm:gap-1.5">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-destructive"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary"></div>
        </div>
        <div className="flex-1 text-center text-xs sm:text-sm text-foreground terminal-glow">
          {title}
        </div>
      </div>
      
      {/* Terminal body */}
      <div className="bg-card border-x border-b border-border rounded-b-sm p-4 sm:p-6 terminal-border-glow min-h-[400px] sm:min-h-[500px]">
        {children}
      </div>
    </div>
  );
};
