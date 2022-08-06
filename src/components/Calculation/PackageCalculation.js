import React, { useState } from 'react';
import InputField from './InputField';

const PackageCalculation = ({ setPackageTotal }) => {
  // BM 12 kg state
  const [bmTotal, setBmTotal] = useState(0);
  const [bmQty, setBmQty] = useState(0);
  const [bmPrice, setBmPrice] = useState(0);
  // BM 20 kg state
  const [bm20Total, setBm20Total] = useState(0);
  const [bm20Qty, setBm20Qty] = useState(0);
  const [bm20Price, setBm20Price] = useState(0);
  // BS 12 kg state
  const [bsTotal, setBsTotal] = useState(0);
  const [bsQty, setBsQty] = useState(0);
  const [bsPrice, setBsPrice] = useState(0);
  // BS 30 kg state
  const [bs30Total, setBs30Total] = useState(0);
  const [bs30Qty, setBs30Qty] = useState(0);
  const [bs30Price, setBs30Price] = useState(0);
  // Total 12 kg state
  const [to12Total, setTo12Total] = useState(0);
  const [to12Qty, setTo12Qty] = useState(0);
  const [to12Price, setTo12Price] = useState(0);

  // Total 15 kg state
  const [to15Total, setTo15Total] = useState(0);
  const [to15Qty, setTo15Qty] = useState(0);
  const [to15Price, setTo15Price] = useState(0);
  // Nazir 12 kg state
  const [nz12Total, setNz12Total] = useState(0);
  const [nz12Qty, setNz12Qty] = useState(0);
  const [nz12Price, setNz12Price] = useState(0);
  // Total 33 kg state
  const [to33Total, setTo33Total] = useState(0);
  const [to33Qty, setTo33Qty] = useState(0);
  const [to33Price, setTo33Price] = useState(0);

  const grandTotal = (bmTotal + bm20Total + bsTotal + bs30Total + to12Total + to15Total + to33Total + nz12Total)
  setPackageTotal(grandTotal)

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target.bm12.value);
  }
  return (
    <div className=''>
      <form onSubmit={handleSubmit}>
        <div className='grid col-span-1 gap-2'>
          <p>{grandTotal}</p>
          <div>
            <InputField name={'bm12'} tittle={'BM 12kg'} qty={bmQty} price={bmPrice} setQty={setBmQty} setPrice={setBmPrice} totalValue={bmTotal} setTotal={setBmTotal} ></InputField>
          </div>
          <div>
            <InputField name={'bs12'} tittle={'BS 12kg'} qty={bsQty} price={bsPrice} setQty={setBsQty} setPrice={setBsPrice} totalValue={bsTotal} setTotal={setBsTotal} ></InputField>
          </div>
          <div>
            <InputField name={'to12'} tittle={'Total 12kg'} qty={to12Qty} price={to12Price} setQty={setTo12Qty} setPrice={setTo12Price} totalValue={to12Total} setTotal={setTo12Total} ></InputField>
          </div>
          <div>
            <InputField tittle={'Total 15kg'} qty={to15Qty} price={to15Price} setQty={setTo15Qty} setPrice={setTo15Price} totalValue={to15Total} setTotal={setTo15Total} ></InputField>
          </div>
          <div>
            <InputField name={'nz12'} tittle={'Nazir 12kg'} qty={nz12Qty} price={nz12Price} setQty={setNz12Qty} setPrice={setNz12Price} totalValue={nz12Total} setTotal={setNz12Total} ></InputField>
          </div>
          <div>
            <InputField name={'bs30'} tittle={'BS 30kg'} qty={bs30Qty} price={bs30Price} setQty={setBs30Qty} setPrice={setBs30Price} totalValue={bs30Total} setTotal={setBs30Total} ></InputField>
          </div>
          <div>
            <InputField name={'bm20'} tittle={'BM 20kg'} qty={bm20Qty} price={bm20Price} setQty={setBm20Qty} setPrice={setBm20Price} totalValue={bm20Total} setTotal={setBm20Total} ></InputField>
          </div>
          <div>
            <InputField name={'to33'} tittle={'Total 33kg'} qty={to33Qty} price={to33Price} setQty={setTo33Qty} setPrice={setTo33Price} totalValue={to33Total} setTotal={setTo33Total} ></InputField>
          </div>
        </div>
        <input type="submit" className="btn btn-primary w-28 mt-8" />
      </form>
    </div>
  );
};

export default PackageCalculation;