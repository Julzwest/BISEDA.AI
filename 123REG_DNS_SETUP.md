# 🌐 Configure DNS in 123reg for GitHub Pages

## ✅ Current Status

- ✅ Domain added to GitHub Pages
- ✅ DNS check in progress
- ⏳ Need to add DNS records in 123reg

---

## 📋 Step-by-Step: Add DNS Records in 123reg

### **Step 1: Log into 123reg**

1. **Go to:** https://www.123reg.co.uk
2. **Click:** "Sign In" (top right)
3. **Enter:** Your login credentials
4. **Click:** "Sign In"

---

### **Step 2: Access DNS Management**

1. **After logging in**, you'll see your dashboard
2. **Find:** "My Domains" or "Domain Management"
3. **Click:** On `bisedaai.com` domain
4. **Look for:** "DNS Settings" or "Manage DNS" or "DNS Management"
5. **Click:** To access DNS settings

**Note:** The exact menu name might vary, but look for:
- DNS Settings
- DNS Management
- Manage DNS
- DNS Records
- Advanced DNS

---

### **Step 3: Add 4 A Records**

**You need to add 4 A records** pointing to GitHub Pages.

**For each A record:**

1. **Click:** "Add Record" or "+" button
2. **Select:** Record type "A" (or "A Record")
3. **Fill in:**wh
   - **Name/Host:** `@` (or leave blank, or `bisedaai.com`)
   - **Type:** `A`
   - **Value/IP Address:** (one of the IPs below)
   - **TTL:** `3600` (or default)

**Add these 4 A records:**

| Name | Type | Value | TTL |
|------|------|-------|-----|
| `@` | A | `185.199.108.153` | 3600 |
| `@` | A | `185.199.109.153` | 3600 |
| `@` | A | `185.199.110.153` | 3600 |
| `@` | A | `185.199.111.153` | 3600 |

**Important Notes:**
- **Name field:** Use `@` (means root domain) or leave blank
- **All 4 records** must have the same name (`@`)
- **Each record** gets a different IP address
- **TTL:** Can be 3600 (1 hour) or default

---

### **Step 4: Save Changes**

1. **After adding all 4 records**, click "Save" or "Apply"
2. **Wait:** DNS propagation takes 5-60 minutes
3. **Check:** GitHub Pages settings will update automatically

---

## 🎯 What Each Field Means

### **Name/Host Field:**
- `@` = Root domain (bisedaai.com)
- Leave blank = Also means root domain
- `www` = Would be www.bisedaai.com (we don't need this)

### **Type:**
- `A` = Points domain to IP address
- This is what we need

### **Value/IP Address:**
- The 4 IP addresses GitHub provided
- Each A record gets one IP

### **TTL (Time To Live):**
- How long DNS is cached
- `3600` = 1 hour (good default)

---

## ⚠️ Common Issues

### **Issue 1: Can't find DNS Settings**
**Solution:**
- Look for "Advanced DNS" or "DNS Management"
- May be under "Domain Settings" or "Manage Domain"
- Contact 123reg support if you can't find it

### **Issue 2: Already have A records**
**Solution:**
- **Delete existing A records** first
- Then add the 4 new GitHub IPs
- Don't mix old and new records

### **Issue 3: Name field format**
**Solution:**
- Try `@` first
- If that doesn't work, try leaving blank
- If that doesn't work, try `bisedaai.com`

### **Issue 4: Can't add 4 records**
**Solution:**
- Some registrars limit A records
- Contact 123reg support to add all 4
- Or check if there's a "Bulk Add" option

---

## ✅ After Adding DNS Records

### **Step 1: Wait for Propagation**
- **Time:** 5-60 minutes (usually 15-30 min)
- **Check:** GitHub Pages settings will update

### **Step 2: Check GitHub Status**
1. **Go back to:** GitHub Pages settings
2. **Check:** DNS status
3. **Should change:** From "DNS check in progress" to "DNS check passed"

### **Step 3: Enable HTTPS**
1. **Once DNS check passes**, come back to GitHub Pages settings
2. **Check:** "Enforce HTTPS" checkbox
3. **Wait:** A few minutes for SSL certificate
4. **Done:** Your site will be live at `https://bisedaai.com`

---

## 🔍 How to Verify DNS is Working

### **Method 1: GitHub Pages Settings**
- Go to GitHub Pages settings
- Check DNS status (should say "passed")

### **Method 2: Command Line (Optional)**
```bash
dig bisedaai.com +short
```
Should show the 4 IP addresses.

### **Method 3: Online Tool**
- Go to: https://www.whatsmydns.net
- Enter: `bisedaai.com`
- Check: If it shows GitHub IPs

---

## 📋 Quick Checklist

- [ ] Logged into 123reg
- [ ] Found DNS Management page
- [ ] Deleted old A records (if any)
- [ ] Added A record: `@` → `185.199.108.153`
- [ ] Added A record: `@` → `185.199.109.153`
- [ ] Added A record: `@` → `185.199.110.153`
- [ ] Added A record: `@` → `185.199.111.153`
- [ ] Saved changes
- [ ] Waited 15-30 minutes
- [ ] Checked GitHub Pages status
- [ ] Enabled HTTPS (after DNS passes)

---

## 🚀 Next Steps After DNS

**Once DNS is configured:**
1. ✅ GitHub Pages will be live at `https://bisedaai.com`
2. ✅ Privacy Policy: `https://bisedaai.com/privacy.html`
3. ✅ Terms: `https://bisedaai.com/terms.html`
4. ✅ Ready for App Store submission!

**Then we'll:**
- Deploy backend to production
- Add database (MongoDB)
- Update app configuration
- Test everything

---

**Go configure DNS in 123reg now!** 🚀

**Need help?** Tell me what you see in 123reg DNS settings!

