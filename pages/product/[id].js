import Head from 'next/head'
import { useState, useContext, useEffect, useRef } from 'react'
import { getData, putData } from '../../utils/fetchData'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import Like from '../../public/like'
import Comment from '../../public/comment'
import Dislike from '../../public/dislike'
import { useRouter } from 'next/router'
import LikeBold from '../../public/likeBold'
import DisLikeBold from '../../public/DisLikeBold'
import PostComment from '../../public/post'
import EmojiIcon from '../../public/emoji'
import CameraIcon from '../../public/camera'
import Picker from '@emoji-mart/react'
import moment from 'moment'
import { imageUpload } from '../../utils/imageUpload'
import ImageGallery from 'react-image-gallery';

export const styles = {
    icon: {
        width: '30px',
        height: '26px',
        fill: '#FFFAF0',
        position: 'absolute',
        bottom: '1%',
        right: '2%'
    },
    emoji: {
        width: "98%",
        position: "absolute",
        top: "8%",
        right: "1%",
        zindex: "999 !important",
        height: "62%",
    }
};

const DetailProduct = (props) => {
    const [product, setProduct] = useState(props.product)
    const [emoji, setEmoji] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [stateInput, setStateInput] = useState({ comment: '', url: [], name: '', avatar: '', time: '' });
    const [images, setImages] = useState([])
    const [tab, setTab] = useState(0)
    const router = useRouter()
    const { id } = router.query
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state
    const golobalCheckDupicate = product.like.filter((item) => item.name.includes(auth?.user?.name))
    const golobalCheckDupicate_dislike = product.disLike.filter((item) => item.name.includes(auth?.user?.name))

    const getMoment = moment().format('YYYY/MM/DD HH:mm:ss');
    const inputFile = useRef(null)

    const onToggleGallery = () => { setIsShow(!isShow) }
    const callApi = async () => {
        const res = await getData(`product/${id}`)
        setProduct(res.product)
    }

    const isActive = (index) => {
        if (tab === index) return " active";
        return ""
    }

    const handleLike = async () => {
        const checkDupicate = product.like.filter((item) => item.name.includes(auth.user.name))
        const checkLikeDupicate = checkDupicate?.length > 0 ? product.like?.filter((item) => item?.name !== auth.user.name) : [...product.like, { name: auth.user.name }]
        let res
        res = await putData(`product/${id}`, { ...product, like: checkLikeDupicate }, auth.token)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        else {
            callApi()
        }
    }

    const handleDisLike = async () => {
        const checkDupicate = product.disLike.filter((item) => item.name.includes(auth.user.name))
        const checkDisLikeDupicate = checkDupicate?.length > 0 ? product.disLike?.filter((item) => item?.name !== auth.user.name) : [...product.disLike, { name: auth.user.name }]
        let res
        res = await putData(`product/${id}`, { ...product, disLike: checkDisLikeDupicate }, auth.token)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        else {
            callApi()
        }
    }

    const handleSend = async () => {
        let media = []
        const imgNewURL = images.filter(img => !img.url)

        if (imgNewURL.length > 0) media = await imageUpload(imgNewURL)

        let res
        res = await putData(`product/${id}`, { ...product, comment: [...product.comment, { ...stateInput, url: [...media] }] }, auth.token)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        else {
            setStateInput({ comment: '', url: [], name: '', avatar: '', time: '' })
            setImages([])
            callApi()
        }
    }

    const onClickShowEmoji = () => {
        setEmoji(!emoji)
    }

    const onClickEmoji = (event) => {
        console.log(event.native, '123')
        setStateInput({ comment: stateInput?.comment ? stateInput.comment + event.native : event.native, url: [], name: auth.user.name, avatar: auth.user.avatar, time: getMoment })
        setEmoji(!emoji)
    }

    const onChangeInput = (event) => {
        setStateInput({ comment: event.target.value, url: [], name: auth.user.name, avatar: auth.user.avatar, time: getMoment })
    }

    const onClickImage = () => {
        inputFile.current.click();
    };

    const takeImage = (e) => {
        dispatch({ type: 'NOTIFY', payload: {} })
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]

        if (files.length === 0)
            return dispatch({ type: 'NOTIFY', payload: { error: 'The file does not exist.' } })

        files.forEach(file => {
            if (file.size > 1024 * 1024)
                return err = 'The maximum image size is 1 MB.'

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return err = 'The image format is incorrect.'

            num += 1;
            if (num <= 5) newImages.push(file)
            return newImages;
        })

        if (err) dispatch({ type: 'NOTIFY', payload: { error: err } })

        const imgCount = images.length
        if (imgCount + newImages.length > 5)
            return dispatch({ type: 'NOTIFY', payload: { error: 'Choose up to five photos.' } })
        setImages([...images, ...newImages])
    }

    const deleteImage = index => {
        const newArr = [...images]
        newArr.splice(index, 1)
        setImages(newArr)
    }
    console.log(product.images, 'product.images')
    return (
        <div className="row detail_page">
            <Head>
                <title>Detail Product</title>
            </Head>

            <div className="col-md-6">
                {/* <img src={product.images[tab].url} alt={product.images[tab].url}
                    className="d-block img-thumbnail rounded mt-4 w-100"
                    style={{ height: '350px' }} />

                <div className="row mx-0" style={{ cursor: 'pointer' }} >

                    {product.images.map((img, index) => (
                        <img key={index} src={img.url} alt={img.url}
                            className={`img-thumbnail rounded ${isActive(index)}`}
                            style={{ height: '80px', width: '20%' }}
                            onClick={() => setTab(index)} />
                    ))}

                </div> */}

                <ImageGallery items={product.images?.map((item) => {
                    return {
                        ...item,
                        original: item?.url,
                        thumbnail: item?.url,
                    }
                })} />
            </div>

            <div className="col-md-6 mt-3">

                <h3 className="text-uppercase font-weight-bold">{product.title}</h3>
                <h5 className="text-danger font-weight-bold">${product.price}</h5>

                <div className="row mx-0 d-flex justify-content-between">
                    {
                        product.inStock > 0
                            ? <h6 className="text-danger font-weight-bold">In Stock: {product.inStock}</h6>
                            : <h6 className="text-danger font-weight-bold">Out Stock</h6>
                    }

                    <h6 className="text-danger font-weight-bold">Sold: {product.sold}</h6>
                </div>

                <div className="my-2">{product.description}</div>
                <div className="my-2">
                    {product.content}
                </div>

                <button type="button" className="btn-center btn-dark d-block my-3 px-5"
                    onClick={() => dispatch(addToCart(product, cart))} >
                    Buy
                </button>

                {/* <button type="button" className="btn btn-dark d-block my-3 px-5"
                    onClick={onToggleGallery} >
                    View
                </button> */}
            </div>

            <div style={{ backgroundcolor: "#ad655f;" }}>
                <div class="container py-5">
                    <div class="row d-flex justify-content-center">
                        <div class="col-md-16 col-lg-12">
                            {/* <div class="row d-flex justify-content-end mr-4 mb-2 py-2">
                                {
                                    golobalCheckDupicate?.length > 0 ?
                                        <span onClick={handleLike}>
                                            <LikeBold />
                                        </span>
                                        :
                                        <span onClick={handleLike}>
                                            <Like />
                                        </span>
                                }

                                <span class="mr-4" />

                                {
                                    golobalCheckDupicate_dislike?.length > 0 ?
                                        <span onClick={handleDisLike}>
                                            <DisLikeBold />
                                        </span>
                                        :
                                        <span onClick={handleDisLike}>
                                            <Dislike />
                                        </span>
                                }

                                <span class="mr-4" />

                                <span>
                                    <Comment />
                                </span>
                            </div> */}

                            <div class="row d-flex justify-content-end mr-2 mb-2 ">
                                {product?.like?.length} Like
                                <span class="mr-4" />
                                {product?.disLike?.length} Dislike
                                <span class="mr-4" />
                                {product?.comment?.length} Comment
                            </div>

                            <div class="d-flex flex-start mb-4 mt-4">
                                <img class="rounded-circle shadow-1-strong me-3 mr-4" src={auth?.user?.avatar} alt="avatar" width="30" height="30" />
                                <input type="text" value={stateInput?.comment} onChange={onChangeInput} class="form-control h-100 text-sm-start justify-content-center mr-4" placeholder="If you have any questions, please contact us right away!" />
                                <span class="mr-4 position-relative" onClick={onClickShowEmoji}>
                                    <EmojiIcon />
                                    {
                                        emoji &&
                                        <div style={{
                                            width: "80%",
                                            position: "absolute",
                                            top: "-1450%",
                                            right: "1500%",
                                            zindex: "999 !important",
                                            height: "62%",
                                        }}>
                                            <Picker
                                                onEmojiSelect={onClickEmoji}
                                                showPreview={false}
                                                showSkinTones={false}
                                                theme={'white'}
                                            />
                                        </div>
                                    }
                                </span>
                                <span class="mr-4" onClick={onClickImage}><CameraIcon /></span>
                                <input
                                    type="file"
                                    id="file"
                                    accept="image/png, image/gif, image/jpeg, video/mp4,video/x-m4v,video/*"
                                    ref={inputFile}
                                    style={{ display: "none" }}
                                    multiple
                                    onChange={takeImage}
                                />
                                <span onClick={handleSend}><PostComment /></span>
                            </div>

                            <section class="mb-4">
                                <section class="">
                                    <div class="row">
                                        {
                                            images.map((img, index) => (
                                                <div class="col-lg-2 col-md-12 mb-4 mb-lg-0">
                                                    <div
                                                        key={index}
                                                        class="my-1"
                                                        data-ripple-color="light"
                                                    >
                                                        <img
                                                            src={img.url ? img.url : URL.createObjectURL(img)}
                                                            class="rounded"
                                                            height="100"
                                                            width="100"
                                                        />
                                                        <span style={{
                                                            position: 'absolute',
                                                            top: '-1px',
                                                            left: '100px',
                                                            zindex: '4',
                                                            background: 'white',
                                                            borderRadius: '50%',
                                                            fontsize: "10px",
                                                            fontweight: 'bolder',
                                                            padding: "3px 7px",
                                                            cursor: "pointer"
                                                        }} onClick={() => deleteImage(index)}>X</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </section>
                            </section>

                            <div class="card text-dark">
                                {
                                    product?.comment?.length > 0 ?
                                        product?.comment?.map((item, index) => {
                                            if (item?.avatar?.length > 0) {
                                                return (
                                                    <div class="card-body p-4 w-100">
                                                        <h4 class="mb-0">{index === Number(product?.comment?.length - 1) && 'Recent comments'}</h4>
                                                        <p class="fw-light mb-4 pb-2">{index === Number(product?.comment?.length - 1) && 'Latest Comments'}</p>

                                                        <div class="d-flex flex-start">
                                                            <img class="rounded-circle shadow-1-strong me-3 mr-4"
                                                                src={item?.avatar} alt="avatar" width="60"
                                                                height="60" />
                                                            <div>
                                                                <h6 class="fw-bold mb-1">{item?.name}</h6>
                                                                <div class="d-flex align-items-center mb-3">
                                                                    <p class="mb-0">
                                                                        {item?.time}
                                                                    </p>
                                                                </div>
                                                                <p class="mb-0">
                                                                    {item?.comment}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div class="row mt-4 mb-2">
                                                            {
                                                                item?.url?.length > 0 && item?.url?.map((img, index) => (
                                                                    <div class="col-lg-2 col-md-10 mb-4 mb-lg-0">
                                                                        <div
                                                                            key={index}
                                                                            class="my-1"
                                                                            data-ripple-color="light"
                                                                        >
                                                                            <img
                                                                                src={img.url ? img.url : URL.createObjectURL(img)}
                                                                                class="rounded"
                                                                                height="120"
                                                                                width="160"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }).reverse()
                                        :
                                        <p class="mb-0">Don't have reviews yet.</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export async function getServerSideProps({ params: { id } }) {

    const res = await getData(`product/${id}`)
    // server side rendering
    return {
        props: { product: res.product }, // will be passed to the page component as props
    }
}


export default DetailProduct