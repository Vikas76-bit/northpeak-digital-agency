# NorthPeak Digital — Agency Website

Single-page responsive web application built for the **Digital Heroes Qualification Task (Role 05: Web Development)**.

---

## 📌 Technical Overview

- **Public GitHub Repository**: [https://github.com/Vikas76-bit/northpeak-digital-agency](https://github.com/Vikas76-bit/northpeak-digital-agency)
- **Live Deployed Website**: [https://northpeak-digitalagency.netlify.app/](https://northpeak-digitalagency.netlify.app/)
- **Loom Video Walkthrough**: [https://www.loom.com/share/f627115d75f8412b8f7d74f391e0641b](https://www.loom.com/share/f627115d75f8412b8f7d74f391e0641b)
- **Tech Stack**: Vanilla HTML5, CSS3, ES6 JavaScript. Zero external dependencies or heavy frameworks.
- **Design Architecture**: Dark luxury theme (`#0B1120`) with light mode toggle, 8px spacing grid, CSS custom variables, and WCAG AA color contrast compliance.

---

## 💻 Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Open `index.html` directly in your browser or run using VS Code Live Server.

---

## 📁 Repository Structure

```
Heros/
├── index.html            # Main HTML document with JSON-LD schema
├── favicon.svg           # Vector favicon asset
├── README.md             # Project documentation & setup guide
├── css/
│   ├── variables.css     # Design tokens, theme variables & 8px grid scale
│   ├── style.css         # Reset, preloader, particle canvas & typography rules
│   ├── components.css    # Nav, hero, services, process, pricing, FAQ, contact form
│   └── responsive.css    # Breakpoint overrides (360px, 390px, 414px, 768px, 1024px, 1280px, 1440px, 1920px)
└── js/
    ├── main.js           # Header, theme switcher, drawer, scroll spy & FAQ accordion
    ├── animations.js     # Background particle canvas, scroll reveal & stat counters
    └── validation.js     # Contact form validation & toast notifications
```

---

## ⚡ Implemented Features

1. **Sticky Glass Navigation**: Shrinks on scroll, supports active section scroll-spy, includes theme toggle button, and responsive mobile drawer.
2. **Hero Visual & Canvas Simulations**: Dual CTAs, live performance metrics, and an interactive HTML5 canvas revenue chart.
3. **Services Grid**: 6 core agency services with vector icons, tags, and micro-hover interactions.
4. **Why Choose Us**: 6 technical pillars detailing fast delivery, transparent communication, performance-first focus, and accessible code.
5. **Results & Testimonials**: Scroll-triggered stat counters (`120+` Projects, `96%` Satisfaction, `5+` Years, `18+` Industries), partner brand logo marquee, and 3 client testimonial cards.
6. **5-Step Process**: Connected timeline steps covering Discovery, Design, Development, Testing, and Launch.
7. **Pricing Tier Grid**: 3 plans (Starter, Growth [Highlighted], Enterprise with Contact Us button).
8. **FAQ Accordion**: 5 expandable items with `aria-expanded` attributes and keyboard navigation.
9. **Contact Form & Client Validation**: Field-level validation for Name, Email (regex pattern), Company, Message, and Agreement Checkbox with loading indicator and toast feedback.
10. **Footer Link**: Contains required credit line `Built for Digital Heroes Training Task` hyperlinked to `https://digitalheroesco.com`.

---

## ⚡ Target Lighthouse Metrics & Accessibility

- **Target Accessibility Score**: **100**
- **Target Performance Score**: **95+**

- **Asset Loading**: Inline vector SVGs eliminate extra image HTTP requests. Google Fonts preconnected with `display=swap`.
- **Animation Performance**: CSS transitions use GPU-accelerated `transform` and `opacity` properties to prevent layout shifts (CLS).
- **Accessibility Practices**: Semantic HTML5 elements (`header`, `nav`, `main`, `section`, `article`, `footer`), keyboard tab ordering, visible focus rings, ARIA roles, and `prefers-reduced-motion` support.
- **SEO & Metadata**: Complete Open Graph, Twitter Cards, canonical link, `robots` meta tag, and Schema.org `ProfessionalService` JSON-LD script.

---

## 🤖 AI Usage Statement

> *In compliance with Digital Heroes Task Kit Rule #1:*
> 
> **AI Assistance**: Gemini 3.6 Flash / Antigravity was used as an agentic coding assistant to draft semantic HTML structural scaffolds, establish baseline CSS custom properties, and formulate validation regex logic. All code was subsequently reviewed, refactored, and audited manually for WCAG AA compliance, layout precision across breakpoints, and execution speed.

---

## Submission

This project was created as part of the Digital Heroes Web Development Qualification Task.

Submission package includes:
- Live deployed website
- Public GitHub repository
- Lighthouse audit screenshots
- Loom walkthrough