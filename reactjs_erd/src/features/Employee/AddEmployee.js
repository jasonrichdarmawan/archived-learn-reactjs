import React from "react";

import { AlertFormButton } from "components/AlertFormButton";

import { firebase } from "api/firebase";

export function AddEmployee() {
  const formArrObj = [
    {
      controlId: "name",
      type: "text",
      placeholder: "Enter name",
      feedback: "Please provide a valid name.",
    },
    {
      controlId: "email",
      type: "email",
      placeholder: "Enter email",
      feedback: "Please provide a valid email.",
    },
    {
      controlId: "phone",
      type: "text",
      placeholder: "Enter phone number",
      feedback: "Please provide a valid phone number.",
    },
    {
      controlId: "password",
      type: "password",
      placeholder: "Enter password",
      feedback: "Please provide a valid password.",
    },
    {
      controlId: "street",
      type: "text",
      placeholder: "Enter street",
      feedback: "Please provide a valid street.",
    },
    {
      controlId: "city",
      type: "text",
      placeholder: "Enter city",
      feedback: "Please provide a valid city.",
    },
    {
      controlId: "zip",
      type: "text",
      placeholder: "Enter zip",
      feedback: "Please provide a valid zip.",
    },
  ];
  const extraSelect = [
    {
      controlId: "purchase",
      label: "Access Rights: Purchase",
      options: [
        {
          label: "Administrator",
          value: 0,
        },
        {
          label: "User",
          value: 1,
        },
      ],
    },
    {
      controlId: "inventory",
      label: "Access Rights: Inventory",
      options: [
        {
          label: "Administrator",
          value: 0,
        },
        {
          label: "User",
          value: 1,
        },
      ],
    },
    {
      controlId: "sales",
      label: "Access Rights: Sales",
      options: [
        {
          label: "Administrator",
          value: 0,
        },
        {
          label: "User: Read, Update All Documents",
          value: 1,
        },
        {
          label: "User: Read, Update Own Documents",
          value: 2,
        },
      ],
    },
    {
      controlId: "administration",
      label: "Access Rights: Administration",
      options: [
        {
          label: "Administrator",
          value: 0,
        },
        {
          label: "Access Rights",
          value: 1,
        },
      ],
    },
  ];
  const [inputs, setInputs] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    street: "",
    city: "",
    zip: "",
    purchase: "",
    sales: "",
    inventory: "",
    administration: "",
  });
  function handleChange(event) {
    const { id, value } = event.target;
    setInputs((inputs) => ({ ...inputs, [id]: value }));
  }

  const {
    name,
    email,
    phone,
    password,
    street,
    city,
    zip,
    purchase,
    sales,
    inventory,
    administration,
  } = inputs;
  const [validated, setValidated] = React.useState();
  const [isLoading, setLoading] = React.useState();
  const [error, setError] = React.useState();
  const [res, setRes] = React.useState();
  function handleSubmit(event) {
    console.log(
      `AddEmployee() handleSubmit() name: ${name}, email: ${email}, phone: ${phone}, password: ${password}, street: ${street}, city: ${city}, zip: ${zip} purchase: ${purchase}, sales: ${sales}, inventory: ${inventory}, administration: ${administration}`
    );
    console.log(typeof administration);
    event.stopPropagation();
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      setLoading(true);

      // const fetchFirestore = firebase
      //   .app()
      //   .functions("asia-southeast2")
      //   .httpsCallable("fetchFirestore");
      // fetchFirestore("user").then(({ data }) => {
      //   // console.log("employeeSlice(), fetchFirestore(), data", data);
      //   dispatch(fetchUsers(data));
      // });
      const createUser = firebase
        .app()
        .functions("asia-southeast2")
        .httpsCallable("createUser");
      createUser({
        email: email,
        password: password,
        displayName: name,
        phone: phone,
        street: street,
        city: city,
        zip: zip,
        administration:
          administration !== "" ? parseInt(administration) : undefined,
        purchase: purchase !== "" ? parseInt(purchase) : undefined,
        inventory: inventory !== "" ? parseInt(inventory) : undefined,
        sales: sales !== "" ? parseInt(sales) : undefined,
      })
        .then(() => {
          setRes(true);
          setLoading(false);
        })
        .catch((error) => {
          console.log("AddEmployee() createUser catch error", error);
          setError("Failed to create new user.");
          setLoading(false);
        });
    }
  }

  return (
    <>
      <h5>Add Employee</h5>
      <div className="container w-auto mt-3">
        <AlertFormButton
          formArrObj={formArrObj}
          extraSelect={extraSelect}
          handleChange={handleChange}
          validated={validated}
          isLoading={isLoading}
          res={res}
          error={error}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
}
