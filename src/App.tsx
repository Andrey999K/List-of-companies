import { useSelector } from "react-redux";
import { deleteCompany, getCompanyList } from "./store/companySlicer.ts";
import AppLoader from "./hoc/AppLoader.tsx";
import { useAppDispatch } from "./store/hooks.ts";

function App() {
  const companyList = useSelector(getCompanyList());
  const dispatch = useAppDispatch();
  const handlerDeleteCompany = (companyId: number) => {
    dispatch(deleteCompany(companyId));
  };

  return (
    <AppLoader>
      <div className="w-full max-w-screen-xl mx-auto mt-5">
        <div className="flex flex-col gap-2 divide-y-[1px] divide-black/50">
          {companyList.map(company => (
            <div key={company.id} className="flex items-center gap-2">
              <div>{company.id}</div>
              <div>{company.name}</div>
              <button onClick={() => handlerDeleteCompany(company.id)}>Удалить</button>
            </div>
          ))}
        </div>
      </div>
    </AppLoader>
  );
}

export default App;
