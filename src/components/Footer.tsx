import React from 'react';
import { IonFooter, IonToolbar, IonTitle, IonGrid, IonRow, IonCol } from '@ionic/react';
import './Footer.css';

const Footer: React.FC = () => {
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
              </div>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <div className="footer-section">
                <h4>Quick Links</h4>
                <p>Home | About | Contact | FAQ</p>
              </div>
            </IonCol>
            <IonCol size="12" sizeMd="4">
              <div className="footer-section">
                <h4>Contact Info</h4>
                <p>📞 (555) 123-4567</p>
                <p>📧 info@coldtherapy.com</p>
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