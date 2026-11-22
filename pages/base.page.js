export class BasePage {
  constructor(page) {
    this.page = page;
  }
  async open(path = "/index.php") {
    await this.page.goto(path);
  }
}
