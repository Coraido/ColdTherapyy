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
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonBackButton,
  IonButtons,
  IonToast
} from '@ionic/react';
import { useParams } from 'react-router';
import { cart } from 'ionicons/icons';
import { flavors } from '../data/flavors';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { dispatch } = useCart();
  const [showToast, setShowToast] = useState(false);
  
  const product = flavors.find(flavor => flavor.id === parseInt(id || '0'));

  if (!product) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Product Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="error-message">
            <h2>Product not found</h2>
            <p>The product you're looking for doesn't exist.</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product
    });
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{product.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="product-detail">
          <img 
            src={`https://placehold.co/400x300?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            className="product-detail-image"
          />
          
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Premium Ice Cream</IonCardSubtitle>
              <IonCardTitle>{product.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="product-info">
                <p className="product-description">
                  Indulge in our premium {product.name.toLowerCase()} ice cream, made with the finest ingredients. 
                  Creamy, delicious, and perfect for any occasion. Each scoop is crafted to perfection 
                  to deliver an unforgettable taste experience.
                </p>
                
                <div className="product-specs">
                  <h3>Product Details:</h3>
                  <ul>
                    <li>16 oz container</li>
                    <li>Made with natural ingredients</li>
                    <li>No artificial preservatives</li>
                    <li>Gluten-free options available</li>
                  </ul>
                </div>
                
                <div className="price-section">
                  <span className="price">${product.price.toFixed(2)}</span>
                  <IonButton 
                    expand="block" 
                    color="primary" 
                    onClick={addToCart}
                    className="add-to-cart-btn"
                  >
                    <IonIcon icon={cart} slot="start" />
                    Add to Cart
                  </IonButton>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
        
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={`${product.name} added to cart!`}
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default ProductDetail;