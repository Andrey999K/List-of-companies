import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import employeeList from "../mock/employeeList.json";
import isDev from "../utils/isDev.ts";
import { Employee, InitialState, Request, UpdatedItemData } from "../types/types.ts";
import employeeService from "../services/employee.services.ts";
import companyService from "../services/company.services.ts";

type InitialStateEmployee = InitialState<Employee[]>;

type State = {
  employee: InitialStateEmployee;
};

type queryParamsGetEmployee = {
  employeeId?: number;
  companyId?: number;
};

export const requestEmployeeList = createAsyncThunk(
  "employeeList/request",
  async (payload: queryParamsGetEmployee | null, { rejectWithValue }) => {
    try {
      const data = payload ? await employeeService.get(payload) : await employeeService.get();
      const { result } = data;
      if (result.status === "200") return result?.data;
      return [];
    } catch (error: any) {
      if (isDev()) {
        console.log(error);
        if (payload?.companyId || payload?.employeeId) {
          const { companyId, employeeId } = payload;
          return employeeList.filter(employee => {
            if (companyId && employeeId) return employee.companyId === companyId && employee.id === employeeId;
            return companyId ? employee.companyId === companyId : employee.id === employeeId;
          });
        }
        return employeeList as Employee[];
      }
      return rejectWithValue(error.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/update",
  async (payload: UpdatedItemData<Employee>, { rejectWithValue }) => {
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

export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (
    payload: { employeeId: number | Array<number> } | { companyId: number | Array<number> },
    { rejectWithValue }
  ) => {
    try {
      if ("employeeId" in payload) {
        const data = await employeeService.delete(
          Array.isArray(payload.employeeId)
            ? { employeeId: payload.employeeId.join(", ") }
            : { employeeId: payload.employeeId }
        );
        const { result } = data;
        if (result.status === "200") return result.data?.id;
      } else if ("companyId" in payload) {
        const data = await employeeService.delete(
          Array.isArray(payload.companyId)
            ? { employeeId: payload.companyId.join(", ") }
            : { employeeId: payload.companyId }
        );
        const { result } = data;
        if (result.status === "200") return result.data;
      }
    } catch (error: any) {
      if (isDev()) {
        console.log(error);
        return payload;
      }
      return rejectWithValue(error.message);
    }
  }
);

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
      if (payload) state.entities = Array.isArray(payload) ? payload : [payload];
    });
    builder.addCase(requestEmployeeList.rejected, setRejected);
    builder.addCase(updateEmployee.pending, setPending);
    builder.addCase(updateEmployee.fulfilled, (state: InitialStateEmployee, { payload }) => {
      state.isLoading = false;
      if (payload)
        state.entities = state.entities.map(employee =>
          employee.id === payload.id ? { ...employee, ...payload } : employee
        );
    });
    builder.addCase(updateEmployee.rejected, setRejected);
    builder.addCase(deleteEmployee.pending, setPending);
    builder.addCase(deleteEmployee.fulfilled, (state: InitialStateEmployee, { payload }) => {
      state.isLoading = false;
      console.log(payload);
      if (payload) {
        if ("employeeId" in payload) {
          state.entities = state.entities.filter(employee => {
            if (Array.isArray(payload.employeeId)) return !payload.employeeId.includes(employee.id);
            return employee.id !== payload.employeeId;
          });
        } else if ("companyId" in payload) {
          state.entities = state.entities.filter(employee => {
            if (Array.isArray(payload.companyId)) return !payload.companyId.includes(employee.companyId);
            return employee.companyId !== payload.companyId;
          });
        }
      }
    });
    builder.addCase(deleteEmployee.rejected, setRejected);
  }
});

const { reducer: employeeReducer } = employeeSlice;

export const getEmployeeList =
  (companyId?: number) =>
  (state: State): Array<Employee> => {
    return companyId
      ? state.employee.entities.filter(employee => employee.companyId === companyId)
      : state.employee.entities;
  };

export default employeeReducer;
