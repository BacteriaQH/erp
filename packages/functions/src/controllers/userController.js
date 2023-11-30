import {checkUser, updateUserById} from '@functions/repositories/userRepository';

export const checkUserController = async ctx => {
  try {
    const {email, avatar} = ctx.request.body;
    const user = await checkUser(email);
    if (!user || user.role.length < 0 || !user.active) {
      ctx.body = {
        data: {},
        success: true
      };
    }
    if (user.avatar === '') {
      const updatedUser = await updateUserById(user.id, {avatar});
      return (ctx.body = {
        data: updatedUser,
        success: true
      });
    }
    ctx.body = {
      data: user,
      success: true
    };
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
};
