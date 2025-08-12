import React from "react";
import LoginCard from "@/components/LoginCard";

const Login: React.FC = () => {
  return (
    <div>
      <LoginCard to="/dashboard" type="myPage" />
    </div>
  );
};

export default Login;
