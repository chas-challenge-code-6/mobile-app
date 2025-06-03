// Här kan vi samla våra fetchanrop

// Fetch för att logga in (Eddas exempel)
// const BASE_URL = "https://api.escuelajs.co/api/v1";

// export const loginWithApi = async (login, password) => {
//     try {
//         const response = await fetch (`${BASE_URL}/auth/login`, {
//         method: "POST",
//         headers: {"Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//         });

//         if (!response.ok) throw new Error("Inloggningen misslyckades");

//         return await response.json(); // Innehåller tokens

//     } catch(error) {
//         console.error("Login error", error);
//         return null;
//     }
// };

const BASE_URL = "https://backend-belz.onrender.com";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getData = async (token, title) => {
  try {
    const response = await fetch(`${BASE_URL}/api/data/latest`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    if (!response.ok) throw new Error("Error collecting data");

    const data = await response.json();
    console.log(data);
    console.log(title);
    return await data[0].title;
  } catch (error) {
    console.error("Error collecting data", error);
    return null;
  }
};

export const loginFetch = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) throw new Error("Error logging in");

    const data = await response.json(); //returns token
    console.log(data.data.token);
    return data;
  } catch (error) {
    console.error("Error logging in", error);
    return null;
  }
};

export const userFetch = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Error logging in");

    return await response.json(); //returns profile?
  } catch (error) {
    console.error("Error logging in", error);
    return null;
  }
};
export const registerFetch = async (incomingBody) => {
  console.log(incomingBody);
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(incomingBody),
    });

    if (!response.ok) throw new Error("Error collecting data");

    const data = await response.json();

    return await data;
  } catch (error) {
    console.error("Error collecting data", error);
    return null;
  }
};
