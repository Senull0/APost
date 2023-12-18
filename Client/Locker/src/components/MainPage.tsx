import CodePanel from './code-verifier/CodePanel';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ParcelFinder from './parcel-finder/ParcelFinder';
import RoleSelector from "./role-selector/RoleSelector";

const MainPage = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ParcelFinder />} />
          <Route path="/code" element={<CodePanel />} />
          <Route path="/role" element={<RoleSelector />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MainPage;