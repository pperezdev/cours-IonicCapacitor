import React from 'react';
import { APP_MENU_ID } from '../hooks/menu';
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {
  informationCircleOutline,
  mailOutline,
  menuOutline,
  personCircleOutline,
} from 'ionicons/icons';

type MenuLinkProps = {
  routerLink: string;
  label: string;
  icon: string;
};

const MenuLink: React.FC<MenuLinkProps> = ({ routerLink, label, icon }) => {
  return (
    <IonMenuToggle menu={APP_MENU_ID}>
      <IonItem routerLink={routerLink} detail={false}>
        <IonIcon slot="start" icon={icon} />
        <IonLabel>{label}</IonLabel>
      </IonItem>
    </IonMenuToggle>
  );
};

export const MenuToggleButton: React.FC = () => {
  return (
    <IonMenuToggle menu={APP_MENU_ID}>
      <IonButton fill="clear" aria-label="Ouvrir le menu">
        <IonIcon slot="icon-only" icon={menuOutline} />
      </IonButton>
    </IonMenuToggle>
  );
};

const AppMenu: React.FC = () => {
  return (
    <IonMenu
      contentId="main-content"
      side="start"
      type="overlay"
      menuId={APP_MENU_ID}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle size="small">Menu</IonTitle>
          <IonButtons slot="end">
            <IonMenuToggle menu={APP_MENU_ID}>
              <IonButton fill="clear">Fermer</IonButton>
            </IonMenuToggle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonAccordionGroup>
          <IonAccordion value="messages">
            <IonItem slot="header">
              <IonIcon slot="start" icon={mailOutline} />
              <IonLabel>Messages</IonLabel>
            </IonItem>
            <IonList slot="content">
              <MenuLink routerLink="/home" label="Inbox" icon={mailOutline} />
              <MenuLink
                routerLink="/message/1"
                label="Détail du message"
                icon={personCircleOutline}
              />
            </IonList>
          </IonAccordion>

          <IonAccordion value="about">
            <IonItem slot="header">
              <IonIcon slot="start" icon={informationCircleOutline} />
              <IonLabel>À propos</IonLabel>
            </IonItem>
            <IonList slot="content">
              <IonItem
                detail={false}
                lines="none"
                className="ion-padding-start ion-padding-end"
              >
                <IonLabel>
                  Application Ionic React (menu burger + sous-menus)
                </IonLabel>
              </IonItem>
            </IonList>
          </IonAccordion>
        </IonAccordionGroup>
      </IonContent>
    </IonMenu>
  );
};

export default AppMenu;

