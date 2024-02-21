const convertQueryParams = (body: { [id: string]: string }) => {
  return (
    "?" +
    Object.keys(body)
      .map(field => `${field}=${body[field]}`)
      .join("&")
  );
};

export default convertQueryParams;
