import { BASE_URL } from "../../utils/constants";

export async function loginUser(formData) {
  try {
    const url = `${BASE_URL}login`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}
