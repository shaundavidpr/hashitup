import nodemailer from 'nodemailer'

interface EmailOptions {
  to: string | string[]
  subject: string
  text?: string
  html?: string
}

interface BulkEmailOptions {
  recipients: string[]
  subject: string
  text?: string
  html?: string
}

// Create reusable transporter object
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info.messageId)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

export const sendBulkEmail = async (options: BulkEmailOptions): Promise<{ success: number; failed: number }> => {
  let success = 0
  let failed = 0

  for (const recipient of options.recipients) {
    try {
      const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: recipient,
        subject: options.subject,
        text: options.text,
        html: options.html,
      }

      await transporter.sendMail(mailOptions)
      success++
    } catch (error) {
      console.error(`Error sending email to ${recipient}:`, error)
      failed++
    }
  }

  return { success, failed }
}

// Email templates
export const emailTemplates = {
  teamCreated: (teamName: string, leaderName: string) => ({
    subject: `Welcome to Hash 2K25 Hackathon - Team ${teamName} Created!`,
    html: `
      <h2>Welcome to Hash 2K25 Hackathon!</h2>
      <p>Dear ${leaderName},</p>
      <p>Your team <strong>${teamName}</strong> has been successfully created for the Hash 2K25 Hackathon.</p>
      <p>Next steps:</p>
      <ul>
        <li>Add your team members</li>
        <li>Submit your project details</li>
        <li>Prepare for the hackathon</li>
      </ul>
      <p>Good luck with your submission!</p>
      <p>Best regards,<br>Hash 2K25 Team</p>
    `,
  }),

  memberAdded: (teamName: string, memberName: string) => ({
    subject: `You've been added to Team ${teamName} - Hash 2K25 Hackathon`,
    html: `
      <h2>You're part of Team ${teamName}!</h2>
      <p>Dear ${memberName},</p>
      <p>You have been added to team <strong>${teamName}</strong> for the Hash 2K25 Hackathon.</p>
      <p>Please log in to the platform to access your team dashboard and collaborate with your team members.</p>
      <p>Best regards,<br>Hash 2K25 Team</p>
    `,
  }),

  submissionReceived: (teamName: string, projectName: string) => ({
    subject: `Project Submission Received - ${projectName}`,
    html: `
      <h2>Submission Received!</h2>
      <p>Dear Team ${teamName},</p>
      <p>Your project <strong>${projectName}</strong> has been successfully submitted for the Hash 2K25 Hackathon.</p>
      <p>Our team will review your submission and update you on the status soon.</p>
      <p>Best regards,<br>Hash 2K25 Team</p>
    `,
  }),

  statusUpdate: (teamName: string, projectName: string, status: string) => ({
    subject: `Project Status Update - ${projectName}`,
    html: `
      <h2>Project Status Update</h2>
      <p>Dear Team ${teamName},</p>
      <p>Your project <strong>${projectName}</strong> status has been updated to: <strong>${status}</strong></p>
      ${status === 'SELECTED' ? '<p>Congratulations! Your project has been selected for the next round.</p>' : ''}
      ${status === 'REJECTED' ? '<p>We appreciate your participation. Keep innovating!</p>' : ''}
      <p>Best regards,<br>GEN 201 Team</p>
    `,
  }),
} 