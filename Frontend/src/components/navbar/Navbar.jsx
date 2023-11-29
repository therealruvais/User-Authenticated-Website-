import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import { IoPersonAddSharp } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import "./navbar.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import axios from "axios";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const logOut = async () => {
    const responce = await axios.post(
      "http://localhost:3000/api/user/logout",
      null,
      {
        withCredentials: true,
      }
    );
    if (responce.status == 200) {
      console.log(responce);
      return responce;
    }
    return new Error("Some thing went wrong");
  };

  const logOtHandler = () => {
    logOut()
      .then(() => dispatch(authActions.logout()))
      .then(() => navigate("/"));
  };

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted) {
      gsap.from(".navbar-link", {
        y: -100,
        opacity: 0,
        stagger: 0.5,
        duration: 0.5,
        ease: "bounce",
      });
      gsap.from(".logo", {
        x: -100,
        duration: 2,
        opacity: 0,
        ease: "bounce",
      });
    }
  }, [isMounted]);

  return (
    <div className="section">
      <div className="container">
        <div className="left">
          <h2 className="logo">LOGO</h2>
          {isLoggedIn && (
            <>
              <Link
                className={`${isMounted ? "navbar-link" : ""} ${
                  activeLink == "home" ? "actived" : ""
                }`}
                to="/home"
                onClick={() => setActiveLink("home")}
              >
                <AiFillHome style={{ fontSize: "20px" }} />
              </Link>
              <Link
                className={`${isMounted ? "navbar-link" : ""} ${
                  activeLink == "about" ? "actived" : ""
                }`}
                to="/about"
                onClick={() => setActiveLink("about")}
              >
                <FaInfo style={{ fontSize: "20px" }} />
              </Link>
              <Link
                className={`${isMounted ? "navbar-link" : ""} ${
                  activeLink == "contact" ? "actived" : ""
                }`}
                to="/contact"
                onClick={() => setActiveLink("contact")}
              >
                <FaPhoneVolume style={{ fontSize: "20px" }} />
              </Link>
            </>
          )}
        </div>
        <div className="right">
          <Link
            className={`${isMounted ? "navbar-link" : ""} ${
              activeLink == "signup" ? "actived" : ""
            }`}
            to="/signup"
            onClick={() => setActiveLink("signup")}
          >
            <IoPersonAddSharp style={{ fontSize: "20px" }} />
          </Link>
          <Link
            className={`${isMounted ? "navbar-link" : ""} ${
              activeLink == "login" ? "actived" : ""
            }`}
            to="/"
            onClick={() => setActiveLink("login")}
          >
            <LuLogIn style={{ fontSize: "20px" }} />
          </Link>
          {isLoggedIn && (
            <Link
              onClick={logOtHandler}
              className={`${isMounted ? "navbar-link" : ""} ${
                activeLink == "login" ? "actived" : ""
              }`}
            >
              <RiLogoutBoxLine style={{ fontSize: "20px" }} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
