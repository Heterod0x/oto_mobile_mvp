import { ExpoConfig, ConfigContext } from 'expo/config';
import withMicrophoneFGS from './plugins/withMicrophoneFGS';

export default ({ config }: ConfigContext): ExpoConfig => {
  config.android = {
    ...(config.android || {}),
    permissions: [
      'android.permission.RECORD_AUDIO',
      'android.permission.FOREGROUND_SERVICE',
      'android.permission.FOREGROUND_SERVICE_MICROPHONE',
      'android.permission.WAKE_LOCK',
    ],
  };
  config.plugins = [...(config.plugins || []), withMicrophoneFGS as any];
  return config as ExpoConfig;
};
