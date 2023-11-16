import * as request from "./requester";

const baseUrl = "http://localhost:3030/jsonstore/books";

export const getAll = async () => {
  try {
    const result = await request.get(baseUrl);
    const books = Object.values(result);
    // console.log(books)

    return books;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (bookData) => {
  const result = await request.post(baseUrl, bookData);

  console.log(result);

  return result;
};

export const getOne = async (bookId) => {
  const result = await request.get(`${baseUrl}/${bookId}`);

  console.log(result);

  return result;
};
