import React, { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import resetbtn from '../../asset/reset.png'
import '../Calculation/SalesCalculation.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import InputField from '../Calculation/InputField';
AOS.init({ duration: 1200 });



const SalesOne = () => {
  const [header, setHeader] = useState(false)
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
        if (!data) {
          setLoading(true)
        } else {
          setLoading(false)
        }
        setRefillPrice(data)
      })
  }, [])


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
    if (!value) return;

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

  const changeHeaderColor = () => {
    if (window.scrollY >= 10) {
      setHeader(true)
    } else {
      setHeader(false)
    }
  }
  window.addEventListener('scroll', changeHeaderColor);

  const refillBgColor = 'bg-black border-4 border-white transition duration-500'
  const packageBgColor = 'bg-slate-800 border-4 border-white transition duration-500'
  const headingBgColor = 'bg-black'
  return (
    <section className='lg:w-2/5 lg:mx-auto  lg:shadow-2xl shadow-xl'>
      <p className='bg-yellow-300 text-center'>BoroGari</p>
      <div className={header ? 'bg-green-200 transition duration-1000 px-1 lg:px-4 shadow-md flex items-center justify-between lg:pt-0 sticky top-0 z-50  py-[2px]' : 'flex items-center justify-between lg:pt-2 sticky top-0 z-50 px-1 lg:px-4 py-[2px] bg-slate-200 transition duration-1000'}>
        <div className='flex'>
          <span data-aos="fade-right" className='w-36 flex items-center text-xl text-semibold text-white mr-2' >
            <p style={{ borderRadius: '7px 0 0 7px' }} className={`${header ? headingBgColor : headingBgColor} ${header ? 'text-amber-200' : 'text-white'} transition duration-1000 p-2 w-20`}>Qty </p>
            <p style={{ borderRadius: '0 7px 7px 0' }} className='bg-white text-black p-2 w-full text-right flex justify-between'>
              <span>{totalQty}</span>
              -
              <span>{packQty}</span>
            </p>
          </span>
          <span data-aos="fade-left" className='w-36 flex items-center text-xl text-semibold text-white' >
            <p style={{ borderRadius: '7px 0 0 7px' }} className={`${header ? headingBgColor : headingBgColor} ${header ? 'text-yellow-300' : 'text-white'} transition duration-1000 p-2 w-20`}>Tk </p>

            {loading ? <div style={{ borderRadius: '0 7px 7px 0' }} className='bg-white text-black p-2 w-full text-center'>
              <Bars
                height="28"
                width="28"
                color="#000"
                ariaLabel="bars-loading"
                wrapperStyle={{ height: '100%', borderRadius: '0 7px 7px 0', }}
                wrapperClass="bg-white ml-6"
                visible={true}
              />
            </div> : <p style={{ borderRadius: '0 7px 7px 0' }} className='bg-white text-black p-2 w-full text-right'> {grandTotal}</p>}
          </span>
        </div>
        <div data-aos="fade-down" data-aos-duration="2000">
          <button className='btn border-none hover:bg-transparent opacity-90 hover:opacity-100uy transition duration-1000 bg-transparent m-0 p-0' width={0} onClick={clearQty} ><img src={resetbtn} width={30} alt="" /></button>
        </div>
      </div>
      <section data-aos="fade-down" className='bg-slate-200 lg:p-4 p-1 lg:pt-[1px] pt-[1px]'>

        <form onSubmit={handleRefillPriceSubmit} className=''>
          <div className='grid col-span-1 gap-1'>
            <div>
              <InputField
                bgColor={`${refillBgColor} text-cyan-400 hover:text-cyan-500`}
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
                bgColor={`${refillBgColor} text-red-300 hover:text-red-500`}
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
                bgColor={`${refillBgColor} text-orange-300 hover:text-orange-500`}
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
                bgColor={`${refillBgColor} text-orange-300 hover:text-orange-500`}
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
                bgColor={`${refillBgColor}`}
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
                bgColor={`${refillBgColor} text-red-300 text-red-300 hover:text-red-500`}
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
                bgColor={`${refillBgColor} text-cyan-300 text-red-300 hover:text-cyan-500`}
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
                bgColor={`${refillBgColor} text-orange-300 text-red-300 hover:text-orange-500`}
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
                bgColor={`${packageBgColor} text-cyan-300 text-red-300 hover:text-cyan-500`}
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
                bgColor={`${packageBgColor} text-red-300 text-red-300 hover:text-red-500`}
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
                bgColor={`${packageBgColor} text-orange-300 text-red-300 hover:text-orange-500`}
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
          <input type="submit" style={{ background: 'linear-gradient(90deg, #4568dc 20%, #b06ab3 80%)', border: 'none' }} className="btn btn-xs  text-white w-fit mt-2 hover:opacity-100 transition duration-500 shadow-md hover:shadow shadow-white hover:shadow-gray-400" value='Update' />
          <Link to='/'><button style={{ background: 'linear-gradient(90deg, red 20%, blue 80%)', border: 'none' }} className="btn btn-xs  text-white w-fit mt-2 hover:opacity-100 transition duration-500 shadow-md hover:shadow shadow-white hover:shadow-gray-400">Home</button></Link>
        </form>
      </section >
    </section>
  );
};

export default SalesOne;