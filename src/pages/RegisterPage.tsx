import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { regularExpressions } from '../data/regExp';

interface FormValues {
  name          : string;
  firstLastName : string;
  secondLastName: string;
  email         : string;
  password      : string;
  repeatPassword: string;
}

export const RegisterPage = () => {

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<FormValues>();
  const { password } = getValues();

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
      <div className='card o-hidden border-0 shadow-lg my-5'>
        <div className='card-body p-0'>
          <div className='row'>

            <div className='col-lg-7'>
              <div className='p-5'>
                <div className='text-center'>
                  <h1 className='h4 text-gray-900 mb-4'>Create an Account!</h1>
                </div>

                <form 
                  className='user'
                  onSubmit={ handleSubmit( onSubmit ) }
                >
                  <div className='form-group'>
                    <input 
                      type='text' 
                      placeholder='Enter your name'
                      className={`form-control form-control-user ${ errors.name ? 'is-invalid' : '' }`}
                      autoComplete='off'
                      { 
                        ...register('name', { 
                          required  : { value: true, message: 'Name is required' },
                          pattern   : { value: regularExpressions.name, message: 'Provide a valid name' },
                          minLength : { value: 1, message: 'Name is required' },
                          maxLength : { value: 40, message: 'Name is too long' },
                        })
                      }
                    />

                    { errors.name && (
                      <div className='invalid-feedback'>{ errors.name.message }</div>
                    )}
                  </div>

                  <div className='form-group row'>
                    <div className='col-sm-6 mb-3 mb-sm-0'>
                      <input 
                        type='text' 
                        placeholder='Enter your first lastname'
                        className={`form-control form-control-user ${ errors.firstLastName ? 'is-invalid' : '' }`}
                        autoComplete='off'
                        { 
                          ...register('firstLastName', { 
                            required  : { value: true, message: 'First lastname is required' },
                            pattern   : { value: regularExpressions.name, message: 'Provide a valid first lastname' },
                            minLength : { value: 3, message: 'First lastname is too short' },
                            maxLength : { value: 40, message: 'First lastname is too long' },
                          }) 
                        }
                      />

                      { errors.firstLastName && (
                        <div className='invalid-feedback'>{ errors.firstLastName.message }</div>
                      )}
                    </div>

                    <div className='col-sm-6'>
                      <input 
                        type='text' 
                        placeholder='Enter your second lastname'
                        className={`form-control form-control-user ${ errors.secondLastName ? 'is-invalid' : '' }`}
                        autoComplete='off'
                        { 
                          ...register('secondLastName', { 
                            required  : { value: true, message: 'Second lastname is required' },
                            pattern   : { value: regularExpressions.name, message: 'Provide a valid second lastname' },
                            minLength : { value: 3, message: 'Second lastname is too short' },
                            maxLength : { value: 40, message: 'Second lastname is too long' },
                          }) 
                        }
                      />

                      { errors.secondLastName && (
                        <div className='invalid-feedback'>{ errors.secondLastName.message }</div>
                      )}
                    </div>
                  </div>

                  <div className='form-group'>
                    <input 
                      type='text' 
                      placeholder='Enter your email'
                      className={`form-control form-control-user ${ errors.email ? 'is-invalid' : '' }`}
                      autoComplete='off'
                      { 
                        ...register('email', { 
                          required: { value: true, message: 'Email is required' },
                          pattern : { value: regularExpressions.email, message: 'Provide a valid email' },
                        }) 
                      }
                    />

                    { errors.email && (
                      <div className='invalid-feedback'>{ errors.email.message }</div>
                    )}
                  </div>

                  <div className='form-group row'>
                    <div className='col-sm-6 mb-3 mb-sm-0'>
                      <input 
                        type='password' 
                        placeholder='Enter your password'
                        className={`form-control form-control-user ${ errors.password ? 'is-invalid' : '' }`}
                        { 
                          ...register('password', { 
                            required  : { value: true, message: 'Password is required' },
                            pattern   : { value: regularExpressions.password, message: 'Password provided is not valid' },
                            minLength : { value: 4, message: 'Password is too short' },
                          }) 
                        }
                      />

                      { errors.password && (
                        <div className='invalid-feedback'>{ errors.password.message }</div>
                      )}
                    </div>
                    
                    <div className='col-sm-6'>
                      <input 
                        type='password' 
                        placeholder='Repeat password'
                        className={`form-control form-control-user ${ errors.repeatPassword ? 'is-invalid' : '' }`}
                        { 
                          ...register('repeatPassword', {
                            required: { value: true, message: 'Need match the passwords' },
                            validate: value => value === password || 'The passwords do not match'
                          }) 
                        }
                      />

                      { errors.repeatPassword && (
                        <div className='invalid-feedback'>{ errors.repeatPassword.message }</div>
                      )}
                    </div>
                  </div>

                  <button className='btn btn-primary btn-user btn-block'>
                    Register Account
                  </button>
                  
                </form>

                <hr />

                <div className='text-center'>
                  <Link className='small' to='/login'>
                    Already have an account? Login!
                  </Link>
                </div>
              </div>
            </div>
            
            <div className='col-lg-5 d-none d-lg-block bg-register-image'></div>
          </div>
        </div>
      </div>
    </div>
  );
}
