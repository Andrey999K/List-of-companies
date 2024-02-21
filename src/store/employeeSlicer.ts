import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import companyList from "../mock/companyList.json";
import httpService from "../services/http.services.ts";
import isDev from "../utils/isDev.ts";
import { Company, InitialState, Request } from "../types/types.ts";

type InitialStateCompany = InitialState<Company[]>;

type State = {
  company: InitialStateCompany;
};

export const requestCompanyList = createAsyncThunk("companyList/request", async (_, { rejectWithValue }) => {
  try {
    const { result } = (await httpService.get("categories")) as Request<Company[]>;
    if (result.status === "200") return result.data;
    return [];
  } catch (error: any) {
    if (isDev()) {
      console.log(error);
      return companyList as Company[];
    }
    return rejectWithValue(error.message);
  }
});

const setPending = (state: InitialStateCompany) => {
  state.isLoading = true;
  state.error = null;
};

const setRejected = (state: InitialStateCompany, { payload }: { payload: any }) => {
  state.isLoading = false;
  state.error = payload;
};

const initialState: InitialState<Company[]> = {
  entities: [],
  isLoading: false,
  error: null
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(requestCompanyList.pending, setPending);
    builder.addCase(requestCompanyList.fulfilled, (state: InitialStateCompany, { payload }) => {
      state.isLoading = false;
      if (payload) state.entities = payload;
    });
    builder.addCase(requestCompanyList.rejected, setRejected);
  }
});

const { reducer: companyReducer } = companySlice;

export const getCompanyList = () => (state: State) => state.company.entities;
export const getCompanyLoading = () => (state: State) => state.company.isLoading;

export default companyReducer;
