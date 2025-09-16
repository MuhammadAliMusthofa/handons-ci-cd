import { useState } from "react";
import { Binary, Key, Lock, Unlock, Copy, RotateCcw } from "lucide-react";
import { CyberCard, CyberCardContent, CyberCardDescription, CyberCardHeader, CyberCardTitle } from "@/components/ui/cyber-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const EncryptionLab = () => {
  const [inputText, setInputText] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [caesarShift, setCaesarShift] = useState(3);
  const [activeMethod, setActiveMethod] = useState("caesar");
  const [xpEarned, setXpEarned] = useState(0);

  const caesarCipher = (text: string, shift: number, decode: boolean = false) => {
    const s = decode ? -shift : shift;
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + s + 26) % 26) + start);
    });
  };

  const base64Encode = (text: string) => {
    return btoa(text);
  };

  const base64Decode = (text: string) => {
    try {
      return atob(text);
    } catch {
      return "Invalid Base64";
    }
  };

  const simpleROT13 = (text: string) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
  };

  const handleEncrypt = () => {
    if (!inputText) return;

    let result = "";
    switch (activeMethod) {
      case "caesar":
        result = caesarCipher(inputText, caesarShift);
        break;
      case "base64":
        result = base64Encode(inputText);
        break;
      case "rot13":
        result = simpleROT13(inputText);
        break;
    }
    
    setEncryptedText(result);
    setXpEarned(prev => prev + 50);
  };

  const handleDecrypt = () => {
    if (!encryptedText) return;

    let result = "";
    switch (activeMethod) {
      case "caesar":
        result = caesarCipher(encryptedText, caesarShift, true);
        break;
      case "base64":
        result = base64Decode(encryptedText);
        break;
      case "rot13":
        result = simpleROT13(encryptedText);
        break;
    }
    
    setDecryptedText(result);
    setXpEarned(prev => prev + 75);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const resetLab = () => {
    setInputText("");
    setEncryptedText("");
    setDecryptedText("");
    setXpEarned(0);
  };

  const methods = [
    { id: "caesar", name: "Caesar Cipher", description: "Classic shift cipher" },
    { id: "base64", name: "Base64", description: "Encoding algorithm" },
    { id: "rot13", name: "ROT13", description: "Simple letter substitution" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <CyberCard variant="glow">
        <CyberCardHeader>
          <div className="flex items-center gap-3">
            <Binary className="w-8 h-8 text-primary animate-pulse-cyber" />
            <div>
              <CyberCardTitle className="text-2xl">Crypto Lab</CyberCardTitle>
              <CyberCardDescription>
                Explore encryption algorithms and cryptographic methods
              </CyberCardDescription>
            </div>
          </div>
        </CyberCardHeader>
      </CyberCard>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Method Selection */}
        <CyberCard variant="terminal" scanLines>
          <CyberCardHeader>
            <CyberCardTitle>Encryption Methods</CyberCardTitle>
          </CyberCardHeader>
          <CyberCardContent className="space-y-4">
            {methods.map((method) => (
              <div
                key={method.id}
                className={`p-3 rounded border cursor-pointer transition-all duration-300 ${
                  activeMethod === method.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted hover:border-primary/50"
                }`}
                onClick={() => setActiveMethod(method.id)}
              >
                <div className="font-mono text-sm font-bold">{method.name}</div>
                <div className="text-xs text-muted-foreground">{method.description}</div>
              </div>
            ))}

            {activeMethod === "caesar" && (
              <div className="space-y-2">
                <label className="text-sm font-mono">Caesar Shift:</label>
                <Input
                  type="number"
                  value={caesarShift}
                  onChange={(e) => setCaesarShift(Number(e.target.value))}
                  min="1"
                  max="25"
                  className="bg-cyber-darker border-cyber-green text-cyber-green font-mono"
                />
              </div>
            )}

            <div className="pt-4 border-t border-muted">
              <div className="flex justify-between text-sm">
                <span className="font-mono">XP Earned:</span>
                <span className="text-primary font-bold">+{xpEarned}</span>
              </div>
            </div>
          </CyberCardContent>
        </CyberCard>

        {/* Input/Output */}
        <CyberCard variant="default" className="lg:col-span-3">
          <CyberCardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                <CyberCardTitle>Encryption Playground</CyberCardTitle>
              </div>
              <CyberButton variant="ghost" size="sm" onClick={resetLab}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </CyberButton>
            </div>
          </CyberCardHeader>
          <CyberCardContent className="space-y-6">
            {/* Input */}
            <div className="space-y-2">
              <label className="text-sm font-mono">Original Text:</label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to encrypt..."
                className="bg-cyber-darker border-cyber-green text-cyber-green font-mono min-h-[100px]"
              />
              <CyberButton onClick={handleEncrypt} disabled={!inputText}>
                <Lock className="w-4 h-4 mr-2" />
                Encrypt
              </CyberButton>
            </div>

            {/* Encrypted Output */}
            {encryptedText && (
              <div className="space-y-2">
                <label className="text-sm font-mono">Encrypted Text:</label>
                <div className="relative">
                  <Textarea
                    value={encryptedText}
                    readOnly
                    className="bg-cyber-dark border-primary text-primary font-mono min-h-[100px]"
                  />
                  <CyberButton
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(encryptedText)}
                  >
                    <Copy className="w-4 h-4" />
                  </CyberButton>
                </div>
                <CyberButton onClick={handleDecrypt}>
                  <Unlock className="w-4 h-4 mr-2" />
                  Decrypt
                </CyberButton>
              </div>
            )}

            {/* Decrypted Output */}
            {decryptedText && (
              <div className="space-y-2">
                <label className="text-sm font-mono">Decrypted Text:</label>
                <div className="relative">
                  <Textarea
                    value={decryptedText}
                    readOnly
                    className="bg-cyber-darker border-secondary text-secondary font-mono min-h-[100px]"
                  />
                  <CyberButton
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(decryptedText)}
                  >
                    <Copy className="w-4 h-4" />
                  </CyberButton>
                </div>
              </div>
            )}
          </CyberCardContent>
        </CyberCard>
      </div>

      {/* Encryption Info */}
      <CyberCard variant="default">
        <CyberCardHeader>
          <CyberCardTitle>Encryption Methods Explained</CyberCardTitle>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-cyber-dark rounded border border-primary/20">
              <h4 className="font-mono font-bold text-primary mb-2">Caesar Cipher</h4>
              <p className="text-sm text-muted-foreground">
                Shifts each letter by a fixed number of positions in the alphabet. Used by Julius Caesar.
              </p>
            </div>
            <div className="p-4 bg-cyber-dark rounded border border-primary/20">
              <h4 className="font-mono font-bold text-primary mb-2">Base64</h4>
              <p className="text-sm text-muted-foreground">
                Encoding scheme that converts binary data to text format using 64 printable characters.
              </p>
            </div>
            <div className="p-4 bg-cyber-dark rounded border border-primary/20">
              <h4 className="font-mono font-bold text-primary mb-2">ROT13</h4>
              <p className="text-sm text-muted-foreground">
                Simple Caesar cipher with shift of 13. Applying ROT13 twice returns the original text.
              </p>
            </div>
          </div>
        </CyberCardContent>
      </CyberCard>
    </div>
  );
};