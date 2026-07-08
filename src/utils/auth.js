const USERS_KEY = 'envanter_users';

export function getUsers() {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (!users.some((u) => u.email === 'a@a')) {
      users.push({
        firstName: "Test",
        lastName: "User",
        email: "a@a",
        password: "a"
      });
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    return users;
  } catch {
    return [{
      firstName: "Test",
      lastName: "User",
      email: "a@a",
      password: "a"
    }];
  }
}

export function registerUser({ firstName, lastName, email, password }) {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some((u) => u.email === normalizedEmail)) {
    return { ok: false, error: 'Bu e-posta adresi zaten kayıtlı' };
  }

  users.push({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: normalizedEmail,
    password,
  });

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { ok: true };
}

export function loginUser(email, password) {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((u) => u.email === normalizedEmail);

  if (!user) {
    return { ok: false, error: 'Bu e-posta ile kayıtlı kullanıcı bulunamadı' };
  }

  if (user.password !== password) {
    return { ok: false, error: 'Hatalı şifre girdiniz' };
  }

  localStorage.setItem('envanter_current_user', JSON.stringify(user));
  return { ok: true, user };
}

export function getCurrentUser() {
  try {
    const userStr = localStorage.getItem('envanter_current_user');
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem('envanter_current_user');
}
