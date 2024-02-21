import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import companyList from "../mock/companyList.json";
import isDev from "../utils/isDev.ts";
import { Company, Employee, InitialState, Request, UpdatedFieldsCompany } from "../types/types.ts";
import companyService from "../services/company.services.ts";

type InitialStateCompany = InitialState<Company[]>;

type State = {
  company: InitialStateCompany;
};

export const requestCompanyList = createAsyncThunk("companyList/request", async (_, { rejectWithValue }) => {
  try {
    const { result } = await companyService.get();
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

type UpdatedCompanyData = Omit<Partial<Company>, "id"> & Pick<Company, "id"> & UpdatedFieldsCompany;

export const updateCompany = createAsyncThunk(
  "company/update",
  async (payload: UpdatedCompanyData, { rejectWithValue }) => {
    try {
      const { result } = (await companyService.patch({ payload })) as Request<Employee>;
      if (result.status === "200") return result.data;
      return null;
    } catch (error: any) {
      if (isDev()) {
        console.log(error);
        return payload;
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCompany = createAsyncThunk("company/delete", async (payload: number, { rejectWithValue }) => {
  try {
    const { result } = await companyService.delete({ companyId: payload });
    if (result.status === "200") return result.data?.id;
  } catch (error: any) {
    if (isDev()) {
      console.log(error);
      return payload;
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
    builder.addCase(updateCompany.pending, setPending);
    builder.addCase(updateCompany.fulfilled, (state: InitialStateCompany, { payload }) => {
      state.isLoading = false;
      if (payload)
        state.entities = state.entities.map(company =>
          company.id === payload.id ? { ...company, ...payload } : company
        );
    });
    builder.addCase(updateCompany.rejected, setRejected);
    builder.addCase(deleteCompany.pending, setPending);
    builder.addCase(deleteCompany.fulfilled, (state: InitialStateCompany, { payload }) => {
      state.isLoading = false;
      if (payload) state.entities = state.entities.filter(company => company.id !== payload);
    });
    builder.addCase(deleteCompany.rejected, setRejected);
  }
});

const { reducer: companyReducer } = companySlice;

export const getCompanyList = () => (state: State) => state.company.entities;
export const getCompanyLoading = () => (state: State) => state.company.isLoading;

export default companyReducer;
