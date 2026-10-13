import { useEffect, useState } from "react";

// Visitor ka OS detect karke sahi download button highlight karta hai
export function usePlatform() {
  const [platform, setPlatform] = useState("windows");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("android")) return setPlatform("windows");
    if (ua.includes("mac")) return setPlatform("mac");
    if (ua.includes("linux")) return setPlatform("linux");
    setPlatform("windows");
  }, []);

  return platform;
}
