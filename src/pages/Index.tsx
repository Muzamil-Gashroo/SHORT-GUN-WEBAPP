import { useState } from "react";
import { TerminalWindow } from "@/components/TerminalWindow";
import { TerminalMode } from "@/components/TerminalMode";
import { GuiMode } from "@/components/GuiMode";
import { ModeToggle } from "@/components/ModeToggle";

const Index = () => {
  const [mode, setMode] = useState<"terminal" | "gui">("terminal");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full">
        {/* ASCII Art Header - Responsive */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 terminal-glow">
          {/* Mobile: Simple text */}
          <div className="block sm:hidden">
            <h1 className="text-primary text-2xl font-bold tracking-wider terminal-glow">
              URL SHORTENER
            </h1>
            <div className="text-muted-foreground text-xs mt-2">Quantum Link Generator</div>
          </div>
          
          {/* Tablet and Desktop: Full ASCII art */}
          <pre className="hidden sm:block text-primary text-[0.4rem] sm:text-[0.5rem] md:text-xs lg:text-sm overflow-x-auto">
{`
 ██╗   ██╗██████╗ ██╗         ███████╗██╗  ██╗ ██████╗ ██████╗ ████████╗███████╗███╗   ██╗███████╗██████╗ 
 ██║   ██║██╔══██╗██║         ██╔════╝██║  ██║██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝████╗  ██║██╔════╝██╔══██╗
 ██║   ██║██████╔╝██║         ███████╗███████║██║   ██║██████╔╝   ██║   █████╗  ██╔██╗ ██║█████╗  ██████╔╝
 ██║   ██║██╔══██╗██║         ╚════██║██╔══██║██║   ██║██╔══██╗   ██║   ██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗
 ╚██████╔╝██║  ██║███████╗    ███████║██║  ██║╚██████╔╝██║  ██║   ██║   ███████╗██║ ╚████║███████╗██║  ██║
  ╚═════╝ ╚═╝  ╚═╝╚══════╝    ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
`}
          </pre>
        </div>

        {/* Mode Toggle - Responsive */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <ModeToggle mode={mode} onModeChange={setMode} />
        </div>

        {/* Content based on mode */}
        {mode === "terminal" ? (
          <TerminalWindow>
            <TerminalMode />
          </TerminalWindow>
        ) : (
          <div className="w-full max-w-4xl mx-auto">
            <GuiMode />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
