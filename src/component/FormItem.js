import React, { Component} from 'react'
import { Form,InputNumber,Input,Alert  } from 'antd';


export default class FormItem extends Component {
    constructor(props){
        super(props);
        this.state ={ProductName:"",ProductAmount:1,ProductsPrice:1,formLayout: 'horizontal',focus:0}
    }
    handleNameInput =(event)=>{
        this.setState({ProductName:event.target.value});
    }
    handleFormLayoutChange = e => {
        this.setState({ formLayout: e.target.value });
    }
    
    handleInfo=(e)=>{
        if(e.target.value==="" && this.state.focus===1){
            if (document.getElementsByClassName(`alert-sign-${this.props.prodName}`)[0].classList.contains('hidden')===true)
            document.getElementsByClassName(`alert-sign-${this.props.prodName}`)[0].classList.remove('hidden');
        }else{
            if (document.getElementsByClassName(`alert-sign-${this.props.prodName}`)[0].classList.contains('hidden')===false)
            document.getElementsByClassName(`alert-sign-${this.props.prodName}`)[0].classList.add('hidden');
        }
        if (localStorage.getItem(this.props.prodName)) {
            localStorage.removeItem(this.props.prodName);
            localStorage.setItem(this.props.prodName,this.state.ProductName);
        }else{
            localStorage.setItem(this.props.prodName,this.state.ProductName);
        }
    }
    handleNumberInfo=()=>{
        
        if (localStorage.getItem(this.props.prodAmount)) {
            localStorage.removeItem(this.props.prodAmount);
            localStorage.setItem(this.props.prodAmount,this.state.ProductAmount);
        }else{
            localStorage.setItem(this.props.prodAmount,this.state.ProductAmount);
        }
        if (localStorage.getItem(this.props.prodPrice)) {
            localStorage.removeItem(this.props.prodPrice);
            localStorage.setItem(this.props.prodPrice,this.state.ProductsPrice);
        }else{
            localStorage.setItem(this.props.prodPrice,this.state.ProductsPrice);
        }
    }


    render() {
        const { formLayout } = this.state;
    const formItemLayout =
    formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        }
        : null;
        return (
            <div className="item-container">
                <Form.Item label="Product Name:" {...formItemLayout}>
                    <Input
                    onBlur={this.handleInfo}
                    onFocus={()=>{this.setState({focus:1})}}
                    name={this.props.prodName} 
                    placeholder="Product name" 
                    value={this.state.ProductName} 
                    onChange={this.handleNameInput}
                    />
                    <Alert message="Please fill the product name!" type="error" className={`alert-sign-${this.props.prodName} hidden`} />
                </Form.Item>
                <Form.Item label="Product Amount:" {...formItemLayout}>
                    <InputNumber 
                    name={this.props.prodAmount} 
                    min={1}  
                    defaultValue={1} 
                    onChange={value=>{
                        if (isNaN(value)===false)
                        {
                            this.setState({ProductAmount:value});
                            this.handleNumberInfo();
                        }
                    }}
                    onBlur={this.handleNumberInfo()}
                    />
                </Form.Item>
                <Form.Item label="Product Price:" {...formItemLayout}>
                    <InputNumber
                    name={this.props.prodPrice}
                    min={1}
                    defaultValue={1}
                    onChange={value=>{
                        if (isNaN(value)===false)
                        {
                            this.setState({ProductsPrice:value});
                            this.handleNumberInfo();
                        }
                    }}
                    onBlur={this.handleNumberInfo()}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </Form.Item>
            </div>
        )
    }
}
