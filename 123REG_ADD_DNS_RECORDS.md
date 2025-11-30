# ✅ Add DNS A Records for GitHub Pages

## 📍 Current Status

**You're on:** DNS Records page for `bisedaai.com`

**What you see:**
- Existing A record with "Parked" (needs to be deleted)
- Green "Add New Record" button
- Table of DNS records

---

## ✅ Step 1: Delete the "Parked" A Record

**Before adding new records, delete the old one:**

1. **Find:** The A record row with:
   - Type: `A`
   - Name: `@`
   - Data: `Parked`

2. **Click:** The trash can icon (🗑️) in the "Delete" column

3. **Confirm:** The deletion if prompted

**Why:** The "Parked" record points to a parking page, not GitHub Pages.

---

## ✅ Step 2: Add 4 New A Records

**After deleting the "Parked" record, add these 4 A records:**

### **For Each Record:**

1. **Click:** The green "Add New Record" button

2. **Fill in the form:**
   - **Type:** Select `A` (or "A Record")
   - **Name:** `@` (or leave blank if that's the option)
   - **Data/Value:** (one of the IPs below)
   - **TTL:** `3600` or `1 Hour` (or default)

3. **Click:** "Save" or "Add"

4. **Repeat:** For all 4 IP addresses

---

### **The 4 A Records to Add:**

| # | Type | Name | Data/Value | TTL |
|---|------|------|------------|-----|
| 1 | A | `@` | `185.199.108.153` | 3600 |
| 2 | A | `@` | `185.199.109.153` | 3600 |
| 3 | A | `@` | `185.199.110.153` | 3600 |
| 4 | A | `@` | `185.199.111.153` | 3600 |

**Important:**
- Add each IP as a **separate record**
- All 4 records should have the same name (`@`)
- Save after adding each one

---

## 📋 What Your DNS Records Should Look Like After

**You should have:**

```
Type | Name | Data                | TTL
-----|------|---------------------|-----
A    | @    | 185.199.108.153     | 3600
A    | @    | 185.199.109.153     | 3600
A    | @    | 185.199.110.153     | 3600
A    | @    | 185.199.111.153     | 3600
NS   | @    | ns39.domaincontrol.com. | (can't delete)
NS   | @    | ns40.domaincontrol.com. | (can't delete)
CNAME| www  | bisedaai.com.       | (keep this)
```

**Note:** 
- NS records (nameservers) can't be deleted - that's normal
- CNAME records can stay (they won't interfere)
- SOA and TXT records can stay

---

## ✅ Step 3: Verify Records

**After adding all 4 records:**

1. **Check:** All 4 A records are visible in the table
2. **Verify:** Each has the correct IP address
3. **Save:** Make sure changes are saved

---

## ⏰ Step 4: Wait for DNS Propagation

**After saving:**

1. **Wait:** 15-30 minutes for DNS to propagate
2. **Check:** GitHub Pages settings will update automatically
3. **Status:** Should change from "DNS check in progress" to "DNS check passed"

---

## 🎯 After DNS is Configured

**Check GitHub Pages:**

1. **Go to:** https://github.com/Julzwest/bisedaai-legal/settings/pages
2. **Check:** DNS status (should say "passed" after 15-30 min)
3. **Enable:** "Enforce HTTPS" checkbox
4. **Done:** Your site will be live at `https://bisedaai.com`

---

## 🚨 Troubleshooting

### **Can't delete "Parked" record?**
- Try editing it instead
- Change Data from "Parked" to one of the GitHub IPs
- Then add the other 3 IPs

### **Can't add 4 A records?**
- Some registrars limit A records
- Contact 123reg support if needed
- Or try adding them one at a time

### **Name field doesn't accept "@"?**
- Try leaving it blank
- Try typing `bisedaai.com`
- Check 123reg documentation

---

**Start by deleting the "Parked" A record, then add the 4 new ones!** 🚀

