import { notFound } from "next/navigation";
import { getBookBySlug } from "@/lib/data";
import { LessonViewer } from "./LessonViewer";

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
    <LessonViewer
      src={`/api/books/${slug}/${lessonId}`}
      slug={slug}
      bookTitle={book.titleAr}
      lessonNumber={lesson.number}
      lessonTitle={lesson.title}
      prevLesson={prevLesson ? { id: prevLesson.id, title: prevLesson.title } : null}
      nextLesson={nextLesson ? { id: nextLesson.id, title: nextLesson.title } : null}
    />
  );
}
