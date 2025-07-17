import { PermissionsAndroid, Platform } from 'react-native';

export async function ensureMicPermission(): Promise<boolean> {
  if (Platform.OS !== 'android') return true;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'マイク使用許可',
        message: '録音機能を使用するにはマイクアクセスが必要です。',
        buttonPositive: 'OK',
        buttonNegative: 'キャンセル',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (e) {
    console.warn('Mic permission error', e);
    return false;
  }
}
