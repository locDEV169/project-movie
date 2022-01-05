import React, { useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/dropdown";
import { Link } from "react-router-dom";
import "./Header.css";
import "./Search.css";

function Header() {
  const hederRef = useRef(null);
  const checkLogin = JSON.parse(localStorage.getItem("isLogin"));
  const userInfor = JSON.parse(localStorage.getItem("user"));
  const [keyWord, setKeyWord] = useState("");
  const navigate = useNavigate();

  const onChangeInput = (e) => {
    setKeyWord(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (keyWord) {
      navigate(`/results/${keyWord}`)
      window.location.reload()
    }
    else {
        document.getElementById("search-text").placeholder = "Nhap du lieu di mat loz";
    }
  };

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
          style={{ width: "120px", height: "30px" }}
        />
      </Link>
      <form onSubmit={onSubmitForm} className="search">
        <div className="search-input">
          <input
            onChange={onChangeInput}
            value={keyWord}
            placeholder="Search...."
            className="search-text"
            id="search-text"
            type="text"
          />
          <input className="search-submit" type="submit" value="Search" />
        </div>
      </form>
      <div className="header-left">
        {checkLogin ? dropBox() : login()}
        {/* <Link className="header-search" to="/search">
          <box-icon size="md" color="white" name="search-alt-2"></box-icon>
        </Link> */}
      </div>
    </div>
  );

  function login() {
    return (
      <Link className="header-login" to="/login">
        <p>sign in</p>
      </Link>
    );
  }

  function dropBox() {
    return (
      <Dropdown>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          style={{ marginRight: "15px" }}
        >
          Hi {userInfor.username}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ backgroundColor: "#333" }}>
          <Dropdown.Item>Profile</Dropdown.Item>
          <button style={{ backgroundColor: "#333" }} onClick={logout}>
            <Dropdown.Item style={{ backgroundColor: "#333" }}>
              Logout
            </Dropdown.Item>
          </button>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  function logout() {
    localStorage.setItem("isLogin", JSON.stringify(false));
    localStorage.removeItem("user");
    window.location.reload();
  }
}

export default Header;
