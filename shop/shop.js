// SLIDER BAR SHOP PAGE

class Slide{

    constructor (rangeElement,valueElement,options){
      this.rangeElement = rangeElement
      this.valueElement = valueElement
      this.options = options
    
      //Attach a listener to "change event"
      this.rangeElement.addEventListener('input',this.updateSlider.bind(this))
    }
    
    init(){
      this.rangeElement.setAttribute('min',options.min)
      this.rangeElement.setAttribute('max',options.max)
      this.rangeElement.value = options.cur
      this.updateSlider()
    }
    
    // Format money
    asMoney(value){
      return '$' + parseFloat(value).toLocaleString('en-US',{ maximumFractionDigits: 2 })
    }
    
    generateBackground(rangeElement){
    
      if (this.rangeElement.value === this.options.min ){
        return
      }
      let percentage = (this.rangeElement.value - this.options.min) / (this.options.max - this.options.min) * 100
    
      return 'background: linear-gradient(to right, #d6caa8, #d6caa8 ' + percentage + '%, #d6caa8 ' + percentage + '%, #dee1e2 100%)'
    
    }
    
    updateSlider(newValue){
      this.valueElement.innerHTML = this.asMoney(this.rangeElement.value)
      this.rangeElement.style = this.generateBackground(this.rangeElement.value)
    }
    
    
    }
    
    
    
    let rangeElement = document.querySelector('.range [type="range"]')
    let valueElement = document.querySelector('.range .range_value span')
    
    let options = {
      min:30,
      max:2000,
      cur:1000
    }
    
    if (rangeElement){
      let slider = new Slide(rangeElement,valueElement,options)
      slider.init()
    }
    
    // ============== 


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
let activeFillters = document.querySelector('.active-fillters')
let clearFillterBtn = document.querySelector('.clear-fillter')
let activeFillterBtn = document.querySelector('.actived-fill')
let activeFillicon = document.querySelector('.active-fillter-icon')
let itemsAvaliable = document.querySelectorAll('.item_count');
let ProductCategories = document.querySelectorAll('.categories_item');
let PagesSection = document.querySelector('.page_section');
let PagePoster = document.querySelector('.poster');
let Colors =document.querySelectorAll('.color_item');
let Sizes = document.querySelectorAll('.size');
let DomInBrands = document.querySelector('.brands-fill_section .categories_list');
let Brands;












let AllProducts = []


class Products {
    async getProducts() {
        try {

            let result = await fetch('./products.json')
            let data = await result.json()
            // //console.log(data.items.categories);
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
            // let quanitiyProducts = []

            let ProductsCount = {
                all: [

                    {
                        Fashion: {
                            accessoires: Accessoires.length,
                            clothes: Clothes.length,
                            shoes: Shoes.length
                        }
                    },
                    {
                        electronics: {
                            devices: Devices.length,
                            gadgets: Gadgets.length,
                        }
                    },
                    {
                        homebody: {
                            bodycare: BodyCare.length,
                            classics: Classics.length,
                            homeliving: HomeLiving.length,
                        }
                    }
                ]
            }
            // //console.log(Allproducts);
            return { Allproducts, ProductsCount }
        }
        catch {
            //console.log(error);
        }


    }

}

class UI {
    displayProducts(products) {

        if(products.length == 0){
            let noItem = `<h1>No Item avalible </h1>`
            this.DisplayinDom(noItem);
            PagesSection.style.display = "none"
        }

        const productCount = products
        let result = ``;
        let Img1;
        let Img2;
        let Display;
        let Dage;
        let Doffer;
        let Doff;
        let pagenumber;
        let brands=[];
        let innerBrand = "";


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
      
        
        for (pagenumber; pagenumber < pagenumberlimit; pagenumber++) {
            let product = products[pagenumber]
            if (product === undefined) {
                //console.log("breaked");
                result = `<h1>Breaked</h1>`
                break;
            } else {

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


                // //console.log(product.productImage[1].url);

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
        // DomInBrands.innerHTML = brands

        // set brand in dom only when there is no brand set
        if(Storage.getBrand() == null){
            
            products.forEach(product =>{
                brands.push(product.brand)
            })
            console.log(brands);

            //make the item uniq and count the occurance  from stackoverflow
        const map = brands.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());

            let uniq = [...map.keys()]
            let elements = [...map.values()]
            uniq.forEach((ele,index) =>{
                innerBrand +=  ` <li class="categories_item main_categorie">
                <a href="#" class="brand_link">${ele}</a>
                <span class="item_count">${elements[index]}</span>
                </li>   `
            })
            DomInBrands.innerHTML = innerBrand;
            //console.log(DomInBrands);
            Storage.setCurrentBrand(innerBrand)
        }
        else{
            let zyx = Storage.getCurrentBrand()
            if(DomInBrands.firstElementChild == null){
                zyx.forEach(xy =>{
                    DomInBrands.appendChild(xy)  
                })
            }
        }
        
        // make page number Display According to product length

        this.PageDisplaySetter(productCount.length)
    }

    displayFillter(PdCount) {

        PdCount = PdCount.all

        for (let i = 0; i < PdCount.length; i++) {
            // categorie name 
            let [key, value] = Object.entries(PdCount[i])[0]

            // categorie
            let Element = Object.values(PdCount[i]).reduce((a, b) => a + b)

            // categorie length
            let EleLength = Object.keys(Element).length

            //total number of items present in cateogries 
            let Totalofcategorie = Object.values(Element).reduce((a, b) => a + b)

            // loop for each item of that cateogries
            for (let index = 0; index < EleLength; index++) {

                // key and value of each item
                let [kkey, vvale] = Object.entries(Element)[index]


                // loop all the itemCount and match the item 
                itemsAvaliable.forEach(item => {
                    let parentElement = item.parentNode.firstElementChild;

                    if (parentElement.innerHTML == kkey) {
                        item.innerHTML = vvale
                    }
                })
            }


            // loop all the count and match the categorie
            itemsAvaliable.forEach(item => {

                let parentElement = item.parentNode.firstElementChild;
                if (parentElement.innerHTML == key) {
                    item.innerHTML = Totalofcategorie
                }
            })

        }







    }
    DisplayinDom(product) {

        ProductDOM.innerHTML = product

    }
    AfterVariables(){
        Brands = document.querySelectorAll('.brands-fill_section .categories_item');
        //console.log(Brands);
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
                //console.log(e.target);
                //console.log("clicked");
                let shortBy = e.target.innerHTML;
                CurrentShortig.innerHTML = shortBy;
                Storage.setPage(0, 1);
                Storage.setShorting(shortBy);
                window.location.reload();

            })
        })
        // Shorting ==========
        // form =============
        searchForm.addEventListener('submit', (e) => {
            this.EventListnerFillter(psearch.value)
        })
        // form =============

        // Product Categories

        ProductCategories.forEach(product => {
            product.addEventListener('click', () => {
                // make the element to string for storing into session storage
                let x = new XMLSerializer().serializeToString(product);

              //console.log(x);
                this.EventListnerFillter(x)
            })
        })


        // Product Categories
    
        // price ======
        let getPrice = Storage.getPrice();


        if (getPrice !== null) {
            valueElement.innerHTML = `$${getPrice}`;
            let getProducts = this.getProductsbyFillter(getPrice);
            this.displayProducts(getProducts);
        }
        rangeElement.addEventListener('change',()=>{
            //console.log(valueElement.innerHTML);
            let input = valueElement.innerHTML;
            let y = input.replace(/[$,]/g,'')
            //console.log("hello");
            Storage.setPrice(y)  
            window.location.reload()
        })
        // price ======

        // Color ==========  
        let getColor = Storage.getColor();
        if (getColor !== null) {
            let getProducts = this.getProductsbyFillter(getColor);
            Colors.forEach(color =>{
                    let selectColor = color.firstElementChild.nextElementSibling.innerHTML ; 
                    if(selectColor == getColor){
                        color.lastElementChild.classList.add('item_count-active')
                        color.firstElementChild.nextElementSibling.classList.add('categories_item-active')
                        //console.log(color);
                    }               
    
            })
    
            this.displayProducts(getProducts);
        }
        Colors.forEach(color =>{
            color.addEventListener('click',()=>{
                if(color.lastElementChild.classList.contains('item_count-active')){
                    Storage.removeSubFillter('color')
                }else{
                    let selectColor = color.firstElementChild.nextElementSibling.innerHTML ; 
                    Storage.setColor(selectColor)  
                    //console.log(selectColor);
                }
                 window.location.reload()

            })
        })
        // Color ==========
        // Size ==========
        let Sizee = Storage.getSize();
        if ( Sizee !== null) {
            let getProducts = this.getProductsbyFillter(Sizee);
           Sizes.forEach(size  =>{
               if( size.innerHTML == Sizee){
                size.classList.add('size-active')
               }

            })
    
            this.displayProducts(getProducts);
        }
        Sizes.forEach(size =>{
         size.addEventListener('click',()=>{
size.classList.contains('size-active')?Storage.removeSubFillter('size'):Storage.setSize(size.innerHTML)
                
                window.location.reload()
                
            })
        })
        // Size ==========
        // Brands ==========
        let Brandd = Storage.getBrand();
        if ( Brandd !== null) {
            let getProducts = this.getProductsbyFillter(Brandd);
           Brands.forEach(brand  =>{
            let brandzz = brand.firstElementChild.innerHTML ;
               if( brandzz == Brandd){
               brand.lastElementChild.classList.add('item_count-active')
               brand.firstElementChild.classList.add('categories_item-active')
               //console.log(brandzz);
               }

            })
            this.displayProducts(getProducts);
        }
        Brands.forEach(brand =>{
         brand.addEventListener('click',()=>{
            if(brand.lastElementChild.classList.contains('item_count-active')){
                Storage.removeSubFillter('brand')
            }else{
                let selectColor = brand.firstElementChild.innerHTML ; 
                Storage.setBrand(selectColor)  
                Storage.setPage(0, 1);

                // Storage.setBrand(selectColor)  
                //console.log(selectColor);
            }
                window.location.reload()
                
            })
        })
        // Brands ==========
        
    }


    EventListnerFillter(fillter){
        Storage.setFillter(fillter);
        Storage.setPage(0, 1);
        Storage.removeSubFillter('shortBy')
        Storage.removeSubFillter('brand')
        Storage.removeSubFillter('brands')
        window.location.reload();
    }

    getProductsbyShort(shortBy) {
        let fillterProducts = JSON.parse(sessionStorage.getItem('fillterProducts'))
        let products;
        if (fillterProducts == undefined || fillterProducts == null) {
            products = JSON.parse(sessionStorage.getItem('products'));
        } else {
            products = fillterProducts;
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
    // fillter like color and price and size
    getProductsbyFillter(fillter){
        //console.log(fillter);
        let fillterProducts = JSON.parse(sessionStorage.getItem('fillterProducts'))
        let products;
        if (fillterProducts == undefined || fillterProducts == null) {
            products = JSON.parse(sessionStorage.getItem('products'));
        } else {
            //console.log("i AM fILLTER pRODUCTS");
            products = fillterProducts;
        }

     let   fillterProduct = products.filter((product) => {
        if(fillter.match(/[0-9a-zA-Z&;]+$/) && (this.color(product, fillter) || this.sizesFillter(product, fillter)|| this.brand(product, fillter) ) ){
            //console.log("Brrandddd");
            return product
        }else if(fillter.match(/^[0-9]+$/)) {
            
            if (product.price.sellPrice <= fillter) {
                
                
                return product
            }
        }       
        //console.log(product);
        return null 
    })
        //console.log(fillterProduct);
        return fillterProduct
    }

    PageDisplaySetter(length) {
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
            pageStart = 5;
        }


        for (let index = pageStart; index < PageNo.length; index++) {
            PageNo[index].classList.add('hidden');
        }


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
        // forwardpage ===
        if (PageActive.innerHTML == pageStart || PageActive.innerHTML == 7) {
            ForwardPage.classList.add('hidden')
        }
        else {
            ForwardPage.classList.remove('hidden')
            ForwardPage.addEventListener('click', () => {

                this.PageSetter(++PageActive.innerHTML);
            })
        }

        // forwardpage ===     


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

    // Search Fillter
    Fillter(fillterName) {
        //console.log(fillterName);
        let fillterProduct;
        let products = JSON.parse(sessionStorage.getItem('products'));
        // for Product Categories Fillter
        if (typeof fillterName == "object") {
            fillterName = fillterName.firstElementChild.innerHTML.toLowerCase()
            //console.log( fillterName);
         PagePoster.innerHTML = `<img src="./assets/images/${fillterName}-poster.png" alt="" class="categorie-poster ${fillterName}-poster">`
         document.title = `${fillterName.toUpperCase()} - Abad`

            fillterProduct = products.filter((product) => {
        if (product.categorie.toLowerCase().includes( fillterName) ||        product.subCategorie.toLowerCase().includes( fillterName) 
                ) {
                    return product
                }
            })
            // adding active class for catogrie clicked
            ProductCategories.forEach(product => {
                if(product.firstElementChild.innerHTML == fillterName){
                    product.firstElementChild.classList.add('categories_item-active');
                    product.firstElementChild.nextElementSibling.classList.add('item_count-active');
                }
            })





        }
        // for Search Fillter
        else {


            fillterName = fillterName.toLowerCase();
            fillterProduct = products.filter((product) => {
         if (product.categorie.toLowerCase().includes(fillterName) ||
               product.subCategorie.toLowerCase().includes(fillterName) ||
                product.productName.toLowerCase().includes(fillterName) ||
                 product.brand.toLowerCase().includes(fillterName) ||
                 this.color(product, fillterName) ||
                 this.tag(product, fillterName)
                    // product.color.toLowerCase().includes(fillterName) 

                ) {

                    return product
                }
            })

        }


        if (fillterProduct.length == 0) {

            let noItem = `<h1>No Item avalible </h1>`
            this.DisplayinDom(noItem);
            PagesSection.style.display = "none"

        }
        else {
            Storage.setFillterProducts(fillterProduct)
            this.displayProducts(fillterProduct)
        }

        activeFillters.classList.remove('hidden')
        activeFillterBtn.innerHTML += fillterName
        // Removing Fillter ====
        clearFillterBtn.addEventListener('click', () => {
            Storage.removeFillter()
        })
        activeFillicon.addEventListener('click', () => {
            Storage.removeFillter()
        })
        // Removing Fillter ====


    }
    color(product, colorName) {
        let result = false;
        product.colors.forEach(color => {
            if (color.color.toLowerCase().includes(colorName) || color.color.toLowerCase().includes(colorName)) {


                result = true;


            }
        })

        return result


    }
    tag(product, tagName) {
        let result = false;
        if (product.tags == undefined) {
            return result
        }
        else {

            product.tags.forEach(tag => {
                if (tag.tag.toLowerCase().includes(tagName) || tag.tag.toLowerCase().includes(tagName)) {


                    result = true;


                }
            })
        }

        return result


    }
    sizesFillter(product,names){
        let result = false;
        if(product.sizes == undefined || null){
            return result
        }
        
        product.sizes.forEach(sizee => {
            if (sizee.size.toLowerCase().includes(names)) {


                result = true;


            }
        })

        return result
    }
    brand(product,names){
        //console.log(names);
     return   product.brand.toLowerCase().includes(names.toLowerCase())?true:false 
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
        // make the element in dom element for giveing to fillter method
        if(fillter && fillter.length > 50){
            let parser = new DOMParser();
            let doc = parser.parseFromString(fillter, 'text/html');  
            let element = doc.body.firstElementChild;
            fillter = element;

        }
        return fillter;
    }
    static removeFillter() {
        sessionStorage.removeItem('fillter');
        sessionStorage.removeItem('fillterProducts');
        sessionStorage.removeItem('brand');
        sessionStorage.removeItem('brands');
        window.location.reload();




    }
    // static AddSubFillters(fillter,filltername){
    //     sessionStorage.setItem(`${filltername}`, JSON.stringify(fillter))
    // }
    // static GetSubFillters(filltername) {
    //     let price = JSON.parse(sessionStorage.getItem(`${filltername}`));
    //     return price;
    // }
    static setFillterProducts(fillterProducts) {
        sessionStorage.setItem('fillterProducts', JSON.stringify(fillterProducts))
    }
    static setPrice(price){
        sessionStorage.setItem('price', JSON.stringify(price))
    }
    static getPrice() {
        let price = JSON.parse(sessionStorage.getItem('price'));
        return price;
    }
    static setColor(color){
        sessionStorage.setItem('color', JSON.stringify(color))
    }
    static getColor() {
        let color = JSON.parse(sessionStorage.getItem('color'));
        return color;
    }
    static setSize(size){
        sessionStorage.setItem('size', JSON.stringify(size))
    }
    static getSize() {
        let size = JSON.parse(sessionStorage.getItem('size'));
        return size;
    }
    static setBrand(size){
        sessionStorage.setItem('brand', JSON.stringify(size))
    }
    static getBrand() {
        let size = JSON.parse(sessionStorage.getItem('brand'));
        return size;
    }
    static setCurrentBrand(size){
        sessionStorage.setItem('brands', JSON.stringify(size))
    }
    static getCurrentBrand() {
        let size = JSON.parse(sessionStorage.getItem('brands'));
        let parser = new DOMParser();
        let doc = parser.parseFromString(size, 'text/html');  
        let element = doc.body.querySelectorAll('li');
        size = element;
        return size;
    }
    static removeSubFillter(fillter) {
        sessionStorage.removeItem(`${fillter}`);
    }

}
























document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const products = new Products
    const ui = new UI

    products.getProducts().then((sum) => {
        let products = sum.Allproducts
        let productCount = sum.ProductsCount
        if (Storage.getFillter() !== null) {
                //console.log("i am in fillter");
            let fillter = Storage.getFillter();
            ui.Fillter(fillter)


        } else {
            ui.displayProducts(products)
            Storage.saveProducts(products)
        }
        ui.displayFillter(productCount);
        ui.AfterVariables();
     

        // make a saprate method for card event listners

    }
    ).then(() => {
        ui.Events(products);

    })



})













