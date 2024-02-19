
const Counter = (items) => {
    const calcItems = (items && items.length >0) ? items.reduce((x,items)=>x + parseInt(items.counter ? items.counter : 1),0) : 0
    return calcItems
}

export default Counter

