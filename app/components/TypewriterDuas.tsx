"use client";

import { useState, useEffect, useCallback } from "react";

const duas = [
  "رَبِّ زِدْنِي عِلْماً",
  "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
  "اللهمَّ انفَعْنا بما عَلَّمْتَنا وعَلِّمْنا ما ينفَعُنا",
  "سُبْحَانَكَ لَا عِلْمَ لَنَا إِلَّا مَا عَلَّمْتَنَا",
  "اللهمَّ عَلِّمْنَا مَا يَنْفَعُنَا وَانْفَعْنَا بِمَا عَلَّمْتَنَا",
  "يَا مُفَتِّحَ الْقُلُوبِ افْتَحْ لَنَا قُلُوبَنَا",
  "اللهمَّ اجْعَلْنَا مِنَ الْمُتَفَقِّهِينَ فِي الدِّينِ",
  "رَبَّنَا آتِنَا مِنْ لَدُنْكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَداً",
];

export default function TypewriterDuas() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const currentDua = duas[index];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < currentDua.length) {
          setText(currentDua.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setText(currentDua.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        } else {
          setDeleting(false);
          setIndex((i) => (i + 1) % duas.length);
        }
      }
    }, deleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, currentDua]);

  return (
    <div className="inline-flex items-center gap-1">
      <span className="text-[#c8a951] text-lg ml-2">﴿</span>
      <span className="text-white font-[Amiri] text-lg md:text-xl leading-relaxed min-h-[1.8em]" dir="rtl">
        {text}
        <span className="inline-block w-[2px] h-[1.1em] bg-[#c8a951] mr-0.5 animate-pulse align-middle" />
      </span>
      <span className="text-[#c8a951] text-lg mr-2">﴾</span>
    </div>
  );
}
