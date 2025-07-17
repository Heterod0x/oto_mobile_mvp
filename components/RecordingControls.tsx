import React, { useCallback, useRef, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ensureMicPermission } from '@/src/permissions/mic';
import { arp } from '@/src/audio/recorder';
import {
  startRecordingServiceNotification,
  stopRecordingService,
} from '@/src/notifeeService';

export default function RecordingControls() {
  const [recording, setRecording] = useState(false);
  const [filePath, setFilePath] = useState<string | null>(null);
  const recordSub = useRef<any>(null);

  const startRec = useCallback(async () => {
    const ok = await ensureMicPermission();
    if (!ok) {
      alert('マイク権限がありません');
      return;
    }

    await startRecordingServiceNotification();
    recordSub.current = arp.addRecordBackListener(() => {});
    const uri = await arp.startRecorder();
    setRecording(true);
    setFilePath(uri);
  }, []);

  const stopRec = useCallback(async () => {
    const uri = await arp.stopRecorder();
    if (recordSub.current) {
      arp.removeRecordBackListener();
      recordSub.current = null;
    }
    setRecording(false);
    setFilePath(uri);
    await stopRecordingService();
  }, []);

  const playRec = useCallback(async () => {
    if (!filePath) return;
    await arp.startPlayer(filePath);
  }, [filePath]);

  return (
    <View style={{ alignItems: 'center', gap: 10 }}>
      <Button title={recording ? '録音停止' : '録音開始'} onPress={recording ? stopRec : startRec} />
      {filePath && !recording && <Button title="再生" onPress={playRec} />}
      {filePath && <Text selectable>{filePath}</Text>}
    </View>
  );
}
