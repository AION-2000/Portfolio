# Shihab Shahriar Aion Portfolio

A high-performance, interactive personal portfolio website designed with a **Computer Science Engineer (CSE)** aesthetic. The site features a "Deep Espresso" & "Dark IDE" theme, utilizing advanced React 19 features, Framer Motion physics, and the Google Gemini API for a live terminal assistant.

## 🚀 Features

### 1. Interactive Core
*   **Custom Physics Cursor**: A custom-drawn cursor with trailing elements and spring physics that reacts to hover states (`components/CustomCursor.tsx`).
*   **Magnetic Navigation**: Navigation links and buttons magnetically snap to the cursor position (`components/Magnetic.tsx`).
*   **Smooth Scrolling**: Custom hook implementation for fluid anchor navigation (`hooks/useSmoothScroll.ts`).

### 2. Visual Effects
*   **Sticky Parallax Hero**: The Hero section remains sticky while fading and blurring as content scrolls over it.
*   **Velocity Marquee**: "DEPLOY • SCALE • OPTIMIZE" text strip that changes speed and direction based on scroll velocity (`components/ScrollVelocity.tsx`).
*   **3D Tilt Cards**: Project cards rotate in 3D space based on mouse position (`components/Gallery.tsx`).
*   **Typing & Glitch Effects**: Staggered character reveals and chromatic aberration glitch effects on hover.
*   **Noise Texture**: A global noise overlay adds a premium, film-grain texture to the flat UI colors.

### 3. AI Terminal Assistant (`components/ChatWidget.tsx`)
*   Powered by **Google Gemini API** (`gemini-2.5-flash`).
*   **Persona**: "Espresso Shell" – A Linux terminal technical assistant.
*   **UI**: Draggable-style window, code-streaming output, and terminal syntax highlighting.
*   **Streaming**: Real-time text streaming for a realistic data-fetching feel.

## 🛠 Tech Stack

*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS
*   **Animation**: Framer Motion
*   **Icons**: Lucide React
*   **AI**: Google GenAI SDK

## 📂 Project Structure

```bash
├── components/
│   ├── ChatWidget.tsx    # AI Terminal integration
│   ├── CustomCursor.tsx  # Physics-based cursor
│   ├── Footer.tsx        # Footer with status indicators
│   ├── Gallery.tsx       # Project grid with 3D tilt
│   ├── Hero.tsx          # Landing section with parallax
│   ├── Magnetic.tsx      # Hover physics wrapper
│   ├── Navbar.tsx        # Fixed top navigation
│   ├── ScrollVelocity.tsx# Speed-sensitive text strip
│   └── TypingText.tsx    # Character stagger animation
├── hooks/
│   └── useSmoothScroll.ts# Logic for smooth anchor links
├── services/
│   └── geminiService.ts  # Google Gemini API configuration
├── App.tsx               # Main layout and content orchestration
├── index.html            # Entry HTML with global CSS/Fonts
├── types.ts              # TypeScript interfaces
└── metadata.json         # Project metadata
```

## 🎨 Theme & Design System

The project uses a custom Tailwind configuration defined in `index.html`.

*   **Font**: `JetBrains Mono` (Google Fonts)
*   **Colors**:
    *   **Background**: `espresso-950` (#0A0503) - Deep Black/Brown
    *   **Foreground**: `latte-100` (#EBE0D6) - Creamy White
    *   **Accents**:
        *   `accent-orange` (#E67E22) - Used for Keywords/Highlights
        *   `accent-green` (#4CAF50) - Used for Strings/Success states
        *   `accent-blue` (#2196F3) - Used for Functions/Links

## ⚙️ Configuration & Customization

### 1. Updating Projects
Edit the `projects` array in `components/Gallery.tsx`:
```typescript
const projects: Project[] = [
  { 
    id: 1, 
    title: 'Project_Name', 
    category: 'AI / Web', 
    image: 'image_url', 
    description: 'Description...',
    link: 'github_url'
  },
  // ...
];
```

### 2. Updating Resume
Place your PDF in the public directory and update the `href` in the Contact section of `App.tsx`:
```tsx
<motion.a href="Shihab_Shahriar_Aion_Resume.pdf" ... >
```

### 3. AI Customization
To change the chatbot's behavior, edit the `SYSTEM_INSTRUCTION` constant in `services/geminiService.ts`.

## 🔑 Environment Variables

The application requires a Google Gemini API Key.
*   **Variable**: `VITE_GEMINI_API_KEY`
*   **Usage**: Automatically injected into `services/geminiService.ts`.

## 🚀 Deployment

1.  **Build**: `npm run build`
2.  **Preview**: `npm run preview`
3.  **Deploy**: Compatible with Vercel, Netlify, or GitHub Pages.

---
*© 2025 Shihab Shahriar Aion. All Systems Operational.*