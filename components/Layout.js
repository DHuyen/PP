// import React from "react";
// import NavBar from "./NavBar";
// import Notify from "./Notify";
// import Modal from "./Modal";
// import Mess from "../public/mess.js"

// function Layout({ children }) {

//     const newPopup = (url) => {
//         window.open(
//             url, 'popUpWindow', 'height=600,width=400,right=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes')
//     }
//     return (
//         <div>
//             <div className="container">
//                 <NavBar />
//             </div>

//             <p class="line-hight"></p>

//             <div className="container">
//                 <Notify />
//                 <Modal />
//                 <div onClick={() => newPopup('https://nextjsblogs.herokuapp.com/')} style={{ position: 'fixed', bottom: '4%', right: '2%', zIndex: 999 }}>
//                     <Mess />
//                 </div>
//                 <div class="online-indicator" style={{ position: 'fixed', bottom: '4%', right: '2%' }}>
//                     <span class="blink"></span>
//                 </div>
                
//                 {children}
//             </div>

//         </div>
//     );
// }

// export default Layout;

import React from "react";
import NavBar from "./NavBar";
import Notify from "./Notify";
import Modal from "./Modal";
import Mess from "../public/mess.js"
import { useEffect } from "react";

function Layout({ children }) {

  useEffect(() => {
    var chatbox = document?.getElementById("fb-customer-chat");
    chatbox.setAttribute("page_id", "107079569045086");
    chatbox.setAttribute("attribution", "biz_inbox");


    window.fbAsyncInit = function () {
      FB.init({
        xfbml: true,
        version: "v15.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return (
    <div>
      <div className="container">
        <NavBar />
      </div>

      <p class="line-hight"></p>

      <div className="container">
        <Notify />
        <Modal />
        {/* <div class="online-indicator" style={{ position: 'fixed', bottom: '4%', right: '2%' }}>
                    <span class="blink"></span>
                </div> */}
        {/* <!-- Messenger Plugin chat Code --> */}
        <div id="fb-root"></div>

        {/* <!-- Your Plugin chat code --> */}
        <div id="fb-customer-chat" class="fb-customerchat"></div>
        {children}
      </div>

    </div>
  );
}

export default Layout;
