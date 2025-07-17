import withForegroundService from "./android-manifest.plugin";
import appJson from "./app.json";

export default withForegroundService({
  ...appJson.expo,
});
