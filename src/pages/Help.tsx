import React from 'react';
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
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
} from '@ionic/react';
import Footer from '../components/Footer';
import './Help.css';

const Help: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Help & FAQ</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="help-page">
          <div className="help-header">
            <h1>How Can We Help You?</h1>
            <p>Find answers to frequently asked questions</p>
          </div>

          <IonCard className="faq-card">
            <IonCardHeader>
              <IonCardTitle>Frequently Asked Questions</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonAccordionGroup>
                <IonAccordion value="ordering">
                  <IonItem slot="header">
                    <IonLabel>
                      <h2>How do I place an order?</h2>
                    </IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    Browse our delicious ice cream flavors, click "Add to Cart" on your favorites, 
                    then proceed to checkout. You can review your order before completing the purchase.
                  </div>
                </IonAccordion>

                <IonAccordion value="delivery">
                  <IonItem slot="header">
                    <IonLabel>
                      <h2>Do you offer delivery?</h2>
                    </IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    Yes! We offer free delivery for orders over ₱1,000 within our service area. 
                    Delivery typically takes 30-45 minutes. Your ice cream arrives in insulated 
                    packaging to ensure it stays frozen.
                  </div>
                </IonAccordion>

                <IonAccordion value="payment">
                  <IonItem slot="header">
                    <IonLabel>
                      <h2>What payment methods do you accept?</h2>
                    </IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    We accept all major credit cards (Visa, Mastercard, American Express), 
                    debit cards, and digital wallets including Apple Pay and Google Pay.
                  </div>
                </IonAccordion>

                <IonAccordion value="ingredients">
                  <IonItem slot="header">
                    <IonLabel>
                      <h2>Are your products made with natural ingredients?</h2>
                    </IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    Absolutely! All our ice cream is made with natural ingredients, no artificial 
                    preservatives, and we offer many gluten-free options. Check individual product 
                    details for specific ingredient information.
                  </div>
                </IonAccordion>

                <IonAccordion value="allergies">
                  <IonItem slot="header">
                    <IonLabel>
                      <h2>Do you have options for dietary restrictions?</h2>
                    </IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    Yes! We offer dairy-free, gluten-free, and sugar-free options. Please check 
                    the product details or contact us for specific allergy information.
                  </div>
                </IonAccordion>

                <IonAccordion value="storage">
                  <IonItem slot="header">
                    <IonLabel>
                      <h2>How should I store my ice cream?</h2>
                    </IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    Store your ice cream in the freezer at 0°F (-18°C) or below. For best taste, 
                    consume within 2 weeks of purchase. Let it sit at room temperature for 5-10 
                    minutes before scooping for easier serving.
                  </div>
                </IonAccordion>

                <IonAccordion value="returns">
                  <IonItem slot="header">
                    <IonLabel>
                      <h2>What is your return policy?</h2>
                    </IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    We want you to be completely satisfied! If you're not happy with your order, 
                    please contact us within 24 hours. We'll work with you to make it right, 
                    whether that's a replacement or refund.
                  </div>
                </IonAccordion>

                <IonAccordion value="bulk">
                  <IonItem slot="header">
                    <IonLabel>
                      <h2>Can I order in bulk for events?</h2>
                    </IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    Yes! We offer bulk ordering for parties, events, and special occasions. 
                    Please contact us at least 48 hours in advance to discuss your needs and 
                    we'll create a custom order for you.
                  </div>
                </IonAccordion>

                <IonAccordion value="app">
                  <IonItem slot="header">
                    <IonLabel>
                      <h2>How do I download the mobile app?</h2>
                    </IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    You can download our Android app directly as an APK file from our website. 
                    Look for the "Download APK" button in the side menu or footer. The app offers 
                    exclusive deals and faster ordering!
                  </div>
                </IonAccordion>

                <IonAccordion value="contact">
                  <IonItem slot="header">
                    <IonLabel>
                      <h2>How can I contact customer support?</h2>
                    </IonLabel>
                  </IonItem>
                  <div className="ion-padding" slot="content">
                    You can reach us via phone at (555) 123-4567, email at info@coldtherapy.com, 
                    or use our contact form. We're available Mon-Fri 10 AM - 9 PM and 
                    Sat-Sun 12 PM - 10 PM.
                  </div>
                </IonAccordion>
              </IonAccordionGroup>
            </IonCardContent>
          </IonCard>

          <IonCard className="help-contact-card">
            <IonCardHeader>
              <IonCardTitle>Still Have Questions?</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Can't find the answer you're looking for? Our friendly customer service team 
                is always here to help!
              </p>
              <a href="/contact" className="contact-link">Contact Us</a>
            </IonCardContent>
          </IonCard>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Help;
