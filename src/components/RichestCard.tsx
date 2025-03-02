import React, { useEffect, useState, useRef } from "react";
import { TopPlayer } from "../types/schema";
import { CircleFlag } from "react-circle-flags";
import {
  FaMapMarkerAlt as MapPin,
  FaFutbol as Football,
  FaBirthdayCake as Birthday,
} from "react-icons/fa";

import {
  FaCircleCheck as JoinYear,
  FaCircleXmark as EndYear,
  FaRulerVertical as Ruler,
} from "react-icons/fa6";

import { BsPSquareFill as Position } from "react-icons/bs";
import { MdStadium as Stadium } from "react-icons/md";
import { getAvailableFonts } from "@remotion/google-fonts";
import { getCountryCode } from "../utils/getCountryCode";

// Mendapatkan font Geist
const fonts = getAvailableFonts();
const geistFont = fonts.find((font) => font.fontFamily === "Geist");

export const RichestCard: React.FC<{
  person: TopPlayer;
  style?: React.CSSProperties;
}> = ({ person, style }) => {
  const [displayedAssists, setDisplayedAssists] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = person.assists || 0;

          if (end === 0) {
            setDisplayedAssists(0);
            return;
          }

          const duration = 1500;
          const incrementTime = Math.floor(duration / end);
          const timer = setInterval(() => {
            if (start < end) {
              setDisplayedAssists((prev) => prev + 1);
              start++;
            } else {
              clearInterval(timer);
            }
          }, incrementTime);

          observer.unobserve(entry.target);

          return () => clearInterval(timer);
        }
      });
    });

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [person.assists]);

  return (
    <div
      ref={cardRef}
      className="flex justify-center items-center p-0"
      style={{
        ...style,
        height: "100%",
        fontFamily: geistFont?.fontFamily || "sans-serif",
      }}
    >
      {/*
       * PENTING: Ubah class di bawah ini untuk menyesuaikan kartu
       * 1. Ubah w-[600px] jika perlu mengubah lebar kartu
       * 2. Ubah h-auto menjadi h-[650px] untuk ukuran tetap
       * 3. Kurangi max-h-[750px] menjadi nilai yang lebih kecil (misal max-h-[650px]) jika kartu terlalu tinggi
       * 4. Pastikan overflow-visible (jangan diubah menjadi overflow-auto atau overflow-scroll)
       */}
      <div className="w-[600px] h-[1300px] max-h-[1500px] overflow-visible rounded-xl shadow-2xl bg-white backdrop-blur-sm border border-gray-200 transform transition-all duration-300">
        {/* Header - Gradient Background with Rank */}
        <div className="relative">
          <div className="absolute top-5 left-5 z-10 bg-black text-white font-bold text-3xl rounded-full h-20 w-20 flex items-center justify-center border-4 border-stone-50 shadow-xl">
            #{person.rank}
          </div>
          <div className="h-40 bg-black rounded-t-xl"></div>

          {/* Avatar - Overlapping Position */}
          <div className="flex justify-center -mt-24">
            <div className="w-90 h-90 rounded-full border-8 border-white shadow-xl overflow-hidden">
              <img
                src={`https://i.pravatar.cc/400?img=${(person.rank % 70) + 1}`}
                alt={person.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(person.name) +
                    "&background=random&size=256";
                }}
              />
            </div>
          </div>
        </div>

        {/*
         * Name Section
         * PENTING:
         * 1. Kurangi margin dan padding jika perlu menghemat ruang vertikal
         * 2. Kurangi ukuran font jika terlalu besar (text-3xl menjadi text-2xl)
         */}
        <div className="px-4 pt-3 pb-2 text-center">
          <h1 className="text-5xl font-bold text-gray-800 tracking-tight leading-tight mb-1">
            {person.jersey_name || person.name.split(" ").pop()}
          </h1>
          <p className="text-gray-500 text-3xl mb-1 italic">{person.name}</p>
          <div className="flex justify-center my-1">
            <span className="bg-stone-950 text-stone-50 text-3xl font-semibold px-6 py-3 my-6 rounded-full flex items-center gap-1">
              {person.country}{" "}
              {getCountryCode(person.flag) ? (
                <CircleFlag
                  countryCode={getCountryCode(person.flag)}
                  className="h-12 w-12 py-1 border-4 border-stone-50 rounded-full"
                />
              ) : (
                "🌍" // Fallback jika flag tidak valid
              )}
            </span>
          </div>
        </div>

        {/*
         * Assists Info
         * PENTING: Kurangi padding (py-5 menjadi py-3) untuk menghemat ruang vertikal
         */}
        <div className="px-6 py-6 bg-sky-950 text-white text-center">
          <p className="text-3xl uppercase font-semibold tracking-wider opacity-90 mb-3">
            Total Assists
          </p>
          <div className="flex items-center justify-center gap-2 bg-stone-950 rounded-full p-2">
            <Football className="w-12 h-12 text-stone-50" />
            <span className="text-5xl text-stone-50 font-extrabold">
              {displayedAssists}
            </span>
          </div>
        </div>

        {/*
         * Details Grid - Compact
         * PENTING:
         * 1. Kurangi padding (p-5 menjadi p-3) untuk menghemat ruang vertikal
         * 2. Kurangi gap (gap-3 menjadi gap-2) jika perlu
         */}
        <div className="grid grid-cols-2 gap-2 p-3 backdrop-blur-sm">
          <div className="flex items-center text-left gap-3 p-3 rounded-lg bg-white shadow-sm border border-gray-600">
            <JoinYear className="h-10 w-10 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-1xl text-gray-500 uppercase tracking-wide font-semibold">
                Joined:
              </p>
              <p className="font-bold text-gray-800 text-3xl">
                {person.joined_year || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center text-left gap-3 p-3 rounded-lg bg-white shadow-sm border border-gray-600">
            <EndYear className="h-10 w-10 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-1xl text-gray-500 uppercase tracking-wide font-semibold">
                Expires:
              </p>
              <p className="font-bold text-gray-800 text-3xl">
                {person.end_year || "N/A"}
              </p>
            </div>
          </div>

          {/* batas */}

          <div className="flex items-center text-left gap-3 p-3 rounded-lg bg-white shadow-sm border border-gray-600">
            <Ruler className="h-10 w-10 text-amber-500 flex-shrink-0 font-bold" />
            <div>
              <p className="text-1xl text-gray-500 uppercase tracking-wide font-semibold">
                Height
              </p>
              <p className="font-bold text-gray-800 text-3xl">
                {person.height_cm ? `${person.height_cm} cm` : "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm border border-gray-600">
            <Birthday className="h-10 w-10 text-fuchsia-500 flex-shrink-0" />
            <div>
              <p className="text-1xl text-gray-500 uppercase tracking-wide font-semibold">
                Date of birth
              </p>
              <p className="font-bold text-gray-800 text-3xl">
                {person.birth_date || "N/A"}
              </p>
            </div>
          </div>

          {/* batas */}

          <div className="col-span-2 flex text-left items-center gap-3 p-3 rounded-lg bg-white shadow-sm border border-gray-600">
            <Stadium className="h-10 w-10 text-rose-500 flex-shrink-0 font-bold" />
            <div className="w-full">
              <p className="text-1xl text-gray-500 uppercase tracking-wide font-semibold">
                Team
              </p>
              <p className="font-bold text-gray-800 text-3xl">
                {person.team || "N/A"}
              </p>
            </div>
          </div>

          {/* batas */}

          <div className="col-span-2 flex items-center text-left gap-3 p-3 rounded-lg bg-white shadow-sm border border-gray-600">
            <Position className="h-10 w-10 text-pink-500 flex-shrink-0" />
            <div className="w-full">
              <p className="text-1xl text-gray-500 uppercase tracking-wide font-semibold">
                Position
              </p>
              <p className="font-bold text-gray-800 text-3xl">
                {person.position || "Midfielder"}
              </p>
            </div>
          </div>
        </div>

        {/*
         * Footer
         * PENTING: Kurangi padding (py-3 menjadi py-2) untuk menghemat ruang vertikal
         * Anda juga bisa menghapus footer sepenuhnya jika diperlukan ruang lebih
         */}
        {/* <div className="px-10 py-3 rounded-b-xl border-t border-gray-200 bg-slate-600 flex justify-between items-center mt-auto">
          <div className="text-3xl text-white font-bold">
            DANGO BALL
          </div>
          <div className="flex space-x-2">
            <span className="w-6 h-6 rounded-full bg-pink-200"></span>
            <span className="w-6 h-6 rounded-full bg-stone-50"></span>
            <span className="w-6 h-6 rounded-full bg-green-200"></span>
          </div>
        </div> */}

        {/* Contoh penggunaan class centering */}
        {/* <div className="container">
          <div className="center">
            Centered content
          </div>
        </div> */}
      </div>
    </div>
  );
};
