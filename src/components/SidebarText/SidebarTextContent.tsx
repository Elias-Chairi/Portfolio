import React, { useEffect, useState, useRef, type FC } from "react";

export interface Props {
  text: string;
  spacing?: number;
}

const SidebarText: FC<Props> = ({ text, spacing = 0 }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [spanKeys, setSpanKeys] = useState<number[]>([0]);

  useEffect(() => {
    if (!containerRef.current) throw new Error("Ref is not set");
    const firstText = containerRef.current
      .firstElementChild as HTMLSpanElement | null;
    if (!firstText) throw new Error("Container has no child");

    const animationTime = 20;
    const animationDistance =
      containerRef.current.offsetHeight + firstText.offsetWidth;
    const animationSpeed = animationDistance / animationTime;

    const distanceToFullySeeText = firstText.offsetWidth + spacing;
    const timeToFullySeeText = distanceToFullySeeText / animationSpeed;

    const totalSpans =
      Math.ceil(containerRef.current.offsetHeight / animationDistance) + 1;

    const interval = setInterval(() => {
      setSpanKeys((prev) => {
        const spanKeys = [...prev];
        if (spanKeys.length === totalSpans) {
          spanKeys.shift();
        }
        spanKeys.push(spanKeys[spanKeys.length - 1] + 1);
        return spanKeys;
      });
    }, timeToFullySeeText * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="block h-full relative" ref={containerRef}>
      {spanKeys.map((key) => (
        <span
          className="text-8xl py-4 tracking-wider whitespace-nowrap -rotate-90 origin-top-left absolute animate-topToBottom"
          key={key}
        >
          {text}
        </span>
      ))}
    </span>
  );
};

export default SidebarText;
