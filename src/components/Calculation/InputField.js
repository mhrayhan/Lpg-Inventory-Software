import React from 'react';

const InputField = ({ tittle, price, setQty, qty, setPrice, totalValue, name, qtyname, bgColor }) => {



  return (
    <div className='w-full grid grid-cols-9 gap-1 '>

      <p className={`col-span-2 flex items-center ${bgColor} lg:text-xl text-sm text-white border lg:p-2 pl-1 rounded-md box-border h-[48px] `}>{tittle}</p>

      <input onChange={setQty} name={qtyname} value={qty} type="number" className="input input-bordered focus:outline-none focus:border-red-200 focus:outline-offset-0 input-md text-xl p-1 text-center col-span-2 h-[48px] focus:shadow border-white hover:border-red-200 hover:shadow hover:shadow-red-200 focus:shadow-red-200" />

      <input onChange={setPrice} name={name} defaultValue={price} type="number" className="input input-bordered focus:outline-none focus:border-red-200 focus:outline-offset-0 input-md text-xl p-1 text-center col-span-2 h-[48px] focus:shadow border-white hover:border-red-200 hover:shadow hover:shadow-red-200 focus:shadow-red-200" />

      <input readOnly value={totalValue} type="number" className={`input input-bordered focus:outline-none focus:border-red-200 focus:outline-offset-0 input-md text-xl col-span-3 text-right h-[48px] focus:shadow border-white hover:border-red-200 hover:shadow hover:shadow-red-200 focus:shadow-red-200`} />


    </div>
  );
};

export default InputField;