import Link from "next/link";
import { getAllBooks } from "@/lib/data";
import TypewriterDuas from "./components/TypewriterDuas";

export default function Home() {
  const books = getAllBooks();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <header className="bg-[#1a5632] text-white text-center px-4 py-16 md:py-20 relative overflow-hidden" style={{backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(200,169,81,0.06) 20px, rgba(200,169,81,0.06) 21px), repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(200,169,81,0.06) 20px, rgba(200,169,81,0.06) 21px)'}}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a5632]/60 pointer-events-none" />
        <div className="relative z-10 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 bg-[#c8a951] rounded-full flex items-center justify-center text-4xl shadow-lg animate-float">
            📚
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[Amiri] mb-3 animate-fade-in-up" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
            خزانة الدروس الفقهية
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto font-[Amiri] animate-fade-in-up" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
            دروس شرح المتون الفقهية على مذهب الإمام الشافعي
          </p>
          <div className="w-16 h-1 bg-[#c8a951] mx-auto mt-6 rounded-full animate-fade-in-up" style={{animationDelay: '0.5s', animationFillMode: 'both'}} />
          <div className="mt-6 animate-fade-in-up" style={{animationDelay: '0.7s', animationFillMode: 'both'}}>
            <p className="text-lg md:text-2xl font-[Amiri] font-bold" style={{
              animation: 'glow-teacher 3s ease-in-out infinite',
            }}>
              تقديم د. لبيب نجيب عبدالله
            </p>
          </div>
          <div className="mt-8 animate-fade-in-up" style={{animationDelay: '1s', animationFillMode: 'both'}}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-5 inline-block border border-[#c8a951]/30 max-w-xl mx-auto">
              <TypewriterDuas />
            </div>
          </div>
        </div>
      </header>

      {/* Books Grid */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold font-[Amiri] text-[#1a5632] text-center mb-8">
          الكتب المتوفرة
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book, i) => (
            <Link
              key={book.id}
              href={`/books/${book.slug}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 border border-[#d4c9a8] hover:border-[#c8a951] hover:shadow-[0_0_25px_rgba(200,169,81,0.5),0_8px_30px_rgba(0,0,0,0.12)] transform hover:-translate-y-1 animate-fade-in-up"
              style={{animationDelay: `${0.2 + i * 0.1}s`, animationFillMode: 'both'}}
            >
              <div className="bg-gradient-to-br from-[#1a5632] to-[#2d7a4a] p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 15px, rgba(200,169,81,0.1) 15px, rgba(200,169,81,0.1) 16px), repeating-linear-gradient(-45deg, transparent, transparent 15px, rgba(200,169,81,0.1) 15px, rgba(200,169,81,0.1) 16px)'
                  }}
                />
                <div className="relative z-10">
                  <span className="text-6xl block mb-3 group-hover:scale-110 transition-transform duration-300">
                    {book.icon}
                  </span>
                  <h3 className="text-2xl font-bold font-[Amiri] text-white">
                    {book.titleAr}
                  </h3>
                  <p className="text-[#c8a951] font-[Amiri] mt-1">
                    {book.title}
                  </p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-[#4a4a5e] leading-relaxed mb-3">
                  {book.description}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#1a5632] font-semibold font-[Amiri]">
                    {book.lecturer}
                  </span>
                  <span className="bg-[#f5f0e6] text-[#1a5632] px-3 py-1 rounded-full text-xs font-bold">
                    {book.lessons.length} درس
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0e3a20] text-white text-center py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm opacity-80 font-[Amiri]">
            خزانة الدروس الفقهية — جميع الحقوق محفوظة
          </p>
          <div className="w-12 h-0.5 bg-[#c8a951] mx-auto my-3 rounded-full opacity-60" />
          <p className="text-xs opacity-60 font-[Amiri]">
            إعداد: أحمد بن إرشاد السيلاني
          </p>
          <p className="text-xs opacity-50 mt-2 font-[Amiri]">
            تقديم فضيلة الشيخ الدكتور لبيب نجيب عبدالله
          </p>
        </div>
      </footer>
    </div>
  );
}
