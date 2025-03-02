import { Composition } from "remotion";
import { RichestList } from "./RichestList";
import './index.css'; 

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RichestList"
        component={RichestList}
        durationInFrames={60*25} // 15.5 seconds (60fps * 15.5 seconds)
        fps={60}
        width={2560}
        height={1440}
      />
    </>
  );
};