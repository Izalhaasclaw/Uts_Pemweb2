import { Query, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Copetition from "./pages/Competition";
import HomePage from "./pages/HomePage_backup"
import LoginForm from "./pages/LoginForm";
import RegisterEvent from "./pages/RegisterEvent";
import Seminar from "./pages/Seminar";
import Talkshow from "./pages/Talkshow";
import Workshop from "./pages/Workshop";
import DashboardIndex from "./pages/dashboard/DashboardIndex";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import CategoryIndex from "./pages/dashboard/category/CategoryIndex";
import EventIndex from "./pages/dashboard/event/EventIndex";
import PembicaraIndex from "./pages/dashboard/pembicara/PembicaraIndex";
import CategoryCreate from "./pages/dashboard/category/CategoryCreate";
import ProtectedRoute from "./routes/ProtectedRoute";
import PembicaraCreate from "./pages/dashboard/pembicara/PembicaraCreate";
import EventCreate from "./pages/dashboard/event/EventCreate";
import RegisterForm from "./pages/RegisterForm";
import Biodata from "./pages/dashboard/biodata/Biodata";
import PembicaraUpdate from "./pages/dashboard/pembicara/PembicaraUpdate";
import EventUpdate from "./pages/dashboard/event/EventUpdate";
import CategoryUpdate from "./pages/dashboard/category/CategoryUpdate";
import UserCreate from "./pages/dashboard/users/UserCreate";
import UserEdit from "./pages/dashboard/users/UserEdit";
import UserIndex from "./pages/dashboard/users/UserIndex";

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/Competition" element={<Copetition />} />
          <Route path="/Seminar" element={<Seminar />} />
          <Route path="/Workshop" element={<Workshop />} />
          <Route path="/Talkshow" element={<Talkshow />} />
        </Route>


        <Route element={<AuthLayout/>}>
          <Route path="/Login" element={<LoginForm/>} />
          <Route path="/Login" element={<HomePage/>} />
          <Route path="/register/event" element={<RegisterEvent />} />
          <Route path="/registerform" element={<RegisterForm />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardIndex />} />

            <Route path="/dashboard/category" element={<CategoryIndex />} />

            <Route path="/dashboard/pembicara" element={<PembicaraIndex />} />
            <Route path="/dashboard/event" element={<EventIndex />} />
            <Route path="/dashboard/category/create" element={<CategoryCreate />} />
            <Route path="/dashboard/pembicara/create" element={<PembicaraCreate />} />
            <Route path="/dashboard/event/create" element={<EventCreate />} />
            <Route path="/dashboard/biodata" element={<Biodata />} />
            <Route path="/dashboard/category/edit/:id" element={<CategoryUpdate />} />
            <Route path="/dashboard/pembicara/edit/:id" element={<PembicaraUpdate />} />
            <Route path="/dashboard/event/edit/:id" element={<EventUpdate />} />
            <Route path="/dashboard/users" element={<UserIndex />} />
            <Route path="/dashboard/users/create" element={<UserCreate />} />
            <Route path="/dashboard/users/edit/:id" element={<UserEdit />} /> 

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App; 