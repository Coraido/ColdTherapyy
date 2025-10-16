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
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSpinner,
  IonIcon,
  IonToast,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import { mailOutline, lockClosedOutline, personOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { signUp } from '../firebase/auth';
import { saveUserProfile } from '../firebase/firestore';
import './Signup.css';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');
  const history = useHistory();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setToastMessage('Please fill in all fields');
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    if (password.length < 6) {
      setToastMessage('Password must be at least 6 characters');
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    if (password !== confirmPassword) {
      setToastMessage('Passwords do not match');
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    setLoading(true);

    try {
      // Create Firebase auth account
      const result = await signUp(email, password, name);

      if (result.success && result.user) {
        console.log('✅ Signup successful!', result.user);

        // Save user profile to Firestore
        await saveUserProfile(result.user.uid, {
          name,
          email,
          phone: '',
          address: ''
        });

        setToastMessage('Account created successfully!');
        setToastColor('success');
        setShowToast(true);

        // Redirect to profile after short delay
        setTimeout(() => {
          history.push('/profile');
        }, 1500);
      } else {
        console.error('❌ Signup failed:', result.error);
        setToastMessage(result.error || 'Signup failed. Please try again.');
        setToastColor('danger');
        setShowToast(true);
      }
    } catch (error: any) {
      console.error('❌ Signup error:', error);
      setToastMessage('An error occurred. Please try again.');
      setToastColor('danger');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="signup-content">
        <div className="signup-container">
          <div className="signup-header">
            <h1>Create Account</h1>
            <p>Join Cold Therapy today!</p>
          </div>

          <IonCard className="signup-card">
            <IonCardHeader>
              <IonCardTitle>Sign Up</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleSignup}>
                <div className="input-group">
                  <label className="input-label">
                    <IonIcon icon={personOutline} color="secondary" />
                    Full Name
                  </label>
                  <IonItem className="signup-item" lines="none">
                    <IonInput
                      type="text"
                      value={name}
                      onIonChange={e => setName(e.detail.value!)}
                      placeholder="Juan Dela Cruz"
                      required
                    />
                  </IonItem>
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <IonIcon icon={mailOutline} color="secondary" />
                    Email
                  </label>
                  <IonItem className="signup-item" lines="none">
                    <IonInput
                      type="email"
                      value={email}
                      onIonChange={e => setEmail(e.detail.value!)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </IonItem>
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <IonIcon icon={lockClosedOutline} color="secondary" />
                    Password
                  </label>
                  <IonItem className="signup-item" lines="none">
                    <IonInput
                      type="password"
                      value={password}
                      onIonChange={e => setPassword(e.detail.value!)}
                      placeholder="At least 6 characters"
                      required
                    />
                  </IonItem>
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <IonIcon icon={lockClosedOutline} color="secondary" />
                    Confirm Password
                  </label>
                  <IonItem className="signup-item" lines="none">
                    <IonInput
                      type="password"
                      value={confirmPassword}
                      onIonChange={e => setConfirmPassword(e.detail.value!)}
                      placeholder="Re-enter password"
                      required
                    />
                  </IonItem>
                </div>

                <IonButton
                  expand="block"
                  type="submit"
                  color="primary"
                  className="signup-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <IonSpinner name="crescent" /> Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </IonButton>

                <div className="signup-footer">
                  <IonText color="medium">
                    <p>
                      Already have an account?{' '}
                      <span
                        className="login-link"
                        onClick={() => history.push('/login')}
                      >
                        Sign in here
                      </span>
                    </p>
                  </IonText>
                </div>
              </form>
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color={toastColor}
        />
      </IonContent>
    </IonPage>
  );
};

export default Signup;
