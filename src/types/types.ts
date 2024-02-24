export type Company = {
  id: number;
  name: string;
  address: string;
};

export type Employee = {
  id: number;
  age: number;
  name: string;
  surname: string;
  position: string;
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

export type ObjectDefault = { [id: string]: string | number | boolean };

export type UpdatedFieldsItem<T> = Pick<Partial<T>, keyof Omit<T, "id">>;

export type UpdatedFields<T> = Pick<Partial<T>, keyof T>;

export type UpdatedItemData<T extends { id: number | string }> = Pick<T, "id"> & UpdatedFields<T>;

export type PayloadNewEmployee = Omit<
  {
    [K in keyof Employee]: string;
  },
  "id"
>;
