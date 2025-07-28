import { db } from '../src/lib/db'

async function seedTeams() {
  try {
    console.log('Creating sample teams...')

    // Create some test users first
    const user1 = await db.user.upsert({
      where: { email: 'team1leader@example.com' },
      update: {},
      create: {
        email: 'team1leader@example.com',
        name: 'Team 1 Leader',
        role: 'USER',
      },
    })

    const user2 = await db.user.upsert({
      where: { email: 'team2leader@example.com' },
      update: {},
      create: {
        email: 'team2leader@example.com',
        name: 'Team 2 Leader',
        role: 'USER',
      },
    })

    // Create test teams
    const team1 = await db.team.upsert({
      where: { leaderId: user1.id },
      update: {},
      create: {
        name: 'Code Warriors',
        collegeName: 'Tech University',
        university: 'State Tech University',
        address: '123 Tech Street',
        state: 'California',
        numberOfMembers: 3,
        leaderId: user1.id,
      },
    })

    const team2 = await db.team.upsert({
      where: { leaderId: user2.id },
      update: {},
      create: {
        name: 'Innovation Squad',
        collegeName: 'Engineering College',
        university: 'Metro Engineering University',
        address: '456 Innovation Ave',
        state: 'Texas',
        numberOfMembers: 4,
        leaderId: user2.id,
      },
    })

    // Create some project ideas
    await db.projectIdea.upsert({
      where: { teamId: team1.id },
      update: {},
      create: {
        title: 'AI-Powered Code Review Tool',
        description: 'An intelligent code review system that uses machine learning to identify bugs and suggest improvements',
        techStack: 'React, Node.js, Python, TensorFlow',
        problemStatement: 'Manual code reviews are time-consuming and inconsistent',
        solution: 'Automated AI system that provides real-time code quality feedback',
        teamId: team1.id,
        submittedById: user1.id,
        status: 'PENDING',
      },
    })

    await db.projectIdea.upsert({
      where: { teamId: team2.id },
      update: {},
      create: {
        title: 'Smart Campus Navigation App',
        description: 'A mobile app that helps students navigate campus using AR and real-time location data',
        techStack: 'Flutter, Firebase, ARCore, Google Maps API',
        problemStatement: 'New students struggle to find their way around large campuses',
        solution: 'AR-powered navigation with real-time updates and social features',
        teamId: team2.id,
        submittedById: user2.id,
        status: 'ACCEPTED',
      },
    })

    console.log('✅ Sample teams created successfully!')
    console.log('- Code Warriors (Tech University)')
    console.log('- Innovation Squad (Engineering College)')
    
  } catch (error) {
    console.error('Error seeding teams:', error)
  } finally {
    await db.$disconnect()
  }
}

seedTeams()
