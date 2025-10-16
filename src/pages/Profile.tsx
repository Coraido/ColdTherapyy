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
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonAvatar,
  IonSpinner,
} from '@ionic/react';
import { personCircleOutline, mailOutline, callOutline, locationOutline, createOutline, logOutOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { getCurrentUser, logOut } from '../firebase/auth';
import { getUserProfile, saveUserProfile } from '../firebase/firestore';
import { getUserOrders } from '../firebase/firestore';
import Footer from '../components/Footer';
import './Profile.css';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [user, setUser] = useState<any>(null);
  const history = useHistory();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    const currentUser = getCurrentUser();

    if (!currentUser) {
      // Not logged in, redirect to login
      history.push('/login');
      return;
    }

    setUser(currentUser);
    setEmail(currentUser.email || '');
    setName(currentUser.displayName || '');

    // Load user profile from Firestore
    const profileResult = await getUserProfile(currentUser.uid);
    if (profileResult.success && profileResult.profile) {
      setName(profileResult.profile.name || currentUser.displayName || '');
      setEmail(profileResult.profile.email || currentUser.email || '');
      setPhone(profileResult.profile.phone || '');
      setAddress(profileResult.profile.address || '');
    }

    // Load user orders to calculate stats
    const ordersResult = await getUserOrders(currentUser.uid);
    if (ordersResult.success && ordersResult.orders) {
      setTotalOrders(ordersResult.orders.length);
      const spent = ordersResult.orders.reduce((sum, order) => sum + order.total, 0);
      setTotalSpent(spent);
    }

    setLoading(false);
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);

    try {
      const result = await saveUserProfile(user.uid, {
        name,
        email,
        phone,
        address
      });

      if (result.success) {
        setIsEditing(false);
        setToastMessage('Profile updated successfully!');
        setShowToast(true);
      } else {
        setToastMessage('Failed to update profile');
        setShowToast(true);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setToastMessage('An error occurred');
      setShowToast(true);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    const result = await logOut();
    if (result.success) {
      history.push('/home');
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
            <IonTitle>My Profile</IonTitle>
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
          <IonTitle>My Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="profile-page">
          <div className="profile-header">
            <IonAvatar className="profile-avatar">
              <IonIcon icon={personCircleOutline} />
            </IonAvatar>
            <h1>{name || user?.displayName || 'User'}</h1>
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
                  disabled={saving}
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
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <IonSpinner name="crescent" /> Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
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
                  <div className="stat-number">{totalOrders}</div>
                  <div className="stat-label">Total Orders</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">₱{totalSpent.toFixed(2)}</div>
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
              <IonButton expand="block" fill="outline" color="danger" className="action-btn" onClick={handleLogout}>
                <IonIcon icon={logOutOutline} slot="start" />
                Sign Out
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
        <Footer />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
