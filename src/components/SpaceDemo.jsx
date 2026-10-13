import { useEffect, useRef } from "react";

const TAU = Math.PI * 2;

// Sprite sheet data from sprites.json
const SHIP = { fw: 32, fh: 32, cols: 5 };
const ASTEROID = { fw: 48, fh: 48, cols: 8 };

function makeRock(w, h) {
  const edge = Math.floor(Math.random() * 4);
  const size = Math.floor(Math.random() * 3); // 0=small,1=medium,2=large
  const r = [18, 28, 42][size];
  let x, y;
  if (edge === 0) { x = Math.random() * w; y = -r; }
  else if (edge === 1) { x = w + r; y = Math.random() * h; }
  else if (edge === 2) { x = Math.random() * w; y = h + r; }
  else { x = -r; y = Math.random() * h; }
  const a = Math.atan2(h / 2 - y, w / 2 - x) + (Math.random() - 0.5) * 1.2;
  const speed = 25 + Math.random() * 45;
  return {
    x, y, r, size,
    variant: Math.floor(Math.random() * 2), // 0 or 1
    frame: Math.floor(Math.random() * 8),
    vx: Math.cos(a) * speed,
    vy: Math.sin(a) * speed,
    rot: Math.random() * TAU,
    vr: (Math.random() - 0.5) * 1.2,
    frameTimer: 0,
  };
}

export default function SpaceDemo() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, raf = 0, t = 0, cooldown = 0, spawn = 0, speed = 0;
    let last = performance.now();
    const ship = { x: 0, y: 0, angle: -Math.PI / 2, frame: 0, frameTimer: 0 };
    const pointer = { x: 0, y: 0, active: false, down: false };
    let stars = [], bullets = [], rocks = [], sparks = [];

    // Load sprite images
    const imgShip = new Image();
    imgShip.src = "/assets/space/ships.png";
    const imgAsteroid = new Image();
    imgAsteroid.src = "/assets/space/asteroids.png";
    const imgBg = new Image();
    imgBg.src = "/assets/backgrounds/space_stars_far.png";
    const imgNebula = new Image();
    imgNebula.src = "/assets/backgrounds/space_nebula_purple.png";
    const imgStarsMid = new Image();
    imgStarsMid.src = "/assets/backgrounds/space_stars_mid.png";

    let imagesReady = 0;
    const totalImages = 5;
    const onLoad = () => { imagesReady++; };
    imgShip.onload = onLoad;
    imgAsteroid.onload = onLoad;
    imgBg.onload = onLoad;
    imgNebula.onload = onLoad;
    imgStarsMid.onload = onLoad;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round((w * h) / 6500) }, () => ({
        x: Math.random() * w, y: Math.random() * h, z: Math.random() * 0.8 + 0.2,
      }));
      if (!ship.x) { ship.x = w * 0.72; ship.y = h * 0.55; }
      if (reduce) { render(); }
    }

    function fire() {
      const a = ship.angle;
      bullets.push({
        x: ship.x + Math.cos(a) * 20, y: ship.y + Math.sin(a) * 20,
        vx: Math.cos(a) * 560, vy: Math.sin(a) * 560, life: 1.1,
      });
      if (bullets.length > 40) bullets.shift();
    }

    function burst(x, y) {
      for (let i = 0; i < 12; i++) {
        const a = Math.random() * TAU, s = 40 + Math.random() * 140;
        sparks.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.5 + Math.random() * 0.3 });
      }
    }

    function update(dt) {
      t += dt;
      let tx, ty;
      if (pointer.active) { tx = pointer.x; ty = pointer.y; }
      else {
        tx = w * 0.7 + Math.cos(t * 0.6) * w * 0.2;
        ty = h * 0.5 + Math.sin(t * 0.9) * h * 0.28;
      }
      const px = ship.x, py = ship.y;
      const k = Math.min(1, dt * 3);
      ship.x += (tx - ship.x) * k;
      ship.y += (ty - ship.y) * k;
      const vx = ship.x - px, vy = ship.y - py;
      speed = Math.hypot(vx, vy) / Math.max(dt, 0.001);
      if (Math.hypot(vx, vy) > 0.3) {
        let d = Math.atan2(vy, vx) - ship.angle;
        d = Math.atan2(Math.sin(d), Math.cos(d));
        ship.angle += d * Math.min(1, dt * 8);
      }

      // Ship thrust animation (col 1-4 = thrust frames)
      const isMoving = speed > 10;
      ship.frameTimer += dt;
      if (ship.frameTimer > 1 / 14) {
        ship.frameTimer = 0;
        if (isMoving) {
          ship.frame = ((ship.frame - 1 + 4) % 4) + 1; // frames 1-4
        } else {
          ship.frame = 0; // idle
        }
      }

      // Asteroid frame animation
      for (const r of rocks) {
        r.frameTimer += dt;
        if (r.frameTimer > 1 / 6) { r.frameTimer = 0; r.frame = (r.frame + 1) % 8; }
      }

      cooldown -= dt;
      const shooting = pointer.active ? pointer.down : Math.sin(t * 1.7) > 0.2;
      if (shooting && cooldown <= 0) { fire(); cooldown = 0.22; }

      spawn -= dt;
      if (spawn <= 0 && rocks.length < 7) { rocks.push(makeRock(w, h)); spawn = 1.4; }
      for (const r of rocks) { r.x += r.vx * dt; r.y += r.vy * dt; r.rot += r.vr * dt; }
      rocks = rocks.filter((r) => r.x > -80 && r.x < w + 80 && r.y > -80 && r.y < h + 80);

      for (const b of bullets) { b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt; }
      for (const b of bullets) {
        if (b.life <= 0) continue;
        for (const r of rocks) {
          if (Math.hypot(b.x - r.x, b.y - r.y) < r.r) {
            burst(r.x, r.y); r.dead = true; b.life = 0; break;
          }
        }
      }
      rocks = rocks.filter((r) => !r.dead);
      bullets = bullets.filter((b) => b.life > 0);

      for (const s of sparks) { s.x += s.vx * dt; s.y += s.vy * dt; s.life -= dt; }
      sparks = sparks.filter((s) => s.life > 0);

      for (const s of stars) {
        s.y += 8 * s.z * dt;
        if (s.y > h) { s.y = 0; s.x = Math.random() * w; }
      }
    }

    function drawBg() {
      if (imagesReady < totalImages) {
        // Fallback: plain dark bg
        ctx.fillStyle = "#070b1f";
        ctx.fillRect(0, 0, w, h);
        return;
      }
      // Tiled parallax background layers
      const bw = imgBg.naturalWidth || 512;
      const bh = imgBg.naturalHeight || 512;
      ctx.globalAlpha = 1;
      for (let x = 0; x < w; x += bw) for (let y = 0; y < h; y += bh) ctx.drawImage(imgBg, x, y);
      ctx.globalAlpha = 0.45;
      const nw = imgNebula.naturalWidth || 512;
      const nh = imgNebula.naturalHeight || 512;
      for (let x = 0; x < w; x += nw) for (let y = 0; y < h; y += nh) ctx.drawImage(imgNebula, x, y);
      ctx.globalAlpha = 0.7;
      const mw = imgStarsMid.naturalWidth || 512;
      const mh = imgStarsMid.naturalHeight || 512;
      for (let x = 0; x < w; x += mw) for (let y = 0; y < h; y += mh) ctx.drawImage(imgStarsMid, x, y);
      ctx.globalAlpha = 1;
    }

    function drawAsteroid(r) {
      if (imagesReady < totalImages) {
        // Fallback polygon
        ctx.save();
        ctx.translate(r.x, r.y); ctx.rotate(r.rot);
        ctx.strokeStyle = "#3a4a8f"; ctx.fillStyle = "#101838"; ctx.lineWidth = 1.5;
        ctx.beginPath();
        const n = 8;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * TAU, rr = r.r * (0.7 + 0.3 * Math.sin(i * 2.3));
          i === 0 ? ctx.moveTo(Math.cos(a) * rr, Math.sin(a) * rr) : ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
        }
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.restore();
        return;
      }
      // row = size*2 + variant, col = frame
      const row = r.size * 2 + r.variant;
      const sx = r.frame * ASTEROID.fw;
      const sy = row * ASTEROID.fh;
      const drawSize = r.r * 2.2;
      ctx.save();
      ctx.translate(r.x, r.y); ctx.rotate(r.rot);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(imgAsteroid, sx, sy, ASTEROID.fw, ASTEROID.fh, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
      ctx.restore();
    }

    function drawShip() {
      // Ship row 0 = fighter red, col 0=idle, col 1-4=thrust
      const sx = ship.frame * SHIP.fw;
      const sy = 0;
      const drawSize = 48;
      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(ship.angle + Math.PI / 2);
      ctx.imageSmoothingEnabled = false;

      if (imagesReady >= totalImages) {
        ctx.drawImage(imgShip, sx, sy, SHIP.fw, SHIP.fh, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
      } else {
        // Fallback vector ship
        const flame = 10 + Math.min(speed / 25, 14);
        ctx.fillStyle = "#ffb347";
        ctx.beginPath(); ctx.moveTo(-5, 10); ctx.lineTo(0, 10 + flame); ctx.lineTo(5, 10); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#eaf0ff";
        ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(13, 14); ctx.lineTo(0, 8); ctx.lineTo(-13, 14); ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    }

    function render() {
      ctx.clearRect(0, 0, w, h);
      drawBg();

      // Fallback stars (visible when bg images not loaded)
      if (imagesReady < totalImages) {
        ctx.fillStyle = "#eaf0ff";
        for (const s of stars) {
          ctx.globalAlpha = 0.25 + 0.65 * s.z;
          ctx.fillRect(s.x, s.y, s.z * 1.8, s.z * 1.8);
        }
        ctx.globalAlpha = 1;
      }

      for (const r of rocks) drawAsteroid(r);

      // Laser bullets (teal)
      ctx.strokeStyle = "#5ee1c6"; ctx.lineWidth = 3; ctx.lineCap = "round";
      for (const b of bullets) {
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x - b.vx * 0.025, b.y - b.vy * 0.025);
        ctx.stroke();
      }

      ctx.fillStyle = "#ffb347";
      for (const s of sparks) {
        ctx.globalAlpha = Math.max(0, s.life * 2);
        ctx.fillRect(s.x, s.y, 2.5, 2.5);
      }
      ctx.globalAlpha = 1;

      drawShip();
    }

    function frame(now) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      update(dt);
      render();
      raf = requestAnimationFrame(frame);
    }

    function setPointer(e) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left; pointer.y = e.clientY - rect.top; pointer.active = true;
    }
    const onMove = (e) => setPointer(e);
    const onDown = (e) => { if (e.target.closest("a, button")) return; setPointer(e); pointer.down = true; };
    const onUp = () => { pointer.down = false; };
    const onLeave = () => { pointer.down = false; pointer.active = false; };

    resize();
    window.addEventListener("resize", resize);

    if (!reduce) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerdown", onDown);
      host.addEventListener("pointerup", onUp);
      host.addEventListener("pointercancel", onLeave);
      host.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("pointerup", onUp);
      host.removeEventListener("pointercancel", onLeave);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
