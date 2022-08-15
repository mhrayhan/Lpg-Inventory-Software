import React from 'react';

const InputField = ({ tittle, price, setQty, setPrice, totalValue, name, qtyname, bgColor }) => {



  return (
    <div className='lg:w-4/5 w-full grid grid-cols-9 gap-1 '>

      <p className={`col-span-2 flex items-center ${bgColor} lg:text-xl text-sm text-white border lg:p-2 pl-1 rounded-md`}>{tittle}</p>

      <input onChange={setQty} name={qtyname} type="number" className="input input-bordered input-md text-xl p-1 text-center col-span-2" />

      <input onChange={setPrice} name={name} defaultValue={price} type="number" className="input input-bordered input-md text-xl p-1 text-center col-span-2" />

      <input readOnly value={totalValue} type="number" className={`input input-bordered input-md text-xl col-span-3 text-right`} />

    </div>
  );
};

export default InputField;