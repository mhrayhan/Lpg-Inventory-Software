import React, { useEffect } from 'react';

const InputField = ({ tittle, qty, price, setQty, setPrice, totalValue, setTotal, name }) => {


  useEffect(() => {
    setTotal(qty * price)
  }, [qty, price, setTotal])

  return (
    <div className='w-4/5 grid grid-cols-6 gap-2 '>
      <p className='col-span-2 bg-yellow-200 border py-2 px-2 rounded-md'>{tittle}</p>
      <input onChange={(e) => { setQty(e.target.value) }} name='sell' type="number" className="input input-bordered input-md text-xl" />
      <input onChange={(e) => { setPrice(e.target.value) }} name={name} type="number" className="input input-bordered input-md text-xl" />
      <input readOnly value={totalValue} type="number" className="input input-bordered input-md text-xl col-span-2" />
    </div>
  );
};

export default InputField;