
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
      {/* Card dengan desain modern dan profesional */}
      <div className="w-[600px] bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Header dengan gradien biru */}
        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-xl overflow-hidden">
          {/* Rank badge */}
          <div className="absolute -bottom-6 left-6 w-14 h-14 flex items-center justify-center bg-blue-700 text-white font-bold text-xl rounded-full border-4 border-white shadow-md">
            #{person.rank}
          </div>
          
          {/* Pola dekoratif di background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute right-0 top-0 w-64 h-64 -mr-20 -mt-20 rounded-full bg-blue-400"></div>
            <div className="absolute left-0 bottom-0 w-32 h-32 -ml-10 -mb-10 rounded-full bg-blue-500"></div>
          </div>
        </div>

        {/* Player info dengan spacing yang lebih baik */}
        <div className="pt-8 px-6 pb-4">
          <div className="flex items-start">
            {/* Avatar */}
            <div className="flex-shrink-0 mr-5">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
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

            {/* Player name dan info */}
            <div className="flex-grow">
              <h1 className="text-2xl font-bold text-gray-800">
                {person.jersey_name || person.name.split(" ").pop()}
              </h1>
              <p className="text-gray-500">{person.name}</p>
              <div className="flex items-center mt-2">
                <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                  {person.country}{" "}
                  {getCountryCode(person.flag) ? (
                    <CircleFlag
                      countryCode={getCountryCode(person.flag)}
                      height="16"
                      width="16"
                    />
                  ) : (
                    "🌍"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Assists counter dengan desain clean */}
        <div className="px-6 py-4 bg-blue-50 border-t border-b border-blue-100">
          <div className="flex items-center justify-between">
            <p className="text-blue-800 font-semibold">TOTAL ASSISTS</p>
            <div className="flex items-center gap-2 bg-blue-600 rounded-md px-3 py-2">
              <Football className="w-4 h-4 text-blue-200" />
              <span className="text-xl text-white font-bold">{displayedAssists}</span>
            </div>
          </div>
        </div>

        {/* Player details dengan grid layout yang lebih elegan */}
        <div className="grid grid-cols-2 gap-4 p-6">
          {/* Join Year */}
          <div className="flex items-center gap-2">
            <JoinYear className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Joined</p>
              <p className="font-medium">{person.joined_year || "N/A"}</p>
            </div>
          </div>

          {/* End Year */}
          <div className="flex items-center gap-2">
            <EndYear className="h-4 w-4 text-red-500" />
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Expires</p>
              <p className="font-medium">{person.end_year || "N/A"}</p>
            </div>
          </div>

          {/* Height */}
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-amber-500" />
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Height</p>
              <p className="font-medium">{person.height_cm ? `${person.height_cm} cm` : "N/A"}</p>
            </div>
          </div>

          {/* Birth Date */}
          <div className="flex items-center gap-2">
            <Birthday className="h-4 w-4 text-purple-500" />
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Birthday</p>
              <p className="font-medium">{person.birth_date || "N/A"}</p>
            </div>
          </div>

          {/* Team - Full width */}
          <div className="col-span-2 flex items-center gap-2 pt-2 border-t border-gray-100">
            <Stadium className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Team</p>
              <p className="font-medium">{person.team || "N/A"}</p>
            </div>
          </div>

          {/* Position - Full width */}
          <div className="col-span-2 flex items-center gap-2">
            <Position className="h-4 w-4 text-indigo-500" />
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Position</p>
              <p className="font-medium">{person.position || "Midfielder"}</p>
            </div>
          </div>
        </div>

        {/* Footer dengan subtle branding */}
        <div className="px-6 py-3 text-center border-t border-gray-100 text-xs text-gray-400 rounded-b-xl">
          DANGO BALL PLAYER CARD
        </div>
      </div>
    </div>
  );
};
