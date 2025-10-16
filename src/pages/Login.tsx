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
import { mailOutline, lockClosedOutline, personAddOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { signIn } from '../firebase/auth';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState<'success' | 'danger'>('success');
  const history = useHistory();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setToastMessage('Please fill in all fields');
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    setLoading(true);

    try {
      const result = await signIn(email, password);

      if (result.success) {
        console.log('✅ Login successful!', result.user);
        setToastMessage('Welcome back!');
        setToastColor('success');
        setShowToast(true);
        
        // Redirect to profile after short delay
        setTimeout(() => {
          history.push('/profile');
        }, 1000);
      } else {
        console.error('❌ Login failed:', result.error);
        setToastMessage(result.error || 'Login failed. Please try again.');
        setToastColor('danger');
        setShowToast(true);
      }
    } catch (error: any) {
      console.error('❌ Login error:', error);
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
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="login-content">
        <div className="login-container">
          <div className="login-header">
            <h1>Welcome Back!</h1>
            <p>Sign in to access your account</p>
          </div>

          <IonCard className="login-card">
            <IonCardHeader>
              <IonCardTitle>Sign In</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <form onSubmit={handleLogin}>
                <div className="input-group">
                  <label className="input-label">
                    <IonIcon icon={mailOutline} color="secondary" />
                    Email
                  </label>
                  <IonItem className="login-item" lines="none">
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
                  <IonItem className="login-item" lines="none">
                    <IonInput
                      type="password"
                      value={password}
                      onIonChange={e => setPassword(e.detail.value!)}
                      placeholder="Enter your password"
                      required
                    />
                  </IonItem>
                </div>

                <IonButton
                  expand="block"
                  type="submit"
                  color="primary"
                  className="login-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <IonSpinner name="crescent" /> Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </IonButton>

                <div className="login-footer">
                  <IonText color="medium">
                    <p>
                      Don't have an account?{' '}
                      <span
                        className="signup-link"
                        onClick={() => history.push('/signup')}
                      >
                        Sign up here
                      </span>
                    </p>
                  </IonText>
                </div>
              </form>
            </IonCardContent>
          </IonCard>

          <IonCard className="demo-card">
            <IonCardContent>
              <IonText color="medium">
                <p className="demo-text">
                  <strong>Demo Account:</strong><br />
                  Email: demo@coldtherapy.com<br />
                  Password: demo123
                </p>
              </IonText>
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

export default Login;
