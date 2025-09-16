import { useState, useEffect } from "react";
import { Eye, EyeOff, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { CyberCard, CyberCardContent, CyberCardDescription, CyberCardHeader, CyberCardTitle } from "@/components/ui/cyber-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface PasswordCriteria {
  name: string;
  met: boolean;
  icon: "check" | "x";
  description: string;
}

export const PasswordChecker = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState("Very Weak");
  const [strengthColor, setStrengthColor] = useState("destructive");
  const [criteria, setCriteria] = useState<PasswordCriteria[]>([]);
  const [xpEarned, setXpEarned] = useState(0);

  const checkPasswordStrength = (pwd: string) => {
    let score = 0;
    const checks: PasswordCriteria[] = [
      {
        name: "Minimum 8 characters",
        met: pwd.length >= 8,
        icon: pwd.length >= 8 ? "check" : "x",
        description: "Longer passwords are harder to crack"
      },
      {
        name: "Contains lowercase",
        met: /[a-z]/.test(pwd),
        icon: /[a-z]/.test(pwd) ? "check" : "x",
        description: "Mix of cases increases complexity"
      },
      {
        name: "Contains uppercase",
        met: /[A-Z]/.test(pwd),
        icon: /[A-Z]/.test(pwd) ? "check" : "x",
        description: "Capital letters add security"
      },
      {
        name: "Contains numbers",
        met: /\d/.test(pwd),
        icon: /\d/.test(pwd) ? "check" : "x",
        description: "Numbers make passwords stronger"
      },
      {
        name: "Contains symbols",
        met: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
        icon: /[!@#$%^&*(),.?":{}|<>]/.test(pwd) ? "check" : "x",
        description: "Special characters boost security"
      },
      {
        name: "No common patterns",
        met: !/(123|abc|password|qwerty)/i.test(pwd),
        icon: !/(123|abc|password|qwerty)/i.test(pwd) ? "check" : "x",
        description: "Avoid predictable sequences"
      },
      {
        name: "Minimum 12 characters",
        met: pwd.length >= 12,
        icon: pwd.length >= 12 ? "check" : "x",
        description: "12+ characters provide excellent protection"
      }
    ];

    score = checks.filter(check => check.met).length;
    setCriteria(checks);

    // Calculate strength percentage and label
    const strengthPercentage = (score / checks.length) * 100;
    setStrength(strengthPercentage);

    if (score <= 2) {
      setStrengthLabel("Very Weak");
      setStrengthColor("destructive");
      setXpEarned(0);
    } else if (score <= 4) {
      setStrengthLabel("Weak");
      setStrengthColor("destructive");
      setXpEarned(25);
    } else if (score <= 5) {
      setStrengthLabel("Fair");
      setStrengthColor("secondary");
      setXpEarned(50);
    } else if (score <= 6) {
      setStrengthLabel("Strong");
      setStrengthColor("primary");
      setXpEarned(100);
    } else {
      setStrengthLabel("Very Strong");
      setStrengthColor("primary");
      setXpEarned(150);
    }
  };

  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  const getStrengthIcon = () => {
    if (strength <= 40) return <XCircle className="w-5 h-5 text-destructive" />;
    if (strength <= 60) return <AlertTriangle className="w-5 h-5 text-secondary" />;
    return <CheckCircle className="w-5 h-5 text-primary" />;
  };

  const tips = [
    "Use a passphrase with random words",
    "Combine letters, numbers, and symbols",
    "Avoid personal information",
    "Use a password manager",
    "Enable two-factor authentication",
    "Update passwords regularly"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <CyberCard variant="glow">
        <CyberCardHeader>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary animate-pulse-cyber" />
            <div>
              <CyberCardTitle className="text-2xl">Password Fortress</CyberCardTitle>
              <CyberCardDescription>
                Test your password against cyber attacks and earn XP
              </CyberCardDescription>
            </div>
          </div>
        </CyberCardHeader>
      </CyberCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Password Input */}
        <CyberCard variant="terminal" scanLines>
          <CyberCardHeader>
            <CyberCardTitle>Password Input</CyberCardTitle>
            <CyberCardDescription>
              Enter a password to analyze its strength
            </CyberCardDescription>
          </CyberCardHeader>
          <CyberCardContent className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password..."
                className="bg-cyber-darker border-cyber-green text-cyber-green font-mono pr-12"
              />
              <CyberButton
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </CyberButton>
            </div>

            {/* Strength Meter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono">Strength:</span>
                <div className="flex items-center gap-2">
                  {getStrengthIcon()}
                  <span className={`text-sm font-mono text-${strengthColor}`}>
                    {strengthLabel}
                  </span>
                </div>
              </div>
              <Progress 
                value={strength} 
                className={`h-3 bg-cyber-darker border border-${strengthColor}/30`}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Weak</span>
                <span>Strong</span>
              </div>
            </div>

            {/* XP Display */}
            <div className="flex items-center justify-between p-3 bg-cyber-darker rounded border border-primary/30">
              <span className="text-sm font-mono">XP Earned:</span>
              <span className="text-primary font-bold">+{xpEarned}</span>
            </div>
          </CyberCardContent>
        </CyberCard>

        {/* Security Analysis */}
        <CyberCard variant="default">
          <CyberCardHeader>
            <CyberCardTitle>Security Analysis</CyberCardTitle>
            <CyberCardDescription>
              Password criteria checklist
            </CyberCardDescription>
          </CyberCardHeader>
          <CyberCardContent>
            <div className="space-y-3">
              {criteria.map((criterion, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded border border-muted">
                  {criterion.icon === "check" ? (
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className={`font-mono text-sm ${
                      criterion.met ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {criterion.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {criterion.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CyberCardContent>
        </CyberCard>
      </div>

      {/* Security Tips */}
      <CyberCard variant="default">
        <CyberCardHeader>
          <CyberCardTitle>Security Tips</CyberCardTitle>
          <CyberCardDescription>
            Pro tips for creating unbreakable passwords
          </CyberCardDescription>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="p-4 bg-cyber-dark rounded border border-primary/20 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <span className="text-primary font-mono text-sm">#{index + 1}</span>
                  <span className="text-sm">{tip}</span>
                </div>
              </div>
            ))}
          </div>
        </CyberCardContent>
      </CyberCard>
    </div>
  );
};