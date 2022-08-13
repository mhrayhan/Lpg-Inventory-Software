import React, { useEffect, useState } from 'react';
import InputField from './InputField';
import PackageCalculation from './PackageCalculation';

const SalesCalculation = () => {
  //refill price from database
  const [refillPrice, setRefillPrice] = useState({});
  const { bm12price, bm20price, bs12price, bs30price, to12price, to15price, to33price, nz12price } = refillPrice;
  useEffect(() => {
    // this api key from todo app server
    const url = 'https://flannel-parliament-48417.herokuapp.com/price/refillPrice'
    fetch(url)
      .then(res => res.json())
      .then(data => setRefillPrice(data))
  }, [])


  //store input refill price
  const [refPrice, setRefPrice] = useState({})
  // const { bm12price, bm20price, bs12price, bs30price, to12price, to15price, to33price, nz12price } = refPrice;
  //store input refill qty
  const [refQty, setRefQty] = useState({
    bm12qty: "",
    bm20qty: "",
    bs12qty: "",
    bs30qty: "",
    to12qty: "",
    to15qty: "",
    to33qty: "",
    nz12qty: "",
  })
  for (let [key, value] of Object.entries(refQty)) {
    // console.log(`${key}: ${value}`);
  }
  const { bm12qty, bm20qty, bs12qty, bs30qty, to12qty, to15qty, to33qty, nz12qty } = refQty;

  // const grandTotal = parseInt((bm12qty * bm12price) + (bm20qty + bm20price) + (bs12qty * bs12price) + (bs30qty * bs30price) + (to12qty * to12price) + (to15qty * to15price) + (to33qty * to33price) + (nz12qty * nz12price))

  const grandTotal = (parseInt(bm12qty * bm12price) + parseInt(bm20qty * bm20price) + parseInt(bs12qty * bs12price) + parseInt(bs30qty * bs30price) + parseInt(to12qty * to12price) + parseInt(to15qty * to15price) + parseInt(to33qty * to33price) + parseInt(nz12qty * nz12price))

  const handlePrice = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRefillPrice((prev) => {
      return { ...prev, [name]: parseInt(value) }
    })
    setRefPrice((prev) => {
      return { ...prev, [name]: parseInt(value) }
    })
  }
  const handleQty = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRefQty((prev) => {
      return { ...prev, [name]: parseInt(value) }
    })
  }
  // console.log(refPrice);


  const [packageTotal, setPackageTotal] = useState();
  // const refillPackage = (grandTotal + packageTotal);

  const handleRefillPriceSubmit = e => {
    // e.preventDefault();
    const url = 'https://flannel-parliament-48417.herokuapp.com/price/refillPrice';
    fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(refPrice)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          alert('data not found')
        }
      })
  }

  return (
    <div className='border bg-slate-100 lg:m-12 lg:p-4 px-2 lg:flex items-center justify-around'>
      <form onSubmit={handleRefillPriceSubmit}>
        <h2 className='text-2xl border w-32 my-2 p-2 bg-green-400 text-white rounded-md font-semibold'>{grandTotal}</h2>
        <div className='grid col-span-1 gap-1'>
          <div>
            <InputField
              qtyname={'bm12qty'}
              name={'bm12price'}
              tittle={'BM 12kg'}
              price={bm12price}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={bm12qty * bm12price}
            ></InputField>
          </div>
          <div>
            <InputField
              qtyname={'bs12qty'}
              name={'bs12price'}
              tittle={'BS 12kg'}
              price={bs12price}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={bs12qty * bs12price}
            ></InputField>
          </div>
          <div>
            <InputField
              qtyname={'to12qty'}
              name={'to12price'}
              tittle={'Total 12kg'}
              price={to12price}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={to12qty * to12price}
            ></InputField>
          </div>
          <div>
            <InputField
              qtyname={'to15qty'}
              name={'to15price'}
              tittle={'Total 15kg'}
              price={to15price}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={to15qty * to15price}
            ></InputField>
          </div>
          <div>
            <InputField
              qtyname={'nz12qty'}
              name={'nz12price'}
              tittle={'Nazir 12kg'}
              price={nz12price}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={nz12qty * nz12price}
            ></InputField>
          </div>
          <div>
            <InputField
              qtyname={'bs30qty'}
              name={'bs30price'}
              tittle={'BS 30kg'}
              price={bs30price}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={bs30qty * bs30price}
            ></InputField>
          </div>
          <div>
            <InputField
              qtyname={'bm20qty'}
              name={'bm20price'}
              tittle={'BM 20kg'}
              price={bm20price}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={bm20qty * bm20price}
            ></InputField>
          </div>
          <div>
            <InputField
              qtyname={'to33qty'}
              name={'to33price'}
              tittle={'Total 33kg'}
              price={to33price}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={to33qty * to33price}
            ></InputField>
          </div>
        </div>
        <input type="submit" className="btn btn-primary w-28 mt-8" value='Update Price' />
      </form>
      <PackageCalculation setPackageTotal={setPackageTotal}></PackageCalculation>
    </div>
  );
};

export default SalesCalculation;