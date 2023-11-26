import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data";
const request = requestFactory();

export const rateBook = async (bookID, userId) => {
  try {
    const result = await request.post(`${baseUrl}/rate`, { bookID, userId });
    return result;
  } catch (error) {
    console.error("Error adding rating:", error);
  }
};

export const rated = async (bookID, userId) => {
  try {
    const result = await request.get(`${baseUrl}/rate?where=bookID%3D%22${bookID}%22%20and%20_ownerId%3D%22${userId}%22`);
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error("Error checking rate status:", error);
  }
};

export const changeRate = async (rateId, userId, bookID) => {
    console.log(rateId)
  try {
    const result = await request.post(`${baseUrl}/rate`, { rateId, userId, bookID });
    return result;
  } catch (error) {
    console.error("Error changing rate:", error);
  }
};
