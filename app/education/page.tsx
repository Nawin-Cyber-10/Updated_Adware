"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Shield, Monitor, BookOpen, Award, Target } from "lucide-react"
import Link from "next/link"

export default function EducationHub() {
  const educationModules = [
    {
      id: "identification",
      title: "Advanced Threat Identification",
      description: "Master the art of detecting sophisticated adware threats and behavioral patterns.",
      icon: <AlertTriangle className="h-8 w-8" />,
      difficulty: "Professional",
      estimatedTime: "45-60 min",
      href: "/education/identification",
      color: "yellow",
    },
    {
      id: "removal",
      title: "Professional Malware Removal",
      description: "Enterprise-grade remediation procedures and advanced removal techniques.",
      icon: <Shield className="h-8 w-8" />,
      difficulty: "Expert",
      estimatedTime: "60-90 min",
      href: "/education/removal",
      color: "red",
    },
    {
      id: "prevention",
      title: "Enterprise Security Framework",
      description: "Comprehensive defense strategies and implementation guidance for organizations.",
      icon: <Monitor className="h-8 w-8" />,
      difficulty: "Strategic",
      estimatedTime: "90-120 min",
      href: "/education/prevention",
      color: "green",
    },
    {
      id: "assessment",
      title: "Security Assessment & Certification",
      description: "Comprehensive 25-question assessment with professional certificate upon completion.",
      icon: <Award className="h-8 w-8" />,
      difficulty: "Certification",
      estimatedTime: "30-45 min",
      href: "/education/assessment",
      color: "blue",
    },
  ]

  const difficultyColors = {
    Professional: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    Expert: "bg-red-500/10 text-red-400 border-red-500/20",
    Strategic: "bg-green-500/10 text-green-400 border-green-500/20",
    Certification: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <NavigationHeader currentPage="education" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Cybersecurity Education Center</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive training modules designed for cybersecurity professionals. Master advanced threat detection,
            remediation techniques, and enterprise security frameworks.
          </p>
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mt-4">
            Professional Development Program
          </Badge>
        </div>

        {/* Learning Path Overview */}
        <Card className="mb-12 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="h-5 w-5 text-blue-400" />
              Recommended Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                  1
                </div>
                <h4 className="font-semibold text-yellow-300 mb-1">Identify</h4>
                <p className="text-xs text-yellow-200">Learn to detect threats</p>
              </div>
              <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                  2
                </div>
                <h4 className="font-semibold text-red-300 mb-1">Remove</h4>
                <p className="text-xs text-red-200">Master remediation</p>
              </div>
              <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                  3
                </div>
                <h4 className="font-semibold text-green-300 mb-1">Prevent</h4>
                <p className="text-xs text-green-200">Implement defenses</p>
              </div>
              <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                  4
                </div>
                <h4 className="font-semibold text-blue-300 mb-1">Certify</h4>
                <p className="text-xs text-blue-200">Validate knowledge</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education Modules */}
        <div className="grid md:grid-cols-2 gap-8">
          {educationModules.map((module) => (
            <Link key={module.id} href={module.href}>
              <Card className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 cursor-pointer group h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div
                      className={`p-3 rounded-lg bg-${module.color}-500/10 text-${module.color}-400 group-hover:bg-${module.color}-500/20 transition-colors`}
                    >
                      {module.icon}
                    </div>
                    <div className="text-right">
                      <Badge className={difficultyColors[module.difficulty as keyof typeof difficultyColors]}>
                        {module.difficulty}
                      </Badge>
                      <p className="text-xs text-gray-400 mt-1">{module.estimatedTime}</p>
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-red-100 transition-colors mt-4">
                    {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed mb-4">{module.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <BookOpen className="h-4 w-4" />
                      <span>Interactive Learning</span>
                    </div>
                    <div className="text-red-400 group-hover:text-red-300 transition-colors">
                      <span className="text-sm">Start Module →</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Additional Resources */}
        <Card className="mt-12 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-700/30 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Industry Standards</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• NIST Cybersecurity Framework</li>
                  <li>• ISO 27001/27002 Guidelines</li>
                  <li>• OWASP Security Principles</li>
                  <li>• SANS Critical Controls</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-700/30 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Professional Development</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Completion certificates</li>
                  <li>• Progress tracking</li>
                  <li>• Knowledge assessments</li>
                  <li>• Continuing education credits</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-700/30 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Enterprise Features</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Team progress monitoring</li>
                  <li>• Custom training paths</li>
                  <li>• Compliance reporting</li>
                  <li>• Integration capabilities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
