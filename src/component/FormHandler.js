import React, { Component } from 'react';
import PaypalAPI from '../API/PaypalAPI';
import { Form, Button,Icon } from 'antd';
import ProItem from './FormItem';

class FormHandler extends Component {
    constructor(prop){
        super(prop);
        this.PaypalAPI = new PaypalAPI();
        this.state = {stackItem:1,ProductName:'',ProductAmount:1,ProductsPrice:1,stack:[],formLayout: 'horizontal',PayBlock:false,addFlag:false}
    }
    checkList=(list)=>{
        list.forEach(item => {
            if (item.ProductName==="") {
                
                this.setState({PayBlock:true});
                return false;
            }
        this.setState({PayBlock:false});
        return true;
        });
    }
    handleForm = async (event) =>{
        event.preventDefault();
        const list =this.handleProdList();
        this.checkList(list);
        if (this.state.PayBlock===true) {
            return false;
        } 
        let data = await this.PaypalAPI.postPayment(list);
        window.open(data.href,"_blank");
    }
    addItem=()=>{
        this.setState({stackItem:this.state.stackItem+1,addFlag:true});
    }
    removeItem = () =>{
        if (this.state.stackItem>1) {
            if (localStorage.getItem(`ProductAmount${this.state.stackItem}`)) {
                localStorage.removeItem(`ProductName${this.state.stackItem}`);
                localStorage.removeItem(`ProductAmount${this.state.stackItem}`);
                localStorage.removeItem(`ProductsPrice${this.state.stackItem}`);
            }
            this.state.stack.pop();
            this.setState({stack:this.state.stack,stackItem:this.state.stackItem-1});
        
        }
    }
    handleProdList=()=>{
        const ProdList = [];
        ProdList.push({
            ProductName:localStorage.getItem('ProductName0'),
            sku: "item",
            ProductAmount:localStorage.getItem('ProductAmount0'),
            currency:"USD",
            ProductsPrice:localStorage.getItem('ProductsPrice0')
        });
        for (let index = 2; index <= this.state.stackItem; index++) {
            ProdList.push({
                ProductName:localStorage.getItem(`ProductName${index}`),
                sku: "item",
                ProductAmount:localStorage.getItem(`ProductAmount${index}`),
                currency:"USD",
                ProductsPrice:localStorage.getItem(`ProductsPrice${index}`)
            });
        }
        return ProdList;
    }
    componentDidUpdate(){
        if (this.state.addFlag===true) {
            const temp = <ProItem
        key={this.state.stackItem}
        prodName={`ProductName${this.state.stackItem}`}
        prodAmount={`ProductAmount${this.state.stackItem}`}
        prodPrice={`ProductsPrice${this.state.stackItem}`}
        />
        this.state.stack.push(temp);
        this.setState({addFlag:false});
        }
        
    } 
    render() {
        const { formLayout } = this.state;
        const productList = this.state.stack.map(item=>item);
        return (
            <div className="container">
                <Form layout={formLayout} className="form-paypal" onSubmit={this.handleForm}>
                    <ProItem
                        key={0}
                        prodName={`ProductName0`}
                        prodAmount={`ProductAmount0`}
                        prodPrice={`ProductsPrice0`}
                        />
                    {/* {this.state.stack.map(item=>item)} */}
                    {productList}
                    <br/>
                    <Button type="primary" htmlType="submit" value="submit">
                        Pay
                    </Button>
                    <Button className="btn-add" onClick={this.addItem}><Icon type="plus-square" theme="twoTone" /></Button>
                    <Button className="btn-remove" onClick={this.removeItem}><Icon type="minus-square" theme="twoTone"/></Button>
                </Form>
            </div>
        )
    }
}
const WrappedForm = Form.create({ name: 'dynamic_form_item' })(FormHandler);

export default WrappedForm;