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
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { heartOutline, leafOutline, ribbonOutline, peopleOutline } from 'ionicons/icons';
import Footer from '../components/Footer';
import './About.css';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>About Us</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="about-page">
          <div className="about-hero">
            <img 
              src="https://media.istockphoto.com/id/683468832/photo/ice-cream-scoops-in-white-cups-of-chocolate-strawberry-vanilla-and-green-tea-flavours-isolated.jpg?s=612x612&w=0&k=20&c=VulWuv4JmJx7MkuIvaG2H0A7rtSqSLl81inLSaFHFYk=" 
              alt="Cold Therapy Ice Cream" 
              className="about-hero-image"
            />
            <div className="about-hero-overlay">
              <h1>Welcome to Cold Therapy</h1>
              <p>Your Premium Ice Cream Destination</p>
            </div>
          </div>

          <IonCard className="about-card">
            <IonCardHeader>
              <IonCardTitle>Our Story</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Cold Therapy was founded with a simple mission: to bring joy and refreshment to every customer 
                through the finest ice cream creations. Since our inception, we've been dedicated to crafting 
                premium ice cream using only the best ingredients and traditional methods.
              </p>
              <p>
                What started as a small ice cream shop has grown into a beloved destination for ice cream 
                enthusiasts. We believe that every scoop should be an experience, a moment of pure bliss 
                that brings smiles and creates lasting memories.
              </p>
            </IonCardContent>
          </IonCard>

          <div className="values-section">
            <h2>Our Values</h2>
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="6">
                  <IonCard className="value-card">
                    <div className="value-icon">
                      <IonIcon icon={heartOutline} />
                    </div>
                    <IonCardHeader>
                      <IonCardTitle>Quality First</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      We use only premium, natural ingredients to create our delicious ice cream flavors.
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonCard className="value-card">
                    <div className="value-icon">
                      <IonIcon icon={leafOutline} />
                    </div>
                    <IonCardHeader>
                      <IonCardTitle>Natural Ingredients</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      No artificial preservatives or flavors. Just pure, natural goodness in every scoop.
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonCard className="value-card">
                    <div className="value-icon">
                      <IonIcon icon={ribbonOutline} />
                    </div>
                    <IonCardHeader>
                      <IonCardTitle>Award Winning</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      Our ice cream has won multiple awards for taste and quality excellence.
                    </IonCardContent>
                  </IonCard>
                </IonCol>
                <IonCol size="12" sizeMd="6">
                  <IonCard className="value-card">
                    <div className="value-icon">
                      <IonIcon icon={peopleOutline} />
                    </div>
                    <IonCardHeader>
                      <IonCardTitle>Community Love</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      We're proud to be part of the community and serve happiness one scoop at a time.
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

          <IonCard className="mission-card">
            <IonCardHeader>
              <IonCardTitle>Our Mission</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                To provide the highest quality ice cream experience while bringing joy, comfort, and refreshment 
                to our customers. We believe in creating not just ice cream, but moments of happiness that bring 
                people together.
              </p>
            </IonCardContent>
          </IonCard>
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default About;
