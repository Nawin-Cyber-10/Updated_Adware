"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { StatusIndicator } from "@/components/status-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { X, AlertTriangle, Info, Eye, Play, Square, RotateCcw } from "lucide-react"

export default function PopupAdsSimulator() {
  const [popups, setPopups] = useState<Array<{ id: number; type: string; content: string; educational: string }>>([])
  const [simulationActive, setSimulationActive] = useState(false)
  const [showEducationalOverlay, setShowEducationalOverlay] = useState(false)
  const [popupCount, setPopupCount] = useState(0)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(30)

  const popupTypes = [
    {
      type: "fake-warning",
      content: "🚨 CRITICAL SECURITY ALERT: Your system has been compromised! Immediate action required.",
      educational:
        "Fake security warnings use urgent language and false claims to create panic and prompt hasty decisions.",
    },
    {
      type: "prize-scam",
      content: "🎉 CONGRATULATIONS! You're our 1,000,000th visitor! Claim your $5000 Amazon gift card now!",
      educational: "Prize scams exploit excitement and greed, often targeting users with unrealistic rewards.",
    },
    {
      type: "fake-update",
      content: "⚠️ URGENT: Critical browser security update required. Your data is at risk without this update.",
      educational:
        "Fake update notifications mimic legitimate software updates to trick users into downloading malware.",
    },
    {
      type: "survey-scam",
      content: "📊 Quick Survey: Answer 3 questions about your browsing habits and win the latest iPhone 15 Pro!",
      educational: "Survey scams collect personal information under the guise of market research or prize eligibility.",
    },
    {
      type: "tech-support",
      content: "🔧 Microsoft Support: We've detected suspicious activity. Call +1-800-FAKE-NUM immediately!",
      educational: "Tech support scams impersonate legitimate companies to gain remote access to victims' computers.",
    },
  ]

  const createPopup = () => {
    const randomType = popupTypes[Math.floor(Math.random() * popupTypes.length)]
    const newPopup = {
      id: Date.now() + Math.random(),
      type: randomType.type,
      content: randomType.content,
      educational: randomType.educational,
    }
    setPopups((prev) => [...prev, newPopup])
    setPopupCount((prev) => prev + 1)
  }

  const closePopup = (id: number) => {
    setPopups((prev) => prev.filter((popup) => popup.id !== id))
  }

  const startSimulation = () => {
    setSimulationActive(true)
    setPopupCount(0)
    setSimulationProgress(0)
    setTimeRemaining(30)

    // Create initial popup
    setTimeout(createPopup, 1000)

    // Create more popups at intervals
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        createPopup()
      }
    }, 2500)

    // Progress and countdown
    const progressInterval = setInterval(() => {
      setSimulationProgress((prev) => {
        const newProgress = prev + 100 / 30
        return newProgress > 100 ? 100 : newProgress
      })
      setTimeRemaining((prev) => {
        const newTime = prev - 1
        return newTime < 0 ? 0 : newTime
      })
    }, 1000)

    // Stop after 30 seconds
    setTimeout(() => {
      setSimulationActive(false)
      clearInterval(interval)
      clearInterval(progressInterval)
      setSimulationProgress(100)
      setTimeRemaining(0)
    }, 30000)
  }

  const stopSimulation = () => {
    setSimulationActive(false)
    setPopups([])
    setSimulationProgress(0)
    setTimeRemaining(30)
  }

  const resetSimulation = () => {
    setSimulationActive(false)
    setPopups([])
    setPopupCount(0)
    setSimulationProgress(0)
    setTimeRemaining(30)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
      <NavigationHeader currentPage="simulations" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Pop-up Advertisement Simulator</h1>
              <p className="text-gray-400">Experience and learn to identify intrusive adware pop-ups</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowEducationalOverlay(true)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Info className="h-4 w-4 mr-2" />
              Learning Guide
            </Button>
          </div>
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20">
            Educational Simulation • Beginner Level
          </Badge>
        </div>

        {/* Status Indicator */}
        <StatusIndicator
          status={simulationActive ? "danger" : "safe"}
          title={simulationActive ? "Simulation Active" : "Safe Environment"}
          description={
            simulationActive
              ? `Experiencing simulated adware pop-ups • ${popupCount} pop-ups encountered • ${timeRemaining}s remaining`
              : "Ready to begin pop-up adware simulation"
          }
          className="mb-8"
        />

        {/* Control Panel */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Simulation Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              <Button onClick={startSimulation} disabled={simulationActive} className="bg-red-600 hover:bg-red-700">
                <Play className="h-4 w-4 mr-2" />
                Start Simulation
              </Button>
              <Button
                onClick={stopSimulation}
                disabled={!simulationActive}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <Square className="h-4 w-4 mr-2" />
                Stop Simulation
              </Button>
              <Button
                onClick={resetSimulation}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>

            {simulationActive && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Simulation Progress</span>
                  <span>{timeRemaining}s remaining</span>
                </div>
                <Progress value={simulationProgress} className="h-2" />
              </div>
            )}

            <p className="text-sm text-gray-400 mt-4">
              This 30-second simulation demonstrates various types of intrusive advertisements commonly used by adware.
              Observe the tactics and learn to identify suspicious patterns.
            </p>
          </CardContent>
        </Card>

        {/* Simulated Website Content */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Sample Website Environment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <h2 className="text-white">Welcome to TechNews Daily</h2>
              <p className="text-gray-300">
                This simulated news website demonstrates how adware affects normal browsing experiences. When the
                simulation is active, you'll encounter various types of pop-up advertisements that interrupt your
                reading.
              </p>

              <h3 className="text-white">Latest Technology News</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-gray-700/30 rounded-lg">
                  <h4 className="text-white font-semibold">AI Breakthrough in Cybersecurity</h4>
                  <p className="text-gray-400 text-sm mt-2">
                    Researchers develop new machine learning algorithms to detect advanced persistent threats...
                  </p>
                </div>
                <div className="p-4 bg-gray-700/30 rounded-lg">
                  <h4 className="text-white font-semibold">Mobile Security Trends 2024</h4>
                  <p className="text-gray-400 text-sm mt-2">
                    Analysis of emerging mobile security threats and protection strategies for the coming year...
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="text-blue-300 font-semibold">Educational Note</h4>
                <p className="text-blue-200 text-sm mt-2">
                  In a real adware infection, pop-ups would be much more persistent, difficult to close, and may
                  reappear immediately after being dismissed. They often spawn multiple windows and can significantly
                  impact system performance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Simulated Pop-ups */}
      {popups.map((popup, index) => (
        <div
          key={popup.id}
          className="fixed bg-gray-900 border-2 border-red-500 rounded-lg shadow-2xl z-50 animate-in slide-in-from-bottom-4 max-w-sm"
          style={{
            top: `${Math.max(80, 20 + index * 60)}px`,
            left: `${Math.max(20, 20 + index * 80)}px`,
            right: index % 2 === 0 ? "auto" : "20px",
            left: index % 2 === 0 ? `${Math.max(20, 20 + index * 80)}px` : "auto",
          }}
          role="dialog"
          aria-labelledby={`popup-title-${popup.id}`}
          aria-describedby={`popup-content-${popup.id}`}
        >
          <div className="bg-red-600 text-white p-3 flex justify-between items-center rounded-t-lg">
            <span className="font-bold text-sm" id={`popup-title-${popup.id}`}>
              ⚠️ ADWARE SIMULATION
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-red-700 h-6 w-6 p-0"
              onClick={() => closePopup(popup.id)}
              aria-label="Close popup"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4">
            <p className="text-sm mb-4 text-gray-200" id={`popup-content-${popup.id}`}>
              {popup.content}
            </p>
            <div className="flex gap-2 mb-3">
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-xs">
                Click Here! (Simulated)
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                onClick={() => closePopup(popup.id)}
              >
                Close
              </Button>
            </div>
            <div className="text-xs text-gray-400 p-2 bg-gray-800/50 rounded">
              <strong>Educational:</strong> {popup.educational}
            </div>
          </div>
        </div>
      ))}

      {/* Educational Overlay */}
      {showEducationalOverlay && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Pop-up Adware: Learning Guide</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEducationalOverlay(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="font-semibold mb-3 text-white">Understanding Pop-up Adware</h3>
                <p className="text-sm leading-relaxed">
                  Pop-up adware represents one of the most common and intrusive forms of malicious advertising. These
                  programs generate unwanted advertisements that appear as pop-up windows, often disrupting normal
                  browsing activities and potentially exposing users to additional security threats.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-white">Common Tactics & Red Flags</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Urgency Language:</strong> "Act now!", "Limited time!", "Immediate action required!"
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>False Security Warnings:</strong> Claims of virus infections or system compromises
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Unrealistic Offers:</strong> Free expensive items, lottery winnings, exclusive deals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Persistent Behavior:</strong> Difficult to close, reappearing after dismissal
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-white">Defensive Strategies</h3>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Eye className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Never click suspicious pop-ups:</strong> Use Alt+F4 or Task Manager to close
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Verify independently:</strong> Check claims through official channels
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Use pop-up blockers:</strong> Enable browser security features
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Eye className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>
                      <strong>Keep software updated:</strong> Maintain current browser and security software
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h4 className="font-semibold text-red-300 mb-2">Critical Reminder</h4>
                <p className="text-sm text-red-200">
                  This simulation provides a safe environment to observe adware behavior. In real scenarios, never
                  interact with suspicious pop-ups, and always verify security warnings through official channels before
                  taking any action.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
