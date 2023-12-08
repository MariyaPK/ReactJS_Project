import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data";
const request = requestFactory();

export const getLikesCount = async (bookID) => {
  try {
    const result = await request.get(`${baseUrl}/likes?where=bookID%3D%22${bookID}%22`);
    return result;
  } catch (error) {
    console.error("Error fetching likes count:", error);
  }
};

export const addLike = async (bookID, userId) => {
  try {
    const result = await request.post(`${baseUrl}/likes`, { bookID, userId });
    return result;
  } catch (error) {
    console.error("Error adding like:", error);
  }
};


export const dislike = async (likeId, userId) => {
  try {
    const result = await request.delete(`${baseUrl}/likes/${likeId}?where=userId%3D%22${userId}%22`);
    return result;
  } catch (error) {
    console.error("Error disliking:", error);
  }
};
