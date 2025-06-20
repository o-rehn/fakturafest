"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  ReferenceLine,
  ResponsiveContainer,
  YAxis,
  XAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { ChartContainer } from "@/components/ui/chart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const chartConfig = {
  amount: {
    label: "Belopp",
    color: "#180f26",
  },
};

export default function Home() {
  const [currentAmount, setCurrentAmount] = useState(750000);
  const [inputValue, setInputValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [addedAmount, setAddedAmount] = useState(0);
  const [goalAmount, setGoalAmount] = useState(2000000);
  const [goalInputValue, setGoalInputValue] = useState("");
  const [isEditingCurrent, setIsEditingCurrent] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [hasHitTarget, setHasHitTarget] = useState(false);
  const [celebrationPhase, setCelebrationPhase] = useState(0); // 0: confetti, 1: rocket, 2: people

  const data = [
    {
      category: "Fakturering",
      amount: currentAmount,
    },
  ];

  const formatNumberInput = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberInput(e.target.value);
    setInputValue(formatted);
  };

  const handleAddAmount = () => {
    const numericValue = inputValue.replace(/\s/g, "");
    const amount = parseInt(numericValue);
    if (!isNaN(amount) && amount > 0) {
      const newAmount = currentAmount + amount;
      const wasUnderTarget = currentAmount < goalAmount;
      const isNowOverTarget = newAmount >= goalAmount;
      
      setCurrentAmount(newAmount);
      setAddedAmount(amount);
      setInputValue("");
      setIsAnimating(true);
      
      // Check if we just hit the target for the first time
      if (wasUnderTarget && isNowOverTarget && !hasHitTarget) {
        setHasHitTarget(true);
        setIsCelebrating(true);
        setCelebrationPhase(0);
        
        // Phase 1: Confetti & fireworks (4 seconds)
        setTimeout(() => {
          setCelebrationPhase(1);
        }, 4000);
        
        // Phase 2: Saturn message (6 seconds later - extended!)
        setTimeout(() => {
          setCelebrationPhase(2);
        }, 8000);
        
        // Phase 3: People cheering (6 seconds later)
        setTimeout(() => {
          setCelebrationPhase(3);
        }, 14000);
        
        // End celebration (4 seconds later)
        setTimeout(() => {
          setIsCelebrating(false);
          setCelebrationPhase(0);
        }, 18000);
      }
      
      setTimeout(() => {
        setIsAnimating(false);
        setAddedAmount(0);
      }, 4000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddAmount();
    }
  };

  const handleGoalSave = () => {
    const goalNumericValue = goalInputValue.replace(/\s/g, "");
    const goalAmountValue = parseFloat(goalNumericValue);

    if (!isNaN(goalAmountValue) && goalAmountValue > 0) {
      setGoalAmount(goalAmountValue);
    }

    setGoalInputValue("");
  };

  const handleGoalCancel = () => {
    setGoalInputValue("");
  };

  const handleGoalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberInput(e.target.value);
    setGoalInputValue(formatted);
  };

  const handleGoalKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGoalSave();
    } else if (e.key === "Escape") {
      handleGoalCancel();
    }
  };

  const handleCurrentEdit = () => {
    setIsEditingCurrent(true);
    setCurrentInputValue(currentAmount.toString());
  };

  const handleCurrentSave = () => {
    const numericValue = currentInputValue.replace(/\s/g, "");
    const amount = parseFloat(numericValue);
    if (!isNaN(amount) && amount >= 0) {
      setCurrentAmount(amount);
    }
    setIsEditingCurrent(false);
    setCurrentInputValue("");
  };

  const handleCurrentCancel = () => {
    setIsEditingCurrent(false);
    setCurrentInputValue("");
  };

  const handleCurrentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberInput(e.target.value);
    setCurrentInputValue(formatted);
  };

  const handleCurrentKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCurrentSave();
    } else if (e.key === "Escape") {
      handleCurrentCancel();
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          8% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
          92% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
        }

        @keyframes barShimmer {
          0% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.2);
          }
          100% {
            filter: brightness(1);
          }
        }

        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes firework {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.5) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0) scale(1);
          }
          40%, 43% {
            transform: translate3d(0,-30px,0) scale(1.1);
          }
          70% {
            transform: translate3d(0,-15px,0) scale(1.05);
          }
          90% {
            transform: translate3d(0,-4px,0) scale(1.02);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(111, 246, 183, 0.7);
          }
          70% {
            transform: scale(1.05);
            box-shadow: 0 0 0 20px rgba(111, 246, 183, 0);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(111, 246, 183, 0);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes screenShake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-2px, -2px) rotate(-0.5deg); }
          20% { transform: translate(-4px, 0px) rotate(0.5deg); }
          30% { transform: translate(4px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(0.5deg); }
          50% { transform: translate(-1px, 2px) rotate(-0.5deg); }
          60% { transform: translate(-4px, 1px) rotate(0deg); }
          70% { transform: translate(2px, 1px) rotate(-0.5deg); }
          80% { transform: translate(-2px, -1px) rotate(0.5deg); }
          90% { transform: translate(2px, 2px) rotate(0deg); }
        }

        .celebration-bg {
          background: linear-gradient(-45deg, #ff6b6b, #4ecdc4, #45b7d1, #f9ca24, #f0932b, #eb4d4b, #6c5ce7, #a29bfe);
          background-size: 400% 400%;
          animation: rainbow 2s ease infinite;
        }

        .confetti {
          animation: confettiFall 3s linear infinite;
        }

        .firework {
          animation: firework 1s ease-out infinite;
        }

        .sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }

        .bounce {
          animation: bounce 2s infinite;
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        .shake {
          animation: screenShake 0.5s ease-in-out infinite;
        }

        @keyframes rocketLaunch {
          0% {
            transform: translateX(-50%) translateY(0) scale(1);
          }
          100% {
            transform: translateX(-50%) translateY(-120vh) scale(0.3);
          }
        }

        @keyframes flameFlicker {
          0% {
            opacity: 0.6;
            transform: translateX(-50%) scaleY(1);
          }
          100% {
            opacity: 0.9;
            transform: translateX(-50%) scaleY(1.2);
          }
        }

        @keyframes rocketToSaturn {
          0% {
            transform: translateX(-200px) translateY(100px) scale(1.5) rotate(-15deg);
            opacity: 0.9;
          }
          20% {
            transform: translateX(-100px) translateY(50px) scale(1.8) rotate(-8deg);
            opacity: 1;
          }
          40% {
            transform: translateX(0px) translateY(0px) scale(2.2) rotate(0deg);
            opacity: 1;
          }
          60% {
            transform: translateX(100px) translateY(-50px) scale(1.8) rotate(8deg);
            opacity: 1;
          }
          80% {
            transform: translateX(200px) translateY(-100px) scale(1.5) rotate(15deg);
            opacity: 0.9;
          }
          100% {
            transform: translateX(400px) translateY(-200px) scale(1) rotate(25deg);
            opacity: 0.3;
          }
        }

        @keyframes logoSpin {
          0% {
            transform: rotate(0deg) scale(1);
            filter: brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.5));
          }
          25% {
            transform: rotate(90deg) scale(1.1);
            filter: brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.8));
          }
          50% {
            transform: rotate(180deg) scale(1.2);
            filter: brightness(1.4) drop-shadow(0 0 30px rgba(255,255,255,1));
          }
          75% {
            transform: rotate(270deg) scale(1.1);
            filter: brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.8));
          }
          100% {
            transform: rotate(360deg) scale(1);
            filter: brightness(1) drop-shadow(0 0 10px rgba(255,255,255,0.5));
          }
        }
      `}</style>

      <div className={`h-screen w-full font-[family-name:var(--font-geist-sans)] ${isCelebrating ? 'celebration-bg shake' : 'bg-slate-50'}`}>
        {/* MASSIVE CELEBRATION OVERLAY */}
        {isCelebrating && (
          <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
            
            {/* PHASE 1: Confetti & Fireworks */}
            {celebrationPhase === 0 && (
              <>
                {/* Confetti Rain */}
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={`confetti-${i}`}
                    className="confetti absolute w-3 h-3 opacity-90"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${2 + Math.random() * 2}s`,
                      backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#6ff6b7'][Math.floor(Math.random() * 9)],
                      borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                    }}
                  />
                ))}

                {/* Fireworks */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={`firework-${i}`}
                    className="firework absolute"
                    style={{
                      left: `${10 + Math.random() * 80}%`,
                      top: `${10 + Math.random() * 60}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random()}s`,
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"></div>
                    {Array.from({ length: 8 }).map((_, j) => (
                      <div
                        key={j}
                        className="absolute w-1 h-8 bg-gradient-to-t from-transparent to-white"
                        style={{
                          transformOrigin: 'bottom center',
                          transform: `rotate(${j * 45}deg) translateY(-20px)`,
                          animationDelay: `${0.5 + Math.random() * 0.5}s`,
                        }}
                      />
                    ))}
                  </div>
                ))}

                {/* Sparkles */}
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={`sparkle-${i}`}
                    className="sparkle absolute"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  >
                    <div className="w-2 h-2 bg-white transform rotate-45" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}></div>
                  </div>
                ))}

                {/* Giant Success Message - Super Prominent */}
                <div className="absolute inset-0 flex items-center justify-center z-30">
                  <div className="text-center bounce bg-black bg-opacity-60 px-12 py-8 rounded-3xl border-4 border-white">
                    <div 
                      className="text-9xl font-black text-white mb-6 drop-shadow-2xl" 
                      style={{ 
                        textShadow: '6px 6px 12px rgba(0,0,0,0.8), 0 0 30px rgba(255,255,255,1), 0 0 60px rgba(255,255,255,0.5)',
                        filter: 'brightness(1.3) contrast(1.2)'
                      }}
                    >
                      🎉 GRATTIS! 🎉
                    </div>
                    <div 
                      className="text-7xl font-black text-yellow-300 mb-4 drop-shadow-xl"
                      style={{ 
                        textShadow: '4px 4px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,0,0.8)',
                        filter: 'brightness(1.2)'
                      }}
                    >
                      MÅL UPPNÅTT!
                    </div>
                    <div 
                      className="text-4xl font-bold text-green-300 mb-4 drop-shadow-lg"
                      style={{ 
                        textShadow: '2px 2px 6px rgba(0,0,0,0.8), 0 0 15px rgba(0,255,0,0.6)'
                      }}
                    >
                      {currentAmount.toLocaleString("sv-SE")} kr / {goalAmount.toLocaleString("sv-SE")} kr
                    </div>
                    <div 
                      className="text-3xl font-bold text-white mt-4 drop-shadow-lg"
                      style={{ 
                        textShadow: '3px 3px 8px rgba(0,0,0,0.8), 0 0 20px rgba(255,255,255,0.8)'
                      }}
                    >
                      🚀 FANTASTISKT JOBBAT! 🚀
                    </div>
                  </div>
                </div>

                {/* Floating Emojis */}
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={`emoji-${i}`}
                    className="absolute text-6xl bounce"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1.5 + Math.random()}s`,
                    }}
                  >
                    {['🎊', '🎉', '🥳', '🎈', '🏆', '⭐', '💫', '✨', '🌟', '🎯', '💰', '🔥', '👏', '🙌', '💪'][Math.floor(Math.random() * 15)]}
                  </div>
                ))}
              </>
            )}

            {/* PHASE 2: Rocket Launch */}
            {celebrationPhase === 1 && (
              <>
                {/* Space Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-blue-900 to-black">
                  {/* Stars */}
                  {Array.from({ length: 200 }).map((_, i) => (
                    <div
                      key={`star-${i}`}
                      className="absolute w-1 h-1 bg-white rounded-full sparkle"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Rocket */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ animation: 'rocketLaunch 4s ease-out forwards' }}>
                  <div className="text-9xl">🚀</div>
                  {/* Rocket Trail */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-8 h-32 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent opacity-80 rounded-full" style={{ animation: 'flameFlicker 0.2s infinite alternate' }}></div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-4 h-40 bg-gradient-to-t from-red-500 via-orange-400 to-transparent opacity-60 rounded-full" style={{ animation: 'flameFlicker 0.15s infinite alternate-reverse' }}></div>
                </div>

                {/* Launch Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bounce">
                    <div className="text-7xl font-black text-white mb-4 drop-shadow-2xl">
                      🚀 LIFTOFF! 🚀
                    </div>
                    <div className="text-4xl font-bold text-yellow-300 drop-shadow-xl">
                      Till månen och tillbaka!
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* PHASE 2: Saturn Message */}
            {celebrationPhase === 2 && (
              <>
                {/* Space Background with Saturn */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-indigo-900 to-black">
                  {/* Stars */}
                  {Array.from({ length: 150 }).map((_, i) => (
                    <div
                      key={`saturn-star-${i}`}
                      className="absolute w-1 h-1 bg-white rounded-full sparkle"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                      }}
                    />
                  ))}
                  
                  {/* Saturn Planet */}
                  <div className="absolute top-1/4 right-1/4 text-9xl bounce">🪐</div>
                  
                  {/* Traveling Rocket - Continuous Journey */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20" style={{ animation: 'rocketToSaturn 6s ease-out forwards' }}>
                    <div className="text-9xl drop-shadow-2xl" style={{ filter: 'brightness(1.2) contrast(1.1)' }}>🚀</div>
                    {/* Enhanced Rocket Trail */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-8 h-32 bg-gradient-to-t from-orange-500 via-yellow-400 to-transparent opacity-90 rounded-full" style={{ animation: 'flameFlicker 0.2s infinite alternate' }}></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-4 h-40 bg-gradient-to-t from-red-500 via-orange-400 to-transparent opacity-80 rounded-full" style={{ animation: 'flameFlicker 0.15s infinite alternate-reverse' }}></div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-48 bg-gradient-to-t from-white via-yellow-300 to-transparent opacity-60 rounded-full" style={{ animation: 'flameFlicker 0.1s infinite alternate' }}></div>
                  </div>
                  
                  {/* Asteroid Belt */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`asteroid-${i}`}
                      className="absolute text-2xl sparkle"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${30 + Math.random() * 40}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random()}s`,
                      }}
                    >
                      🪨
                    </div>
                  ))}
                </div>

                {/* Epic Saturn Message */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center bounce">
                    <div className="text-6xl font-black text-white mb-4 drop-shadow-2xl">
                      Fuck it! 🪐
                    </div>
                    <div className="text-5xl font-bold text-yellow-300 mb-2 drop-shadow-xl">
                      Vi kör Saturnus istället!
                    </div>
                    <div className="text-3xl font-semibold text-purple-300 drop-shadow-lg">
                      Inget mål är för stort för oss! 🚀
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* PHASE 3: People Celebrating */}
            {celebrationPhase === 3 && (
              <>
                {/* Office Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-green-100">
                  {/* Floating Success Bubbles */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={`bubble-${i}`}
                      className="absolute rounded-full bg-gradient-to-r from-green-400 to-blue-500 opacity-20"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${20 + Math.random() * 60}px`,
                        height: `${20 + Math.random() * 60}px`,
                        animation: `bounce ${1 + Math.random()}s infinite`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>

                {/* People Celebrating - Adjusted Team */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-4 gap-6 text-center">
                    {/* Row 1 - Mostly white with some diversity */}
                    <div className="bounce text-7xl" style={{ animationDelay: '0s' }}>🙋🏻‍♂️</div>
                    <div className="bounce text-7xl" style={{ animationDelay: '0.2s' }}>🙋🏻‍♀️</div>
                    <div className="bounce text-7xl" style={{ animationDelay: '0.4s' }}>🙋🏿‍♂️</div>
                    <div className="bounce text-7xl" style={{ animationDelay: '0.6s' }}>🙋🏻‍♀️</div>
                    
                    {/* Row 2 - More celebration */}
                    <div className="bounce text-7xl" style={{ animationDelay: '0.8s' }}>🙌🏻</div>
                    <div className="bounce text-8xl" style={{ animationDelay: '1s' }}>🎉</div>
                    <div className="bounce text-7xl" style={{ animationDelay: '1.2s' }}>🙌🏻</div>
                    <div className="bounce text-7xl" style={{ animationDelay: '1.4s' }}>✋🏻</div>
                    
                    {/* Row 3 - High fives and celebration */}
                    <div className="bounce text-7xl" style={{ animationDelay: '1.6s' }}>🤝🏻</div>
                    <div className="bounce text-7xl" style={{ animationDelay: '1.8s' }}>👏🏻</div>
                    <div className="bounce text-7xl" style={{ animationDelay: '2s' }}>🥳</div>
                    <div className="bounce text-7xl" style={{ animationDelay: '2.2s' }}>🤝🏿</div>
                    
                    {/* Row 4 - Professional team */}
                    <div className="bounce text-7xl" style={{ animationDelay: '2.4s' }}>👨🏻‍💼</div>
                    <div className="bounce text-7xl" style={{ animationDelay: '2.6s' }}>👩🏻‍💼</div>
                    <div className="bounce text-7xl" style={{ animationDelay: '2.8s' }}>👨🏻‍💼</div>
                    <div className="bounce text-7xl" style={{ animationDelay: '3s' }}>👩🏻‍💼</div>
                  </div>
                </div>

                {/* SCREEN-DOMINATING REHNGRUPPEN LOGO */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {/* MASSIVE SCREEN-FILLING Logo */}
                  <div className="mb-8 flex justify-center w-full">
                    <div 
                      className="w-[90vw] h-[40vh] bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-3xl p-8 flex items-center justify-center border-8 border-white shadow-2xl"
                      style={{ 
                        animation: 'logoSpin 4s ease-in-out infinite',
                        boxShadow: '0 0 100px rgba(255,255,255,1), 0 0 200px rgba(255,255,255,0.8), inset 0 0 50px rgba(255,255,255,0.3)'
                      }}
                    >
                      <img 
                        src="/rehngruppen-logo-white.svg" 
                        alt="Rehngruppen Logo" 
                        className="w-full h-full object-contain"
                        style={{ 
                          filter: 'brightness(4) contrast(2) drop-shadow(0 0 20px rgba(255,255,255,1)) drop-shadow(0 0 40px rgba(255,255,255,0.8))',
                          transform: 'scale(1.1)'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Supporting Text Below */}
                  <div className="text-center z-10">
                    <div className="text-4xl font-black text-green-600 mb-2 drop-shadow-xl bounce">
                      TEAM REHNGRUPPEN!
                    </div>
                    <div className="text-2xl font-bold text-blue-600 drop-shadow-lg">
                      Vi gjorde det tillsammans! 🏆
                    </div>
                  </div>
                </div>

                {/* Cheering Sound Effect Simulation */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="text-3xl font-bold text-purple-600 bounce">
                    🎺 HOORAY! WOOHOO! YEAH! 🎺
                  </div>
                </div>
              </>
            )}

            {/* Pulsing Border (all phases) */}
            <div className="absolute inset-4 border-8 border-white rounded-3xl pulse opacity-50"></div>
            <div className="absolute inset-8 border-4 border-yellow-400 rounded-2xl pulse opacity-70" style={{ animationDelay: '0.5s' }}></div>
          </div>
        )}

        <div className="h-full max-w-7xl mx-auto p-8 flex gap-8">
          {/* Left Sidebar */}
          <div className="w-80 flex-shrink-0 space-y-6">
            {/* Stats Cards */}
            <div className="space-y-4">
              <Card className="border border-slate-200 bg-white">
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-slate-600 mb-2">
                    Målbelopp
                  </div>
                  <div className="text-3xl font-bold text-slate-900">
                    {goalAmount.toLocaleString("sv-SE")} kr
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200 bg-white">
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-slate-600 mb-2">
                    Kvar till mål
                  </div>
                  <div className="text-3xl font-bold text-slate-900">
                    {Math.max(0, goalAmount - currentAmount).toLocaleString(
                      "sv-SE"
                    )}{" "}
                    kr
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls */}
            <Card className="border border-slate-200 bg-white relative">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 cursor-pointer h-8 w-8 text-slate-700 z-10"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="w-96 bg-white border-slate-200"
                >
                  <SheetHeader className="border-b border-slate-200 pb-6 px-6 pt-6">
                    <SheetTitle className="text-slate-900 text-xl font-semibold">
                      Inställningar
                    </SheetTitle>
                  </SheetHeader>

                  <div className="p-6 space-y-8">
                    {/* Current Amount Section */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-base font-medium text-slate-900 block mb-2">
                          Nuvarande belopp
                        </label>
                        <p className="text-sm text-slate-600 mb-4">
                          Ange det aktuella fakturerade beloppet
                        </p>
                      </div>
                      <Input
                        type="text"
                        value={currentInputValue}
                        onChange={handleCurrentInputChange}
                        onKeyDown={handleCurrentKeyPress}
                        className="h-12 text-base border-slate-300 focus:border-[#6ff6b7] focus:ring-[#6ff6b7]"
                        placeholder={currentAmount.toLocaleString("sv-SE")}
                        onFocus={() => {
                          if (!currentInputValue) {
                            setCurrentInputValue(currentAmount.toString());
                          }
                        }}
                        onBlur={handleCurrentSave}
                      />
                      <div className="flex gap-3">
                        <Button
                          onClick={handleCurrentSave}
                          variant="outline"
                          className="flex-1 h-10 border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                          Spara
                        </Button>
                        <Button
                          onClick={handleCurrentCancel}
                          variant="outline"
                          className="flex-1 h-10 border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                          Återställ
                        </Button>
                      </div>
                    </div>

                    {/* Goal Amount Section */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-base font-medium text-slate-900 block mb-2">
                          Målbelopp
                        </label>
                        <p className="text-sm text-slate-600 mb-4">
                          Sätt målet för totala faktureringar
                        </p>
                      </div>
                      <Input
                        type="text"
                        value={goalInputValue}
                        onChange={handleGoalInputChange}
                        onKeyDown={handleGoalKeyPress}
                        className="h-12 text-base border-slate-300 focus:border-[#6ff6b7] focus:ring-[#6ff6b7]"
                        placeholder={goalAmount.toLocaleString("sv-SE")}
                        onFocus={() => {
                          if (!goalInputValue) {
                            setGoalInputValue(goalAmount.toString());
                          }
                        }}
                        onBlur={handleGoalSave}
                      />
                      <div className="flex gap-3">
                        <Button
                          onClick={handleGoalSave}
                          variant="outline"
                          className="flex-1 h-10 border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                          Spara
                        </Button>
                        <Button
                          onClick={handleGoalCancel}
                          variant="outline"
                          className="flex-1 h-10 border-slate-300 text-slate-700 hover:bg-slate-50"
                        >
                          Återställ
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-3 block">
                    Lägg till belopp
                  </label>
                  <Input
                    type="text"
                    placeholder="Ange belopp"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="h-12 text-base border-slate-300 focus:border-[#6ff6b7] focus:ring-[#6ff6b7]"
                  />
                </div>

                <Button
                  onClick={handleAddAmount}
                  variant="outline"
                  className="w-full h-12 border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Lägg till
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Chart Section */}
          <div className="flex-1 min-h-0">
            <Card className="h-full border border-slate-200 bg-white">
              <CardContent className="p-8 h-full relative">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
                      margin={{
                        top: 40,
                        right: 20,
                        left: 60,
                        bottom: 40,
                      }}
                    >
                      <XAxis dataKey="category" hide />
                      <YAxis
                        domain={[0, goalAmount * 1.1]}
                        ticks={[
                          0,
                          goalAmount * 0.25,
                          goalAmount * 0.5,
                          goalAmount * 0.75,
                          goalAmount,
                          goalAmount * 1.1,
                        ]}
                        tickFormatter={(value) =>
                          `${(value / 1000).toFixed(0)}k`
                        }
                        tick={(props) => {
                          const { x, y, payload } = props;
                          const isGoal = payload.value === goalAmount;
                          return (
                            <text
                              x={x}
                              y={y}
                              fill={isGoal ? "#6ff6b7" : "#64748b"}
                              fontSize={isGoal ? 14 : 13}
                              fontWeight={isGoal ? 600 : 500}
                              textAnchor="end"
                              dy="0.32em"
                            >
                              {`${(payload.value / 1000).toFixed(0)}k`}
                            </text>
                          );
                        }}
                        axisLine={{ stroke: "#e2e8f0", strokeWidth: 1 }}
                        tickLine={{ stroke: "#e2e8f0", strokeWidth: 1 }}
                      />
                      <Bar
                        dataKey="amount"
                        fill="#180f26"
                        stroke="none"
                        radius={[8, 8, 0, 0]}
                        className="transition-all duration-500"
                        style={{
                          filter: isAnimating
                            ? "brightness(1.1)"
                            : "brightness(1)",
                          animation: isAnimating
                            ? "barShimmer 2s ease-in-out 2"
                            : "none",
                        }}
                      />
                      <ReferenceLine
                        y={goalAmount}
                        stroke="#180f26"
                        strokeDasharray="8 4"
                        strokeWidth={2}
                        opacity={0.8}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>

                {/* Current Amount Display or Mission Accomplished */}
                {currentAmount >= goalAmount && hasHitTarget && !isCelebrating ? (
                  // Mission Accomplished - shown after celebration ends
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="text-center">
                      <div
                        className="text-3xl font-bold mb-2 px-4 py-2 rounded-lg"
                        style={{
                          color: "#6ff6b7",
                          backgroundColor: "#180f26",
                          marginLeft: "60px",
                        }}
                      >
                        MISSION ACCOMPLISHED
                      </div>
                      <div
                        className="text-2xl font-semibold px-4 py-2 rounded-lg"
                        style={{
                          color: "white",
                          backgroundColor: "#180f26",
                          marginLeft: "60px",
                        }}
                      >
                        {currentAmount.toLocaleString("sv-SE")} kr / {goalAmount.toLocaleString("sv-SE")} kr
                      </div>
                    </div>
                  </div>
                ) : currentAmount / goalAmount > 0.15 && currentAmount < goalAmount ? (
                  // Regular current amount display - only show if under target
                  <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10">
                    <div
                      className="text-3xl font-semibold mb-12 px-3 py-1 rounded-md"
                      style={{
                        color: "white",
                        backgroundColor: "#180f26",
                        marginLeft: "60px",
                      }}
                    >
                      {currentAmount.toLocaleString("sv-SE")} kr
                    </div>
                  </div>
                ) : null}

                {/* Animation Overlay */}
                {isAnimating && (
                  <div
                    className="absolute pointer-events-none z-10"
                    style={{
                      top:
                        currentAmount / goalAmount >= 0.6
                          ? `${100 - (currentAmount / goalAmount) * 100 + 25}%`
                          : `${Math.max(
                              8,
                              (100 - (currentAmount / goalAmount) * 100) / 2
                            )}%`,
                      left: "50%",
                      transform: "translateX(-50%)",
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <div
                      className="text-4xl font-bold whitespace-nowrap px-3 py-1 rounded-md"
                      style={{
                        color: "#6ff6b7",
                        backgroundColor: "#180f26",
                        animation: "fadeSlideUp 4s ease-out forwards",
                        marginLeft: "60px",
                      }}
                    >
                      +{addedAmount.toLocaleString("sv-SE")} kr
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

