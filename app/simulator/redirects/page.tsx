"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { StatusIndicator } from "@/components/status-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ExternalLink, AlertTriangle, Info, RefreshCw, Play, RotateCcw, Globe, Target } from "lucide-react"

export default function RedirectSimulator() {
  const [currentSite, setCurrentSite] = useState("legitimate")
  const [redirectCount, setRedirectCount] = useState(0)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [showEducationalOverlay, setShowEducationalOverlay] = useState(false)
  const [redirectHistory, setRedirectHistory] = useState<string[]>(["https://legitimate-news-site.com"])
  const [redirectProgress, setRedirectProgress] = useState(0)
  const [currentRedirectStep, setCurrentRedirectStep] = useState(0)

  const legitimateSite = {
    name: "TechNews Daily",
    url: "https://legitimate-news-site.com",
    content: {
      title: "Breaking: Revolutionary AI Security Breakthrough Announced",
      article:
        "Cybersecurity researchers have developed a groundbreaking AI system that can detect and prevent zero-day attacks in real-time. This advancement represents a significant leap forward in proactive threat detection...",
      links: ["Read Full Article", "Related Stories", "Subscribe to Newsletter", "Share Article"],
    },
  }

  const maliciousSites = [
    {
      name: "Fake Tech Support",
      url: "https://urgent-pc-repair.exploit",
      content: {
        title: "🚨 CRITICAL SYSTEM ALERT - IMMEDIATE ACTION REQUIRED 🚨",
        article:
          "WARNING: Your computer has been infected with 47 viruses and 12 trojans! Your personal data is being stolen RIGHT NOW. Call our certified technicians immediately at 1-800-EXPLOIT-1 for emergency removal service.",
        links: ["CALL NOW!", "Download Scanner", "Live Chat Support", "Emergency Repair"],
      },
    },
    {
      name: "Prize Scam Portal",
      url: "https://winner-congratulations.exploit",
      content: {
        title: "🎉 CONGRATULATIONS! YOU'VE WON $50,000 CASH PRIZE! 🎉",
        article:
          "You are our 10,000,000th visitor today! You've been selected to receive a $50,000 cash prize plus a brand new iPhone 15 Pro Max. This offer expires in 10 minutes - claim your prize now before it's too late!",
        links: ["CLAIM PRIZE NOW", "Verify Eligibility", "Share with Friends", "See Terms"],
      },
    },
    {
      name: "Fake Shopping Site",
      url: "https://mega-deals-outlet.exploit",
      content: {
        title: "💰 LIQUIDATION SALE - 95% OFF EVERYTHING! 💰",
        article:
          "STORE CLOSING FOREVER! Everything must go! Designer brands, electronics, jewelry - all at 95% off retail prices. Limited quantities available. This is not a drill - these prices will never be seen again!",
        links: ["SHOP NOW", "Add to Cart", "Buy Instantly", "Tell Friends"],
      },
    },
    {
      name: "Malware Distribution",
      url: "https://system-update-required.exploit",
      content: {
        title: "⚠️ URGENT SECURITY UPDATE REQUIRED ⚠️",
        article:
          "Your browser is severely outdated and vulnerable to attacks. A critical security patch is available that will protect your system from the latest threats. Download and install immediately to secure your computer.",
        links: ["Download Update", "Install Now", "Learn More", "Skip (Not Recommended)"],
      },
    },
  ]

  const simulateRedirect = () => {
    setIsRedirecting(true)
    setRedirectProgress(0)
    setCurrentRedirectStep(0)

    const redirectChain = async () => {
      const steps = ["Initiating redirect...", "Bypassing security...", "Loading malicious content..."]

      for (let i = 0; i < 3; i++) {
        setCurrentRedirectStep(i)
        setRedirectProgress((i / 3) * 100)

        await new Promise((resolve) => setTimeout(resolve, 1500))

        const randomSite = maliciousSites[Math.floor(Math.random() * maliciousSites.length)]
        setCurrentSite("malicious")
        setRedirectCount((prev) => prev + 1)
        setRedirectHistory((prev) => [...prev, randomSite.url])
      }

      setRedirectProgress(100)
      setIsRedirecting(false)
    }

    redirectChain()
  }

  const resetSimulation = () => {
    setCurrentSite("legitimate")
    setRedirectCount(0)
    setIsRedirecting(false)
    setRedirectHistory(["https://legitimate-news-site.com"])
    setRedirectProgress(0)
    setCurrentRedirectStep(0)
  }

  const getCurrentSiteData = () => {
    if (currentSite === "legitimate") {
      return legitimateSite
    } else {
      return maliciousSites[redirectCount % maliciousSites.length]
    }
  }

  const siteData = getCurrentSiteData()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <NavigationHeader currentPage="simulations" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Malicious Redirect Simulator</h1>
              <p className="text-gray-400">Experience complex redirect chains and suspicious website behavior</p>
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
          <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
            Educational Simulation • Intermediate Level
          </Badge>
        </div>

        {/* Status Indicator */}
        <StatusIndicator
          status={currentSite === "malicious" ? "danger" : isRedirecting ? "active" : "safe"}
          title={
            currentSite === "malicious"
              ? "Redirected to Malicious Site"
              : isRedirecting
                ? "Redirect in Progress"
                : "Viewing Legitimate Website"
          }
          description={
            currentSite === "malicious"
              ? `Successfully redirected to suspicious website • ${redirectCount} redirects completed`
              : isRedirecting
                ? "Simulating malicious redirect chain..."
                : "Browsing safely on legitimate news website"
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
              <Button
                onClick={simulateRedirect}
                disabled={isRedirecting || currentSite === "malicious"}
                className="bg-red-600 hover:bg-red-700"
              >
                {isRedirecting ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Trigger Malicious Redirect
                  </>
                )}
              </Button>
              <Button
                onClick={resetSimulation}
                disabled={isRedirecting}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Safe Site
              </Button>
            </div>

            {isRedirecting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Redirect Progress</span>
                  <span>{Math.round(redirectProgress)}%</span>
                </div>
                <Progress value={redirectProgress} className="h-2" />
                <p className="text-xs text-gray-500">
                  Step {currentRedirectStep + 1}/3:{" "}
                  {
                    ["Initiating redirect...", "Bypassing security...", "Loading malicious content..."][
                      currentRedirectStep
                    ]
                  }
                </p>
              </div>
            )}

            <p className="text-sm text-gray-400 mt-4">
              Experience how clicking on legitimate links can lead to multiple unwanted redirects through a chain of
              malicious websites designed to deceive and exploit users.
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Simulated Browser Window */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Browser Window Simulation</CardTitle>
                  {currentSite === "malicious" && (
                    <Badge variant="destructive" className="animate-pulse">
                      MALICIOUS SITE
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Browser Address Bar */}
                <div className="bg-gray-700 p-3 rounded-t-lg border border-gray-600 flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div
                    className={`flex-1 bg-gray-800 px-3 py-2 rounded text-sm font-mono ${
                      currentSite === "malicious" ? "text-red-400 border border-red-500/50" : "text-green-400"
                    }`}
                  >
                    {siteData.url}
                  </div>
                  {currentSite === "malicious" && <AlertTriangle className="h-5 w-5 text-red-500" />}
                </div>

                {/* Website Content */}
                <div
                  className={`border border-t-0 border-gray-600 rounded-b-lg p-6 min-h-[500px] ${
                    currentSite === "malicious" ? "bg-red-950/20" : "bg-gray-900"
                  }`}
                >
                  <h1
                    className={`text-2xl font-bold mb-4 ${currentSite === "malicious" ? "text-red-300" : "text-white"}`}
                  >
                    {siteData.content.title}
                  </h1>

                  <p
                    className={`mb-6 leading-relaxed ${currentSite === "malicious" ? "text-red-200" : "text-gray-300"}`}
                  >
                    {siteData.content.article}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {siteData.content.links.map((link, index) => (
                      <Button
                        key={index}
                        variant={currentSite === "malicious" ? "destructive" : "outline"}
                        size="sm"
                        className={`${
                          currentSite === "legitimate"
                            ? "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                            : ""
                        }`}
                        onClick={() => {
                          if (currentSite === "legitimate") {
                            simulateRedirect()
                          }
                        }}
                      >
                        {link}
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </Button>
                    ))}
                  </div>

                  {currentSite === "malicious" && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-red-300 mb-2">Security Warning</h4>
                          <p className="text-sm text-red-200">
                            This appears to be a malicious website designed to deceive users. Common tactics include
                            urgent language, unrealistic offers, and pressure to act immediately. Never provide personal
                            information or download software from suspicious sites.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSite === "legitimate" && (
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-blue-300 mb-2">Legitimate Content</h4>
                          <p className="text-sm text-blue-200">
                            This represents a normal, trustworthy news website. However, even legitimate sites can be
                            compromised or contain malicious advertisements that trigger redirect chains.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Redirect Analysis Panel */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Target className="h-5 w-5 text-red-400" />
                  Redirect Chain Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {redirectHistory.map((url, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-xs border ${
                        index === 0
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-red-500/10 border-red-500/30 animate-pulse"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold">{index + 1}.</span>
                        <span className="truncate font-mono">{url}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {index === 0 ? (
                          <Badge className="bg-green-500/20 text-green-400 text-xs">LEGITIMATE</Badge>
                        ) : (
                          <Badge className="bg-red-500/20 text-red-400 text-xs">MALICIOUS</Badge>
                        )}
                        <span className="text-gray-400">
                          {index === 0 ? "Original destination" : `Redirect ${index}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-600">
                  <h4 className="font-medium mb-3 text-white">Attack Vector Analysis:</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Redirects:</span>
                      <span className="text-white font-mono">{redirectCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Chain Length:</span>
                      <span className="text-white font-mono">{redirectHistory.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Threat Level:</span>
                      <Badge
                        className={
                          currentSite === "malicious" ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"
                        }
                      >
                        {currentSite === "malicious" ? "HIGH" : "NONE"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Threat Intelligence */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Threat Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                    <h4 className="font-medium text-yellow-300 text-sm mb-1">Common Redirect Triggers</h4>
                    <ul className="text-xs text-yellow-200 space-y-1">
                      <li>• Compromised advertisements</li>
                      <li>• Malicious JavaScript injection</li>
                      <li>• Social engineering links</li>
                      <li>• Drive-by download attempts</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                    <h4 className="font-medium text-red-300 text-sm mb-1">Potential Consequences</h4>
                    <ul className="text-xs text-red-200 space-y-1">
                      <li>• Malware installation</li>
                      <li>• Personal data theft</li>
                      <li>• Financial fraud</li>
                      <li>• System compromise</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                    <h4 className="font-medium text-blue-300 text-sm mb-1">Defense Strategies</h4>
                    <ul className="text-xs text-blue-200 space-y-1">
                      <li>• Use ad blockers</li>
                      <li>• Enable browser security</li>
                      <li>• Verify URLs before clicking</li>
                      <li>• Keep software updated</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Educational Overlay */}
      {showEducationalOverlay && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Malicious Redirects: Advanced Analysis</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEducationalOverlay(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-300">
              <div>
                <h3 className="font-semibold mb-3 text-white">Understanding Malicious Redirects</h3>
                <p className="text-sm leading-relaxed">
                  Malicious redirects are a sophisticated attack vector where users are automatically sent to unintended
                  websites without their knowledge or consent. These attacks exploit vulnerabilities in web
                  infrastructure, compromised advertisements, and social engineering techniques to redirect traffic to
                  malicious destinations.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-white">Attack Methodology</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                      <h4 className="font-medium text-red-300 mb-2">Initial Compromise</h4>
                      <ul className="text-xs text-red-200 space-y-1">
                        <li>• Malicious advertisements (malvertising)</li>
                        <li>• Compromised legitimate websites</li>
                        <li>• Social engineering campaigns</li>
                        <li>• Email-based redirect links</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                      <h4 className="font-medium text-orange-300 mb-2">Redirect Chain</h4>
                      <ul className="text-xs text-orange-200 space-y-1">
                        <li>• Multiple intermediate redirects</li>
                        <li>• Geographic and device targeting</li>
                        <li>• Anti-detection mechanisms</li>
                        <li>• Dynamic payload delivery</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded">
                      <h4 className="font-medium text-purple-300 mb-2">Evasion Techniques</h4>
                      <ul className="text-xs text-purple-200 space-y-1">
                        <li>• User-agent string analysis</li>
                        <li>• Time-delayed redirects</li>
                        <li>• Cloaking and obfuscation</li>
                        <li>• Legitimate site mimicry</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                      <h4 className="font-medium text-red-300 mb-2">Final Payload</h4>
                      <ul className="text-xs text-red-200 space-y-1">
                        <li>• Exploit kit deployment</li>
                        <li>• Scareware and fake alerts</li>
                        <li>• Phishing and data theft</li>
                        <li>• Malware distribution</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-white">Advanced Detection Techniques</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                    <h4 className="font-medium text-blue-300 mb-2">Network Analysis</h4>
                    <ul className="text-xs text-blue-200 space-y-1">
                      <li>• Monitor DNS queries</li>
                      <li>• Analyze HTTP headers</li>
                      <li>• Track redirect chains</li>
                      <li>• Identify suspicious domains</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                    <h4 className="font-medium text-green-300 mb-2">Browser Security</h4>
                    <ul className="text-xs text-green-200 space-y-1">
                      <li>• Enable safe browsing</li>
                      <li>• Use script blockers</li>
                      <li>• Configure pop-up blockers</li>
                      <li>• Regular security updates</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                    <h4 className="font-medium text-yellow-300 mb-2">Behavioral Analysis</h4>
                    <ul className="text-xs text-yellow-200 space-y-1">
                      <li>• Unexpected page changes</li>
                      <li>• Multiple rapid redirects</li>
                      <li>• Suspicious URL patterns</li>
                      <li>• Unusual site behavior</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-white">Enterprise Protection Strategies</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-300">Network-Level Filtering</h4>
                      <p className="text-sm text-blue-200">
                        Implement DNS filtering, web proxies, and network security appliances to block known malicious
                        domains and redirect patterns.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-green-300">Endpoint Protection</h4>
                      <p className="text-sm text-green-200">
                        Deploy advanced endpoint detection and response (EDR) solutions with behavioral analysis
                        capabilities to identify and block malicious redirects.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-300">User Education</h4>
                      <p className="text-sm text-purple-200">
                        Conduct regular security awareness training to help users recognize and avoid clicking on
                        suspicious links and advertisements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h4 className="font-semibold text-red-300 mb-2">Critical Security Reminder</h4>
                <p className="text-sm text-red-200">
                  Malicious redirects are often the first step in complex attack chains. If you encounter unexpected
                  redirects, immediately close the browser tab, run a security scan, and report the incident to your IT
                  security team. Never interact with suspicious content or provide personal information on unexpected
                  websites.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
