import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'

import { getData } from '../utils/fetchData'
import ProductItem from '../components/product/ProductItem'
import filterSearch from '../utils/filterSearch'
import { useRouter } from 'next/router'
import Filter from '../components/Filter'
import ImageSlider from '../components/slide/ImageSlider'
import Sale from '../components/sale/sale'
import Hot from '../components/sale/hot'
import { Fragment } from 'react'
import HotItem from '../components/sale/category'

const HotNew = (props) => {
  const [products, setProducts] = useState(props.products)

  const [isCheck, setIsCheck] = useState(false)
  const [page, setPage] = useState(1)
  const [dataCategories, seDataCategories] = useState([])
  const router = useRouter()

  const [listImage, setListImage] = useState(props?.products?.map((item, idx) => {
    if (item?.images?.length > 0) {
      return item?.images
    } else {
      return delete props?.products[idx]
    }
  }))

  useEffect(() => {
    setListImage(props?.products?.map((item) => {
      if (item?.images?.length > 0) {
        return item?.images
      } else {
        return delete props?.products[idx]
      }
    }))
  }, [props.products])

  console.log(listImage, 'listImage')

  const { state, dispatch } = useContext(DataContext)
  const { auth } = state

  useEffect(() => {
    seDataCategories(state?.categories && state?.categories?.length > 0 && state?.categories?.map((_item) => {
      const _products = products?.filter((item) => item?.category === _item?._id)
      return {
        ..._item,
        products: _products
      }
    }) || [])
  }, [state?.categories, products])

  console.log({products: products, categories: state?.categories, dataCategories: dataCategories}, 'dataCategories')


  useEffect(() => {
    setProducts(props.products)
  }, [props.products])

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1)
  }, [router.query])

  const handleCheck = (id) => {
    products.forEach(product => {
      if (product._id === id) product.checked = !product.checked
    })
    setProducts([...products])
  }

  const handleCheckALL = () => {
    products.forEach(product => product.checked = !isCheck)
    setProducts([...products])
    setIsCheck(!isCheck)
  }

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach(product => {
      if (product.checked) {
        deleteArr.push({
          data: '',
          id: product._id,
          title: 'Delete all of the chosen products?',
          type: 'DELETE_PRODUCT'
        })
      }
    })

    dispatch({ type: 'ADD_MODAL', payload: deleteArr })
  }

  const handleLoadmore = () => {
    setPage(page + 1)
    filterSearch({ router, page: page + 1 })
  }

  const slides = [...(listImage[0] ? listImage[0] : []), ...(listImage[1] ? listImage[1] : [])]

  const containerStyles = {
    margin: "20px 0px 10px 0px",
    width: "500px",
    height: "280px",
    margin: "0 auto",
    position: "relative"
  };

  const hotStyles = {
    position: "relative"
  };

  const saleStyles = {
    position: "absolute",
    right: "-3rem",
    top: "-10px"
  };

  const hoteSaleStyles = {
    position: "absolute",
    right: "2rem",
    top: "-10px"
  };


  return (
    <div className="home_page">
      <Head>
        <title>Home</title>
      </Head>

      <div style={containerStyles}>
        <ImageSlider slides={slides} />
        <div style={saleStyles}>
          <Sale />
        </div>
      </div>

      <h3 class="line">Hot feed</h3>

      <div className="products">
        {
          products.length === 0
            ? <h2>No product</h2>

            : products?.slice(0, 3)?.map(product => (
              <div style={hotStyles}>
                <ProductItem key={product._id} product={product} handleCheck={handleCheck} />
                <div style={hoteSaleStyles}>
                  <Hot />
                </div>
              </div>
            ))
        }
      </div>

      <h3 class="line">Categories</h3>

      {
        dataCategories && dataCategories?.map((item) =>
          <Fragment>
            <h3>{item?.name}</h3>
            <div className="products">
              {
                item?.products?.map((product, idx) =>
                  <div style={hotStyles}>
                    <ProductItem key={product._id} product={product} handleCheck={handleCheck} />

                    <div style={hoteSaleStyles}>
                      {idx < 2 && <HotItem />}
                    </div>
                  </div>
                )
              }
            </div>
          </Fragment>
        )
      }

      {
        props.result < page * 6 ? ""
          : <button className="btn btn-outline-info d-block mx-auto mb-4"
            onClick={handleLoadmore}>
            Load more
          </button>
      }

    </div>
  )
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'

  const res = await getData(
    `product?limit=${page * 100}&category=${category}&sort=${sort}&title=${search}`
  )
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result
    }, // will be passed to the page component as props
  }
}

export default HotNew