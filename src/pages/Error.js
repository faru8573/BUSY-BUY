import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }, []);
  return (
    <div className="container">
      <div className="text-center bg-red-500 w-full h-full p-2 mt-2">
        <h1 className="text-4xl text-center text-white">
          Something went wrong
        </h1>
      </div>
    </div>
  );
};

export default ErrorPage;
