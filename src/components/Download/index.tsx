import { RECORDING_STATUS, RECORDING } from "../../hooks/const";

type Props = {
  recording: RECORDING;
  setIsRunning: (value: boolean) => void;
  setRecording: (value: RECORDING) => void;
};

export const Download = ({ recording, setIsRunning, setRecording }: Props) => {
  return (
    <div>
      <h2>Download</h2>
      <div>
        <input type="radio" name="fileType" id="gif" value="gif" checked />
        <label for="gif">Gif</label>
      </div>
      <div>
        <input type="radio" name="fileType" id="webm" value="webm" />
        <label for="webm">WebM</label>
      </div>
      <div>
        <input type="radio" name="fileType" id="jpg" value="jpg" />
        <label for="jpg">JPEG</label>
      </div>
      <div>
        <input type="radio" name="fileType" id="png" value="png" />
        <label for="png">PNG</label>
      </div>
      <div>
        <label for="frame">Frame</label>
        <input type="number" id="frame" value="120" />
      </div>
      <div>
        <p>Recodring: {recording}</p>
        <button
          onClick={() => {
            setIsRunning(false);
            setRecording(RECORDING_STATUS.RECORDING);
          }}
        >
          rec state
        </button>
      </div>
    </div>
  );
};
