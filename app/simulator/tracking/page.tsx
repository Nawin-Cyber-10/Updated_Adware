"use client"

import { useState, useEffect } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { StatusIndicator } from "@/components/status-indicator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff, Info, Activity, MapPin, Clock, RotateCcw, Shield, AlertTriangle } from "lucide-react"

export default function TrackingSimulator() {
  const [trackingActive, setTrackingActive] = useState(false)
  const [showEducationalOverlay, setShowEducationalOverlay] = useState(false)
  const [trackingIntensity, setTrackingIntensity] = useState(0)
  const [simulatedData, setSimulatedData] = useState({
    pageViews: 0,
    clicksTracked: 0,
    timeSpent: 0,
    location: "Unknown",
    browserInfo: "Unknown",
    searchHistory: [] as string[],
    interests: [] as string[],
    deviceFingerprint: "Not collected",
    ipAddress: "Hidden",
    sessionDuration: 0,
  })

  const sampleSearches = [
    "cybersecurity best practices",
    "enterprise security solutions",
    "data privacy regulations",
    "malware analysis tools",
    "network security monitoring",
    "incident response procedures",
    "threat intelligence platforms",
    "security awareness training",
    "vulnerability assessment",
    "penetration testing services",
  ]

  const sampleInterests = [
    "Cybersecurity",
    "Enterprise Security",
    "Data Privacy",
    "Threat Intelligence",
    "Network Security",
    "Incident Response",
    "Security Training",
    "Compliance",
    "Risk Management",
    "Security Tools",
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (trackingActive) {
      interval = setInterval(() => {
        setSimulatedData((prev) => {
          const newData = {
            ...prev,
            pageViews: prev.pageViews + Math.floor(Math.random() * 2) + 1,
            clicksTracked: prev.clicksTracked + Math.floor(Math.random() * 3),
            timeSpent: prev.timeSpent + 3,
            sessionDuration: prev.sessionDuration + 3,
            location: "New York, NY, USA (Simulated)",
            browserInfo: "Chrome 120.0.6099.129 on Windows 11 (Simulated)",
            deviceFingerprint: "FP_" + Math.random().toString(36).substr(2, 9).toUpperCase(),
            ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)} (Simulated)`,
          }

          // Add search history
          if (prev.searchHistory.length < 10 && Math.random() > 0.6) {
            const newSearch = sampleSearches[Math.floor(Math.random() * sampleSearches.length)]
            if (!prev.searchHistory.includes(newSearch)) {
              newData.searchHistory = [...prev.searchHistory, newSearch]
            }
          }

          // Add interests
          if (prev.interests.length < 10 && Math.random() > 0.7) {
            const newInterest = sampleInterests[Math.floor(Math.random() * sampleInterests.length)]
            if (!prev.interests.includes(newInterest)) {
              newData.interests = [...prev.interests, newInterest]
            }
          }

          return newData
        })

        // Update tracking intensity
        setTrackingIntensity((prev) => Math.min(prev + 2, 100))
      }, 2000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [trackingActive])

  const startTracking = () => {
    setTrackingActive(true)
    setTrackingIntensity(0)
    setSimulatedData({
      pageViews: 1,
      clicksTracked: 0,
      timeSpent: 0,
      location: "Detecting location...",
      browserInfo: "Collecting browser data...",
      searchHistory: [],
      interests: [],
      deviceFingerprint: "Generating fingerprint...",
      ipAddress: "Resolving IP address...",
      sessionDuration: 0,
    })
  }

  const stopTracking = () => {
    setTrackingActive(false)
    setTrackingIntensity(0)
  }

  const resetData = () => {
    setTrackingActive(false)
    setTrackingIntensity(0)
    setSimulatedData({
      pageViews: 0,
      clicksTracked: 0,
      timeSpent: 0,
      location: "Unknown",
      browserInfo: "Unknown",
      searchHistory: [],
      interests: [],
      deviceFingerprint: "Not collected",
      ipAddress: "Hidden",
      sessionDuration: 0,
    })
  }

  const simulateClick = () => {
    if (trackingActive) {
      setSimulatedData((prev) => ({
        ...prev,
        clicksTracked: prev.clicksTracked + 1,
      }))
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
              <h1 className="text-3xl font-bold text-white mb-2">Advanced User Tracking Demonstration</h1>
              <p className="text-gray-400">Experience sophisticated data collection and privacy invasion techniques</p>
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
            Educational Simulation • Advanced Level
          </Badge>
        </div>

        {/* Status Indicator */}
        <StatusIndicator
          status={trackingActive ? "danger" : "safe"}
          title={trackingActive ? "Advanced Tracking Active" : "Privacy Protected"}
          description={
            trackingActive
              ? `Sophisticated data collection in progress • ${simulatedData.pageViews} pages tracked • ${Math.floor(simulatedData.sessionDuration / 60)}m ${simulatedData.sessionDuration % 60}s monitored`
              : "No tracking simulation running - your privacy is protected"
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
              <Button onClick={startTracking} disabled={trackingActive} className="bg-red-600 hover:bg-red-700">
                <Eye className="h-4 w-4 mr-2" />
                Start Tracking Simulation
              </Button>
              <Button
                onClick={stopTracking}
                disabled={!trackingActive}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <EyeOff className="h-4 w-4 mr-2" />
                Stop Tracking
              </Button>
              <Button
                onClick={resetData}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Data
              </Button>
            </div>

            {trackingActive && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Tracking Intensity</span>
                  <span>{trackingIntensity}%</span>
                </div>
                <Progress value={trackingIntensity} className="h-2" />
              </div>
            )}

            <p className="text-sm text-gray-400 mt-4">
              Experience how sophisticated adware and tracking systems collect comprehensive user data through multiple
              techniques including behavioral analysis, device fingerprinting, and cross-site tracking.
            </p>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Simulated Website */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Sample Website with Advanced Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-600 rounded-lg p-6 bg-gray-900 min-h-[500px]">
                <h2 className="text-2xl font-bold text-white mb-4">CyberSecurity Today</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  This simulates a professional website that has been compromised with advanced tracking malware. Every
                  interaction, scroll, click, and even mouse movement is being monitored and analyzed to build a
                  comprehensive profile of your behavior and preferences.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={simulateClick}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    Latest Articles
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={simulateClick}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    Security News
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={simulateClick}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    Product Reviews
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={simulateClick}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    Contact Us
                  </Button>
                </div>

                {trackingActive && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg mb-4">
                    <div className="flex items-start gap-3">
                      <Activity className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0 animate-pulse" />
                      <div>
                        <h4 className="font-semibold text-red-300 mb-2">Advanced Tracking Active</h4>
                        <p className="text-sm text-red-200">
                          Your browsing behavior, device characteristics, and personal preferences are being collected
                          and analyzed in real-time by sophisticated tracking algorithms.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Featured: Zero-Day Vulnerability Discovered</h3>
                    <p className="text-gray-400 text-sm">
                      Security researchers have identified a critical zero-day vulnerability affecting millions of
                      devices worldwide...
                    </p>
                  </div>

                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Enterprise Security Trends 2024</h3>
                    <p className="text-gray-400 text-sm">
                      Analysis of emerging cybersecurity threats and defense strategies for enterprise environments...
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <h4 className="font-semibold text-blue-300 mb-2">Invisible Tracking Elements</h4>
                  <ul className="text-sm text-blue-200 space-y-1">
                    <li>• Canvas fingerprinting scripts</li>
                    <li>• WebRTC IP detection</li>
                    <li>• Battery status monitoring</li>
                    <li>• Screen resolution tracking</li>
                    <li>• Font enumeration</li>
                    <li>• Audio context fingerprinting</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Collection Dashboard */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Activity className="h-5 w-5 text-red-400" />
                  Real-Time Data Collection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Basic Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-400">{simulatedData.pageViews}</div>
                    <div className="text-sm text-red-300">Pages Tracked</div>
                  </div>
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <div className="text-2xl font-bold text-orange-400">{simulatedData.clicksTracked}</div>
                    <div className="text-sm text-orange-300">Clicks Monitored</div>
                  </div>
                </div>

                {/* Session Information */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-white">
                      Session Duration: {Math.floor(simulatedData.sessionDuration / 60)}m{" "}
                      {simulatedData.sessionDuration % 60}s
                    </span>
                  </div>
                  <Progress value={Math.min((simulatedData.sessionDuration / 300) * 100, 100)} className="h-2" />
                </div>

                {/* Device & Location */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-400" />
                    <span className="text-gray-300">
                      <strong>Location:</strong> {simulatedData.location}
                    </span>
                  </div>
                  <div className="text-gray-300">
                    <strong>Browser:</strong> {simulatedData.browserInfo}
                  </div>
                  <div className="text-gray-300">
                    <strong>IP Address:</strong> {simulatedData.ipAddress}
                  </div>
                  <div className="text-gray-300">
                    <strong>Device ID:</strong> {simulatedData.deviceFingerprint}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search History */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Collected Search History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-32 overflow-y-auto">
                  {simulatedData.searchHistory.length > 0 ? (
                    <ul className="text-sm space-y-1">
                      {simulatedData.searchHistory.slice(-8).map((search, index) => (
                        <li key={index} className="text-gray-300 flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                          {search}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No search data collected yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Interest Profile */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Behavioral Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2 text-gray-300">Inferred Interests:</h4>
                    <div className="flex flex-wrap gap-2">
                      {simulatedData.interests.length > 0 ? (
                        simulatedData.interests.slice(0, 8).map((interest, index) => (
                          <Badge key={index} className="bg-red-500/20 text-red-300 border-red-500/30 text-xs">
                            {interest}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">Building behavioral profile...</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-600">
                    <h4 className="font-medium mb-2 text-gray-300">Risk Assessment:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Privacy Risk:</span>
                        <Badge
                          className={trackingActive ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}
                        >
                          {trackingActive ? "CRITICAL" : "MINIMAL"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Data Exposure:</span>
                        <Badge
                          className={trackingActive ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}
                        >
                          {trackingActive ? "HIGH" : "NONE"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Identity Risk:</span>
                        <Badge
                          className={trackingActive ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}
                        >
                          {trackingActive ? "SEVERE" : "PROTECTED"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {trackingActive && (
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-red-300 text-sm">Privacy Violation Alert</h5>
                        <p className="text-xs text-red-200 mt-1">
                          This data could be sold to advertisers, used for identity theft, shared with malicious third
                          parties, or used to target you with sophisticated social engineering attacks.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
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
                <CardTitle className="text-white">Advanced User Tracking: Comprehensive Analysis</CardTitle>
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
                <h3 className="font-semibold mb-3 text-white">Understanding Advanced User Tracking</h3>
                <p className="text-sm leading-relaxed">
                  Modern tracking systems employ sophisticated techniques that go far beyond simple cookies. These
                  systems create detailed digital fingerprints and behavioral profiles that can uniquely identify users
                  across devices and sessions, often without their knowledge or consent.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-white">Advanced Tracking Techniques</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                      <h4 className="font-medium text-red-300 mb-2">Device Fingerprinting</h4>
                      <ul className="text-xs text-red-200 space-y-1">
                        <li>• Canvas and WebGL fingerprinting</li>
                        <li>• Audio context analysis</li>
                        <li>• Screen resolution and color depth</li>
                        <li>• Installed fonts enumeration</li>
                        <li>• Hardware specifications</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                      <h4 className="font-medium text-orange-300 mb-2">Behavioral Analysis</h4>
                      <ul className="text-xs text-orange-200 space-y-1">
                        <li>• Mouse movement patterns</li>
                        <li>• Typing rhythm analysis</li>
                        <li>• Scroll behavior tracking</li>
                        <li>• Click pattern recognition</li>
                        <li>• Session duration analysis</li>
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded">
                      <h4 className="font-medium text-purple-300 mb-2">Cross-Site Tracking</h4>
                      <ul className="text-xs text-purple-200 space-y-1">
                        <li>• Third-party cookies</li>
                        <li>• Pixel tracking beacons</li>
                        <li>• Social media widgets</li>
                        <li>• Advertising network IDs</li>
                        <li>• URL parameter passing</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                      <h4 className="font-medium text-blue-300 mb-2">Data Correlation</h4>
                      <ul className="text-xs text-blue-200 space-y-1">
                        <li>• Email address matching</li>
                        <li>• Phone number correlation</li>
                        <li>• Social media profiling</li>
                        <li>• Purchase history analysis</li>
                        <li>• Location data fusion</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-white">Privacy Impact Assessment</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                    <h4 className="font-medium text-red-300 mb-2">Personal Risks</h4>
                    <ul className="text-xs text-red-200 space-y-1">
                      <li>• Identity theft</li>
                      <li>• Financial fraud</li>
                      <li>• Stalking and harassment</li>
                      <li>• Discrimination</li>
                      <li>• Reputation damage</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                    <h4 className="font-medium text-orange-300 mb-2">Professional Risks</h4>
                    <ul className="text-xs text-orange-200 space-y-1">
                      <li>• Corporate espionage</li>
                      <li>• Competitive intelligence</li>
                      <li>• Insider threat profiling</li>
                      <li>• Career sabotage</li>
                      <li>• Intellectual property theft</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded">
                    <h4 className="font-medium text-purple-300 mb-2">Societal Impact</h4>
                    <ul className="text-xs text-purple-200 space-y-1">
                      <li>• Democratic manipulation</li>
                      <li>• Social engineering</li>
                      <li>• Market manipulation</li>
                      <li>• Behavioral modification</li>
                      <li>• Surveillance capitalism</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-white">Advanced Protection Strategies</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-300">Browser Hardening</h4>
                      <p className="text-sm text-green-200">
                        Use privacy-focused browsers, disable JavaScript selectively, employ multiple browser profiles,
                        and regularly clear tracking data.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-blue-300">Network Protection</h4>
                      <p className="text-sm text-blue-200">
                        Use VPNs, Tor networks, DNS filtering, and network-level ad blocking to prevent tracking at the
                        infrastructure level.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-purple-300">Behavioral Countermeasures</h4>
                      <p className="text-sm text-purple-200">
                        Vary browsing patterns, use decoy searches, employ multiple identities, and practice operational
                        security (OPSEC) principles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-white">Enterprise Defense Framework</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span>Deploy comprehensive endpoint protection with anti-tracking capabilities</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span>Implement network-level filtering and monitoring solutions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span>Establish privacy-by-design policies and procedures</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <span>Conduct regular privacy impact assessments</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                      5
                    </div>
                    <span>Provide comprehensive privacy awareness training</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h4 className="font-semibold text-red-300 mb-2">Critical Privacy Alert</h4>
                <p className="text-sm text-red-200">
                  Advanced tracking represents one of the most significant privacy threats in the digital age. The data
                  collected can be used for manipulation, discrimination, and exploitation. Organizations and
                  individuals must implement comprehensive privacy protection strategies to defend against these
                  sophisticated surveillance techniques.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
