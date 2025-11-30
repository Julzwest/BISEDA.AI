# 🌐 Final Step: Point Domain to GitHub Pages

## ✅ Your Site is Working!

Your GitHub Pages site is live and working perfectly! I can see your homepage with all the buttons and features.

**Current URL:** https://julzwest.github.io/bisedaai-legal ✅

---

## 📋 Step 1: Add Custom Domain in GitHub

### Go to GitHub Pages Settings:

**URL:** https://github.com/Julzwest/bisedaai-legal/settings/pages

1. **Scroll down** to "Custom domain" section
2. **In the text field**, type:
   ```
   bisedaai.com
   ```
3. **Click:** "Save" button
4. **GitHub will show:**
   - "DNS check in progress"
   - DNS instructions with IP addresses

---

## 📋 Step 2: Add DNS Records in 123reg

### After adding domain in GitHub:

**Go to 123reg:**

1. **Go to:** https://www.123reg.co.uk/
2. **Log in**
3. **Go to:** Domain Portfolio → bisedaai.com → DNS Hosting
4. **Click:** "Add DNS Hosting" (if you haven't already)

### Add These A Records:

**Add 4 A records** (one for each IP):

```
Record 1:
Type: A
Name: @ (or leave blank/root)
Value: 185.199.108.153
TTL: 3600

Record 2:
Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Record 3:
Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Record 4:
Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

5. **Save** all records

---

## ⏱️ Step 3: Wait for DNS Propagation

**Timeline:**
- **Usually:** 30 minutes - 2 hours
- **Maximum:** Up to 48 hours (rare)

**Check status:**
- GitHub Pages settings will show "DNS check passed" when ready
- Test: `https://bisedaai.com` should work

---

## ✅ Step 4: Enable HTTPS

**Back on GitHub Pages settings:**

1. **Check:** "Enforce HTTPS" checkbox
2. **Wait** a few minutes for SSL certificate
3. **Done!** Your site will be secure

---

## 🎯 Final URLs for App Store

**After DNS propagates:**

- **Privacy Policy:** `https://bisedaai.com/privacy.html`
- **Terms of Service:** `https://bisedaai.com/terms.html`
- **Support URL:** `https://bisedaai.com`

**These are the URLs you'll use in App Store Connect!**

---

## ✅ Complete Checklist

- [x] Files uploaded to GitHub ✅
- [x] GitHub Pages enabled ✅
- [x] Site working on GitHub URL ✅
- [ ] Add custom domain in GitHub
- [ ] Add DNS records in 123reg
- [ ] Wait for DNS propagation
- [ ] Enable HTTPS
- [ ] Test bisedaai.com URLs
- [ ] Submit to App Store!

---

## 🚨 Troubleshooting

**If DNS doesn't work:**

1. **Verify DNS records** are correct in 123reg
2. **Check** all 4 A records are added
3. **Wait longer** - DNS can be slow
4. **Test** GitHub URL still works: https://julzwest.github.io/bisedaai-legal

**If custom domain shows error:**

- **Check** domain is spelled correctly: `bisedaai.com`
- **Verify** DNS records are saved in 123reg
- **Wait** for DNS to propagate

---

## 💡 Pro Tip

**You can use GitHub URL temporarily:**
- If DNS takes time, you can use GitHub URL for App Store submission
- Update to custom domain later
- Both URLs work!

**GitHub URL:** https://julzwest.github.io/bisedaai-legal/privacy.html  
**Custom URL (after DNS):** https://bisedaai.com/privacy.html

---

**Next: Add `bisedaai.com` in GitHub Custom domain field!** 🚀

