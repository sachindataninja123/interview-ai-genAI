// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000",
//   withCredentials: true,
// });

// export async function register({ name, email, password }) {
//   try {
//     const res = await api.post("/api/users/register", {
//       name,
//       email,
//       password,
//     });

//     return res.data;
//   } catch (error) {
//     console.log("Register error: ", error);
//   }
// }

// export async function login({ email, password }) {
//   try {
//     const res = await api.post("/api/users/login", {
//       email,
//       password,
//     });

//     localStorage.setItem("token", res.data.accessToken);
//     return res.data;
//   } catch (error) {
//     console.log("Login error: ", error);
//   }
// }

// export async function logOut() {
//   try {
//     const res = await api.post(
//       "/api/users/logout",
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       },
//     );
//     localStorage.removeItem("token");

//     return res.data;
//   } catch (error) {
//     console.log("Logout error", error);
//   }
// }

// export async function profile() {
//   try {
//     const res = await api.get("/api/users/profile", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });

//     return res.data;
//   } catch (error) {
//     console.log("Profile api error", error);
//   }
// }

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

/* =========================
   REQUEST INTERCEPTOR
========================= */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Access token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token API call
        const res = await api.get("/api/users/refresh-token");

        const newAccessToken = res.data.accessToken;

        // Save new token
        localStorage.setItem("token", newAccessToken);

        // Update old request token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token expired", refreshError);

        localStorage.removeItem("token");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

/* =========================
   REGISTER
========================= */

export async function register({ name, email, password }) {
  try {
    const res = await api.post("/api/users/register", {
      name,
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.log("Register error:", error);

    throw error;
  }
}

/* =========================
   LOGIN
========================= */

export async function login({ email, password }) {
  try {
    const res = await api.post("/api/users/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.accessToken);

    return res.data;
  } catch (error) {
    console.log("Login error:", error);

    throw error;
  }
}

/* =========================
   LOGOUT
========================= */

export async function logOut() {
  try {
    const res = await api.post("/api/users/logout");

    localStorage.removeItem("token");

    return res.data;
  } catch (error) {
    console.log("Logout error:", error);

    throw error;
  }
}

/* =========================
   PROFILE
========================= */

export async function profile() {
  try {
    const res = await api.get("/api/users/profile");

    return res.data;
  } catch (error) {
    console.log("Profile error:", error);

    throw error;
  }
}
