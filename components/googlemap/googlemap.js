import React from "react";

function GoogleApiWrapper() {
  return (
    <div>
      <h2 class="h1-responsive font-weight-bold text-center my-5">ADDRESS AND CONTACT</h2>
      <p class="font-weight-bold">1. Hotline</p>
      <p class="ml-4">+84 888.888.888</p>
      <p class="font-weight-bold">2. Email</p>
      <p class="ml-4">petparadise@gmail.com</p>
      <p class="font-weight-bold">3. Store address</p>
      <p class="ml-4">116 Nguyen Van Thu, Da Kao Ward, District 1, Ho Chi Minh City, Vietnam</p>
      <iframe class="ml-5"
        width="500"
        height="300"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginWidth="0"
        id="gmap_canvas"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.297018011192!2d106.6975504!3d10.7885482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f352568dd65%3A0xb52ce365dcbc0b31!2zMTE2IMSQLiBOZ3V54buFbiBWxINuIFRo4bunLCDEkGEgS2FvLCBRdeG6rW4gMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1681914299269!5m2!1svi!2s" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
      ></iframe><br></br>
    </div>
  );
}

export default React.memo(GoogleApiWrapper);
