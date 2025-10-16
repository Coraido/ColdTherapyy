import React, { useState, useEffect } from 'react';
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
  IonBadge,
  IonButton,
  IonSpinner,
} from '@ionic/react';
import { checkmarkCircleOutline, timeOutline, refreshOutline, cubeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { getCurrentUser } from '../firebase/auth';
import { getUserOrders, Order } from '../firebase/firestore';
import Footer from '../components/Footer';
import './Orders.css';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const history = useHistory();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const currentUser = getCurrentUser();

    console.log('🔍 Current user:', currentUser);

    if (!currentUser) {
      // Not logged in, redirect to login
      console.log('❌ No user logged in, redirecting to login');
      history.push('/login');
      return;
    }

    setUser(currentUser);

    // Load user orders from Firebase
    console.log('📦 Loading orders for userId:', currentUser.uid);
    const result = await getUserOrders(currentUser.uid);
    console.log('📦 Orders result:', result);
    
    if (result.success && result.orders) {
      console.log('✅ Orders loaded:', result.orders.length, 'orders');
      setOrders(result.orders);
    } else {
      console.error('❌ Failed to load orders:', result.error);
    }

    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return checkmarkCircleOutline;
      case 'processing':
        return refreshOutline;
      case 'pending':
        return timeOutline;
      default:
        return cubeOutline;
    }
  };

  const getStatusColor = (status: string): 'success' | 'warning' | 'primary' | 'medium' => {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'processing':
        return 'warning';
      case 'pending':
        return 'primary';
      default:
        return 'medium';
    }
  };

  if (loading) {
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
          <div className="loading-container">
            <IonSpinner name="crescent" />
          </div>
        </IonContent>
      </IonPage>
    );
  }
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

          {orders.length > 0 ? (
            <div className="orders-list">
              {orders.map((order) => (
                <IonCard key={order.id} className="order-card">
                  <IonCardHeader>
                    <div className="order-card-header">
                      <div>
                        <IonCardTitle className="order-id">{order.id}</IonCardTitle>
                        <p className="order-date">
                          {order.createdAt && (() => {
                            try {
                              // Handle Firestore Timestamp
                              const date = order.createdAt instanceof Object && 'toDate' in order.createdAt
                                ? (order.createdAt as any).toDate()
                                : new Date(order.createdAt);
                              return date.toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              });
                            } catch (e) {
                              return 'Date unavailable';
                            }
                          })()}
                        </p>
                      </div>
                      <IonBadge color={getStatusColor(order.status)} className="order-status">
                        <IonIcon icon={getStatusIcon(order.status)} />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </IonBadge>
                    </div>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="order-items">
                      <h3>Items:</h3>
                      <ul>
                        {order.items.map((item, index) => (
                          <li key={index}>{item.name} x {item.quantity}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="order-footer">
                      <div className="order-total">
                        <strong>Total:</strong> ₱{order.total.toFixed(2)}
                      </div>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </div>
          ) : (
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
          )}
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Orders;
