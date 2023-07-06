

export const addProduct=()=>{
      
}
export const removeProduct=(productid, price)=>{
       var order = JSON.parse(localStorage.getItem('orders'));
        var sum = JSON.parse(localStorage.getItem('sum'));
        if (sum == null) sum = 0;
        sum = sum - parseFloat(price)
        localStorage.setItem("sum", JSON.stringify(sum));
        if (order == null) { order = [] }
        var neworder = [];
        order.map((item) => {
            if (item != productid) {
                neworder.push(item)
            }
        })
     localStorage.setItem("orders", JSON.stringify(neworder));
}