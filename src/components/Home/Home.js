import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div >
      <div className='w-fit mx-auto my-1'>
        <Link to="one"><button className='btn btn-primary btn-sm'>Boro Gari</button></Link>
        <Link to="two"><button className='btn btn-primary btn-sm'>Dayna Gari</button></Link>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default Home;