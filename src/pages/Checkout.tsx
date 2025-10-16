import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonBackButton,
  IonButtons,
  IonToast,
  IonSpinner
} from '@ionic/react';
import { useCart } from '../context/CartContext';
import { createOrder } from '../firebase/firestore';
import { getCurrentUser } from '../firebase/auth';
import './Checkout.css';

const Checkout: React.FC = () => {
  const { state, dispatch } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit'
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [savedOrderId, setSavedOrderId] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return customerInfo.name && customerInfo.email && customerInfo.phone && 
           customerInfo.address && customerInfo.city && customerInfo.zipCode;
  };

  const placeOrder = async () => {
    if (!isFormValid() || state.items.length === 0) {
      setToastMessage('Please fill in all required fields');
      setShowToast(true);
      return;
    }

    setLoading(true);

    try {
      // Get current user or use 'guest'
      const currentUser = getCurrentUser();
      const userId = currentUser ? currentUser.uid : 'guest';

      // Prepare order data
      const orderData = {
        userId,
        items: state.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || ''
        })),
        total: state.total,
        status: 'pending' as const,
        shippingInfo: {
          name: customerInfo.name,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.zipCode}`
        }
      };

      // Save order to Firebase
      const result = await createOrder(orderData);
      
      if (result.success) {
        console.log('✅ Order saved to Firebase! Order ID:', result.orderId);
        setSavedOrderId(result.orderId || '');
        
        // Clear cart
        dispatch({ type: 'CLEAR_CART' });
        
        // Show success
        setOrderPlaced(true);
        setToastMessage('Order placed successfully!');
        setShowToast(true);
      } else {
        console.error('❌ Failed to save order:', result.error);
        setToastMessage('Failed to place order. Please try again.');
        setShowToast(true);
      }
    } catch (error) {
      console.error('❌ Error placing order:', error);
      setToastMessage('An error occurred. Please try again.');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Order Confirmed</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="order-success">
            <div className="success-icon">✅</div>
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your order. You will receive a confirmation email shortly.</p>
            {savedOrderId && (
              <p className="order-id">Order ID: <strong>{savedOrderId}</strong></p>
            )}
            <IonButton expand="block" routerLink="/home" color="primary">
              Continue Shopping
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (state.items.length === 0) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Checkout</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <p>Add some items to your cart before checking out.</p>
            <IonButton expand="block" routerLink="/home" color="primary">
              Start Shopping
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="checkout-container">
          {/* Order Summary */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Order Summary</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {state.items.map((item) => (
                  <IonItem key={item.id}>
                    <IonLabel>
                      <h3>{item.name}</h3>
                      <p>Quantity: {item.quantity} × ₱{item.price.toFixed(2)}</p>
                    </IonLabel>
                    <IonText slot="end">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </IonText>
                  </IonItem>
                ))}
              </IonList>
              <div className="total-section">
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonText color="dark">
                        <h2>Total: ₱{state.total.toFixed(2)}</h2>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Customer Information */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Delivery Information</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                <IonItem>
                  <IonLabel position="stacked">Full Name</IonLabel>
                  <IonInput
                    value={customerInfo.name}
                    onIonInput={(e) => handleInputChange('name', e.detail.value!)}
                    placeholder="Enter your full name"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Email</IonLabel>
                  <IonInput
                    type="email"
                    value={customerInfo.email}
                    onIonInput={(e) => handleInputChange('email', e.detail.value!)}
                    placeholder="Enter your email"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Phone</IonLabel>
                  <IonInput
                    type="tel"
                    value={customerInfo.phone}
                    onIonInput={(e) => handleInputChange('phone', e.detail.value!)}
                    placeholder="Enter your phone number"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Address</IonLabel>
                  <IonInput
                    value={customerInfo.address}
                    onIonInput={(e) => handleInputChange('address', e.detail.value!)}
                    placeholder="Enter your address"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">City</IonLabel>
                  <IonInput
                    value={customerInfo.city}
                    onIonInput={(e) => handleInputChange('city', e.detail.value!)}
                    placeholder="Enter your city"
                  />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">ZIP Code</IonLabel>
                  <IonInput
                    value={customerInfo.zipCode}
                    onIonInput={(e) => handleInputChange('zipCode', e.detail.value!)}
                    placeholder="Enter ZIP code"
                  />
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Payment Method */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Payment Method</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem>
                <IonLabel>Payment Method</IonLabel>
                <IonSelect
                  value={customerInfo.paymentMethod}
                  onIonChange={(e) => handleInputChange('paymentMethod', e.detail.value)}
                >
                  <IonSelectOption value="credit">Credit Card</IonSelectOption>
                  <IonSelectOption value="debit">Debit Card</IonSelectOption>
                  <IonSelectOption value="paypal">PayPal</IonSelectOption>
                  <IonSelectOption value="cash">Cash on Delivery</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCardContent>
          </IonCard>

          {/* Place Order Button */}
          <div className="place-order-section">
            <IonButton
              expand="block"
              color="primary"
              size="large"
              onClick={placeOrder}
              disabled={!isFormValid() || loading}
            >
              {loading ? (
                <>
                  <IonSpinner name="crescent" /> Placing Order...
                </>
              ) : (
                `Place Order - ₱${state.total.toFixed(2)}`
              )}
            </IonButton>
          </div>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Checkout;