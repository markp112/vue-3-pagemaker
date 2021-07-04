import { ADimension } from '@/classes/base/dimension/a-dimension';
import { SiteDefaults } from '@/classes/settings/site-defaults/site-defaults';
import { PageElementBuilder } from '../../builder/page-element-builder';
import { ButtonElement } from '../../button-element/button-element';
import { PageElementFactory, PageElementClasses } from '../../factory/page-elements-factory';
import { ImageElement } from '../../image-element/image-element';
import { PageContainer } from '../../page-container/page-container';
import { TextElement } from '../../text-element/text-element';
import { FirestorePage } from '../firestore/firestore-page';
import { ImageElementFirebaseData, PageContainerFirebaseData, PageElementFirebaseData } from '../model/firebase-model';
import { FirebasePageDataTypes, PageContainerFirebaseDataInterface, PageIdentity } from './types/types';
import { Notification, notificationDefault } from '@/models/notification/notification';
import { useStore } from '@/store';
import { AnActionEvent } from '@/classes/base/action/an-action';
import { ALocation } from '@/classes/base/location/a-location';
import { pageActionTypes } from '@/store/modules/page';
import { getSiteAndUserId } from '@/common/site-and-user/site-and-user';

export class FirebaseDataBuilder {
  siteDefaults = SiteDefaults.getInstance();
  componentFactory = new PageElementFactory();
  notification: Notification = notificationDefault;
  firestorePage: FirestorePage = new FirestorePage();
  store = useStore();

  private getContainerProperties(
    container: PageContainer
  ): PageElementFirebaseData {
  // return the properties of the container without the elements as these are classes which
  // firebase does not handle.
  return {
    actionEvent: container.actionEvent.toObject,
    dimension: container.dimension.toObject(),
    location: container.location.toObject(),
    classDefinition: container.classDefinition,
    componentHTMLTag: container.componentHTMLTag,
    content: container.content,
    isContainer: container.isContainer,
    name: container.name,
    parentRef: container.parentRef,
    ref: container.ref,
    styles: container.styles,
    type: container.type,
    isAbsolute: container.isAbsolute,
  };
}

  private getElements(elements: PageElementClasses[]): FirebasePageDataTypes[] {
    const data: FirebasePageDataTypes[] = [];
    elements.forEach(element => {
      if (element) {
        if (element.isContainer) {
          const container: PageElementClasses[] = (element as PageContainer)
            .elements;
          const containerElement = this.getContainerProperties(
            element as PageContainer
          ) as PageContainerFirebaseData;
          containerElement.elements = this.getElements(container);
          data.push(containerElement);
        } else {
          const elem = element.getElementContent();
          data.push(elem);
        }
      }
    });
    return data;
  }

  public savePageData(
    pageElement: PageElementClasses[],
    pageName: string
  ): Promise<Notification> {
    const pageData: FirebasePageDataTypes[] = [];
    pageElement.forEach(container => {
      if (container) {
        const pageContainer = container as PageContainer;
        const containerData = this.getContainerProperties(
          pageContainer
          ) as PageContainerFirebaseData;
          containerData.elements = this.getElements(pageContainer.elements);
          pageData.push(containerData);
        }
      });
    const pageIdentity: PageIdentity = this.getPageIdentity(pageName);
    const firebaseData: PageContainerFirebaseDataInterface = {
      pageIdentity: pageIdentity,
      containerData: pageData
    };
    return new Promise((resolve, reject) => {
      this.firestorePage.savePage(firebaseData)
        .then(notification => {
          resolve(notification);
        })
        .catch(err => {
          console.log('%c⧭', 'color: #bfffc8', err);
          reject(err);
        });
    });
  }

  public retrievePageDataFromFirestore(pageName: string) {
    console.log('%c%s', 'color: #7f2200', 'retrievePageDataFromFirestore');
    let pageData: FirebasePageDataTypes[] = [];
    const data: PageIdentity = this.getPageIdentity(pageName);
    this.firestorePage.LoadPageData(data)
      .then(response => {
        pageData = response as FirebasePageDataTypes[];
        const rootComponent = this.componentFactory.createElement(
          "rootContainer",
          "ROOT"
        ) as PageContainer;
        this.buildPageElements(pageData, rootComponent);
        console.log('%c⧭', 'color: #ffa280', rootComponent);
        this.store.dispatch(pageActionTypes.UPDATE_PAGE_ELEMENTS, rootComponent.elements)
      })
      .catch(err => {
        console.log(err);
      });
  }

  buildPageElements(
    pageData: FirebasePageDataTypes[],
    parentContainer: PageContainer
  ) {
    pageData.forEach(item => {
      if (item.isContainer) {
        const container = this.createComponent(
          parentContainer,
          item
        ) as PageContainer;
        parentContainer.elements.push(container);
        this.buildPageElements(
          (item as PageContainerFirebaseData).elements,
          container
        );
      } else {
        const component = this.createComponent(
          parentContainer,
          item
        ) as PageElementClasses;
        parentContainer.elements.push(component);
      }
    });
    return parentContainer;
  }

  private createComponent(
    parentComponent: PageContainer,
    item: FirebasePageDataTypes
  ): PageElementClasses {
    if (item.isContainer) {
      return this.buildAContainer(parentComponent, item);
    } else {
      switch (item.type) {
        case "button":
          return this.buildAButton(parentComponent, item);
        case "image":
          return this.buildAnImage(parentComponent, item as ImageElementFirebaseData);
        case "text":
          return this.buildText(parentComponent, item);
      }
    }
    throw new Error("fireBaseDataBuilder: PageElement type not recognised");
  }

  private buildAContainer(
    parentComponent: PageContainer,
    item: FirebasePageDataTypes
  ): PageContainer {
    const pageContainer: PageContainer = new PageElementBuilder()
      .setActionEvent(
        new AnActionEvent(
          item.actionEvent.actionType,
          item.actionEvent.eventAction
        )
      )
      .setLocation(new ALocation(item.location.top, item.location.left))
      .setDimension(new ADimension(item.dimension.height, item.dimension.width))
      .setRef(item.ref)
      .setIsContainer(item.isContainer)
      .setName(item.name)
      .setParent(parentComponent)
      .setParentRef(item.parentRef)
      .setStyles(item.styles)
      .setType(item.type)
      .setClassDefintion(item.classDefinition)
      .setComponentHtmlTag(item.componentHTMLTag)
      .setContent(item.content)
      .buildAContainer();
    return pageContainer;
  }

  private buildAButton(
    parentComponent: PageContainer,
    item: FirebasePageDataTypes
  ): ButtonElement {
    const pageElement: ButtonElement = new PageElementBuilder()
      .setActionEvent(
        new AnActionEvent(
          item.actionEvent.actionType,
          item.actionEvent.eventAction
        )
      )
      .setLocation(new ALocation(item.location.top, item.location.left))
      .setDimension(new ADimension(item.dimension.height, item.dimension.width))
      .setRef(item.ref)
      .setIsContainer(item.isContainer)
      .setName(item.name)
      .setParent(parentComponent)
      .setParentRef(item.parentRef)
      .setStyles(item.styles)
      .setType(item.type)
      .setClassDefintion(item.classDefinition)
      .setComponentHtmlTag(item.componentHTMLTag)
      .setContent(item.content)
      .setIsAbsolute(item.isAbsolute)
      .buildAButton();
    return pageElement;
  }

  private buildAnImage(
    parentComponent: PageContainer,
    item: ImageElementFirebaseData
  ): ImageElement {
    const pageElement: ImageElement = new PageElementBuilder()
      .setActionEvent(
        new AnActionEvent(
          item.actionEvent.actionType,
          item.actionEvent.eventAction
        )
      )
      .setLocation(new ALocation(item.location.top, item.location.left))
      .setDimension(new ADimension(item.dimension.height, item.dimension.width))
      .setRef(item.ref)
      .setIsContainer(item.isContainer)
      .setName(item.name)
      .setNaturalSize(new ADimension(item.naturalSize.height, item.naturalSize.width))
      .setScaledSize(new ADimension(item.scaledSize.height, item.scaledSize.width))
      .setParent(parentComponent)
      .setContainerDimensions(new ADimension(item.containerDimensions.height, item.containerDimensions.width))
      .setParentRef(item.parentRef)
      .setStyles(item.styles)
      .setType(item.type)
      .setClassDefintion(item.classDefinition)
      .setComponentHtmlTag(item.componentHTMLTag)
      .setContent(item.content)
      .buildAnImage();
    return pageElement;
  }

  private buildText(
    parentComponent: PageContainer,
    item: FirebasePageDataTypes
  ): TextElement {
    const pageElement: TextElement = new PageElementBuilder()
      .setActionEvent(
        new AnActionEvent(
          item.actionEvent.actionType,
          item.actionEvent.eventAction
        )
      )
      .setLocation(new ALocation(item.location.top, item.location.left))
      .setDimension(new ADimension(item.dimension.height, item.dimension.width))
      .setRef(item.ref)
      .setIsContainer(item.isContainer)
      .setName(item.name)
      .setParent(parentComponent)
      .setStyles(item.styles)
      .setType(item.type)
      .setClassDefintion(item.classDefinition)
      .setComponentHtmlTag(item.componentHTMLTag)
      .setContent(item.content)
      .setIsAbsolute(item.isAbsolute)
      .buildATextElement();
    return pageElement;
  }

  private getPageIdentity(pageName: string): PageIdentity {
    const siteAndUserId = getSiteAndUserId();
    return {
      siteId: siteAndUserId.siteId,
      userId: siteAndUserId.userId,
      pageId: pageName
    };
  }
}
