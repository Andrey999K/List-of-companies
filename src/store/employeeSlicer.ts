import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeList from "../mock/employeeList.json";
import httpService from "../services/http.services.ts";
import isDev from "../utils/isDev.ts";
import { Employee, InitialState, Request } from "../types/types.ts";

type InitialStateEmployee = InitialState<Employee[]>;

type State = {
  employee: InitialStateEmployee;
};

export const requestEmployeeList = createAsyncThunk("employeeList/request", async (_, { rejectWithValue }) => {
  try {
    const { result } = (await httpService.get("employees")) as Request<Employee[]>;
    if (result.status === "200") return result.data;
    return [];
  } catch (error: any) {
    if (isDev()) {
      console.log(error);
      return employeeList as Employee[];
    }
    return rejectWithValue(error.message);
  }
});

const setPending = (state: InitialStateEmployee) => {
  state.isLoading = true;
  state.error = null;
};

const setRejected = (state: InitialStateEmployee, { payload }: { payload: any }) => {
  state.isLoading = false;
  state.error = payload;
};

const initialState: InitialState<Employee[]> = {
  entities: [],
  isLoading: false,
  error: null
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(requestEmployeeList.pending, setPending);
    builder.addCase(requestEmployeeList.fulfilled, (state: InitialStateEmployee, { payload }) => {
      state.isLoading = false;
      if (payload) state.entities = payload;
    });
    builder.addCase(requestEmployeeList.rejected, setRejected);
  }
});

const { reducer: employeeReducer } = employeeSlice;

export const getEmployeeList = () => (state: State) => state.employee.entities;
export const getEmployeeLoading = () => (state: State) => state.employee.isLoading;

export default employeeReducer;
