const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export function getStoredToken() {
  return localStorage.getItem('auth_token');
}

export function setStoredToken(token) {
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
}

async function parseJsonResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      data.error ||
      (Array.isArray(data.errors) ? data.errors.join(', ') : null) ||
      'Something went wrong';
    throw new Error(message);
  }
  return data;
}

export async function signIn(email, password) {
  const res = await fetch(`${API_BASE}/api/v1/auth/sign_in`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return parseJsonResponse(res);
}

export async function signUp({ email, password, passwordConfirmation, name }) {
  const res = await fetch(`${API_BASE}/api/v1/auth/sign_up`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      user: {
        email,
        password,
        password_confirmation: passwordConfirmation,
        name: name || undefined,
      },
    }),
  });
  return parseJsonResponse(res);
}

export async function fetchCatalog() {
  const res = await fetch(`${API_BASE}/api/v1/catalog`, {
    headers: { Accept: 'application/json' },
  });
  return parseJsonResponse(res);
}

export async function fetchCurrentUser(token = getStoredToken()) {
  if (!token) return null;

  const res = await fetch(`${API_BASE}/api/v1/auth/me`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    setStoredToken(null);
    return null;
  }

  const data = await parseJsonResponse(res);
  return data.user;
}
