import React from 'react';

const Button=(props)=>{

    const{onClick,className='',children}=props;
    return(
      <div>
         <button onClick={onClick} className={className} >{children}</button>

      </div>
    )
  
  }


export default Button;
