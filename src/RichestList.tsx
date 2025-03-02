import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  spring,
} from "remotion";
import React, { useMemo } from "react";
import { loadFont as loadRubik } from "@remotion/google-fonts/Rubik";
import rawTopPlayers from "../public/data/example-player-50.json";
import { TopPlayer, validateTopPlayers } from "./types/schema";
import { RichestCard } from "./components/RichestCard";

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
            textShadow: "4px 4px 8px rgba(0,0,0,0.3)",
          }}
        >
          World's <span style={{ color: "#cc0000" }}>Football</span>
        </h1>
      </div>

      <div style={{ overflow: "hidden", marginTop: "1rem" }}>
        <h2
          style={{
            fontSize: "4rem",
            color: "#000000",
            margin: 0,
            transform: `translateY(${subtitleSlideUp}%)`,
            opacity: subtitleOpacity,
            fontWeight: "900",
            textShadow: "3px 3px 6px rgba(0,0,0,0.2)",
          }}
        >
          <span style={{ color: "#cc0000" }}>Top Assists</span> of 2024
        </h2>
      </div>
    </div>
  );
};

export const RichestList: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const validatedData = useMemo(() => {
    try {
      return validateTopPlayers(rawTopPlayers);
    } catch (error) {
      console.error("Data validation error:", error);
      return [];
    }
  }, []);

  // Animation timing constants (in frames)
  const introDelay = 90; // 1.5 seconds for intro
  const initialDelay = 30; // 0.5 second delay
  const cardEntryDuration = 30; // 0.5 seconds per card
  const scrollDuration = fps * 120; // 10 seconds scroll
  const staggerDelay = 15; // 0.25 second between cards
  const mainCardsAnimationDuration = initialDelay + 4 * cardEntryDuration; // ~3 seconds total for initial animation

  // Card configuration
  const cardWidth = 600; // Fixed card width (to match RichestCard width)
  const cardSpacing = 50; // Spacing between cards
  const totalWidth = validatedData.length * (cardWidth + cardSpacing);

  // Function to get static card position during initial animation
  const getStaticCardPosition = (index: number) => {
    // Calculate center position of the screen and adjust to display multiple cards
    const screenWidth = 2560; // Based on the composition width from Root.tsx
    const cardsToShow = 4; // Number of cards to show at once
    const totalWidthToShow =
      cardsToShow * cardWidth + (cardsToShow - 1) * cardSpacing;
    const startPosition = (screenWidth - totalWidthToShow) / 2;

    // Position cards relative to the center
    return startPosition + index * (cardWidth + cardSpacing);
  };

  // Function to get initial position for scrolling cards
  const getScrollingCardPosition = (index: number) => {
    const card4Position = getStaticCardPosition(3);
    return card4Position + (index - 3) * (cardWidth + cardSpacing);
  };

  // Calculate scroll position
  const scrollX = interpolate(
    frame - mainCardsAnimationDuration,
    [0, scrollDuration],
    [0, validatedData.length > 4 ? -(totalWidth - 1920 + cardWidth) : 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#f5f5f5",
        // backgroundImage: `url('https://cdn.architextures.org/textures/21/07/artificial-grass-60e5ca89f4069-1200.jpg')`,
        backgroundSize: "600px",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >

      <Sequence from={0} durationInFrames={introDelay}>
          <IntroTitle />
      </Sequence>


      <div className="relative size-92"> {/* .container */}
        <div className="absolute top-1/2 w-full text-center text-lg flex justify-center items-center" style={{ height: "100%" }}> {/* .center */}

        <Sequence from={introDelay}>
          <div style={{ width: "100%", height: "100%" }}>
            <div
              className="flex gap-4"
              style={{
                transform: `translateX(${scrollX}px)`,
                transition: "transform 0.5s ease-out",
              }}
            >
              {validatedData.slice(0, 10).map((person: TopPlayer, index: number) => {
                const isMainCard = index < 4;
                const delay = isMainCard
                  ? initialDelay + index * cardEntryDuration
                  : mainCardsAnimationDuration + (index - 4) * staggerDelay;

                const initialPosition = isMainCard
                  ? getStaticCardPosition(index)
                  : getScrollingCardPosition(index);

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
                      transform: `translateY(calc(-25% + ${slideUpOffset + bounceEffect * 20}px))`,
                      height: "0vh", // Menggunakan minHeight untuk memastikan tampilan tetap
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 0 20px 0", // Menambahkan margin bawah untuk jarak
                    }}
                  >
                    <RichestCard person={person} />
                  </div>
                );
              })}
            </div>
          </div>
        </Sequence>
        </div>
      </div>

      
    </AbsoluteFill>
  );
};
