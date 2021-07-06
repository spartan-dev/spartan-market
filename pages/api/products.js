import { BASE_URL } from "../../utils/constants";
import { getToken } from "./token";
export async function createProduct(formData) {
  try {
    const token = getToken();
    const url = `${BASE_URL}createproduct`;
    const params = {
      method: "POST",
      body: formData,
    };
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}
export async function getAllProducts() {
  try {
    const url = `${BASE_URL}products`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}
/* 
  headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
*/
