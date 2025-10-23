import { useRef, useEffect } from "react";

interface LetterGlitchProps {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  characters?: string;
  className?: string;
}

const LetterGlitch: React.FC<LetterGlitchProps> = ({
  glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
  className = "",
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<any[]>([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(Date.now());

  const lettersAndSymbols = Array.from(characters);
  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  const getRandomChar = () =>
    lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
  const getRandomColor = () =>
    glitchColors[Math.floor(Math.random() * glitchColors.length)];

  const hexToRgb = (hex: string) => {
    const shorthand = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthand, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const interpolateColor = (start: any, end: any, factor: number) => {
    const r = Math.round(start.r + (end.r - start.r) * factor);
    const g = Math.round(start.g + (end.g - start.g) * factor);
    const b = Math.round(start.b + (end.b - start.b) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows };
    const total = columns * rows;
    letters.current = Array.from({ length: total }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }));
  };

  const drawLetters = () => {
    const ctx = context.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = "top";
    letters.current.forEach((l, i) => {
      const x = (i % grid.current.columns) * charWidth;
      const y = Math.floor(i / grid.current.columns) * charHeight;
      ctx.fillStyle = l.color;
      ctx.fillText(l.char, x, y);
    });
  };

  const updateLetters = () => {
    const count = Math.max(1, Math.floor(letters.current.length * 0.05));
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * letters.current.length);
      const l = letters.current[idx];
      if (!l) continue;
      l.char = getRandomChar();
      l.targetColor = getRandomColor();
      if (!smooth) {
        l.color = l.targetColor;
        l.colorProgress = 1;
      } else l.colorProgress = 0;
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.current.forEach((l) => {
      if (l.colorProgress < 1) {
        l.colorProgress += 0.05;
        if (l.colorProgress > 1) l.colorProgress = 1;
        const s = hexToRgb(l.color);
        const e = hexToRgb(l.targetColor);
        if (s && e) {
          l.color = interpolateColor(s, e, l.colorProgress);
          needsRedraw = true;
        }
      }
    });
    if (needsRedraw) drawLetters();
  };

  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }
    if (smooth) handleSmoothTransitions();
    animationRef.current = requestAnimationFrame(animate);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.current = ctx;

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    drawLetters();
  };

  useEffect(() => {
    resizeCanvas();
    animate();

    const handleResize = () => {
      cancelAnimationFrame(animationRef.current!);
      resizeCanvas();
      animate();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener("resize", handleResize);
    };
  }, [glitchSpeed, smooth]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        overflow: "hidden",
      }}
      className={className}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
      {outerVignette && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)",
          }}
        />
      )}
      {centerVignette && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
          }}
        />
      )}
    </div>
  );
};

export default LetterGlitch;