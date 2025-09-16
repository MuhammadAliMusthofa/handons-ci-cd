import { useState, useEffect } from "react";
import { Zap, Shield, Target, AlertTriangle, CheckCircle } from "lucide-react";
import { CyberCard, CyberCardContent, CyberCardDescription, CyberCardHeader, CyberCardTitle } from "@/components/ui/cyber-card";
import { CyberButton } from "@/components/ui/cyber-button";
import { Progress } from "@/components/ui/progress";

interface Attack {
  id: number;
  type: string;
  source: string;
  strength: number;
  blocked: boolean;
}

export const FirewallDefense = () => {
  const [isDefending, setIsDefending] = useState(false);
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [shieldStrength, setShieldStrength] = useState(100);
  const [attacksBlocked, setAttacksBlocked] = useState(0);
  const [attacksSucceded, setAttacksSucceded] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [level, setLevel] = useState(1);

  const attackTypes = [
    { type: "Brute Force", color: "text-destructive", strength: 20 },
    { type: "DDoS", color: "text-secondary", strength: 30 },
    { type: "SQL Injection", color: "text-cyber-purple", strength: 25 },
    { type: "Port Scan", color: "text-primary", strength: 15 },
    { type: "Malware", color: "text-destructive", strength: 35 }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isDefending) {
      interval = setInterval(() => {
        setGameTime(prev => prev + 1);
        
        // Generate random attacks
        if (Math.random() < 0.3 + (level * 0.1)) {
          const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
          const newAttack: Attack = {
            id: Date.now(),
            type: attackType.type,
            source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
            strength: attackType.strength + Math.floor(Math.random() * 10),
            blocked: false
          };
          
          setAttacks(prev => [...prev.slice(-9), newAttack]);
        }
        
        // Increase level every 30 seconds
        if (gameTime > 0 && gameTime % 30 === 0) {
          setLevel(prev => prev + 1);
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isDefending, gameTime, level]);

  const blockAttack = (attackId: number) => {
    setAttacks(prev => prev.map(attack => 
      attack.id === attackId ? { ...attack, blocked: true } : attack
    ));
    setAttacksBlocked(prev => prev + 1);
  };

  const startDefense = () => {
    setIsDefending(true);
    setAttacks([]);
    setShieldStrength(100);
    setAttacksBlocked(0);
    setAttacksSucceded(0);
    setGameTime(0);
    setLevel(1);
  };

  const stopDefense = () => {
    setIsDefending(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const efficiency = attacksBlocked + attacksSucceded > 0 
    ? Math.round((attacksBlocked / (attacksBlocked + attacksSucceded)) * 100) 
    : 100;

  // Simulate shield damage from unblocked attacks
  useEffect(() => {
    const unblockedAttacks = attacks.filter(attack => !attack.blocked);
    if (unblockedAttacks.length > 0) {
      const damage = unblockedAttacks.reduce((total, attack) => total + attack.strength, 0);
      setShieldStrength(prev => Math.max(0, prev - damage * 0.1));
      setAttacksSucceded(prev => prev + unblockedAttacks.length);
      
      // Remove processed attacks
      setTimeout(() => {
        setAttacks(prev => prev.filter(attack => attack.blocked || attack.id === attacks[attacks.length - 1]?.id));
      }, 2000);
    }
  }, [attacks]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <CyberCard variant="glow">
        <CyberCardHeader>
          <div className="flex items-center gap-3">
            <Zap className="w-8 h-8 text-primary animate-pulse-cyber" />
            <div>
              <CyberCardTitle className="text-2xl">Firewall Defense</CyberCardTitle>
              <CyberCardDescription>
                Defend your system against incoming cyber attacks
              </CyberCardDescription>
            </div>
          </div>
        </CyberCardHeader>
      </CyberCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Control Panel */}
        <CyberCard variant="terminal" scanLines>
          <CyberCardHeader>
            <CyberCardTitle>Defense Control</CyberCardTitle>
          </CyberCardHeader>
          <CyberCardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-mono text-sm">Time:</span>
                <span className="text-primary font-bold">{formatTime(gameTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-sm">Level:</span>
                <span className="text-secondary font-bold">{level}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-sm">Blocked:</span>
                <span className="text-primary font-bold">{attacksBlocked}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-sm">Success:</span>
                <span className="text-destructive font-bold">{attacksSucceded}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-sm">Efficiency:</span>
                <span className="text-cyber-purple font-bold">{efficiency}%</span>
              </div>
            </div>

            {/* Shield Status */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="font-mono text-sm">Shield: {Math.round(shieldStrength)}%</span>
              </div>
              <Progress 
                value={shieldStrength} 
                className="h-3 bg-cyber-darker border border-primary/30"
              />
            </div>

            {/* Control Buttons */}
            <div className="space-y-2">
              {!isDefending ? (
                <CyberButton onClick={startDefense} className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Start Defense
                </CyberButton>
              ) : (
                <CyberButton onClick={stopDefense} variant="danger" className="w-full">
                  <Target className="w-4 h-4 mr-2" />
                  Stop Defense
                </CyberButton>
              )}
            </div>

            {/* XP Display */}
            <div className="p-3 bg-cyber-darker rounded border border-primary/30">
              <div className="flex justify-between">
                <span className="text-sm font-mono">XP Earned:</span>
                <span className="text-primary font-bold">+{attacksBlocked * 75}</span>
              </div>
            </div>
          </CyberCardContent>
        </CyberCard>

        {/* Attack Feed */}
        <CyberCard variant="default" className="lg:col-span-2">
          <CyberCardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <CyberCardTitle>Incoming Attacks</CyberCardTitle>
            </div>
          </CyberCardHeader>
          <CyberCardContent>
            {!isDefending ? (
              <div className="text-center py-8">
                <Shield className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Defense system offline. Click "Start Defense" to begin.</p>
              </div>
            ) : attacks.length === 0 ? (
              <div className="text-center py-8">
                <Target className="w-16 h-16 mx-auto text-primary mb-4 animate-pulse-cyber" />
                <p className="text-primary">Scanning for threats...</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {attacks.map((attack) => (
                  <div
                    key={attack.id}
                    className={`p-4 rounded border transition-all duration-300 ${
                      attack.blocked
                        ? "border-primary bg-primary/10"
                        : "border-destructive bg-destructive/10 animate-pulse"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-sm font-bold ${
                            attack.blocked ? "text-primary" : "text-destructive"
                          }`}>
                            {attack.type}
                          </span>
                          {attack.blocked && <CheckCircle className="w-4 h-4 text-primary" />}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          From: {attack.source} | Strength: {attack.strength}
                        </div>
                      </div>
                      {!attack.blocked && (
                        <CyberButton
                          size="sm"
                          onClick={() => blockAttack(attack.id)}
                          className="ml-4"
                        >
                          <Shield className="w-4 h-4 mr-1" />
                          Block
                        </CyberButton>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CyberCardContent>
        </CyberCard>
      </div>

      {/* Attack Types Guide */}
      <CyberCard variant="default">
        <CyberCardHeader>
          <CyberCardTitle>Attack Types</CyberCardTitle>
          <CyberCardDescription>
            Learn about different cyber attack methods
          </CyberCardDescription>
        </CyberCardHeader>
        <CyberCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {attackTypes.map((attackType, index) => (
              <div
                key={index}
                className="p-4 bg-cyber-dark rounded border border-primary/20 hover:border-primary/50 transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className={`font-mono font-bold ${attackType.color}`}>
                    {attackType.type}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Base Damage: {attackType.strength}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CyberCardContent>
      </CyberCard>
    </div>
  );
};