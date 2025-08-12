import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/Layouts/MainLayout";
import IndexLayout from "./components/Layouts/IndexLayout";
import Index from "./pages/Index";
import InsuranceStatements from "./pages/application/InsuranceStatements.tsx";
import Privacy from "./pages/application/Privacy.tsx";
import Account from "./pages/application/Account.tsx";
import NewContractLogin from "./pages/application/NewContractLogin.tsx";
import TwoStepVerify from "./pages/application/TwoStepVerify";
import Application from "./pages/application/Application";
import InsuredApplication from "./pages/application/InsuredApplication";
import Success from "./pages/application/Success";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import { ApplicationProvider } from "./contexts/ApplicationContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ToastContainer } from "./components/SimpleToast";
import { PopupContainer } from "./components/GeneralPopup";
//import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login.tsx";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/dashboard/Profile";
import PasswordChange from "./pages/auth/PasswordChange";
import CustomerSupport from "./pages/support/CustomerSupport";
import NewInquiry from "./pages/support/NewInquiry";
import NotificationDetail from "./pages/dashboard/NotificationDetail";
import ClaimsList from "./pages/claims/ClaimsList";
import ClaimDetail from "./pages/claims/ClaimDetail";
import NewClaim from "./pages/claims/NewClaim";
import MedicalCertificateReminder from "./pages/claims/MedicalCertificateReminder";
import MedicalCertificateConfirmation from "./pages/claims/MedicalCertificateConfirmation";
import CancelInsurance from "./pages/insurance/CancelInsurance";
// import InquiryDetail from "./pages/InquiryDetail";
/* import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import ChangeEmail from "./pages/ChangeEmail";
import CustomerSupport from "./pages/CustomerSupport";
import Billing from "./pages/Billing";
import Payment from "./pages/Payment";
import CancelInsurance from "./pages/CancelInsurance";
import Documents from "./pages/Documents";
import Contracts from "./pages/Contracts"; */
import ImportantTerms from "./pages/insurance/ImportantTerms.tsx";
import ContractDetails from "./pages/insurance/ContractDetails.tsx";
import ApplicationsIndex from "./pages/application/ApplicationsIndex.tsx";
import DevOpsPage from "./pages/devops.tsx";
import RelationshipDiagram from "./components/RelationshipDiagram";
import ResetPassword from "./components/ResetPassword";
import SubmitIdentity from "./pages/application/SubmitIdentity";
import CreateAccountSuccess from "./pages/application/CreateAcountSuccess";
import ApplicationShow from "./components/ApplicationShow";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ApplicationProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<IndexLayout />}>
              <Route index element={<Index />} />
            </Route>
            <Route path="/" element={<MainLayout />}>
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="statements" element={<InsuranceStatements />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="insured-policy" element={<Privacy />} />
              <Route path="submitIdentity" element={<SubmitIdentity />} />

              <Route
                path="createAccountSuccess"
                element={<CreateAccountSuccess />}
              />
              {/* Authentication routes */}
              <Route path="login" element={<Login />} />
              {/*
               NO REGISTER YET
               <Route path="register" element={<Register />} /> */}
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />

              {/* Protected customer routes */}
              {/*  <Route
                path="dashboard"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              /> */}
              <Route path="dashboard" element={<Dashboard />} />

              {/*   <Route
                path="profile"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <UserProfile />
                  </ProtectedRoute>
                }
              /> */}
              <Route path="profile" element={<Profile />} />
              <Route path="password-change" element={<PasswordChange />} />

              {/*  <Route
                path="change-email"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <ChangeEmail />
                  </ProtectedRoute>
                }
              /> */}

              {/* Workflow 1: Customer Query */}
              <Route path="supports" element={<CustomerSupport />} />
              <Route path="supports/new" element={<NewInquiry />} />
              <Route path="notification/:id" element={<NotificationDetail />} />
              {/*  <Route path="supports/:id" element={<InquiryDetail />} /> */}

              {/* Workflow 2: Payment/Billing */}
              {/*  <Route
                path="billing"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <Billing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="payment"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <Payment />
                  </ProtectedRoute>
                }
              /> */}

              {/* Workflow 3: Cancel Insurance */}
              <Route path="cancel-insurance" element={<CancelInsurance />} />

              {/* Workflow 4: Check Terms/Applications/Contract */}
              {/*   <Route
                path="documents"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <Documents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="contracts"
                element={
                  <ProtectedRoute requiredRole="customer">
                    <Contracts />
                  </ProtectedRoute>
                }
              /> */}

              {/* Application flow (existing) */}
              <Route path="application" element={<Application />} />
              <Route
                path="insured-application"
                element={<InsuredApplication />}
              />
              <Route path="success" element={<Success />} />
              <Route path="account" element={<Account />} />
              <Route path="newContractLogin" element={<NewContractLogin />} />
              <Route path="twoStepVerify" element={<TwoStepVerify />} />
              <Route path="applications" element={<ApplicationsIndex />} />
              <Route path="applications/:id" element={<ApplicationShow />} />
              <Route path="devops" element={<DevOpsPage />} />
              <Route
                path="relationship-diagram"
                element={<RelationshipDiagram />}
              />
              {/* Claims process */}
              <Route path="claims" element={<ClaimsList />} />
              <Route
                path="claims/medical-reminder"
                element={<MedicalCertificateReminder />}
              />
              <Route
                path="claims/medical-confirmation"
                element={<MedicalCertificateConfirmation />}
              />
              <Route path="claims/new" element={<NewClaim />} />
              <Route path="claims/:id" element={<ClaimDetail />} />
              <Route
                path="mypage/important-terms"
                element={<ImportantTerms />}
              />
              <Route
                path="mypage/contract-details"
                element={<ContractDetails />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
        <PopupContainer />
      </ApplicationProvider>
    </AuthProvider>
  );
};

export default App;
