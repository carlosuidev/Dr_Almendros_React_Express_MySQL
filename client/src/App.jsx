import "./App.css";
import { Routes, Route } from "react-router-dom";
// PAGES
import { MainStructure } from "./pages/MainStructure";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ServicesPage } from "./pages/ServicesPage";
import { PacientsPage } from "./pages/PacientsPage";
import { PacientPage } from "./pages/PacientPage";
import { EmployeesPage } from "./pages/EmployeesPage";
import { EmployeePage } from "./pages/EmployeePage";
import { ProfilePage } from "./pages/ProfilePage";
import { DatesPage } from "./pages/DatesPage";
import { ErrorPage } from "./pages/ErrorPage";
import { SignUpPage } from "./pages/SignUpPage";

// Routing
import { UnloggedUserRoute } from "./routes/UnloggedUserRoute";
import { PrivateUserRoute } from "./routes/PrivateUserRoute";
import { AdminUserRoute } from "./routes/AdminUserRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateUserRoute>
            <MainStructure></MainStructure>
          </PrivateUserRoute>
        }
      >
        <Route index element={<HomePage></HomePage>}></Route>
        <Route path="profile" element={<ProfilePage></ProfilePage>}></Route>
        <Route path="pacients" element={<PacientsPage></PacientsPage>}>
          <Route path=":id" element={<PacientPage></PacientPage>}></Route>
        </Route>
        <Route
          path="services"
          element={
            <AdminUserRoute>
              <ServicesPage></ServicesPage>
            </AdminUserRoute>
          }
        ></Route>
        <Route
          path="sign-up"
          element={
            <AdminUserRoute>
              <SignUpPage></SignUpPage>
            </AdminUserRoute>
          }
        ></Route>
        <Route
          path="employees"
          element={
            <PrivateUserRoute>
              <EmployeesPage></EmployeesPage>
            </PrivateUserRoute>
          }
        >
          <Route path=":id" element={<EmployeePage></EmployeePage>}></Route>
        </Route>
        <Route path="dates" element={<DatesPage></DatesPage>}>
        </Route>
      </Route>
      <Route
        path="/login"
        element={
          <UnloggedUserRoute>
            <LoginPage></LoginPage>
          </UnloggedUserRoute>
        }
      ></Route>
      <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
    </Routes>
  );
}

export default App;
