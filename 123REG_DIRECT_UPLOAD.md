# 📤 Upload Files Directly to 123reg (No GitHub Needed!)

## ✅ You Can Upload Directly - No GitHub Required!

Since you're using 123reg hosting, you can upload files directly through their website. No GitHub, no external services needed!

---

## 📋 Step 1: Create the HTML Files Locally

### Create `privacy.html` on Your Computer:

1. **Open a text editor:**
   - Mac: TextEdit, Notes, or any text editor
   - Windows: Notepad
   - Or use any code editor if you have one

2. **Copy this content** (I'll provide the full HTML below)

3. **Save as:** `privacy.html`

### Create `terms.html`:

1. **Same process**
2. **Save as:** `terms.html`

---

## 📝 Step 2: The HTML Files

### File 1: `privacy.html`

Save this as `privacy.html` on your computer:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - Biseda.ai</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        h1 {
            color: #6366f1;
            border-bottom: 3px solid #6366f1;
            padding-bottom: 10px;
        }
        h2 {
            color: #4f46e5;
            margin-top: 30px;
        }
        .last-updated {
            color: #666;
            font-style: italic;
        }
    </style>
</head>
<body>
    <h1>Privacy Policy</h1>
    <p class="last-updated">Last updated: November 28, 2025</p>
    
    <h2>1. Introduction</h2>
    <p>Welcome to Biseda.ai ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.</p>
    
    <h2>2. Information We Collect</h2>
    <h3>2.1 Information You Provide</h3>
    <ul>
        <li>Messages and conversations you input into the app</li>
        <li>Screenshots you upload for analysis</li>
        <li>User preferences and settings</li>
    </ul>
    
    <h3>2.2 Automatically Collected Information</h3>
    <ul>
        <li>Usage data and analytics</li>
        <li>Device information</li>
        <li>IP address</li>
    </ul>
    
    <h2>3. How We Use Your Information</h2>
    <ul>
        <li>To provide AI-powered chat suggestions and advice</li>
        <li>To process payments through Stripe</li>
        <li>To improve our services</li>
        <li>To communicate with you</li>
    </ul>
    
    <h2>4. Third-Party Services</h2>
    <h3>4.1 OpenAI</h3>
    <p>We use OpenAI's API to generate AI responses. Your messages are sent to OpenAI for processing. Please review OpenAI's privacy policy: <a href="https://openai.com/privacy">https://openai.com/privacy</a></p>
    
    <h3>4.2 Stripe</h3>
    <p>We use Stripe for payment processing. Payment information is handled securely by Stripe. Please review Stripe's privacy policy: <a href="https://stripe.com/privacy">https://stripe.com/privacy</a></p>
    
    <h2>5. Data Storage</h2>
    <p>Your data is stored securely on our servers. We retain your information for as long as necessary to provide our services and comply with legal obligations.</p>
    
    <h2>6. Your Rights</h2>
    <p>You have the right to:</p>
    <ul>
        <li>Access your personal data</li>
        <li>Request deletion of your data</li>
        <li>Opt-out of certain data collection</li>
    </ul>
    
    <h2>7. Age Restrictions</h2>
    <p>Our app is intended for users 18 years and older. We do not knowingly collect information from users under 18.</p>
    
    <h2>8. Changes to This Policy</h2>
    <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
    
    <h2>9. Contact Us</h2>
    <p>If you have questions about this Privacy Policy, please contact us at:</p>
    <p>Email: support@bisedaai.com</p>
</body>
</html>
```

### File 2: `terms.html`

Save this as `terms.html` on your computer:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms of Service - Biseda.ai</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        h1 {
            color: #6366f1;
            border-bottom: 3px solid #6366f1;
            padding-bottom: 10px;
        }
        h2 {
            color: #4f46e5;
            margin-top: 30px;
        }
        .last-updated {
            color: #666;
            font-style: italic;
        }
    </style>
</head>
<body>
    <h1>Terms of Service</h1>
    <p class="last-updated">Last updated: November 28, 2025</p>
    
    <h2>1. Acceptance of Terms</h2>
    <p>By accessing and using Biseda.ai ("the App"), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use the App.</p>
    
    <h2>2. Age Requirement</h2>
    <p>You must be at least 18 years old to use this App. By using the App, you represent and warrant that you are 18 years of age or older.</p>
    
    <h2>3. Description of Service</h2>
    <p>Biseda.ai is an AI-powered application that provides dating advice, chat suggestions, and conversation assistance. We use artificial intelligence to generate responses and suggestions.</p>
    
    <h2>4. User Accounts</h2>
    <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
    
    <h2>5. Subscription and Payments</h2>
    <h3>5.1 Subscription Plans</h3>
    <p>We offer subscription plans (Starter, Pro, Premium) and credit packages. Subscriptions are billed monthly and automatically renew unless cancelled.</p>
    
    <h3>5.2 Payment Processing</h3>
    <p>Payments are processed securely through Stripe. By subscribing, you agree to Stripe's terms of service.</p>
    
    <h3>5.3 Cancellation</h3>
    <p>You may cancel your subscription at any time through your account settings or by contacting support. Cancellation takes effect at the end of the current billing period.</p>
    
    <h3>5.4 Refunds</h3>
    <p>Refunds are handled on a case-by-case basis. Contact support@bisedaai.com for refund requests.</p>
    
    <h2>6. Acceptable Use</h2>
    <p>You agree not to:</p>
    <ul>
        <li>Use the App for any illegal purpose</li>
        <li>Attempt to reverse engineer or hack the App</li>
        <li>Share your account with others</li>
        <li>Use the App to generate harmful or abusive content</li>
    </ul>
    
    <h2>7. AI-Generated Content</h2>
    <p>The App uses AI to generate responses. We do not guarantee the accuracy, appropriateness, or effectiveness of AI-generated content. Use at your own discretion.</p>
    
    <h2>8. Intellectual Property</h2>
    <p>All content, features, and functionality of the App are owned by Biseda.ai and are protected by copyright, trademark, and other intellectual property laws.</p>
    
    <h2>9. Limitation of Liability</h2>
    <p>To the maximum extent permitted by law, Biseda.ai shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the App.</p>
    
    <h2>10. Changes to Terms</h2>
    <p>We reserve the right to modify these Terms at any time. Continued use of the App after changes constitutes acceptance of the new Terms.</p>
    
    <h2>11. Termination</h2>
    <p>We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms.</p>
    
    <h2>12. Contact Information</h2>
    <p>For questions about these Terms, contact us at:</p>
    <p>Email: support@bisedaai.com</p>
</body>
</html>
```

---

## 📤 Step 3: Upload to 123reg

### Method 1: Via 123reg File Manager (Easiest)

1. **Log in to 123reg:**
   - Go to: https://www.123reg.co.uk/
   - Log in with your account

2. **Go to File Manager:**
   - My Account → Hosting → File Manager
   - Or: My Account → Domains → [bisedaai.com] → Hosting → File Manager

3. **Navigate to the right folder:**
   - Look for: `public_html` or `www` or `htdocs`
   - This is usually the root folder for your website
   - Click into it

4. **Upload files:**
   - Click "Upload" button (usually at the top)
   - Or drag and drop your files
   - Select: `privacy.html` and `terms.html`
   - Wait for upload to complete

5. **Verify:**
   - You should see both files in the folder
   - Files should be named exactly: `privacy.html` and `terms.html`

### Method 2: Via FTP (If File Manager Doesn't Work)

1. **Get FTP credentials from 123reg:**
   - Go to: Hosting → FTP Settings
   - Note down:
     - FTP Server: (usually `ftp.bisedaai.com` or similar)
     - FTP Username: (your username)
     - FTP Password: (your password)

2. **Download FTP client (if you don't have one):**
   - **Mac:** FileZilla (free) - https://filezilla-project.org/
   - **Windows:** FileZilla or WinSCP (free)

3. **Connect via FTP:**
   - Open FTP client
   - Enter server, username, password
   - Connect

4. **Upload files:**
   - Navigate to `public_html` or `www` folder
   - Drag `privacy.html` and `terms.html` to upload
   - Wait for upload

---

## ✅ Step 4: Test Your Files

After uploading, test:

1. **Open browser:**
   - Go to: `https://bisedaai.com/privacy.html`
   - Should show Privacy Policy ✅

2. **Test Terms:**
   - Go to: `https://bisedaai.com/terms.html`
   - Should show Terms of Service ✅

---

## 🎯 That's It!

**You now have:**
- ✅ Privacy Policy: `https://bisedaai.com/privacy.html`
- ✅ Terms of Service: `https://bisedaai.com/terms.html`

**For App Store:**
- Privacy Policy URL: `https://bisedaai.com/privacy.html`
- Terms URL: `https://bisedaai.com/terms.html`

**No GitHub needed!** ✅

---

## 🚨 Troubleshooting

### Files not showing?
- **Check:** Files are in `public_html` or `www` folder (not a subfolder)
- **Check:** File names are exactly `privacy.html` and `terms.html` (case-sensitive)
- **Check:** Files uploaded successfully (check file size)

### Can't access File Manager?
- **Try:** Different browser
- **Try:** Clear browser cache
- **Try:** Contact 123reg support

### Need help?
- **123reg Support:** https://www.123reg.co.uk/support/
- **Live Chat:** Available in dashboard

---

## 📋 Quick Checklist

- [ ] Create `privacy.html` file on your computer
- [ ] Create `terms.html` file on your computer
- [ ] Log in to 123reg
- [ ] Go to File Manager
- [ ] Navigate to `public_html` or `www` folder
- [ ] Upload both files
- [ ] Test: `https://bisedaai.com/privacy.html`
- [ ] Test: `https://bisedaai.com/terms.html`
- [ ] Done! ✅

**No GitHub, no external services - just upload directly!** 🎉

