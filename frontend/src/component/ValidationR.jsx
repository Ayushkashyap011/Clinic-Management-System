import React, { useState } from "react";

const ValidationR = (values) => {
  let errors = {}
  if (!values.firstName) {
    errors.firstName = "Name required";
  }
  if (!values.lastName) {
    errors.lastName = "Name required";
  }
  if (!values.phone) {
    errors.phone = "Phone required";
  }
  if (!values.email) {
    errors.email = "Email Required";
  }
  if (!values.password) {
    errors.password = "Password Required";
    
  } else if (values.password.length < 8) {
    errors.password = "Password is less than 8 digits";
  }
  return errors;
};

export default ValidationR;