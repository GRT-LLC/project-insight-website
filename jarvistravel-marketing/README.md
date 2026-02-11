# JarvisTravel Marketing Website

A standalone, production-ready marketing website for JarvisTravel - your AI-powered travel assistant.

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)

1. Create a new GitHub repository
2. Upload all files from this folder to the repository
3. Go to **Settings > Pages**
4. Under "Source", select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Click **Save**
7. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 2: Local Development

Simply open `index.html` in your browser. The site uses CDN-hosted dependencies, so no build step is required.

```bash
# Using Python's built-in server
python -m http.server 8000

# Using Node's http-server
npx http-server
```

Then open http://localhost:8000

## 📁 Project Structure

```
jarvistravel-marketing/
├── index.html      # Entry point with meta tags and dependencies
├── app.jsx         # React application (compiled via Babel)
└── README.md       # This file
```

## ✨ Features

### Pages Included
- **Home** - Hero section, features, Fatigue Index™ showcase, testimonials, CTAs
- **Features** - Detailed feature descriptions with visuals
- **Pricing** - Three-tier pricing with monthly/annual toggle
- **About** - Company story, mission, and values
- **Contact** - Contact form and information
- **Waitlist** - Full waitlist signup flow with confirmation
- **Privacy Policy** - Legal privacy information
- **Terms of Service** - Legal terms
- **Data Security** - Data protection information

### Technical Features
- ✅ Fully responsive (mobile-first)
- ✅ Modern SaaS design with glassmorphism
- ✅ Smooth animations and transitions
- ✅ SEO meta tags and Open Graph
- ✅ Newsletter signup in footer
- ✅ Client-side routing (no server required)
- ✅ No build step needed

## 🎨 Customization

### Changing Colors
Edit the Tailwind classes in `app.jsx`. The primary gradient is:
```jsx
from-blue-600 to-purple-600
```

### Adding Analytics
Add your tracking script before the closing `</head>` tag in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
```

### Connecting Form Submissions
Replace the `console.log()` statements in form handlers with your API calls:

```jsx
// In WaitlistPage handleSubmit:
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Example: Submit to your API
  await fetch('https://your-api.com/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  setSubmitted(true);
};
```

### Recommended Services for Forms
- [Formspree](https://formspree.io/) - Simple form backend
- [Netlify Forms](https://www.netlify.com/products/forms/) - If hosting on Netlify
- [ConvertKit](https://convertkit.com/) - Email marketing + forms
- [Mailchimp](https://mailchimp.com/) - Email marketing

## 🔧 Production Deployment

### For GitHub Pages
1. Update the `og:url` meta tag in `index.html` with your actual domain
2. Replace social media links in the footer with your actual profiles
3. Connect form submissions to your backend

### Custom Domain
1. Add a `CNAME` file with your domain name
2. Configure DNS with your domain registrar

### Environment-Specific Settings
Consider using environment detection for API endpoints:
```javascript
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : 'https://api.jarvistravel.com';
```

## 🔗 Connecting to the Full App

When ready to connect this marketing site to your full JarvisTravel application:

1. **Option A: Subdomain Setup**
   - Marketing: `www.jarvistravel.com`
   - App: `app.jarvistravel.com`
   - Update navigation buttons to redirect to app subdomain

2. **Option B: Same Domain with Routes**
   - Use React Router or your framework's routing
   - Marketing pages: `/`, `/features`, `/pricing`, etc.
   - App pages: `/app/*`, `/dashboard/*`

3. **Update Auth Redirects**
   ```jsx
   // Change the waitlist button to redirect to app
   <button onClick={() => window.location.href = 'https://app.jarvistravel.com/signup'}>
     Get Started
   </button>
   ```

## 📝 License

Copyright © 2024 JarvisTravel. All rights reserved.

---

Built with ❤️ for travelers everywhere.
