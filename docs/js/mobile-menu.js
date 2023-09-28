class MobileMenu {

  constructor(menuId) {
    this.menuId = menuId;
    this.menus = [];
  }

  static init(menuId) {
    const mobileMenu = new MobileMenu(menuId);
    return mobileMenu;
  }

  setupMenu() {
    this.mobileMenu = document.createElement('div');
    this.mobileMenu.id = this.menuId;
    this.mobileMenu.classList.add('mobile-menu', 'accordion', 'accordion--group');

    this.addMenuItems();

    return this.mobileMenu;
  }

  addMenu(menu, options = {}) {
    if (!menu.id) {
      return;
    }

    // Store a clean copy of the menu.
    const menuData = {
      menu: menu.cloneNode(true),
      options
    };
    this.menus.push(menuData);
    this.menus.sort((a, b) => {
      const aWeight = a.options.weight || 0;
      const bWeight = b.options.weight || 0;
      return aWeight - bWeight;
    });
  }

  addMenuItems() {
    let initialized = false;
    const setupMenu = CommonKit.Util.debounce(() => {
      if (!initialized) {
        initialized = true;

        this.menus.forEach((menuData) => {
          const menuItems = menuData.menu.querySelectorAll('.menu-item--depth-1');
          if (menuItems) {
            const wrapper = document.createElement('div');
            wrapper.classList.add('mobile-menu-group', `mobile-${menuData.menu.id}`);

            menuItems.forEach((element, index) => {
              const menuId = `${menuData.menu.id}-${index}`;
              const accordionItem = this.buildAccordionItem(element, menuId, this.menuId);
              wrapper.appendChild(accordionItem);
            });

            this.mobileMenu.appendChild(wrapper);
          }

          if (menuData.options.callback) {
            menuData.options.callback(this.mobileMenu);
          }
        });
      }
    }, CommonKit.Util.DEBOUNCE_DELAY);

    // Give a short time before setup the menu in case some menu needs it.
    const delay = 100;
    setTimeout(() => {
      setupMenu();
    }, delay);
  }

  buildAccordionItem(element, menuId, parentMenu, depth = 0) {
    // Remove the "col-lg-3" class if present.
    element.classList.remove('col-lg-3');

    // Create parent accordion item element.
    const accordionItem = document.createElement('div');
    accordionItem.classList.add('accordion__item');
    accordionItem.classList.add(...element.classList);

    // Create accordion header element.
    const accordionHeader = document.createElement('div');
    accordionHeader.classList.add('accordion__header', 'collapsed');
    accordionHeader.setAttribute('data-toggle', 'accordion');
    accordionHeader.setAttribute('data-target', `${menuId}`);
    accordionItem.appendChild(accordionHeader);

    // Create accordion header title element.
    const accordionHeaderTitle = document.createElement('h4');
    accordionHeader.appendChild(accordionHeaderTitle);

    if (element.classList.contains('menu-item--expanded')) {
      // Menu item has children, add accordion body with children.
      accordionHeaderTitle.innerHTML = element.firstElementChild.innerHTML;

      // Create accordion arrow icon.
      const accordionHeaderArrow = document.createElement('span');
      accordionHeaderArrow.classList.add('accordion__header-arrow');
      accordionHeader.appendChild(accordionHeaderArrow);

      // Create accordion body element.
      const accordionBody = document.createElement('div');
      accordionBody.id = `${menuId}`;
      accordionBody.setAttribute('data-group', `#${parentMenu}`);
      accordionBody.classList.add('accordion__body', 'collapse');
      accordionItem.appendChild(accordionBody);

      if (depth === 0) {
        // First level menu item can have nested accordion menu.
        const elementSubMenuVisible = element.querySelectorAll(
          '.menu-item--depth-2.menu-item--expanded:not(.menu-item--mobile-hidden)'
        );
        if (elementSubMenuVisible.length > 0) {
          const subMenuAccordion = document.createElement('div');
          subMenuAccordion.id = `${menuId}-submenu`;
          subMenuAccordion.classList.add('accordion', 'accordion--group');

          elementSubMenuVisible.forEach((subElement, subIndex) => {
            const subMenuId = `${subMenuAccordion.id}-${subIndex}`;
            const subMenuAccordionItem = this.buildAccordionItem(
              subElement,
              subMenuId,
              subMenuAccordion.id,
              1
            );

            subMenuAccordion.appendChild(subMenuAccordionItem);

            // Add support to update parent Accordion when child show/hide.
            // TODO: can this be moved to the CK Accordion library?
            const parentAccordion = window.CommonKit.Accordion.get(accordionBody);
            const parentConfig = '_config';
            const parentDimensionValue = '_getDimensionValue';
            const parentDimension = parentAccordion[parentConfig].dimension;

            const body = subMenuAccordionItem.querySelector('.accordion__body');
            body.addEventListener('show.cs.collapse', () => {
              accordionBody.style[`max-${parentDimension}`] = '';
            });

            body.addEventListener('shown.cs.collapse', () => {
              const maxDimension = parentAccordion[parentDimensionValue]();
              accordionBody.style[`max-${parentDimension}`] = `${maxDimension}px`;
            });
          });
          accordionBody.appendChild(subMenuAccordion);
        }

        // Append leaf menu items.
        const elementSubMenu = element.querySelectorAll(
          '.menu-item--depth-2.menu-item--expanded.menu-item--mobile-hidden .menu'
        );
        elementSubMenu.forEach((subMenu) => {
          accordionBody.appendChild(subMenu);
        });
      }
      else {
        // After first level, menu item can only have leaf menu items.
        const elementSubMenu = element.querySelectorAll('.menu');
        elementSubMenu.forEach((subMenu) => {
          accordionBody.appendChild(subMenu);
        });
      }
    }
    else {
      // Menu item does not have children, append the <a> element.
      accordionHeaderTitle.appendChild(element.firstElementChild);
    }

    return accordionItem;
  }

}

window.CS = window.CS || {};
window.CS.MobileMenu = {
  init: MobileMenu.init
};
