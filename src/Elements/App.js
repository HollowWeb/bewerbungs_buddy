import './App.css';
import { 
  Routes,
  Route,
  Outlet
} from 'react-router-dom';

import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import NewApplication from './Add_Application/NewApplication';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='new_application' element={<NewApplication />} />
        {/*
        <Route path='applications' element={<Applications />} />
        <Route path='export' element={<Export />} />
        <Route path='calendar' element={<Calendar />} />
        <Route path='edit_application' element={<EditApplication />} />
        <Route path='*' element={<NotFound />} />
        */}
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
    </div>
  );
}

export default App;
