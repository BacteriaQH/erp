import {
  checkUser,
  createUser,
  getUsers,
  updateUserById
} from '@functions/repositories/userRepository';

export const checkUserController = async ctx => {
  try {
    const {email, avatar} = ctx.request.body;
    const user = await checkUser(email);
    if (user && user.role.length > 0 && user.active) {
      if (user.avatar === '') {
        const updatedUser = await updateUserById(user.id, {avatar});
        return (ctx.body = {
          data: updatedUser,
          success: true
        });
      }
      return (ctx.body = {
        data: user,
        success: true
      });
    }
    ctx.status = 403;
    ctx.body = {
      err: {
        message: 'Forbidden'
      },
      success: false
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
};

export const createUserController = async ctx => {
  try {
    const createField = ctx.request.body;
    const user = await createUser({...createField, createdAt: new Date()});
    return (ctx.body = {
      data: user,
      success: true,
      message: 'User created'
    });
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
};
export const deleteUserController = async ctx => {
  try {
    const {id} = ctx.params;
    await updateUserById(id, {active: false});
    return (ctx.body = {
      success: true,
      message: 'User deleted'
    });
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
};

export const updateUserController = async ctx => {
  try {
    const {id} = ctx.params;
    const {updateFields} = ctx.request.body;

    const updatedUser = await updateUserById(id, updateFields);
    return (ctx.body = {
      data: updatedUser,
      success: true
    });
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
};

export const getUsersController = async ctx => {
  try {
    const {limit, sort} = ctx.request.query;
    const users = await getUsers(Number(limit), sort);
    return (ctx.body = {
      data: users,
      success: true,
      message: 'Users fetched'
    });
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
};

export const uploadUserController = async ctx => {
  try {
    console.log(ctx.request.file);
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
};
