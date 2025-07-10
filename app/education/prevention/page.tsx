"use client"

import { useState } from "react"
import { NavigationHeader } from "@/components/navigation-header"
import { StatusIndicator } from "@/components/status-indicator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Shield, Lock, Globe, AlertTriangle, CheckCircle, Users, Building } from "lucide-react"
import Link from "next/link"

export default function PreventionGuide() {
  const [currentLayer, setCurrentLayer] = useState(0)
  const [completedLayers, setCompletedLayers] = useState<number[]>([])
  const [selectedFramework, setSelectedFramework] = useState("enterprise")
  const [showImplementationGuide, setShowImplementationGuide] = useState(false)

  const preventionLayers = [
    {
      category: "Network Security",
      icon: <Globe className="h-6 w-6" />,
      color: "blue",
      strategies: [
        "Deploy next-generation firewalls with deep packet inspection",
        "Implement DNS filtering and threat intelligence feeds",
        "Use network segmentation and zero-trust architecture",
        "Monitor network traffic with behavioral analysis",
        "Deploy intrusion detection and prevention systems",
        "Implement secure web gateways and proxy filtering",
      ],
    },
    {
      category: "Endpoint Protection",
      icon: <Shield className="h-6 w-6" />,
      color: "green",
      strategies: [
        "Deploy enterprise endpoint detection and response (EDR)",
        "Implement application whitelisting and control",
        "Use behavioral analysis and machine learning detection",
        "Enable real-time file system and registry monitoring",
        "Deploy advanced anti-malware with cloud intelligence",
        "Implement device control and USB restrictions",
      ],
    },
    {
      category: "Browser Security",
      icon: <Lock className="h-6 w-6" />,
      color: "purple",
      strategies: [
        "Enforce enterprise browser security policies",
        "Deploy browser isolation and sandboxing",
        "Implement content filtering and URL reputation",
        "Use certificate pinning and HTTPS enforcement",
        "Deploy browser extension management and control",
        "Enable advanced phishing and malware protection",
      ],
    },
    {
      category: "User Education",
      icon: <Users className="h-6 w-6" />,
      color: "orange",
      strategies: [
        "Conduct regular security awareness training programs",
        "Implement phishing simulation and testing",
        "Provide role-based security training modules",
        "Create incident reporting and response procedures",
        "Establish security champion programs",
        "Deploy just-in-time security guidance systems",
      ],
    },
  ]

  const riskAssessment = [
    {
      source: "Email Attachments",
      risk: "High",
      mitigation: "Advanced email security with sandboxing and behavioral analysis",
      impact: "System compromise, data theft, lateral movement",
    },
    {
      source: "Web Downloads",
      risk: "High",
      mitigation: "Application control, download scanning, and user restrictions",
      impact: "Malware installation, system infection, data loss",
    },
    {
      source: "Social Engineering",
      risk: "Critical",
      mitigation: "User training, verification procedures, and incident response",
      impact: "Credential theft, unauthorized access, financial fraud",
    },
    {
      source: "Software Vulnerabilities",
      risk: "Medium",
      mitigation: "Patch management, vulnerability scanning, and virtual patching",
      impact: "Privilege escalation, system compromise, data breach",
    },
    {
      source: "Removable Media",
      risk: "Medium",
      mitigation: "Device control policies and endpoint protection",
      impact: "Malware introduction, data exfiltration, policy violations",
    },
  ]

  const implementationFrameworks = {
    enterprise: {
      name: "Enterprise Framework",
      phases: [
        {
          phase: "Assessment & Planning",
          duration: "2-4 weeks",
          activities: [
            "Conduct comprehensive security assessment",
            "Identify critical assets and vulnerabilities",
            "Develop implementation roadmap and timeline",
            "Establish success metrics and KPIs",
          ],
        },
        {
          phase: "Infrastructure Deployment",
          duration: "4-8 weeks",
          activities: [
            "Deploy network security controls",
            "Implement endpoint protection solutions",
            "Configure monitoring and logging systems",
            "Establish incident response capabilities",
          ],
        },
        {
          phase: "Policy & Training",
          duration: "2-6 weeks",
          activities: [
            "Develop security policies and procedures",
            "Create user training programs",
            "Implement access controls and permissions",
            "Establish compliance monitoring",
          ],
        },
        {
          phase: "Monitoring & Optimization",
          duration: "Ongoing",
          activities: [
            "Continuous security monitoring",
            "Regular security assessments",
            "Policy updates and improvements",
            "Threat intelligence integration",
          ],
        },
      ],
    },
    smb: {
      name: "Small-Medium Business",
      phases: [
        {
          phase: "Essential Security",
          duration: "1-2 weeks",
          activities: [
            "Deploy basic endpoint protection",
            "Configure firewall and network security",
            "Implement backup and recovery solutions",
            "Establish basic security policies",
          ],
        },
        {
          phase: "Enhanced Protection",
          duration: "2-4 weeks",
          activities: [
            "Add email security and filtering",
            "Implement web content filtering",
            "Deploy patch management system",
            "Create incident response plan",
          ],
        },
        {
          phase: "User Training",
          duration: "1-2 weeks",
          activities: [
            "Conduct security awareness training",
            "Implement phishing simulation",
            "Create security guidelines",
            "Establish reporting procedures",
          ],
        },
        {
          phase: "Continuous Improvement",
          duration: "Ongoing",
          activities: [
            "Regular security reviews",
            "Update training materials",
            "Monitor threat landscape",
            "Adjust security controls",
          ],
        },
      ],
    },
  }

  const markLayerComplete = (layerIndex: number) => {
    if (!completedLayers.includes(layerIndex)) {
      setCompletedLayers([...completedLayers, layerIndex])
    }
  }

  const progressPercentage = (completedLayers.length / 4) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <NavigationHeader currentPage="education" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Enterprise Security Prevention Framework</h1>
              <p className="text-gray-400">Comprehensive defense strategies and implementation guidance</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowImplementationGuide(true)}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <Building className="h-4 w-4 mr-2" />
              Implementation Guide
            </Button>
          </div>
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
            Educational Resource • Strategic Level
          </Badge>
        </div>

        {/* Progress Indicator */}
        <StatusIndicator
          status="active"
          title="Defense Implementation Progress"
          description={`${completedLayers.length} of 4 security layers completed • ${Math.round(progressPercentage)}% coverage`}
          className="mb-8"
        />

        {/* Progress Tracking */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardContent className="pt-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Security Layer Implementation</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2 mb-4" />
            <div className="grid grid-cols-4 gap-2">
              {preventionLayers.map((layer, index) => (
                <div
                  key={index}
                  className={`text-center p-2 rounded text-xs ${
                    completedLayers.includes(index)
                      ? "bg-green-500/20 text-green-400"
                      : currentLayer === index
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-gray-700/50 text-gray-500"
                  }`}
                >
                  {layer.category}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="h-5 w-5 text-green-400" />
              Defense-in-Depth Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                Modern cybersecurity requires a layered defense approach that combines technical controls, process
                improvements, and human factors. This framework provides enterprise-grade prevention strategies that
                address the full spectrum of adware and malware threats.
              </p>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-center">
                  <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-blue-300 mb-1">Network</h4>
                  <p className="text-xs text-blue-200">Perimeter defense and traffic analysis</p>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-center">
                  <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-300 mb-1">Endpoint</h4>
                  <p className="text-xs text-green-200">Device protection and monitoring</p>
                </div>
                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg text-center">
                  <Lock className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-purple-300 mb-1">Application</h4>
                  <p className="text-xs text-purple-200">Browser and software security</p>
                </div>
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg text-center">
                  <Users className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <h4 className="font-semibold text-orange-300 mb-1">Human</h4>
                  <p className="text-xs text-orange-200">Training and awareness</p>
                </div>
              </div>

              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-300 mb-2">Core Principle</h4>
                    <p className="text-sm text-green-200">
                      Prevention is exponentially more cost-effective than remediation. A comprehensive prevention
                      strategy reduces incident response costs by up to 95% while maintaining business continuity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prevention Layers */}
        <div className="space-y-6 mb-8">
          <h2 className="text-2xl font-bold text-white">Multi-Layer Defense Architecture</h2>
          {preventionLayers.map((layer, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <div className={`p-2 rounded-lg bg-${layer.color}-500/10`}>
                    <div className={`text-${layer.color}-400`}>{layer.icon}</div>
                  </div>
                  Layer {index + 1}: {layer.category}
                  <Badge className={`bg-${layer.color}-500/20 text-${layer.color}-400`}>
                    {layer.strategies.length} Controls
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3 mb-4">
                  {layer.strategies.map((strategy, strategyIndex) => (
                    <div key={strategyIndex} className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
                      <CheckCircle className={`h-4 w-4 text-${layer.color}-400 mt-0.5 flex-shrink-0`} />
                      <span className="text-sm text-gray-200">{strategy}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-gray-700/20 rounded-lg">
                  <h4 className="font-medium text-gray-300 mb-2">Implementation Priority:</h4>
                  <p className="text-sm text-gray-400">
                    {layer.category === "Network Security" &&
                      "Establish perimeter defenses first to prevent malicious traffic from reaching endpoints. Critical for blocking command and control communications."}
                    {layer.category === "Endpoint Protection" &&
                      "Deploy comprehensive endpoint security to detect and prevent malware execution. Essential for protecting individual devices and preventing lateral movement."}
                    {layer.category === "Browser Security" &&
                      "Secure web browsing is crucial as browsers are the primary attack vector for adware. Implement strict policies and monitoring."}
                    {layer.category === "User Education" &&
                      "Human factors are often the weakest link. Regular training and awareness programs significantly reduce successful social engineering attacks."}
                  </p>
                </div>

                <Button
                  onClick={() => markLayerComplete(index)}
                  className="bg-blue-600 hover:bg-blue-700 mt-4"
                  disabled={completedLayers.includes(index)}
                >
                  {completedLayers.includes(index) ? "✓ Layer Complete" : "Mark Layer Complete"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Risk Assessment Matrix */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Enterprise Risk Assessment Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-6">
              Comprehensive risk analysis for common attack vectors and recommended mitigation strategies:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left p-3 text-gray-300">Attack Vector</th>
                    <th className="text-left p-3 text-gray-300">Risk Level</th>
                    <th className="text-left p-3 text-gray-300">Mitigation Strategy</th>
                    <th className="text-left p-3 text-gray-300">Potential Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {riskAssessment.map((risk, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-3 text-gray-200 font-medium">{risk.source}</td>
                      <td className="p-3">
                        <Badge
                          className={
                            risk.risk === "Critical"
                              ? "bg-red-500/20 text-red-400"
                              : risk.risk === "High"
                                ? "bg-orange-500/20 text-orange-400"
                                : "bg-yellow-500/20 text-yellow-400"
                          }
                        >
                          {risk.risk}
                        </Badge>
                      </td>
                      <td className="p-3 text-gray-300">{risk.mitigation}</td>
                      <td className="p-3 text-gray-400 text-xs">{risk.impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="font-semibold text-blue-300 mb-2">Risk Prioritization</h4>
              <p className="text-sm text-blue-200">
                Focus on Critical and High-risk vectors first. Implement layered controls that address multiple attack
                vectors simultaneously for maximum efficiency and cost-effectiveness.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Compliance & Standards */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Compliance & Industry Standards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">NIST Cybersecurity Framework</h4>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• Identify critical assets</li>
                  <li>• Protect through controls</li>
                  <li>• Detect threats early</li>
                  <li>• Respond to incidents</li>
                  <li>• Recover operations</li>
                </ul>
              </div>

              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">ISO 27001/27002</h4>
                <ul className="text-sm text-green-200 space-y-1">
                  <li>• Information security management</li>
                  <li>• Risk assessment procedures</li>
                  <li>• Security control implementation</li>
                  <li>• Continuous improvement</li>
                  <li>• Audit and compliance</li>
                </ul>
              </div>

              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Industry Regulations</h4>
                <ul className="text-sm text-purple-200 space-y-1">
                  <li>• GDPR data protection</li>
                  <li>• HIPAA healthcare security</li>
                  <li>• PCI DSS payment security</li>
                  <li>• SOX financial controls</li>
                  <li>• Sector-specific requirements</li>
                </ul>
              </div>
            </div>

            {completedLayers.length === 4 && (
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <div>
                    <h4 className="font-semibold text-green-300">Defense Framework Complete!</h4>
                    <p className="text-sm text-green-200 mt-1">
                      All security layers implemented. Your organization now has comprehensive protection against
                      advanced threats.
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
            <CardTitle className="text-white">Continuous Security Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-6">
              Security is an ongoing process. Continue strengthening your defenses with these resources:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/education/identification">
                <Card className="bg-gray-700/30 border-gray-600 hover:border-gray-500 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-8 w-8 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-gray-100">Threat Detection</h3>
                        <p className="text-sm text-gray-400 mt-1">Advanced identification and analysis techniques</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/education/removal">
                <Card className="bg-gray-700/30 border-gray-600 hover:border-gray-500 transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="h-8 w-8 text-red-400 group-hover:text-red-300 transition-colors" />
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-gray-100">Incident Response</h3>
                        <p className="text-sm text-gray-400 mt-1">Professional remediation procedures</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Implementation Guide Modal */}
      {showImplementationGuide && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Security Implementation Framework</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowImplementationGuide(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2 mb-4">
                {Object.entries(implementationFrameworks).map(([key, framework]) => (
                  <Button
                    key={key}
                    variant={selectedFramework === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFramework(key)}
                    className={
                      selectedFramework === key
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    }
                  >
                    {framework.name}
                  </Button>
                ))}
              </div>

              <div className="space-y-4">
                {implementationFrameworks[selectedFramework as keyof typeof implementationFrameworks].phases.map(
                  (phase, index) => (
                    <div key={index} className="p-4 bg-gray-700/30 border border-gray-600 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{phase.phase}</h4>
                          <Badge className="bg-blue-500/20 text-blue-400 text-xs">{phase.duration}</Badge>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {phase.activities.map((activity, activityIndex) => (
                          <li key={activityIndex} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ),
                )}
              </div>

              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">Implementation Success Factors</h4>
                <ul className="text-sm text-green-200 space-y-1">
                  <li>• Executive sponsorship and budget allocation</li>
                  <li>• Cross-functional team collaboration</li>
                  <li>• Phased rollout with pilot testing</li>
                  <li>• Regular progress monitoring and adjustment</li>
                  <li>• User training and change management</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
