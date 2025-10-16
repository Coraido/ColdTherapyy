import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
} from '@ionic/react';
import {
  homeOutline,
  homeSharp,
  informationCircleOutline,
  informationCircleSharp,
  callOutline,
  callSharp,
  helpOutline,
  helpSharp,
  cartOutline,
  cartSharp,
  personOutline,
  personSharp,
  logoGooglePlaystore,
  logInOutline,
  logInSharp,
  personAddOutline,
  personAddSharp,
} from 'ionicons/icons';
import { useLocation } from 'react-router-dom';
import { getCurrentUser, onAuthChange } from '../firebase/auth';
import './SideMenu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'About Us',
    url: '/about',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp
  },
  {
    title: 'Contact',
    url: '/contact',
    iosIcon: callOutline,
    mdIcon: callSharp
  },
  {
    title: 'My Orders',
    url: '/orders',
    iosIcon: cartOutline,
    mdIcon: cartSharp
  },
  {
    title: 'Profile',
    url: '/profile',
    iosIcon: personOutline,
    mdIcon: personSharp
  },
  {
    title: 'Help & FAQ',
    url: '/help',
    iosIcon: helpOutline,
    mdIcon: helpSharp
  }
];

const SideMenu: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthChange((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Cold Therapy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Menu</IonListHeader>
          <IonNote>Your ice cream destination</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={location.pathname === appPage.url ? 'selected' : ''}
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>

        {/* Auth Section */}
        {!user ? (
          <IonList>
            <IonListHeader>Account</IonListHeader>
            <IonMenuToggle autoHide={false}>
              <IonItem routerLink="/login" routerDirection="none" lines="none" detail={false}>
                <IonIcon aria-hidden="true" slot="start" ios={logInOutline} md={logInSharp} />
                <IonLabel>Login</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle autoHide={false}>
              <IonItem routerLink="/signup" routerDirection="none" lines="none" detail={false}>
                <IonIcon aria-hidden="true" slot="start" ios={personAddOutline} md={personAddSharp} />
                <IonLabel>Sign Up</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        ) : (
          <IonList>
            <IonListHeader>Welcome, {user.displayName || 'User'}!</IonListHeader>
            <IonNote>{user.email}</IonNote>
          </IonList>
        )}

        <IonCard className="download-card">
          <IonCardHeader>
            <IonCardTitle>Download the app now!</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p className="download-description">
              Get the best ice cream shopping experience on your Android device
            </p>
            <IonButton expand="block" color="primary" className="download-button">
              <IonIcon slot="start" icon={logoGooglePlaystore} />
              Download APK
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;