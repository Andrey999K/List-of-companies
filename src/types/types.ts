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

export type UpdatedItemData<T extends Pick<T, "id">> = Pick<T, "id"> & UpdatedFields<T>;
