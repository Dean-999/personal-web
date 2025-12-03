# Dean Shen - Personal Website

A modern, interactive personal website showcasing my academic achievements, sports accomplishments, personal interests, and extracurricular activities.

## 🌐 Live Demo

Once deployed, your website will be available at: `https://yourusername.github.io/repository-name`

## 📁 Project Structure

```
/
├── index.html              # Landing page (homepage)
├── academic.html           # Academic achievements and journey
├── personal.html           # Personal interests, hobbies, music, and travel
├── sport.html              # Athletic accomplishments and journey
├── extracurricular.html    # Extracurricular activities and projects
├── css/                    # All stylesheets
│   ├── landing.css
│   ├── academic.css
│   ├── personal.css
│   ├── sport.css
│   └── extracurricular.css
├── js/                     # All JavaScript files
│   ├── gl-matrix-min.js
│   ├── infinite-menu.js
│   ├── logo-loop.js
│   ├── landing.js
│   ├── landing-init.js
│   ├── script.js
│   └── tech-travel-map.js
├── images/                 # All images and assets
│   ├── Dean.PNG
│   ├── portrait.JPG
│   ├── academic.svg
│   ├── rafiki.svg
│   ├── IMG_9192.svg
│   ├── background.png
│   ├── name.png
│   ├── image/              # Album covers and personal photos
│   └── movies/             # Movie posters
└── README.md               # This file
```

## 🚀 Deployment to GitHub Pages

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Name your repository (e.g., `personal-website` or `yourusername.github.io`)
5. Choose **Public** (required for GitHub Pages)
6. **Do NOT** initialize with README, .gitignore, or license
7. Click **"Create repository"**

### Step 2: Upload Your Files

#### Option A: Using GitHub Web Interface (Easiest)

1. On your repository page, click **"uploading an existing file"**
2. Drag and drop ALL files and folders from this directory
3. Wait for the upload to complete
4. Scroll down and click **"Commit changes"**

#### Option B: Using Git Command Line

```bash
# Navigate to your project folder
cd "/Users/deanshen/Desktop/project/my project/personal web clean"

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Personal website"

# Add your GitHub repository as remote (replace with your URL)
git remote add origin https://github.com/yourusername/repository-name.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select **"Deploy from a branch"**
5. Under **"Branch"**, select **"main"** and **"/ (root)"**
6. Click **"Save"**

### Step 4: Wait for Deployment

- GitHub will automatically build and deploy your site
- This usually takes 1-5 minutes
- You'll see a green checkmark when it's ready
- Your site will be live at: `https://yourusername.github.io/repository-name`

## ✅ Verification Checklist

After deployment, verify that everything works:

- [x] Homepage loads correctly with animations
- [x] All navigation links work (Personal, Academic, Sports, Activities)
- [x] All images display properly
- [x] All CSS styling is applied
- [x] All JavaScript functionality works (3D menu, animations, etc.)
- [x] Back to Home buttons work on all pages
- [x] No broken paths or 404 errors
- [x] Responsive design works on mobile devices

## 🔧 Troubleshooting

### Images Not Loading

If images don't load after deployment:

1. Check that all image paths use `images/` not `image/` or `assets/images/`
2. Verify image file names match exactly (case-sensitive)
3. Check browser console for 404 errors

### CSS Not Applied

If styles don't load:

1. Verify all CSS files are in the `css/` folder
2. Check that HTML files reference `css/filename.css`
3. Clear browser cache and refresh

### JavaScript Not Working

If interactive features don't work:

1. Verify all JS files are in the `js/` folder
2. Check browser console for errors
3. Ensure external CDN scripts load (Chart.js, Leaflet, etc.)

### 3D Menu Not Appearing

If the infinite 3D menu doesn't show:

1. Check that `gl-matrix-min.js` and `infinite-menu.js` are loaded
2. Verify your browser supports WebGL 2.0
3. Check console for errors

## 🎨 Customization

### Updating Content

- **Academic Achievements**: Edit `academic.html`
- **Personal Info**: Edit `personal.html`
- **Sports**: Edit `sport.html`
- **Activities**: Edit `extracurricular.html`
- **Landing Page**: Edit `index.html`

### Changing Styles

All CSS files are in the `css/` folder. Each page has its own stylesheet:

- `css/landing.css` - Landing page styles
- `css/academic.css` - Academic page styles
- `css/personal.css` - Personal page styles
- `css/sport.css` - Sport page styles
- `css/extracurricular.css` - Extracurricular page styles

### Adding Images

1. Place new images in the `images/` folder
2. Reference them in HTML as: `<img src="images/yourimage.jpg" alt="Description">`

## 📱 Features

- **Interactive Landing Page**: 3D infinite menu navigation with smooth animations
- **Academic Section**: Showcases achievements, competitions, and leadership roles
- **Personal Section**: Music preferences, travel map, and personal interests
- **Sports Section**: Athletic journey and accomplishments
- **Extracurricular Section**: Projects and activities
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern Animations**: Smooth transitions and interactive elements

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations and transitions
- **JavaScript**: Interactive features and dynamic content
- **WebGL**: 3D menu navigation
- **Leaflet.js**: Interactive travel map
- **Chart.js**: Data visualization
- **Simple Icons**: Technology stack icons

## 📞 Support

If you encounter any issues:

1. Check the console for errors (F12 in most browsers)
2. Verify all files are uploaded correctly
3. Ensure GitHub Pages is enabled in repository settings
4. Wait a few minutes after deployment for changes to propagate

## 📄 License

This website template is for personal use. Feel free to use and modify for your own personal website.

---

**Built with ❤️ by Dean Shen**

Last Updated: December 2025
