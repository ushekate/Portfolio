# Unnati Namdev Shekate — Developer Portfolio

A responsive, recruiter-focused portfolio built with **HTML5, CSS3 and vanilla JavaScript**. No build step or frontend framework is required.

## Project structure

```text
portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── images/       # Add real project screenshots here
    ├── icons/        # Favicon placeholder
    └── Unnati-Namdev-Shekate-Resume.pdf  # Add your actual PDF
```

## Run locally

1. Extract the project folder.
2. Add your real resume PDF to `assets/` using the exact filename `Unnati-Namdev-Shekate-Resume.pdf`.
3. Open `index.html` in a current browser. For a more realistic local server, open the folder in VS Code and use the Live Server extension.
4. Test the menu, theme toggle, project filters, contact form validation, resume link, and mobile layout.

The page uses Google Fonts and Font Awesome from CDNs, so those assets require an internet connection. The page itself does not require a build process.

## Before publishing: replace sample details

Open `index.html` and search for these placeholders:

- `YOUR_EMAIL@example.com`
- `+91 YOUR PHONE NUMBER`
- `https://www.linkedin.com/in/your-linkedin/`
- `https://github.com/your-github`
- `https://your-domain.example/`

Replace them with the email, phone number, LinkedIn URL, GitHub URL, canonical URL and Open Graph URL you want public. Update the footer profile links too. Keep `mailto:` and `tel:` values in the contact links aligned with the displayed values.

**Education note:** confirm your current MCA result/status before publishing. The education card includes a reminder because the supplied information has mentioned a result-pending status previously.

## Add your real resume PDF

1. Export the final resume as a PDF.
2. Name it exactly `Unnati-Namdev-Shekate-Resume.pdf`.
3. Place it inside `assets/`.
4. All resume links already point to `assets/Unnati-Namdev-Shekate-Resume.pdf` and use the browser's `download` attribute.
5. Test the link locally and again after deployment. The download will not work until the real file exists.

Do not upload a blank or dummy PDF in place of the real resume.

## Add project URLs and screenshots

Project cards currently use CSS illustrations as visual placeholders; they are not screenshots of deployed products. No fake live or repository links are included.

For each project:
1. Add a screenshot to `assets/images/`, for example `edulearn-dashboard.webp`.
2. In the corresponding `.project-art` element in `index.html`, replace the CSS illustration with an image such as:
   ```html
   <img class="project-screenshot" src="assets/images/edulearn-dashboard.webp"
        alt="EduLearn student dashboard showing course and assignment information">
   ```
3. Add this style to `style.css`:
   ```css
   .project-screenshot { width: 100%; height: 100%; object-fit: cover; display: block; }
   ```
4. Replace the current “Request demo” / “Discuss project” anchor with the real deployed demo URL only if the project is live. Add `target="_blank" rel="noopener noreferrer"` for external links.
5. Replace the source-link placeholder with a real repository link only if that repository is public and belongs to the project. Never publish private code URLs.
6. Check that each feature listed is implemented in the version being showcased. Remove wording like “if implemented” after verifying features.

## Connect the contact form

The current form performs client-side validation only. It does **not** send email or store form submissions. To receive messages, connect a trusted form service or your own backend.

General integration steps:
1. Choose a form provider that supports static HTML forms.
2. Create a form and follow its current documentation to obtain the correct endpoint or client-side integration.
3. Send the form data using the provider's documented method, with proper success and failure handling.
4. Display a success message only after the provider confirms the submission.
5. Never place private API keys or secret credentials in `script.js`; browser code is public.
6. Test valid submissions, validation errors, provider failures and spam protection.

## Deploy to GitHub Pages

1. Create a GitHub repository, for example `unnati-portfolio`.
2. Upload `index.html`, `style.css`, `script.js`, `README.md` and the `assets/` directory to the repository root.
3. Open repository **Settings → Pages**.
4. Select deployment from the `main` branch and `/ (root)` folder, then save.
5. Wait for GitHub Pages to publish the site and open the generated URL.
6. Update canonical and Open Graph URLs to the published site URL.
7. Test all navigation, asset paths, PDF download and external links on the live URL.

## Deploy to Vercel

1. Push the project folder to a GitHub repository.
2. Sign in to Vercel and import the repository.
3. Choose the static site / Other preset if prompted.
4. Leave the build command empty and use the repository root as the output directory, unless the current Vercel UI requires a static output setting.
5. Deploy and test the resulting URL.
6. Update canonical and Open Graph URLs to the deployed URL.

## Accessibility and behaviour checklist

- [ ] Navigation works with mouse, touch and keyboard.
- [ ] Mobile menu opens, closes, and responds to Escape.
- [ ] Theme selection persists after refresh.
- [ ] Typing headline works; reduced-motion preference is respected.
- [ ] Section navigation highlights the current section.
- [ ] Project filters show the expected categories.
- [ ] Contact form shows accessible validation errors.
- [ ] Contact form does not claim a message was sent before service integration.
- [ ] Real resume PDF exists and downloads correctly.
- [ ] All contact and social links are accurate.
- [ ] Real project screenshots have descriptive alt text.
- [ ] No demo or repository URLs have been invented.
- [ ] Check mobile widths around 320px, 375px, 768px and desktop widths.
- [ ] Test with keyboard navigation and browser devtools console.
- [ ] Verify MCA status and all employment dates before publishing.

## Notes

- The code is framework-free. Font Awesome and Google Fonts are loaded from CDNs.
- The contact form is intentionally not wired to a backend.
- Do not add private contact information unless you want it publicly visible on the internet.
