import React, { useEffect, useState } from 'react';
import { Puff } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import InputField from './InputField';
import resetbtn from '../../asset/reset.png'

// import PackageCalculation from './PackageCalculation';

const SalesCalculation = () => {
  const [loading, setLoading] = useState(true)
  //refill price from database
  const [refillPrice, setRefillPrice] = useState({});
  // console.log(refillPrice);

  const { bm12price, bm20price, bs12price, bs30price, to12price, to15price, to33price, nz12price, bm12priceP, bs12priceP, to12priceP, } = refillPrice;
  useEffect(() => {
    // this api key from todo app server
    const url = 'https://flannel-parliament-48417.herokuapp.com/price/refillPrice'
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (!data) {
          setLoading(true)
        } else {
          setLoading(false)
        }
        setRefillPrice(data)
      })
  }, [])


  //store input refill price
  // const [refPrice, setRefPrice] = useState({})
  // const { bm12price, bm20price, bs12price, bs30price, to12price, to15price, to33price, nz12price } = refPrice;
  //store input refill qty
  const [refQty, setRefQty] = useState({
    bm12qty: 0,
    bm20qty: 0,
    bs12qty: 0,
    bs30qty: 0,
    to12qty: 0,
    to15qty: 0,
    to33qty: 0,
    nz12qty: 0,
    bm12qtyP: 0,
    bs12qtyP: 0,
    to12qtyP: 0,
  })

  const { bm12qty, bm20qty, bs12qty, bs30qty, to12qty, to15qty, to33qty, nz12qty, bm12qtyP, bs12qtyP, to12qtyP } = refQty;

  const grandTotal = ((bm12qty * bm12price) + (bm20qty * bm20price) + (bs12qty * bs12price) + (bs30qty * bs30price) + (to12qty * to12price) + (to15qty * to15price) + (to33qty * to33price) + (nz12qty * nz12price) + (bm12qtyP * (bm12priceP - bm12price)) + (bs12qtyP * (bs12priceP - bs12price)) + (to12qtyP * (to12priceP - to12price)))

  const totalQty = (bm12qty + bm20qty + bs12qty + bs30qty + to12qty + to15qty + to33qty + nz12qty)

  const packQty = (bm12qtyP) + (bs12qtyP) + (to12qtyP)

  const handlePrice = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setRefillPrice((prev) => {
      return { ...prev, [name]: parseInt(value) }
    })
  }
  const handleQty = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // console.log(name, value);
    setRefQty((prev) => {
      return { ...prev, [name]: parseInt(value) }
    })

  }

  const handleRefillPriceSubmit = (e) => {
    e.preventDefault();
    const url = 'https://flannel-parliament-48417.herokuapp.com/price/refillPrice';
    fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(refillPrice)
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Price update successfully',
            icon: 'success'
          })
        } else Swal.fire({
          title: 'Price updated already',
          icon: 'error'
        })
      })
  }


  const clearQty = () => {
    setRefQty((prev) => {
      return {
        ...prev, bm12qty: 0,
        bm20qty: 0,
        bs12qty: 0,
        bs30qty: 0,
        to12qty: 0,
        to15qty: 0,
        to33qty: 0,
        nz12qty: 0,
        bm12qtyP: 0,
        bs12qtyP: 0,
        to12qtyP: 0
      }
    })
  }

  return (
    <div className='shadow-2xl rounded-xl bg-pink-100 lg:m-2 lg:p-4 lg:pt-1 lg:w-2/5 lg:mx-auto p-2 '>
      <div className='flex items-center justify-between my-2'>
        <div className='flex '>
          <span className='w-36 flex items-center text-xl text-semibold text-white mr-2' >
            <p style={{ borderRadius: '7px 0 0 7px' }} className='bg-slate-400 p-2 w-20'>Qty </p>
            <p style={{ borderRadius: '0 7px 7px 0' }} className='bg-white text-black p-2 w-full text-right flex justify-between'>
              <span>{totalQty}</span>
              -
              <span>{packQty}</span>
            </p>
          </span>
          <span className='w-36 flex items-center text-xl text-semibold text-white' >
            <p style={{ borderRadius: '7px 0 0 7px' }} className='bg-slate-400 p-2 w-20'>Tk </p>

            {loading ? <p style={{ borderRadius: '0 7px 7px 0' }} className='bg-white text-black p-2 w-full text-center'>
              <Puff
                height="28"
                width="28"
                color="#FF6100"
                ariaLabel="puff-loading"
                wrapperStyle={{ height: '100%', borderRadius: '0 7px 7px 0', }}
                wrapperClass="bg-white ml-6"
                visible={true}
              /></p> : <p style={{ borderRadius: '0 7px 7px 0' }} className='bg-white text-black p-2 w-full text-right'> {grandTotal}</p>}
          </span>
        </div>
        <div className=''>
          <button className='' onClick={clearQty} ><img src={resetbtn} width={35} alt="" /></button>
        </div>
      </div>

      <form onSubmit={handleRefillPriceSubmit}>
        <div className='grid col-span-1 gap-1'>
          <div>
            <InputField
              bgColor={'bg-gray-400'}
              qtyname={'bm12qty'}
              name={'bm12price'}
              tittle={'Bm12kg'}
              price={bm12price}
              qty={bm12qty}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={bm12qty * bm12price}
            ></InputField>
          </div>
          <div>
            <InputField
              bgColor={'bg-gray-400'}
              qtyname={'bs12qty'}
              name={'bs12price'}
              tittle={'Bs12kg'}
              price={bs12price}
              qty={bs12qty}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={bs12qty * bs12price}
            ></InputField>
          </div>
          <div>
            <InputField
              bgColor={'bg-gray-400'}
              qtyname={'to12qty'}
              name={'to12price'}
              tittle={'To12kg'}
              price={to12price}
              qty={to12qty}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={to12qty * to12price}
            ></InputField>
          </div>
          <div>
            <InputField
              bgColor={'bg-gray-400'}
              qtyname={'to15qty'}
              name={'to15price'}
              tittle={'To15kg'}
              price={to15price}
              qty={to15qty}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={to15qty * to15price}
            ></InputField>
          </div>
          <div>
            <InputField
              bgColor={'bg-gray-400'}
              qtyname={'nz12qty'}
              name={'nz12price'}
              tittle={'Nz12kg'}
              price={nz12price}
              qty={nz12qty}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={nz12qty * nz12price}
            ></InputField>
          </div>
          <div>
            <InputField
              bgColor={'bg-gray-400'}
              qtyname={'bs30qty'}
              name={'bs30price'}
              tittle={'Bs30kg'}
              price={bs30price}
              qty={bs30qty}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={bs30qty * bs30price}
            ></InputField>
          </div>
          <div>
            <InputField
              bgColor={'bg-gray-400'}
              qtyname={'bm20qty'}
              name={'bm20price'}
              tittle={'Bm20kg'}
              price={bm20price}
              qty={bm20qty}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={bm20qty * bm20price}
            ></InputField>
          </div>
          <div>
            <InputField
              bgColor={'bg-gray-400'}
              qtyname={'to33qty'}
              name={'to33price'}
              tittle={'To33kg'}
              price={to33price}
              qty={to33qty}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={to33qty * to33price}
            ></InputField>
          </div>
          <div>
            <InputField
              bgColor={'bg-orange-400'}
              qtyname={'bm12qtyP'}
              name={'bm12priceP'}
              tittle={'Bm12Kg'}
              price={bm12priceP}
              qty={bm12qtyP}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={bm12qtyP * (bm12priceP - bm12price)}
            ></InputField>
          </div>
          <div>
            <InputField
              bgColor={'bg-orange-400'}
              qtyname={'bs12qtyP'}
              name={'bs12priceP'}
              tittle={'Bs12Kg'}
              price={bs12priceP}
              qty={bs12qtyP}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={bs12qtyP * (bs12priceP - bs12price)}
            ></InputField>
          </div>
          <div>
            <InputField
              bgColor={'bg-orange-400'}
              qtyname={'to12qtyP'}
              name={'to12priceP'}
              tittle={'To12Kg'}
              price={to12priceP}
              qty={to12qtyP}
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={to12qtyP * (to12priceP - to12price)}
            ></InputField>
          </div>
        </div>
        <input type="submit" className="btn btn-secondary btn-xs text-white w-fit mt-2 " value='Update Price' />
      </form>
    </div>
  );
};

export default SalesCalculation;