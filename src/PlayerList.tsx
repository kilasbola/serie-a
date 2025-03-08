import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  spring,
  delayRender,
  continueRender,
} from "remotion";
import React, { useMemo, useEffect, useState } from "react";
import { loadFont as loadRubik } from "@remotion/google-fonts/Rubik";
import rawTopPlayers from "../public/data/juventus_fc_players_goals.json";
import { TopPlayer, validateTopPlayers } from "./types/schema";
import { RichestCard } from "./components/PlayerCardv1";

const { fontFamily: rubikFont } = loadRubik();

// Intro text animation component
const IntroTitle: React.FC = () => {
  const frame = useCurrentFrame();

  const titleSlideUp = interpolate(frame, [0, 25], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleSlideUp = interpolate(frame, [15, 40], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: rubikFont,
        overflow: "hidden",
      }}
    >
      <div style={{ overflow: "hidden" }}>
        <h1
          style={{
            fontSize: "7rem",
            color: "#000000",
            textAlign: "center",
            margin: 0,
            transform: `translateY(${titleSlideUp}%)`,
            opacity: titleOpacity,
            fontWeight: "900",
            textShadow: "3px 3px 6px rgba(0,0,0,0.3)",
          }}
        >
          Juventus All-Time Top Scorers
        </h1>
      </div>

      <div style={{ overflow: "hidden", marginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "4rem",
            color: "#FFF",
            margin: 0,
            transform: `translateY(${subtitleSlideUp}%)`,
            opacity: subtitleOpacity,
            fontWeight: "800",
            textShadow: "3px 3px 6px rgba(0,0,0,0.2)",
          }}
        >
          A Legacy of Goals, A History of Greatness
        </h2>
      </div>
    </div>
  );
};

export const PlayerList: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [handle] = useState(() => delayRender());
  const [validatedData, setValidatedData] = useState<TopPlayer[]>([]);

  useEffect(() => {
    try {
      const data = validateTopPlayers(rawTopPlayers).reverse(); // Reverse the order here
      setValidatedData(data);
      continueRender(handle);
    } catch (error) {
      console.error("Data validation error:", error);
      continueRender(handle);
    }
  }, [handle]);

  // Animation timing constants (in frames)
  const introDelay = 120; // 2 detik untuk intro
  const totalDuration = fps * 170; // 30 detik total durasi (tidak termasuk intro)
  const cardsToShow = 30; // Jumlah card yang akan ditampilkan
  
  // Kalkulasi timing untuk animasi
  const initialDelay = 30; // 0.5 detik delay awal
  const cardEntryDuration = 30; // 0.5 detik per card untuk animasi masuk
  const staggerDelay = 100; // 0.25 detik antara card
  
  // Durasi total untuk animasi awal (4 card pertama)
  const mainCardsAnimationDuration = initialDelay + 4 * cardEntryDuration;
  
  // Durasi scroll disesuaikan agar total durasi tepat 30 detik
  const scrollDuration = totalDuration - mainCardsAnimationDuration;

  // Function to get static card position during initial animation
  const getStaticCardPosition = (index: number) => {
    const screenWidth = 2560; // Based on the composition width from Root.tsx
    const startPosition = screenWidth / 2 - 1300; // Posisi awal dari tengah
    return startPosition + index * 650; // 650 adalah lebar card + spacing
  };

  // Scroll position calculation
  const scrollX = interpolate(
    frame - mainCardsAnimationDuration,
    [0, scrollDuration],
    [0, -650 * (cardsToShow - 1)], // Sesuaikan dengan total jarak scroll yang diinginkan
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  return (
    <AbsoluteFill>
      <div className="grass">
        <Sequence from={0} durationInFrames={introDelay}>
          <IntroTitle />
        </Sequence>

        <Sequence from={introDelay} durationInFrames={totalDuration}>
          <div className="h-screen w-full">
            <div className="absolute w-full h-full flex items-center justify-center">
              <div
                className="flex gap-4"
                style={{
                  transform: `translateX(${scrollX}px)`,
                  transition: "transform 0.5s ease-out",
                }}
              >
                {validatedData.slice(0, cardsToShow).map((person: TopPlayer, index: number) => {
                  const isMainCard = index < 4;
                  const delay = isMainCard
                    ? initialDelay + index * cardEntryDuration
                    : mainCardsAnimationDuration + (index - 4) * staggerDelay;

                  const initialPosition = getStaticCardPosition(index);

                  const slideUpOffset =
                    index < 4
                      ? interpolate(frame - delay - introDelay, [0, 30], [200, 0], {
                          extrapolateLeft: "clamp",
                          extrapolateRight: "clamp",
                        })
                      : 0;

                  const bounceEffect = spring({
                    frame: frame - delay - introDelay,
                    from: 1,
                    to: 0,
                    fps,
                    config: {
                      damping: 12,
                      stiffness: 100,
                      mass: 0.5,
                    },
                  });

                  return (
                    <div
                      key={person.rank}
                      className="absolute"
                      style={{
                        left: initialPosition,
                        top: "50%",
                        opacity: interpolate(
                          frame - delay - introDelay,
                          [0, 20],
                          [0, 1],
                          {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                          },
                        ),
                        transform: `translateY(calc(-50% + ${slideUpOffset + bounceEffect * 20}px))`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <RichestCard person={person} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
