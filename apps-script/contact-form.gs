/**
 * Fenrir Contact Form — Google Apps Script backend
 *
 * Deployment:
 * 1. Go to https://script.google.com and create a new project
 * 2. Paste this code
 * 3. Update RECIPIENTS with your email addresses
 * 4. Deploy as Web App (Execute as: Me, Access: Anyone)
 * 5. Copy the deployment URL and set it as SCRIPT_URL in ContactForm.astro
 */

const RECIPIENTS = [
  // Add recipient emails here
  // 'hello@fenrir.ai',
  // 'team@fenrir.ai',
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const { name, email, company, message } = data;

    if (!name || !email || !message) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Missing required fields' })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    const subject = `[Fenrir] Contact from ${name}${company ? ` (${company})` : ''}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      '',
      'Message:',
      message,
    ].filter(Boolean).join('\n');

    RECIPIENTS.forEach(recipient => {
      MailApp.sendEmail({
        to: recipient,
        subject: subject,
        body: body,
        replyTo: email,
      });
    });

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', service: 'fenrir-contact' })
  ).setMimeType(ContentService.MimeType.JSON);
}
