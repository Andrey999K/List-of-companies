import AppLoader from "./hoc/AppLoader.tsx";
import { useEffect, useState } from "react";
import CompaniesTable from "./components/ui/tables/CompaniesTable";
import EmployeesTable from "./components/ui/tables/EmployeesTable";
import Button from "./components/common/Button";
import { Company } from "./types/types.ts";

function App() {
  const [selectedCompany, setSelectedCompany] = useState<Company[]>([]);

  useEffect(() => {
    console.log(selectedCompany);
  }, [selectedCompany]);

  return (
    <AppLoader>
      <div className="w-full max-w-screen-2xl mx-auto mt-5 flex gap-10">
        <CompaniesTable selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} />
        {selectedCompany.length === 1 && <EmployeesTable selectedCompany={selectedCompany[0].id} />}
      </div>
      <Button>+</Button>
    </AppLoader>
  );
}

export default App;
