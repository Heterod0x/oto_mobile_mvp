import {
  withAndroidManifest,
  AndroidConfig,
  createRunOncePlugin,
} from '@expo/config-plugins';

function ensureToolsNamespace(manifest: AndroidConfig.Manifest.AndroidManifest) {
  const root = manifest.manifest;
  if (!root.$['xmlns:tools']) {
    root.$['xmlns:tools'] = 'http://schemas.android.com/tools';
  }
}

const withMicrophoneFGS = (config: any) =>
  withAndroidManifest(config, (c) => {
    const manifest = c.modResults;
    ensureToolsNamespace(manifest);

    const app = AndroidConfig.Manifest.getMainApplicationOrThrow(manifest);
    app.service = app.service || [];
    app.service.push({
      $: {
        'android:name': 'app.notifee.core.ForegroundService',
        'android:exported': 'false',
        'android:foregroundServiceType': 'microphone',
        'tools:replace': 'android:foregroundServiceType',
      },
    } as any);

    return c;
  });

export default createRunOncePlugin(withMicrophoneFGS, 'withMicrophoneFGS', '1.0.0');
