import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, Resolver } from 'react-hook-form';

type FormValues = {
  user    : string;
  password: string;
}

export const LoginPage = () => {
  const initData: FormValues = {
    user: 'Usuario',
    password: '123456'
  }

  const { register, handleSubmit, formState, reset, getValues, setError, setValue } = useForm<FormValues>();
  const { errors } = formState;
  const { password } = getValues();

  const onSubmit = ( data: FormValues, e: any ) => {
    // e.preventDefault();
    console.log('entra');
    // console.log(data.user);
    // console.log(getValues());

    // const { password } = getValues();

    // if( password.trim() !== "password" ) {
    //   setError('password', { message: 'No concuerda' })
    // } else {
    //   console.log('concuerda');
    //   reset();
    // }
    // console.log(e);
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
                          {...register('user')}
                          // { 
                          //   ...register('user', { 
                          //     required: { value: true, message: 'Field required' },
                          //     minLength: { value: 4, message: 'Min length is 4' },
                          //   }) 
                          // }
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
                          {...register('password')}
                          // { 
                          //   ...register('password', { 
                          //     required: { value: true, message: 'Password required' },
                          //     validate: value => value === '12345' || 'No coincide',
                          //   }) 
                          // }
                        />

                        { errors.password && (
                          <div className='invalid-feedback'>
                            { errors.password && errors.password.message }
                          </div>
                        )}
                      </div>


                      {/* <div className='form-group'>
                        <input 
                          type='password' 
                          name='password'
                          placeholder='********'
                          className='form-control form-control-user'
                        />
                      </div> */}

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

















// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useForm } from '../hooks/useForm';
// import { InputAttr } from '../interfaces/InputInterface';
// import { InputForm } from '../components/InputForm';

// export const LoginPage = () => {
//   const initState: InputAttr[] = [
//     { name: 'user',     value: '', isValid: null },
//     { name: 'password', value: '', isValid: null },
//   ];

//   const { form, setForm, formIsValid, errorMessage, handleSubmit, reset } = useForm( initState );
//   const [ user, password ] = form;

//   useEffect(() => {
//     if( formIsValid ) {
//       /** TODO: Call endpoint to login */
//       reset();
//     }
//   }, [ formIsValid, reset ]);

//   useEffect(() => {
//     const body = document.querySelector('body');
//     body?.classList.add('bg-gradient-primary');

//     return () => {
//       body?.classList.remove('bg-gradient-primary');
//     };
//   }, []);

//   return (
//     <div className='container'>
//       <div className='row justify-content-center'>
//         <div className='col-xl-10 col-lg-12 col-md-9'>
//           <div className='card o-hidden border-0 shadow-lg my-5'>
//             <div className='card-body p-0'>
//               <div className='row'>
//                 <div className='col-lg-6 d-none d-lg-block bg-login-image'></div>
//                 <div className='col-lg-6'>
//                   <div className='p-5'>
//                     <div className='text-center'>
//                       <h1 className='h4 text-gray-900 mb-4'>Welcome Back!</h1>
//                     </div>

//                     <form className='user' onSubmit={ handleSubmit }>

//                       <InputForm
//                         state={ user }
//                         setState={ setForm }
//                         placeholder='Enter username...'
//                         type='text'
//                       />

//                       <InputForm
//                         state={ password }
//                         setState={ setForm }
//                         placeholder='********'
//                         type='password'
//                       />

//                       { formIsValid === false && <div className='alert alert-danger'>{ errorMessage }</div> }
                      
//                       <button className='btn btn-primary btn-user btn-block'>
//                         Login
//                       </button>
//                     </form>

//                     <hr />

//                     <div className='text-center'>
//                       <Link className='small' to='/register'>
//                         Create an Account!
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
