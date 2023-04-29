import Head from 'next/head'
import { useContext, useState, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { updateItem } from '../../store/Actions'

import { useRouter } from 'next/router'
import { patchData } from '../../utils/fetchData'
import UserDetail from '../../public/userdetail'

const EditUser = () => {
    const router = useRouter()
    const { id } = router.query

    const { state, dispatch } = useContext(DataContext)
    const { auth, users } = state
    const [editUser, setEditUser] = useState([])
    const [checkAdmin, setCheckAdmin] = useState(false)
    const [num, setNum] = useState(0)

    const userDetail = users?.filter((item) => item._id === id)[0]
    console.log(userDetail, 'users')

    useEffect(() => {
        users.forEach(user => {
            if (user._id === id) {
                setEditUser(user)
                setCheckAdmin(user.role === 'admin' ? true : false)
            }
        })
    }, [users])

    const handleCheck = () => {
        setCheckAdmin(!checkAdmin)
        setNum(num + 1)
    }

    const handleSubmit = () => {
        let role = checkAdmin ? 'admin' : 'user'
        if (num % 2 !== 0) {
            dispatch({ type: 'NOTIFY', payload: { loading: true } })
            patchData(`user/${editUser._id}`, { role }, auth.token)
                .then(res => {
                    if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

                    dispatch(updateItem(users, editUser._id, {
                        ...editUser, role
                    }, 'ADD_USERS'))

                    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
                })
        }

    }


    return (
        <section class="vh-100">
            <div>
                <button className="btn btn-dark" onClick={() => router.back()}>
                    <i className="fas fa-long-arrow-alt-left" aria-hidden></i> Back
                </button>
            </div>
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-start">
                    <div class="col col-lg-12 mb-4 mb-lg-0">
                        <div class="card mb-3" style={{ borderRadius: '0rem' }}>
                            <div class="row g-0">
                                <div class="col-md-4 gradient-custom text-center"
                                    style={{ borderTopLeftRadius: '0rem', borderBottomLeftRadius: '0rem' }}>
                                    <img src={userDetail?.avatar}
                                        alt="Avatar" class="img-fluid my-5" style={{ width: "80px" }} />
                                    <h5>{userDetail?.name}</h5>
                                    <p>{userDetail?.role}</p>
                                    <i class="far fa-edit mb-5"></i>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body p-4">
                                        <h6>Information</h6>
                                        <hr class="mt-0 mb-4" />
                                        <div class="row pt-1">
                                            <div class="col-6 mb-3">
                                                <h6>Email</h6>
                                                <p class="text-muted">{userDetail?.email}</p>
                                            </div>
                                            <div class="col-6 mb-3">
                                                <h6>Phone</h6>
                                                <p class="text-muted">888.888.888</p>
                                            </div>
                                        </div>
                                        <hr class="mt-0 mb-4" />
                                        <div class="row pt-1">
                                            <div class="col-6 mb-3">
                                                <h6>Recent</h6>
                                                <p class="text-muted">Lorem ipsum</p>
                                            </div>
                                            <div class="col-6 mb-3">
                                                <h6>Most viewed</h6>
                                                <p class="text-muted">Lorem ipsum</p>
                                            </div>
                                        </div>
                                        <div class="d-flex justify-content-start">
                                            <a href="#!"><i class="fab fa-facebook-f fa-lg me-3"></i></a>
                                            <a href="#!"><i class="fab fa-twitter fa-lg me-3"></i></a>
                                            <a href="#!"><i class="fab fa-instagram fa-lg"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row d-flex justify-content-start">
                    <div class="col col-lg-12 mb-4 mb-lg-0">
                        <div class="card mb-3" style={{ borderRadius: '0rem' }}>
                            <div class="row g-0">
                                <div class="col-md-4 gradient-custom text-center" style={{ borderTopLeftRadius: '5rem', borderBottomLeftRadius: '5rem' }}>
                                    <div class="mt-20" style={{ width: "80px", height: '20px' }}>
                                    </div>

                                    <UserDetail />
                                    <h6 class="mt-20">Change profile</h6>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body p-4">
                                        <div class="row pt-1">
                                            <div class="col-6 mb-3">
                                                <h6>Email</h6>
                                                <input type="text" style={{borderTop:0 , borderLeft:0, borderRight:0, outline:0}} id="email" defaultValue={editUser.email} />
                                            </div>
                                            <div class="col-6 mb-3">
                                                <h6>Name</h6>
                                                <input type="text" style={{borderTop:0 , borderLeft:0, borderRight:0, outline:0}}  class="text-muted " id="name" defaultValue={editUser.name} />
                                            </div>
                                        </div>
                                        <hr class="mt-0 mb-4" />
                                        <div class="row pt-1">
                                            <div class="col-6 mb-3">
                                                <h6>Admin</h6>
                                                <input type="checkbox" id="isAdmin" checked={checkAdmin} style={{width: '20px', height: '20px'}} onChange={handleCheck} />
                                            </div>
                                            <div class="col-6 mb-3">
                                                <h6>Submit</h6>
                                                <button className="btn btn-light border" onClick={handleSubmit}>Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EditUser