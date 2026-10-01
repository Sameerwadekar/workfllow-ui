export const API_GATEWAY =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_GATEWAY) ||
  'http://localhost:8085';