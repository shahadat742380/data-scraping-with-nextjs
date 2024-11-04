import { db } from '@/db';
import { register } from '@/db/schema';

async function deleteAllUsers() {
  try {
    await db.delete(register).execute();
    console.log('All users have been deleted from the register table.');
  } catch (error) {
    console.error('Error deleting users:', error);
  }
}

// Call the function to delete all users
deleteAllUsers();
