# Firebase Integration Guide for Cold Therapy

This guide will help you connect your Cold Therapy app to Firebase for database, authentication, and storage.

---

## 🔥 Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `Cold Therapy` or `ColdTherapy`
4. Disable Google Analytics (optional, can enable later)
5. Click **"Create project"**

---

## 🌐 Step 2: Register Your Web App

1. In Firebase Console, click the **Web icon** (`</>`)
2. Register app nickname: `Cold Therapy Web`
3. **Optional**: Check "Also set up Firebase Hosting"
4. Click **"Register app"**
5. **Copy the configuration object** - you'll need this!

Example configuration:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAbc123...",
  authDomain: "cold-therapy.firebaseapp.com",
  projectId: "cold-therapy",
  storageBucket: "cold-therapy.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

---

## ⚙️ Step 3: Configure Firebase in Your App

1. Open the file: `src/firebase/config.ts`
2. **Replace** the placeholder values with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",           // Replace this
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // Replace this
  projectId: "YOUR_PROJECT_ID",     // Replace this
  storageBucket: "YOUR_PROJECT_ID.appspot.com",   // Replace this
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // Replace this
  appId: "YOUR_APP_ID"              // Replace this
};
```

3. **Save the file**

---

## 🗄️ Step 4: Enable Firestore Database

1. In Firebase Console, go to **"Firestore Database"** in the left menu
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
4. Choose your location (e.g., `asia-southeast1` for Singapore/Philippines)
5. Click **"Enable"**

### Security Rules (Development)
For testing, use these rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Security Rules (Production - Later)
Before launching, update to proper security:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
    
    match /contact_messages/{messageId} {
      allow create: if true;  // Anyone can submit contact form
      allow read, update, delete: if false;  // Only admins can read (set up admin logic)
    }
  }
}
```

---

## 🔐 Step 5: Enable Authentication

1. In Firebase Console, go to **"Authentication"** in the left menu
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable **"Email/Password"**
5. Click **"Save"**

---

## 📦 Step 6: Enable Storage (Optional)

If you want to store product images or user uploads:

1. In Firebase Console, go to **"Storage"**
2. Click **"Get started"**
3. Use test mode for now
4. Click **"Done"**

---

## 🚀 Step 7: Use Firebase in Your App

### Example: Save Order to Firebase

Update your `Checkout.tsx` to save orders to Firebase:

```typescript
import { createOrder } from '../firebase/firestore';

// Inside your handlePlaceOrder function:
const handlePlaceOrder = async () => {
  if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.phone || !shippingInfo.address) {
    setShowToast(true);
    return;
  }

  // Save to Firebase
  const orderData = {
    userId: 'guest', // Replace with actual user ID when auth is implemented
    items: state.items,
    total: state.total,
    status: 'pending' as const,
    shippingInfo
  };

  const result = await createOrder(orderData);
  
  if (result.success) {
    console.log('Order saved to Firebase with ID:', result.orderId);
    dispatch({ type: 'CLEAR_CART' });
    setOrderPlaced(true);
  } else {
    console.error('Failed to save order:', result.error);
  }
};
```

### Example: Save Contact Form to Firebase

Update your `Contact.tsx`:

```typescript
import { submitContactForm } from '../firebase/firestore';

const handleSubmit = async () => {
  const result = await submitContactForm({
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message
  });

  if (result.success) {
    setShowToast(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  }
};
```

---

## 📊 Step 8: View Your Data in Firebase

1. Go to Firebase Console
2. Click **"Firestore Database"**
3. You'll see your collections and documents appear as users interact with your app:
   - `orders` - All customer orders
   - `users` - User profiles
   - `contact_messages` - Contact form submissions

---

## 🔍 Useful Firebase Features

### Firestore Database Collections Structure

```
📁 cold-therapy (Firebase Project)
  ├── 📦 orders/
  │   ├── {orderId}/
  │   │   ├── userId: "guest"
  │   │   ├── items: [...]
  │   │   ├── total: 540
  │   │   ├── status: "pending"
  │   │   ├── shippingInfo: {...}
  │   │   ├── createdAt: timestamp
  │   │   └── updatedAt: timestamp
  │
  ├── 📦 users/
  │   ├── {userId}/
  │   │   ├── name: "Juan Dela Cruz"
  │   │   ├── email: "juan@example.com"
  │   │   ├── phone: "09123456789"
  │   │   └── address: "Manila, Philippines"
  │
  └── 📦 contact_messages/
      ├── {messageId}/
      │   ├── name: "Customer Name"
      │   ├── email: "customer@example.com"
      │   ├── subject: "Question"
      │   ├── message: "..."
      │   ├── status: "unread"
      │   └── createdAt: timestamp
```

---

## 🛠️ Next Steps

1. **Replace the config values** in `src/firebase/config.ts`
2. **Test the connection** by placing an order
3. **Check Firebase Console** to see if data appears
4. **Implement authentication** for user accounts
5. **Set up proper security rules** before going to production

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Storage](https://firebase.google.com/docs/storage)

---

## ⚠️ Important Notes

- **Never commit your Firebase config to public repositories** without proper security
- Use **environment variables** for production (see `.env` file setup)
- **Enable proper security rules** before launching to production
- **Monitor your Firebase usage** to avoid unexpected charges

---

## 🐛 Troubleshooting

### "Firebase not initialized"
- Make sure you replaced the config values in `config.ts`
- Check if Firebase is imported correctly

### "Permission denied"
- Check your Firestore security rules
- Make sure you enabled the required services (Firestore, Auth)

### "Quota exceeded"
- Firebase free tier has limits
- Check usage in Firebase Console > Usage tab

---

Good luck with your Firebase integration! 🎉
