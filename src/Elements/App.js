import '../Element_Styles/App.css';
import { Routes, Route, Outlet } from 'react-router-dom';

import NavBar from './NavBar';
import Home from './Home';
import NewApplication from './NewApplication';
import ApplicationsTable from './ApplicationsTable';
import ApplicationDetails from './ApplicationDetails';
import Footer from './Footer';
import Export from './Export';
import ErrorPage from './Error';
import Calendar from './Calendar';

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
      <Footer />
    </div>
  );
}

export default App;
