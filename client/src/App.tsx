import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

/** Components */
import DetailPage from './pages/DetailPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="/issues" element={<HomePage />} />
      <Route path="/issues/:id" element={<DetailPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
