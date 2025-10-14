import React from 'react';
import { IonFooter, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { callOutline, mailOutline, logoFacebook, logoInstagram, logoTwitter } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  const history = useHistory();

  const handlePhoneClick = () => {
    window.location.href = 'tel:+15551234567';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:info@coldtherapy.com';
  };

  return (
    <IonFooter className="custom-footer">
      <IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="4">
              <div className="footer-section">
                <div className="footer-logo-section">
                  <img src="/images/logo.png" alt="Cold Therapy Logo" className="footer-logo" />
                  <h3>Cold Therapy</h3>
                </div>
                <p>Your premium ice cream destination</p>
                <div className="social-links">
                  <IonButton fill="clear" className="social-button">
                    <IonIcon icon={logoFacebook} />
                  </IonButton>
                  <IonButton fill="clear" className="social-button">
                    <IonIcon icon={logoInstagram} />
                  </IonButton>
                  <IonButton fill="clear" className="social-button">
                    <IonIcon icon={logoTwitter} />
                  </IonButton>
                </div>
              </div>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <div className="footer-section">
                <h4>Quick Links</h4>
                <div className="footer-links">
                  <IonButton fill="clear" routerLink="/home" className="footer-link">
                    Home
                  </IonButton>
                  <IonButton fill="clear" routerLink="/about" className="footer-link">
                    About
                  </IonButton>
                  <IonButton fill="clear" routerLink="/contact" className="footer-link">
                    Contact
                  </IonButton>
                  <IonButton fill="clear" routerLink="/help" className="footer-link">
                    FAQ
                  </IonButton>
                </div>
              </div>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <div className="footer-section">
                <h4>Contact Info</h4>
                <div className="contact-info">
                  <IonButton fill="clear" onClick={handlePhoneClick} className="contact-button">
                    <IonIcon icon={callOutline} slot="start" />
                    (555) 123-4567
                  </IonButton>
                  <IonButton fill="clear" onClick={handleEmailClick} className="contact-button">
                    <IonIcon icon={mailOutline} slot="start" />
                    info@coldtherapy.com
                  </IonButton>
                </div>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="footer-bottom">
              <p>&copy; 2025 Cold Therapy. All rights reserved.</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;