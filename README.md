# Nishama Madushani Portfolio

A modern static portfolio website for Nishama Madushani, Global Mobility Consultant based in Dubai, United Arab Emirates. The site is designed for recruiters, multinational corporations, relocation management companies, HR leaders, and prospective global mobility clients.

## Features

- Responsive mobile-first layout
- Sticky navigation with active section highlighting
- Light and dark theme toggle
- Scroll progress indicator
- Hero typewriter effect
- Scroll reveal animations
- Animated experience counter
- Modern timeline for professional experience
- Skills, education, certifications, languages, resume, and contact sections
- Frontend-only contact form that opens the visitor's email client
- SEO meta tags, Open Graph tags, Twitter card tags, and JSON-LD profile data
- GitHub Pages compatible
- No frameworks, backend, database, or build step

## Project Structure

```text
portfolio/
  index.html
  styles.css
  script.js
  README.md
  assets/
    favicon.svg
    profile.jpg
    Nishama_Madushani_Resume.pdf
```

## Local Setup

Open `index.html` directly in a browser:

```text
portfolio/index.html
```

You can also serve it locally with any static server. For example, from the `portfolio` folder:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## GitHub Pages Deployment

1. Create a GitHub repository for the portfolio.
2. Upload the contents of the `portfolio` folder.
3. In GitHub, open **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the branch, usually `main`, and the root folder.
6. Save the settings and wait for GitHub Pages to publish the site.

If the files are inside a subfolder in your repository, move the contents of `portfolio` to the repository root before publishing, or configure GitHub Pages to serve from the correct folder.

## Customization Guide

- Update page content in `index.html`.
- Adjust colors, spacing, layout, and theme variables in `styles.css`.
- Update animations, typewriter phrases, counters, and form behavior in `script.js`.
- Replace social links, email, and phone numbers in `index.html` when needed.
- Update SEO text in the `<head>` section of `index.html` for search engines and social previews.

## Resume Replacement

Replace the placeholder resume file at:

```text
assets/Nishama_Madushani_Resume.pdf
```

Keep the same file name if you want the existing Download Resume and Open Resume buttons to keep working without editing the HTML.

## Profile Image Replacement

Replace the placeholder profile image at:

```text
assets/profile.jpg
```

Recommended image guidelines:

- Use a professional portrait.
- Use JPG format.
- Use a minimum size of 900 x 1000 pixels.
- Keep the subject centered.
- Compress the image before publishing for faster loading.

## Notes

The contact form is frontend-only and does not store messages. On submit, it opens the visitor's email client with the message prefilled and addressed to `nishama.q@gmail.com`.
