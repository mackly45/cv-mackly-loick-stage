# cv-mackly-loick-stage

Portfolio website for Mackly Loick Tchicaya - Full Stack & Data Developer

## Description
This is a modern, responsive portfolio website showcasing skills, experience, and projects. The site features animated elements, a particle background, and a clean dark theme design.

## Deployment
This site is automatically deployed to GitHub Pages using GitHub Actions.

### How to Set Up GitHub Pages
1. Go to your repository settings on GitHub
2. Scroll down to the "Pages" section
3. Under "Source", select "GitHub Actions"
4. The site will automatically deploy on every push to the main branch

### Manual Deployment Steps (if needed)
1. Go to your repository settings on GitHub
2. Scroll down to the "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/(root)" folder
5. Click "Save"

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Bootstrap
- Font Awesome
- Particles.js
- GSAP (GreenSock Animation Platform)
- AOS (Animate On Scroll)

## Pages
- Home: tchicaya.html
- Skills: competences.html
- Experience: experience.html
- Education: formation.html
- Projects: projet-realisation.html
- Academic Experience: experience-academique.html
- Error Page: 404.html
- Index Redirect: index.html

## Access
The site can be accessed at: https://mackly45.github.io/cvmackly-loick-stage/

## Features
- Responsive design that works on all devices
- Animated elements using GSAP and AOS
- Interactive particle background
- Dark theme with gradient accents
- Smooth scrolling navigation
- Social media links
- Contact form
- Skill visualization
- Project showcase

## Deployment Workflow
The site uses GitHub Actions for automatic deployment:
- Workflow file: `.github/workflows/deploy.yml`
- Deploys on every push to the main branch
- No Docker needed for this static site