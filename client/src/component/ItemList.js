import React, { Component } from 'react';
import {
    Button,
    ListGroup,
    Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Table
} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { connect } from 'react-redux';
import { GetItems, AddItemList, GetItemsList, DeleteItem, EditItem } from '../store/Actions/action';

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            items: [],
            modalname: '',
            modalprice: '',
            MakerId: 0,
            listflag: false,
            individual_Item_List: ''
        }

        this.toggle = this.toggle.bind(this);
        this.modelname = this.modelname.bind(this);
        this.modalprice = this.modalprice.bind(this);
        this.toggle = this.toggle.bind(this);
        this.submit = this.submit.bind(this);
        this.props.isGetItemsList();

    }
    componentDidMount() {
        this.props.isGetItems();
        this.props.isGetItemsList();
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    modelname(ev) {
        this.setState({
            modalname: ev.target.value
        })
    }

    modalprice(ev) {
        this.setState({
            modalprice: ev.target.value
        })
    }
    submit() {
        console.log("submit",this.props.stateGetItems);

       let itemObj= this.props.stateGetItems.filter(a=>a._id==this.state.MakerId)
       console.log("ii",itemObj)
        let obj = {
            ItemName: this.state.modalname,
            ItemPrice: this.state.modalprice,
            ManufacturedId: this.state.MakerId
        }
        console.log("obj", obj);
        this.setState({
            modalname: '',
            modalprice: '',
            MakerId: 0
        },
            this.toggle())
        this.props.isAddItemList(obj)
       
    }

    edit(id, val) {
        console.log("val",val);
        // console.log()
        this.setState({
            modalname: val.ItemName,
            modalprice: val.ItemPrice,
            MakerId: val.ManufacturedId,
            individual_Item_List: val

        }, )
        this.toggle()
    }
    render() {
        let items = [];
        items = this.props.stateGetItems

        let list = [];
        list = this.props.stateGetItemslist


        console.log("items", items)
        console.log("list", list)

        return (
            <div>
                <AppNavbar />
                <Button
                    color="dark"
                    onClick={this.toggle.bind(this)} >Add Item</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add /Edit Item List</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Item Name </Label>
                                <Input type="text" name="modalname" id="name" value={this.state.modalname} onChange={this.modelname} />
                                <Label for="exampleEmail">Item Price</Label>
                                <Input type="text" name="modalprice" id="price" value={this.state.modalprice} onChange={this.modalprice} />

                            </FormGroup>

                            <FormGroup>
                                {items.length > 0 &&
                                    <div>
                                        <Label for="exampleSelect">Manufactured By</Label>
                                        <select defaultValue="1" onChange={(e) => this.setState({ MakerId: e.target.value })}>
                                            <option value={this.state.MakerId}>-- Select --</option>
                                            {items.map((val, ind) => {
                                                return (
                                                    <option key={ind} value={val._id} >{val.name}</option>
                                                )
                                            }
                                            )
                                            }
                                        </select>
                                    </div>
                                }
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submit}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <div className="container">
                    {list.length > 0 &&
                        <Table dark>
                            <thead>
                                <tr>
                                    <th>S No</th>
                                    <th>Item Name</th>
                                    <th>Price</th>
                                    <th>Manufactured By</th>
                                    <th>Actions</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((val, ind) => {
                                    return (
                                        <tr key={ind}>
                                            <th>{ind + 1}</th>
                                            <td>{val.ItemName}</td>
                                            <td>{val.ItemPrice}</td>
                                            <td>{val.Manufactured[0].name}</td>
                                            <td><button className="btn btn-outline-warning col-8" onClick={this.edit.bind(this, val._id, val)}>  Edit  </button></td>
                                            <td><button className="btn btn-outline-danger col-8">Delete</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log("Isget Item List ",state.root.list)
    return {
        stateGetItemslist: state.root.list,
        stateGetItems: state.root.items,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        isAddItemList: (obj) => {
            dispatch(AddItemList(obj))
        },
        isGetItems: () => {
            dispatch(GetItems())
        },
        isGetItemsList: () => {
            dispatch(GetItemsList())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);