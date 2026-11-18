// Menu photos are hosted on Cloudinary (free plan). Uploads use an *unsigned* preset, so no
// API key or secret lives in the app; only the public cloud name and preset name are needed.
const CLOUD_NAME = 'ncmunhmx';
const UPLOAD_PRESET = 'foody_menu';
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// Deliver a resized, auto-compressed copy instead of the original upload
const optimized = (secureUrl) => secureUrl.replace('/upload/', '/upload/c_limit,w_800,q_auto/');

// Uploads a picked photo ({ uri, type, fileName }) and resolves with its https URL
export const uploadMenuPhoto = async ({ uri, type, fileName }) => {
  const body = new FormData();
  body.append('file', { uri, type: type || 'image/jpeg', name: fileName || 'menu-photo.jpg' });
  body.append('upload_preset', UPLOAD_PRESET);

  const response = await fetch(UPLOAD_URL, { method: 'POST', body });
  const result = await response.json();
  if (!response.ok || !result.secure_url) {
    throw new Error((result.error && result.error.message) || `Upload failed (${response.status})`);
  }
  return optimized(result.secure_url);
};
