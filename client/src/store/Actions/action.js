
import axios from 'axios';
export function GetItems() {
    return dispatch => {
        dispatch(SetItemLoading())
        axios.get('/api/items')
        .then(res =>
        dispatch({
        type : "GET_ITEMS",
        payload:res.data
        })
    );
}}

export function GetItemsList() {
    return dispatch => {
        dispatch(SetItemLoading())
        axios.get('/api/list')
        .then(res =>{
            console.log("res",res)
         dispatch({
        type : "GET_ITEMS_LIST",
        payload:res.data
        })
    }
    );
}}


export function AddItem(obj) {
    return dispatch=> {
      axios.post('/api/items',obj)
        .then(res => 
        dispatch({
            type: "ADD_ITEM",
            payload:res.data
        }))
}}

export function AddItemList(obj) {
    return dispatch=> {
      axios.post('/api/list',obj)
        .then(res => 
        dispatch({
            type: "ADD_ITEM_LIST",
            payload:res.data
        }))
}}

export function EditItem(id,obj) {
    console.log("id",id)
    console.log("obj",obj)
    return dispatch=> {
        // axios.delete(`/api/items/${id}`)
        console.log("id",id);
        axios.put('/api/items/'+id,obj)
        .then(res=>
            console.log("response",res)
        // dispatch({
        //     type: "EDIT_ITEM",
        //     payload:id
        // })
    )
}
}


export function DeleteItem(id) {
    return dispatch=> {
        // axios.delete(`/api/items/${id}`)
        axios.delete('/api/items/'+id)
        .then(res=>
        dispatch({
            type: "DELETE_ITEM",
            payload:id
        }))
}
}
export function SetItemLoading() {
    return {
        type: "ITEMS_LOADING",
    }
}
