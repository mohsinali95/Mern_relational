import React, { Component } from 'react';
import {
    Button,
    ListGroup,
    Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Table
} from 'reactstrap';
import AppNavbar from './AppNavbar';
import { connect } from 'react-redux';
import { GetItems, AddItemList, GetItemsList, Deletelist, EditList } from '../store/Actions/action';

class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            editModal: false,
            items: [],
            editId: null,
            editInd: null,   
            modalname: '',
            modalprice: '',
            MakerId: 0,
            listflag: false,
            individual_Item_List: ''
        }

        this.editToggle = this.editToggle.bind(this);
        this.modelname = this.modelname.bind(this);
        this.modalprice = this.modalprice.bind(this);
        this.toggle = this.toggle.bind(this);
        this.submit = this.submit.bind(this);

    }
    componentDidMount(){
        this.props.isGetItemsList(this.props.match.params.id)
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    editToggle() {
        this.setState({
            editModal: !this.state.editModal
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

        let obj = {
            ItemName: this.state.modalname,
            ItemPrice: this.state.modalprice,
            ManufacturedId: this.props.match.params.id
        }
        this.setState({
            modalname: '',
            modalprice: '',
        },
            this.toggle())
        this.props.isAddItemList(obj)
       
    }

    handleEdit(){
        let arr = this.props.stateGetItemslist
        arr[this.state.editInd].ItemName = this.state.modalname
        arr[this.state.editInd].ItemPrice = this.state.modalprice
        let obj = {
            _id: this.state.editId,
            ItemName: this.state.modalname,
            ItemPrice: this.state.modalprice,
            ManufacturedId: this.props.match.params.id,
            arr: arr
        }
        this.editToggle();
        this.setState({
            editId: null,
            modalname : '',
            modalprice : ''
        })
        this.props.isEditList(obj._id,obj)
    }
    
    edit(ind,id, val) {
        this.setState({
            editId: id,
            editInd: ind,
            modalname : val.ItemName,
            modalprice : val.ItemPrice
        })
        this.editToggle()
    }
    Deletelist(id){
        this.props.isDeletelist(id)
    }
    render() {
        let list = [];
        list = this.props.stateGetItemslist
        return (
            <div>
                <AppNavbar pagename={this.props.match.params.itemName} />
                <Button
                    color="dark"
                    onClick={this.toggle.bind(this)} >Add Item</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Add Item List</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Item Name </Label>
                                <Input type="text" name="modalname" id="name" value={this.state.modalname} onChange={this.modelname} />
                                <Label for="exampleEmail">Item Price</Label>
                                <Input type="text" name="modalprice" id="price" value={this.state.modalprice} onChange={this.modalprice} />

                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submit}>Add</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.editModal} toggle={this.editToggle} className={this.props.className}>
                    <ModalHeader toggle={this.editToggle}>Edit Item List</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleEmail">Item Name </Label>
                                <Input type="text" name="modalname" id="name" value={this.state.modalname} onChange={this.modelname} />
                                <Label for="exampleEmail">Item Price</Label>
                                <Input type="text" name="modalprice" id="price" value={this.state.modalprice} onChange={this.modalprice} />

                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleEdit.bind(this)}>Edit</Button>
                        <Button color="secondary" onClick={this.editToggle}>Cancel</Button>
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
                                            <td><button className="btn btn-outline-warning col-8" onClick={this.edit.bind(this,ind, val._id, val)}>  Edit  </button></td>
                                            <td><button className="btn btn-outline-danger col-8" onClick={this.Deletelist.bind(this,val._id)} >Delete</button></td>
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
        isEditList: (id,obj) => {
            dispatch(EditList(id,obj))
        },
        isGetItemsList: (id) => {
            dispatch(GetItemsList(id))
        },
        isDeletelist: (id) => {
            dispatch(Deletelist(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemList);