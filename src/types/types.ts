export type Company = {
  id: number;
  name: string;
};

export type Employee = {
  id: number;
  age: number;
  name: string;
  surname: string;
  companyId: number;
};

export type Request<T> = {
  result: {
    data?: T;
    status: string | number;
  };
};

export type InitialState<T> = {
  entities: T;
  isLoading: boolean;
  error: string | null;
};
