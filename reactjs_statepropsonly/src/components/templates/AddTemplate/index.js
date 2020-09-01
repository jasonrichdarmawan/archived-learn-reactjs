import React from "react";
import { NavigationBar, AddForm } from "../../organisms";

export const AddTemplate = ({
  routes,
  authData,
  setAuthData,
  authDatabase,
  setAuthDatabase,
  departmentDatabase,
  setDepartmentDatabase,
  formInputs,
  handleChange,
  readOnly,
  errorMessage,
  res,
  handleSubmit,
  ...props
}) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <NavigationBar
        routes={routes}
        authData={authData}
        setAuthData={setAuthData}
      />
      <AddForm
        formInputs={formInputs}
        handleChange={handleChange}
        errorMessage={errorMessage}
        readOnly={readOnly}
        res={res}
        handleSubmit={handleSubmit}
        {...props}
      />
    </div>
  );
};
