class FooterMenu {

  constructor() {
    this.menu = document.querySelector('.footer-menu');
  }

  static initialize() {
    const footerMenu = new FooterMenu();
    footerMenu.setup();
  }

  setup() {
    this.setupMobileMenu();
    console.log('setupMobileMenu');

    // Initialize and setup the menu hierarchical.
    CS.MenuHierarchical.init(this.menu);
  }

  setupMobileMenu() {
    this.mobileMenu = CS.MobileMenu.init('footer-mobile-menu');

    const setupMenu = CommonKit.Util.debounce(() => {
      if (CommonKit.Breakpoint.isLessThan('lg')) {
        this.mobileMenuWrapper = document.createElement('div');
        this.mobileMenuWrapper.classList.add('footer-mobile-menu-wrapper');
        this.menu.appendChild(this.mobileMenuWrapper);

        const mobileMenuElement = this.mobileMenu.setupMenu();
        this.mobileMenuWrapper.appendChild(mobileMenuElement);

        this.mobileMenu.addMenu(this.menu);

        // The menu is ready, remove the checking.
        window.removeEventListener('resize', setupMenu);
        window.removeEventListener('orientationchange', setupMenu);
      }
    }, CommonKit.Util.DEBOUNCE_DELAY);

    // Check for changes on window and setup the menu.
    window.addEventListener('resize', setupMenu);
    window.addEventListener('orientationchange', setupMenu);
    setupMenu();
  }

}

FooterMenu.initialize();
