import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export async function register({ name, email, password }) {
  try {
    const res = await api.post("/api/users/register", {
      name,
      email,
      password,
    });

    return res.data;
  } catch (error) {
    console.log("Register error: ", error);
  }
}

export async function login({ email, password }) {
  try {
    const res = await api.post("/api/users/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.accessToken);
    return res.data;
  } catch (error) {
    console.log("Login error: ", error);
  }
}

export async function logOut() {
  try {
    const res = await api.post(
      "/api/users/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    localStorage.removeItem("token");

    return res.data;
  } catch (error) {
    console.log("Logout error", error);
  }
}

export async function profile() {
  try {
    const res = await api.get("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  } catch (error) {
    console.log("Profile api error", error);
  }
}
