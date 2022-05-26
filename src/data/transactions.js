export const getAllTransaction = () => {
    fetch("http://localhost:5000/api/transactions").then(res => {
        console.log(res.data)
    }).catch(err => {
        console.log(err.message)
    })
}