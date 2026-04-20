import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef(null);
  const frameRef = useRef(0);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return undefined;

    const render = () => {
      frameRef.current = 0;

      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.14;
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.14;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
      }

      const dx = Math.abs(targetRef.current.x - positionRef.current.x);
      const dy = Math.abs(targetRef.current.y - positionRef.current.y);

      if (dx > 0.5 || dy > 0.5) {
        frameRef.current = window.requestAnimationFrame(render);
      }
    };

    const move = (e) => {
      targetRef.current = { x: e.clientX - 96, y: e.clientY - 96 };

      if (frameRef.current) return;

      frameRef.current = window.requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-40 hidden h-48 w-48 rounded-full opacity-10 blur-2xl md:block"
      style={{ background: "radial-gradient(circle, rgba(56,189,248,0.45), rgba(124,58,237,0.16) 48%, transparent 72%)" }}
    />
  );
}
