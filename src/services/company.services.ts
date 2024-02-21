import httpService from "./http.services.ts";
import convertQueryParams from "../utils/convertQueryParams.ts";
import { ObjectDefault } from "../types/types.ts";

const botMessagesEndPoint = "company";

const companyService = {
  get: async (body?: ObjectDefault) => {
    const { data } = body
      ? await httpService.get(botMessagesEndPoint + convertQueryParams(body))
      : await httpService.get(botMessagesEndPoint);
    return data;
  },
  post: async (body: ObjectDefault) => {
    const { data } = await httpService.post(botMessagesEndPoint, body);
    return data;
  },
  patch: async (body: ObjectDefault, config: Object) => {
    const { data } = config
      ? await httpService.put(botMessagesEndPoint, body, config)
      : await httpService.put(botMessagesEndPoint, body);
    return data;
  },
  delete: async (body: ObjectDefault) => {
    const { data } = await httpService.delete(botMessagesEndPoint + convertQueryParams(body));
    return data;
  }
};

export default companyService;
