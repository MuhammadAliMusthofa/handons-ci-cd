import { useState } from "react";
import { Shield, Mail, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { CyberCard, CyberCardContent, CyberCardDescription, CyberCardHeader, CyberCardTitle } from "@/components/ui/cyber-card";
import { CyberButton } from "@/components/ui/cyber-button";

interface Email {
  id: number;
  sender: string;
  subject: string;
  content: string;
  isPhishing: boolean;
  indicators: string[];
}

export const PhishingSimulator = () => {
  const [currentEmail, setCurrentEmail] = useState(0);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState<"correct" | "wrong" | null>(null);

  const emails: Email[] = [
    {
      id: 1,
      sender: "security@payp4l.com",
      subject: "Urgent: Verify Your Account Now!",
      content: "Your account has been suspended due to suspicious activity. Click here to verify: http://payp4l-security.com/verify",
      isPhishing: true,
      indicators: ["Suspicious domain (payp4l vs paypal)", "Urgent language", "Suspicious URL"]
    },
    {
      id: 2,
      sender: "notifications@github.com",
      subject: "Weekly repository digest",
      content: "Here's your weekly summary of activity on your repositories. View your dashboard for more details.",
      isPhishing: false,
      indicators: ["Legitimate sender", "Normal content", "No suspicious links"]
    },
    {
      id: 3,
      sender: "winner@lottery-prizes.net",
      subject: "🎉 Congratulations! You've Won $1,000,000!",
      content: "You've been selected as our lucky winner! Send us your bank details to claim your prize immediately!",
      isPhishing: true,
      indicators: ["Too good to be true", "Requests personal info", "Unknown sender"]
    },
    {
      id: 4,
      sender: "admin@company.com",
      subject: "IT Security Update",
      content: "Please update your password as part of our monthly security routine. Use the company portal as usual.",
      isPhishing: false,
      indicators: ["Internal sender", "Routine security", "No suspicious requests"]
    }
  ];

  const handleDecision = (isSafe: boolean) => {
    const email = emails[currentEmail];
    const isCorrect = isSafe === !email.isPhishing;
    
    setTotalAttempts(prev => prev + 1);
    if (isCorrect) {
      setScore(prev => prev + 1);
      setLastResult("correct");
    } else {
      setLastResult("wrong");
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      setShowResult(false);
      setLastResult(null);
      if (currentEmail < emails.length - 1) {
        setCurrentEmail(prev => prev + 1);
      } else {
        setCurrentEmail(0);
      }
    }, 2000);
  };

  const email = emails[currentEmail];
  const accuracy = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <CyberCard variant="glow">
        <CyberCardHeader>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary animate-pulse-cyber" />
            <div>
              <CyberCardTitle className="text-2xl">Phishing Hunter</CyberCardTitle>
              <CyberCardDescription>
                Identify dangerous emails and protect yourself from cyber attacks
              </CyberCardDescription>
            </div>
          </div>
        </CyberCardHeader>
      </CyberCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Panel */}
        <CyberCard variant="terminal" scanLines>
          <CyberCardHeader>
            <CyberCardTitle>Mission Stats</CyberCardTitle>
          </CyberCardHeader>
          <CyberCardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-mono text-sm">Score:</span>
                <span className="text-primary font-bold">{score}/{totalAttempts}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-sm">Accuracy:</span>
                <span className="text-secondary font-bold">{accuracy}%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-sm">Email:</span>
                <span className="text-cyber-purple font-bold">{currentEmail + 1}/{emails.length}</span>
              </div>
            </div>
            
            {showResult && (
              <div className={`p-3 rounded border text-center ${
                lastResult === "correct" 
                  ? "border-primary bg-primary/10 text-primary" 
                  : "border-destructive bg-destructive/10 text-destructive"
              }`}>
                {lastResult === "correct" ? (
                  <div className="flex items-center gap-2 justify-center">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-mono">Correct! +300 XP</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 justify-center">
                    <XCircle className="w-5 h-5" />
                    <span className="font-mono">Wrong! Try again</span>
                  </div>
                )}
              </div>
            )}
          </CyberCardContent>
        </CyberCard>

        {/* Email Display */}
        <CyberCard variant="default" className="lg:col-span-2">
          <CyberCardHeader>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <CyberCardTitle>Email Analysis</CyberCardTitle>
            </div>
          </CyberCardHeader>
          <CyberCardContent className="space-y-4">
            {/* Email Header */}
            <div className="bg-cyber-dark p-4 rounded border border-primary/20">
              <div className="space-y-2 font-mono text-sm">
                <div><span className="text-muted-foreground">From:</span> <span className="text-primary">{email.sender}</span></div>
                <div><span className="text-muted-foreground">Subject:</span> <span className="text-secondary">{email.subject}</span></div>
              </div>
            </div>

            {/* Email Content */}
            <div className="bg-cyber-darker p-4 rounded border border-muted">
              <p className="text-sm leading-relaxed">{email.content}</p>
            </div>

            {/* Decision Buttons */}
            <div className="flex gap-4 justify-center">
              <CyberButton 
                variant="default" 
                className="bg-primary hover:bg-primary/80"
                onClick={() => handleDecision(true)}
                disabled={showResult}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Safe Email
              </CyberButton>
              <CyberButton 
                variant="danger"
                onClick={() => handleDecision(false)}
                disabled={showResult}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Phishing Attack
              </CyberButton>
            </div>
          </CyberCardContent>
        </CyberCard>
      </div>

      {/* Threat Indicators */}
      <CyberCard variant="default">
        <CyberCardHeader>
          <CyberCardTitle>Threat Indicators</CyberCardTitle>
          <CyberCardDescription>
            Look for these signs to identify phishing attempts
          </CyberCardDescription>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {email.indicators.map((indicator, index) => (
              <div
                key={index}
                className="p-3 bg-cyber-dark rounded border border-primary/20 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <span className="text-primary font-mono text-xs">#{index + 1}</span>
                  <span className="text-sm">{indicator}</span>
                </div>
              </div>
            ))}
          </div>
        </CyberCardContent>
      </CyberCard>
    </div>
  );
};