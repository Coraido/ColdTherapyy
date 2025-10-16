// Test Firebase Connection
// Import this in any component to test Firebase

import { db } from './config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function testFirebaseConnection() {
  try {
    console.log('🔥 Testing Firebase connection...');
    
    // Try to add a test document
    const testRef = await addDoc(collection(db, 'test_connection'), {
      message: 'Hello from Cold Therapy!',
      timestamp: new Date().toISOString(),
      testNumber: Math.random()
    });
    
    console.log('✅ SUCCESS! Firebase is connected!');
    console.log('📄 Test document ID:', testRef.id);
    
    // Try to read the document back
    const querySnapshot = await getDocs(collection(db, 'test_connection'));
    console.log('📚 Total test documents:', querySnapshot.size);
    
    console.log('🎉 Firebase is working perfectly!');
    return { success: true, docId: testRef.id };
    
  } catch (error: any) {
    console.error('❌ Error connecting to Firebase:', error);
    console.log('\n🔍 Troubleshooting:');
    console.log('1. Make sure you enabled Firestore Database in Firebase Console');
    console.log('2. Check that Firestore is in "test mode"');
    console.log('3. Verify your Firebase config in config.ts');
    return { success: false, error: error.message };
  }
}
