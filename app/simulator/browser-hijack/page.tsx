"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { StatusIndicator } from "@/components/status-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Home, Search, Settings, AlertTriangle, RotateCcw, Info, Play, Globe, Shield } from "lucide-react"

export default function BrowserHijackSimulator() {
  const [isHijacked, setIsHijacked] = useState(false)
  const [homepage, setHomepage] = useState("https://www.google.com")
  const [searchEngine, setSearchEngine] = useState("Google")
  const [currentUrl, setCurrentUrl] = useState("https://www.google.com")
  const [showEducationalOverlay, setShowEducationalOverlay] = useState(false)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [hijackingInProgress, setHijackingInProgress] = useState(false)

  const originalSettings = {
    homepage: "https://www.google.com",
    searchEngine: "Google",
    url: "https://www.google.com",
  }

  const hijackedSettings = {
    homepage: "https://malicious-search-engine.exploit",
    searchEngine: "ExploitSearch Pro",
    url: "https://malicious-search-engine.exploit",
  }

  const simulateHijack = () => {
    setHijackingInProgress(true)
    setSimulationProgress(0)

    // Animate the hijacking process
    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsHijacked(true)
          setHomepage(hijackedSettings.homepage)
          setSearchEngine(hijackedSettings.searchEngine)
          setCurrentUrl(hijackedSettings.url)
          setHijackingInProgress(false)
          return 100
        }
        return newProgress
      })
    }, 200)
  }

  const restoreSettings = () => {
    setIsHijacked(false)
    setHomepage(originalSettings.homepage)
    setSearchEngine(originalSettings.searchEngine)
    setCurrentUrl(originalSettings.url)
    setSimulationProgress(0)
  }

  const handleHomeClick = () => {
    if (isHijacked) {
      setCurrentUrl(hijackedSettings.url)
    } else {
      setCurrentUrl(originalSettings.url)
    }
  }

  const handleSearch = (query: string) => {
    if (isHijacked) {
      setCurrentUrl(`https://malicious-search-engine.exploit/search?q=${encodeURIComponent(query)}`)
    } else {
      setCurrentUrl(`https://www.google.com/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <NavigationHeader currentPage="simulations" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Browser Hijacking Simulator</h1>
              <p className="text-gray-400">Experience how adware modifies browser settings without consent</p>
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
          status={isHijacked ? "danger" : hijackingInProgress ? "active" : "safe"}
          title={
            isHijacked ? "Browser Hijacked" : hijackingInProgress ? "Hijacking in Progress" : "Browser Settings Secure"
          }
          description={
            isHijacked
              ? "Browser settings have been modified by simulated malware"
              : hijackingInProgress
                ? "Simulating unauthorized browser modifications..."
                : "All browser settings are normal and secure"
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
                onClick={simulateHijack}
                disabled={isHijacked || hijackingInProgress}
                className="bg-red-600 hover:bg-red-700"
              >
                <Play className="h-4 w-4 mr-2" />
                {hijackingInProgress ? "Hijacking..." : "Simulate Browser Hijack"}
              </Button>
              <Button
                onClick={restoreSettings}
                disabled={!isHijacked && !hijackingInProgress}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Restore Settings
              </Button>
            </div>

            {hijackingInProgress && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Hijacking Progress</span>
                  <span>{simulationProgress}%</span>
                </div>
                <Progress value={simulationProgress} className="h-2" />
              </div>
            )}

            <p className="text-sm text-gray-400 mt-4">
              Experience how malicious software can modify your browser settings, redirect your searches, and compromise
              your browsing experience without your knowledge or consent.
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Simulated Browser */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <span>Browser Window Simulation</span>
                {isHijacked && (
                  <Badge variant="destructive" className="animate-pulse">
                    HIJACKED
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Browser Chrome */}
              <div className="border border-gray-600 rounded-lg overflow-hidden bg-gray-900">
                {/* Browser Toolbar */}
                <div className="bg-gray-700 p-3 border-b border-gray-600 flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleHomeClick}
                    className="text-gray-300 hover:text-white"
                  >
                    <Home className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 flex items-center gap-2">
                    <Input
                      value={currentUrl}
                      readOnly
                      className={`text-sm bg-gray-800 border-gray-600 ${
                        isHijacked ? "text-red-400 border-red-500/50" : "text-green-400 border-green-500/50"
                      }`}
                    />
                    <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Search Interface */}
                <div className="p-6 bg-gray-900">
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                      <div
                        className={`text-2xl font-bold ${
                          isHijacked ? "text-red-400" : "text-blue-400"
                        } transition-colors`}
                      >
                        {isHijacked ? "🎯 ExploitSearch Pro" : "🔍 Google"}
                      </div>
                      {isHijacked && (
                        <Badge variant="destructive" className="text-xs animate-pulse">
                          MALICIOUS
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2 mb-4">
                      <Input
                        placeholder="Search the web..."
                        className="flex-1 bg-gray-800 border-gray-600 text-white"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSearch((e.target as HTMLInputElement).value)
                          }
                        }}
                      />
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Page Content */}
                <div className={`p-6 min-h-[300px] ${isHijacked ? "bg-red-950/20" : "bg-gray-800"}`}>
                  {isHijacked ? (
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-red-400 mb-4">🚨 MALICIOUS SEARCH ENGINE 🚨</h2>
                      <p className="text-red-300 mb-6">
                        Your browser has been hijacked! This search engine was set without your permission and may
                        collect your personal data.
                      </p>
                      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                        <div className="p-3 bg-red-900/30 border border-red-500/30 rounded text-red-200 text-sm">
                          🎯 Suspicious Ad #1
                          <br />
                          <span className="text-xs text-red-400">Click to install malware</span>
                        </div>
                        <div className="p-3 bg-red-900/30 border border-red-500/30 rounded text-red-200 text-sm">
                          💰 Fake Prize Alert
                          <br />
                          <span className="text-xs text-red-400">Phishing attempt</span>
                        </div>
                        <div className="p-3 bg-red-900/30 border border-red-500/30 rounded text-red-200 text-sm">
                          🔒 Fake Security Warning
                          <br />
                          <span className="text-xs text-red-400">Social engineering</span>
                        </div>
                        <div className="p-3 bg-red-900/30 border border-red-500/30 rounded text-red-200 text-sm">
                          📱 Malicious Download
                          <br />
                          <span className="text-xs text-red-400">Trojan distribution</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-blue-400 mb-4">Welcome to Google</h2>
                      <p className="text-gray-300 mb-6">Your browser settings are secure and functioning normally.</p>
                      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                        <div className="p-3 bg-gray-700/50 border border-gray-600 rounded text-gray-300 text-sm">
                          📰 Latest News
                          <br />
                          <span className="text-xs text-gray-400">Legitimate content</span>
                        </div>
                        <div className="p-3 bg-gray-700/50 border border-gray-600 rounded text-gray-300 text-sm">
                          🛒 Shopping Results
                          <br />
                          <span className="text-xs text-gray-400">Trusted retailers</span>
                        </div>
                        <div className="p-3 bg-gray-700/50 border border-gray-600 rounded text-gray-300 text-sm">
                          📚 Educational Resources
                          <br />
                          <span className="text-xs text-gray-400">Verified sources</span>
                        </div>
                        <div className="p-3 bg-gray-700/50 border border-gray-600 rounded text-gray-300 text-sm">
                          🔧 Official Tools
                          <br />
                          <span className="text-xs text-gray-400">Safe downloads</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Browser Settings Panel */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Browser Settings Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">Homepage URL:</label>
                  <Input
                    value={homepage}
                    readOnly
                    className={`${
                      isHijacked
                        ? "border-red-500/50 bg-red-950/20 text-red-300"
                        : "border-green-500/50 bg-green-950/20 text-green-300"
                    }`}
                  />
                  {isHijacked && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Homepage modified without user consent
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-2">Default Search Engine:</label>
                  <Input
                    value={searchEngine}
                    readOnly
                    className={`${
                      isHijacked
                        ? "border-red-500/50 bg-red-950/20 text-red-300"
                        : "border-green-500/50 bg-green-950/20 text-green-300"
                    }`}
                  />
                  {isHijacked && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Search engine hijacked by malware
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-600">
                  <h4 className="font-medium mb-3 text-white">Security Analysis:</h4>
                  <div className="space-y-2">
                    {isHijacked ? (
                      <>
                        <div className="flex items-center gap-2 text-red-300 text-sm">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          Browser settings compromised
                        </div>
                        <div className="flex items-center gap-2 text-red-300 text-sm">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          Search queries redirected to malicious site
                        </div>
                        <div className="flex items-center gap-2 text-red-300 text-sm">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          User privacy at risk
                        </div>
                        <div className="flex items-center gap-2 text-red-300 text-sm">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          Potential data collection active
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 text-green-300 text-sm">
                          <Shield className="h-4 w-4 text-green-400" />
                          Browser settings are secure
                        </div>
                        <div className="flex items-center gap-2 text-green-300 text-sm">
                          <Shield className="h-4 w-4 text-green-400" />
                          Search queries use trusted engine
                        </div>
                        <div className="flex items-center gap-2 text-green-300 text-sm">
                          <Shield className="h-4 w-4 text-green-400" />
                          No unauthorized modifications detected
                        </div>
                        <div className="flex items-center gap-2 text-green-300 text-sm">
                          <Shield className="h-4 w-4 text-green-400" />
                          Privacy settings intact
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact Assessment */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Impact Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Privacy Risk:</span>
                    <Badge className={isHijacked ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}>
                      {isHijacked ? "HIGH" : "LOW"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Data Security:</span>
                    <Badge className={isHijacked ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}>
                      {isHijacked ? "COMPROMISED" : "SECURE"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">User Control:</span>
                    <Badge className={isHijacked ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}>
                      {isHijacked ? "LOST" : "MAINTAINED"}
                    </Badge>
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
          <Card className="max-w-3xl w-full max-h-[80vh] overflow-y-auto bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Browser Hijacking: Advanced Learning Guide</CardTitle>
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
                <h3 className="font-semibold mb-3 text-white">Understanding Browser Hijacking</h3>
                <p className="text-sm leading-relaxed">
                  Browser hijacking is a sophisticated form of malware that modifies web browser settings without user
                  consent. This type of attack redirects users to malicious websites, changes search engines, and can
                  compromise personal data and system security.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-white">Common Hijacking Techniques</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                    <h4 className="font-medium text-red-300 mb-2">Registry Modification</h4>
                    <p className="text-xs text-red-200">
                      Malware modifies Windows registry entries to change browser default settings permanently.
                    </p>
                  </div>
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                    <h4 className="font-medium text-red-300 mb-2">Extension Injection</h4>
                    <p className="text-xs text-red-200">
                      Malicious browser extensions are installed to control browsing behavior and collect data.
                    </p>
                  </div>
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                    <h4 className="font-medium text-red-300 mb-2">DNS Hijacking</h4>
                    <p className="text-xs text-red-200">
                      Network settings are modified to redirect all web traffic through malicious servers.
                    </p>
                  </div>
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                    <h4 className="font-medium text-red-300 mb-2">Proxy Manipulation</h4>
                    <p className="text-xs text-red-200">
                      Browser proxy settings are changed to route traffic through attacker-controlled servers.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-white">Detection & Prevention</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Globe className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-300">Regular Settings Audit</h4>
                      <p className="text-sm text-blue-200">
                        Periodically check browser homepage, search engine, and extension settings for unauthorized
                        changes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-300">Security Software</h4>
                      <p className="text-sm text-green-200">
                        Use reputable antivirus with real-time protection and browser security features enabled.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Settings className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-300">Browser Hardening</h4>
                      <p className="text-sm text-yellow-200">
                        Configure browser security settings, disable automatic downloads, and review extension
                        permissions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-white">Recovery Procedures</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span>Reset browser to factory defaults</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span>Remove suspicious extensions and toolbars</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span>Run comprehensive malware scan</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <span>Check and reset network/proxy settings</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      5
                    </div>
                    <span>Update browser and security software</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <h4 className="font-semibold text-yellow-300 mb-2">Professional Insight</h4>
                <p className="text-sm text-yellow-200">
                  Browser hijacking is often part of larger malware campaigns. Always perform comprehensive system scans
                  and consider professional remediation for critical systems or persistent infections.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
