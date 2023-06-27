import { Route, Routes } from "react-router-dom";
import SalesCalculation from "./components/Calculation/SalesCalculation";
import Home from "./components/Home/Home";
import SalesOne from "./components/Home/SalesOne";
import SalesTwo from "./components/Home/SalesTwo";


function App() {
  return (
    <div className="pb-8">
      <Routes>
        <Route path="/" element={<SalesCalculation></SalesCalculation>}></Route>
        <Route path="/dash" element={<Home></Home>}>
          <Route index element={<SalesOne></SalesOne>}></Route>
          <Route path="one" element={<SalesOne></SalesOne>}></Route>
          <Route path="two" element={<SalesTwo></SalesTwo>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
