import { Terminal, MonitorDot } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ModeToggleProps {
  mode: "terminal" | "gui";
  onModeChange: (mode: "terminal" | "gui") => void;
}

export const ModeToggle = ({ mode, onModeChange }: ModeToggleProps) => {
  return (
    <div className="flex items-center gap-1 sm:gap-2 bg-card border border-border rounded p-1 terminal-border-glow">
      <Button
        size="sm"
        variant={mode === "terminal" ? "default" : "ghost"}
        onClick={() => onModeChange("terminal")}
        className={mode === "terminal" ? "bg-primary text-primary-foreground text-xs sm:text-sm" : "text-muted-foreground hover:text-foreground text-xs sm:text-sm"}
      >
        <Terminal className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
        <span className="hidden sm:inline">TERMINAL</span>
      </Button>
      <Button
        size="sm"
        variant={mode === "gui" ? "default" : "ghost"}
        onClick={() => onModeChange("gui")}
        className={mode === "gui" ? "bg-primary text-primary-foreground text-xs sm:text-sm" : "text-muted-foreground hover:text-foreground text-xs sm:text-sm"}
      >
        <MonitorDot className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-2" />
        <span className="hidden sm:inline">GUI</span>
      </Button>
    </div>
  );
};
