import React, { useEffect, useState } from 'react';
import InputField from './InputField';

const PackageCalculation = ({ setPackageTotal, handleRefillPriceSubmit }) => {

  // BM 12 kg state
  const [bmTotal, setBmTotal] = useState(0);
  const [bmQty, setBmQty] = useState(0);
  const [bmPrice, setBmPrice] = useState(0);

  // BM 20 kg state
  const [bm20Total, setBm20Total] = useState(0);
  const [bm20Qty, setBm20Qty] = useState(0);
  const [bm20Price, setBm20Price] = useState(1000);
  // BS 12 kg state
  const [bsTotal, setBsTotal] = useState(0);
  const [bsQty, setBsQty] = useState(0);
  const [bsPrice, setBsPrice] = useState(1000);
  // BS 30 kg state
  const [bs30Total, setBs30Total] = useState(0);
  const [bs30Qty, setBs30Qty] = useState(0);
  const [bs30Price, setBs30Price] = useState(1000);
  // Total 12 kg state
  const [to12Total, setTo12Total] = useState(0);
  const [to12Qty, setTo12Qty] = useState(0);
  const [to12Price, setTo12Price] = useState(1000);

  // Total 15 kg state
  const [to15Total, setTo15Total] = useState(0);
  const [to15Qty, setTo15Qty] = useState(0);
  const [to15Price, setTo15Price] = useState(1000);
  // Nazir 12 kg state
  const [nz12Total, setNz12Total] = useState(0);
  const [nz12Qty, setNz12Qty] = useState(0);
  const [nz12Price, setNz12Price] = useState(1000);
  // Total 33 kg state
  const [to33Total, setTo33Total] = useState(0);
  const [to33Qty, setTo33Qty] = useState(0);
  const [to33Price, setTo33Price] = useState(1000);

  const grandTotal = (bmTotal + bm20Total + bsTotal + bs30Total + to12Total + to15Total + to33Total + nz12Total)
  setPackageTotal(grandTotal)

  // useEffect(() => {
  //   const bbmm = localStorage.getItem("priceList");
  //   setBmPrice(bbmm)

  // }, [])

  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem("bm12pack", e.target.bm12.value)
    localStorage.setItem("bm20pack", e.target.bm20.value)
    localStorage.setItem("bs12pack", e.target.bs12.value)
    localStorage.setItem("bs30pack", e.target.bs30.value)
    localStorage.setItem("to12pack", e.target.to12.value)
    localStorage.setItem("to15pack", e.target.to15.value)
    localStorage.setItem("to33pack", e.target.to33.value)
    localStorage.setItem("nz12pack", e.target.nz12.value)


  }
  const bm12price = localStorage.getItem("bm12pack");
  const bm20price = localStorage.getItem("bm20pack");
  const bs12price = localStorage.getItem("bs12pack");
  const bs30price = localStorage.getItem("bs30pack");
  const to12price = localStorage.getItem("to12pack");
  const to15price = localStorage.getItem("to15pack");
  const to33price = localStorage.getItem("to33pack");
  const nz12price = localStorage.getItem("nz12pack");
  return (
    <div className=''>
      <form onSubmit={handleSubmit}>
        <div className='grid col-span-1 gap-1'>
          <p>{grandTotal}</p>
          <div>
            <InputField name={'bm12'} tittle={'BM 12kg'} qty={bmQty} price={bm12price} setQty={setBmQty} setPrice={setBmPrice} totalValue={bmTotal} setTotal={setBmTotal} ></InputField>
          </div>
          <div>
            <InputField name={'bs12'} tittle={'BS 12kg'} qty={bsQty} price={bs12price} setQty={setBsQty} setPrice={setBsPrice} totalValue={bsTotal} setTotal={setBsTotal} ></InputField>
          </div>
          <div>
            <InputField name={'to12'} tittle={'Total 12kg'} qty={to12Qty} price={to12price} setQty={setTo12Qty} setPrice={setTo12Price} totalValue={to12Total} setTotal={setTo12Total} ></InputField>
          </div>
          <div>
            <InputField name={'to15'} tittle={'Total 15kg'} qty={to15Qty} price={to15price} setQty={setTo15Qty} setPrice={setTo15Price} totalValue={to15Total} setTotal={setTo15Total} ></InputField>
          </div>
          <div>
            <InputField name={'nz12'} tittle={'Nazir 12kg'} qty={nz12Qty} price={nz12price} setQty={setNz12Qty} setPrice={setNz12Price} totalValue={nz12Total} setTotal={setNz12Total} ></InputField>
          </div>
          <div>
            <InputField name={'bs30'} tittle={'BS 30kg'} qty={bs30Qty} price={bs30price} setQty={setBs30Qty} setPrice={setBs30Price} totalValue={bs30Total} setTotal={setBs30Total} ></InputField>
          </div>
          <div>
            <InputField name={'bm20'} tittle={'BM 20kg'} qty={bm20Qty} price={bm20price} setQty={setBm20Qty} setPrice={setBm20Price} totalValue={bm20Total} setTotal={setBm20Total} ></InputField>
          </div>
          <div>
            <InputField name={'to33'} tittle={'Total 33kg'} qty={to33Qty} price={to33price} setQty={setTo33Qty} setPrice={setTo33Price} totalValue={to33Total} setTotal={setTo33Total} ></InputField>
          </div>
        </div>
        <input type="submit" className="btn btn-primary w-28 mt-8" value='Save' />
      </form>
    </div>
  );
};

export default PackageCalculation;