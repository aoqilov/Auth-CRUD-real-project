import axios from "axios";

// BASE
const apiClient = axios.create({
  baseURL: "http://45.138.158.137:92", // API URL manzili
  timeout: 10000, // Maksimal so'rov kutish vaqti (10 soniya)
  headers: {
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

// GET-ALL
export const getData = async (url, params = {}) => {
  try {
    const response = await apiClient.get(url, { params });
    if (response.data) {
      return response.data;
    } else {
      throw new Error("No data available");
    }
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};
// GET-ONE
export const getDataOne = async (url) => {
  try {
    const response = await apiClient.get(url);
    if (response.data) {
      return response.data;
    } else {
      throw new Error("No data available");
    }
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};
// POST
export const postData = async (url, data) => {
  try {
    const response = await apiClient.post(url, data);
    console.log(response?.data);

    return response.data;
  } catch (error) {
    console.error("error", error.message);
    return error;
  }
};
// POST-LOGIN
export const postDataLogin = async (url, data) => {
  try {
    const response = await apiClient.post(url, data);
    localStorage.setItem("token", response.data);
    return response.data;
  } catch (error) {
    console.error("error", error.message);
    return error;
  }
};
// DELETE-DATA
export const deleteData = async (url, id) => {
  try {
    const response = await apiClient.delete(url, {
      data: id,
    });
    return response.data;
  } catch (error) {
    console.error("Delete Error:", error.response?.data || error.message);
    throw error;
  }
};
// EDIT-DATA
export const editData = async (url, dataEdit) => {
  console.log(dataEdit);

  try {
    const response = await apiClient.put(url, dataEdit);
    return response.data;
  } catch (error) {
    console.error("edit Error:", error.response?.data || error.message);
    throw error;
  }
};
