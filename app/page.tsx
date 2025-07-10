"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { SimulationCard } from "@/components/simulation-card"
import { StatusIndicator } from "@/components/status-indicator"
import { ExploitLogo } from "@/components/exploit-logo"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Monitor, Smartphone, BookOpen, Shield, Target, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [showDisclaimer, setShowDisclaimer] = useState(true)

  const simulationModules = [
    {
      id: "popup-ads",
      title: "Pop-up Advertisement Simulator",
      description:
        "Experience intrusive pop-up ads and learn advanced identification techniques for modern adware threats.",
      icon: <AlertTriangle className="h-6 w-6" />,
      difficulty: "Beginner" as const,
      href: "/simulator/popup-ads",
      estimatedTime: "5-8 min",
    },
    {
      id: "browser-hijack",
      title: "Browser Hijacking Simulator",
      description: "Witness how sophisticated adware modifies browser settings and compromises user security.",
      icon: <Monitor className="h-6 w-6" />,
      difficulty: "Intermediate" as const,
      href: "/simulator/browser-hijack",
      estimatedTime: "8-12 min",
    },
    {
      id: "redirect-attacks",
      title: "Malicious Redirect Simulator",
      description: "Experience complex redirect chains and learn to identify suspicious website behavior patterns.",
      icon: <Target className="h-6 w-6" />,
      difficulty: "Intermediate" as const,
      href: "/simulator/redirects",
      estimatedTime: "6-10 min",
    },
    {
      id: "tracking-demo",
      title: "Advanced Tracking Demonstration",
      description:
        "Understand sophisticated user tracking methods and privacy invasion techniques used by modern adware.",
      icon: <Zap className="h-6 w-6" />,
      difficulty: "Advanced" as const,
      href: "/simulator/tracking",
      estimatedTime: "10-15 min",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <NavigationHeader currentPage="home" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <ExploitLogo size="xl" className="text-red-500" />
            <div className="text-left">
              <h1 className="text-5xl font-bold text-white mb-2">
                Exploit
                <span className="text-red-500">.</span>
              </h1>
              <p className="text-xl text-gray-300">Advanced Adware Simulation Platform</p>
            </div>
          </div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Master cybersecurity through hands-on experience with our comprehensive adware simulation environment. Learn
            to identify, analyze, and defend against modern threats in a controlled, educational setting.
          </p>
        </div>

        {/* Disclaimer */}
        {showDisclaimer && (
          <StatusIndicator
            status="warning"
            title="Educational Simulation Environment"
            description="This is a controlled cybersecurity training platform. All malware behaviors are simulated for educational purposes. No real threats are present, and no actual data collection occurs."
            className="mb-8"
          />
        )}

        {/* Platform Compatibility */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-red-400" />
              Cross-Platform Compatibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <Monitor className="h-8 w-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-300">Desktop Experience</h3>
                  <p className="text-sm text-green-200 mt-1">
                    Full-featured simulation suite with advanced analytics and detailed reporting
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Smartphone className="h-8 w-8 text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-300">Mobile Optimized</h3>
                  <p className="text-sm text-blue-200 mt-1">
                    Touch-friendly interface with responsive design for Android and iOS devices
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simulation Modules */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Simulation Modules</h2>
            <Badge className="bg-red-500/10 text-red-400 border-red-500/20">4 Interactive Scenarios</Badge>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {simulationModules.map((module) => (
              <SimulationCard key={module.id} {...module} />
            ))}
          </div>
        </div>

        {/* Educational Resources */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <BookOpen className="h-5 w-5 text-red-400" />
              Educational Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/education/identification" className="group">
                <div className="p-4 rounded-lg border border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-700/30 transition-all duration-300">
                  <div className="flex flex-col items-center text-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-gray-100">Threat Identification</h3>
                      <p className="text-sm text-gray-400 mt-1">Learn to recognize adware signatures and behaviors</p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/education/removal" className="group">
                <div className="p-4 rounded-lg border border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-700/30 transition-all duration-300">
                  <div className="flex flex-col items-center text-center gap-3">
                    <Shield className="h-8 w-8 text-green-400 group-hover:text-green-300 transition-colors" />
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-gray-100">Removal Techniques</h3>
                      <p className="text-sm text-gray-400 mt-1">Master advanced malware removal procedures</p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/education/prevention" className="group">
                <div className="p-4 rounded-lg border border-gray-700 bg-gray-800/30 hover:border-gray-600 hover:bg-gray-700/30 transition-all duration-300">
                  <div className="flex flex-col items-center text-center gap-3">
                    <Monitor className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-gray-100">Prevention Strategies</h3>
                      <p className="text-sm text-gray-400 mt-1">Implement proactive security measures</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ExploitLogo size="sm" className="text-red-500" />
              <div className="text-sm text-gray-400">
                <p>© 2024 Exploit Adware Simulator</p>
                <p>Educational cybersecurity training platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Built for cybersecurity professionals</span>
              <Badge variant="outline" className="border-gray-600 text-gray-400">
                v2.0
              </Badge>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
