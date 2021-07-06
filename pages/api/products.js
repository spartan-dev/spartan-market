import { BASE_URL } from "../../utils/constants";

export async function createProduct(formData) {
  try {
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

export async function getProductsByVendor(userId) {
  const user = { userId };
  try {
    const url = `${BASE_URL}productsbyvendor`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(url, params);
    console.log(response);
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
