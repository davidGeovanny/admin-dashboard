import React, { useContext, useEffect } from 'react';

import { MyProfileContext } from '../../context/MyProfileContext';
import { AuthContext } from '../../context/AuthContext';
import { MyProfileEmployeeForm } from './MyProfileEmployeeForm';
import { MyProfileUserForm } from './MyProfileUserForm';

export const MyProfilePage = () => {
  const { user } = useContext( AuthContext );
  const { getSpecificUser } = useContext( MyProfileContext );

  useEffect(() => {
    if( !user ) return;
    getSpecificUser( user.id );
  }, [ user ]);

  return (
    <div className="container-fluid">
      <h2>Mi información personal</h2>

      <div className="row">
        <div className="col-xl-4 col-12 py-2">
          <div className='card shadow mb-4'>
            <div className='card-header border-left-primary'>
              <h6 className='m-0 font-weight-bold text-primary'>Usuario</h6>
            </div>
              
            <div className='card-body border-left-primary'>
              <MyProfileUserForm />
            </div>
          </div>
        </div>

        <div className="col-xl-8 col-12 py-2">
          <div className='card shadow mb-4'>
            <div className='card-header border-left-primary'>
              <h6 className='m-0 font-weight-bold text-primary'>Empleado</h6>
            </div>
              
            <div className='card-body border-left-primary'>
              <MyProfileEmployeeForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

