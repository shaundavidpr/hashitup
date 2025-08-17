import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  Users, 
  Clock, 
  Trophy, 
  Shield, 
  Calendar,
  MapPin,
  Backpack,
  AlertTriangle,
  CheckCircle,
  Phone,
  FileText,
  DollarSign,
  ArrowLeft,
  Github,
  Lightbulb
} from 'lucide-react'
import Link from 'next/link'

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at center, rgba(255, 0, 204, 0.05) 0%, transparent 70%),
              radial-gradient(ellipse at 80% 20%, rgba(0, 255, 255, 0.07) 0%, transparent 60%),
              radial-gradient(ellipse at 20% 80%, rgba(255, 105, 180, 0.05) 0%, transparent 55%)
            `,
          }}
        />
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.05)" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              ⚡ <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">HASH 2K25</span> ⚡
            </h1>
            <p className="text-xl text-gray-300 italic">"Code the Grid. Forge the Future."</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-6">
              Rules & Guidelines
            </h2>
            <p className="text-lg text-gray-400">
              National Level 24-Hour Hackathon
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Team Formation */}
          <Card className="p-8 bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">1. Team Formation</h3>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>• Each team must consist of a <strong className="text-white">minimum of 2 and maximum of 4 student members</strong>.</p>
              <p>• <strong className="text-white">Participants from any academic background</strong> (engineering, arts, science) are eligible.</p>
              <p>• <strong className="text-white">External participants/visitors</strong> may accompany the team for support but <strong className="text-white">will not be counted in the official team name or for evaluation</strong>.</p>
              <p>• <strong className="text-red-400">No change in team composition is allowed after final registration.</strong></p>
            </div>
          </Card>

          {/* Project Scope */}
          <Card className="p-8 bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Lightbulb className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">2. Project Scope</h3>
              <Badge variant="outline" className="text-green-400 border-green-400 ml-auto">Open Theme</Badge>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>• <strong className="text-green-400">No specific theme</strong> for the hackathon, giving teams the freedom to think boldly and creatively.</p>
              <p>• Participants are encouraged to develop projects that are <strong className="text-white">innovative, socially relevant, and sustainable</strong>.</p>
              <p>• Ideas that aim to solve <strong className="text-white">real-world problems</strong> or <strong className="text-white">improve the quality of life</strong> will be highly valued.</p>
              <p>• Projects should reflect <strong className="text-white">clear impact, practical scalability, and meaningful usability</strong>.</p>
            </div>
          </Card>

          {/* Time Limits */}
          <Card className="p-8 bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Clock className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">3. Time Limits</h3>
              <Badge variant="outline" className="text-orange-400 border-orange-400 ml-auto">24 Hours</Badge>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>• The hackathon will run for exactly <strong className="text-white">24 hours</strong>.</p>
              <div className="bg-slate-700/50 p-6 rounded-lg space-y-3 border border-slate-600">
                <p><strong className="text-orange-400">Start Time:</strong> 3:00 PM, Day 1</p>
                <p><strong className="text-orange-400">End Time:</strong> 3:00 PM, Day 2</p>
                <p><strong className="text-orange-400">First Round Judging:</strong> 12:00 PM on Day 2</p>
                <p><strong className="text-orange-400">Second Round:</strong> Top 10 teams</p>
                <p><strong className="text-orange-400">Final Results:</strong> Around 4:00 PM</p>
              </div>
            </div>
          </Card>

          {/* Code Ownership */}
          <Card className="p-8 bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <Github className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">4. Code Ownership & Use of External Resources</h3>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>• All code must be the <strong className="text-white">original work of the team</strong>, developed <strong className="text-white">during the hackathon</strong>.</p>
              <p>• Only <strong className="text-white">open-source tools, libraries, APIs, and frameworks</strong> are permitted for use, and they must be properly cited.</p>
              <p>• <strong className="text-white">All code and documentation must be pushed to GitHub</strong> before final submission.</p>
              <p>• A <strong className="text-white">technical report</strong> must be submitted if any team uses pre-developed components such as custom-built frameworks or previously created modules, detailing their purpose, integration, and relevance to the project.</p>
              <div className="bg-red-900/20 border border-red-700 p-4 rounded-lg">
                <p className="text-red-300 font-medium">⚠️ <strong>Any plagiarized or pre-built project submissions will lead to disqualification.</strong></p>
              </div>
            </div>
          </Card>

          {/* Collaboration */}
          <Card className="p-8 bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">5. Collaboration</h3>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>• Collaboration must be <strong className="text-white">within the team only</strong>.</p>
              <p>• <strong className="text-red-400">Cross-team collaboration is not permitted</strong>.</p>
              <p>• This is strictly a <strong className="text-white">student-only hackathon</strong>.</p>
            </div>
          </Card>

          {/* Judging Criteria */}
          <Card className="p-8 bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <Trophy className="h-6 w-6 text-yellow-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">6. Judging Criteria</h3>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>Projects will be evaluated based on five key criteria. <strong className="text-white">Each of these criteria will carry equal weight</strong> during the evaluation process to ensure a fair and well-rounded assessment.</p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                  <p className="font-medium text-white">• Innovation and Creativity</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                  <p className="font-medium text-white">• Sustainability and Impact</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                  <p className="font-medium text-white">• Social Relevance</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                  <p className="font-medium text-white">• Functionality and Technical Execution</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600 md:col-span-2">
                  <p className="font-medium text-white">• Presentation and Communication</p>
                </div>
              </div>
              <p className="text-yellow-300 font-medium">✨ In addition, the most inspiring project may be rewarded by our sponsors.</p>
            </div>
          </Card>

          {/* Ethical Practices */}
          <Card className="p-8 bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-pink-500/20 rounded-lg">
                <Shield className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">7. Ethical Practices & Fair Play</h3>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>• Participants are expected to maintain <strong className="text-white">integrity, honesty, and sportsmanship</strong>.</p>
              <p>• Any kind of <strong className="text-red-400">plagiarism, misbehavior, or misconduct</strong> may result in <strong className="text-red-400">immediate disqualification</strong>.</p>
              <p>• Teams must not interfere with or sabotage other teams' work.</p>
            </div>
          </Card>

          {/* Intellectual Property */}
          <Card className="p-8 bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-violet-500/20 rounded-lg">
                <FileText className="h-6 w-6 text-violet-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">8. Intellectual Property</h3>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>• Teams retain <strong className="text-white">full ownership</strong> of their projects and intellectual property.</p>
              <p>• Organizers may request permission to showcase the project for promotional or educational purposes.</p>
              <p>• Additionally, sponsors may use selected projects for marketing purposes and may contact teams using the phone numbers provided during registration.</p>
              <p>• <strong className="text-white">No other personal information will be shared without consent.</strong></p>
            </div>
          </Card>

          {/* Deadlines */}
          <Card className="p-8 bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-indigo-500/20 rounded-lg">
                <Calendar className="h-6 w-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">9. Deadlines</h3>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>• Project code, GitHub link, supporting documentation, and technical report must be submitted by the deadline announced during the event.</p>
              <div className="bg-indigo-900/20 border border-indigo-700 p-6 rounded-lg space-y-3">
                <p><strong className="text-indigo-400">Registrations will close by:</strong> 10th September 2025</p>
                <p><strong className="text-indigo-400">Shortlisted results will be published between:</strong> 15th and 17th September 2025</p>
              </div>
              <p>• <strong className="text-red-400">Late submissions will not be considered for evaluation.</strong></p>
            </div>
          </Card>

          {/* Disqualification */}
          <Card className="p-8 bg-red-900/20 border-red-700 hover:border-red-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-semibold text-red-300">10. Disqualification</h3>
            </div>
            <div className="space-y-4 text-red-200">
              <p>A team may face disqualification if it <strong>violates any of the stated rules</strong>, <strong>submits plagiarized content</strong>, or <strong>displays inappropriate behaviour toward fellow participants or organizers</strong>.</p>
            </div>
          </Card>

          {/* Communication */}
          <Card className="p-8 bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Phone className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">11. Communication</h3>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>• All official announcements will be communicated via <strong className="text-white">email</strong> to the registered team members.</p>
              <p>• For queries, contact: <em className="text-gray-400">[Organizing team contact info to be added]</em></p>
            </div>
          </Card>

          {/* Registration Procedure */}
          <Card className="p-8 bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">12. Registration Procedure</h3>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>• All participants must <strong className="text-white">register through the official link provided</strong>.</p>
              <p>• Each team must submit their <strong className="text-white">team's name, member details, project title, and a brief description of their idea</strong>.</p>
              <p>• From all submissions, a <strong className="text-white">maximum of 100 teams</strong> will be shortlisted based on the <strong className="text-white">clarity, originality, and relevance</strong> of their proposed projects.</p>
              <div className="bg-emerald-900/20 border border-emerald-700 p-6 rounded-lg space-y-3">
                <p><strong className="text-emerald-400">Registration Fee:</strong> ₹400 per team (includes access to the hackathon and participation)</p>
                <p><strong className="text-emerald-400">Food Registration:</strong> Separate, with additional slips issued</p>
              </div>
              <p>• Before entering the hackathon, each team must submit a <strong className="text-white">formal confirmation on their college letterhead</strong>, including team details and a declaration of participation.</p>
            </div>
          </Card>

          {/* Transport & Logistics */}
          <Card className="p-8 bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-teal-500/20 rounded-lg">
                <MapPin className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">13. Transport and Logistics</h3>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>• <strong className="text-white">Local shuttle buses</strong> (college buses) will be available for pick-up and drop to the nearby town within a <strong className="text-white">5 km radius</strong>.</p>
              <p>• For teams bringing <strong className="text-white">heavy hardware components</strong>, <strong className="text-white">tempo arrangements</strong> can be provided upon prior intimation.</p>
            </div>
          </Card>

          {/* What to Carry */}
          <Card className="p-8 bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-cyan-500/20 rounded-lg">
                <Backpack className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">14. What to Carry: Participant Essentials</h3>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>Participants are advised to carry all necessary <strong className="text-white">personal and technical essentials</strong> for a smooth experience.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-cyan-300 text-lg">Technical Essentials:</h4>
                  <ul className="space-y-2">
                    <li>• Extension boards, chargers, and adapters</li>
                    <li>• Laptops, mouse, and USB devices</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-cyan-300 text-lg">Personal Items:</h4>
                  <ul className="space-y-2">
                    <li>• Water bottles and hygiene supplies</li>
                    <li>• <strong className="text-white">College ID card (mandatory for entry)</strong></li>
                  </ul>
                </div>
              </div>
              <div className="bg-cyan-900/20 border border-cyan-700 p-4 rounded-lg">
                <p className="text-cyan-300 font-medium">🌡️ <strong>Weather Alert:</strong> As the venue is located in the high-range region of Kuttikkanam and temperatures may drop overnight, it is strongly recommended to bring <strong>blankets, shawls, or sweaters</strong>.</p>
              </div>
            </div>
          </Card>

          {/* Additional Notes */}
          <Card className="p-8 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600 hover:border-slate-500 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <CheckCircle className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">15. Additional Notes</h3>
            </div>
            <div className="space-y-4 text-slate-300">
              <p>• <strong className="text-white">Safety and security</strong> will be ensured throughout the 24 hours.</p>
              <p>• <strong className="text-white">Refreshments</strong> will be provided at regular intervals.</p>
              <p>• <strong className="text-white">Cleanliness and respectful use of the venue</strong> are expected.</p>
              <p>• <strong className="text-white">Photos and videos</strong> may be taken for promotional purposes.</p>
              <div className="bg-emerald-900/20 border border-emerald-700 p-6 rounded-lg mt-6">
                <p className="text-emerald-300 font-medium text-center text-lg">
                  🚀 Most importantly, have fun and build something impactful!
                </p>
                <p className="text-emerald-300 font-medium text-center mt-3 text-lg">
                  Let's innovate, collaborate, and hack for change! ⚡
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Join HASH 2K25?</h3>
            <p className="text-gray-400 mb-6">
              Register your team and be part of this amazing 24-hour innovation journey!
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/30"
            >
              Register Your Team Now ⚡
            </Link>
            <p className="text-gray-500 mt-4 text-sm">
              Registration closes on 10th September 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
