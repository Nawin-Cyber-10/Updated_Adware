"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { StatusIndicator } from "@/components/status-indicator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, CheckCircle, XCircle, Eye, Shield, Monitor, Activity, Search } from "lucide-react"
import Link from "next/link"

export default function IdentificationGuide() {
  const [currentSection, setCurrentSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<number[]>([])
  const [showQuickAssessment, setShowQuickAssessment] = useState(false)
  const [assessmentAnswers, setAssessmentAnswers] = useState<{ [key: number]: boolean }>({})

  const identificationSigns = [
    {
      category: "Browser Behavior",
      icon: <Monitor className="h-6 w-6" />,
      color: "red",
      signs: [
        "Homepage changed without permission",
        "New toolbars or extensions appear automatically",
        "Default search engine modified unexpectedly",
        "Frequent redirects to unknown websites",
        "Browser runs significantly slower than usual",
        "New bookmarks appear without user action",
      ],
    },
    {
      category: "Advertisement Patterns",
      icon: <AlertTriangle className="h-6 w-6" />,
      color: "orange",
      signs: [
        "Excessive pop-up advertisements on all websites",
        "Ads appear on sites that normally don't have them",
        "Advertisements related to recent searches or browsing",
        "Fake security warnings and system alerts",
        "Prize notifications and contest pop-ups",
        "Adult content ads on family-friendly sites",
      ],
    },
    {
      category: "System Performance",
      icon: <Activity className="h-6 w-6" />,
      color: "purple",
      signs: [
        "Computer runs slower than normal",
        "Increased network activity and data usage",
        "Unknown processes in task manager",
        "High CPU or memory usage without explanation",
        "Frequent system crashes or freezes",
        "Longer boot times and application loading",
      ],
    },
  ]

  const falsePositives = [
    {
      item: "Legitimate website advertisements",
      explanation: "Reputable sites display contextual ads that are clearly marked and relevant to content.",
    },
    {
      item: "Browser update notifications from official sources",
      explanation: "Genuine browser updates come from verified publishers with digital signatures.",
    },
    {
      item: "Security warnings from your antivirus software",
      explanation: "Legitimate security software provides detailed, actionable threat information.",
    },
    {
      item: "Promotional emails from subscribed services",
      explanation: "Expected marketing emails from services you've explicitly signed up for.",
    },
    {
      item: "System notifications from your operating system",
      explanation: "OS notifications appear in designated system areas with consistent styling.",
    },
  ]

  const assessmentQuestions = [
    {
      question: "Your homepage suddenly changed to an unknown search engine. Is this likely adware?",
      answer: true,
      explanation: "Unauthorized homepage changes are a classic sign of browser hijacking malware.",
    },
    {
      question: "You see a Windows security warning pop-up while browsing. Is this always adware?",
      answer: false,
      explanation: "Legitimate security warnings can appear, but verify through official channels first.",
    },
    {
      question: "Pop-up ads appear on reputable news websites that normally don't have many ads. Suspicious?",
      answer: true,
      explanation: "Unexpected ads on clean sites often indicate adware infection.",
    },
    {
      question: "Your antivirus software shows a notification about a detected threat. Is this adware?",
      answer: false,
      explanation: "This is likely a legitimate security alert from your protection software.",
    },
  ]

  const markSectionComplete = (sectionIndex: number) => {
    if (!completedSections.includes(sectionIndex)) {
      setCompletedSections([...completedSections, sectionIndex])
    }
  }

  const progressPercentage = (completedSections.length / 4) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <NavigationHeader currentPage="education" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Advanced Adware Identification Guide</h1>
              <p className="text-gray-400">Master the art of detecting sophisticated adware threats</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowQuickAssessment(true)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Search className="h-4 w-4 mr-2" />
              Quick Assessment
            </Button>
          </div>
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
            Educational Resource • Professional Level
          </Badge>
        </div>

        {/* Progress Indicator */}
        <StatusIndicator
          status="active"
          title="Learning Progress"
          description={`${completedSections.length} of 4 sections completed • ${Math.round(progressPercentage)}% progress`}
          className="mb-8"
        />

        {/* Progress Bar */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Course Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-4" />
            <div className="grid grid-cols-4 gap-2">
              {["Introduction", "Warning Signs", "False Positives", "Assessment"].map((section, index) => (
                <div
                  key={index}
                  className={`text-center p-2 rounded text-xs ${
                    completedSections.includes(index)
                      ? "bg-green-500/20 text-green-400"
                      : currentSection === index
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gray-700/50 text-gray-500"
                  }`}
                >
                  {section}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Introduction Section */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Eye className="h-5 w-5 text-blue-400" />
              Professional Threat Identification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Advanced adware identification requires understanding sophisticated attack vectors, behavioral patterns,
                and system indicators. Modern threats employ evasion techniques that make detection challenging for
                traditional security tools.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-300 mb-2">Behavioral Analysis</h4>
                  <p className="text-sm text-blue-200">
                    Monitor system behavior changes, performance degradation, and unexpected network activity patterns.
                  </p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-2">Technical Indicators</h4>
                  <p className="text-sm text-green-200">
                    Analyze registry modifications, file system changes, and process execution anomalies.
                  </p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                  <h4 className="font-semibold text-purple-300 mb-2">Network Forensics</h4>
                  <p className="text-sm text-purple-200">
                    Examine DNS queries, HTTP traffic patterns, and suspicious domain communications.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-300 mb-2">Key Principle</h4>
                    <p className="text-sm text-yellow-200">
                      If your browsing experience suddenly changes without your explicit action, investigate
                      immediately. Modern adware is designed to be subtle and persistent, making early detection
                      crucial.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => markSectionComplete(0)}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={completedSections.includes(0)}
              >
                {completedSections.includes(0) ? "✓ Section Complete" : "Mark as Complete"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Warning Signs by Category */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-white">Advanced Threat Indicators</h2>
          {identificationSigns.map((category, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className={`p-2 rounded-lg bg-${category.color}-500/10`}>
                    <div className={`text-${category.color}-400`}>{category.icon}</div>
                  </div>
                  {category.category}
                  <Badge className={`bg-${category.color}-500/20 text-${category.color}-400`}>
                    {category.signs.length} Indicators
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {category.signs.map((sign, signIndex) => (
                    <div key={signIndex} className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                      <XCircle className={`h-4 w-4 text-${category.color}-400 mt-0.5 flex-shrink-0`} />
                      <div>
                        <span className="text-sm text-gray-200">{sign}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-gray-700/20 rounded-lg">
                  <h4 className="font-medium text-gray-300 mb-2">Professional Analysis:</h4>
                  <p className="text-sm text-gray-400">
                    {category.category === "Browser Behavior" &&
                      "Browser modifications are often the first visible sign of adware infection. These changes persist across browser restarts and may be difficult to reverse manually."}
                    {category.category === "Advertisement Patterns" &&
                      "Adware-generated advertisements are typically more intrusive, persistent, and contextually inappropriate compared to legitimate advertising."}
                    {category.category === "System Performance" &&
                      "Performance degradation occurs due to resource consumption by malicious processes, network communication, and system monitoring activities."}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={() => markSectionComplete(1)}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={completedSections.includes(1)}
          >
            {completedSections.includes(1) ? "✓ Section Complete" : "Mark as Complete"}
          </Button>
        </div>

        {/* False Positives */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Distinguishing Legitimate Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Professional threat analysis requires distinguishing between malicious activity and legitimate system
              behavior. Understanding false positives prevents unnecessary remediation efforts and maintains system
              stability.
            </p>

            <div className="space-y-4">
              {falsePositives.map((item, index) => (
                <div key={index} className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-300 mb-2">{item.item}</h4>
                      <p className="text-sm text-green-200">{item.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="font-semibold text-blue-300 mb-2">Verification Methodology</h4>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>• Verify digital signatures and certificates</li>
                <li>• Check publisher reputation and authenticity</li>
                <li>• Analyze timing and context of notifications</li>
                <li>• Cross-reference with official documentation</li>
                <li>• Use multiple detection tools for confirmation</li>
              </ul>
            </div>

            <Button
              onClick={() => markSectionComplete(2)}
              className="bg-blue-600 hover:bg-blue-700 mt-4"
              disabled={completedSections.includes(2)}
            >
              {completedSections.includes(2) ? "✓ Section Complete" : "Mark as Complete"}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Self-Assessment */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Professional Assessment Framework</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-6">
              Use this systematic approach to evaluate potential adware infections in enterprise environments:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 border border-gray-600 rounded-lg bg-gray-700/20">
                  <h4 className="font-medium text-white mb-2">Initial Triage Questions</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• When did symptoms first appear?</li>
                    <li>• What software was recently installed?</li>
                    <li>• Are symptoms consistent across users?</li>
                    <li>• What network segments are affected?</li>
                  </ul>
                </div>

                <div className="p-4 border border-gray-600 rounded-lg bg-gray-700/20">
                  <h4 className="font-medium text-white mb-2">Technical Analysis</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Process and service enumeration</li>
                    <li>• Network connection analysis</li>
                    <li>• Registry and file system changes</li>
                    <li>• Browser extension audit</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border border-gray-600 rounded-lg bg-gray-700/20">
                  <h4 className="font-medium text-white mb-2">Behavioral Indicators</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Unexpected advertisement patterns</li>
                    <li>• Browser behavior modifications</li>
                    <li>• System performance degradation</li>
                    <li>• Network traffic anomalies</li>
                  </ul>
                </div>

                <div className="p-4 border border-gray-600 rounded-lg bg-gray-700/20">
                  <h4 className="font-medium text-white mb-2">Confirmation Methods</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Multiple scanner validation</li>
                    <li>• Sandbox environment testing</li>
                    <li>• Network traffic capture</li>
                    <li>• Forensic artifact analysis</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              onClick={() => markSectionComplete(3)}
              className="bg-blue-600 hover:bg-blue-700 mt-6"
              disabled={completedSections.includes(3)}
            >
              {completedSections.includes(3) ? "✓ Section Complete" : "Mark as Complete"}
            </Button>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Advanced Learning Path</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-6">
              Continue your cybersecurity education with advanced remediation and prevention techniques:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/education/removal">
                <Card className="bg-gray-700/30 border-gray-600 hover:border-gray-500 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="h-8 w-8 text-red-400 group-hover:text-red-300 transition-colors" />
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-gray-100">
                          Advanced Removal Techniques
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">Master professional malware remediation procedures</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/education/prevention">
                <Card className="bg-gray-700/30 border-gray-600 hover:border-gray-500 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Monitor className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-gray-100">Prevention Strategies</h3>
                        <p className="text-sm text-gray-400 mt-1">Implement enterprise-grade security measures</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {completedSections.length === 4 && (
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <div>
                    <h4 className="font-semibold text-green-300">Course Complete!</h4>
                    <p className="text-sm text-green-200 mt-1">
                      You've mastered advanced adware identification techniques. Continue with removal and prevention
                      training.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Quick Assessment Modal */}
      {showQuickAssessment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Quick Knowledge Assessment</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowQuickAssessment(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {assessmentQuestions.map((q, index) => (
                <div key={index} className="p-4 border border-gray-600 rounded-lg">
                  <h4 className="font-medium text-white mb-3">{q.question}</h4>
                  <div className="flex gap-3 mb-3">
                    <Button
                      size="sm"
                      variant={assessmentAnswers[index] === true ? "default" : "outline"}
                      onClick={() => setAssessmentAnswers({ ...assessmentAnswers, [index]: true })}
                      className={
                        assessmentAnswers[index] === true
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      }
                    >
                      Yes
                    </Button>
                    <Button
                      size="sm"
                      variant={assessmentAnswers[index] === false ? "default" : "outline"}
                      onClick={() => setAssessmentAnswers({ ...assessmentAnswers, [index]: false })}
                      className={
                        assessmentAnswers[index] === false
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                      }
                    >
                      No
                    </Button>
                  </div>
                  {assessmentAnswers[index] !== undefined && (
                    <div
                      className={`p-3 rounded-lg ${
                        assessmentAnswers[index] === q.answer
                          ? "bg-green-500/10 border border-green-500/20"
                          : "bg-red-500/10 border border-red-500/20"
                      }`}
                    >
                      <p
                        className={`text-sm ${
                          assessmentAnswers[index] === q.answer ? "text-green-200" : "text-red-200"
                        }`}
                      >
                        {assessmentAnswers[index] === q.answer ? "✓ Correct! " : "✗ Incorrect. "}
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
