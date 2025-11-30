# 🚀 Quick Steps: Configure DNS in 123reg

## 📍 You're Currently On: DNS Hosting Page

**What you see:**
- "You have no records yet"
- Green "Add DNS Hosting" button

---

## ✅ Step 1: Add DNS Hosting

1. **Click:** The green "Add DNS Hosting" button
2. **Select:** `bisedaai.com` from the list
3. **Click:** "Add" or "Continue"

**What happens:**
- 123reg will set up DNS hosting for your domain
- You'll be taken to the DNS records management page

---

## ✅ Step 2: Add 4 A Records

**After DNS hosting is added, you'll see a page to manage DNS records.**

**For each A record:**

1. **Click:** "Add Record" or "+" button
2. **Select:** Type "A" (or "A Record")
3. **Fill in:**
   - **Name/Host:** `@` (or leave blank)
   - **Type:** `A`
   - **Value/IP:** (one of the IPs below)
   - **TTL:** `3600` (or default)

**Add these 4 A records (one at a time):**

| # | Name | Type | Value |
|---|------|------|-------|
| 1 | `@` | A | `185.199.108.153` |
| 2 | `@` | A | `185.199.110.153` |
| 3 | `@` | A | `185.199.109.153` |
| 4 | `@` | A | `185.199.111.153` |

**Important:**
- Add each IP as a **separate record**
- All 4 records should have the same name (`@`)
- Save after adding each one (or all at once)

---

## ✅ Step 3: Save & Wait

1. **Click:** "Save" or "Apply Changes"
2. **Wait:** 15-30 minutes for DNS propagation
3. **Check:** GitHub Pages settings will update automatically

---

## 🎯 What You'll See After Adding Records

**In 123reg DNS page, you should see:**

```
Type | Name | Value              | TTL
-----|------|-------------------|-----
A    | @    | 185.199.108.153   | 3600
A    | @    | 185.199.109.153   | 3600
A    | @    | 185.199.110.153   | 3600
A    | @    | 185.199.111.153   | 3600
```

---

## ⚠️ Troubleshooting

### **Can't find "Add DNS Hosting" button?**
- Make sure you're logged into 123reg
- Try refreshing the page
- Look for "DNS Management" in the left sidebar

### **Don't see bisedaai.com in the list?**
- Make sure the domain is registered with 123reg
- Check "My Domains" section first
- Domain might need to be transferred to 123reg DNS

### **Name field doesn't accept "@"?**
- Try leaving it blank
- Try typing `bisedaai.com`
- Try typing just `@` without quotes

---

## 📋 After DNS is Configured

**Check GitHub Pages:**
1. Go back to: https://github.com/Julzwest/bisedaai-legal/settings/pages
2. Check DNS status (should say "passed" after 15-30 min)
3. Enable HTTPS checkbox
4. Your site will be live at `https://bisedaai.com`

---

## 🚀 Next Steps After DNS

**Once DNS is working:**
1. ✅ Legal pages live at bisedaai.com
2. ✅ Ready for App Store submission
3. ⏳ Deploy backend to production
4. ⏳ Add database (MongoDB)

---

**Click "Add DNS Hosting" now and tell me what you see!** 🚀

