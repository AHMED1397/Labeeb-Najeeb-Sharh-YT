import fs from 'fs'
import path from 'path'
import { youtubeLinks } from './youtube'

export interface Lesson {
  id: string
  number: number
  title: string
  filePath: string
  youtubeUrl?: string
}

export interface Book {
  id: string
  slug: string
  title: string
  titleAr: string
  author: string
  lecturer: string
  description: string
  icon: string
  lessons: Lesson[]
}

const booksDir = path.resolve(process.cwd(), 'Books')

interface BookMeta {
  dir: string
  slug: string
  title: string
  titleAr: string
  author: string
  lecturer: string
  description: string
  icon: string
  filePattern: RegExp
  subtitleClass: string
}

const bookRegistry: BookMeta[] = [
  {
    dir: 'Fathul-Muin',
    slug: 'fath-al-muin',
    title: 'Fath al-Muin',
    titleAr: 'فتح المعين',
    author: 'Zayn al-Din al-Malibari',
    lecturer: 'د. لبيب نجيب عبدالله',
    description: 'شرح فتح المعين للعلامة الفقيه المليباري — دورة فقهية شاملة على مذهب الإمام الشافعي',
    icon: '📖',
    filePattern: /fath_al_muin_lecture(\d+)\.html$/,
    subtitleClass: 'subtitle',
  },
  {
    dir: 'Al_Ibana',
    slug: 'al-ibana',
    title: 'al-Ibana wa al-Ifada',
    titleAr: 'الإبانة والإفاضة',
    author: 'Zayn al-Din al-Malibari',
    lecturer: 'د. لبيب نجيب عبدالله',
    description: 'شرح الإبانة والإفاضة — دروس فقهية على مذهب الإمام الشافعي',
    icon: '📗',
    filePattern: /al_ibana_lecture(\d+)\.html$/,
    subtitleClass: 'cover-subtitle',
  },
]

function getLessonNumber(filename: string, pattern: RegExp): number | null {
  const match = filename.match(pattern)
  return match ? parseInt(match[1], 10) : null
}

function getLessonTitle(filePath: string, number: number, subtitleClass: string): string {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const regex = new RegExp(`<div class="${subtitleClass}">([^<]+)<\\/div>`)
    const subtitleMatch = content.match(regex)
    if (subtitleMatch) return subtitleMatch[1].trim()
  } catch {}
  return `الدرس ${number}`
}

function loadBook(meta: BookMeta): Book {
  const dirPath = path.join(booksDir, meta.dir)
  const files = fs.readdirSync(dirPath)
  const lessons: Lesson[] = []
  const yt = youtubeLinks[meta.slug] || []

  for (const file of files) {
    const num = getLessonNumber(file, meta.filePattern)
    if (num !== null) {
      const filePath = path.join(dirPath, file)
      lessons.push({
        id: `lesson-${num}`,
        number: num,
        title: getLessonTitle(filePath, num, meta.subtitleClass),
        filePath,
        youtubeUrl: yt[num - 1] || undefined,
      })
    }
  }

  lessons.sort((a, b) => a.number - b.number)

  return {
    id: meta.slug,
    slug: meta.slug,
    title: meta.title,
    titleAr: meta.titleAr,
    author: meta.author,
    lecturer: meta.lecturer,
    description: meta.description,
    icon: meta.icon,
    lessons,
  }
}

export function getAllBooks(): Book[] {
  return bookRegistry.map(loadBook)
}

export function getBookBySlug(slug: string): Book | undefined {
  return getAllBooks().find((b) => b.slug === slug)
}
