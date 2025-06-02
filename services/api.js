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

const BASE_URL = "https://backend-belz.onrender.com/";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getData = async (title) => {
  try {
    const response = await fetch(`${API_URL}/api/data/latest/`, {});

    if (!response.ok) throw new Error("Error collecting data");

    const data = await response.json();
    console.log(data[0].temperature);
    console.log(data[0][title]);
    console.log(title);
    return await data[0].title;
  } catch (error) {
    console.error("Error collecting data", error);
    return null;
  }
};
