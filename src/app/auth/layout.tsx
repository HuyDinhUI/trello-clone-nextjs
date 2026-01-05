import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-[url(/bg-login-light.jpg)] dark:bg-[url(/bg-login-dark.jpg)]"
      
    >
      <div className="sm:w-120 w-85 min-h-[100px] rounded-xl bg-white dark:bg-transparent dark:backdrop-blur-md dark:ring dark:ring-gray-500 shadow-md flex overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
