import { useSelector } from "react-redux";
import { getCompanyList } from "./store/companySlicer.ts";
import AppLoader from "./hoc/AppLoader.tsx";

function App() {
  const categoryList = useSelector(getCompanyList());
  console.log(categoryList);

  return (
    <AppLoader>
      <h1 className="text-">FFF</h1>
    </AppLoader>
  );
}

export default App;
