import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookBySlug } from "@/lib/data";

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Book Header */}
      <header className="bg-[#1a5632] text-white px-4 py-12 relative overflow-hidden"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(200,169,81,0.06) 20px, rgba(200,169,81,0.06) 21px), repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(200,169,81,0.06) 20px, rgba(200,169,81,0.06) 21px)',
          borderBottom: '4px solid #c8a951',
        }}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Link href="/" className="inline-block text-[#c8a951] hover:text-white transition-colors mb-4 text-sm">
            ← العودة إلى الرئيسية
          </Link>
          <span className="text-6xl block mb-4 animate-float">{book.icon}</span>
          <h1 className="text-4xl md:text-5xl font-bold font-[Amiri] mb-2 animate-fade-in-up">
            {book.titleAr}
          </h1>
          <p className="text-xl text-[#c8a951] font-[Amiri] mb-2">
            {book.title}
          </p>
          <div className="mt-4 animate-fade-in" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
            <p className="text-lg md:text-2xl font-bold font-[Amiri]" style={{
              animation: 'glow-teacher 3s ease-in-out infinite',
            }}>
              {book.lecturer}
            </p>
          </div>
          <div className="mt-4 inline-block bg-[#c8a951] text-[#1a5632] px-4 py-1 rounded-full text-sm font-bold">
            {book.lessons.length} درس
          </div>
        </div>
      </header>

      {/* Lessons List */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold font-[Amiri] text-[#1a5632] mb-6 text-center border-b-2 border-[#c8a951] pb-3">
          فهرس الدروس
        </h2>

         <div className="space-y-2">
          {book.lessons.map((lesson, i) => (
            <div
              key={lesson.id}
              className="flex items-center gap-4 p-4 bg-white rounded-lg border border-[#d4c9a8] hover:border-[#c8a951] hover:shadow-md transition-all duration-300 animate-fade-in-up"
              style={{animationDelay: `${0.1 + i * 0.03}s`, animationFillMode: 'both'}}
            >
              <Link
                href={`/books/${book.slug}/${lesson.id}`}
                className="flex items-center gap-4 flex-1 min-w-0 group"
              >
                <span className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#1a5632] to-[#2d7a4a] text-white rounded-full flex items-center justify-center font-bold font-[Amiri] text-lg shadow-md group-hover:shadow-[0_0_15px_rgba(200,169,81,0.5)] transition-all duration-300">
                  {lesson.number}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-[Amiri] font-bold text-[#1a5632] text-lg group-hover:text-[#2d7a4a] transition-colors">
                    الدرس {lesson.number}
                  </h3>
                  <p className="text-sm text-[#4a4a5e] truncate">
                    {lesson.title}
                  </p>
                </div>
                <svg className="w-5 h-5 text-[#c8a951] flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              {lesson.youtubeUrl && (
                <a
                  href={lesson.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-[#c8a951] hover:text-red-600 transition-colors"
                  title="شاهد على يوتيوب"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0e3a20] text-white text-center py-6 px-4">
        <p className="text-sm opacity-80 font-[Amiri]">
          خزانة الدروس الفقهية — جميع الحقوق محفوظة
        </p>
        <p className="text-xs opacity-60 mt-1 font-[Amiri]">
          إعداد: أحمد بن إرشاد السيلاني
        </p>
      </footer>
    </div>
  );
}
