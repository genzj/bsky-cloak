import { isWindowFetchPatched, patchedFetch } from './fetch';
import { settingsManager } from './settings';
import { addOverridingStyles } from './style';
class App {
  start() {
    // Initialize settings
    settingsManager.init();

    addOverridingStyles();
    if (!isWindowFetchPatched()) {
      unsafeWindow.fetch = patchedFetch;
    }
  }
}

const app = new App();
app.start();
