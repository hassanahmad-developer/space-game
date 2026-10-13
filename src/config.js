// ============================================================
//  SIRF YAHAN SE EDIT KARO: game ka naam, version, download links
// ============================================================

const base = import.meta.env.BASE_URL;

export const GAME = {
  name: "Space Solar System Battle",
  version: "1.0.0",
  author: "Hassan Ahmad",

  // Har platform ka `url` apni hosted installer file ka link hai
  // (GitHub Releases ka link best hai). Khali ("") chhodo to
  // button "Coming soon" dikhayega.
  downloads: {
    windows: {
      label: "Windows",
      detail: "Windows 10 or 11, 64-bit",
      size: "135 MB",
      url: "https://github.com/hassanahmad-developer/space-game/releases/download/v1.0.0/space-game.Setup.1.0.0.exe",
    },
  },

  // Images ko public/screenshots/ folder mein rakho (1.png, 2.png, 3.png)
  screenshots: [
    `${base}assets/preview.png`,
    `${base}screenshots/1.png`,
    `${base}screenshots/2.png`,
    `${base}screenshots/3.png`,
  ],
};
