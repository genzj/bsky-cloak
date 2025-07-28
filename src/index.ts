import { addOverridingStyles } from "./style";
import { patchedFetch } from "./fetch";
class App {
  constructor() {
  }

  start() {
    addOverridingStyles();
    (unsafeWindow as any).patchedFetch = patchedFetch;
    if (!(unsafeWindow.fetch as any).patched) {
      unsafeWindow.fetch = patchedFetch;
    }
  }
}

const app = new App();
app.start();
