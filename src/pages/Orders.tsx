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
  IonIcon,
  IonButton,
} from '@ionic/react';
import { timeOutline } from 'ionicons/icons';
import Footer from '../components/Footer';
import './Orders.css';

const Orders: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>My Orders</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="orders-page">
          <div className="orders-header">
            <h1>Order History</h1>
            <p>Track and view your past orders</p>
          </div>

          <IonCard className="empty-state-card">
            <IonCardContent>
              <div className="empty-state">
                <IonIcon icon={timeOutline} />
                <h2>No Orders Yet</h2>
                <p>Browse our delicious ice cream flavors and place your first order!</p>
                <IonButton routerLink="/home" color="primary">
                  Shop Now
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Orders;
