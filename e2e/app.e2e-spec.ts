import { RmQualityMatrixPage } from './app.po';

describe('rm-quality-matrix App', () => {
  let page: RmQualityMatrixPage;

  beforeEach(() => {
    page = new RmQualityMatrixPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
