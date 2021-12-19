
// Variables
let StickerSection = document.querySelectorAll('.product_offer_section')
let StickerPersent = document.querySelectorAll('.product_offer')
let StickerAge = document.querySelectorAll('.product_sub')
let ProductDOM = document.querySelector('.product_container')
let ForwardPage = document.querySelector('.fordward')
let BackPage = document.querySelector('.backward')
let PageNo = document.querySelectorAll('.page_no')
let CurrentShortig = document.querySelector('.current-shorting');
let ShortingBy = document.querySelectorAll('.shorting_by');
let SearchBar = document.querySelector('.psearch')
let searchForm = document.querySelector('#searchForm')














let AllProducts = []


class Products {
    async getProducts() {
        try {

            let result = await fetch('./products.json')
            let data = await result.json()
            // console.log(data.items.categories);
            const Categories = data.items.categories
            const Electronics = Categories.electronics
            const Fashion = Categories.fashion
            const homebody = Categories.homebody
            const Devices = Electronics.devices
            const Gadgets = Electronics.gadgets
            const Accessoires = Fashion.accessoires
            const Shoes = Fashion.shoes
            const Clothes = Fashion.clothes
            const BodyCare = homebody.bodycare
            const Classics = homebody.classics
            const HomeLiving = homebody.homeliving

            let Allproducts = [...Clothes, ...Accessoires, ...Shoes, ...Devices, ...BodyCare, ...Gadgets, ...Classics, ...HomeLiving];
            // console.log(Allproducts);
            return Allproducts
        }
        catch {
            console.log(error);
        }


    }

}

class UI {
    displayProducts(products) {
        const  productCount = products

        let result = ``;
        let Img1;
        let Img2;
        let Display;
        let Dage;
        let Doffer;
        let Doff;
        let pagenumber;

        let pagenumberlimit;

        // Page Fillter
        if (Storage.getPage() == false) {
            pagenumber = 0;
            pagenumberlimit = 12;
        }
        else {
            pagenumber = Storage.getPage()[0]
            pagenumberlimit = Storage.getPage()[1]
        }



        for (pagenumber; pagenumber <  pagenumberlimit ; pagenumber++) {
            let product = products[pagenumber]
            if(product === undefined){
                console.log("breaked");
                result = `<h1>Breaked</h1>`  
                break;                
            }else{
                
                
                
                // image fillter
                if (product.productImage.length == 2) {
                    Img1 = product.productImage[0].url
                    Img2 = product.productImage[1].url
                }
                else {
                    Img1 = product.productImage[0].url
                    Img2 = product.productImage[0].url
                }
                // price fillter
                if (product.price.offerPrice == undefined) {
                    product.price.offerPrice = ""
                }
                else {
                    product.price.offerPrice += " - "
                }
                
                
                // sticker fillter
                if (product.sticker == undefined) {
                    
                    
                    Display = 'hidden';
                    Dage = 'hidden'
                    Doffer = ''
                    Doff = 'hidden'
                }
                else {
                    Display = 'show';
                    if (product.sticker.offerPercentage == undefined || product.sticker.offerPercentage == "") {
                        Doff = 'hidden'
                    }
                    else {
                        Doffer = product.sticker.offerPercentage;
                        Doff = 'show'
                    }
                    if (product.sticker.age == 'old' || product.sticker.age == undefined) {
                        Dage = 'hidden'
                    }
                    else {
                        Dage = 'show'
                    }
                    
                }
                
                
                // console.log(product.productImage[1].url);
                
                result += `   <div class="product_card">
                <div class="product_offer_section ${Display}">
                <span class="product_offer offer  ${Doff} ">${Doffer}%</span>
                <span class="product_sub sub_offer ${Dage}">NEW</span>               
                <span class="heart"><i class="ri-heart-line wishlist-icon"></i> </span>
                </div>
                <div class="product_offer_section">
                
                <span class="heart"><i class="ri-heart-line wishlist-icon"></i> </span>
                </div>
                <div class="product_card-images">
                <img src="${Img1}.jpg" alt="" class="product_card-img">
                <img src="${Img2}.jpg" alt="" class="product_card-img product_card-img2">
                </div>
                <div class="product_card-data">
                <div class="sale_rating">
                <i class="ri-star-fill sale_rating-icon"></i>
                <i class="ri-star-fill sale_rating-icon"></i>
                <i class="ri-star-fill sale_rating-icon"></i>
                <i class="ri-star-fill sale_rating-icon"></i>
                <i class="ri-star-half-line sale_rating-icon"></i>
                </div>
                <h3 class="categories_product-card">${product.categorie},${product.subCategorie}</h3>
                <h2 class="product-card_title">${product.productName}</h2>
                <span class="product-card_price">${product.price.offerPrice} $${product.price.sellPrice} </span>
                <a href="#" class="card_btn">
                <i class="ri-list-check"></i>
                Select option
                </a>
                </div>
                </div>            
                `
                
                this.DisplayinDom(result)
            };
            
        }
        // make page number Display According to product length

        this.PageDisplaySetter(productCount.length)
    }

    DisplayinDom(product){
        ProductDOM.innerHTML = product

        }
        
        Events(products) {
            // ========== Event Listners ====================
            
        // // ======== card ========
        let wishlistIcon = document.querySelectorAll('.wishlist-icon')

        wishlistIcon.forEach(icon => {


            icon.addEventListener('click', (e) => {

                if (icon.classList.contains('wishlist-icon-clicked')) {
                    icon.classList.remove('wishlist-icon-clicked');
                }
                else {
                    icon.classList.add('wishlist-icon-clicked');
                }

            })
        })
        // // ======== card ========

        // ========= page =============================

        let pagenumber;
        PageNo.forEach(page => {
            page.addEventListener('click', (e) => {
                this.PageSetter(e.target.innerHTML)
            })
        })



        //  activepage====
        let activePage;
        if (Storage.getPage()[2] == undefined) {
            activePage = 1
        }
        else {
            activePage = Storage.getPage()[2];
        }
        let pagenumberArray = [...PageNo]
        let PageActive = pagenumberArray.find(page => page.innerHTML == activePage)
        PageActive.classList.add('page-clicked')
        //  activepage====
        // backwardpage ===
        if (PageActive.innerHTML == 1) {
            BackPage.classList.add('hidden')
        }
        else {
            BackPage.classList.remove('hidden')
            BackPage.addEventListener('click', () => {
                this.PageSetter(PageActive.innerHTML - 1);
            })
        }
        // backwardpage ===
        if (PageActive.innerHTML == 7) {
            ForwardPage.classList.add('hidden')
        }
        else {
            ForwardPage.classList.remove('hidden')
            ForwardPage.addEventListener('click', () => {

                this.PageSetter(++PageActive.innerHTML);
            })
        }

        // backwardpage ===
        
        // Shorting ==========
        let setShort = Storage.getShorting();


        if (setShort == null) {
            CurrentShortig.innerHTML = "Default Shorting";
        }
        else {
            CurrentShortig.innerHTML = setShort;
            let ShortedProducts = this.getProductsbyShort(setShort);
            this.displayProducts(ShortedProducts);
        }




        ShortingBy.forEach(short => {
            short.addEventListener('click', (e) => {
                console.log(e.target);
                console.log("clicked");
                let shortBy = e.target.innerHTML;
                CurrentShortig.innerHTML = shortBy;
                Storage.setPage(0,1);
                Storage.setShorting(shortBy);
                window.location.reload();

            })
        })
        // Shorting ==========
        // form =============
        searchForm.addEventListener('submit', (e) => {

            Storage.setFillter(psearch.value);
            Storage.setPage(0,1);
            sessionStorage.removeItem("shortBy")

        })
        // form =============
    }

     getProductsbyShort(shortBy) {
         let fillterProducts = JSON.parse(sessionStorage.getItem('fillterProducts')) 
        let products; 
        if(fillterProducts !== undefined){
            products = fillterProducts;
        }else{
            products = JSON.parse(sessionStorage.getItem('products'));
        }

        if (shortBy == "shorting by latest ") {

            let latest = products.filter(product => product.sticker.age == 'new');

            let remaing = products.filter(product => product.sticker.age !== 'new');
            let FinalProducts = [...latest, ...remaing]
            return FinalProducts
        }
        else if (shortBy == "shorting by popularty ") {
            let latest = products.filter(product => product.sticker.age == 'new');

            let remaing = products.filter(product => product.sticker.age !== 'new');
            let FinalProducts = [...latest, ...remaing]
            return FinalProducts
        }

        else if (shortBy == "shorting by low to high ") {
            let productss = [];
            productss = products.sort((a, b) => {
                return a.price.sellPrice - b.price.sellPrice
            })
            return productss
        }

        else if (shortBy == "shorting by hight to low ") {
            let productss = [];
            productss = products.sort((a, b) => {
                return b.price.sellPrice - a.price.sellPrice
            })
            return productss
        }
        else {
            return products
        }
    }

    PageDisplaySetter(length){
        let pageStart = undefined;
        if (length <= 12) {
            pageStart = 0
            ForwardPage.style.display = "none";

        }
        else if (length <= 24) {
            pageStart = 2;
        }
        else if (length <= 36) {
            pageStart = 3;

        }
        else if (length <= 48) {
            pageStart = 4;

        }
        else if (length <= 60) {
            pagenumber = 5;
        }
      

        for (let index = pageStart; index < PageNo.length; index++) {
            PageNo[index].classList.add('hidden');
        }
        
        
       
    }

    PageSetter(element) {
        let pagenumber;
        if (element == 1) {
            pagenumber = 0;
        }
        else if (element == 2) {
            pagenumber = 12;
        }
        else if (element == 3) {
            pagenumber = 24;
        }
        else if (element == 4) {
            pagenumber = 36;
        }
        else if (element == 5) {
            pagenumber = 48;
        }
        else if (element == 6) {
            pagenumber = 60;
        }
        else if (element == 7) {
            pagenumber = 66;
        }
        Storage.setPage(pagenumber, element);
        window.location.reload();
    }

    Fillter(fillterName) {

        fillterName = fillterName.toLowerCase();
        let products = JSON.parse(sessionStorage.getItem('products'));
        const fillterProduct = products.filter((product) => {
            if (product.categorie.toLowerCase().includes(fillterName) ||
                product.subCategorie.toLowerCase().includes(fillterName) ||
                product.productName.toLowerCase().includes(fillterName) ||
                product.brand.toLowerCase().includes(fillterName)  ||
                this.color(product,fillterName)
                // product.color.toLowerCase().includes(fillterName) 

            ) {
                return product
            }

            
            
        })
        if(fillterProduct.length == 0){

            let noItem = `<h1>No Item avalible </h1>`
            this.DisplayinDom(noItem);
        }
        Storage.setFillterProducts(fillterProduct)
        this.displayProducts(fillterProduct)

    }

    color(product,colorName){
    let result = false; 
         product.colors.forEach(color =>{
                if (color.color.toLowerCase().includes(colorName) || color.color.toLowerCase().includes(colorName)) {
                    
                   
                    result = true;
                   
                    
                }
        })
        
        return result
        
        
    }


    // ========= page =============================

}

class Storage {

    static saveProducts(products) {
        sessionStorage.setItem('products', JSON.stringify(products))
    }

  
    static setPage(number, pageCount) {
        sessionStorage.setItem('pagenumber', JSON.stringify(number))
        let pagenumberlimit = number + 12;
        sessionStorage.setItem('pagelimit', JSON.stringify(pagenumberlimit))
        sessionStorage.setItem('pageCount', pageCount)
    }
    static getPage() {
        let number = JSON.parse(sessionStorage.getItem('pagenumber'))
        let pagelimit = JSON.parse(sessionStorage.getItem('pagelimit'))
        let pageCount = JSON.parse(sessionStorage.getItem('pageCount'))
        if (number != null) {
            return [number, pagelimit, pageCount]
        }
        else {
            return false
        }
    }
    static setShorting(shorting) {
        sessionStorage.setItem('shortBy', JSON.stringify(shorting))
    }
    static getShorting() {
        let shortBy = JSON.parse(sessionStorage.getItem('shortBy'));
        return shortBy;
    }
    static setFillter(fillter) {
        sessionStorage.setItem('fillter', JSON.stringify(fillter))
    }
    static getFillter() {
        let fillter = JSON.parse(sessionStorage.getItem('fillter'))
        return fillter;
    }
    static setFillterProducts (fillterProducts) {
        sessionStorage.setItem('fillterProducts', JSON.stringify(fillterProducts))
    }

}
























document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    const products = new Products
    const ui = new UI
    
    products.getProducts().then(products => {
        if (Storage.getFillter() !== null) {
            let fillter = Storage.getFillter();
            ui.Fillter(fillter)
        }else{
            ui.displayProducts(products)
            Storage.saveProducts(products)

        }


        // make a saprate method for card event listners

    }
    ).then(() => {
        ui.Events(products);

    })



})













