import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonToast,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { callOutline, mailOutline, locationOutline, timeOutline } from 'ionicons/icons';
import Footer from '../components/Footer';
import './Contact.css';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Contact Us</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="contact-page">
          <div className="contact-header">
            <h1>Get In Touch</h1>
            <p>We'd love to hear from you! Reach out to us anytime.</p>
          </div>

          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeMd="6">
                <IonCard className="contact-info-card">
                  <IonCardHeader>
                    <IonCardTitle>Contact Information</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="contact-item">
                      <IonIcon icon={callOutline} className="contact-icon" />
                      <div>
                        <h3>Phone</h3>
                        <p>(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <IonIcon icon={mailOutline} className="contact-icon" />
                      <div>
                        <h3>Email</h3>
                        <p>info@coldtherapy.com</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <IonIcon icon={locationOutline} className="contact-icon" />
                      <div>
                        <h3>Address</h3>
                        <p>123 Ice Cream Lane<br/>Sweet City, SC 12345</p>
                      </div>
                    </div>
                    <div className="contact-item">
                      <IonIcon icon={timeOutline} className="contact-icon" />
                      <div>
                        <h3>Hours</h3>
                        <p>Mon-Fri: 10 AM - 9 PM<br/>Sat-Sun: 12 PM - 10 PM</p>
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6">
                <IonCard className="contact-form-card">
                  <IonCardHeader>
                    <IonCardTitle>Send Us a Message</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <form onSubmit={handleSubmit}>
                      <IonItem className="form-item">
                        <IonLabel position="stacked">Name *</IonLabel>
                        <IonInput
                          value={name}
                          onIonChange={e => setName(e.detail.value!)}
                          placeholder="Your name"
                          required
                        />
                      </IonItem>
                      <IonItem className="form-item">
                        <IonLabel position="stacked">Email *</IonLabel>
                        <IonInput
                          type="email"
                          value={email}
                          onIonChange={e => setEmail(e.detail.value!)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </IonItem>
                      <IonItem className="form-item">
                        <IonLabel position="stacked">Message *</IonLabel>
                        <IonTextarea
                          value={message}
                          onIonChange={e => setMessage(e.detail.value!)}
                          placeholder="How can we help you?"
                          rows={6}
                          required
                        />
                      </IonItem>
                      <IonButton
                        expand="block"
                        type="submit"
                        color="primary"
                        className="submit-btn"
                      >
                        Send Message
                      </IonButton>
                    </form>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
        <Footer />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Thank you! Your message has been sent successfully."
          duration={3000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Contact;
