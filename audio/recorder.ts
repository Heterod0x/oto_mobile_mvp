import AudioRecorderPlayer, { type RecordBackType } from 'react-native-audio-recorder-player';

export const arp = AudioRecorderPlayer;

export async function startRecordingNative(path?: string) {
  const uri = await arp.startRecorder(path);
  return uri;
}

export async function stopRecordingNative() {
  const uri = await arp.stopRecorder();
  arp.removeRecordBackListener();
  return uri;
}

export function subscribeRecordingProgress(cb: (ms: number) => void) {
  return arp.addRecordBackListener((e: RecordBackType) => cb(e.currentPosition));
}

export async function playRecording(path: string) {
  await arp.startPlayer(path);
}
