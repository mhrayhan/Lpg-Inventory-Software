import React, { useEffect, useState } from 'react';
import { Puff } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import InputField from './InputField';

// import PackageCalculation from './PackageCalculation';

const SalesCalculation = () => {
  const [loading, setLoading] = useState(true)
  //refill price from database
  const [refillPrice, setRefillPrice] = useState({});


  const { bm12price, bm20price, bs12price, bs30price, to12price, to15price, to33price, nz12price, bm12priceP, bs12priceP, to12priceP, } = refillPrice;
  useEffect(() => {
    // this api key from todo app server
    const url = 'https://flannel-parliament-48417.herokuapp.com/price/refillPrice'
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (!data.bm12price) {
          setLoading(true)
        } else {
          setLoading(false)
        }
        console.log(data);
        setRefillPrice(data)
      })
  }, [])


  //store input refill price
  // const [refPrice, setRefPrice] = useState({})
  // const { bm12price, bm20price, bs12price, bs30price, to12price, to15price, to33price, nz12price } = refPrice;
  //store input refill qty
  const [refQty, setRefQty] = useState({
    bm12qty: "0",
    bm20qty: "0",
    bs12qty: "0",
    bs30qty: "0",
    to12qty: "0",
    to15qty: "0",
    to33qty: "0",
    nz12qty: "0",
    bm12qtyP: "0",
    bs12qtyP: "0",
    to12qtyP: "0",
  })

  const { bm12qty, bm20qty, bs12qty, bs30qty, to12qty, to15qty, to33qty, nz12qty, bm12qtyP, bs12qtyP, to12qtyP } = refQty;

  // localStorage.setItem("refQty", JSON.stringify(refQty));

  // let newObject = window.localStorage.getItem("myObject");
  // console.log(JSON.parse(newObject));

  // const grandTotal = parseInt((bm12qty * bm12price) + (bm20qty + bm20price) + (bs12qty * bs12price) + (bs30qty * bs30price) + (to12qty * to12price) + (to15qty * to15price) + (to33qty * to33price) + (nz12qty * nz12price))

  const grandTotal = (parseInt(bm12qty * bm12price) + parseInt(bm20qty * bm20price) + parseInt(bs12qty * bs12price) + parseInt(bs30qty * bs30price) + parseInt(to12qty * to12price) + parseInt(to15qty * to15price) + parseInt(to33qty * to33price) + parseInt(nz12qty * nz12price) + parseInt(bm12qtyP * (bm12priceP - bm12price)) + parseInt(bs12qtyP * (bs12priceP - bs12price)) + parseInt(to12qtyP * (to12priceP - to12price)))

  const totalQty = (parseFloat(bm12qty) + parseFloat(bm20qty) + parseFloat(bs12qty) + parseFloat(bs30qty) + parseFloat(to12qty) + parseFloat(to15qty) + parseFloat(to33qty) + parseFloat(nz12qty))

  const packQty = parseFloat(bm12qtyP) + parseFloat(bs12qtyP) + parseFloat(to12qtyP)

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
    setRefQty((prev) => {
      return { ...prev, [name]: parseInt(value) }
    })

  }

  const handleRefillPriceSubmit = e => {
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
        console.log(data);
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

  return (
    <div className='border bg-slate-100 lg:m-12 lg:p-4 p-2 lg:flex items-center justify-around'>

      <form onSubmit={handleRefillPriceSubmit}>
        <div className='flex my-2'>
          <span className='w-36 flex items-center text-xl text-semibold text-white mr-2' >
            <p style={{ borderRadius: '7px 0 0 7px' }} className='bg-slate-400 p-2 w-20'>Qty </p>
            <p style={{ borderRadius: '0 7px 7px 0' }} className='bg-slate-200 text-black p-2 w-full text-right flex justify-between'>
              <span>{totalQty}</span>
              -
              <span>{packQty}</span>
            </p>
          </span>
          <span className='w-36 flex items-center text-xl text-semibold text-white' >
            <p style={{ borderRadius: '7px 0 0 7px' }} className='bg-slate-400 p-2 w-20'>Tk </p>

            {loading ? <p style={{ borderRadius: '0 7px 7px 0' }} className='bg-slate-200 text-black p-2 w-full text-center'>
              <Puff
                height="27"
                width="27"
                color="white"
                ariaLabel="puff-loading"
                wrapperStyle={{ height: '100%', borderRadius: '0 7px 7px 0', }}
                wrapperClass="bg-slate-200 ml-5"
                visible={true}
              /></p> : <p style={{ borderRadius: '0 7px 7px 0' }} className='bg-slate-200 text-black p-2 w-full text-right'> {grandTotal}</p>}
          </span>
        </div>
        <div className='grid col-span-1 gap-1'>
          <div>
            <InputField
              bgColor={'bg-gray-400'}
              qtyname={'bm12qty'}
              name={'bm12price'}
              tittle={'Bm12kg'}
              price={bm12price}
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
              setQty={handleQty}
              setPrice={handlePrice}
              totalValue={to12qtyP * (to12priceP - to12price)}
            ></InputField>
          </div>
        </div>
        <input type="submit" className="btn btn-outline btn-primary btn-xs text-white w-fit mt-2 " value='Update Price' />
      </form>
      {/* <PackageCalculation setPackageTotal={setPackageTotal}></PackageCalculation> */}
    </div>
  );
};

export default SalesCalculation;