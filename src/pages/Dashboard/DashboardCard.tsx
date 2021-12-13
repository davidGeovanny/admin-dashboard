import React from 'react';

interface Props {
  title:    string | JSX.Element;
  content:  string | JSX.Element;
  icon:     string;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary' | 'dark';
}

export const DashboardCard = ({ title, content, icon, variant = 'primary' }: Props) => {
  return (
    <div className="col-xl-3 col-md-6 mb-4">
      <div className="card border-left-primary shadow h-100 py-2">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                { title }
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                { content }
              </div>
            </div>
            <div className="col-auto">
              <i className={`fas ${ icon } fa-2x text-gray-300`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
