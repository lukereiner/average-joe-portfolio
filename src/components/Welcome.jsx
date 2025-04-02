import React from 'react'
import { Link } from 'react-router-dom'
import './Welcome.css'

const Welcome = () => {
  return (
    <>
        <div className='base'>
            <div className='greenBox'>
                <div className='averageJoe'>Average Joe Portfolio</div>
                <div className='slogan'>Your one stop shop for anyone to build an investment portfolio</div>
                <Link to='/guide'>
                    <div className='startButton'>
                        <div className='startButtonLabel'>Next</div>
                    </div>
                </Link>
            </div>
        </div>
    </>
  )
}

export default Welcome