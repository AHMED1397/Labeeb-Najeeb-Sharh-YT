"use client";

import { useEffect } from "react";

export function HtmlContent({
  html,
  scripts,
}: {
  html: string;
  scripts: string[];
}) {
  useEffect(() => {
    for (const code of scripts) {
      try {
        const el = document.createElement("script");
        el.textContent = code;
        document.body.appendChild(el);
        el.remove();
      } catch {}
    }
  }, [scripts]);

  return (
    <article
      className="lesson-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
