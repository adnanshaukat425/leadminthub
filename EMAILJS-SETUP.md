# EmailJS Setup Guide for Gmail SMTP

This guide will help you set up EmailJS to send emails from your contact form using your Gmail account.

## Why EmailJS?

Since you cannot directly send emails from client-side JavaScript using SMTP (for security reasons), EmailJS provides a secure way to send emails from your frontend. It connects to Gmail SMTP on the backend without exposing your credentials.

## Step-by-Step Setup

### 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)
3. Verify your email address

### 2. Add Gmail Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail** as your email service
4. Click **Connect Account**
5. Sign in with your Gmail account (the one you want to send emails from)
6. Authorize EmailJS to access your Gmail
7. Copy the **Service ID** (you'll need this later)

### 3. Create an Email Template

1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Use the following template:

**Template Name:** Contact Form

**Subject:** New Contact Form Submission from {{from_name}}

**Content:**
```
You have received a new message from your website contact form.

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

4. Save the template and copy the **Template ID**

### 4. Get Your Public Key

1. Go to **Account** → **General** in your EmailJS dashboard
2. Find your **Public Key** (also called User ID)
3. Copy it

### 5. Update Your Code

Open `index.html` and replace the following placeholders:

1. **Line ~387** (in the EmailJS initialization script):
   - Replace `YOUR_PUBLIC_KEY` with your actual EmailJS Public Key

2. **In `script.js`** (around line 320):
   - Replace `YOUR_SERVICE_ID` with your Gmail Service ID
   - Replace `YOUR_TEMPLATE_ID` with your Email Template ID

### Example:

```javascript
// In index.html
emailjs.init("abc123xyz789"); // Your actual public key

// In script.js
const serviceID = 'service_gmail123'; // Your actual service ID
const templateID = 'template_abc456'; // Your actual template ID
```

## Testing

1. Open your website
2. Fill out the contact form
3. Submit the form
4. Check your Gmail inbox (the email address you connected to EmailJS)
5. You should receive the form submission

## Important Notes

- **Free Tier Limits:** EmailJS free tier includes 200 emails per month
- **Gmail App Password:** You don't need to generate an app password when using EmailJS's Gmail service - it handles authentication for you
- **Security:** Your Gmail credentials are never exposed in the frontend code
- **Receiving Email:** The form will send emails to `appointmentleadsminthub@gmail.com` (as configured in the template parameters)

## Troubleshooting

- **"EmailJS is not loaded" error:** Make sure the EmailJS SDK script is loaded before your script.js
- **"FAILED..." error:** Check that your Service ID and Template ID are correct
- **No emails received:** Check your spam folder and verify the Gmail service is connected properly in EmailJS dashboard

## Alternative: Using Gmail App Password Directly

If you prefer to use SMTP directly with an app password, you would need to:
1. Set up a backend server (Node.js, PHP, etc.)
2. Store your credentials securely on the server
3. Create an API endpoint that your frontend can call

However, EmailJS is the recommended solution for static websites as it's simpler and more secure.

