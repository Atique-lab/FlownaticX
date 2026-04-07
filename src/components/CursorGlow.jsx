import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20 z-50"
      style={{
        transform: `translate(${position.x - 100}px, ${position.y - 100}px)`,
        background: "radial-gradient(circle, #7c3aed, transparent)",
      }}
    />
  );
}