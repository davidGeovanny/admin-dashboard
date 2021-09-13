import React, { useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { InputAttr } from '../interfaces/InputInterface';
import { InputForm } from '../components/InputForm';

export const RegisterPage = () => {
  const initState: InputAttr[] = [
    { name: 'name',            value: '', isValid: null },
    { name: 'first-lastname',  value: '', isValid: null },
    { name: 'second-lastname', value: '', isValid: null },
    { name: 'email',           value: '', isValid: null },
    { name: 'password',        value: '', isValid: null },
    { name: 'repeat-password', value: '', isValid: null },
  ];

  const { form, setForm, formIsValid, errorMessage, handleSubmit, reset } = useForm( initState );
  const [ name, firstLastname, secondLastname, email, password, repeatPassword ] = form;

  const checkPasswords = () => {
    if( password.value.trim().length > 0 ) {
      if( password.value.trim() !== repeatPassword.value.trim() ) {
        setForm(( form => {
          return form.map( input => {
            if( input.name === 'repeat-password' ) {
              input.isValid = false;
            }
            return input;
          })
        }));
      } else {
        setForm(( form => {
          return form.map( input => {
            if( input.name === 'repeat-password' ) {
              input.isValid = true;
            }
            return input;
          })
        }));
      }
    }
  }

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
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          <div className="row">

            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                </div>
                {/* <form className="user">
                  <div className="form-group">
                    <InputForm
                      state={ name }
                      setState={ setForm }
                      placeholder='Enter your name(s)...'
                      type='text'
                      validation='name'
                      errorMessage='Please provide a valid name'
                    />
                  </div>

                  <div className="form-group row">
                    <div className="col-sm-6">
                      <InputForm
                        state={ firstLastname }
                        setState={ setForm }
                        placeholder='Enter your first surname...'
                        type='text'
                        validation='name'
                        errorMessage='Please provide a valid surnname'
                      />
                    </div>
                    <div className="col-sm-6">
                    <InputForm
                        state={ secondLastname }
                        setState={ setForm }
                        placeholder='Enter your second surname...'
                        type='password'
                        validation='name'
                        errorMessage='Please provide a valid surnname'
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <InputForm
                      state={ email }
                      setState={ setForm }
                      placeholder='Enter your email address...'
                      type='text'
                      validation='email'
                      errorMessage='Please provide a valid email'
                    />
                  </div>

                  <div className="form-group row">
                    <div className="col-sm-6">
                      <InputForm
                        state={ password }
                        setState={ setForm }
                        placeholder='********'
                        type='password'
                        validation='password'
                        errorMessage='Password must be 4 to 12 characters long'
                      />
                    </div>
                    <div className="col-sm-6">
                    <InputForm
                        state={ repeatPassword }
                        setState={ setForm }
                        placeholder='********'
                        type='password'
                        callback={ checkPasswords }
                        errorMessage='Passwords must match'
                      />
                    </div>
                  </div>
                  <a
                    href="login.html"
                    className="btn btn-primary btn-user btn-block"
                  >
                    Register Account
                  </a>
                  <hr />
                  
                </form> */}
                <hr />
                <div className="text-center">
                  <a className="small" href="login.html">
                    Already have an account? Login!
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
