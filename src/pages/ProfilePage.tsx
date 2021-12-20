import React from 'react'

export const ProfilePage = () => {
  return (
    <div>
      
    </div>
  )
}


// import React, {  useContext, useEffect, useReducer, useState } from 'react'
// import adminApi from '../helpers/adminApi';
// import { 
//   EmployeeResponse, 
//   Employee, 
//   UpdateEmployeeResponse, 
//   UpdateResponse, 
//   UpdateResponsePassword, 
//   UpdateEmployeeData, 
//   UpdatePasswordData 
// } from '../interfaces/ProfilePageInterface';
// import { AuthContext } from '../context/AuthContext';
// import { useForm } from 'react-hook-form';
// import { useToastNotification } from '../hooks/useToastNotification';
// // import { UserResponse } from '../interfaces/ProfileInterface';

// //contraseña actual '123456'

// interface EmployeeValues {
//   name:            string;
//   first_lastname:  string;
//   second_lastname: string;
//   email:           string;
//   gender:          string;
// };

// interface UserValues {
//   user:        string;
//   id_employee: number;
// };

// export const ProfilePage = () => {
//   const { user } = useContext( AuthContext );

//   const [ employeeValues, setEmployeeValues ] = useState<EmployeeValues>({
//     name:            '',
//     first_lastname:  '',
//     second_lastname: '',
//     email:           '',
//     gender:          '',
//   });

//   const [ userValues, setUserValues ] = useState<UserValues>({
//     user:        '',
//     id_employee: 0,
//   });


//   // const getUserData = async () => {
//   //   if( !user ) return;

//   //   try {
//   //     const { data } = await adminApi.get<UserResponse>(`/users`, {
//   //       params: { id: user.id }
//   //     });

//   //     setUserValues({
//   //       id_employee: data.data[0].id_employee,
//   //       user: data.data[0].username,
//   //     });

//   //     return data;
//   //   } catch ( err ) {
//   //     return undefined;
//   //   }
//   // }

//   useEffect(() => {
//     // getUserData();
//   }, []);
  

//   const initState = {
//     loading: false
//   }

//   //use form for update employee
//   const { 
//     register, 
//     handleSubmit, 
//     formState: { errors}, 
//     getValues, 
//     setValue} = useForm<UpdateEmployeeData>();

//   //use form for change password
//   const { 
//     register: register2, 
//     handleSubmit: handleSubmit2, 
//     formState: { errors: errors2 }, 
//     getValues: getValues2 } = useForm<UpdatePasswordData>();
 

//   const [employee, setEmployee] = useState<Employee>();  
//   const [empUpdt, setEmpUpdt] = useState<UpdateResponse>();
//   const [updPass, setupdPass] = useState<UpdateResponsePassword>();
//   const { displayToast, deleteAllToasts } = useToastNotification();  
//   const [loading, setloading] = useState(initState.loading);

//   //get the user 
//   const getUser = async () => {
//     try {
//       if (!user) return; 
//       const { data } = await adminApi.get<EmployeeResponse> ('/employees', {
//         params: { 
//           id:user.id
//         },
//       });

//       // set to employee its values 
//       setEmployee(data.data[0]);

//       //set default values to the fields 
//       if (data.ok == true){
//         //set values for all the field
//         setValue("name", data.data[0].name, {
//           shouldValidate: true,
//           shouldTouch: false, 
//           shouldDirty: false
//         });
//         setValue("first_lastname", data.data[0].first_lastname, {
//           shouldValidate: true,
//           shouldTouch: false, 
//           shouldDirty: false
//         });
//         setValue("second_lastname", data.data[0].second_lastname, {
//           shouldValidate: true,
//           shouldTouch: false, 
//           shouldDirty: false
//         });
//         setValue("email", data.data[0].email, {
//           shouldValidate: true,
//           shouldTouch: false, 
//           shouldDirty: false
//         });
//         setValue("gender", data.data[0].gender, {
//           shouldValidate: true,
//           shouldTouch: false, 
//           shouldDirty: false
//         });
//       }

//     } catch ( error ) {
//       console.log( error );
//     } 

//   }
//   useEffect(() => {
//     getUser(); 
//   }, [])

//   //update data in the api the employee
//   const onSubmit =  async() => {
//     try {
//       setloading(true);
//       //sending the body raw 
//       const info = await adminApi.put<UpdateEmployeeResponse>('/employees/'+ user?.id, { 
//         "name": getValues('name'),
//         "email": getValues('email'),         
//         "first_lastname": getValues('first_lastname'), 
//         "second_lastname": getValues('second_lastname'),
//         "gender": getValues('gender'),     
//       });
//       setEmpUpdt(info.data.data);

//       displayToast({
//         position: 'top-right',
//         message: 'Update correctly',
//         duration: 7000,
//         type: 'success'
//       });
      
      

//     } catch ( error ) {
//       console.log( error );
//       displayToast({
//         position: 'top-right',
//         message: 'Something is wrong',
//         duration: 7000,
//         type: 'warning'
//       });
//     }
//     setloading(false);
    
//   }

//   //update the password with the API
//   const onSubmitPassword = async () => {
//     try {
//       setloading(true);
//       //sending the body raw 
//       const infoPass = await adminApi.put<UpdateResponsePassword>('/users/' + user?.id + '/change-password', { 
//         "current_password": getValues2('current_Password'),
//         "password":getValues2('new_Password'),
//         "password_confirmation": getValues2('confirmationNew_Password'),     
//       });
//       setupdPass(infoPass.data);

//       displayToast({
//         position: 'top-right',
//         message: 'Passowrd changed properly',
//         duration: 7000,
//         type: 'success'
//       });
      
      
//     } catch ( error ) {
//       console.log( error );
//       displayToast({
//         position: 'top-right',
//         message: 'Something is wrong ',
//         duration: 7000,
//         type: 'warning'
//       });
      
//     }
//     setloading(false);
    
//   }

//   return (
//     <div className="container-fluid">
//       <h2 className="h2 text-gray-800 mb-4">Página de Perfil de Usuario</h2>
//       <div className="row"> 
//         <div className="col-xl-8 col-md-12 border-left-primary px-4 py-2">
//           <form 
//           className="user" 
//           method="put" 
//           onSubmit={handleSubmit(onSubmit)}
//           name="form" 
//           autoComplete='off' >
//             <div className="form-group">
//               <h3 className="text-left text-gray-700">Empleado</h3>
//               <div className="mb-0 row">   
//                 <div className="col-xl-4 col-md-12 h6 text-gray-600">
//                   <div className="h5 mb-0" >
//                     <label htmlFor="name-usr" className="col-form-label">Nombre: </label>
//                   </div>

//                   <input 
//                   type="text"
//                   defaultValue= {employee?.name} 
//                   id="name-usr" 
//                   className={`form-control ${ errors.name ? 'is-invalid' : '' }`}  
//                   {
//                     ...register('name', {
//                       required:{ value: true, message: 'Es necesario el nombre del empleado'},
//                     })
//                   }
//                   onEndedCapture={ () => {
//                      //set values for all the field
//                     setValue("name", getValues("name") !== '' ? getValues("name") : '', {
//                       shouldValidate: true,
//                       shouldTouch: false, 
//                       shouldDirty: false
//                       });                  
//                     }
//                   }
//                   /> 

//                   { errors.name && (
//                     <div className='invalid-feedback'> 
//                       {
//                         errors.name.message
                        
//                       }
//                     </div>
//                    )}
                   
//                 </div> 

//                 <div className="col-xl-4 col-md-12 h6 text-gray-600">
//                   <div className='h5 mb-0'>
//                     <label htmlFor="first-lastName-usr" className="col-form-label">Apellido Paterno: </label>
//                   </div>
//                   <input 
//                   type="text" 
//                   id="first-lastName-usr" 
//                   className={`form-control h6 ${ errors.first_lastname ? 'is-invalid' : '' }`} 
//                   defaultValue= {employee?.first_lastname} 
//                   {
//                     ...register('first_lastname', {
//                       required:{ value: true, message: 'Escriba el apellido paterno empleado'},
//                     })
//                   }
//                   onEndedCapture={ () => {
//                     setValue("first_lastname", getValues("first_lastname")  !== '' ? getValues("first_lastname") : '', {
//                       shouldValidate: true,
//                       shouldTouch: false, 
//                       shouldDirty: false
//                     });
//                     }
//                   }
//                   />

//                   { errors.first_lastname && (
//                     <div className='invalid-feedback'> 
//                       {
//                         errors.first_lastname.message
//                       }
//                     </div>
//                    )}
//                 </div>

//                 <div className="col-xl-4 col-md-12 h6 text-gray-600">
//                   <div className='h5 mb-0'>
//                     <label htmlFor="second-lastName-usr" className="col-form-label">Apellido Materno: </label>
//                   </div>
//                   <input 
//                   type="text" 
//                   id="second-lastName-usr" 
//                   className={`form-control ${ errors.second_lastname ? 'is-invalid' : '' }`} 
//                   defaultValue= {employee?.second_lastname} 
//                   {
//                     ...register('second_lastname', {
//                       required:{ value: true, message: 'Escriba el apellido materno empleado'},
//                     })
//                   }
//                   onEndedCapture={ () => {
//                     setValue("second_lastname", getValues("second_lastname") ? getValues("second_lastname") : '', {
//                       shouldValidate: true,
//                       shouldTouch: false, 
//                       shouldDirty: false
//                     });
//                     }
//                   }
//                   />

//                   { errors.second_lastname && (
//                     <div className='invalid-feedback'> 
//                       {
//                         errors.second_lastname.message
//                       }
//                     </div>
//                    )}
//                 </div>

//               </div>

//               <div className="mb-2 row">
//                 <div className="col-md-12 h6 text-gray-600">
//                   <div className='h5 mb-0'>
//                     <label htmlFor="mail-usr" className="col-form-label">Correo: </label>
//                   </div>
//                   <input 
//                   type="text" 
//                   id="mail-usr" 
//                   className={`form-control ${ errors.email ? 'is-invalid' : '' }`}
//                   defaultValue= {employee?.email}
//                   {
//                     ...register('email', {
//                      // validate: value => getValues("email") != employee?.email || 'El correo debe de ser diferente al original',
//                       required:{ value: true, message: 'Es necesario el correo del empleado'},
                      
//                     })
//                   }
//                   onEndedCapture={ () => {
//                     setValue("email", getValues("email") ? getValues("email") : '', {
//                       shouldValidate: true,
//                       shouldTouch: false, 
//                       shouldDirty: false
//                     });
//                     }
//                   }
//                    />
                  
//                   { errors.email && (
//                     <div className='invalid-feedback'>
//                       { errors.email.message }
//                     </div>
//                   )}

//                 </div>
//               </div>

//               <div className="mb-4 row">
//                 <div className="col-md-12 h5 text-gray-600 mb-0">
//                   <label htmlFor="gender-usr" className="col-form-label">Genero: </label>
//                 </div>
              
//                 <div className="form-group col-lg-12 h6 text-gray-600">
//                   <select 
//                   className="form-select text-gray-700 w-50 text-center" 
//                   aria-label={employee?.gender} 
//                   id="gender-usr"
//                   {
//                     ...register('gender', {
//                       required:{ value: true, message: ''},
//                     })
//                   }
//                   onEndedCapture={ () => {
//                     setValue("gender", getValues("gender"), {
//                       shouldValidate: true,
//                       shouldTouch: false, 
//                       shouldDirty: false
//                     });
//                     }
//                   }
//                   >
//                     <option value="male">Masculino</option>
//                     <option value="female">Femenino</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="col-lg-12 text-center mt-3 ms-0 me-0" >
//                 <button 
//                 className="btn btn-primary mb-3 btn-block" 
//                 id="btnUpdate" 
//                 name="submitbtn"
//                 disabled={loading}
//                 >
//                 { 
//                   loading
//                   ? 'Cargando...'
//                   : 'Actualizar' 
//                 }
//                 </button>
//               </div>

//             </div>

//           </form>

//         </div>
        
//         <div className="col-lg-4 col-md-12 border-left-primary px-4 py-2">
//           <h3 className="text-left text-gray-700">Usuario</h3>
//           <div className="mb-2 row">
//             <div className="col-md-12 h5 text-gray-600">
//               <label htmlFor="usr" className="col-form-label ">Nombre de usuario: </label>
//               <input type="text" 
//               id="usr" 
//               className="form-control" 
//               name= "username"
//               defaultValue={user?.username} 
//               disabled/>
//             </div>
//           </div>

//           <form className="user" method="put" onSubmit= {handleSubmit2(onSubmitPassword)} name="formPassword">
//             <div className="mb-2 row">
//               <div className="col-md-12 h6 text-gray-600">
//                 <div className="h5 mb-0">
//                   <label htmlFor="current_Password" className="col-form-label ">Contraseña Actual: </label>
//                 </div>
//                 <input 
//                 type="password" 
//                 id="current_Password" 
//                 className={`form-control ${ errors2.current_Password ? 'is-invalid' : '' }`} 
//                 defaultValue= ''
//                 placeholder="************"
//                 {
//                   ...register2('current_Password', {
//                     required:{ value: true, message: 'Debe de ingresar la contraseña actual'},
//                   })
//                 }
//                 />
//                 { errors2.current_Password && (
//                   <div className='invalid-feedback'>
//                     { errors2.current_Password.message }
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="mb-2 row">
//               <div className="col-md-12 h6 text-gray-600">
//                 <div className='h5 mb-0'>
//                   <label htmlFor="new_Password" className="col-form-label ">Nueva Contraseña: </label>
//                 </div>
//                 <input 
//                 type="password" 
//                 id="new_Password" 
//                 className={`form-control ${ errors2.new_Password ? 'is-invalid' : '' }`} 
//                 placeholder="************"
//                 defaultValue= ''
//                 autoComplete= 'off' 
//                 {
//                   ...register2('new_Password', {
//                     required:{ value: true, message: 'Ingrese la nueva cotraseña'},
//                   })
//                 }
//                 />
//                 { errors2.new_Password && (
//                   <div className='invalid-feedback'>
//                     { errors2.new_Password.message }
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="mb-2 row">
//               <div className="col-md-12 h6 text-gray-600">
//                 <div className="h5 mb-0">
//                   <label htmlFor="passwordChanged" className="col-form-label ">Confirmar Contraseña: </label>
//                 </div>
//                 <input 
//                 type="password" 
//                 id="passwordChanged" 
//                 className={`form-control ${ errors2.confirmationNew_Password ? 'is-invalid' : '' }`} 
//                 placeholder="************"
//                 defaultValue= ''
//                 {
//                   ...register2('confirmationNew_Password', {
//                     required:{ value: true, message: 'Ingrese la confirmación de la nueva contraseña'},
//                     validate: value => value === getValues2('new_Password')|| 'Las contraseñas no coinciden'
//                   })
//                 }
//                 />
//                 { errors2.confirmationNew_Password && (
//                   <div className='invalid-feedback'>
//                     { errors2.confirmationNew_Password.message }
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="col-lg-12 text-center mt-3">
//               <button 
//               type="submit" 
//               className="btn btn-primary mb-3 btn-block" 
//               id="updatePassword"
//               name="submitPasswordBtn"
//               disabled={loading}
//               >
//                  { 
//                   loading
//                   ? 'Cargando...'
//                   : 'Actualizar' 
//                 } 
//               </button>
//             </div>

//           </form>

//         </div>

//       </div>

//     </div>
  
//   )
// }

