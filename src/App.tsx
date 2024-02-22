import AppLoader from "./hoc/AppLoader.tsx";
import { useState } from "react";
import CompaniesTable from "./components/ui/tables/CompaniesTable";
import EmployeesTable from "./components/ui/tables/EmployeesTable";
import { Company } from "./types/types.ts";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [selectedCompany, setSelectedCompany] = useState<Company[]>([]);

  return (
    <AppLoader>
      <ToastContainer className="z-[9999]" />
      <div className="w-full max-w-screen-2xl mx-auto mt-5 flex gap-10">
        <CompaniesTable selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} />
        {selectedCompany.length === 1 && <EmployeesTable selectedCompany={selectedCompany[0].id} />}
      </div>
    </AppLoader>
  );
}

export default App;
