import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './signup';
import SignIn from './signin';
import ClientDashboard from './clientDashboard';
import ContractorDashboard from './contractorDashboard';
import RequestForQuote from './requestForQuote';
import QuoteResponse from './quoteResponse';
import Viewqoute from './Viewqoute';
import Orders from "./order";
import Bill from './bill';
import AddBill from "./AddBill";

const RouterNav = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/contractor-dashboard" element={<ContractorDashboard />} />
        <Route path="/request-quote" element={<RequestForQuote />} />
        <Route path="/quote-response" element={<QuoteResponse />} />
        <Route path="/viewqoute" element={<Viewqoute />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/addbill" element={<AddBill />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterNav;
