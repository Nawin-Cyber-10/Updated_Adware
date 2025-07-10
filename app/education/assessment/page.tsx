"use client"

import { useState, useRef } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { StatusIndicator } from "@/components/status-indicator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ExploitLogo } from "@/components/exploit-logo"
import { CheckCircle, XCircle, Award, Download, Clock, AlertTriangle, BookOpen, Target, RotateCcw } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

interface AssessmentResult {
  score: number
  percentage: number
  passed: boolean
  answers: { [key: number]: number }
  timeSpent: number
}

export default function AdwareAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [assessmentStarted, setAssessmentStarted] = useState(false)
  const [startTime, setStartTime] = useState<number>(0)
  const [userName, setUserName] = useState("")
  const [showCertificate, setShowCertificate] = useState(false)
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)
  const certificateRef = useRef<HTMLDivElement>(null)

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the primary characteristic that distinguishes adware from other types of malware?",
      options: [
        "It encrypts user files for ransom",
        "It displays unwanted advertisements to generate revenue",
        "It steals banking credentials",
        "It creates backdoors for remote access",
      ],
      correctAnswer: 1,
      explanation:
        "Adware's primary purpose is to display advertisements to generate revenue for its creators, distinguishing it from other malware types.",
      category: "Fundamentals",
    },
    {
      id: 2,
      question: "Which of the following is NOT a common distribution method for adware?",
      options: [
        "Software bundling with legitimate applications",
        "Malicious email attachments",
        "Direct physical access to the computer",
        "Drive-by downloads from compromised websites",
      ],
      correctAnswer: 2,
      explanation:
        "Adware typically spreads through digital means. Direct physical access is not a common distribution method for adware.",
      category: "Distribution",
    },
    {
      id: 3,
      question: "What is browser hijacking in the context of adware?",
      options: [
        "Stealing browser passwords",
        "Modifying browser settings without user consent",
        "Preventing browser from starting",
        "Installing additional browsers",
      ],
      correctAnswer: 1,
      explanation:
        "Browser hijacking involves unauthorized modification of browser settings like homepage, search engine, and new tab page.",
      category: "Browser Security",
    },
    {
      id: 4,
      question: "Which browser setting is most commonly targeted by adware for modification?",
      options: ["Cookie preferences", "Download location", "Homepage and search engine", "Font size settings"],
      correctAnswer: 2,
      explanation:
        "Adware frequently changes homepage and default search engine settings to redirect users to advertising-supported websites.",
      category: "Browser Security",
    },
    {
      id: 5,
      question: "What is the most effective first step when suspecting an adware infection?",
      options: [
        "Restart the computer immediately",
        "Disconnect from the internet",
        "Delete all browser cookies",
        "Run a disk cleanup",
      ],
      correctAnswer: 1,
      explanation:
        "Disconnecting from the internet prevents further data transmission and stops the adware from downloading additional components.",
      category: "Incident Response",
    },
    {
      id: 6,
      question: "Which of the following is a legitimate advertisement that should NOT be considered adware?",
      options: [
        "Pop-ups that appear on sites that normally don't have ads",
        "Contextual ads on reputable news websites",
        "Ads that follow you across different websites",
        "Pop-ups claiming your computer is infected",
      ],
      correctAnswer: 1,
      explanation:
        "Contextual ads on legitimate websites are normal business practices, unlike intrusive adware-generated advertisements.",
      category: "Identification",
    },
    {
      id: 7,
      question: "What is device fingerprinting in the context of adware tracking?",
      options: [
        "Scanning physical fingerprints through the touchscreen",
        "Creating a unique identifier based on device characteristics",
        "Installing tracking software on mobile devices",
        "Monitoring keyboard typing patterns",
      ],
      correctAnswer: 1,
      explanation:
        "Device fingerprinting creates a unique identifier using various device characteristics like screen resolution, installed fonts, and hardware specifications.",
      category: "Tracking",
    },
    {
      id: 8,
      question: "Which Windows location is commonly modified by adware to ensure persistence?",
      options: [
        "Desktop wallpaper settings",
        "System registry startup entries",
        "Recycle bin contents",
        "Screen saver settings",
      ],
      correctAnswer: 1,
      explanation:
        "Adware often modifies registry startup entries to ensure it runs automatically when the system boots.",
      category: "System Impact",
    },
    {
      id: 9,
      question: "What is the recommended approach for removing browser extensions suspected of being adware?",
      options: [
        "Disable them temporarily",
        "Remove them completely and reinstall from official sources if needed",
        "Update them to the latest version",
        "Change their permissions only",
      ],
      correctAnswer: 1,
      explanation:
        "Complete removal is recommended, followed by reinstallation from official sources if the extension is legitimately needed.",
      category: "Removal",
    },
    {
      id: 10,
      question: "Which of the following is the most reliable method to verify if a security warning is legitimate?",
      options: [
        "Click on the warning to get more information",
        "Check if it mentions specific file names",
        "Verify through official channels or known security software",
        "Look for spelling and grammar errors",
      ],
      correctAnswer: 2,
      explanation:
        "Always verify security warnings through official channels or trusted security software rather than trusting the warning itself.",
      category: "Social Engineering",
    },
    {
      id: 11,
      question: "What is the primary risk of clicking on adware-generated advertisements?",
      options: [
        "Immediate system shutdown",
        "Installation of additional malware",
        "Automatic file deletion",
        "Network disconnection",
      ],
      correctAnswer: 1,
      explanation:
        "Clicking on adware ads can lead to drive-by downloads and installation of additional malware or potentially unwanted programs.",
      category: "Risk Assessment",
    },
    {
      id: 12,
      question: "Which network-level protection is most effective against adware command and control communications?",
      options: [
        "Increasing bandwidth",
        "DNS filtering and threat intelligence",
        "Disabling wireless connections",
        "Using multiple internet providers",
      ],
      correctAnswer: 1,
      explanation:
        "DNS filtering can block communications with known malicious domains used by adware for command and control.",
      category: "Network Security",
    },
    {
      id: 13,
      question: "What is the significance of digital signatures when downloading software to prevent adware?",
      options: [
        "They make software run faster",
        "They verify the software publisher's authenticity",
        "They reduce file size",
        "They improve software compatibility",
      ],
      correctAnswer: 1,
      explanation:
        "Digital signatures verify that software comes from a legitimate publisher and hasn't been tampered with, reducing adware risk.",
      category: "Prevention",
    },
    {
      id: 14,
      question: "Which installation option should be chosen to avoid bundled adware?",
      options: [
        "Express/Quick installation",
        "Custom/Advanced installation",
        "Automatic installation",
        "Default installation",
      ],
      correctAnswer: 1,
      explanation:
        "Custom/Advanced installation allows users to see and decline bundled software that may include adware.",
      category: "Prevention",
    },
    {
      id: 15,
      question: "What is the most common behavioral indicator of adware infection?",
      options: [
        "Faster internet browsing",
        "Unexpected advertisements appearing frequently",
        "Improved system performance",
        "Automatic software updates",
      ],
      correctAnswer: 1,
      explanation:
        "The most obvious sign of adware is the appearance of unexpected, intrusive advertisements during normal browsing.",
      category: "Identification",
    },
    {
      id: 16,
      question: "Which type of website is most commonly used for adware distribution through drive-by downloads?",
      options: [
        "Government websites",
        "Compromised legitimate websites",
        "Educational institution sites",
        "Banking websites",
      ],
      correctAnswer: 1,
      explanation:
        "Compromised legitimate websites are often used because users trust them, making drive-by downloads more effective.",
      category: "Distribution",
    },
    {
      id: 17,
      question: "What is the recommended frequency for running anti-malware scans to detect adware?",
      options: ["Once per year", "Only when problems occur", "Weekly or bi-weekly", "Once per month"],
      correctAnswer: 2,
      explanation:
        "Regular weekly or bi-weekly scans help detect adware early before it can cause significant damage or data collection.",
      category: "Best Practices",
    },
    {
      id: 18,
      question: "Which browser security feature is most effective at preventing adware-related redirects?",
      options: ["Bookmark management", "Pop-up blockers and safe browsing", "Password managers", "Download managers"],
      correctAnswer: 1,
      explanation:
        "Pop-up blockers and safe browsing features can prevent many adware-related redirects and malicious site access.",
      category: "Browser Security",
    },
    {
      id: 19,
      question: "What should be done immediately after successfully removing adware from a system?",
      options: [
        "Install more antivirus software",
        "Change all passwords and update software",
        "Disable internet connection permanently",
        "Reinstall the operating system",
      ],
      correctAnswer: 1,
      explanation:
        "After adware removal, changing passwords and updating software helps secure the system and prevent reinfection.",
      category: "Post-Incident",
    },
    {
      id: 20,
      question: "Which of the following is NOT a typical characteristic of adware-generated pop-ups?",
      options: [
        "Difficult to close or persistent",
        "Contain urgent or threatening language",
        "Appear only on specific legitimate websites",
        "Offer unrealistic prizes or deals",
      ],
      correctAnswer: 2,
      explanation: "Adware pop-ups typically appear across multiple sites, not just on specific legitimate websites.",
      category: "Identification",
    },
    {
      id: 21,
      question: "What is the primary purpose of adware from the attacker's perspective?",
      options: [
        "System destruction",
        "Data encryption",
        "Revenue generation through advertising",
        "Network disruption",
      ],
      correctAnswer: 2,
      explanation:
        "Adware is primarily designed to generate revenue through forced advertisement viewing and click fraud.",
      category: "Fundamentals",
    },
    {
      id: 22,
      question: "Which user education topic is most critical for preventing adware infections?",
      options: [
        "Advanced networking concepts",
        "Safe software installation practices",
        "Programming fundamentals",
        "Hardware troubleshooting",
      ],
      correctAnswer: 1,
      explanation:
        "Teaching users about safe software installation practices is crucial since bundled software is a primary adware distribution method.",
      category: "User Education",
    },
    {
      id: 23,
      question:
        "What is the most reliable way to distinguish between legitimate system notifications and adware alerts?",
      options: [
        "Check the color scheme",
        "Verify through official system tools and known security software",
        "Count the number of exclamation marks",
        "Look at the font style used",
      ],
      correctAnswer: 1,
      explanation:
        "Always verify alerts through official system tools or trusted security software rather than trusting the appearance of the alert.",
      category: "Social Engineering",
    },
    {
      id: 24,
      question: "Which enterprise security control is most effective for preventing adware infections at scale?",
      options: [
        "Individual user training only",
        "Application whitelisting and endpoint protection",
        "Increasing internet bandwidth",
        "Regular hardware replacement",
      ],
      correctAnswer: 1,
      explanation:
        "Application whitelisting prevents unauthorized software execution, while endpoint protection provides real-time threat detection.",
      category: "Enterprise Security",
    },
    {
      id: 25,
      question:
        "What is the recommended approach when encountering a website that triggers multiple security warnings?",
      options: [
        "Proceed carefully and avoid clicking ads",
        "Immediately close the browser tab and avoid the site",
        "Disable security warnings and continue",
        "Clear browser cache and reload the page",
      ],
      correctAnswer: 1,
      explanation:
        "Multiple security warnings indicate a potentially dangerous site that should be avoided completely to prevent adware infection.",
      category: "Risk Assessment",
    },
  ]

  const startAssessment = () => {
    if (!userName.trim()) {
      alert("Please enter your name before starting the assessment.")
      return
    }
    setAssessmentStarted(true)
    setStartTime(Date.now())
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const selectAnswer = (answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: answerIndex,
    }))
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const submitAssessment = () => {
    const endTime = Date.now()
    const timeSpent = Math.round((endTime - startTime) / 1000 / 60) // minutes

    let correctAnswers = 0
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const percentage = Math.round((correctAnswers / questions.length) * 100)
    const passed = percentage >= 80

    const result: AssessmentResult = {
      score: correctAnswers,
      percentage,
      passed,
      answers,
      timeSpent,
    }

    setAssessmentResult(result)
    setShowResults(true)
  }

  const resetAssessment = () => {
    setAssessmentStarted(false)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setAssessmentResult(null)
    setShowCertificate(false)
  }

  const downloadCertificate = async () => {
    if (!certificateRef.current || !assessmentResult?.passed) return

    // Create canvas for certificate generation
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size (standard certificate dimensions)
    canvas.width = 1200
    canvas.height = 800

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#1f2937")
    gradient.addColorStop(0.5, "#374151")
    gradient.addColorStop(1, "#1f2937")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Border
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 8
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80)

    // Inner border
    ctx.strokeStyle = "#6b7280"
    ctx.lineWidth = 2
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120)

    // Title
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 48px Arial"
    ctx.textAlign = "center"
    ctx.fillText("CERTIFICATE OF COMPLETION", canvas.width / 2, 150)

    // Subtitle
    ctx.fillStyle = "#ef4444"
    ctx.font = "bold 32px Arial"
    ctx.fillText("Adware Security Assessment", canvas.width / 2, 200)

    // Awarded to text
    ctx.fillStyle = "#d1d5db"
    ctx.font = "24px Arial"
    ctx.fillText("This certificate is proudly awarded to", canvas.width / 2, 280)

    // User name
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 40px Arial"
    ctx.fillText(userName, canvas.width / 2, 340)

    // Achievement text
    ctx.fillStyle = "#d1d5db"
    ctx.font = "20px Arial"
    ctx.fillText("for successfully completing the Adware Security Assessment", canvas.width / 2, 400)
    ctx.fillText(`with a score of ${assessmentResult.percentage}%`, canvas.width / 2, 430)

    // Company info
    ctx.fillStyle = "#ef4444"
    ctx.font = "bold 28px Arial"
    ctx.fillText("EXPLOIT", canvas.width / 2, 520)

    ctx.fillStyle = "#9ca3af"
    ctx.font = "18px Arial"
    ctx.fillText("Adware Simulator & Cybersecurity Training Platform", canvas.width / 2, 550)

    // Date
    ctx.fillStyle = "#6b7280"
    ctx.font = "16px Arial"
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    ctx.fillText(`Issued on ${currentDate}`, canvas.width / 2, 650)

    // Achievement badge (simple circle with checkmark)
    ctx.beginPath()
    ctx.arc(canvas.width / 2, 720, 30, 0, 2 * Math.PI)
    ctx.fillStyle = "#10b981"
    ctx.fill()
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 3
    ctx.stroke()

    // Checkmark
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2 - 12, 720)
    ctx.lineTo(canvas.width / 2 - 4, 728)
    ctx.lineTo(canvas.width / 2 + 12, 712)
    ctx.stroke()

    // Download the certificate
    const link = document.createElement("a")
    link.download = `${userName.replace(/\s+/g, "_")}_Adware_Assessment_Certificate.png`
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  const getQuestionsByCategory = () => {
    const categories: { [key: string]: number } = {}
    questions.forEach((q) => {
      categories[q.category] = (categories[q.category] || 0) + 1
    })
    return categories
  }

  const getScoreByCategory = () => {
    if (!assessmentResult) return {}

    const categoryScores: { [key: string]: { correct: number; total: number } } = {}

    questions.forEach((question, index) => {
      const category = question.category
      if (!categoryScores[category]) {
        categoryScores[category] = { correct: 0, total: 0 }
      }
      categoryScores[category].total++
      if (assessmentResult.answers[index] === question.correctAnswer) {
        categoryScores[category].correct++
      }
    })

    return categoryScores
  }

  if (!assessmentStarted && !showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <NavigationHeader currentPage="education" />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Adware Security Assessment</h1>
            <p className="text-gray-400">Comprehensive evaluation of adware knowledge and security concepts</p>
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mt-2">
              Professional Certification • 25 Questions
            </Badge>
          </div>

          <StatusIndicator
            status="safe"
            title="Assessment Ready"
            description="Complete the assessment to earn your Adware Security Certificate"
            className="mb-8"
          />

          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <BookOpen className="h-5 w-5 text-blue-400" />
                Assessment Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-white mb-3">Assessment Details</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-blue-400" />
                      25 multiple-choice questions
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      No time limit (average: 30-45 minutes)
                    </li>
                    <li className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-blue-400" />
                      80% required to pass and earn certificate
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      Immediate results and feedback
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-3">Topics Covered</h3>
                  <div className="space-y-2">
                    {Object.entries(getQuestionsByCategory()).map(([category, count]) => (
                      <div key={category} className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">{category}</span>
                        <Badge className="bg-gray-700 text-gray-300 text-xs">{count} questions</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-300 mb-2">Assessment Guidelines</h4>
                    <ul className="text-sm text-yellow-200 space-y-1">
                      <li>• Read each question carefully before selecting your answer</li>
                      <li>• You can navigate between questions and change answers before submitting</li>
                      <li>• Detailed explanations will be provided for all questions after submission</li>
                      <li>• A score of 80% or higher is required to earn your certificate</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="userName" className="text-white font-medium">
                    Full Name (for certificate)
                  </Label>
                  <Input
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your full name"
                    className="mt-2 bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <Button
                  onClick={startAssessment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                  disabled={!userName.trim()}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Start Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (showResults && assessmentResult) {
    const categoryScores = getScoreByCategory()

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <NavigationHeader currentPage="education" />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Assessment Results</h1>
            <p className="text-gray-400">Your performance on the Adware Security Assessment</p>
          </div>

          <StatusIndicator
            status={assessmentResult.passed ? "safe" : "warning"}
            title={assessmentResult.passed ? "Assessment Passed!" : "Assessment Not Passed"}
            description={
              assessmentResult.passed
                ? `Congratulations! You scored ${assessmentResult.percentage}% and earned your certificate`
                : `You scored ${assessmentResult.percentage}%. A score of 80% or higher is required to pass`
            }
            className="mb-8"
          />

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Score Summary */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="h-5 w-5 text-blue-400" />
                  Score Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div
                    className={`text-6xl font-bold mb-2 ${assessmentResult.passed ? "text-green-400" : "text-red-400"}`}
                  >
                    {assessmentResult.percentage}%
                  </div>
                  <p className="text-gray-300">
                    {assessmentResult.score} out of {questions.length} correct
                  </p>
                  <p className="text-sm text-gray-400 mt-2">Time spent: {assessmentResult.timeSpent} minutes</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Passing Score:</span>
                    <span className="text-white">80%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Your Score:</span>
                    <span className={assessmentResult.passed ? "text-green-400" : "text-red-400"}>
                      {assessmentResult.percentage}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Status:</span>
                    <Badge
                      className={
                        assessmentResult.passed ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }
                    >
                      {assessmentResult.passed ? "PASSED" : "NOT PASSED"}
                    </Badge>
                  </div>
                </div>

                {assessmentResult.passed && (
                  <div className="mt-6 space-y-3">
                    <Button onClick={() => setShowCertificate(true)} className="w-full bg-green-600 hover:bg-green-700">
                      <Award className="h-4 w-4 mr-2" />
                      View Certificate
                    </Button>
                    <Button
                      onClick={downloadCertificate}
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Certificate
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Performance by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(categoryScores).map(([category, scores]) => {
                    const percentage = Math.round((scores.correct / scores.total) * 100)
                    return (
                      <div key={category}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 text-sm">{category}</span>
                          <span className="text-white text-sm">
                            {scores.correct}/{scores.total} ({percentage}%)
                          </span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Results */}
          <Card className="bg-gray-800/50 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Detailed Question Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {questions.map((question, index) => {
                  const userAnswer = assessmentResult.answers[index]
                  const isCorrect = userAnswer === question.correctAnswer

                  return (
                    <div key={question.id} className="p-4 border border-gray-600 rounded-lg">
                      <div className="flex items-start gap-3 mb-3">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-white">Question {index + 1}</span>
                            <Badge className="bg-gray-700 text-gray-300 text-xs">{question.category}</Badge>
                          </div>
                          <p className="text-gray-300 mb-3">{question.question}</p>

                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-2 rounded text-sm ${
                                  optionIndex === question.correctAnswer
                                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                    : optionIndex === userAnswer && !isCorrect
                                      ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                      : "bg-gray-700/30 text-gray-400"
                                }`}
                              >
                                {option}
                                {optionIndex === question.correctAnswer && (
                                  <span className="ml-2 text-green-400">✓ Correct</span>
                                )}
                                {optionIndex === userAnswer && !isCorrect && (
                                  <span className="ml-2 text-red-400">✗ Your answer</span>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                            <p className="text-sm text-blue-200">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button
              onClick={resetAssessment}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake Assessment
            </Button>
          </div>
        </main>

        {/* Certificate Modal */}
        {showCertificate && assessmentResult.passed && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <Card className="max-w-4xl w-full bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white">Your Certificate</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCertificate(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  ref={certificateRef}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-lg border-4 border-red-500 text-center relative"
                  style={{ aspectRatio: "3/2" }}
                >
                  <div className="absolute inset-4 border-2 border-gray-600 rounded"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <ExploitLogo size="lg" className="text-red-500" />
                      <div>
                        <h1 className="text-4xl font-bold text-white">CERTIFICATE</h1>
                        <p className="text-lg text-gray-300">OF COMPLETION</p>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-red-400 mb-8">Adware Security Assessment</h2>

                    <p className="text-gray-300 mb-4">This certificate is proudly awarded to</p>

                    <h3 className="text-3xl font-bold text-white mb-6 border-b-2 border-gray-600 pb-2 inline-block">
                      {userName}
                    </h3>

                    <p className="text-gray-300 mb-2">for successfully completing the Adware Security Assessment</p>
                    <p className="text-gray-300 mb-8">
                      with a score of <span className="text-green-400 font-bold">{assessmentResult.percentage}%</span>
                    </p>

                    <div className="flex items-center justify-center gap-8">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-2 mx-auto">
                          <Award className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-red-400 font-bold text-lg">EXPLOIT</p>
                        <p className="text-gray-400 text-sm">Cybersecurity Training</p>
                      </div>

                      <div className="text-center">
                        <p className="text-gray-400 text-sm">Issued on</p>
                        <p className="text-white font-medium">
                          {new Date().toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button onClick={downloadCertificate} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                  <Button
                    onClick={() => setShowCertificate(false)}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    )
  }

  // Assessment in progress
  const currentQ = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100
  const answeredQuestions = Object.keys(answers).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <NavigationHeader currentPage="education" />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Adware Security Assessment</h1>
              <p className="text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
              {answeredQuestions}/{questions.length} Answered
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Question {currentQuestion + 1}</CardTitle>
              <Badge className="bg-gray-700 text-gray-300 text-xs">{currentQ.category}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">{currentQ.question}</p>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                    answers[currentQuestion] === index
                      ? "bg-blue-500/20 border-blue-500 text-blue-300"
                      : "bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        answers[currentQuestion] === index ? "border-blue-500 bg-blue-500" : "border-gray-500"
                      }`}
                    >
                      {answers[currentQuestion] === index && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center">
          <Button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
          >
            Previous
          </Button>

          <div className="flex gap-2">
            {currentQuestion === questions.length - 1 ? (
              <Button
                onClick={submitAssessment}
                disabled={answeredQuestions < questions.length}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Assessment
              </Button>
            ) : (
              <Button onClick={nextQuestion} className="bg-blue-600 hover:bg-blue-700">
                Next
              </Button>
            )}
          </div>
        </div>

        {answeredQuestions < questions.length && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-sm text-yellow-200 text-center">
              Please answer all questions before submitting the assessment
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
