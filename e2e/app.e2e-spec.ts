import { AppPage } from './app.po';

describe('angular-native-seed App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have router outlet', () => {
    page.navigateTo();
    expect(page.getRouterOutlet().isPresent()).toBeTruthy();
  });
});
