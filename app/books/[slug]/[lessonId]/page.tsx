import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookBySlug } from "@/lib/data";
import fs from "fs";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { slug, lessonId } = await params;
  const book = getBookBySlug(slug);

  if (!book) notFound();

  const lesson = book.lessons.find((l) => l.id === lessonId);
  if (!lesson) notFound();

  const currentIndex = book.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? book.lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < book.lessons.length - 1
      ? book.lessons[currentIndex + 1]
      : null;

  let htmlContent = "";
  try {
    const fullHtml = fs.readFileSync(lesson.filePath, "utf-8");
    // Extract <style> from <head> (preserves all the beautiful CSS)
    const styleMatch = fullHtml.match(/<style[^>]*>[\s\S]*?<\/style>/i);
    const styleTag = styleMatch ? styleMatch[0] : "";
    // Extract body inner content
    const bodyMatch = fullHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyContent = bodyMatch ? bodyMatch[1] : "";
    // Combine and clean
    htmlContent = styleTag + bodyContent;
    // Remove @font-face blocks (fonts come from Google Fonts in layout)
    htmlContent = htmlContent.replace(/@font-face\s*\{[^}]*\}/gi, "");
    // Fix font names to match Google Fonts
    htmlContent = htmlContent.replace(/['"]NotoNaskhArabic['"]/gi, "'Noto Naskh Arabic'");
    htmlContent = htmlContent.replace(/['"]Amiri-Bold['"]/gi, "'Amiri'");
  } catch {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
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
            {book.titleAr} — الدرس {lesson.number}
          </span>
        </div>
      </div>

      {/* Glowing Lecture Title */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#1a5632] via-[#1a5632] to-[#0e3a20]">
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(200,169,81,0.08) 20px, rgba(200,169,81,0.08) 21px), repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(200,169,81,0.08) 20px, rgba(200,169,81,0.08) 21px)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#c8a951]/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 py-10 text-center">
          <div className="inline-block">
            <h1 className="text-3xl md:text-5xl font-bold font-[Amiri] text-white animate-pulse-glow" style={{
              textShadow: '0 0 20px rgba(200,169,81,0.6), 0 0 40px rgba(200,169,81,0.3), 0 0 60px rgba(200,169,81,0.15)',
              animation: 'glow 3s ease-in-out infinite alternate',
            }}>
              الدرس {lesson.number}
            </h1>
            <div className="h-1 w-24 mx-auto mt-3 rounded-full bg-gradient-to-l from-[#c8a951] via-[#e0c97a] to-[#c8a951]" style={{
              boxShadow: '0 0 15px rgba(200,169,81,0.6)',
            }} />
            <p className="mt-4 text-lg md:text-2xl text-[#e0c97a] font-[Amiri] opacity-90 max-w-2xl mx-auto leading-relaxed">
              {lesson.title}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        <article
          className="lesson-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Navigation */}
        <div className="mt-8 pt-6 border-t-2 border-[#c8a951] flex items-center justify-between">
          {prevLesson ? (
            <Link
              href={`/books/${slug}/${prevLesson.id}`}
              className="flex items-center gap-2 text-[#1a5632] hover:text-[#2d7a4a] transition-colors group"
            >
              <svg className="w-5 h-5 transform rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="font-[Amiri]">
                الدرس {prevLesson.number}: {prevLesson.title.length > 40 ? prevLesson.title.slice(0, 40) + '…' : prevLesson.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              href={`/books/${slug}/${nextLesson.id}`}
              className="flex items-center gap-2 text-[#1a5632] hover:text-[#2d7a4a] transition-colors group"
            >
              <span className="font-[Amiri]">
                الدرس {nextLesson.number}: {nextLesson.title.length > 40 ? nextLesson.title.slice(0, 40) + '…' : nextLesson.title}
              </span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0e3a20] text-white text-center py-4 px-4">
        <p className="text-xs opacity-70 font-[Amiri]">
          {book.titleAr} — {book.lecturer}
        </p>
      </footer>
    </div>
  );
}
