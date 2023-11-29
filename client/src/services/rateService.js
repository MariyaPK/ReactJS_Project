import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data/rate";
const request = requestFactory();

export const getRateBook = async (bookID, userId) => {
  try {
    const result = await request.get(`${baseUrl}`, { bookID, userId });
    return result;
  } catch (error) {
    console.error("Error fetching rate:", error);
  }
};

export const addRate = async (bookID, userId, userRating) => {
  try {
    userRating;
    const result = await request.post(`${baseUrl}`, { bookID, userId, userRating });
    return result;
  } catch (error) {
    console.error("Error adding rating:", error);
  }
};

export const changeRate = async (rateId, userId, bookID, userRating) => {
  try {
    const result = await request.put(`${baseUrl}/${rateId}`, { userId, bookID, userRating });
    return result;
  } catch (error) {
    console.error("Error changing rate:", error);
  }
};


