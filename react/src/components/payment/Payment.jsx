import { Row, Col } from "react-bootstrap";
import { CardHeader, CardLayout } from "../cards";
import './Payment.scss'
import { Box, Button, Heading, Image, Input, Item, List, Section, Text } from "../elements";
import { useContext, useEffect, useState } from "react";
import { OrderDetailItem } from "../order/OrderDetailItem";
import axios from 'axios'
import { LabelField } from "../fields";
import { AuthContext } from "../../context/AuthContext";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const Payment = () => {
    const {userInfo} = useContext(AuthContext);
    const [cartList, setCartList] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [invoiceTotal, setInvoiceTotal] = useState(0);
    const totalPrice = () => {
    }
    const [infoOrder, setInfoOrder] = useState({
        address : ''
    });
    const [infoOrderError, setInfoOrderError] = useState([]);
    const getCarts = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/getCartByUser/',
            withCredentials: true,
        })
            .then((res) => {
                let data = res.data
                data.forEach(item => {
                    let imageJSON = JSON.parse(item.product.image);
                    item.product.image = imageJSON;
                });
                setCartList(data)
            })
            .catch(err => {
            })
    }
    const getPaymentMethods = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/paymentMethods/',
            withCredentials: true,
        })
            .then((res) => {
                setPaymentMethods(res.data);
                setInfoOrder({...infoOrder, payment_method_id : res.data[0]?.id})

            })
            .catch(err => {

            })
    }
    useEffect(() => {
        getCarts();
        getPaymentMethods();
    },[]);
    useEffect(() => {
        let total = calcInvoiceTotal();
        setInvoiceTotal(total);
    })
    const calcInvoiceTotal = () =>{
        let total = cartList?.reduce((total , item) => {
            const itemPrice = Number(item.product.price) * Number(item.quantity);
            return total + itemPrice;
        }, 0)
        return total;
    }
    const handleOrder = () =>{
        let data = {...infoOrder, total_price : invoiceTotal, user_id : userInfo?.id};
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/invoices/',
            data : data,
            withCredentials: true,
        })
        .then( (res) => {
         toast.success('Tạo đơn hàng thành công');
        })
        .catch((err) => {
            toast.error('Tạo đơn hàng thất bại');
            setInfoOrderError(err.response.data.errors);

        })
    }
    console.log('hoá đơn' , infoOrder);
    console.log(infoOrderError);
    return <div className="mc-payment">
        <Row>
            <Col xl={6}>
                <CardLayout>
                    <CardHeader title="Thông tin giao hàng" fontTitle={3}/>
                    <Row className="d-flex align-items-center">
                        <Col xl={8} md={8} xs={6}>
                        <LabelField
                                        type = { "text" }
                                        placeholder = { "Nhập địa chỉ giao hàng" }
                                        labelDir = "label-col"
                                        fieldSize = "w-100 h-md"
                                        name="address"
                                        value={infoOrder?.address}
                                        onChange = {(e) => setInfoOrder({...infoOrder, address : e.target.value})}
                                    />
                        {infoOrderError?.address && <Text className={"text-danger"}>{infoOrderError?.address[0]}</Text>}
                        </Col>
                        <Col xl={4} md={4} xs={2}>
                            <Button className={"mc-btn primary m-2"} icon={"home"} text="Lấy địa chỉ" onClick={() => {
                                setInfoOrder({...infoOrder, address: userInfo?.address})
                            }}/>
                        </Col>
                    </Row>

                </CardLayout>
                <div className="mt-3"></div>
                <CardLayout>
                    <CardHeader title="Hình thức thanh toán" fontTitle={3}/>
                    {paymentMethods?.map((item, index) => {
                    return    <Row key={index} className="mt-2">
                        <div className={`payment-method-item ${infoOrder?.payment_method_id === item?.id ? 'active' : ''}`} onClick={() => setInfoOrder({...infoOrder, payment_method_id : item?.id})}>
                            <div className="payment-method-radio">
                                <div className="checkbox"></div>
                            </div>
                            <div className="payment-method-logo">
                                <img src={`http://localhost:3000/${item?.logo}`} />
                            </div>
                            <div className="payment-method-name">
                               {item?.name}
                            </div>
                        </div>
                    </Row>
                    
                    })}
                                        <Row className="mt-3">
                        <Button className={"mc-btn red fs-4 p-4 btn-payment-invoice"} icon={"paid"} text={`Thanh toán ${invoiceTotal}K`} onClick={() => {
                            handleOrder();
                        }}/>
                    </Row>
                </CardLayout>
            </Col>
            <Col xl={6}>
                <CardLayout>
                    <CardHeader title="Chi tiết đơn hàng" fontTitle={3}/>
                    {cartList?.map((item, index) => {
                        return <div className="border-bottom mt-4">
                            <OrderDetailItem data={item} setCartList={setCartList}></OrderDetailItem>
                        </div>
                    })}
                    <Row className="mt-3">
                        <Box className="d-flex justify-content-between total-invoice">
                            <p className="fw-bold">Tổng cộng</p>
                            <p className="total-price">{invoiceTotal?.toLocaleString("vi-VN")}</p>
                        </Box>
                    </Row>
                </CardLayout>
            </Col>
        </Row>
    </div>
}