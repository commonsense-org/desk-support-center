class MenuHierarchical {

  constructor(menu) {
    this.menu = menu;
  }

  static init(menu) {
    const menuHierarchical = new MenuHierarchical(menu);
    menuHierarchical.setup();
  }

  setup() {
    const setupMenu = CommonKit.Util.debounce(() => {
      if (CommonKit.Breakpoint.isBiggerThan('md')) {
        // Prevent link click of second level menu items.
        const menuItems = this.menu.querySelectorAll('.menu-item--depth-1.menu-item--expanded');
        let subMenuItems = [];
        menuItems.forEach((element) => {
          const elementsubMenuItems = element
            .querySelectorAll('li.menu-item--expanded:not(.menu-item--mobile-hidden)');
          if (elementsubMenuItems.length) {
            subMenuItems = [...subMenuItems, ...[].slice.call(elementsubMenuItems)];
          }
        });

        subMenuItems.forEach((element) => {
          element.querySelector('a').addEventListener('click', (event) => {
            event.preventDefault();
            return false;
          });
        });

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

window.CS = window.CS || {};
window.CS.MenuHierarchical = {
  init: MenuHierarchical.init
};
