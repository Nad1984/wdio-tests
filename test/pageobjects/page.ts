import { browser } from "@wdio/globals";

export default class Page {
  public open(baseUrl:string) {
    return browser.url(baseUrl);
  }
}
