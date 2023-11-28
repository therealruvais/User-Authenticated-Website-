import React, { useEffect, useState } from "react";
import "./home.css";
import gsap from "gsap";
import axios from "axios";

axios.defaults.withCredentials = true;

const Home = () => {

  let flag = true;

  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState();

  const refreshToken = async () => {
    console.log("hit");
    const res = await axios
      .get("http://localhost:3000/api/user/refresh", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    console.log(res);
    const Data = await res.data;
    console.log(Data);
    return Data;
  };

  const passRequest = async () => {
    const response = await axios
      .get("http://localhost:3000/api/user/verify", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = response.data;
    // console.log(data)
    return data;
  };

  useEffect(() => {
    if (flag) {
      flag = false;
      passRequest().then((data) => setUser(data));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data));
    }, 1000 * 29);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (isMounted) {
      gsap.from(".future , .tech", {
        y: 100,
        opacity: 0,
        stagger: 1,
        duration: 1,
      });
      gsap.from(".img1 , .img2, .img3", {
        opacity: 0,
        scale: 0,
        duration: 1,
        stagger: 0.5,
      });
      gsap.to(".arrow", {
        y: 30,
        repeat: -1,
        duration: 1,
        yoyo: true,
      });
    }
  }, [isMounted]);

  return (
    <div className="home-section">
      <div className="home-container">
        <div>{user && <h1>{user.name}</h1>}</div>
        <div className="img">
          <img
            className={`${isMounted ? "img3" : ""}`}
            src="https://images.pexels.com/photos/8728290/pexels-photo-8728290.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
          <img
            className={`${isMounted ? "img2" : ""}`}
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZ1dHVyZSUyMHRlY2h8ZW58MHx8MHx8fDA%3D"
          />
          <img
            className={`${isMounted ? "img1" : ""}`}
            src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZnV0dXJlJTIwdGVjaHxlbnwwfHwwfHx8MA%3D%3D"
          />
        </div>
        <div className="home-text">
          <h2 className={`${isMounted ? "future" : ""}`}>
            BE A MAN OF THE <span style={{ color: "magenta" }}>FUTURE</span>
          </h2>
          <h2 className={`${isMounted ? "tech" : ""}`}>
            DIVE IN TO THE WORLD OF{" "}
            <span style={{ color: "maroon" }}>TECH</span>
          </h2>
        </div>
        <div className="arrow">
          <h3>Scroll ↓</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
