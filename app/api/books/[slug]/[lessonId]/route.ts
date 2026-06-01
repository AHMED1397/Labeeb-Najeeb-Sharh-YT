import { NextResponse } from "next/server";
import fs from "fs";
import { getBookBySlug } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string; lessonId: string }> }
) {
  const { slug, lessonId } = await params;
  const book = getBookBySlug(slug);
  if (!book) return new NextResponse("Book not found", { status: 404 });

  const lesson = book.lessons.find((l) => l.id === lessonId);
  if (!lesson) return new NextResponse("Lesson not found", { status: 404 });

  let html = fs.readFileSync(lesson.filePath, "utf-8");

  // Add Google Fonts link into <head>
  html = html.replace(
    "</head>",
    `<link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>`
  );

  // Remove @font-face blocks with local paths (Google Fonts handles them)
  html = html.replace(/@font-face\s*\{[^}]*\}/gi, "");

  // Fix font names to match Google Fonts
  html = html.replace(/['"]NotoNaskhArabic['"]/gi, "'Noto Naskh Arabic'");
  html = html.replace(/['"]Amiri-Bold['"]/gi, "'Amiri'");

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
