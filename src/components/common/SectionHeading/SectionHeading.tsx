
import React from 'react'

interface headingProps {
    title?: string;
    subTitle?: string;
}


function SectionHeading({title, subTitle}: headingProps) {
  return (
    <>
        <span className='uppercase text-accent font-semibold leading-4'>
        {subTitle}
      </span>
      <h2 className='text-primary font-bold text-4xl italic'>{title}</h2>

    </>
  )
}

export default SectionHeading