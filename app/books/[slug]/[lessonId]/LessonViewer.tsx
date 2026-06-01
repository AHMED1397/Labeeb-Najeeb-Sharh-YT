"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

export function LessonViewer({
  src,
  slug,
  bookTitle,
  lessonNumber,
  lessonTitle,
  prevLesson,
  nextLesson,
}: {
  src: string;
  slug: string;
  bookTitle: string;
  lessonNumber: number;
  lessonTitle: string;
  prevLesson: { id: string; title: string } | null;
  nextLesson: { id: string; title: string } | null;
}) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const frameLoaded = useRef(false);

  const finish = useCallback(() => {
    frameLoaded.current = true;
    setProgress(100);
    setTimeout(() => setLoading(false), 400);
  }, []);

  useEffect(() => {
    setLoading(true);
    setProgress(0);
    frameLoaded.current = false;
  }, [src]);

  useEffect(() => {
    if (loading && !frameLoaded.current) {
      const duration = 2000;
      const interval = 30;
      let elapsed = 0;
      const timer = setInterval(() => {
        elapsed += interval;
        const p = Math.min(Math.round((elapsed / duration) * 95), 95);
        setProgress(p);
        if (p >= 95) clearInterval(timer);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [loading]);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Top Bar */}
      <div className="bg-[#1a5632] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href={`/books/${slug}`}
            className="text-[#c8a951] hover:text-white transition-colors text-sm flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            العودة إلى الدروس
          </Link>
          <span className="text-sm font-[Amiri] opacity-80">
            {bookTitle} — الدرس {lessonNumber}
          </span>
          <div className="flex items-center gap-2">
            {prevLesson && (
              <Link
                href={`/books/${slug}/${prevLesson.id}`}
                className="text-white/70 hover:text-white transition-colors text-sm"
                title={`الدرس السابق: ${prevLesson.title}`}
              >
                ←
              </Link>
            )}
            {nextLesson && (
              <Link
                href={`/books/${slug}/${nextLesson.id}`}
                className="text-white/70 hover:text-white transition-colors text-sm"
                title={`الدرس التالي: ${nextLesson.title}`}
              >
                →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 relative">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-[#0e3a20] via-[#1a5632] to-[#0e3a20] transition-opacity duration-500">
            {/* Decorative top pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(200,169,81,0.08) 20px, rgba(200,169,81,0.08) 21px), repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(200,169,81,0.08) 20px, rgba(200,169,81,0.08) 21px)',
              }}
            />

            {/* Top gold line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-transparent via-[#c8a951] to-transparent opacity-60" />

            <div className="relative z-10 flex flex-col items-center gap-8">
              {/* Logo */}
              <div className="w-20 h-20 rounded-full bg-[#1a5632] border-2 border-[#c8a951] flex items-center justify-center shadow-[0_0_30px_rgba(200,169,81,0.3)]">
                <span className="text-3xl">📚</span>
              </div>

              {/* Title */}
              <div className="text-center">
                <h2 className="text-2xl font-bold font-[Amiri] text-white mb-1">
                  خزانة الدروس الفقهية
                </h2>
                <p className="text-[#c8a951] font-[Amiri] text-sm opacity-80">
                  {lessonTitle}
                </p>
              </div>

              {/* Progress Ring */}
              <div className="relative w-28 h-28">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#0e3a20" strokeWidth="6" />
                  <circle
                    cx="60" cy="60" r="52"
                    fill="none" stroke="#c8a951" strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress / 100)}`}
                    style={{ transition: "stroke-dashoffset 0.3s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold font-[Amiri] text-white" style={{ direction: "ltr" }}>
                    {progress}%
                  </span>
                </div>
              </div>

              {/* Bottom gold line */}
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#c8a951] to-transparent opacity-40" />

              <p className="text-white/50 text-xs font-[Amiri]">
                جاري تحميل الدرس
              </p>
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={src}
          className="w-full border-0"
          style={{ height: "calc(100vh - 52px)", opacity: loading ? 0 : 1, transition: "opacity 0.4s ease" }}
          title={`${bookTitle} — الدرس ${lessonNumber}`}
          onLoad={finish}
        />
      </main>
    </div>
  );
}
