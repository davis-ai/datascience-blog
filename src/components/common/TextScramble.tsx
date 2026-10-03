import { useState, useEffect, useRef, useCallback } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  scrambleOnHover?: boolean;
  triggerKey?: any;
  speed?: number;
  chars?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}

const DEFAULT_CHARS = "01_/~!@#$%^&*+-={}:<>[]ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function TextScramble({
  text,
  className = "",
  scrambleOnHover = true,
  triggerKey,
  speed = 28,
  chars = DEFAULT_CHARS,
  as: Component = "span",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);

  const scramble = useCallback(() => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        isScramblingRef.current = false;
      }

      iteration += 1 / 2;
    }, speed);
  }, [text, chars, speed]);

  useEffect(() => {
    scramble();
  }, [triggerKey, scramble]);

  return (
    <Component
      className={className}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
    >
      {displayText}
    </Component>
  );
}
