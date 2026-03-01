import { useState, useEffect } from "react";

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId;
    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Smoothly interpolate position (lerp)
      const easing = 0.08; // Lower = smoother but slower

      // Calculate the distance to move
      currentX += (targetX - currentX) * easing;
      currentY += (targetY - currentY) * easing;

      // Update position state with rounded values
      setPosition({
        x: Math.round(currentX * 100) / 100,
        y: Math.round(currentY * 100) / 100,
      });

      // Continue animation loop
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate(); // Start the animation loop

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="hidden fixed md:flex justify-center items-center rounded-full bg-secondary transition-transform duration-150 ease-out z-50 w-4 h-4"
      style={{
        left: `${position.x + 10}px`,
        top: `${position.y + 10}px`,
        transform: "translate(-50%, -50%)",
      }}
    ></div>
  );
};

export default MouseFollower;
