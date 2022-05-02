export const RECORDING_STATUS = {
  INITIAL: "initial",
  RECORDING: "recording",
  RECORDED: "recorded",
} as const;

export type RECORDING = typeof RECORDING_STATUS[keyof typeof RECORDING_STATUS];
