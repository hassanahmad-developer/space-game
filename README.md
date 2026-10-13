# Space Game: Download Website (React + Vite)

## Chalane ka tareeqa

```bash
npm install
npm run dev      # local pe dekhne ke liye (http://localhost:5173)
npm run build    # production build -> dist/ folder
npm run preview  # build ko local pe test karo
```

## Kya edit karna hai

1. `src/config.js` mein game ka naam, version aur download links daalo.
2. Installer (.exe) GitHub Releases pe upload karo aur uska link `url` mein paste karo.
3. Screenshots `public/screenshots/` mein `1.png`, `2.png`, `3.png` naam se rakho
   (agar images na hon to screenshots wala section khud hide ho jata hai).
4. Text change karna ho to `src/components/` mein Features.jsx, HowToPlay.jsx, Download.jsx dekho.

## Hosting (free)

- **Netlify / Vercel:** repo connect karo. Build command `npm run build`, output folder `dist`.
- **GitHub Pages:** `dist/` folder ka content publish karo (base path already `./` hai).

## Installer kaise banta hai (Electron game)

```bash
npm i -D electron-builder
npm run dist   # game ke project mein, package.json mein "dist": "electron-builder" script ke saath
```
