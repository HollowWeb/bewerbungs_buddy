import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import NewApplication from './Add_Application/NewApplication';
import ApplicationsTable from './ApplicationsTable/ApplicationsTable';
import ApplicationDetails from './ApplicationDetails/ApplicationDetails';
import Footer from './Footer/Footer';
import Export from './Export/Export';
import ErrorPage from './Error_page/Error';
import Calendar from './Calendar/Calendar';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='new_application' element={<NewApplication />} />
        <Route path='applications' element={<ApplicationsTable />} />
        <Route path='edit_application/:id' element={<ApplicationDetails />} />
        <Route path='export' element={<Export />} />
        <Route path='calendar' element={<Calendar />} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <div className="App">
      <NavBar />
      <div className='content'>
        <Outlet />
      </div>
      <Footer /> {/* Include the Footer component here */}
    </div>
  );
}

export default App;
