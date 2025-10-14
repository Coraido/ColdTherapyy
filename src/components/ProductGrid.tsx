import React, { useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonGrid, IonRow, IonCol, IonToast } from '@ionic/react';
import { flavors } from '../data/flavors';
import { useCart } from '../context/CartContext';
import './ProductGrid.css';

const ProductGrid: React.FC = () => {
  const { dispatch } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const addToCart = (flavor: typeof flavors[0]) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: flavor
    });
    setToastMessage(`${flavor.name} added to cart!`);
    setShowToast(true);
  };
  return (
    <div className="product-grid">
      <h2>Our Ice Cream Flavors</h2>
      <IonGrid>
        <IonRow>
          {flavors.map((flavor) => (
            <IonCol size="12" sizeMd="6" sizeLg="4" key={flavor.id}>
              <IonCard className="product-card" key={flavor.id}>
                <div className="product-image-container">
                  <img 
                    src={flavor.image} 
                    alt={flavor.name}
                    className="product-image"
                    onClick={() => window.location.href = `/product/${flavor.id}`}
                  />
                </div>
                <IonCardHeader>
                  <IonCardTitle>{flavor.name}</IonCardTitle>
                  {flavor.description && (
                    <p className="product-description">{flavor.description}</p>
                  )}
                </IonCardHeader>
                <IonCardContent>
                  <p className="product-price">₱{flavor.price.toFixed(2)}</p>
                  <IonButton 
                    expand="block" 
                    color="primary"
                    onClick={() => addToCart(flavor)}
                  >
                    Add to Cart
                  </IonButton>
                  <IonButton 
                    expand="block" 
                    fill="outline" 
                    color="primary"
                    routerLink={`/product/${flavor.id}`}
                    className="view-details-btn"
                  >
                    View Details
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={2000}
        color="success"
      />
    </div>
  );
};

export default ProductGrid;