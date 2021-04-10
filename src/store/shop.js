import axios from 'axios'
export default{
    state: {
        tableData: [],
        theshop:{},
      },
      mutations: {
        getdata(state){
        axios.get('/shop').then(res=>state.tableData=res.data)
        },
        addshop(state,form){
          // console.log(form.message)
          axios.post('/shop',form).then(res=> {
            console.log(res.data)
          })
        },
        delshop(state,id){
          // console.log(id)
          axios.delete(`/shop/${id}`).then(res=> {
            console.log(res.data)
          })
        },
        editshop(state,id){
          axios.get(`/shop/${id}`).then(res=> {
            state.theshop=res.data
            console.log(state.theshop)
          })
        },
        finishedit(state,val){
          // console.log(val)
          axios.patch(`/shop/${val.id}`,val).then(res=> {
            console.log(res.data)
            state.theshop={}
          })
        }
      },
      actions: {
      },
      modules: {
      }
}