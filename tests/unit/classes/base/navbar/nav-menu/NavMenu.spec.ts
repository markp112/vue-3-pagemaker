import { NavMenuItem } from '../../../../../../src/classes/base/navbar/nav-menu/NavMenuItem'

describe("NavMenu", () => {

  let navMenuItem: NavMenuItem;

  it("should construct an item with an id, navtext, navlink and flag for visibility", () =>{

    navMenuItem = new NavMenuItem(1, 'Menu Item 1', 'router link 1', true);
    expect(navMenuItem.id).toEqual(1);
    expect(navMenuItem.navText).toEqual('Menu Item 1');
    expect(navMenuItem.navLink).toEqual('router link 1');
    expect(navMenuItem.isVisible).toBe(true);
  })

})
