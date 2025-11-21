import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Copy, Check, Link2, QrCode, Zap } from "lucide-react";
import { toast } from "sonner";
const api_url = import.meta.env.VITE_API_URL;


interface ApiResponse {
  redirectUrl: string;
  qrCodePath: string;
}

export const GuiMode = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);
  const [copied, setCopied] = useState(false);

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
    <div className="grid gap-6 md:grid-cols-2">
      {/* Input Card */}
      <Card className="bg-card border-border terminal-border-glow col-span-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary terminal-glow" />
            <CardTitle className="text-primary terminal-glow">URL Compression Engine</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground">
            Enter your URL to generate a shortened link and QR code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-foreground flex items-center gap-2">
                <Link2 className="w-4 h-4 text-primary" />
                Target URL
              </label>
              <Input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
                className="bg-input border-border text-foreground terminal-glow focus-visible:ring-primary focus-visible:border-primary"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 terminal-border-glow font-mono group"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-pulse">PROCESSING</span>
                  <span className="animate-pulse">...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 group-hover:animate-pulse" />
                  COMPRESS URL
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Cards */}
      {result && (
        <>
          {/* Shortened URL Card */}
          <Card className="bg-card border-border terminal-border-glow animate-in fade-in duration-500">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Link2 className="w-5 h-5 text-primary terminal-glow" />
                <CardTitle className="text-primary terminal-glow">Shortened URL</CardTitle>
              </div>
              <CardDescription className="text-muted-foreground">
                Your compressed link is ready
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-input border border-border rounded p-4 terminal-border-glow">
                <code className="text-primary terminal-glow break-all text-sm">
                  {result.redirectUrl}
                </code>
              </div>
              <Button
                onClick={copyToClipboard}
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-mono"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-primary" />
                    COPIED
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    COPY TO CLIPBOARD
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* QR Code Card */}
          <Card className="bg-card border-border terminal-border-glow animate-in fade-in duration-500 delay-100">
            <CardHeader>
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-primary terminal-glow" />
                <CardTitle className="text-primary terminal-glow">QR Code</CardTitle>
              </div>
              <CardDescription className="text-muted-foreground">
                Scan to access your shortened URL
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center p-6 bg-input border border-border rounded terminal-border-glow">
                <img
                  src={result.qrCodePath}
                  alt="QR Code"
                  className="max-w-full h-auto"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Info Card - only show when no results */}
      {!result && (
        <Card className="bg-card border-border terminal-border-glow col-span-full">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex flex-col items-center text-center space-y-2 p-4 bg-input rounded border border-border">
                <Zap className="w-8 h-8 text-primary terminal-glow" />
                <div className="font-mono text-foreground">INSTANT</div>
                <div className="text-muted-foreground text-xs">Lightning-fast URL compression</div>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-4 bg-input rounded border border-border">
                <QrCode className="w-8 h-8 text-primary terminal-glow" />
                <div className="font-mono text-foreground">QR CODE</div>
                <div className="text-muted-foreground text-xs">Auto-generated QR matrix</div>
              </div>
              <div className="flex flex-col items-center text-center space-y-2 p-4 bg-input rounded border border-border">
                <Link2 className="w-8 h-8 text-primary terminal-glow" />
                <div className="font-mono text-foreground">SECURE</div>
                <div className="text-muted-foreground text-xs">Encrypted link generation</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
