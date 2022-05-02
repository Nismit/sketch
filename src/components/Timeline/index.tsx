type Props = {
  time: number;
  totalFrames: number;
  changeTime: (e: Event) => void;
  changeFrames: (e: Event) => void;
};

export const Timeline = ({
  time,
  totalFrames,
  changeTime,
  changeFrames,
}: Props) => {
  return (
    <div className="timeline">
      <div>
        <input
          type="range"
          min={0}
          max={totalFrames}
          step={1}
          value={time}
          onChange={changeTime}
          class="timeline__slider"
          name="timeRange"
        />
        {/* <input
          class="currentTime"
          type="text"
          inputMode="numeric"
          pattern="\d*"
          value={time}
          style={{ right: `${100 - (time / totalFrames) * 100}%` }}
        /> */}
      </div>
      <div class="bottom">
        <input type="number" value={totalFrames} onChange={changeFrames} />
      </div>
    </div>
  );
};
