const { withAndroidManifest, AndroidConfig, createRunOncePlugin } = require('@expo/config-plugins');

function ensureToolsNamespace(manifest) {
  const root = manifest.manifest;
  if (!root.$['xmlns:tools']) {
    root.$['xmlns:tools'] = 'http://schemas.android.com/tools';
  }
}

const withMicrophoneFGS = (config) =>
  withAndroidManifest(config, (cfg) => {
    const manifest = cfg.modResults;
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
    });
    return cfg;
  });

module.exports = createRunOncePlugin(withMicrophoneFGS, 'withMicrophoneFGS', '1.0.0');
