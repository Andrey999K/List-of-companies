import AppLoader from "./hoc/AppLoader.tsx";
import { useState } from "react";
import CompaniesTable from "./components/ui/tables/CompaniesTable";
import EmployeesTable from "./components/ui/tables/EmployeesTable";

function App() {
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);

  return (
    <AppLoader>
      <div className="w-full max-w-screen-xl mx-auto mt-5 flex gap-10">
        <CompaniesTable setCompany={setSelectedCompany} />
        <EmployeesTable selectedCompany={selectedCompany} />
      </div>
    </AppLoader>
  );
}

export default App;
