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
      {/* Card container dengan shadow dan border yang lebih halus */}
      <div className="w-[600px] h-auto rounded-2xl shadow-lg bg-white border border-slate-200 transition-all duration-300 hover:shadow-xl">
        {/* Header dengan background gradient yang lebih profesional */}
        <div className="relative h-36 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl">
          {/* Rank badge */}
          <div className="absolute -bottom-8 left-8 z-10 h-16 w-16 flex items-center justify-center bg-blue-700 text-white font-bold text-2xl rounded-full border-4 border-white shadow-md">
            #{person.rank}
          </div>
        </div>

        {/* Player info section */}
        <div className="flex flex-col md:flex-row pt-8 px-8 pb-6">
          {/* Avatar with clean border */}
          <div className="flex-shrink-0 md:mr-6 mb-4 md:mb-0 self-center md:self-start">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden">
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

          {/* Player name and country */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-slate-800 mb-1">
              {person.jersey_name || person.name.split(" ").pop()}
            </h1>
            <p className="text-slate-500 text-lg mb-3">{person.name}</p>
            <div className="flex items-center mb-3">
              <span className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                {person.country}{" "}
                {getCountryCode(person.flag) ? (
                  <CircleFlag
                    countryCode={getCountryCode(person.flag)}
                    className="h-5 w-5 ml-1"
                  />
                ) : (
                  "🌍"
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Assists counter - Clean and modern */}
        <div className="px-8 py-5 bg-blue-50 border-t border-b border-blue-100">
          <div className="flex items-center justify-between">
            <p className="text-blue-800 font-semibold tracking-wide">TOTAL ASSISTS</p>
            <div className="flex items-center gap-2 bg-blue-600 rounded-lg px-4 py-2">
              <Football className="w-5 h-5 text-blue-200" />
              <span className="text-2xl text-white font-bold">{displayedAssists}</span>
            </div>
          </div>
        </div>

        {/* Player details in a clean grid */}
        <div className="grid grid-cols-2 gap-4 p-6">
          {/* Join Year */}
          <div className="flex items-center gap-3">
            <JoinYear className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Joined</p>
              <p className="font-medium text-slate-800">{person.joined_year || "N/A"}</p>
            </div>
          </div>

          {/* End Year */}
          <div className="flex items-center gap-3">
            <EndYear className="h-5 w-5 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Expires</p>
              <p className="font-medium text-slate-800">{person.end_year || "N/A"}</p>
            </div>
          </div>

          {/* Height */}
          <div className="flex items-center gap-3">
            <Ruler className="h-5 w-5 text-amber-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Height</p>
              <p className="font-medium text-slate-800">{person.height_cm ? `${person.height_cm} cm` : "N/A"}</p>
            </div>
          </div>

          {/* Birth Date */}
          <div className="flex items-center gap-3">
            <Birthday className="h-5 w-5 text-purple-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Date of birth</p>
              <p className="font-medium text-slate-800">{person.birth_date || "N/A"}</p>
            </div>
          </div>

          {/* Team - Full width */}
          <div className="col-span-2 flex items-center gap-3 pt-2 border-t border-slate-100">
            <Stadium className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Team</p>
              <p className="font-medium text-slate-800">{person.team || "N/A"}</p>
            </div>
          </div>

          {/* Position - Full width */}
          <div className="col-span-2 flex items-center gap-3">
            <Position className="h-5 w-5 text-indigo-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Position</p>
              <p className="font-medium text-slate-800">{person.position || "Midfielder"}</p>
            </div>
          </div>
        </div>

        {/* Footer dengan subtle branding */}
        <div className="px-6 py-3 text-center border-t border-slate-100 text-xs text-slate-400">
          DANGO BALL PLAYER CARD
        </div>
      </div>
    </div>
  );
};