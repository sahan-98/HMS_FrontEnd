export const post = async ({ path, data }) => {
  const response = await fetch(`${import.meta.VITE_BASE_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const get = async ({ path }) => {
  const response = await fetch(`${import.meta.VITE_BASE_URL}/${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const put = async ({ path, data }) => {
  const response = await fetch(`${import.meta.VITE_BASE_URL}/${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};

export const del = async ({ path }) => {
  const response = await fetch(`${import.meta.VITE_BASE_URL}/${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};
