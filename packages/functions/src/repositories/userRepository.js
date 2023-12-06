import firebaseAdmin from '@functions/config/firebaseAdmin';

const userRef = firebaseAdmin.firestore().collection('users');

/**
 * @param {string} email
 * @returns {Object}
 */
export const checkUser = async email => {
  try {
    const userSnapshot = await userRef.where('email', '==', email).get();
    const user = userSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return user[0];
  } catch (e) {
    console.log(e);
  }
};

/**
 * @param {string} id
 * @returns {Object}
 */
const getUserById = async id => {
  try {
    const userSnapshot = await userRef.doc(id).get();
    const user = userSnapshot.data();
    if (!user) return 'User not found';
    return user;
  } catch (e) {
    console.log(e);
  }
};

/**
 * @param {string} id
 * @param {Object} updateFields
 * @returns {Object}
 */
export const updateUserById = async (id, updateFields) => {
  try {
    await userRef.doc(id).set(updateFields, {merge: true});
    return await getUserById(id);
  } catch (e) {
    console.log(e);
  }
};

/**
 * @param {number} limit
 * @param {"desc"|| "asc"} sort
 * @returns {Object}
 */
export const getUsers = async (limit, sort) => {
  try {
    const usersSnapshot = await userRef
      .limit(limit | 20)
      .orderBy('createdAt', sort)
      .get();
    return usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (e) {
    console.log(e);
  }
};

export const createUser = async fieldUpdate => {
  try {
    const res = await userRef.add(fieldUpdate);
    console.log('Added document with ID: ', res.id);
    const newUser = await getUserById(res.id);
    return {
      id: res.id,
      ...newUser
    };
  } catch (e) {
    console.log(e);
  }
};
