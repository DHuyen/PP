import React from "react";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";
import Mess from "../public/mess.js"

function Layout({ children }) {

    const newPopup = (url) => {
        window.open(
            url, 'popUpWindow', 'height=600,width=400,right=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes')
    }
    return (
        <div>
            <div className="container">
                <NavBar />
            </div>

            <p class="line-hight"></p>

            <div className="container">
                <Notify />
                <Modal />
                <div onClick={() => newPopup('https://nextjsblogs.herokuapp.com/')} style={{ position: 'fixed', bottom: '4%', right: '2%', zIndex: 999 }}>
                    <Mess />
                </div>
                <div class="online-indicator" style={{ position: 'fixed', bottom: '4%', right: '2%' }}>
                    <span class="blink"></span>
                </div>
                
                {children}
            </div>

        </div>
    );
}

export default Layout;
