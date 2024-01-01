import React from 'react'
import './MainScreen.css'
import { Container, Row } from 'react-bootstrap'
// import {title, children}
function MainScreen({title,children}) {
  return (
    <div cllassName='mainback'>
      <Container>
        <Row>
            <div className='Page'>
                {
                    title &&( <>
                        <h1 className='heading'>
                        {title}
                        </h1>
                        <hr />
                    </>
                )}
                {children}
            </div>
        </Row>
      </Container>
    </div>
  )
}

export default MainScreen
