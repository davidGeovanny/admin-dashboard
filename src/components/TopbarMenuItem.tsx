import React from 'react'
import { TopbarItem } from '../interfaces/TopbarInterface';

interface Props {
  item: TopbarItem
}

export const TopbarMenuItem = ({ item }: Props) => {

  const renderItemWithIcon = () => {
    if( item.picture.type === 'image' ) return;
    
    return (
      <>
        <div className='mr-3'>
          <div className='icon-circle' style={{ backgroundColor: item.picture.backgroundColor }}>
            <i className={`fas text-white ${ item.picture.icon }`}></i>
          </div>
        </div>
        <div>
          { item.infoText?.position === 'top' && (
            <div className='small text-gray-500'>{ item.infoText.text }</div>
          )}
          
          <span className={`${ !item.read ? 'font-weight-bold' : '' }`}>
            { item.description }
          </span>

          { item.infoText?.position === 'bottom' && (
            <div className='small text-gray-500'>{ item.infoText.text }</div>
          )}
        </div>
      </>
    );
  }

  const renderItemWithImage = () => {

    if( item.picture.type === 'icon' ) return;

    return (
      <>
        <div className='dropdown-list-image mr-3'>
          <img
            className='rounded-circle'
            style={{
              backgroundColor: '#fafafa'
            }}
            src={ item.picture.src }
            alt='Profile'
          />
        </div>
        <div className='font-weight-bold'>
          { item.infoText?.position === 'top' && (
            <div className='small text-gray-500'>{ item.infoText.text }</div>
          )}

          <div className={`${ !item.read ? 'font-weight-bold' : '' }`}>
            <div className='text-truncate'>
              { item.description }
            </div>
          </div>

          { item.infoText?.position === 'bottom' && (
            <div className='small text-gray-500'>{ item.infoText.text }</div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      { item.picture.type === 'icon' ? renderItemWithIcon() : renderItemWithImage() }
    </>
  );
}