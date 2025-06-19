"use client"

import { useState } from "react"
import { Bar, BarChart, ReferenceLine, ResponsiveContainer, YAxis, XAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChartContainer } from "@/components/ui/chart"
import { Plus, Edit3 } from "lucide-react"

const chartConfig = {
  amount: {
    label: "Fakturerat belopp",
    color: "#180f26",
  },
}

export default function Home() {
  const [currentAmount, setCurrentAmount] = useState(125000)
  const [inputValue, setInputValue] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [addedAmount, setAddedAmount] = useState(0)
  const [goalAmount, setGoalAmount] = useState(500000)
  const [isEditingGoal, setIsEditingGoal] = useState(false)
  const [goalInputValue, setGoalInputValue] = useState("")
  const [startingInputValue, setStartingInputValue] = useState("")
  const [isEditingCurrent, setIsEditingCurrent] = useState(false)
  const [currentInputValue, setCurrentInputValue] = useState("")
  
  const data = [
    {
      category: "Fakturor",
      amount: currentAmount,
    },
  ]

  const formatNumberInput = (value: string) => {
    // Remove all non-digit characters
    const numericValue = value.replace(/\D/g, '')
    // Format with Swedish thousand separators (spaces)
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberInput(e.target.value)
    setInputValue(formatted)
  }

  const handleAddAmount = () => {
    // Remove spaces to get the numeric value
    const numericValue = inputValue.replace(/\s/g, '')
    const amount = parseFloat(numericValue)
    if (!isNaN(amount) && amount > 0) {
      setAddedAmount(amount)
      setIsAnimating(true)
      setCurrentAmount(prev => prev + amount)
      setInputValue("")
      
      // Reset animation after 2 seconds
      setTimeout(() => {
        setIsAnimating(false)
        setAddedAmount(0)
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddAmount()
    }
  }

  const handleGoalEdit = () => {
    setIsEditingGoal(true)
    setGoalInputValue(goalAmount.toString())
    setStartingInputValue(currentAmount.toString())
  }

  const handleGoalSave = () => {
    const goalNumericValue = goalInputValue.replace(/\s/g, '')
    const goalAmountValue = parseFloat(goalNumericValue)
    
    const startingNumericValue = startingInputValue.replace(/\s/g, '')
    const startingAmountValue = parseFloat(startingNumericValue)
    
    if (!isNaN(goalAmountValue) && goalAmountValue > 0) {
      setGoalAmount(goalAmountValue)
    }
    
    if (!isNaN(startingAmountValue) && startingAmountValue >= 0) {
      setCurrentAmount(startingAmountValue)
    }
    
    setIsEditingGoal(false)
    setGoalInputValue("")
    setStartingInputValue("")
  }

  const handleGoalCancel = () => {
    setIsEditingGoal(false)
    setGoalInputValue("")
    setStartingInputValue("")
  }

  const handleGoalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberInput(e.target.value)
    setGoalInputValue(formatted)
  }

  const handleStartingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberInput(e.target.value)
    setStartingInputValue(formatted)
  }

  const handleGoalKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleGoalSave()
    } else if (e.key === 'Escape') {
      handleGoalCancel()
    }
  }

  const handleCurrentEdit = () => {
    setIsEditingCurrent(true)
    setCurrentInputValue(currentAmount.toString())
  }

  const handleCurrentSave = () => {
    const numericValue = currentInputValue.replace(/\s/g, '')
    const amount = parseFloat(numericValue)
    if (!isNaN(amount) && amount >= 0) {
      setCurrentAmount(amount)
    }
    setIsEditingCurrent(false)
    setCurrentInputValue("")
  }

  const handleCurrentCancel = () => {
    setIsEditingCurrent(false)
    setCurrentInputValue("")
  }

  const handleCurrentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberInput(e.target.value)
    setCurrentInputValue(formatted)
  }

  const handleCurrentKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCurrentSave()
    } else if (e.key === 'Escape') {
      handleCurrentCancel()
    }
  }

  const progress = (currentAmount / goalAmount) * 100
  const remaining = goalAmount - currentAmount

  return (
    <>
      <style jsx>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          15% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
          85% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-5px) scale(0.95);
          }
        }
        
        @keyframes barShimmer {
          0% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.3);
          }
          100% {
            filter: brightness(1);
          }
        }
        
        .recharts-bar-rectangle {
          mask: linear-gradient(to bottom, white 0%, white calc(100% - 2px), transparent calc(100% - 2px), transparent 100%);
        }
      `}</style>
      <div className="h-screen w-screen p-6 font-[family-name:var(--font-geist-sans)] overflow-hidden" style={{ backgroundColor: "#180f26" }}>
      <div className="h-full max-w-6xl mx-auto flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/rehngruppen-symbol-white.svg" 
              alt="Rehngruppen" 
              className="h-24 w-auto"
            />
          </div>
          <div className="flex items-center justify-center mb-2">
            {/* <Target className="h-4 w-4 text-gray-400 mr-2" /> */}
            <span className="text-lg font-medium text-gray-500 uppercase tracking-wide">
              Rehngruppens Fakturamål Juni 2025
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
          
          {/* Left Panel */}
          <div className="flex flex-col space-y-4">
            
            {/* Stats */}
            <div className="grid grid-cols-1 gap-3">
              <Card 
                className="border border-gray-700 shadow-sm bg-gray-800/50 cursor-pointer hover:bg-gray-800/70 transition-colors"
                onClick={!isEditingCurrent ? handleCurrentEdit : undefined}
              >
                <CardContent className="p-4">
                  {isEditingCurrent ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Nuvarande belopp</label>
                        <Input
                          type="text"
                          value={currentInputValue}
                          onChange={handleCurrentInputChange}
                          onKeyDown={handleCurrentKeyPress}
                          autoFocus
                          className="text-lg font-semibold bg-gray-700 border-gray-600 text-[#6ff6b7]"
                        />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <Button
                          onClick={handleCurrentSave}
                          className="flex-1 text-xs py-1 h-7 bg-transparent border hover:bg-green-900/20 cursor-pointer"
                          style={{ 
                            borderColor: "#6ff6b7",
                            color: "#6ff6b7"
                          }}
                        >
                          Spara
                        </Button>
                        <Button
                          onClick={handleCurrentCancel}
                          className="flex-1 text-xs py-1 h-7 bg-transparent border border-gray-600 text-gray-400 hover:bg-gray-700 cursor-pointer"
                        >
                          Avbryt
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 text-center">
                        Eller tryck Enter för att spara
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="text-3xl font-semibold text-white">
                          {currentAmount.toLocaleString('sv-SE')} kr
                        </div>
                        <Edit3 className="h-5 w-5 text-gray-400 opacity-60" />
                      </div>
                      <p className="text-sm text-gray-400">
                        Nuvarande belopp
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card 
                className="border border-gray-700 shadow-sm bg-gray-800/50 cursor-pointer hover:bg-gray-800/70 transition-colors"
                onClick={!isEditingGoal ? handleGoalEdit : undefined}
              >
                <CardContent className="p-4">
                  {isEditingGoal ? (
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Startbelopp</label>
                        <Input
                          type="text"
                          value={startingInputValue}
                          onChange={handleStartingInputChange}
                          onKeyDown={handleGoalKeyPress}
                          className="text-lg font-semibold bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Målbelopp</label>
                        <Input
                          type="text"
                          value={goalInputValue}
                          onChange={handleGoalInputChange}
                          onKeyDown={handleGoalKeyPress}
                          autoFocus
                          className="text-lg font-semibold bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <Button
                          onClick={handleGoalSave}
                          className="flex-1 text-xs py-1 h-7 bg-transparent border hover:bg-green-900/20 cursor-pointer"
                          style={{ 
                            borderColor: "#6ff6b7",
                            color: "#6ff6b7"
                          }}
                        >
                          Spara
                        </Button>
                        <Button
                          onClick={handleGoalCancel}
                          className="flex-1 text-xs py-1 h-7 bg-transparent border border-gray-600 text-gray-400 hover:bg-gray-700 cursor-pointer"
                        >
                          Avbryt
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 text-center">
                        Eller tryck Enter för att spara
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="text-3xl font-semibold text-white">
                          {goalAmount.toLocaleString('sv-SE')} kr
                        </div>
                        <Edit3 className="h-5 w-5 text-gray-400 opacity-60" />
                      </div>
                      <p className="text-sm text-gray-400">
                        Målbelopp 
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="border border-gray-700 shadow-sm bg-gray-800/50">
                <CardContent className="p-4">
                  <div className="text-3xl font-semibold text-white">
                    {progress.toFixed(1)}%
                  </div>
                  <p className="text-sm text-gray-400">
                    Uppnått
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Input Section */}
            <Card className="border border-gray-700 shadow-sm bg-gray-800/50 flex-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium text-white">
                  Lägg till belopp
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Ange belopp"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className="flex-1 text-sm bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <Button
                    onClick={handleAddAmount}
                    disabled={!inputValue || isNaN(parseFloat(inputValue))}
                    className="px-4 text-sm transition-all duration-200 hover:scale-105 active:scale-95 bg-transparent border-2 hover:bg-green-900/20"
                    style={{ 
                      borderColor: "#6ff6b7",
                      color: "#6ff6b7",
                      cursor: "pointer"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#8cf8c5"
                      e.currentTarget.style.color = "#8cf8c5"
                      e.currentTarget.style.backgroundColor = "rgba(111, 246, 183, 0.1)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#6ff6b7"
                      e.currentTarget.style.color = "#6ff6b7"
                      e.currentTarget.style.backgroundColor = "transparent"
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Lägg till
                  </Button>
                </div>
                
                {remaining <= 0 && (
                  <div className="p-3 bg-green-900/30 border border-green-700 rounded-md">
                    <p className="text-xs font-medium text-green-300">
                      Målet har uppnåtts!
                    </p>
                  </div>
                )}

                {/* Progress Indicator */}
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span>Framsteg mot mål</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${Math.min(progress, 100)}%`,
                        backgroundColor: "#6ff6b7"
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0 kr</span>
                    <span>{goalAmount.toLocaleString('sv-SE')} kr</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>

                    {/* Chart Section */}
          <div className="lg:col-span-2 relative">
            <Card className="h-full border border-gray-700 shadow-sm bg-gray-800/50">
              <CardContent className="p-4 h-full relative">
                <ChartContainer
                  config={chartConfig}
                  className="h-full w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
                      margin={{
                        top: 30,
                        right: 20,
                        left: 60,
                        bottom: 30,
                      }}
                    >
                      <XAxis 
                        dataKey="category" 
                        hide
                      />
                      <YAxis 
                        domain={[0, goalAmount * 1.1]}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                        className="text-xs text-gray-500"
                      />
                      <Bar
                        dataKey="amount"
                        fill="#180f26"
                        stroke="#6ff6b7"
                        strokeWidth={3}
                        radius={[12, 12, 0, 0]}
                        className="transition-all duration-300"
                        style={{
                          filter: isAnimating ? 'brightness(1.3)' : 'brightness(1)',
                          animation: isAnimating ? 'barShimmer 0.8s ease-in-out 2' : 'none'
                        }}
                      />
                      {/* Border for dashes */}
                      <ReferenceLine
                        y={goalAmount}
                        stroke="#180f26"
                        strokeDasharray="30 20"
                        strokeWidth={12}
                      />
                      {/* Main dashed line */}
                      <ReferenceLine
                        y={goalAmount}
                        stroke="#6ff6b7"
                        strokeDasharray="30 20"
                        strokeWidth={8}
                      />
 
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                
                {/* Permanent Goal Amount Display */}
                {currentAmount < goalAmount && (
                  <div className="absolute inset-0 flex items-start justify-center pointer-events-none z-10">
                    <div 
                      className="text-3xl font-bold mt-12 text-gray-600"
                      style={{ 
                        marginLeft: "90px",
                      }}
                    >
                      {goalAmount.toLocaleString('sv-SE')} kr
                    </div>
                  </div>
                )}

                {/* Permanent Current Amount Display */}
                <div className="absolute inset-0 flex items-end justify-center pointer-events-none z-10">
                  <div 
                    className="text-3xl font-bold mb-14"
                    style={{ 
                      color: "#6ff6b7",
                      // fontWeight: "",
                      marginLeft: "90px",
                    }}
                  >
                    {currentAmount.toLocaleString('sv-SE')} kr
                  </div>
                </div>

                {/* Animation Overlay */}
                {isAnimating && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div 
                      className="text-6xl font-bold"
                      style={{ 
                        color: "#6ff6b7",
                        animation: "fadeSlideUp 2s ease-out forwards",
                        fontWeight: "700",
                        animationFillMode: "forwards",
                        marginLeft: "90px"
                      }}
                    >
                      +{addedAmount.toLocaleString('sv-SE')} kr
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
    </>
  )
}
