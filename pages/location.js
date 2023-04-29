import React, { useContext, useEffect, useState } from "react"
import { useRef } from "react";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { getData, postData } from "../utils/fetchData";
import emailjs from '@emailjs/browser';
import GoogleApiWrapper from '../components/googlemap/googlemap'
import { DataContext } from "../store/GlobalState";
import { sendMail } from "../store/Actions";

const LocationInfor = (props) => {
    const form = useRef();
    const [products, setProducts] = useState(props?.products?.map((item, idx) => {
        if (item?.comment?.length > 0) {
            return item?.comment
        } else {
            return delete props?.products[idx]
        }
    }))
    const { state, dispatch } = useContext(DataContext);

    const { mails, auth } = state

    useEffect(() => {
        setProducts(props?.products?.map((item) => {
            if (item?.comment?.length > 0) {
                return item?.comment
            } else {
                return delete props?.products[idx]
            }
        }))
    }, [props.products])
    // use library - email.js
    const sendEmail = async (e) => {
        e.preventDefault();
        let res
        res = await postData('mail', {
            user_name: document.getElementById("user_name").value,
            email: document.getElementById("user_email").value,
            user_phone: document.getElementById("user_phone").value,
            booking_time: document.getElementById("booking_time").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        }, auth.token)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        dispatch({ type: "ADD_MAIL", payload: [...mails, res.newMail] })
        //email.js --> UserID: PxFOPKidWDK8fIdaY (API Key)
        emailjs.sendForm('service_067g1fb', 'template_13c2lbk', form.current, 'PxFOPKidWDK8fIdaY')
            .then((result) => {
                dispatch(sendMail())
                e.target.reset()
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
            <Row>
                <Col sm={2}>
                    <Nav variant="pills">
                        <Nav.Item style={{ paddingTop: '50px', paddingBottom: '20px' }}>
                            <Nav.Link eventKey="1">ABOUT US</Nav.Link>
                        </Nav.Item>
                                                <Nav.Item style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                            <Nav.Link eventKey="6">CONNECT US</Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                            <Nav.Link eventKey="5">PET SERVICES</Nav.Link>
                        </Nav.Item>
                        
                        <Nav.Item style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                            <Nav.Link eventKey="2">ORDERING GUIDE</Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                            <Nav.Link eventKey="3">EXCHANGE POLICY</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={10}>
                    <Tab.Content>
                        <Tab.Pane eventKey="1">
                            {/* About PET PARADISE */}
                            <section class="mb-5">
                                <h2 class="h1-responsive font-weight-bold text-center my-5">About PET PARADISE</h2>
                                <p class="text-justify w-responsive mx-auto mb-2">Pet Paradise is a pet shop with a chain of stores, including many branches specializing in providing supplies, clothes, food, shower gel, cages, collars, and accessories for pets. In addition, Pet Paradise is also an address to receive baths, spas, care, hair trimming, and professional pet care. With the best service quality, and always trusted by customers, it will be an ideal and wonderful destination for pets.</p>
                                <div className="text-center">
                                    <iframe src="https://player.vimeo.com/video/337249936?h=55c44ea313&autoplay=1&loop=1&color=ffffff&title=0&byline=0&portrait=0" width="700" height="500" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                                </div>

                                <p class="font-weight-bold">1. OUR COMMITMENT</p>
                                <ul class="w-responsive mx-auto mb-5">
                                    <li>Pet Mart provides the best-quality products and services for pets.</li>
                                    <li>Develop a wide range of services to make your pet's life fuller and happier.</li>
                                    <li>Build and expand the system of stores with the best facilities for pets.</li>
                                    <li>Work tirelessly to improve the lives of pets in particular. And other animals in Vietnam in general.</li>
                                    <li>Constantly innovating to better meet the needs of pets and the wishes of customers.</li>
                                </ul>
                                <div className="text-center">
                                    <img class="w-responsive mx-auto mb-5" src={"https://chogaka.com/wp-content/uploads/2022/11/pet-shop-beograd-02-1024x673.jpg"} style={{ maxWidth: '700px' }} />
                                </div>
                                <p class="font-weight-bold">2. OUR VISION</p>
                                <ul class="w-responsive mx-auto mb-5">
                                    <li>We believe it is our duty to ensure the health and happiness of our pets. Help them truly understand that they are loved and safe.</li>
                                    <li>We believe that pets make people better. They will enrich our lives and build a developed and civilized society.</li>
                                    <li>We believe in what we are doing based on standard values in animal care. Product quality and customer care.</li>
                                </ul>
                                <div className="text-center">
                                    <iframe src="https://player.vimeo.com/video/96863008?h=4a9296fc59&autoplay=1&loop=1&color=cccccc&title=0&byline=0&portrait=0" width="700" height="500" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                                </div>
                                <p class="font-weight-bold">3. OUR ORIENTATION</p>
                                <p class="ml-4">We believe that our ability to advise, communicate, and provide the best service to our clients will lead to strong financial results and long-term growth. Pet Paradise evaluates the factors that contribute to the development of the company at four levels:</p>
                                <ul class="w-responsive mx-auto mb-5">
                                    <li class="ml-4"><strong>Effective leadership management:</strong> Create a professional teamwork environment. Constantly restructuring management, sharing, and accumulating experience. Extracurricular activities to effectively create value for work.</li>
                                    <li class="ml-4"><strong>Dedication to the profession:</strong> Appreciate, evaluate, and reward those who make great contributions to the company. Building the best remuneration policies for long-term employees</li>
                                    <li class="ml-4"><strong>Customer value:</strong> Keep customers coming back and bring the most practical value.</li>
                                    <li class="ml-4"><strong>Operating profit growth:</strong> A decisive factor in the future development of the business.</li>
                                </ul>
                                <div className="text-center">
                                    <img class="w-responsive mx-auto mb-5" src={"https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/344099874_223938856906865_6396514553968646119_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=730e14&_nc_ohc=SD0h4QRDxgkAX_s3jof&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDfH0LjmS57S7nwhuymcuj5TWcIQWYaz_dcJc9oyJLafw&oe=6450DFC8"} style={{ maxWidth: '700px' }} />
                                </div>
                            </section>
                        </Tab.Pane>
                        <Tab.Pane eventKey="2">
                            {/* Ordering Guide */}
                            <section class="mb-5">
                                <h2 class="h1-responsive font-weight-bold text-center my-5">Ordering Guide</h2>

                                <p class="text-justify w-responsive mx-auto mb-5">Please follow the simple steps below to choose and order products at Pet Paradise:</p>

                                <p class="w-responsive mx-auto mb-2 font-weight-bold">Step 1: Search and select products</p>
                                <ul class="w-responsive mx-auto mb-5">
                                    <li>The products on the website are classified in detail by product group. For example: dog product group, cat product group, clothing, leash collar, food, etc.</li>
                                    <li>You click on the group of products you are interested in.</li>
                                    <li>If you already have a specific product orientation, you can use the "Search" function to quickly search for that product.</li>
                                </ul>
                                <p class="w-responsive mx-auto mb-2 font-weight-bold">Step 2: View product information and decide to buy</p>
                                <ul class="w-responsive mx-auto mb-5">
                                    <li>You browse the products. If you want to see the details of any product, click the View button. If you choose to buy a product, please click the "Buy" button next to it to add the product to the cart.</li>
                                    <li>In the product details section, you can view product information such as product name, brand name, origin, technical features and uses, and product photos viewed in many directions.</li>
                                    <li>In case you want to place an order right away, you can call Pet Paradise immediately at the order number or chat with Pet Paradise via the Messenger chat box to know all the details about the product. You can also send inquiries or product questions to us by logging in to submit a question, then filling in the information and sending it to us.</li>
                                    <li>Once you have selected a product, the screen will display a list of selected products containing the products you have selected along with information about the selling price, the quantity ordered, and the total amount to be paid.</li>
                                </ul>
                                <p class="w-responsive mx-auto mb-2 font-weight-bold">Step 3: Review the shopping cart before deciding to buy</p>
                                <ul class="w-responsive mx-auto mb-5">
                                    <li>You can modify the structure of your shopping cart by clicking "Cart".</li>
                                    <li>To change the quantity of the product, click on the "+" or "-" signs on the right-hand side.</li>
                                    <li>If you want to remove the product from the cart, click the trash can icon.</li>
                                </ul>
                                <p class="w-responsive mx-auto mb-2 font-weight-bold">Step 4: Place your order</p>
                                <ul class="w-responsive mx-auto mb-5">
                                    <li>Pet Paradise offers free delivery to your address for all orders within the inner city of Hanoi and some areas of Ho Chi Minh City.</li>
                                    <li>If you agree to order the number of products in the cart, please click the "Checkout" button below the shopping cart to accept the payment. You then need to log in to your account to fill in the necessary information to complete the order.</li>
                                    <li>You will pay online via PayPal, or you can also choose to ship COD.</li>
                                    <li>You can also call Pet Paradise to order directly at the following phone numbers:</li>
                                    <i class="ml-1 text-danger"><strong>Tel:</strong> 024 3931 0777 - 024 3933 2727 |  <strong>Hotline:</strong> 0987 612727</i>
                                </ul>
                            </section>
                        </Tab.Pane>
                        <Tab.Pane eventKey="3">
                            {/* Return policy */}
                            <section class="mb-5">
                                <h2 class="h1-responsive font-weight-bold text-center my-5">Exchange policy at Pet Paradise</h2>

                                <p class="w-responsive mx-auto mb-3 font-weight-bold"><u>Product exchange conditions</u>:</p>
                                <ul class="w-responsive mx-auto mb-5">
                                    <li>You can return the goods within 30 days from the date of purchase, according to the invoice, without incurring any fees.</li><br></br>
                                    <li>The product has not been unpacked or stamped and is 100% new from the time of purchase. The same as when Pet Paradise delivered the product to you.</li><br></br>
                                    <li>Products can be exchanged directly at:</li><br></br>
                                    <i class="ml-4">1. 10 Ham Long, Hoan Kiem District, Hanoi - 024 3933 2727</i><br></br>
                                    <i class="ml-4">2. 174 Kim Ma, Ba Dinh District, Hanoi - 024 3244 4824</i><br></br>
                                    <i class="ml-4">3. 250/3 Ly Chinh Thang, District 3, City. HCM - 028 3526 0717</i><br></br>
                                    <i class="ml-4">4. 174 Cong Hoa, Tan Binh District, City. HCM - 028 3811 2799</i><br></br>
                                    <i class="ml-4">5. 255 Trung Nu Vuong, Hai Chau District, Da Nang – 023 6364 6727</i><br></br>
                                    <i class="ml-4">6. 116 Nguyen Van Thu, Da Kao Ward, District 1, HCM - 088.888.888</i><br></br><br></br>
                                    <p class="ml-1 mb-4 text-danger"><strong>Note:</strong> unchanged at the customer's house and not sent directly to the manufacturer.</p>
                                    <li>The renewed product will be equal to or greater than the previously purchased product.</li><br></br>
                                    <li>For customers who have purchased at the store and the product has been opened and checked at the store, it will not be exchanged for another product.</li><br></br>
                                    <li>No return of goods if the above products are in the program "Stock Clearance".</li><br></br>
                                    <li>In other cases, the decision-making power will belong to Pet Paradise.</li>
                                </ul>
                            </section>
                        </Tab.Pane>
                        
                        <Tab.Pane eventKey="4">
                            {/* Pet Service */}
                            <section class="mb-5">
                                <h2 class="h1-responsive font-weight-bold text-center my-5">PET SERVICES</h2>
                                <p class="w-responsive mx-auto mb-3 font-weight-bold">1. PET HOTEL SERVICES</p>
                                <p class="ml-4">With a reputable pet care service like Pet Paradise, you can safely go to work, travel, go on a business trip, etc.</p>
                                <p class="ml-4"><u>All worries are removed because</u>:</p>
                                <ul class="w-responsive mx-auto mb-4">

                                    <li class="ml-4"><i>Here, the children can eat delicious dishes according to their preferences but still maintain appropriate nutrition according to experts' standards.</i></li><br></br>
                                    <li class="ml-4"><i>Every day, your pet will be cleaned three times (morning, noon, and night).</i></li><br></br>
                                    <li class="ml-4"><i>Have fun in a clean and airy space.</i></li><br></br>
                                    <li class="ml-4"><i>Update photos and videos sent to pet owners daily.</i></li><br></br>
                                    <li class="ml-4"><i>Your pet will be taken for a walk every morning/evening and trained to go to the toilet in the right place.</i></li><br></br>
                                    <li class="ml-4"><i>Your pet will be brushed and massaged every day.</i></li><br></br>
                                    <li class="ml-4"><i>Free bath for pets when sending for 5 days or more.</i></li>
                                </ul>

                                <p class="w-responsive mx-auto mb-3 font-weight-bold">2. PET HAIR TRIMMING AND BEAUTY SERVICES:</p>
                                <p class="ml-4">Combo 12 steps to beautify your pet: Bath, Shaving, Nail Clipping, Cleaning, and Trimming from only #99$</p>
                                <p class="text-danger ml-4"><strong>Note:</strong> This is only applicable when booking in advance.</p>
                                <p class="ml-4">5% discount on the total bill for customers who have purchased pet food and accessories at PET PARADISE.</p>
                                <p class="ml-4">10% discount on bath services, spa trimming, and pet care at Pet Paradise Saigon:</p>
                                <ul class="w-responsive mx-auto mb-4">
                                    <li class="ml-4"><i>Full-body massage bath.</i></li><br></br>
                                    <li class="ml-4"><i>Shave on request.</i></li><br></br>
                                    <li class="ml-4"><i>Trimming and styling according to customer needs.</i></li><br></br>
                                    <li class="ml-4"><i>Nail clipping and shaving legs.</i></li><br></br>
                                    <li class="ml-4"><i>Ear cleaning, earwax.</i></li><br></br>
                                    <li class="ml-4"><i>Dyeing ears, legs, and tail hair on request.</i></li><br></br>
                                    <li class="ml-4"><i>VIP-class pet-sitting hotel.</i></li>
                                </ul>

                                <p class="w-responsive mx-auto mb-4 font-weight-bold">3. BOOK AN APPOINTMENT NOW</p>
                                <p class="text-justify">Please enter all fields below to make an appointment now.</p>

                                <div class="row">
                                    <div class="col-md-10 mb-md-0 mb-5">
                                        <form ref={form} onSubmit={sendEmail}><br></br>
                                            <div class="row">

                                                <div class="col-md-6">
                                                    <div class="md-form mb-0">
                                                        <label for="name" class="">Your name</label>
                                                        <input type="text" id="user_name" name="user_name" class="form-control" />
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="md-form mb-0">
                                                        <label for="email" class="">Your email</label>
                                                        <input type="email" id="user_email" name="user_email" class="form-control" />
                                                    </div>
                                                </div>
                                            </div><br></br>

                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="md-form mb-0">
                                                        <label for="user_phone" class="">Your phone</label>
                                                        <input type="tel" id="user_phone" name="user_phone" class="form-control" />
                                                        {/* pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required */}
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="md-form mb-0">
                                                        <label for="booking_time" class="">Booking time</label>
                                                        <input type="datetime-local" id="booking_time" name="booking_time" class="form-control" />
                                                    </div>
                                                </div>
                                            </div><br></br>

                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="md-form mb-0">
                                                        <label for="subject" class="">Title</label>
                                                        <input type="text" id="subject" name="subject" class="form-control" />
                                                    </div>
                                                </div>
                                            </div><br></br>

                                            <div class="row">
                                                <div class="col-md-12">

                                                    <div class="md-form">
                                                        <label for="message">Description</label>
                                                        <textarea type="text" id="message" name="message" rows="5" class="form-control md-textarea"></textarea>
                                                    </div>

                                                </div>
                                            </div><br></br>
                                            <input type="submit" value="Send" className="btn btn-dark border" />
                                        </form>


                                        <div class="status"></div>
                                    </div>



                                </div>

                            </section>
                        </Tab.Pane>
                        <Tab.Pane eventKey="6">
                            <GoogleApiWrapper />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export async function getServerSideProps({ query }) {
    const page = query.page || 1
    const category = query.category || 'all'
    const sort = query.sort || ''
    const search = query.search || 'all'

    const res = await getData(
        `product?limit=${page * 6}&category=${category}&sort=${sort}&title=${search}`
    )
    // server side rendering
    return {
        props: {
            products: res.products,
            result: res.result
        }, // will be passed to the page component as props
    }
}


export default LocationInfor