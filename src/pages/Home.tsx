import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonBadge, IonMenuButton } from '@ionic/react';
import { cart } from 'ionicons/icons';
import { useState } from 'react';
import Carousel from '../components/Carousel';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import CartModal from '../components/CartModal';
import { useCart } from '../context/CartContext';
import './Home.css';

const Home: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <div slot="start" className="header-logo-container">
            <img src="/images/logo.png" alt="Cold Therapy Logo" className="header-logo" />
          </div>
          <IonTitle className="centered-title">Cold Therapy</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsCartOpen(true)} className="header-cart-button">
              <IonIcon icon={cart} />
              {totalItems > 0 && (
                <IonBadge color="danger" className="cart-badge">
                  {totalItems}
                </IonBadge>
              )}
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cold Therapy</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Carousel />
        <ProductGrid />
        <Footer />
        <CartModal isOpen={isCartOpen} onDidDismiss={() => setIsCartOpen(false)} />
      </IonContent>
    </IonPage>
  );
};

export default Home;
