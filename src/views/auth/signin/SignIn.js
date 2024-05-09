import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import { LOGIN } from '../../../helpers/backendHelpers';
import { APIClient } from '../../../helpers/apiHelpers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import packReal from "../../../assets/images/packreal.png";

const Signin = () => {
  
  const api = new APIClient();
  const history = useHistory();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      if (validateForm()) {
        const response = await api.signup(LOGIN, formData);
        if (response && response.accessToken) {
          localStorage.setItem('authUser', JSON.stringify(response));
          history.push('/app/account');
        }
      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <React.Fragment>
      <Breadcrumb />
      <ToastContainer />
      <div className="auth-content">
        <div>
          <h2 className='position-align'>Welcome Back</h2>
        </div>
        <div className="container">
          <Row>
            <Col md={5}>
              <Card className="borderless card-style">
                <Card.Body className="text-center">
                  <form onSubmit={handleSignIn}>
                    <label className='text-start d-flex'>User Name Or Email </label>
                    <div className="input-group mb-3">
                      <input
                        id='input-style'
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-control ${errors.email && 'is-invalid'}`}
                        placeholder="Enter"
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <label className='text-start d-flex'>Password</label>
                    <div className="input-group mb-4">
                      <input
                        id='input-style'
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`form-control ${errors.password && 'is-invalid'}`}
                        placeholder="Enter"
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" id="rememberMe" name="rememberMe" />
                          <label className="form-check-label login-text text-start d-flex" htmlFor="rememberMe">
                            Remember me
                          </label>
                        </div>
                      </div>

                      <div className="login-text col-md-6 text-end">
                        <a href="/">Forgot Password?</a>
                      </div>
                    </div>

                    <button id="input-style" type="submit" className="btn btn-outline-primary mb-4 w-100 ">Submit</button>
                  </form>
                  <p className="mb-2">
                    Don't have an account?
                    <NavLink to="/auth/signUp-1" className="f-w-600 mx-2">
                      Sign Up
                    </NavLink>
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={7} className='justify-content-center d-flex'>
              <img src={packReal} alt="not found" className="img-fluid img-styling" />
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );

};

export default Signin;
