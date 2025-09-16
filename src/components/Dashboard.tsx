import { useState } from "react";
import { Shield, Lock, Zap, Binary, Trophy, User, Terminal } from "lucide-react";
import { CyberCard, CyberCardContent, CyberCardDescription, CyberCardHeader, CyberCardTitle } from "@/components/ui/cyber-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { PasswordChecker } from "@/components/PasswordChecker";

export const Dashboard = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [userLevel] = useState(7);
  const [userXP] = useState(2450);
  const [nextLevelXP] = useState(3000);

  const modules = [
    {
      id: "password-checker",
      title: "Password Fortress",
      description: "Test password strength against cyber attacks",
      icon: Lock,
      status: "active",
      difficulty: "Beginner",
      xp: 150,
    },
    {
      id: "phishing-sim",
      title: "Phishing Hunter",
      description: "Detect malicious emails in the wild",
      icon: Shield,
      status: "locked",
      difficulty: "Intermediate",
      xp: 300,
    },
    {
      id: "encryption-lab",
      title: "Crypto Lab",
      description: "Explore encryption algorithms",
      icon: Binary,
      status: "locked",
      difficulty: "Advanced",
      xp: 500,
    },
    {
      id: "attack-defense",
      title: "Firewall Defense",
      description: "Defend against brute force attacks",
      icon: Zap,
      status: "locked",
      difficulty: "Expert",
      xp: 750,
    },
  ];

  const achievements = [
    { name: "First Password", icon: "🔐", unlocked: true },
    { name: "Security Novice", icon: "🛡️", unlocked: true },
    { name: "Phishing Expert", icon: "🎣", unlocked: false },
    { name: "Crypto Master", icon: "🔒", unlocked: false },
  ];

  if (activeModule === "password-checker") {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <CyberButton 
              variant="ghost" 
              onClick={() => setActiveModule(null)}
              className="font-mono"
            >
              ← Back to Dashboard
            </CyberButton>
          </div>
          <PasswordChecker />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/30 bg-cyber-dark/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Terminal className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-orbitron font-bold text-primary uppercase tracking-wider">
                  CyberSecAcademy
                </h1>
                <p className="text-sm text-muted-foreground font-mono">
                  Hacker Training Simulation v2.0
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-secondary" />
                  <span className="font-mono text-sm">Level {userLevel} Hacker</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  XP: {userXP}/{nextLevelXP}
                </div>
              </div>
              <div className="w-32 h-2 bg-cyber-dark rounded-full border border-primary/30">
                <div 
                  className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${(userXP / nextLevelXP) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <CyberCard variant="glow" className="relative overflow-hidden">
            <div className="absolute inset-0 hex-grid opacity-10" />
            <CyberCardHeader>
              <CyberCardTitle className="text-3xl animate-typing">
                Welcome, Agent
              </CyberCardTitle>
              <CyberCardDescription className="text-lg">
                Your mission: Master cybersecurity through hands-on simulations
              </CyberCardDescription>
            </CyberCardHeader>
            <CyberCardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{userLevel}</div>
                  <div className="text-sm text-muted-foreground">Current Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">{userXP}</div>
                  <div className="text-sm text-muted-foreground">Total XP</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyber-purple">4</div>
                  <div className="text-sm text-muted-foreground">Modules</div>
                </div>
              </div>
            </CyberCardContent>
          </CyberCard>
        </div>

        {/* Training Modules */}
        <div className="mb-8">
          <h2 className="text-xl font-orbitron font-semibold text-primary mb-6 uppercase tracking-wider">
            Training Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {modules.map((module) => {
              const IconComponent = module.icon;
              const isLocked = module.status === "locked";
              
              return (
                <CyberCard 
                  key={module.id} 
                  variant={isLocked ? "default" : "terminal"}
                  scanLines={!isLocked}
                  className={`transition-all duration-300 hover:scale-[1.02] ${
                    isLocked ? "opacity-60" : "cursor-pointer"
                  }`}
                  onClick={() => !isLocked && setActiveModule(module.id)}
                >
                  <CyberCardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-6 h-6 ${isLocked ? "text-muted-foreground" : "text-primary"}`} />
                        <CyberCardTitle className={isLocked ? "text-muted-foreground" : ""}>
                          {module.title}
                        </CyberCardTitle>
                      </div>
                      {isLocked && <Lock className="w-4 h-4 text-muted-foreground" />}
                    </div>
                    <CyberCardDescription>{module.description}</CyberCardDescription>
                  </CyberCardHeader>
                  <CyberCardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <span className={`text-xs px-2 py-1 rounded border ${
                          isLocked 
                            ? "border-muted-foreground text-muted-foreground" 
                            : "border-secondary text-secondary"
                        }`}>
                          {module.difficulty}
                        </span>
                        <span className={`text-xs font-mono ${
                          isLocked ? "text-muted-foreground" : "text-primary"
                        }`}>
                          +{module.xp} XP
                        </span>
                      </div>
                      {!isLocked && (
                        <CyberButton variant="ghost" size="sm">
                          Enter →
                        </CyberButton>
                      )}
                    </div>
                  </CyberCardContent>
                </CyberCard>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-xl font-orbitron font-semibold text-primary mb-6 uppercase tracking-wider">
            <Trophy className="w-6 h-6 inline mr-2" />
            Achievements
          </h2>
          <CyberCard variant="default">
            <CyberCardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`text-center p-4 rounded border transition-all duration-300 ${
                      achievement.unlocked
                        ? "border-primary bg-primary/10 shadow-cyber"
                        : "border-muted opacity-50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <div className={`text-sm font-mono ${
                      achievement.unlocked ? "text-primary" : "text-muted-foreground"
                    }`}>
                      {achievement.name}
                    </div>
                  </div>
                ))}
              </div>
            </CyberCardContent>
          </CyberCard>
        </div>
      </div>
    </div>
  );
};