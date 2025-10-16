# 🔥 Firebase Quick Start Checklist

## ✅ What I've Done For You:

1. ✅ Installed Firebase SDK (`npm install firebase`)
2. ✅ Created `src/firebase/config.ts` - Firebase configuration file
3. ✅ Created `src/firebase/firestore.ts` - Database functions (orders, users, contact)
4. ✅ Created `src/firebase/auth.ts` - Authentication functions (sign up, sign in, sign out)
5. ✅ Created `FIREBASE_SETUP.md` - Complete setup guide
6. ✅ Created example integration code

---

## 🎯 What You Need To Do:

### 1️⃣ Get Your Firebase Config (5 minutes)

1. Go to: https://console.firebase.google.com/
2. Create a new project called "Cold Therapy"
3. Add a web app (click the `</>` icon)
4. Copy the `firebaseConfig` object

### 2️⃣ Update Config File (2 minutes)

Open `src/firebase/config.ts` and replace these lines:

```typescript
apiKey: "YOUR_API_KEY",                          // ← Replace
authDomain: "YOUR_PROJECT_ID.firebaseapp.com",   // ← Replace
projectId: "YOUR_PROJECT_ID",                    // ← Replace
storageBucket: "YOUR_PROJECT_ID.appspot.com",    // ← Replace
messagingSenderId: "YOUR_MESSAGING_SENDER_ID",   // ← Replace
appId: "YOUR_APP_ID"                             // ← Replace
```

### 3️⃣ Enable Firestore (3 minutes)

1. In Firebase Console, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode"
4. Select location: `asia-southeast1` (Singapore - closest to Philippines)
5. Click "Enable"

### 4️⃣ Enable Authentication (2 minutes)

1. In Firebase Console, click "Authentication"
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password"
5. Click "Save"

### 5️⃣ Test It! (5 minutes)

Place a test order in your app, then check Firebase Console > Firestore Database to see if the order appears!

---

## 📦 Collections That Will Be Created:

When users interact with your app, these collections will automatically appear:

- **`orders`** - Customer orders with items, total, shipping info
- **`users`** - User profiles with name, email, phone, address
- **`contact_messages`** - Messages from your Contact page

---

## 🚀 Ready-to-Use Functions:

Import these in any component:

```typescript
// Orders
import { createOrder, getUserOrders, getOrder, updateOrderStatus } from './firebase/firestore';

// Users
import { saveUserProfile, getUserProfile } from './firebase/firestore';

// Contact Form
import { submitContactForm } from './firebase/firestore';

// Authentication
import { signUp, signIn, logOut, getCurrentUser } from './firebase/auth';
```

---

## 💡 Example Usage:

### Save Order (in Checkout.tsx):
```typescript
const result = await createOrder({
  userId: 'guest',
  items: state.items,
  total: state.total,
  status: 'pending',
  shippingInfo: { name, email, phone, address }
});

if (result.success) {
  console.log('Order ID:', result.orderId);
}
```

### Save Contact Message (in Contact.tsx):
```typescript
const result = await submitContactForm({
  name: formData.name,
  email: formData.email,
  subject: formData.subject,
  message: formData.message
});
```

---

## 🔒 Security Note:

**Current setup is for DEVELOPMENT only!**

Before going live:
1. Update Firestore security rules
2. Enable proper authentication
3. Restrict database access to authenticated users only

See `FIREBASE_SETUP.md` for production security rules.

---

## 📖 Full Documentation:

See `FIREBASE_SETUP.md` for detailed instructions, troubleshooting, and examples.

---

**Total Time: ~20 minutes** ⏱️

Need help? Check the setup guide or Firebase documentation!
