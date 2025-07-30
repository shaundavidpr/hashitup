'use client'

import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { 
  Users, 
  Clock, 
  Code, 
  Trophy, 
  Shield, 
  Calendar,
  MapPin,
  Backpack,
  AlertTriangle,
  CheckCircle,
  Phone,
  FileText,
  DollarSign
} from 'lucide-react'

export function RulesAndRegulations() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Rules & Guidelines
        </h2>
        <p className="text-slate-400 text-lg">
          National Level 24-Hour Hackathon
        </p>
      </div>

      <div className="grid gap-6">
        {/* Team Formation */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">1. Team Formation</h3>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>• Each team must consist of a <strong>minimum of 2 and maximum of 4 student members</strong>.</p>
            <p>• Participants from any academic background (engineering, arts, science) are eligible.</p>
            <p>• External project guide/visitors may accompany the team for support but will not be counted in the official team's name or for evaluation.</p>
            <p>• <strong>No change in team composition is allowed after final registration.</strong></p>
          </div>
        </Card>

        {/* Project Scope */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Code className="h-5 w-5 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">2. Project Scope</h3>
            <Badge variant="outline" className="text-green-400 border-green-400">Open Theme</Badge>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>• <strong>No specific theme</strong> for the hackathon, giving teams the freedom to think boldly and creatively.</p>
            <p>• Participants are encouraged to develop projects that are <strong>innovative, socially relevant, and sustainable</strong>.</p>
            <p>• Ideas that aim to solve real-world problems or improve the quality of life will be highly valued.</p>
            <p>• Projects should reflect clear impact, practical scalability, and meaningful usability.</p>
          </div>
        </Card>

        {/* Time Limits */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Clock className="h-5 w-5 text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">3. Time Limits</h3>
            <Badge variant="outline" className="text-orange-400 border-orange-400">24 Hours</Badge>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>• The hackathon will run for exactly <strong>24 hours</strong>.</p>
            <div className="bg-slate-700/50 p-4 rounded-lg space-y-2">
              <p><strong>Start Time:</strong> 3:00 PM, Day 1</p>
              <p><strong>End Time:</strong> 3:00 PM, Day 2</p>
              <p><strong>First Round Judging:</strong> 12:00 PM on Day 2</p>
              <p><strong>Second Round:</strong> Top 10 teams</p>
              <p><strong>Final Results:</strong> Around 4:00 PM</p>
            </div>
          </div>
        </Card>

        {/* Code Ownership */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Shield className="h-5 w-5 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">4. Code Ownership & Use of External Resources</h3>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>• All code must be the <strong>original work of the team</strong>, developed during the hackathon.</p>
            <p>• Only <strong>open-source tools, libraries, APIs, and frameworks</strong> are permitted for use, and they must be properly cited.</p>
            <p>• All code and documentation must be <strong>pushed to GitHub</strong> before final submission.</p>
            <p>• A technical report must be submitted if any team uses pre-developed components such as custom-built frameworks or previously created modules, detailing their purpose, integration, and relevance to the project.</p>
            <div className="bg-red-900/20 border border-red-700 p-3 rounded-lg">
              <p className="text-red-300">⚠️ <strong>Any plagiarized or fully pre-built project submissions will lead to disqualification.</strong></p>
              <p className="text-red-300 mt-1">Teams have the freedom to partially build the project, but the team must complete it on the venue.</p>
            </div>
          </div>
        </Card>

        {/* Collaboration */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Users className="h-5 w-5 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">5. Collaboration</h3>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>• Collaboration must be <strong>within the team only</strong>.</p>
            <p>• Cross-team collaboration is not permitted.</p>
            <p>• This is strictly a <strong>student-only hackathon</strong>.</p>
          </div>
        </Card>

        {/* Judging Criteria */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Trophy className="h-5 w-5 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">6. Judging Criteria</h3>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>Projects will be evaluated based on five key criteria: <strong>Innovation and Creativity, Sustainability and Impact, Social Relevance, Functionality and Technical Execution, and Presentation and Communication</strong>. Each of these criteria will carry equal weight during the evaluation process to ensure a fair and well-rounded assessment.</p>
            <div className="grid md:grid-cols-2 gap-3 mt-4">
              <div className="bg-slate-700/50 p-3 rounded-lg">
                <p className="font-medium">• Innovation and Creativity</p>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-lg">
                <p className="font-medium">• Sustainability and Impact</p>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-lg">
                <p className="font-medium">• Social Relevance</p>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-lg">
                <p className="font-medium">• Functionality and Technical Execution</p>
              </div>
              <div className="bg-slate-700/50 p-3 rounded-lg md:col-span-2">
                <p className="font-medium">• Presentation and Communication</p>
              </div>
            </div>
            <p className="text-yellow-300">✨ In addition, the most inspiring project may be rewarded by our sponsors.</p>
          </div>
        </Card>

        {/* Ethical Practices */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <Shield className="h-5 w-5 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">7. Ethical Practices & Fair Play</h3>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>• Participants are expected to maintain <strong>integrity, honesty, and sportsmanship</strong>.</p>
            <p>• Any kind of plagiarism, misbehavior, or misconduct may result in immediate disqualification.</p>
            <p>• Teams must not interfere with or sabotage other teams' work.</p>
          </div>
        </Card>

        {/* Intellectual Property */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-violet-500/20 rounded-lg">
              <FileText className="h-5 w-5 text-violet-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">8. Intellectual Property</h3>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>• Teams retain <strong>full ownership</strong> of their projects and intellectual property.</p>
            <p>• Organizers may request permission to showcase the project for promotional or educational purposes.</p>
            <p>• Additionally, sponsors may use selected projects for marketing purposes and may contact teams using the phone numbers provided during registration.</p>
            <p>• <strong>No other personal information will be shared without consent.</strong></p>
          </div>
        </Card>

        {/* Deadlines */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Calendar className="h-5 w-5 text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">9. Deadlines</h3>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>• Project code, GitHub link, supporting documentation, and technical report must be submitted by the deadline announced during the event.</p>
            <div className="bg-indigo-900/20 border border-indigo-700 p-4 rounded-lg space-y-2">
              <p><strong>Registrations will close by:</strong> 10th September 2025</p>
              <p><strong>Shortlisted results will be published between:</strong> 15th and 17th September 2025</p>
            </div>
            <p>• <strong>Late submissions will not be considered for evaluation.</strong></p>
          </div>
        </Card>

        {/* Disqualification */}
        <Card className="p-6 bg-red-900/20 border-red-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-red-300">10. Disqualification</h3>
          </div>
          <div className="space-y-3 text-red-200">
            <p>A team may face disqualification if it violates any of the stated rules, submits plagiarized content, or displays inappropriate behaviour toward fellow participants or organizers.</p>
          </div>
        </Card>

        {/* Communication */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Phone className="h-5 w-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">11. Communication</h3>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>• All official announcements will be communicated via <strong>email</strong> to the registered team members.</p>
            <p>• For queries, contact: <em>[Organizing team contact info to be added]</em></p>
          </div>
        </Card>

        {/* Registration Procedure */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <DollarSign className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">12. Registration Procedure</h3>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>• All participants must register through the official link provided.</p>
            <p>• Each team must submit their team's name, member details, project title, and a brief description of their idea.</p>
            <p>• From all submissions, a <strong>maximum of 100 teams</strong> will be shortlisted based on the clarity, originality, and relevance of their proposed projects.</p>
            <div className="bg-emerald-900/20 border border-emerald-700 p-4 rounded-lg space-y-2">
              <p><strong>Registration Fee:</strong> ₹400 per team (includes access to the hackathon and participation)</p>
              <p><strong>Food Registration:</strong> Separate, with additional slips issued</p>
            </div>
            <p>• Before entering the hackathon, each team must submit a <strong>formal confirmation on their college letterhead</strong>, including team details and a declaration of participation.</p>
          </div>
        </Card>

        {/* Transport & Logistics */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-teal-500/20 rounded-lg">
              <MapPin className="h-5 w-5 text-teal-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">13. Transport and Logistics</h3>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>• Local shuttle buses (college buses) will be available for pick-up and drop to the nearby town within a <strong>5 km radius</strong>.</p>
            <p>• For teams bringing heavy hardware components, <strong>tempo arrangements</strong> can be provided upon prior intimation.</p>
          </div>
        </Card>

        {/* What to Carry */}
        <Card className="p-6 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Backpack className="h-5 w-5 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">14. What to Carry: Participant Essentials</h3>
          </div>
          <div className="space-y-4 text-slate-300">
            <p>Participants are advised to carry all necessary personal and technical essentials for a smooth experience.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-cyan-300">Technical Essentials:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Extension boards, chargers, and adapters</li>
                  <li>• Laptops, mouse, and USB devices</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-cyan-300">Personal Items:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Water bottles and hygiene supplies</li>
                  <li>• <strong>College ID card (mandatory for entry)</strong></li>
                </ul>
              </div>
            </div>
            <div className="bg-cyan-900/20 border border-cyan-700 p-3 rounded-lg">
              <p className="text-cyan-300">🌡️ <strong>Weather Alert:</strong> As the venue is located in the high-range region of Kuttikkanam and temperatures may drop overnight, it is strongly recommended to bring blankets, shawls, or sweaters.</p>
            </div>
          </div>
        </Card>

        {/* Additional Notes */}
        <Card className="p-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">15. Additional Notes</h3>
          </div>
          <div className="space-y-3 text-slate-300">
            <p>• Safety and security will be ensured throughout the 24 hours.</p>
            <p>• Refreshments will be provided at regular intervals.</p>
            <p>• Cleanliness and respectful use of the venue are expected.</p>
            <p>• Photos and videos may be taken for promotional purposes.</p>
            <div className="bg-emerald-900/20 border border-emerald-700 p-4 rounded-lg mt-4">
              <p className="text-emerald-300 font-medium text-center">
                🚀 Most importantly, have fun and build something impactful!
              </p>
              <p className="text-emerald-300 font-medium text-center mt-2">
                Let's innovate, collaborate, and hack for change!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
