import { browser } from "@wdio/globals";

export default class Page {
  public open(baseUrl:string) {
    return browser.url(baseUrl);
  }

  public sleep() {
    return browser.pause(2000);
  }
}
