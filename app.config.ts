const withForegroundService = require('./android-manifest.plugin');
import appJson from './app.json';

export default withForegroundService({
  ...appJson.expo,
  android: {
    ...(appJson.expo.android as any),
    permissions: [
      'WAKE_LOCK',
      'RECORD_AUDIO',
      'FOREGROUND_SERVICE_MICROPHONE',
      ...((appJson.expo.android as any).permissions || []),
    ],
  },
});
