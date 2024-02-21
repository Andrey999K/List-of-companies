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

export type ObjectDefault = { [id: string]: string | number | boolean };

export type UpdatedFieldsItem<T> = Pick<T, keyof Omit<T, "id">>;

export type UpdatedFields<T> = Pick<Partial<T>, keyof T>;

export type UpdatedFieldsCompany = UpdatedFieldsItem<Company>;

export type UpdatedFieldsEmployee = UpdatedFieldsItem<Employee>;

// export type UpdatedItemData<T extends { id: number }> = UpdatedFields<T> & Pick<T, "id"> & UpdatedFieldsItem<T>;
export type UpdatedItemData<T extends { id: number }> = Pick<T, "id"> & UpdatedFields<T>;
