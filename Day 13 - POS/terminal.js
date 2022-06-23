const productlist = document.querySelector('#productList');
const search = document.querySelector('#search');
const tbody = document.querySelector('#tbody');
var allproducts = JSON.parse(localStorage.getItem('products'))||[];
var currentInvoice =JSON.parse(localStorage.getItem('currentinvoice')) || [];

function printAllproducts(){
    productlist.innerHTML=''
    let _allproducts =allproducts.reverse()
        _allproducts.forEach(product=> {
            const newitem =createcard(product);
            productlist.innerHTML+=newitem;

            
        });
    }
    printAllproducts();
    printInvoice();

    function createInvoiceCard(product){
        return`<tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            
            <td>
                <input type="number"class="form-control w-100" value="${product.count}" onchange="updateInvoice('${product.id}',this.value)"></input>
            </td> 
            <td>${product.price*product.count}
            </td>
            <td>
            <button type="button"class="btn btn-danger" onclick="deleteInvoiceItem('${product.id}')">
            <i class="fas fa-trash"></i>
            </button>
            </td>
        </tr>`
    }


function createcard(product)
{
    return ` <div class="col-md-4">
    <div class="card">
        <img src="${product.photo}" class="card-img-top" alt="..."
            height="150">
        <div class="card-body">
            <h5 class="card-title">${product.name} </h5>
            <p class="card-text">Rs.${product.price}</p>
            <span class="text-small text-muted"> ${product.quantity} instock </span>
            <a href="#" class="btn btn-primary" onclick ="addtoInvoice('${product.id}')">Add to Invoice </a>
        </div>
    </div>
</div>`
}

function addtoInvoice(id)
{
    const product =allproducts.find(product => product.id===id);
    product.count =1;
    if(!currentInvoice.find(product =>product.id===id)){
        currentInvoice.push(product);
    }
        localStorage.setItem('currentInvoice',JSON.stringify(currentInvoice));
        printInvoice();
    }
    
    function printInvoice(){
        const Invoice=JSON.parse(localStorage.getItem('currentInvoice'))||[];
        tbody.innerHTML='';
        Invoice.forEach(product=>{
            const newitem=createInvoiceCard(product);
            tbody.innerHTML += newitem;
                
            })
        }
        function deleteInvoiceItem(id){
            currentInvoice= currentInvoice.filter(product => product.id !== id);
            localStorage.setItem('currentInvoice', JSON.stringify(currentInvoice));
            printInvoice();
        }
        function updateInvoice(id,count){
            if(count<0){
                count=0;
                alert('Quantity cannot be negataive');
            }
            currentInvoice.forEach(product => {
                
                if(product.id ==id){
                    if(count<=product.quantity){
                        product.count = count;
                    }else{
                        return alert('Not enough quantity');
                    }
                }

            })
            localStorage.setItem('currentInvoice', JSON.stringify(currentInvoice));
            printInvoice();
        }
        function clearInvoice(){
            currentInvoice =[];
            localStorage.setItem('currentInvoice',JSON.stringify(currentInvoice));
            printInvoice();
        }


    function payAndPrint(){
        const invoice =JSON.parse(localStorage.getItem('currentInvoice'))||[];
        if(invoice.length ==0){
            alert('No items in invoice');
            return;

        }
        const total = invoice.reduce((acc,product)=> {
            return acc + (product.price * product.count);

        }, 0);
        const receipt = `<h3 style="text-align:center;font-size:30px">Receipt</h3>
        <table class="table table-bordered" style="width: 100%; font-size: 25px; text-align: center;">
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            ${invoice.map(product => createReceiptCard(product)).join('')}
        </tbody>
        <tfoot>
            <tr style="padding: 10px;background: burlywood;font-size: 25px;" rowspan="3">
                <td colspan="3">Total</td>
                <td >${total}</td>
            </tr>
        </tfoot>
        </table>`;
        const printWindow =window.open('','','width=800, height=600');
        printWindow.document.write(receipt);
            printWindow.print();
            printWindow.document.close();
            clearInvoice();
    }
    function createReceiptCard(product){
        return `<tr>
            <td> ${product.name}</td>
            <td> ${product.price}</td>
            <td> ${product.count}</td>
            <td> ${product.price * product.count}</td>
        </tr>`

    }
    search.addEventListener('input',(e)=>{
        const searchValue =e.target.value;
        const filteredProducts = allproducts.filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase(0)));
        productlist.innerHTML='';
        filteredProducts.forEach(product=> {
            const newitem= createcard(product);
            productlist.innerHTML +=newitem;
        })
    })