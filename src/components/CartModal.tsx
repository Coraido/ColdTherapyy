import React from 'react';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonText
} from '@ionic/react';
import { cart, close, add, remove, trash } from 'ionicons/icons';
import { useCart } from '../context/CartContext';
import './CartModal.css';

interface CartModalProps {
  isOpen: boolean;
  onDidDismiss: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onDidDismiss }) => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDidDismiss}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Shopping Cart</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDidDismiss}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {state.items.length === 0 ? (
          <div className="empty-cart">
            <IonIcon icon={cart} size="large" />
            <h2>Your cart is empty</h2>
            <p>Add some delicious ice cream to get started!</p>
          </div>
        ) : (
          <>
            <IonList>
              {state.items.map((item) => (
                <IonItem key={item.id}>
                  <IonGrid>
                    <IonRow>
                      <IonCol size="8">
                        <IonLabel>
                          <h2>{item.name}</h2>
                          <p>${item.price.toFixed(2)} each</p>
                        </IonLabel>
                      </IonCol>
                      <IonCol size="4" className="cart-controls">
                        <div className="quantity-controls">
                          <IonButton
                            size="small"
                            fill="clear"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <IonIcon icon={remove} />
                          </IonButton>
                          <span className="quantity">{item.quantity}</span>
                          <IonButton
                            size="small"
                            fill="clear"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <IonIcon icon={add} />
                          </IonButton>
                        </div>
                        <IonButton
                          size="small"
                          fill="clear"
                          color="danger"
                          onClick={() => removeItem(item.id)}
                        >
                          <IonIcon icon={trash} />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonItem>
              ))}
            </IonList>
            <div className="cart-summary">
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonText color="dark">
                      <h2>Total: ${state.total.toFixed(2)}</h2>
                    </IonText>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonButton expand="block" color="primary" routerLink="/checkout" onClick={onDidDismiss}>
                      Proceed to Checkout
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </div>
          </>
        )}
      </IonContent>
    </IonModal>
  );
};

export default CartModal;