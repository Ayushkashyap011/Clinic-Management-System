import "./Login.css";
import { useEffect, useState,useContext } from "react";
import Validation from "./Validation";
import { Box, Button, Card, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaUserMd } from "react-icons/fa"; 
import UserContext from "../context/UserContext";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  let VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  //console.log(VITE_BACKEND_URL, "url show");

  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const {setProtect} =useContext(UserContext)

  async function fetchData() {
    let res = await fetch(`${VITE_BACKEND_URL}/api/admins`);
    let loginarr = await res.json();
    setData(loginarr);
    console.log(data + "login details")
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(Validation(values));
  }

  useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      values.email !== "" &&
      values.password !== ""
    ) {
      const user = data.find((el) => el.email === values.email);

      if (user) {
        if (user.password === values.password) {
          handleNavigate();
        } else {
          alert("Wrong password");
        }
      } else {
        alert("Email is not registered, you can create a new");
        setProtect(true)
      }
    }
  }, [errors]);

  const nav = useNavigate();


  function handleNavigate() {
    //setProtect(true)
    nav("/dashboard");
  }

  return (
    <div className="outerBox">
      <Box className="login-container">
        <Card className="login-box">
          <h2>LOGIN</h2>
          <form className="form" onSubmit={handleSubmit}>
            <label>Email</label>
            <Input
              className="input-glow"
              type="email"
              focusBorderColor="darkblue"
              placeholder="something@gmail.com"
              name="email"
              borderRadius="none"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <label>Password</label>
            <Input
              className="input-glow"
              type="password"
              focusBorderColor="darkblue"
              placeholder="anything@123"
              borderRadius="none"
              value={values.password}
              name="password"
              onChange={handleChange}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}

            <a href="#" className="forgot-password">Forget Password?</a>

            <Button
              className="btn-primary"
              colorScheme="facebook"
              size="md"
              variant="solid"
              type="submit"
            >
              LOG IN
            </Button>
          </form>
        </Card>
        <FaUserMd className="doctor-icon" />
      </Box>
    </div>
  );
};

export default Login;
