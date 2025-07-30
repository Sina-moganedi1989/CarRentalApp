import React from 'react'
import { Outlet } from 'react-router-dom';
import HeaderSection from '../headersection/HeaderSection';
import FooterSection from '../FooterSection/FooterSection';

export default function DefaultLayout() {
  return (
    <div>
         <HeaderSection/>
      <Outlet />
      <FooterSection/>
      </div>
  )
}
