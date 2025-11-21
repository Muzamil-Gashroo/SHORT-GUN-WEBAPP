import { useState } from "react";
import { TerminalInput } from "@/components/TerminalInput";
import { Button } from "@/components/ui/button";
import { Copy, Check, Terminal } from "lucide-react";
import { toast } from "sonner";
const api_url = import.meta.env.VITE_API_URL;

interface ApiResponse {
  redirectUrl: string;
  qrCodePath: string;
}

export const TerminalMode = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);

  // Boot sequence animation
  useState(() => {
    const timer = setTimeout(() => setBootComplete(true), 1500);
    return () => clearTimeout(timer);
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error("ERROR: URL cannot be empty");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      
      const response = await fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error("Failed to shorten URL");

      const data: ApiResponse = await response.json();
      setResult(data);
      toast.success("URL shortened successfully");
    } catch (error) {
      console.error(error);
      toast.error("ERROR: Failed to connect to server"); //
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (result?.redirectUrl) {
      await navigator.clipboard.writeText(result.redirectUrl);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Boot sequence */}
      {!bootComplete ? (
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 animate-pulse" />
            <span className="terminal-glow">Initializing terminal...</span>
          </div>
          <div className="text-muted-foreground">Loading modules...</div>
          <div className="text-muted-foreground">Establishing connection...</div>
          <div className="text-primary">System ready.</div>
        </div>
      ) : (
        <>
          {/* Welcome message */}
          <div className="mb-6 space-y-2 text-sm">
            <div className="text-primary terminal-glow">&gt; System Online</div>
            <div className="text-muted-foreground">
              URL Shortener v2.1.0 | Quantum Link Generator
            </div>
            <div className="text-muted-foreground">
              Enter target URL to generate compressed link + QR code
            </div>
            <div className="border-b border-border my-4"></div>
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <TerminalInput
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
              prefix="INPUT_URL>"
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 terminal-border-glow font-mono"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-pulse">&gt;&gt;&gt;</span>
                  PROCESSING...
                </span>
              ) : (
                <span>&gt; EXECUTE COMPRESSION</span>
              )}
            </Button>
          </form>

          {/* Results */}
          {result && (
            <div className="mt-8 space-y-6 animate-in fade-in duration-500">
              <div className="border-t border-border pt-6">
                <div className="text-primary terminal-glow mb-4">
                  &gt; OPERATION SUCCESSFUL
                </div>

                {/* Shortened URL */}
                <div className="space-y-2 mb-6">
                  <div className="text-sm text-muted-foreground">
                    OUTPUT_URL:
                  </div>
                  <div className="flex items-center gap-2 bg-input border border-border rounded p-3">
                    <code className="flex-1 text-primary terminal-glow break-all">
                      {result.redirectUrl}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={copyToClipboard}
                      className="hover:bg-secondary shrink-0"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-primary" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* QR Code */}
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">
                    QR_CODE_MATRIX:
                  </div>
                  <div className="flex justify-center p-6 bg-input border border-border rounded terminal-border-glow">
                    <img
                      src={result.qrCodePath}
                      alt="QR Code"
                      className="max-w-full h-auto"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer info */}
          <div className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground space-y-1">
            <div>&gt; STATUS: READY</div>
            <div>&gt; UPTIME: {new Date().toLocaleTimeString()}</div>
          </div>
        </>
      )}
    </>
  );
};
