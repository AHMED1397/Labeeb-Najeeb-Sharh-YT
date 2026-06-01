"use client";

import { useEffect, useRef } from "react";

export function HtmlContent({
  html,
  scripts,
}: {
  html: string;
  scripts: string[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    for (const code of scripts) {
      try {
        const fn = new Function(code);
        fn();
      } catch {}
    }
  }, [scripts]);

  return (
    <article
      ref={ref}
      className="lesson-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
