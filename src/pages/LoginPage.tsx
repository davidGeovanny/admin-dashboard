import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface FormValues {
  user    : string;
  password: string;
}

export const LoginPage = () => {
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

  const onSubmit = ( data: FormValues ) => {
    // TODO: Set data to login
    console.log( data );
    reset();
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
                          className={`form-control form-control-user ${ errors.user ? 'is-invalid' : '' }`}
                          autoComplete='off'
                          { 
                            ...register('user', { 
                              required: { value: true, message: 'User is required' },
                            }) 
                          }
                        />

                        { errors.user && (
                          <div className='invalid-feedback'>
                            { errors.user && errors.user.message }
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
                            { errors.password && errors.password.message }
                          </div>
                        )}
                      </div>

                      <button className='btn btn-primary btn-user btn-block'>
                        Login
                      </button>
                    </form>

                    <hr />

                    <div className='text-center'>
                      <Link className='small' to='/register'>
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
}