import { workspace } from 'vscode';
import { ConfigItems } from './types';

export default class Config {
  readonly items: ConfigItems;
  private changeCallback?: () => void;

  constructor() {
    const { apiToken, customBranches } = workspace.getConfiguration('circleci');

    this.items = {
      apiToken,
      customBranches,
    };

    workspace.onDidChangeConfiguration(() => {
      this.changeCallback && this.changeCallback();
    });
  }

  get(key: keyof ConfigItems): ConfigItems[typeof key] {
    return this.items[key];
  }

  onChange(callback: () => void): void {
    this.changeCallback = callback;
  }
}