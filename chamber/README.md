# Chamber Home Page - Setup Instructions

## ⚠️ CRITICAL: Weather API Setup Required

Your weather section will NOT work until you add your API key.

### Steps to Get Your API Key:

1. Go to https://openweathermap.org/api
2. Click "Sign Up" (it's FREE)
3. Verify your email
4. Go to "API Keys" in your account
5. Copy your API key
6. Open `chamber/scripts/home.js`
7. Replace line 32: `const apiKey = 'YOUR_API_KEY_HERE';`
   with: `const apiKey = 'your-actual-api-key-here';`

## ✅ What's Been Fixed

### 1. W3C HTML Validation
- ✅ Fixed heading hierarchy (changed h3 to h2)
- ✅ Fixed unescaped ampersands in URLs
- ✅ Improved alt text for hero image

### 2. Color Contrast (AA Level)
- ✅ Changed header text from #000 to #1a1a1a for better contrast
- ✅ Updated navigation link colors
- ✅ Made active navigation state more visible (bold + colored underline)

### 3. Navigation & Wayfinding
- ✅ Active page is now clearly marked with:
  - Bold font weight
  - Blue underline (primary color)
- ✅ Responsive hamburger menu works on mobile

### 4. Page Weight Optimization
- ✅ Reduced hero image dimensions (1200x500 instead of 1260x750)
- ✅ Added fit=crop to optimize image loading
- ✅ Used smaller mobile image (600x400)

### 5. Current Events Section
- ✅ Section is present with placeholder content
- ✅ Properly styled with h2 heading

### 6. Weather Section
- ⚠️ **REQUIRES API KEY** - See instructions above
- ✅ Code is ready to display:
  - Current temperature
  - Weather description
  - Weather icon
  - 3-day forecast with icons

### 7. Member Spotlight
- ✅ Fetches from members.json
- ✅ Filters only Gold (level 3) and Silver (level 2) members
- ✅ Randomly selects 2-3 members on each page load
- ✅ Displays: name, logo, phone, address, website, membership level

## 📋 Testing Checklist

Before submitting, verify:

1. [ ] Added OpenWeatherMap API key to home.js
2. [ ] Test on mobile view (DevTools responsive mode)
3. [ ] Test on desktop view
4. [ ] Run Lighthouse audit (Accessibility, Best Practices, SEO all 95+)
5. [ ] Check CSS Overview for color contrast errors
6. [ ] Verify page weight is under 500KB (Network tab)
7. [ ] Test navigation menu on mobile (hamburger works)
8. [ ] Verify active page is highlighted in navigation
9. [ ] Check that weather displays correctly
10. [ ] Check that 2-3 random spotlights appear

## 🚀 How to Test Locally

1. Open VS Code
2. Right-click on `chamber/index.html`
3. Select "Open with Live Server"
4. Open DevTools (F12)
5. Check Console for any errors
6. Test responsive views

## 📊 Expected Lighthouse Scores

After adding API key, you should get:
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+
- Performance: May vary based on network

## 🔧 Common Issues

**Weather not showing?**
- Check if you added your API key
- Check browser console for errors
- Verify API key is active (can take 1-2 hours after signup)

**Spotlights not showing?**
- Check that members.json exists in chamber/data/
- Check browser console for fetch errors
- Verify file path is correct

**Navigation not working on mobile?**
- Check that home.js is loaded
- Verify menu-toggle button exists
- Check console for JavaScript errors

## 📝 Commit and Push

After adding your API key:

```bash
git add .
git commit -m "feat: complete W03 Chamber Home Page with all requirements"
git push
```

Your live site will be at:
https://Stevenkwizera06.github.io/wdd231/chamber/index.html
