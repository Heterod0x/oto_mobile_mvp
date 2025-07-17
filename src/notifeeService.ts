import notifee, { AndroidColor } from '@notifee/react-native';

export const RECORDING_CHANNEL_ID = 'recording';

notifee.registerForegroundService(() => {
  return new Promise(() => {});
});

export async function startRecordingServiceNotification() {
  await notifee.createChannel({
    id: RECORDING_CHANNEL_ID,
    name: 'Recording',
    importance: 4,
  });

  await notifee.displayNotification({
    title: '録音中…',
    body: 'タップで停止',
    android: {
      channelId: RECORDING_CHANNEL_ID,
      asForegroundService: true,
      color: AndroidColor.RED,
      colorized: true,
      ongoing: true,
      pressAction: { id: 'default' },
      showChronometer: true,
    },
  });
}

export async function stopRecordingService() {
  await notifee.stopForegroundService();
}
