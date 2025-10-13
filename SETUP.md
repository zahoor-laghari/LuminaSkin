# LuminaSkin - Quick Setup Guide

## 🚀 5-Minute Quick Start

### Step 1: Get the Files
You have all the files ready! No installation or build process required.

### Step 2: Start a Local Server
Choose one of these methods:

**Python (Recommended)**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Node.js**
```bash
npx http-server -p 8000
```

**PHP**
```bash
php -S localhost:8000
```

**VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html`
- Select "Open with Live Server"

### Step 3: Open in Browser
Navigate to:
```
http://localhost:8000
```

### Step 4: Explore!
✅ Browse products at `/shop.html`  
✅ View 3D models at `/product.html?slug=hydrating-hyaluronic-serum`  
✅ Add items to cart  
✅ Test checkout flow  
✅ Build routines at `/routine-builder.html`  
✅ Access admin dashboard at `/admin.html`

---

## 📦 What's Included

### HTML Pages (11 total)
- ✅ Homepage with hero and features
- ✅ Shop with advanced filtering
- ✅ Product detail with 3D viewer
- ✅ Shopping cart
- ✅ Checkout flow
- ✅ User account/login
- ✅ Admin dashboard
- ✅ Routine builder
- ✅ About page
- ✅ Blog
- ✅ All pages fully responsive

### JavaScript Modules (9 files)
- ✅ Product database with 8 products
- ✅ Shopping cart system
- ✅ Search functionality
- ✅ 3D viewer component
- ✅ Filtering & sorting
- ✅ Analytics tracking
- ✅ All interactive features

### Styling
- ✅ Custom CSS with animations
- ✅ Tailwind CSS (CDN)
- ✅ Skincare brand theme
- ✅ Mobile-first responsive

---

## 🎨 Customization Quick Guide

### Change Brand Colors
Edit `index.html` (line 23-27) and other HTML files:
```javascript
primary: {
  600: '#b15d47',  // Change this hex code
  // ... other shades
}
```

### Add Products
Edit `js/data.js`:
```javascript
productsData.push({
  id: 9,
  name: "Your Product Name",
  slug: "your-product-slug",
  price: 59.00,
  // ... see existing products for full structure
});
```

### Modify Styles
Edit `css/style.css`:
```css
/* Add your custom styles here */
.my-custom-class {
  /* Your CSS */
}
```

---

## 🔧 Common Configurations

### Google Analytics
Replace `GA_MEASUREMENT_ID` in all HTML files:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
```

### Stripe Payment (for production)
Add Stripe public key in checkout:
```javascript
const stripe = Stripe('pk_live_YOUR_KEY');
```

### Update Product Images
Replace Unsplash URLs in `js/data.js` with your own:
```javascript
image: "https://yourdomain.com/images/product1.jpg"
```

---

## 📱 Testing Checklist

### Desktop Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Testing
- [ ] iOS Safari
- [ ] Chrome Android
- [ ] Responsive breakpoints (375px, 768px, 1024px, 1440px)

### Functionality Testing
- [ ] Product filtering works
- [ ] Search returns results
- [ ] Cart adds/removes items
- [ ] Cart persists on refresh
- [ ] 3D viewer loads and rotates
- [ ] Forms validate properly
- [ ] Navigation works on mobile

### Performance Testing
- [ ] Lighthouse audit score >90
- [ ] All images load properly
- [ ] No console errors
- [ ] Fast page load times

---

## 🌐 Deployment Options

### Option 1: Netlify (Easiest)
1. Create account at netlify.com
2. Drag & drop your project folder
3. Done! Your site is live.

**Command Line:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Option 2: Vercel
```bash
npm install -g vercel
vercel --prod
```

### Option 3: GitHub Pages
1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select main branch
4. Your site will be at `username.github.io/repo-name`

### Option 4: Traditional Hosting
1. Upload all files via FTP
2. Ensure `index.html` is in root
3. Configure web server (Apache/Nginx)

---

## 🔐 Production Checklist

Before going live:

### Security
- [ ] Enable HTTPS/SSL
- [ ] Add Content Security Policy headers
- [ ] Sanitize all user inputs (when backend added)
- [ ] Use environment variables for API keys

### Performance
- [ ] Minify HTML, CSS, JS
- [ ] Optimize images (WebP format)
- [ ] Enable Gzip/Brotli compression
- [ ] Add CDN for assets
- [ ] Set up caching headers

### SEO
- [ ] Update meta descriptions
- [ ] Add Open Graph tags
- [ ] Create sitemap.xml
- [ ] Add robots.txt
- [ ] Submit to Google Search Console

### Analytics
- [ ] Add real Google Analytics ID
- [ ] Set up conversion tracking
- [ ] Configure e-commerce tracking
- [ ] Test all events fire correctly

### Legal
- [ ] Add Privacy Policy
- [ ] Add Terms of Service
- [ ] Add Cookie Consent banner
- [ ] Ensure GDPR compliance

---

## 🆘 Troubleshooting

### 3D Models Not Loading
**Issue:** Viewer shows fallback image  
**Solution:** 
- Ensure WebGL is enabled in browser
- Check browser console for errors
- Verify model URLs are accessible

### Cart Not Persisting
**Issue:** Cart empties on refresh  
**Solution:**
- Check browser localStorage is enabled
- Clear browser cache and try again
- Verify no JavaScript errors in console

### Styles Not Loading
**Issue:** Page looks unstyled  
**Solution:**
- Check internet connection (Tailwind uses CDN)
- Verify `css/style.css` path is correct
- Check browser console for 404 errors

### Search Not Working
**Issue:** No search results appear  
**Solution:**
- Verify `js/data.js` is loaded
- Check that search input has correct ID
- Look for JavaScript errors in console

---

## 📞 Need Help?

### Documentation
- Main README: `README.md`
- This guide: `SETUP.md`

### Code Comments
All JavaScript files include detailed comments explaining functionality.

### Browser DevTools
Press F12 to open DevTools:
- **Console**: Check for errors
- **Network**: Check file loading
- **Application**: View localStorage

---

## 🎉 You're Ready!

Your LuminaSkin website is fully functional and ready to use. 

**Next Steps:**
1. Customize with your brand
2. Add real product data
3. Upload 3D models
4. Test thoroughly
5. Deploy to production

**Enjoy building amazing skincare experiences!** ✨

---

**Version:** 1.0  
**Last Updated:** October 13, 2025  
**Support:** See README.md for details