# 🌐 Setting Up bisedaai.com on 123reg

## ✅ You've Bought the Domain - Now Let's Set It Up!

---

## 📋 Step-by-Step Setup

### Step 1: Access 123reg DNS Settings

1. **Log in to 123reg:**
   - Go to: https://www.123reg.co.uk/
   - Log in with your account

2. **Go to Domain Management:**
   - Click "My Account" → "Domains"
   - Find `bisedaai.com`
   - Click "Manage" or "DNS Settings"

3. **Access DNS Management:**
   - Look for "DNS" or "DNS Management"
   - Or "Nameservers" / "DNS Records"

---

### Step 2: Set Up Legal Pages (bisedaai.com)

**Option A: GitHub Pages (Recommended - FREE)**

1. **Create GitHub repo:**
   ```bash
   mkdir bisedaai-legal
   cd bisedaai-legal
   git init
   ```

2. **Create `privacy.html`:**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Privacy Policy - Biseda.ai</title>
   </head>
   <body>
     <h1>Privacy Policy</h1>
     <p>Last updated: [DATE]</p>
     <!-- Your privacy policy content here -->
   </body>
   </html>
   ```

3. **Create `terms.html`:**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Terms of Service - Biseda.ai</title>
   </head>
   <body>
     <h1>Terms of Service</h1>
     <p>Last updated: [DATE]</p>
     <!-- Your terms content here -->
   </body>
   </html>
   ```

4. **Create `CNAME` file:**
   ```
   bisedaai.com
   ```

5. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add legal pages"
   git remote add origin https://github.com/YOURUSERNAME/bisedaai-legal.git
   git push -u origin main
   ```

6. **Enable GitHub Pages:**
   - Go to repo Settings → Pages
   - Source: `main` branch
   - Custom domain: `bisedaai.com`
   - Save

7. **Update DNS in 123reg:**
   - Go to DNS Management
   - Add these A records:
     ```
     Type: A
     Name: @ (or leave blank)
     Value: 185.199.108.153
     TTL: 3600
     
     Type: A
     Name: @ (or leave blank)
     Value: 185.199.109.153
     TTL: 3600
     
     Type: A
     Name: @ (or leave blank)
     Value: 185.199.110.153
     TTL: 3600
     
     Type: A
     Name: @ (or leave blank)
     Value: 185.199.111.153
     TTL: 3600
     ```
   - Or add CNAME:
     ```
     Type: CNAME
     Name: @ (or www)
     Value: YOURUSERNAME.github.io
     TTL: 3600
     ```

**Option B: Netlify (Easier - FREE)**

1. **Sign up:** https://netlify.com
2. **Create site:**
   - Drag & drop your HTML files
   - Or connect GitHub repo
3. **Add custom domain:**
   - Site settings → Domain management
   - Add: `bisedaai.com`
4. **Update DNS in 123reg:**
   - Netlify will show you DNS records
   - Usually:
     ```
     Type: A
     Name: @
     Value: 75.2.60.5
     
     Type: CNAME
     Name: www
     Value: your-site.netlify.app
     ```

---

### Step 3: Set Up Backend API (api.bisedaai.com)

**Deploy Backend to Railway:**

1. **Sign up:** https://railway.app
2. **Create new project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo" (or upload)
   - Connect your backend repo
3. **Add environment variables:**
   - `OPENAI_API_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `FRONTEND_URL=https://bisedaai.com`
   - All other vars from your `.env`
4. **Deploy:**
   - Railway will auto-deploy
   - Get URL: `https://your-app.railway.app`
5. **Add custom domain:**
   - Project → Settings → Domains
   - Add: `api.bisedaai.com`
   - Railway will show DNS instructions
6. **Update DNS in 123reg:**
   - Add CNAME record:
     ```
     Type: CNAME
     Name: api
     Value: your-app.railway.app
     TTL: 3600
     ```

**Or Deploy to Render:**

1. **Sign up:** https://render.com
2. **Create new Web Service:**
   - Connect GitHub repo
   - Build command: `cd backend && npm install`
   - Start command: `cd backend && npm start`
3. **Add environment variables:**
   - Same as Railway
4. **Add custom domain:**
   - Service → Settings → Custom Domains
   - Add: `api.bisedaai.com`
5. **Update DNS in 123reg:**
   - Render will show DNS records
   - Usually CNAME: `api` → `your-app.onrender.com`

---

### Step 4: Update Your App

**Update environment variables:**

```bash
# .env (production)
VITE_BACKEND_URL=https://api.bisedaai.com
```

**Update backend .env:**
```bash
FRONTEND_URL=https://bisedaai.com
```

---

### Step 5: Update Stripe Webhooks

1. **Go to Stripe Dashboard:**
   - https://dashboard.stripe.com/webhooks
   - Make sure you're in **LIVE MODE**

2. **Edit webhook endpoint:**
   - Click on your webhook
   - Update URL to: `https://api.bisedaai.com/api/stripe/webhook`
   - Save

---

## 🔧 123reg DNS Configuration

### Complete DNS Records Setup:

**For Main Domain (bisedaai.com):**
```
Type    Name    Value                    TTL
A       @       185.199.108.153          3600
A       @       185.199.109.153          3600
A       @       185.199.110.153          3600
A       @       185.199.111.153          3600
CNAME   www     YOURUSERNAME.github.io   3600
```

**For API Subdomain (api.bisedaai.com):**
```
Type    Name    Value                    TTL
CNAME   api     your-app.railway.app     3600
```

---

## 📝 How to Add DNS Records in 123reg

1. **Log in to 123reg**
2. **Go to:** My Account → Domains → Manage → DNS
3. **Click:** "Add Record" or "Manage DNS"
4. **Select record type:** A or CNAME
5. **Fill in:**
   - **Name:** `@` (for root) or `api` (for subdomain)
   - **Value:** IP address or domain
   - **TTL:** 3600 (or default)
6. **Save**

**Note:** If 123reg uses different terminology:
- "Host" = Name
- "Points to" = Value
- "Destination" = Value

---

## ⏱️ DNS Propagation Time

- **Usually:** 5 minutes to 2 hours
- **Maximum:** Up to 48 hours (rare)
- **Check:** Use https://dnschecker.org to verify

---

## ✅ Testing Checklist

After setup, test:

- [ ] `https://bisedaai.com` loads
- [ ] `https://bisedaai.com/privacy` loads
- [ ] `https://bisedaai.com/terms` loads
- [ ] `https://api.bisedaai.com` responds
- [ ] `https://api.bisedaai.com/api/usage` works
- [ ] Stripe webhook receives events

---

## 🚨 Common Issues & Solutions

### Issue: Domain not loading
**Solution:**
- Wait 1-2 hours for DNS propagation
- Check DNS records are correct
- Verify hosting is set up

### Issue: API subdomain not working
**Solution:**
- Check CNAME record is correct
- Verify Railway/Render domain is configured
- Wait for DNS propagation

### Issue: SSL certificate errors
**Solution:**
- GitHub Pages/Netlify auto-generate SSL
- Railway/Render auto-generate SSL
- May take a few minutes after DNS setup

---

## 📞 123reg Support

If you need help:
- **Support:** https://www.123reg.co.uk/support/
- **Live Chat:** Available in account dashboard
- **Phone:** Check your account for support number

---

## 🎯 Quick Reference

**Your URLs:**
- Main site: `https://bisedaai.com`
- Privacy: `https://bisedaai.com/privacy`
- Terms: `https://bisedaai.com/terms`
- API: `https://api.bisedaai.com`
- Stripe webhook: `https://api.bisedaai.com/api/stripe/webhook`

**For App Store:**
- Privacy Policy URL: `https://bisedaai.com/privacy`
- Terms URL: `https://bisedaai.com/terms`

---

## ✅ Next Steps

1. ✅ Domain purchased
2. ⏭️ Set up DNS records in 123reg
3. ⏭️ Host legal pages (GitHub Pages or Netlify)
4. ⏭️ Deploy backend (Railway or Render)
5. ⏭️ Add API subdomain
6. ⏭️ Update app configuration
7. ⏭️ Update Stripe webhooks
8. ⏭️ Test everything works
9. ⏭️ Submit to App Store!

**You're making great progress!** 🚀

