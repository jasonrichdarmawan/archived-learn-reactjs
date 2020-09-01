import React from "react";
import { NavigationBar, EmployeeInformation } from "../../organisms";

export const DashboardTemplate = ({
  routes,
  authData,
  setAuthData,
  formInputs,
  handleChange,
  handleButton,
  readOnly,
  handleSubmit,
  res,
  errorMessage,
}) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavigationBar
        routes={routes}
        authData={authData}
        setAuthData={setAuthData}
      />
      <EmployeeInformation
        formInputs={formInputs}
        handleChange={handleChange}
        handleButton={handleButton}
        readOnly={readOnly}
        handleSubmit={handleSubmit}
        res={res}
        errorMessage={errorMessage}
      />
    </div>
  );
};
