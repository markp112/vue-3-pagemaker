import { ASidebarElement } from '../sidebar-element/aSidebar-element';

export class SidebarElements {

  _componentDefinitions: ASidebarElement[];

  constructor() {
    this._componentDefinitions = [];
  }

  add(newComponent: ASidebarElement): void {
    const component: ASidebarElement | undefined = this.getComponentByName(
      newComponent.componentName
    );
    if (component !== undefined) {
      this.delete(component.componentName);
    }
    this._componentDefinitions.push(newComponent);
  }

  delete(componentName: string): void {
    this._componentDefinitions = this._componentDefinitions.filter(
      (component: ASidebarElement) =>
        component.componentName !== componentName
    );
  }

  clear(): void {
    this._componentDefinitions = [];
  }

  getComponentByName(componentName: string): ASidebarElement | undefined {
    if (componentName === '') return;
    // if (componentRef !== '') {
    //   return this._componentDefinitions.filter(
    //     comp => comp.componentRef === componentRef
    //   )[0];
    // } else {
      return this._componentDefinitions.filter(
        component => component.componentName === componentName
      )[0];
    // }
  }

  componentDefinitions(): ASidebarElement[] {
    return this._componentDefinitions;
  }

  containersOnly(): ASidebarElement[] {
    return this._componentDefinitions.filter(item => item.isContainer === true);
  }

  pageElementsOnly(): ASidebarElement[] {
    return this._componentDefinitions.filter(item => item.isContainer === false);
  }
}
