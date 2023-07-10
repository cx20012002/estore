import React, {useState} from 'react';
import {useGetOrdersQuery} from "../../app/redux/services/OrderApi";
import LoadingComponent from "../../components/LoadingComponent";
import {currencyFormat} from "../../utils/scriptTools";
import OrderDetails from "./OrderDetails";

function Order() {
    const {data: orders, isLoading} = useGetOrdersQuery();
    const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

    if (isLoading) return <LoadingComponent/>;
    if (!orders) return <h1 className={"text-2xl font-bold"}>No orders</h1>;
    
    if (selectedOrderNumber > 0) return (
        <div className={"flex flex-col bg-white p-10 rounded shadow-lg"}>
            <OrderDetails
                order={orders.find(o => o.id === selectedOrderNumber)!}
            />
            <button className={"bg-primary text-white px-8 py-2 rounded mt-16 w-fit self-end"} onClick={()=>setSelectedOrderNumber(0)}>Back to Orders</button>
        </div>
       
    )   

    return (
        <div className={" w-full text-sm bg-white p-8 rounded shadow-lg overflow-x-auto"}>
            <table className="border-collapse w-full table-auto">
                <thead>
                <tr>
                    <th className="border-b font-medium p-6 text-left">Order Number</th>
                    <th className="border-b font-medium p-6 text-left">Total</th>
                    <th className="border-b font-medium p-6 text-left">Order Date</th>
                    <th className="border-b font-medium p-6 text-left">Order Status</th>
                    <th className="border-b font-medium p-6 text-left"></th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td className="border-b border-slate-100 p-6 text-neutral-500">#{order.id}</td>
                        <td className="border-b border-slate-100 p-6 text-neutral-500">{currencyFormat(order.total)}</td>
                        <td className="border-b border-slate-100 p-6 text-neutral-500">{order.orderDate}</td>
                        <td className="border-b border-slate-100 p-6 text-neutral-500">{order.orderStatus}</td>
                        <td className="border-b border-slate-100 p-6 text-neutral-500">
                            <button onClick={() => setSelectedOrderNumber(order.id)} className={"bg-primary px-8 py-1 text-white rounded"}>View</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Order;