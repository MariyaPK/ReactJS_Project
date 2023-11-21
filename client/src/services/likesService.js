import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data";
const request = requestFactory();

export const getLikesCount = async (bookID) => {
  const result = await request.get(`${baseUrl}/likes?where=bookID%3D%22${bookID}%22&`);
  return result;
};

export const addLike = async (bookID, userId) => {
  const result = await request.post(`${baseUrl}/likes`, { bookID, userId });

  return result;
};

export async function liked(bookID, userId) {
  const result = await request.get(`${baseUrl}/likes?where=bookID%3D%22${bookID}%22%20and%20_ownerId%3D%22${userId}%22&count`, {
    bookID,
    userId,
  });
  return result;
}

export async function dislike(likeId, userId) {
  const res = await request.delete(`${baseUrl}/likes/${likeId}?where=userId%3D%22${userId}%22&`);
  return res;
}
