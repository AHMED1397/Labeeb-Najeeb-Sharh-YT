import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookBySlug } from "@/lib/data";

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

      {/* Raw HTML as iframe */}
      <main className="flex-1">
        <iframe
          src={`/api/books/${slug}/${lessonId}`}
          className="w-full border-0"
          style={{ height: "calc(100vh - 52px)" }}
          title={`${book.titleAr} — الدرس ${lesson.number}`}
        />
      </main>
    </div>
  );
}
