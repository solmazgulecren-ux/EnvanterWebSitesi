const USERS_KEY = 'envanter_users';

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
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

  return { ok: true, user };
}
