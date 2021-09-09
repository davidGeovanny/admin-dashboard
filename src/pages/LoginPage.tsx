import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

export const LoginPage = () => {

  const { email, password, handleInputChange } = useForm({
    email: '',
    password: '',
  });

  useEffect(() => {
    const body = document.querySelector('body');
    body?.classList.add('bg-gradient-primary');

    return () => {
      body?.classList.remove('bg-gradient-primary');
    };
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>

                    <form className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          placeholder="Enter Email Address..."
                          name='email'
                          onChange={ handleInputChange }
                          value={ email }
                        />
                        <label className="error-input-label">
                          <em>Remember Me</em>
                        </label>
                      </div>

                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          placeholder="Password"
                          name='password'
                          onChange={ handleInputChange }
                          value={ password }
                        />
                      </div>

                      {/* <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                          />
                          <label className="custom-control-label">
                            Remember Me
                          </label>
                        </div>
                      </div> */}
                      
                      <button
                        // href="index.html"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Login
                      </button>
                    </form>

                    <hr />

                    <div className="text-center">
                      <Link className="small" to="/login">
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link className="small" to="/register">
                        Create an Account!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
