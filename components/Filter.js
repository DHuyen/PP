import React, {useState, useEffect} from 'react'
import filterSearch from '../utils/filterSearch'
import {getData} from '../utils/fetchData'
import {useRouter} from 'next/router'
import SearchIcon from '../public/search'

const Filter = ({state}) => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [category, setCategory] = useState('')

    const {categories} = state

    const router = useRouter()


    const handleCategory = (e) => {
        setCategory(e.target.value)
        filterSearch({router, category: e.target.value})
    }

    const handleSort = (e) => {
        setSort(e.target.value)
        filterSearch({router, sort: e.target.value})
    }

    useEffect(() => {
        filterSearch({router, search: search ? search.toLowerCase() : 'all'})
    },[search])

    return (
        <div className="input-group">
            <div className="input-group-prepend col-md-2 px-0 mt-2 mr-2">
                <select className="select"
                value={category} onChange={handleCategory}>

                    <option value="all">All</option>

                    {
                        categories.map(item => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className="input-group-prepend col-md-2 px-0 mt-2">
                <select className="select"
                value={sort} onChange={handleSort}>

                     <option value="-createdAt">Newest</option>
                     <option value="oldest">Oldest</option>
                     <option value="-sold">Best sales</option>
                     <option value="-price">Hight-Low</option>
                     <option value="price">Low-Hight</option>

                </select>
            </div>

            <form autoComplete="off" className="mt-2 col-md-3 offset-md-4 px-3 input-group">
                <input type="text" className="form-control mr-4" list="title_product" placeholder="Search"
                value={search.toLowerCase()} onChange={e => setSearch(e.target.value)} />
            </form>

        </div>
    )
}

export default Filter
