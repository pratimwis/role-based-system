import axios from 'axios';
import { toast } from 'react-toastify';
import { persistor, store } from '../redux/store';
import { logout } from '../redux/authSlice/slice';
const apiUrl = import.meta.env.VITE_BACKEND_URL;
const API = axios.create({
  baseURL: apiUrl,
});

API.interceptors.request.use(
  (req) => {
    try {
      if (!req.url.includes('/auth/login') && !req.url.includes('/auth/register')) {
        const state = store.getState();
        const token = state.auth.token;
        if (token) {
          req.headers.Authorization = token;
        } else {
          console.warn("Token not found");
          window.location.href = "/login";
        }
      }
    } catch (error) {
      console.error("Error processing request interceptor:", error);
    }
    return req;
  }

);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const message = error.response.data?.message || "An error occurred";
      if (message === "Access denied") {
        toast.error("Access Denied");
        store.dispatch(logout());
        await persistor.purge();
        window.location.href = "/login";
      }
      // else {
      //   toast.error(message);
      // }
    } else if (error.request) {
      toast.error("Network error");
    } else {
      toast.error("An unexpected error occurred");
    }

    return Promise.reject(error);
  }
);

export default API;

//Auth Api's
export const loginUser = (formData) => {
  return API.post('/auth/login', formData);
};
export const registerUser = (formData) => {
  return API.post('/auth/register', formData);
}
export const updateProfile = (formData) => {
  return API.post('/auth/uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
} 

//Admin Api's
export const employeeList = () => {
  return API.get('/admin/employee-list');
}
export const assignWork = (formData) => {
  return API.post('/admin/assign-work', formData);
}
export const workListApi = () => {
  return API.get('/admin/get-assigned-tasks');
}
export const editAssignedWork = (id, formData) => {
  return API.put(`/admin/update-assigned-task/${id}`, formData);
}
export const deleteAssignedWork = (id) => {
  return API.delete(`/admin/delete-assigned-task/${id}`);
}
export const getAllUsers = () => {
  return API.get('/admin/get-all-users');
}
export const updatePriorityOrder = (draggedWorkId, targetWorkId) => {
  return API.put('/admin/update-priority-order', { draggedWorkId, targetWorkId })
}

//Employee Api's
export const employeeData = () => {
  return API.get('/employee/dashboard');
}
export const assignedWork = () => {
  return API.get('/employee/assigned-work')
}
export const updateWorkStatus = (id, message) => {
  return API.post(`/employee/submit-work/${id}`, { message });
}