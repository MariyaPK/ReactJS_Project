export const request = async (method, url, data) => {
  const options = {};

  if (method !== "GET") {
    options.method = method;

    if (data) {
      options.headers = {
        "Content-Type": "application/json",
      };

      options.body = JSON.stringify(data);
    }
  }

  const token = localStorage.getItem("auth");
  if (token) {
    const auth = JSON.parse(token);

    if (auth.accessToken) {
      options.headers = {
        ...options.headers,
        "X-Authorization": auth.accessToken,
      };
    }
  }

  const response = await fetch(url, options);

  try {
    if (response.status === 204) {
      return {};
    }

    const result = await response.json();

    if (!response.ok) {
      throw result;
    }

    return result;
    
  } catch (error) {
    return {};
  }
};
export const requestFactory = () => {
  return {
    get: request.bind(null, "GET"),
    post: request.bind(null, "POST"),
    put: request.bind(null, "PUT"),
    patch: request.bind(null, "PATCH"),
    delete: request.bind(null, "DELETE"),
  };
};
