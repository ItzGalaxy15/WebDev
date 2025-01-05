import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './Home/Home';
import { MainHome } from './MainHome/MainHome';
 
export const main = () => {
  let rootElement =document.querySelector('#root')
  ReactDOM.render(
    <MainHome/>,
  rootElement
  )
}