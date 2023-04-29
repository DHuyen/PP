import { useContext, useEffect } from 'react'

import { useRouter } from 'next/router'
import { DataContext } from '../store/GlobalState'
import moment from 'moment/moment'
import randomColor from "randomcolor";


const Email = () => {
    const router = useRouter()
    const { state, dispatch } = useContext(DataContext)
    const { mails } = state
    var color = randomColor()


    return (
        <section class="">
            <div>
                <button className="btn btn-dark" onClick={() => router.back()}>
                    <i className="fas fa-long-arrow-alt-left" aria-hidden></i>
                    Back
                </button>
            </div>
            {
                mails && mails?.map((item) =>
                    <div class="container py-4 h-50">
                        <div class="row d-flex justify-content-start">
                            <div class="col col-lg-12 mb-1 mb-lg-0">
                                <div class="card mb-2" style={{ borderRadius: '0rem' }}>
                                    <div class="row g-0">
                                        <div class="col-md-4 gradient-custom text-center"
                                            style={{ borderTopLeftRadius: '5rem', borderBottomLeftRadius: '5rem' }}>
                                            <img src={'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg'}
                                                alt="Avatar" class="img-fluid my-5" style={{ width: "60px" }} />
                                            <p>Support by gmail</p>
                                            <div class="avatars" style={{ background: color }}>
                                                <div class="avatar__letters">
                                                    {item?.user_name && item?.user_name?.slice(0, 2).toUpperCase()}
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body p-4">
                                                <h6 class="font-weight-bold">Sender name: {item?.user_name}</h6>
                                                <hr class="mt-0 mb-4" />
                                                <div class="row pt-1">
                                                    <div class="col-6 mb-3">
                                                        <h6>User's email</h6>
                                                        <p class="text-muted">{item?.email}</p>
                                                    </div>
                                                    <div class="col-6 mb-3">
                                                        <h6>Send date</h6>
                                                        <p class="text-muted">{moment(item?.createdAt)?.format('YYYY/MM/DD hh:ss')}</p>
                                                    </div>
                                                </div>
                                                <hr class="mt-0 mb-4" />
                                                <div class="row pt-1">
                                                    {/* <div class="col-6 mb-3">
                                                        <h6>User's phone</h6>
                                                        <p class="text-muted">{item?.user_phone}</p>
                                                    </div>
                                                    <div class="col-6 mb-3">
                                                        <h6>Booking time</h6>
                                                        <p class="text-muted">{item?.booking_time}</p>
                                                    </div> */}
                                                    <div class="col-6 mb-3">
                                                        <h6>Title</h6>
                                                        <p class="text-muted">{item?.subject}</p>
                                                    </div>
                                                    <div class="col-6 mb-3">
                                                        <h6>Description</h6>
                                                        <p class="text-muted">{item?.message}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
            }
        </section>
    )
}

export default Email