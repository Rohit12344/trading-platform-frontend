import { Dispatch, SetStateAction } from "react";
import { TimeFrame } from "../../types/index";
import { TimeFrames } from "@/constants";
import Button from "../Button";

function TimeFrameSelector({
  onSet,
  currentVal,
}: {
  onSet: Dispatch<SetStateAction<TimeFrame>>;
  currentVal: TimeFrame;
}) {
  return (
    <div className="my-4">
      {TimeFrames.map((timeframe) => (
        <Button
          isSelected={timeframe === currentVal}
          key={timeframe}
          onClick={() => onSet(timeframe)}
          content={timeframe}
        />
      ))}
    </div>
  );
}

export default TimeFrameSelector;
