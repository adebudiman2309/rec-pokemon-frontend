import React, { ReactNode } from 'react'
import Sidebar from '../sidebar/Sidebar'
import "./container.scss"

const Container = ({children, title = ""}) => {
  return (
    <div className="container">
      <div className="sidebar-container">
        <Sidebar />
      </div>      
      <div className="content-container">
        <div className="content-title">
          <span className="text-title">{title}</span>
        </div>
        <div className="content">
          {children}
        </div>        
      </div>
    </div>
  )
}

export default Container