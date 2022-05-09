import React, { useEffect, useRef, useState } from 'react'
import { social, links } from './data'
import {FaBars} from 'react-icons/fa'

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linkRef = useRef(null);
  const containerRef = useRef(null);

  const handleClick = () => {
    setShowLinks(!showLinks);
  }

  useEffect(() => {
    const linksHeight = linkRef.current.getBoundingClientRect().height;
    
    if (showLinks) {
      containerRef.current.style.height = `${linksHeight}px`
    } else {
      containerRef.current.style.height = '0px';
    }
  },[showLinks])

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <h4>sky<span>coding</span></h4>
          <button onClick={handleClick} className="nav-toggle">
            <FaBars/>
          </button>
        </div>
        <div ref={containerRef} className="links-container">
          <ul ref={linkRef} className="links">
            {links.map((link)=>{
              const {id,url,text}=link;
              return(
                <li key={id}>
                  <a href={url}>
                    {text}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <ul className="social-icons">
          {social.map((icons) => {
            const { id, icon, url } = icons;
            return (
              <li key={id}>
                <a href={url}>
                  {icon}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar