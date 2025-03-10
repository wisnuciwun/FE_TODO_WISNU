export const req = async (
  url: string,
  method: "GET" | "POST" | "PUT" = "GET",
  data?: any
) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(`/api${url}`, options);
  return response.json();
};
