'use client'
import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastifyComponent = () => {
  return <ToastContainer position='top-right' autoClose={5000} theme='light' />
}

export default ToastifyComponent
