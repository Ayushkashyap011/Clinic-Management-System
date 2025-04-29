import React from 'react'

const Validation = (values) => {

       let errors = {};
      if (!values.email) {
        errors.email = "Email Required";
      }
      if (!values.password) {
        errors.password = "Password Required";
      } else if (values.password.length < 8) {
        errors.password = "Password is less than 8 digits";
      }
      return errors;
}

export default Validation;