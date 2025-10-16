import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './config';

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  ORDERS: 'orders',
  PRODUCTS: 'products',
  CART: 'cart'
};

// ========== ORDERS ==========

export interface Order {
  id?: string;
  userId: string;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  shippingInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Create a new order
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTIONS.ORDERS), {
      ...orderData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return { success: true, orderId: docRef.id };
  } catch (error) {
    console.error('Error creating order:', error);
    return { success: false, error };
  }
};

// Get all orders for a user
export const getUserOrders = async (userId: string) => {
  try {
    console.log('🔍 Querying orders for userId:', userId);
    const q = query(
      collection(db, COLLECTIONS.ORDERS),
      where('userId', '==', userId)
    );
    const querySnapshot = await getDocs(q);
    console.log('📦 Query snapshot size:', querySnapshot.size);
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      console.log('📄 Order doc:', doc.id, doc.data());
      orders.push({ id: doc.id, ...doc.data() } as Order);
    });
    // Sort orders by createdAt in memory instead of Firestore query
    orders.sort((a, b) => {
      const aTime = a.createdAt instanceof Timestamp ? a.createdAt.toMillis() : 0;
      const bTime = b.createdAt instanceof Timestamp ? b.createdAt.toMillis() : 0;
      return bTime - aTime;
    });
    console.log('✅ Returning orders:', orders.length);
    return { success: true, orders };
  } catch (error) {
    console.error('❌ Error getting orders:', error);
    return { success: false, error, orders: [] };
  }
};

// Get a single order by ID
export const getOrder = async (orderId: string) => {
  try {
    const docRef = doc(db, COLLECTIONS.ORDERS, orderId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, order: { id: docSnap.id, ...docSnap.data() } as Order };
    }
    return { success: false, error: 'Order not found' };
  } catch (error) {
    console.error('Error getting order:', error);
    return { success: false, error };
  }
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: Order['status']) => {
  try {
    const docRef = doc(db, COLLECTIONS.ORDERS, orderId);
    await updateDoc(docRef, {
      status,
      updatedAt: Timestamp.now()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating order:', error);
    return { success: false, error };
  }
};

// ========== USER PROFILE ==========

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create or update user profile
export const saveUserProfile = async (userId: string, profileData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = doc(db, COLLECTIONS.USERS, userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      // Update existing profile
      await updateDoc(docRef, {
        ...profileData,
        updatedAt: Timestamp.now()
      });
    } else {
      // Create new profile
      await addDoc(collection(db, COLLECTIONS.USERS), {
        ...profileData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
    }
    return { success: true };
  } catch (error) {
    console.error('Error saving profile:', error);
    return { success: false, error };
  }
};

// Get user profile
export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(db, COLLECTIONS.USERS, userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, profile: { id: docSnap.id, ...docSnap.data() } as UserProfile };
    }
    return { success: false, error: 'Profile not found' };
  } catch (error) {
    console.error('Error getting profile:', error);
    return { success: false, error };
  }
};

// ========== CONTACT FORM ==========

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: 'unread' | 'read' | 'replied';
}

// Submit contact form
export const submitContactForm = async (messageData: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
  try {
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      ...messageData,
      status: 'unread',
      createdAt: Timestamp.now()
    });
    return { success: true, messageId: docRef.id };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error };
  }
};
