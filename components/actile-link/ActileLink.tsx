'use client';

import Link from 'next/link';
import  style from './ActiveLink.module.css'

import React from 'react'
import { usePathname } from 'next/navigation';

interface Props{
    path: string;
    text: string;


}


export const ActileLink = ({path, text}: Props) => {

  const pathName = usePathname();
  console.log(pathName)

  return (
    <Link  className={ `${style.link} ${ (pathName === path) && style['active-link']} `}
    href={path}>
        {text}
        </Link>
  )
}
