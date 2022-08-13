import React, { useState } from 'react';

// bm12qty: "",
// bm20qty: "",
// bs12qty: "",
// bs30qty: "",
// to12qty: "",
// to15qty: "",
// to33qty: "",
// nz12qty: ""

const Test = () => {
  const [data, setData] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setData((prev) => {
      return { ...prev, [name]: parseInt(value) }
    })
  }
  console.log(data);
  return (
    <div className='flex'>
      <div className='w-48 grid grid-cols-1 gap-2 '>
        <input onChange={handleChange} name='bm12qty' type="number" className="input input-bordered input-md text-xl" placeholder='bm12' />
        <input onChange={handleChange} name='bm20qty' type="number" className="input input-bordered input-md text-xl" placeholder='bm20' />
        <input onChange={handleChange} name='bs12qty' type="number" className="input input-bordered input-md text-xl" placeholder='bs12' />
        <input onChange={handleChange} name='bs30qty' type="number" className="input input-bordered input-md text-xl" placeholder='bs30' />
        <input onChange={handleChange} name='to12qty' type="number" className="input input-bordered input-md text-xl" placeholder='to12' />
        <input onChange={handleChange} name='to15qty' type="number" className="input input-bordered input-md text-xl" placeholder='to15' />
        <input onChange={handleChange} name='to33qty' type="number" className="input input-bordered input-md text-xl" placeholder='to33' />
        <input onChange={handleChange} name='nz12qty' type="number" className="input input-bordered input-md text-xl" placeholder='nz12' />
      </div>
      <div className='w-48 grid grid-cols-1 gap-2 '>
        <input onChange={handleChange} name='bm12price' type="number" className="input input-bordered input-md text-xl" placeholder='bm12' />
        <input onChange={handleChange} name='bm20price' type="number" className="input input-bordered input-md text-xl" placeholder='bm20' />
        <input onChange={handleChange} name='bs12price' type="number" className="input input-bordered input-md text-xl" placeholder='bs12' />
        <input onChange={handleChange} name='bs30price' type="number" className="input input-bordered input-md text-xl" placeholder='bs30' />
        <input onChange={handleChange} name='to12price' type="number" className="input input-bordered input-md text-xl" placeholder='to12' />
        <input onChange={handleChange} name='to15price' type="number" className="input input-bordered input-md text-xl" placeholder='to15' />
        <input onChange={handleChange} name='to33price' type="number" className="input input-bordered input-md text-xl" placeholder='to33' />
        <input onChange={handleChange} name='nz12price' type="number" className="input input-bordered input-md text-xl" placeholder='nz12' />
      </div>
    </div>
  );
};

export default Test;