import React from 'react';
import { MyProfileEmployee } from './MyProfileEmployee';
import { MyProfileUser } from './MyProfileUser';

export const MyProfilePage = () => {

  return (
    <div className="container-fluid">
      <h2>Mi información</h2>

      <div className="row">
        <div className="col-xl-4 col-12 py-2">
          <div className='card shadow mb-4'>
            <div className='card-header border-left-primary'>
              <h6 className='m-0 font-weight-bold text-primary'>Usuario</h6>
            </div>
              
            <div className='card-body border-left-primary'>
              <MyProfileUser />
            </div>
          </div>
        </div>

        <div className="col-xl-8 col-12 py-2">
          <div className='card shadow mb-4'>
            <div className='card-header border-left-primary'>
              <h6 className='m-0 font-weight-bold text-primary'>Empleado</h6>
            </div>
              
            <div className='card-body border-left-primary'>
              <MyProfileEmployee />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

