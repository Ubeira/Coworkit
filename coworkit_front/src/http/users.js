import {
  fetchApi,
  fetchFormData,
  requestMethods,
} from "../shared/utils/fetchFunctions";

const endpoints = {
  login: "/users/login",
  userInfo: "/users/",
  editUser: "/users/",
  filterUsers: "/users",
  signUp: "/users/",
  editPassword: "/users/changePassword/",
  deleteUser: "/users/",
  validateUser: "/users/validate",
  recoverPassword: "/users/recoverPassword",
  resetPassword: "/users/resetPassword",
  contactUser: "/users/contact/",
};

export async function deleteUser(userId) {
  try {
    await fetchFormData(`${endpoints.deleteUser}${userId}`, {
      method: requestMethods.delete,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function login(loginData) {
  const tokenData = await fetchApi(endpoints.login, {
    method: requestMethods.post,
    body: { ...loginData },
  });
  if (tokenData.status === "ok") {
    const token = tokenData.data.token;
    localStorage.setItem("token", token);
    return token;
  } else {
    return tokenData;
  }
}

export async function signUpApi(registerData) {
  delete registerData.ConfirmPassword;
  return await fetchApi(endpoints.signUp, {
    method: requestMethods.post,
    body: { ...registerData },
  });
}

export async function getUserInfo(userId) {
  const userData = await fetchApi(`${endpoints.userInfo}${userId}`, {
    method: requestMethods.get,
  });
  return userData.data;
}

export async function filterUsersAdmin(query = "", order = "", direction = "") {
  const ordenation = `order=${order}&direction=${direction}`;
  const userData = await fetchApi(
    `${endpoints.filterUsers}${query}${ordenation}`,
    {
      method: requestMethods.get,
    }
  );
  return userData.data;
}

export async function changePasswordInAPI(data) {
  return await fetchApi(`${endpoints.editPassword}${data.userId}`, {
    method: requestMethods.put,
    body: { oldPassword: data.oldPassword, newPassword: data.newPassword },
  });
}

export async function newEntry(data) {
  const body = new FormData();
  body.append("place", data.place);
  body.append("description", data.description);
  body.append("foto1", data.foto1[0]);

  return await fetchApi(endpoints.entries, {
    method: requestMethods.post,
    body,
  });
}
export async function validateUserApi(code) {
  return await fetchApi(`${endpoints.validateUser}/${code}`, {
    method: requestMethods.get,
  });
}
export async function recoverPasswordApi(body) {
  return await fetchApi(`${endpoints.recoverPassword}`, {
    method: requestMethods.post,
    body,
  });
}
export async function changePasswordApi(userId) {
  return await fetchApi(``);
}
export async function resetPasswordApi(data) {
  return await fetchApi(`${endpoints.resetPassword}`, {
    method: requestMethods.put,
    body: { ...data },
  });
}

export async function updateUserInfo(data, userId) {
  userId = userId ? userId : data.userId;
  const body = new FormData();
  body.append("name", data.name);
  body.append("surname", data.surname);
  body.append("nif", data.nif);
  body.append("company", data.company);
  body.append("tel", data.tel);
  body.append("email", data.email);
  data?.deletePhoto && body.append("deletePhoto", Number(data.deletePhoto));
  data?.admin && body.append("admin", Number(data.admin));
  data?.deleted && body.append("deleted", Number(data.deleted));
  data?.photo && body.append("photo", data?.photo[0]);

  return await fetchFormData(`${endpoints.editUser}${userId}`, {
    method: requestMethods.put,
    body,
  });
}

export async function contactUsers(body, reportId) {
  await fetchApi(`${endpoints.contactUser}${reportId}`, {
    method: requestMethods.post,
    body,
  });
}
