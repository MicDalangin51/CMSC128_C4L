import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import "./Login.css";
import logo from "../images/cas-logo.png";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null
      })
  };

  const validateForm = () => {
    const { email, password } = form;
    const newErrors = {};
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!email || email === '') newErrors.email = "Please enter your email address!"
    else if (regex.test(email) === false) {
      newErrors.email = "Please enter your email address in this format: yourname@example.com"
    };

    if (!password || password === '') newErrors.password = "Please enter your password!"

    return newErrors;
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const navigateTo = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigateTo("/");
  }, [isAuthenticated]);

  function login(e) {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    }

    console.log("form submitted");
    console.log(form);


    const credentials = {
      email: form.email,
      password: form.password,
    };

    fetch("api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log(body);

        if (body.success) {
          setIsAuthenticated(true);
        } else {
          alert("Failed to log in");
        }
      });
  
  }

  return (
    <>
      <div className="leftHalf"></div>
      <div className="rightHalf">
        <Container className="mt-5 p-5">
          <img src={logo} width="150" height="150" className="logo" />
          <h2>GWA Verifier</h2>
          <br />
          <Form onSubmit={login} className="login-form">
            <Form.Group controlId="formEmail" className="w-50">
              <Form.Label className="input-label">Email</Form.Label>
              <Form.Control
                //type="email"
                title="Enter email"
                placeholder="Enter email"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <br />
            <Form.Group controlId="formPassword" className="w-50">
              <Form.Label className="input-label">Password</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type={passwordShown ? "text" : "password"}
                  title="Enter password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) => setField('password', e.target.value)}
                  isInvalid={!!errors.password}
                />  
                <Button
                  onClick={togglePassword}
                  variant="outline-secondary"
                  id="button-addon2"
                >
                  {passwordShown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </Button>
                <Form.Control.Feedback type='invalid' >
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <br />
            <Button
              variant="outline-light w-50"
              type="submit"
              className="login-button"
            >
              Login
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default Login;
