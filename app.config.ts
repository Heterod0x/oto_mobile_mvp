import { ConfigContext, ExpoConfig } from 'expo/config';
import base from './app.json';
import withMicrophoneFGS from './plugins/withMicrophoneFGS';

const baseExpo = base.expo as ExpoConfig;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...baseExpo,
  ...config,
  android: {
    ...baseExpo.android,
    ...(config.android || {}),
    permissions: [
      'android.permission.RECORD_AUDIO',
      'android.permission.FOREGROUND_SERVICE',
      'android.permission.FOREGROUND_SERVICE_MICROPHONE',
      'android.permission.WAKE_LOCK',
      ...((config.android?.permissions) || []),
    ],
  },
  plugins: [...(baseExpo.plugins || []), ...(config.plugins || []), withMicrophoneFGS as any],
});
