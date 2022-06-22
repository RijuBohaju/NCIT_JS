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
    function createInvoiceCard(product){
        return`<tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>
                <input type="number"class="form-control w-100" value="${product.count}"></input>
            </td> 
            <td>${product.price*product.count}
            </td>
            <td>
            <button type="button"class="btn btn-danger">
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
    