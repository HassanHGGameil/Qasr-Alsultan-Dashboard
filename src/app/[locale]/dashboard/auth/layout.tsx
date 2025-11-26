import Header from '@/components/common/Header';
import React, { ReactNode } from 'react'


interface IAdmin {
    children: ReactNode;
  }

function AuthLayout({children}: IAdmin) {
  return (
    <main>
      <Header />
      <div className=' mt-[2rem] py-2'>
        {children}
    </div>
    </main>
    
  )
}

export default AuthLayout