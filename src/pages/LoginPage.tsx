import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { LoginData } from '../interfaces/LoginInterface';

import 'react-datepicker/dist/react-datepicker.css';

export const LoginPage = () => {
  const defaultValues: LoginData = {
    username: 'carodavid',
    password: '123456'
  };

  const { signIn, loading } = useContext( AuthContext );
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({ defaultValues });
  
  const onSubmit = ( data: LoginData ) => {
    signIn({ username: data.username, password: data.password });
  }

  useEffect(() => {
    const body = document.querySelector('body');
    body?.classList.add('bg-gradient-primary');

    return () => {
      body?.classList.remove('bg-gradient-primary');
    };
  }, []);

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div className='col-xl-10 col-lg-12 col-md-9'>
          <div className='card o-hidden border-0 shadow-lg my-5'>
            <div className='card-body p-0'>
              <div className='row'>
                <div className='col-lg-6 d-none d-lg-block bg-login-image'></div>
                <div className='col-lg-6'>
                  <div className='p-5'>
                    <div className='text-center'>
                      <h1 className='h4 text-gray-900 mb-4'>Welcome Back!</h1>
                    </div>

                    <form 
                      className='user'
                      onSubmit={ handleSubmit( onSubmit ) }
                    >
                      <div className='form-group'>
                        <input 
                          type='text' 
                          placeholder='Enter your username'
                          className={`form-control form-control-user ${ errors.username ? 'is-invalid' : '' }`}
                          autoComplete='off'
                          { 
                            ...register('username', { 
                              required: { value: true, message: 'User is required' },
                            }) 
                          }
                        />

                        { errors.username && (
                          <div className='invalid-feedback'>
                            { errors.username.message }
                          </div>
                        )}
                      </div>

                      <div className='form-group'>
                        <input 
                          type='password' 
                          placeholder='********'
                          className={`form-control form-control-user ${ errors.password ? 'is-invalid' : '' }`}
                          { 
                            ...register('password', { 
                              required: { value: true, message: 'Password is required' },
                            })
                          }
                        />

                        { errors.password && (
                          <div className='invalid-feedback'>
                            { errors.password.message }
                          </div>
                        )}
                      </div>

                      <button 
                        className='btn btn-primary btn-user btn-block'
                        disabled={ loading }
                      >
                        { 
                          loading 
                            ? <> <i className='fas fa-spinner fa-pulse'></i> Loading, please wait... </>
                            : 'Login' 
                        }
                      </button>
                      
                      <hr />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}