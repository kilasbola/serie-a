import { Composition } from "remotion";
import { PlayerList } from "./PlayerList";
import './index.css'; 

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PlayerListCard"
        component={PlayerList}
        durationInFrames={60*200} // 15.5 seconds (60fps * 15.5 seconds)
        fps={60}
        width={2560}
        height={1440}
        defaultProps={{
          url_logos: "",
        }}
      />
    </>
  );
};