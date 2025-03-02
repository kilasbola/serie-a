import { interpolate, useCurrentFrame, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/LeagueSpartan";

const { fontFamily } = loadFont();

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({
    frame,
    fps: 60,
    from: 0.5,
    to: 1,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    },
  });

  const slideUp = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
      }}
    >
      <div
        style={{
          opacity,
          transform: `scale(${scale}) translateY(${slideUp}px)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "7rem",
            fontWeight: 800,
            color: "#000000",
            marginBottom: "1rem",
            textShadow: "4px 4px 8px rgba(0,0,0,0.3)",
            letterSpacing: "-2px",
          }}
        >
          World's{" "}
          <span style={{ color: "#cc0000" }}>
            Richest
          </span>
        </h1>
        <p
          style={{
            fontSize: "4rem",
            color: "#000000",
            opacity: interpolate(frame, [15, 45], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontWeight: 700,
            letterSpacing: "-1px",
            textShadow: "3px 3px 6px rgba(0,0,0,0.2)",
          }}
        >
          <span style={{ color: "#cc0000" }}>Billionaires</span> of 2024
        </p>
      </div>
    </div>
  );
}; 