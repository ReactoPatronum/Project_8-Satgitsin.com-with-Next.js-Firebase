import React from 'react'

const Category = ({Icon,text,textColor,bgColor,onClick}) => {
  return (
    <div onClick={onClick} className='relative rounded-xl shadow-lg w-full h-[300px] flex items-center justify-center cursor-pointer'>
      <div className={`${bgColor} w-full h-2 absolute top-0 rounded-t-lg`}>

      </div>
       <div className='flex flex-col justify-center items-center'>
       <Icon className={` h-10 w-10 ${textColor}`}/>
        <h2 className={`${textColor}`}>{text}</h2>
       </div>
    </div>
  )
}

export default Category