"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { StatusIndicator } from "@/components/status-indicator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, AlertTriangle, CheckCircle, Settings, Terminal, Zap, Download } from "lucide-react"
import Link from "next/link"

export default function RemovalGuide() {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [completedPhases, setCompletedPhases] = useState<number[]>([])
  const [selectedBrowser, setSelectedBrowser] = useState("chrome")
  const [showAdvancedTools, setShowAdvancedTools] = useState(false)

  const removalPhases = [
    {
      title: "Emergency Response",
      icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
      color: "red",
      steps: [
        "Immediately disconnect from the internet if possible",
        "Close all browser windows and applications",
        "Do not enter personal information on any websites",
        "Take screenshots of suspicious activity for documentation",
        "Note any error messages or unusual system behavior",
        "Backup critical data to external storage if accessible",
      ],
      description: "Immediate containment procedures to prevent further damage and data loss.",
    },
    {
      title: "System Analysis",
      icon: <Terminal className="h-5 w-5 text-blue-400" />,
      color: "blue",
      steps: [
        "Boot system in Safe Mode for isolated analysis",
        "Run comprehensive system file integrity check",
        "Analyze running processes and services",
        "Check network connections and listening ports",
        "Review system logs for anomalous activity",
        "Document all findings for remediation planning",
      ],
      description: "Thorough system assessment to identify infection scope and attack vectors.",
    },
    {
      title: "Browser Remediation",
      icon: <Settings className="h-5 w-5 text-green-400" />,
      color: "green",
      steps: [
        "Reset all browsers to factory default settings",
        "Remove all suspicious extensions and add-ons",
        "Clear all browsing data, cookies, and cached files",
        "Restore legitimate homepage and search engine settings",
        "Update browsers to latest security versions",
        "Configure enhanced security and privacy settings",
      ],
      description: "Complete browser restoration and security hardening procedures.",
    },
    {
      title: "Deep System Cleaning",
      icon: <Zap className="h-5 w-5 text-purple-400" />,
      color: "purple",
      steps: [
        "Run multiple anti-malware scans with different engines",
        "Perform rootkit detection and removal procedures",
        "Clean Windows registry of malicious entries",
        "Remove temporary files and system cache",
        "Update operating system and security patches",
        "Verify system integrity and stability",
      ],
      description: "Comprehensive malware removal and system restoration.",
    },
  ]

  const browserResetInstructions = {
    chrome: {
      name: "Google Chrome",
      steps: [
        "Open Chrome Settings (chrome://settings/)",
        'Navigate to "Advanced" → "Reset and clean up"',
        'Click "Restore settings to original defaults"',
        'Review the reset information and click "Reset settings"',
        "Restart Chrome and verify settings restoration",
        "Reinstall necessary extensions from official sources",
      ],
    },
    firefox: {
      name: "Mozilla Firefox",
      steps: [
        "Open Firefox menu → Help → Troubleshooting Information",
        'Click "Refresh Firefox" button in the top-right',
        'Confirm by clicking "Refresh Firefox" in the dialog',
        "Firefox will restart with default settings",
        "Import bookmarks and passwords if needed",
        "Reinstall trusted add-ons from Mozilla repository",
      ],
    },
    edge: {
      name: "Microsoft Edge",
      steps: [
        "Open Edge Settings (edge://settings/)",
        'Click "Reset settings" in the left sidebar',
        'Select "Restore settings to default values"',
        'Review reset details and click "Reset"',
        "Restart Edge browser completely",
        "Reconfigure privacy and security preferences",
      ],
    },
    safari: {
      name: "Safari",
      steps: [
        "Open Safari → Preferences → Privacy",
        'Click "Manage Website Data" → "Remove All"',
        "Go to Extensions tab and remove suspicious items",
        "Reset Safari: Develop menu → Empty Caches",
        "Clear history: History → Clear History",
        "Restart Safari and verify clean state",
      ],
    },
  }

  const professionalTools = [
    {
      name: "Malwarebytes Premium",
      type: "Anti-Malware Suite",
      description: "Industry-leading malware detection with real-time protection and advanced heuristics.",
      features: ["Real-time protection", "Rootkit detection", "Web protection", "Ransomware shield"],
    },
    {
      name: "ESET Online Scanner",
      type: "On-Demand Scanner",
      description: "Powerful one-time scanner for detecting and removing persistent threats.",
      features: ["No installation required", "Deep system scan", "UEFI scanner", "Cloud-powered detection"],
    },
    {
      name: "AdwCleaner by Malwarebytes",
      type: "Adware Specialist",
      description: "Specialized tool for removing adware, browser hijackers, and potentially unwanted programs.",
      features: ["Adware focus", "Browser reset", "Registry cleaning", "Scheduled scans"],
    },
    {
      name: "RootkitRevealer",
      type: "Rootkit Detection",
      description: "Microsoft Sysinternals tool for advanced rootkit detection and analysis.",
      features: ["Deep system analysis", "File system scanning", "Registry analysis", "Advanced reporting"],
    },
  ]

  const markPhaseComplete = (phaseIndex: number) => {
    if (!completedPhases.includes(phaseIndex)) {
      setCompletedPhases([...completedPhases, phaseIndex])
    }
  }

  const progressPercentage = (completedPhases.length / 4) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <NavigationHeader currentPage="education" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Professional Malware Removal Guide</h1>
              <p className="text-gray-400">Enterprise-grade remediation procedures and advanced techniques</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowAdvancedTools(true)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Download className="h-4 w-4 mr-2" />
              Professional Tools
            </Button>
          </div>
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Educational Resource • Expert Level</Badge>
        </div>

        {/* Progress Indicator */}
        <StatusIndicator
          status="active"
          title="Remediation Progress"
          description={`${completedPhases.length} of 4 phases completed • ${Math.round(progressPercentage)}% progress`}
          className="mb-8"
        />

        {/* Progress Tracking */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Remediation Progress</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-4" />
            <div className="grid grid-cols-4 gap-2">
              {removalPhases.map((phase, index) => (
                <div
                  key={index}
                  className={`text-center p-2 rounded text-xs ${
                    completedPhases.includes(index)
                      ? "bg-green-500/20 text-green-400"
                      : currentPhase === index
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gray-700/50 text-gray-500"
                  }`}
                >
                  {phase.title}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-red-400" />
              Professional Remediation Framework
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Professional malware removal requires a systematic, multi-phase approach that ensures complete threat
                elimination while preserving system integrity and user data. This framework follows industry best
                practices for enterprise environments.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h4 className="font-semibold text-red-300 mb-2">Containment First</h4>
                  <p className="text-sm text-red-200">
                    Immediate isolation prevents lateral movement and additional system compromise.
                  </p>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="font-semibold text-blue-300 mb-2">Evidence Preservation</h4>
                  <p className="text-sm text-blue-200">
                    Document all findings for forensic analysis and future prevention strategies.
                  </p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="font-semibold text-green-300 mb-2">Complete Eradication</h4>
                  <p className="text-sm text-green-200">
                    Thorough removal ensures no remnants remain to reinfect the system.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-yellow-300 mb-2">Critical Warning</h4>
                    <p className="text-sm text-yellow-200">
                      Some procedures require administrator privileges and may affect system stability. Always backup
                      critical data before beginning remediation procedures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Removal Phases */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-white">Professional Remediation Phases</h2>
          {removalPhases.map((phase, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className={`p-2 rounded-lg bg-${phase.color}-500/10`}>{phase.icon}</div>
                  Phase {index + 1}: {phase.title}
                  <Badge className={`bg-${phase.color}-500/20 text-${phase.color}-400`}>
                    {phase.steps.length} Steps
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{phase.description}</p>

                <div className="space-y-3">
                  {phase.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                      <div
                        className={`bg-${phase.color}-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0`}
                      >
                        {stepIndex + 1}
                      </div>
                      <span className="text-sm text-gray-200">{step}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <Button
                    onClick={() => markPhaseComplete(index)}
                    className="bg-blue-600 hover:bg-blue-700"
                    disabled={completedPhases.includes(index)}
                  >
                    {completedPhases.includes(index) ? "✓ Phase Complete" : "Mark Phase Complete"}
                  </Button>

                  {completedPhases.includes(index) && (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm">Completed</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Browser Reset Instructions */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Browser Restoration Procedures</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">Select your browser for detailed restoration instructions:</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {Object.entries(browserResetInstructions).map(([key, browser]) => (
                <Button
                  key={key}
                  variant={selectedBrowser === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedBrowser(key)}
                  className={
                    selectedBrowser === key
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  }
                >
                  {browser.name}
                </Button>
              ))}
            </div>

            <div className="p-4 bg-gray-700/30 rounded-lg">
              <h4 className="font-semibold text-white mb-3">
                {browserResetInstructions[selectedBrowser as keyof typeof browserResetInstructions].name} Reset
                Procedure
              </h4>
              <ol className="space-y-2">
                {browserResetInstructions[selectedBrowser as keyof typeof browserResetInstructions].steps.map(
                  (step, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ),
                )}
              </ol>
            </div>

            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <h5 className="font-medium text-yellow-300 mb-1">Post-Reset Security</h5>
              <p className="text-sm text-yellow-200">
                After resetting, immediately update the browser, configure security settings, and only install
                extensions from official repositories.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Verification & Recovery */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Verification & Recovery Procedures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">System Verification</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-300 text-sm">Performance Testing</p>
                      <p className="text-xs text-green-200">Monitor system performance for 24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-300 text-sm">Network Analysis</p>
                      <p className="text-xs text-green-200">Verify no suspicious network connections remain</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-300 text-sm">Browser Behavior</p>
                      <p className="text-xs text-green-200">Confirm normal browsing experience restoration</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-300 text-sm">Follow-up Scans</p>
                      <p className="text-xs text-green-200">Run additional scans after 72 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Recovery Actions</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Settings className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-blue-300 text-sm">Security Hardening</p>
                      <p className="text-xs text-blue-200">Implement enhanced security configurations</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-blue-300 text-sm">Protection Updates</p>
                      <p className="text-xs text-blue-200">Update all security software and definitions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Terminal className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-blue-300 text-sm">System Updates</p>
                      <p className="text-xs text-blue-200">Apply all available OS and software patches</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-blue-300 text-sm">User Education</p>
                      <p className="text-xs text-blue-200">Provide security awareness training</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {completedPhases.length === 4 && (
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <div>
                    <h4 className="font-semibold text-green-300">Remediation Complete!</h4>
                    <p className="text-sm text-green-200 mt-1">
                      All phases completed successfully. Continue with prevention strategies to avoid future infections.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Advanced Security Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-6">
              Complete your security posture with proactive prevention and monitoring strategies:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/education/prevention">
                <Card className="bg-gray-700/30 border-gray-600 hover:border-gray-500 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="h-8 w-8 text-green-400 group-hover:text-green-300 transition-colors" />
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-gray-100">Prevention Strategies</h3>
                        <p className="text-sm text-gray-400 mt-1">Implement enterprise-grade security measures</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/education/identification">
                <Card className="bg-gray-700/30 border-gray-600 hover:border-gray-500 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-8 w-8 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-gray-100">Threat Identification</h3>
                        <p className="text-sm text-gray-400 mt-1">Master advanced detection techniques</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Professional Tools Modal */}
      {showAdvancedTools && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Professional Remediation Tools</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedTools(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-300">Professional-grade tools for comprehensive malware detection and removal:</p>

              <div className="grid md:grid-cols-2 gap-4">
                {professionalTools.map((tool, index) => (
                  <div key={index} className="p-4 bg-gray-700/30 border border-gray-600 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-white">{tool.name}</h4>
                        <Badge className="bg-blue-500/20 text-blue-400 text-xs mt-1">{tool.type}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">{tool.description}</p>
                    <div className="space-y-1">
                      {tool.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          <span className="text-xs text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h4 className="font-semibold text-red-300 mb-2">Security Notice</h4>
                <p className="text-sm text-red-200">
                  Only download security tools from official websites or trusted sources. Verify digital signatures and
                  scan downloads before execution. Fake security software is a common malware distribution method.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
