import React, { useContext } from "react";
import { ListTemplate } from "../../components";
import { RoutesContext, AuthDatabaseContext } from "../../providers";

export const ListPage = (props) => {
  const { authDatabase } = useContext(AuthDatabaseContext);
  const routes = useContext(RoutesContext);

  const id = props.match.params.id && props.match.params.id;
  const formInputs = props.match.params.id && [
    {
      label: "uid",
      type: "text",
      value: authDatabase[id].uid,
      readOnly: true,
    },
    {
      label: "username",
      type: "text",
      value: authDatabase[id].username,
      readOnly: true,
    },
    {
      label: "name",
      type: "text",
      value: authDatabase[id].name,
      readOnly: true,
    },
    {
      label: "phoneNumber",
      type: "text",
      value: authDatabase[id].phoneNumber,
      readOnly: true,
    },
    {
      label: "email",
      type: "email",
      value: authDatabase[id].email,
      readOnly: true,
    },
  ];

  return <ListTemplate {...props} routes={routes} formInputs={formInputs} />;
};
