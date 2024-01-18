import Api from '../../api/api';

const loginUser = async (login, password) => {
  try {
    // TODO change the WS url and body
    // const res = await Api.post("/.......", {
    //   login: login,
    //   password: password,
    // });
    const res = 'token';
    return res;
  } catch (e) {
    return { error: { message: e.message } };
  }
};

const getUserInfos = async () => {
  try {
    // TODO implement WS
    const res = {
      firstname: 'testUser',
      lastname: 'test',
      id: 1,
      email: 'test@test.com',
    };
    return res;
  } catch (e) {
    return { error: { message: e.message } };
  }
};

const refreshAuthToken = async () => {
  try {
    // TODO implement WS
    const res = 'tokenRefresh';
    return res;
  } catch (e) {
    return { error: { message: e.message } };
  }
};

export default {
  loginUser,
  getUserInfos,
  refreshAuthToken,
};
