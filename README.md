# Interactive Developer Portfolio — Fictional Demo

A bilingual, interactive developer portfolio built with **React 19, TypeScript, Vite, Tailwind CSS v4, and Motion**. The project focuses on polished frontend presentation, responsive layouts, and scroll-driven animation.

**[Live Demo](https://personal-portfolio-4ch.pages.dev/)** · **[Source Code](https://github.com/MohammadGhorbani-dev/personal-portfolio)**

> **About this demo:** This website was created by **Mohammad Ghorbani**. **Alex Morgan** is a fictional portfolio persona—not the developer or owner of the project. The biography, career history, project concepts, GitHub-style statistics, social profiles, and downloadable resume are sample content created for demonstration.

## Highlights

- **English and Persian:** Language switching with left-to-right (LTR) and right-to-left (RTL) layouts.
- **Scroll-driven animation:** A 150-frame image sequence rendered on HTML Canvas and linked to scroll progress.
- **Interactive UI:** Glassmorphism panels, animated transitions, magnetic buttons, tilt effects, and a custom desktop cursor.
- **Responsive design:** Layouts adapted for desktop and mobile devices.
- **Fictional project gallery:** Four conceptual UI showcases—Nexus Dashboard, Pulse Chat, Orbit Contacts, and Flow Tasks.
- **Demo-only interactions:** The contact form validates input locally but **does not send or store messages**. Social profile cards and GitHub-style statistics are illustrative rather than connected to real accounts.
- **Sample resume:** A downloadable fictional CV is included to demonstrate the portfolio's download flow.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI | React 19, TypeScript |
| Tooling | Vite |
| Styling | Tailwind CSS v4 |
| Animation | Motion, HTML Canvas |
| Icons | Lucide React, React Icons |
| Hosting | Cloudflare Pages |

## Getting Started

### Requirements

- Node.js 20 or newer is recommended.
- npm

### Run locally

```bash
git clone https://github.com/MohammadGhorbani-dev/personal-portfolio.git
cd personal-portfolio
npm install
npm run dev
```

The development server is configured to run at **http://localhost:3000**.

### Available commands

```bash
npm run dev      # Start the development server
npm run lint     # Run TypeScript type checking (tsc --noEmit)
npm run build    # Generate the production build in dist/
npm run preview  # Preview the production build locally
```

## Project Files

```text
src/
  components/       React UI components and animations
  context/          English/Persian translations and language state
public/
  profile.jpg        Fictional persona portrait
  p1.jpg - p4.jpg   Concept project images
  cv.pdf             Fictional sample resume
  frames/            150 JPEG frames for the scroll animation
  assets/gifs/       Animated imagery for social showcase cards
```

The assets under `public/` are required for the complete visual experience. The mock project images are **concept illustrations**, not proof of separately deployed applications.

## Deployment

The live demo is deployed on **Cloudflare Pages** from the GitHub repository.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Output directory | `dist` |

The current demo does not require backend credentials or environment variables for its contact form and sample statistics.

## Credits and Scope

**Created and maintained by [Mohammad Ghorbani](https://github.com/MohammadGhorbani-dev).**

This repository demonstrates a **portfolio frontend**, not production implementations of the fictional messaging, analytics, contacts, or productivity products featured in its cards. No live social accounts or payment services are connected to the demo showcase.

No open-source license is currently included in this repository. Public access to the source does not, by itself, grant permission to reuse or redistribute the code or assets.
