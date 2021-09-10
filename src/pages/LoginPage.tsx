import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { InputAttr } from '../interfaces/InputInterface';
import { InputForm } from '../components/InputForm';

export const LoginPage = () => {
  const initState: InputAttr[] = [
    { name: 'user',     value: '', isValid: null },
    { name: 'password', value: '', isValid: null },
  ];

  const { form, setForm, formIsValid, errorMessage, handleSubmit, reset } = useForm( initState );
  const [ user, password ] = form;

  useEffect(() => {
    if( formIsValid ) {
      /** TODO: Call endpoint to login */
      reset();
    }
  }, [ formIsValid, reset ]);

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

                    <form className='user' onSubmit={ handleSubmit }>

                      <InputForm
                        state={ user }
                        setState={ setForm }
                        placeholder='Enter username...'
                        type='text'
                      />

                      <InputForm
                        state={ password }
                        setState={ setForm }
                        placeholder='********'
                        type='password'
                      />

                      { formIsValid === false && <div className='alert alert-danger'>{ errorMessage }</div> }
                      
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
};
