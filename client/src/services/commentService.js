import { requestFactory } from "./requester";

const baseUrl = "http://localhost:3030/data/comments";
const request = requestFactory();

export const getAllComments = async (bookID) => {
  const query = new URLSearchParams({
    where: `bookID="${bookID}"`,
    load: `author=_ownerId:users`,
  });
  const result = await request.get(`${baseUrl}?${query}`);
  return result;
};

export const addComment = async (bookID, comment) => {
  const result = await request.post(baseUrl, { bookID, comment });

  return result;
};
