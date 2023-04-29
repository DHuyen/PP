import { useContext, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import Loading from './Loading'
import Toast from './Toast'

const Notify = () => {
    const { state, dispatch } = useContext(DataContext)
    const { notify } = state

    // set time out to close Toast
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch({ type: 'NOTIFY', payload: {} })
        }, 3000);
        return () => clearTimeout(timer);
    }, [notify]);

    return (
        <>
            {notify.loading && <Loading />}
            {notify.error &&
                <Toast
                    msg={{ msg: notify.error, title: "Error" }}
                    handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                    bgColor="bg-danger"
                />
            }

            {notify.success &&
                <Toast
                    msg={{ msg: notify.success, title: "Success" }}
                    handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                    bgColor="bg-success"
                />
            }
        </>
    )
}


export default Notify
