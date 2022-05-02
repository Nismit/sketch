import { IconQuestionMark, IconFileDownload } from "@tabler/icons";
import { useThree } from "./hooks/useThree";
import { useTimeline } from "./hooks/useTimeline";
import { useEventListener } from "./hooks/useEventListener";
import { useToggle } from "./hooks/useToggle";
import { RECORDING_STATUS } from "./hooks/const";
import { Timeline } from "./components/Timeline";
import { Modal } from "./components/Modal";
import { Help } from "./components/Help";
import { Download } from "./components/Download";

const SPACE_CODE = "Space";
const SLASH_CODE = "Slash";
const KEY_O = "KeyO";
const KEY_D = "KeyD";

export function App() {
  const {
    time,
    totalFrames,
    isRunning,
    recording,
    changeTime,
    changeFrames,
    setIsRunning,
    setRecording,
  } = useTimeline();

  const { toggle: helpModalToggle, changeToggle: helpModalChangeToggle } =
    useToggle();
  const {
    toggle: downloadModalToggle,
    changeToggle: downloadModalChangeToggle,
  } = useToggle();

  const keyHandler = (event: KeyboardEvent) => {
    if (event.code === SPACE_CODE) {
      setIsRunning(!isRunning);
    }

    if (event.code === SLASH_CODE || event.code === KEY_O) {
      helpModalChangeToggle(!helpModalToggle);
      downloadModalChangeToggle(false);
    }

    if (event.code === KEY_D) {
      downloadModalChangeToggle(!downloadModalToggle);
      helpModalChangeToggle(false);
    }
  };
  useEventListener("keydown", keyHandler);

  const [threeRef] = useThree({ time, recording });

  return (
    <>
      <div className="icon_container">
        <button
          className="circle_icon"
          title="Help"
          onClick={() => helpModalChangeToggle(true)}
        >
          <IconQuestionMark size={19} />
        </button>
        <button
          className="circle_icon"
          title="Download"
          onClick={() => downloadModalChangeToggle(true)}
        >
          <IconFileDownload size={19} />
        </button>
      </div>
      <div ref={threeRef} className="canvasContainer" />
      <Timeline
        time={time}
        totalFrames={totalFrames}
        changeTime={changeTime}
        changeFrames={changeFrames}
      />
      <Modal isActive={helpModalToggle} toggleModal={helpModalChangeToggle}>
        <Help />
      </Modal>

      <Modal
        isActive={downloadModalToggle}
        toggleModal={downloadModalChangeToggle}
        preventClose={recording === RECORDING_STATUS.RECORDING}
      >
        <Download
          recording={recording}
          setIsRunning={setIsRunning}
          setRecording={setRecording}
        />
      </Modal>
    </>
  );
}
