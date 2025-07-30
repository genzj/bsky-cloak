const AVAILABLE_STYLES = [
  'adventurer',
  'adventurer-neutral',
  'avataaars',
  'avataaars-neutral',
  'big-ears',
  'big-ears-neutral',
  'big-smile',
  'bottts',
  'bottts-neutral',
  'croodles',
  'croodles-neutral',
  'dylan',
  'fun-emoji',
  'glass',
  'icons',
  'identicon',
  'initials',
  'lorelei',
  'lorelei-neutral',
  'micah',
  'miniavs',
  'notionists',
  'notionists-neutral',
  'open-peeps',
  'personas',
  'pixel-art',
  'pixel-art-neutral',
  'rings',
  'shapes',
  'thumbs',
] as const;

type DiceBearAvatarStyle = (typeof AVAILABLE_STYLES)[number];

export interface Settings {
  avatarStyle: DiceBearAvatarStyle;
  seed: number;
}

const DEFAULT_SETTINGS: Settings = {
  avatarStyle: 'big-smile',
  seed: Date.now(),
};

const STORAGE_KEY = 'bsky-cloak-settings-v1';

export class SettingsManager {
  private settings: Settings;

  constructor() {
    this.settings = SettingsManager.loadSettings();
    // to ensure that the default settings remain persistent.
    this.saveSettings(false);
    this.registerMenuCommands();
    console.debug(
      `[bsky-cloak] loaded settings: ${JSON.stringify(this.settings)}`
    );
  }

  private static loadSettings(): Settings {
    try {
      const stored = GM_getValue(STORAGE_KEY, '');
      return stored ? { ...DEFAULT_SETTINGS, ...stored } : DEFAULT_SETTINGS;
    }
    catch {
      return DEFAULT_SETTINGS;
    }
  }

  public init() {}

  private saveSettings(reload: boolean): void {
    GM_setValue(STORAGE_KEY, this.settings);
    if (reload) {
      unsafeWindow.location.reload();
    }
  }

  private resetSettings(): void {
    GM_setValue(STORAGE_KEY, undefined);
    unsafeWindow.location.reload();
  }

  private registerMenuCommands(): void {
    GM_registerMenuCommand('Set Avatar Style', () => {
      this.showAvatarStyleDialog();
    });
    GM_registerMenuCommand('Preview Avatar Styles', () =>
      unsafeWindow.open('https://www.dicebear.com/styles/', '_blank')
    );
    GM_registerMenuCommand('Set Custom Seed', () => {
      this.setSeed();
    });
    GM_registerMenuCommand('Regenerate/Fix Random Seed', () => {
      this.regenerateSeed();
    });
    GM_registerMenuCommand('Reset To Default', () => {
      this.resetSettings();
    });
  }

  private showAvatarStyleDialog(): void {
    const styles = AVAILABLE_STYLES;
    const current = this.settings.avatarStyle;
    const choice = prompt(
      `Choose avatar style (current: ${current}):\n${styles
        .map((s, i) => `${(i + 1).toString()}. ${s}`)
        .join('\n')}\n\nEnter the number (1-${styles.length.toString()}):`,
      '1'
    );

    if (choice) {
      const index = parseInt(choice) - 1;
      if (index >= 0 && index < styles.length) {
        this.settings.avatarStyle = styles[index];
        this.saveSettings(true);
        alert(`Avatar style set to: ${this.settings.avatarStyle}`);
      }
    }
  }

  private setSeed(): void {
    const input = prompt(
      `Enter seed number (current: ${this.settings.seed.toString()}):`,
      this.settings.seed.toString()
    );
    if (input) {
      const seed = parseInt(input);
      if (!isNaN(seed)) {
        this.settings.seed = seed;
        this.saveSettings(true);
        alert(`Seed set to: ${this.settings.seed.toString()}`);
      }
    }
  }

  private regenerateSeed(): void {
    if (
      confirm(`Regenerate random seed? Current seed: ${this.settings.seed.toString()}`)
    ) {
      this.settings.seed = Date.now();
      this.saveSettings(true);
      alert(`Random seed regenerated: ${this.settings.seed.toString()}`);
    }
  }

  get avatarStyle(): Settings['avatarStyle'] {
    return this.settings.avatarStyle;
  }

  get seed(): Settings['seed'] {
    return this.settings.seed;
  }
}

export const settingsManager = new SettingsManager();
