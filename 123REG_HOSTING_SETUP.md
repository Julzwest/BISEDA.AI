# 🌐 Using 123reg Hosting for bisedaai.com

## ✅ Using 123reg's Built-in Hosting

This guide will help you set up your legal pages and backend using 123reg's hosting service.

---

## 📋 Step 1: Check Your 123reg Hosting

### Check if You Have Hosting:

1. **Log in to 123reg:**
   - Go to: https://www.123reg.co.uk/
   - Log in with your account

2. **Check Hosting Status:**
   - Go to: My Account → Hosting
   - Or: My Account → Domains → [bisedaai.com] → Hosting
   - Look for "Web Hosting" or "Hosting Package"

3. **If You Have Hosting:**
   - ✅ You can upload files directly
   - ✅ DNS is already configured
   - ✅ Continue to Step 2

4. **If You DON'T Have Hosting:**
   - You'll need to purchase it
   - Or use Option 1 (external hosting - FREE)
   - Check pricing in your 123reg account

---

## 📝 Step 2: Create Legal Pages HTML Files

### Create Privacy Policy (`privacy.html`):

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
    <p>We use OpenAI's API to generate AI responses. Your messages are sent to OpenAI for processing. Please review OpenAI's privacy policy: https://openai.com/privacy</p>
    
    <h3>4.2 Stripe</h3>
    <p>We use Stripe for payment processing. Payment information is handled securely by Stripe. Please review Stripe's privacy policy: https://stripe.com/privacy</p>
    
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

### Create Terms of Service (`terms.html`):

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

### Create Index Page (`index.html`) - Optional:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biseda.ai - AI Dating & Chat Assistant</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
            color: #333;
        }
        h1 {
            color: #6366f1;
        }
        .links {
            margin-top: 30px;
        }
        .links a {
            display: inline-block;
            margin: 10px;
            padding: 10px 20px;
            background: #6366f1;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .links a:hover {
            background: #4f46e5;
        }
    </style>
</head>
<body>
    <h1>Biseda.ai</h1>
    <p>AI-Powered Dating & Chat Assistant</p>
    <div class="links">
        <a href="/privacy.html">Privacy Policy</a>
        <a href="/terms.html">Terms of Service</a>
    </div>
</body>
</html>
```

---

## 📤 Step 3: Upload Files to 123reg

### Method 1: Via 123reg File Manager

1. **Log in to 123reg**
2. **Go to Hosting:**
   - My Account → Hosting → File Manager
   - Or: My Account → Domains → [bisedaai.com] → Hosting → File Manager
3. **Navigate to public_html or www folder:**
   - This is usually the root directory for your website
4. **Upload files:**
   - Click "Upload" or drag & drop
   - Upload: `index.html`, `privacy.html`, `terms.html`
5. **Verify:**
   - Files should be in: `/public_html/` or `/www/`

### Method 2: Via FTP (If Available)

1. **Get FTP credentials:**
   - Check 123reg hosting settings
   - Look for FTP username/password
   - FTP server: Usually `ftp.bisedaai.com` or similar
2. **Connect via FTP client:**
   - Use FileZilla, Cyberduck, or similar
   - Connect to FTP server
   - Upload files to `/public_html/` or `/www/`

---

## 🔧 Step 4: Configure Backend (Still Use External Hosting)

**Important:** For your backend API, you'll still want to use Railway or Render because:
- 123reg hosting is typically for static files (HTML)
- Your backend needs Node.js, which 123reg may not support
- Railway/Render are FREE and better for APIs

### Setup:

1. **Deploy backend to Railway:**
   - Sign up: https://railway.app
   - Deploy your backend
   - Get URL: `https://your-app.railway.app`

2. **Add API subdomain in 123reg DNS:**
   - Go to DNS Management
   - Add CNAME:
     ```
     Type: CNAME
     Name: api
     Value: your-app.railway.app
     TTL: 3600
     ```

3. **Result:**
   - Legal pages: `https://bisedaai.com/privacy` (on 123reg hosting)
   - Backend API: `https://api.bisedaai.com` (on Railway, via DNS)

---

## ✅ Step 5: Test Your Setup

1. **Test main domain:**
   - Visit: `https://bisedaai.com`
   - Should show your index page

2. **Test legal pages:**
   - Visit: `https://bisedaai.com/privacy.html`
   - Visit: `https://bisedaai.com/terms.html`

3. **Test API:**
   - Visit: `https://api.bisedaai.com/api/usage`
   - Should return API response

---

## 📋 Complete Setup Summary

**What's on 123reg Hosting:**
- ✅ `index.html` (landing page)
- ✅ `privacy.html` (Privacy Policy)
- ✅ `terms.html` (Terms of Service)

**What's on Railway (via DNS):**
- ✅ Backend API (`api.bisedaai.com`)

**Your URLs:**
- Main site: `https://bisedaai.com`
- Privacy: `https://bisedaai.com/privacy.html`
- Terms: `https://bisedaai.com/terms.html`
- API: `https://api.bisedaai.com`

**For App Store:**
- Privacy Policy URL: `https://bisedaai.com/privacy.html`
- Terms URL: `https://bisedaai.com/terms.html`

---

## 🚨 Troubleshooting

### Files not showing?
- **Check:** Files are in `/public_html/` or `/www/` folder
- **Check:** File names are correct (case-sensitive)
- **Check:** Index file is named `index.html`

### SSL/HTTPS not working?
- **123reg:** May need to enable SSL certificate
- **Check:** Hosting settings → SSL/TLS
- **Enable:** Let's Encrypt or 123reg SSL

### DNS issues?
- **123reg:** DNS should be automatic for hosting
- **Check:** Domain is pointing to 123reg nameservers
- **Wait:** DNS changes can take up to 24 hours

---

## 📞 123reg Support

If you need help:
- **Support:** https://www.123reg.co.uk/support/
- **Live Chat:** Available in dashboard
- **Phone:** Check your account for support number

---

## ✅ Checklist

- [ ] Check if you have 123reg hosting
- [ ] Create `privacy.html` file
- [ ] Create `terms.html` file
- [ ] Create `index.html` (optional)
- [ ] Upload files via 123reg File Manager or FTP
- [ ] Verify files are accessible
- [ ] Deploy backend to Railway/Render
- [ ] Add `api.bisedaai.com` CNAME in 123reg DNS
- [ ] Test all URLs work
- [ ] Update app with API URL
- [ ] Update Stripe webhooks
- [ ] Submit to App Store!

---

## 🎯 You're All Set!

Your legal pages will be hosted on 123reg, and your backend API will be on Railway (pointed via DNS). This gives you the best of both worlds!

Need help with any step? Let me know!

