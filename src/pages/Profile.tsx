import React, { useState } from 'react';
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
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonAvatar,
} from '@ionic/react';
import { personCircleOutline, mailOutline, callOutline, locationOutline, createOutline } from 'ionicons/icons';
import Footer from '../components/Footer';
import './Profile.css';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleSave = () => {
    setIsEditing(false);
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="profile-page">
          <div className="profile-header">
            <IonAvatar className="profile-avatar">
              <IonIcon icon={personCircleOutline} />
            </IonAvatar>
            <h1>Guest User</h1>
            <p>Ice Cream Enthusiast</p>
          </div>

          <IonCard className="profile-info-card">
            <IonCardHeader>
              <div className="card-header-with-action">
                <IonCardTitle>Personal Information</IonCardTitle>
                <IonButton
                  fill="clear"
                  onClick={() => setIsEditing(!isEditing)}
                  className="edit-btn"
                >
                  <IonIcon icon={createOutline} slot="start" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </IonButton>
              </div>
            </IonCardHeader>
            <IonCardContent>
              <IonItem className="profile-item">
                <IonIcon icon={personCircleOutline} slot="start" className="profile-icon" />
                <IonLabel position="stacked">Full Name</IonLabel>
                <IonInput
                  value={name}
                  onIonChange={e => setName(e.detail.value!)}
                  readonly={!isEditing}
                  placeholder="Enter your name"
                />
              </IonItem>

              <IonItem className="profile-item">
                <IonIcon icon={mailOutline} slot="start" className="profile-icon" />
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={e => setEmail(e.detail.value!)}
                  readonly={!isEditing}
                  placeholder="Enter your email"
                />
              </IonItem>

              <IonItem className="profile-item">
                <IonIcon icon={callOutline} slot="start" className="profile-icon" />
                <IonLabel position="stacked">Phone</IonLabel>
                <IonInput
                  type="tel"
                  value={phone}
                  onIonChange={e => setPhone(e.detail.value!)}
                  readonly={!isEditing}
                  placeholder="Enter your phone"
                />
              </IonItem>

              <IonItem className="profile-item">
                <IonIcon icon={locationOutline} slot="start" className="profile-icon" />
                <IonLabel position="stacked">Address</IonLabel>
                <IonInput
                  value={address}
                  onIonChange={e => setAddress(e.detail.value!)}
                  readonly={!isEditing}
                  placeholder="Enter your address"
                />
              </IonItem>

              {isEditing && (
                <IonButton
                  expand="block"
                  onClick={handleSave}
                  color="primary"
                  className="save-btn"
                >
                  Save Changes
                </IonButton>
              )}
            </IonCardContent>
          </IonCard>

          <IonCard className="stats-card">
            <IonCardHeader>
              <IonCardTitle>Account Stats</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">0</div>
                  <div className="stat-label">Total Orders</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">₱0.00</div>
                  <div className="stat-label">Total Spent</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">-</div>
                  <div className="stat-label">Favorite Flavor</div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard className="preferences-card">
            <IonCardHeader>
              <IonCardTitle>Quick Actions</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton expand="block" fill="outline" color="primary" routerLink="/orders" className="action-btn">
                View Order History
              </IonButton>
              <IonButton expand="block" fill="outline" color="primary" routerLink="/help" className="action-btn">
                Help & Support
              </IonButton>
              <IonButton expand="block" fill="outline" color="danger" className="action-btn">
                Sign Out
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
        <Footer />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Profile updated successfully!"
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
