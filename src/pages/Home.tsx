import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon, IonBadge, IonMenuButton } from '@ionic/react';
import { cart, homeOutline, informationCircleOutline, callOutline, helpCircleOutline, downloadOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Carousel from '../components/Carousel';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import CartModal from '../components/CartModal';
import { useCart } from '../context/CartContext';
import './Home.css';

const Home: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { state } = useCart();
  const history = useHistory();

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleDownloadAPK = () => {
    // You can link this to your actual APK download URL
    alert('APK download will be available soon!');
  };

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
          
          {/* Desktop Navigation Buttons */}
          <IonButtons slot="end" className="desktop-nav-buttons">
            <IonButton routerLink="/home">
              <IonIcon slot="start" icon={homeOutline} />
              Home
            </IonButton>
            <IonButton routerLink="/about">
              <IonIcon slot="start" icon={informationCircleOutline} />
              About
            </IonButton>
            <IonButton routerLink="/contact">
              <IonIcon slot="start" icon={callOutline} />
              Contact
            </IonButton>
            <IonButton routerLink="/help">
              <IonIcon slot="start" icon={helpCircleOutline} />
              Help
            </IonButton>
            <IonButton color="secondary" onClick={handleDownloadAPK}>
              <IonIcon slot="start" icon={downloadOutline} />
              Download App
            </IonButton>
          </IonButtons>

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
