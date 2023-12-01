import {checkUser, updateUserById} from '@functions/repositories/userRepository';

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
