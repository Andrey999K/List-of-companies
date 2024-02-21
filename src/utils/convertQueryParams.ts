import { ObjectDefault } from "../types/types.ts";

const convertQueryParams = (body: ObjectDefault) => {
  return (
    "?" +
    Object.keys(body)
      .map(field => `${field}=${body[field]}`)
      .join("&")
  );
};

export default convertQueryParams;
