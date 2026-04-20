import { useRef } from "react";

export default function TiltCard({ children }) {
  const ref = useRef();
  const activeRef = useRef(false);

  const handleMove = (e) => {
    if (!ref.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    if (!activeRef.current) {
      activeRef.current = true;
      ref.current.style.transitionDuration = "120ms";
    }

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * 5;
    const rotateY = (x / rect.width - 0.5) * -5;

    ref.current.style.transform = `
      perspective(900px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translate3d(0, -2px, 0)
      scale(1.008)
    `;
  };

  const reset = () => {
    if (!ref.current) return;
    activeRef.current = false;
    ref.current.style.transitionDuration = "220ms";
    ref.current.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      data-tilt="true"
      className="transition-transform duration-200 ease-out"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
