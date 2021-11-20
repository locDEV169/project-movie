import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const hederRef = useRef(null);

  useEffect(() => {
    const handleFixedMenu = () => {
      window.scrollY > 80
        ? hederRef.current.classList.add("fixed")
        : hederRef.current.classList.remove("fixed");
    };

    window.addEventListener("scroll", handleFixedMenu);

    return () => {
      window.removeEventListener("scroll", handleFixedMenu);
    };
  }, []);

  return (
    <div ref={hederRef} className="header">
      <Link to="/" className="header-logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
          alt=""
          style={{width: '120px',height: '30px'}}
        />
      </Link>
      <div className="header-left">
        <Link className="header-login" to="/login">
          <p>sign in</p>
        </Link>
        <Link className="header-search" to="/search">
          <box-icon size="md" color="white" name="search-alt-2"></box-icon>
        </Link>
      </div>
    </div>
  );
}

export default Header;
