import React, { useEffect } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    // Navigate to home after 3 seconds
    const timer = setTimeout(() => {
      history.replace('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      <IonContent className="splash-screen">
        <div className="splash-container">
          <div className="logo-container">
            <img src="/images/logo.png" alt="Cold Therapy Logo" className="splash-logo" />
            <h1 className="app-name">COLD THERAPY</h1>
            <p className="app-tagline">Your Premium Ice Cream Destination</p>
          </div>
          
          <div className="loading-animation">
            <div className="ice-cream-scoop"></div>
            <div className="ice-cream-scoop"></div>
            <div className="ice-cream-scoop"></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreen;
