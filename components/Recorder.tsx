import React, { useState, useCallback, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import notifee from '@notifee/react-native';
import { startRecordingServiceNotification } from '@/entrypoint';
import { ensureMicPermission } from '@/permissions/mic';
import { arp } from '@/audio/recorder';

export default function Recorder() {
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
    await notifee.stopForegroundService();
  }, []);

  const playRec = useCallback(async () => {
    if (!filePath) return;
    await arp.startPlayer(filePath);
  }, [filePath]);

  return (
    <View style={{ gap: 10, alignItems: 'center' }}>
      <Button title={recording ? '録音停止' : '録音開始'} onPress={recording ? stopRec : startRec} />
      {filePath && !recording && <Button title="再生" onPress={playRec} />}
      {filePath && <Text selectable>{filePath}</Text>}
    </View>
  );
}
