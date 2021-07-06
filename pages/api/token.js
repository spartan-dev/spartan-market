import { TOKEN, ROLE } from "../../utils/constants";

export function setToken(token) {
  localStorage.setItem(TOKEN, token);
}
export function getToken() {
  return localStorage.getItem(TOKEN);
}

export function setRole(role) {
  localStorage.setItem(ROLE, role);
}

export function getRole() {
  return localStorage.getItem(ROLE);
}

export function removeToken() {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(ROLE);
}
