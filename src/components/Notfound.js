import React from 'react'
import { Link } from 'react-router-dom'

const Notfound = () => {
   return (
      <div className='container'>
         <div className="row">
            <div className="col-6 offset-3 my-5 text-center">
               <img src="/404.png" className="w-100" alt=""/>
               <h4>Bunday sahifa mavjud emas</h4>
               <Link to='/'>Bosh sahifaga o'tish</Link>
            </div>
         </div>
      </div>
   )
}

export default Notfound
