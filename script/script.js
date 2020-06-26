//AJAX func to send post request
function sendPostAJAX(url,body,onsuccess,onerror){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == XMLHttpRequest.DONE){
            if(xmlhttp.status == 200){
                onsuccess(JSON.parse(xmlhttp.responseText))
            }else if(xmlhttp.status == 400){
                onerror(xmlhttp.response)
            }else{
                alert(xmlhttp.responseText);
                alert("not working")
            }
        }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Content-Type' , 'application/json');
    let user = localStorage.getItem('userDetails');
    let session = localStorage.getItem('session');
    if(user && user.hasOwnProperty('token')&&session){
        xmlhttp.setRequestHeader('Authorization' , 'Bearer '+user.token);
        xmlhttp.setRequestHeader('session' , session.id);
    }
    xmlhttp.send(body);
}

function homepageSendGrid(){
     let email = document.getElementById("email-val").value;
       let name = "homePage";
       if(email){
           sendPostAJAX('/sendGrid', JSON.stringify({
                   email:email,
                   name: name
               }),
               function(res){
                   if (res.message == 'success') {
                       window.location.href ="https://www.doctoroncall.com.my/medicine/en?utm_source=home-popup-RM12&utm_medium=give-me-discount&utm_campaign=home&utm_content=19-nov-19"
                   } else {
                       window.location.href ="https://www.doctoroncall.com.my/medicine/en?utm_source=home-popup-RM12&utm_medium=give-me-discount&utm_campaign=home&utm_content=19-nov-19"
                   }

               }, function(err){
                   console.log(err);
               })
       }
       else{
           alert("Enter a valid email address");
       }
}


//  show popup function
function showPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup").style.transition = "opacity 1s";
    document.getElementById("popup").style.opacity = "1";
}
// close popup function
function closePopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup").style.display = "none";
}
var now = new Date().getTime();
var setupTime = localStorage.getItem('setupTime');
if (localStorage.getItem('seenPopUp') == null) {
    localStorage.setItem('seenPopUp', '0');
}
if (localStorage.getItem('seenPopUp') == '0') {
    localStorage.setItem('seenPopUp', '1');
    setTimeout(function () {
        showPopup();
    }, 15000);
}
if (setupTime == null) {
    localStorage.setItem('setupTime', now)
} else {
    if (now - setupTime > 60 * 60 * 1000) {
        localStorage.clear()
        localStorage.setItem('setupTime', now);
    }
}
//Redirect sign up
function redirectSignUp(){
    window.location.href= window.location.origin+"/patient#/signup";
}
function checkLogin(){
    var user=JSON.parse(window.localStorage.getItem("userDetails"))

    if(user){
        document.getElementById("header-login-signup").style.display="none";
        document.getElementById("header-login-account").style.display="inline-block";
        document.getElementById("header-login-account").style.visibility="visible";
        document.getElementById("header-login-signup-mobile").style.display="none";
        document.getElementById("header-login-account-mobile").style.display="inline-flex";
        document.getElementById("header-login-account-mobile").style.alignItems = "center";
    }else{
        document.getElementById("header-login-signup").style.display="inline-block";
        document.getElementById("header-login-account").style.display="none";
        document.getElementById("header-login-signup-mobile").style.display="inline-block";
        document.getElementById("header-login-account-mobile").style.display="none";
    }
}

// Add event listener
document.addEventListener('DOMContentLoaded', function () {
    try{checkLogin()}catch(e){console.log(e.message)}
});

//Define shorthand id
function id(input){
    return document.getElementById(input)
}

//2. Functions to handle search results
//2.1. Function to update final search results
function updateSearchResult(arr) {
    // declare empty string
    let html = "";
    // loop through array to build html
    for (var i = 0; i < arr.length; i++) {
        var category="";
        var p=arr[i].product_type;
        if(arr[i].sku){
            var sku=arr[i].sku;
            if(p!="corporate"&&sku.toLowerCase()!="nexus"){
                html += '<a class="result-detail noselect" onclick="saveSearch()" href="/medicine'+'/'+arr[i].handle+'">';
                let img="/images/new_home/default-meds.svg"; if(arr[i].product_image){img=arr[i].product_image}
                html += '<div class="result-image"><div style="background-image:url('+img+')"></div></div>';
                html += '<div class="result-title-price">';
                html += '<div class="result-title">' + arr[i].title +"<br><span>"+arr[i].variant_title+"</span></div>";
                html += '<div class="result-price"> RM ' + arr[i].price.toFixed(2) + "</div>";
                html += "</div>";
                html +='<div class="result-buy-icon">';
                html +='<svg viewBox="0 0 172 172"><path d="M120.4,37.84v6.88h27.1975l0.3225,3.01l5.93658,51.94507c-2.3183,-1.00149 -4.7448,-1.79604 -7.2559,-2.36003l-5.23818,-45.71504h-20.9625v7.8475c2.05594,1.19594 3.44,3.37281 3.44,5.9125c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-2.53969 1.38406,-4.71656 3.44,-5.9125v-7.8475h-55.04v7.8475c2.05594,1.19594 3.44,3.37281 3.44,5.9125c0,3.80281 -3.07719,6.88 -6.88,6.88c-3.80281,0 -6.88,-3.07719 -6.88,-6.88c0,-2.53969 1.38406,-4.71656 3.44,-5.9125v-7.8475h-20.9625l-13.0075,113.52h89.26764c2.34666,2.61386 5.02006,4.92921 7.95417,6.88h-104.96181l0.43,-3.87l13.76,-120.4l0.3225,-3.01h27.1975v-6.88c0,-19.04094 15.35906,-34.4 34.4,-34.4c19.04094,0 34.4,15.35906 34.4,34.4zM162.11,172h-1.76181c0.55434,-0.36856 1.09938,-0.75014 1.63466,-1.14429zM58.48,37.84v6.88h55.04v-6.88c0,-15.35906 -12.16094,-27.52 -27.52,-27.52c-15.35906,0 -27.52,12.16094 -27.52,27.52z"/><path d="M157.896,137.6c0,2.064 -1.376,3.44 -3.44,3.44h-13.416v13.416c0,2.064 -1.376,3.44 -3.44,3.44c-2.064,0 -3.44,-1.376 -3.44,-3.44v-13.416h-13.416c-2.064,0 -3.44,-1.376 -3.44,-3.44c0,-2.064 1.376,-3.44 3.44,-3.44h13.416v-13.416c0,-2.064 1.376,-3.44 3.44,-3.44c2.064,0 3.44,1.376 3.44,3.44v13.416h13.416c2.064,0 3.44,1.376 3.44,3.44zM172,137.6c0,18.92 -15.48,34.4 -34.4,34.4c-18.92,0 -34.4,-15.48 -34.4,-34.4c0,-18.92 15.48,-34.4 34.4,-34.4c18.92,0 34.4,15.48 34.4,34.4zM165.12,137.6c0,-15.136 -12.384,-27.52 -27.52,-27.52c-15.136,0 -27.52,12.384 -27.52,27.52c0,15.136 12.384,27.52 27.52,27.52c15.136,0 27.52,-12.384 27.52,-27.52z"/></svg></div>';
                html += "</a>";
            }//corporate check
        }//sku check
    }
    //get container id and update result
    let result = document.getElementById("search-result");
    result.innerHTML = html;
}


//initialize search engine
var client,index;

//Setup algolia
var _0x48b3=['c2hvcGlmeV9wcm9kcHJvZHVjdHM=','MTBWQ05JR0Q0Wg==','MzA4Y2I1MjZhZjBmYzZlODRkYmI1MTUzNGUzYmUyODA=','aW5pdEluZGV4'];(function(_0x1a4d37,_0x18793f){var _0x384333=function(_0x3c83bd){while(--_0x3c83bd){_0x1a4d37['push'](_0x1a4d37['shift']());}};_0x384333(++_0x18793f);}(_0x48b3,0x65));var _0x651d=function(_0x56c69e,_0x48909a){_0x56c69e=_0x56c69e-0x0;var _0x4e58bf=_0x48b3[_0x56c69e];if(_0x651d['fdtPWR']===undefined){(function(){var _0x1d1edb=function(){var _0x535d8c;try{_0x535d8c=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x10d12d){_0x535d8c=window;}return _0x535d8c;};var _0x34d98b=_0x1d1edb();var _0x367abe='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x34d98b['atob']||(_0x34d98b['atob']=function(_0x3da959){var _0x51e28f=String(_0x3da959)['replace'](/=+$/,'');for(var _0x3529bf=0x0,_0x16353e,_0x61bc15,_0x1e7145=0x0,_0x56118f='';_0x61bc15=_0x51e28f['charAt'](_0x1e7145++);~_0x61bc15&&(_0x16353e=_0x3529bf%0x4?_0x16353e*0x40+_0x61bc15:_0x61bc15,_0x3529bf++%0x4)?_0x56118f+=String['fromCharCode'](0xff&_0x16353e>>(-0x2*_0x3529bf&0x6)):0x0){_0x61bc15=_0x367abe['indexOf'](_0x61bc15);}return _0x56118f;});}());_0x651d['xqumcX']=function(_0x2ad57a){var _0x3968bb=atob(_0x2ad57a);var _0x548e41=[];for(var _0x4f55e1=0x0,_0x3e638c=_0x3968bb['length'];_0x4f55e1<_0x3e638c;_0x4f55e1++){_0x548e41+='%'+('00'+_0x3968bb['charCodeAt'](_0x4f55e1)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x548e41);};_0x651d['pyFhCo']={};_0x651d['fdtPWR']=!![];}var _0x3b9da2=_0x651d['pyFhCo'][_0x56c69e];if(_0x3b9da2===undefined){_0x4e58bf=_0x651d['xqumcX'](_0x4e58bf);_0x651d['pyFhCo'][_0x56c69e]=_0x4e58bf;}else{_0x4e58bf=_0x3b9da2;}return _0x4e58bf;};function initSearch(){client=algoliasearch(_0x651d('0x0'),_0x651d('0x1'));index=client[_0x651d('0x2')](_0x651d('0x3'));}

function searchTerm(input){
    id("searchInput").value=input;
    searchAlgolia(input,0)
}

function saveSearch(){
    if(user_typed==1){
        if(window.localStorage.getItem("searchHist")){
            var arr=JSON.parse(window.localStorage.getItem("searchHist"))
            arr.unshift(id("searchInput").value);
            try{arr=arr.slice(0,5)}catch(e){}
            window.localStorage.setItem("searchHist",JSON.stringify(arr))
        }else{
            var arr=[id("searchInput").value]
            window.localStorage.setItem("searchHist",JSON.stringify(arr))
        }
    }

}

function searchAlgolia(input,user_type) {
    //Store user typed variable for saving history
    if(user_type==0){
        user_typed=0;
    }else{
        user_typed=1;
    }
    // Gets search value
    let searchTerm = id("searchInput").value;
    if(input){
        searchTerm=input;
    }
    // build query
    let query = {
        query: searchTerm,
        hitsPerPage: 10
    };
    // query database
    // if (searchTerm.length > 2) {
    //     index.search(query, function (err, content) {
    //         updateSearchResult(content.hits);
    //         if(content.hits.length==0){
    //             id("search-suggest").classList.add("searchSuggestShow")
    //             id("search-suggest").classList.add("searchSuggestShowMobile")
    //         }
    //     });
    // }
    if(searchTerm.length > 2){
        sendPostAJAX('/get/products/search', JSON.stringify({
                query: searchTerm
            }),
            function(content){
                try{
                    updateSearchResult(content.hits)
                }catch(e){
                    updateSearchResult(JSON.parse(content).hits)
                }
            }, function(err){
                console.log(err);
            })
    }

    //Handle clear button
    if(searchTerm.length<2){
        updateSearchbarAction("search")
        updateSearchResult([]);
        id("search-suggest").classList.add("searchSuggestShow")
        id("search-suggest").classList.add("searchSuggestShowMobile")
    }else{
        updateSearchbarAction("clear")
        id("search-suggest").classList.remove("searchSuggestShow")
        id("search-suggest").classList.remove("searchSuggestShowMobile")
    }
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        var term=id("searchInput").value;
        var url;
        url=window.location.origin+"/medicine/en/search/"+term;
        window.location.href=url;
      }
}

function updateSearchbarAction(input){
    //create clear button
    let html = "";
    if(input=="clear"){
        html +='<svg style="width:40px" viewBox="0 0 50 50"><path d="M 14.40625 13 L 13 14.40625 L 23.625 25 L 13 35.59375 L 14.40625 37 L 25.0625 26.40625 L 35.6875 37 L 37.09375 35.59375 L 26.46875 25 L 37.09375 14.40625 L 35.6875 13 L 25.0625 23.59375 Z "></path></svg>';
    }else{
        html +='<svg viewBox="0 0 512 512"><path d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"></path></svg>'
    }
    let clearbtn = id("searchBtn");
    clearbtn.innerHTML = html;
}

function searchClear(){
    let input=id("searchInput");
    input.value="";
    let resultText = id("search-result");
    resultText.innerHTML = "";
    // id("search-suggest").classList.add("searchSuggestShowMobile")
    updateSearchbarAction("search")
}

var searchMobile=0;
function makeSearchbarMobile() {
    searchMobile=1;
    //get searchbarcol id and add new class named searchbar-mobile for display search results in mobile view
    let searchbar = id("searchbarCol");
    searchbar.classList.add("searchbar-mobile");

    // //create html for text 'Recent searches' and 'Showing result for'
    // let html = "";
    // html += '<div class="search-recent">Recent searches </div>';
    // html += '<div class="search-show-result"> Showing results for </div>';
    // //get search result text id and display text
    // let resultText = id("search-result-text");
    // resultText.innerHTML = html;

    //Show Suggestions
    if(id("searchInput").value==0){
        id("search-suggest").classList.add("searchSuggestShow")
        id("search-suggest").classList.add("searchSuggestShowMobile")
    }

    //Show the back button
    let searchBackBtn = id("search-back-btn");
    searchBackBtn.classList.add("searchShow")

    //Arrange the form properly
    let searchForm=id("searchbar-form")
    searchForm.classList.add("searchbar-form-mobile")

    //Arrange the form properly
    let searchInput=id("searchInput")
    searchInput.classList.add("searchbar-input-mobile")

    //Redesign the icon
    let searchBtn=id("searchBtn")
    searchBtn.classList.add("searchbar-btn-mobile")

    //Initialize Search History

    let searchHist=JSON.parse(window.localStorage.getItem("searchHist"));
    if(searchHist.length){
        var html="";
        for(i=0;i<searchHist.length;i++){
            html+='<div onclick="searchTerm(\''+searchHist[i]+'\')">'+searchHist[i]+'</div>';
        }
        id("search-hist-suggest").innerHTML=html;
    }
}


function searchBack(){
    searchMobile=0;
    let searchbar = id("searchbarCol");
    searchbar.classList.remove("searchbar-mobile");
    let searchBackBtn = id("search-back-btn");
    searchBackBtn.classList.remove("searchShow")
    let searchForm=id("searchbar-form")
    searchForm.classList.remove("searchbar-form-mobile")
    let searchInput=id("searchInput")
    searchInput.classList.remove("searchbar-input-mobile")
    let searchBtn=id("searchBtn")
    searchBtn.classList.remove("searchbar-btn-mobile")


    searchClear()
    id("search-suggest").classList.remove("searchSuggestShow")
    id("search-suggest").classList.remove("searchSuggestShowMobile")

}

function hideSuggest(){
    setTimeout(function(){
        id("search-suggest").classList.remove("searchSuggestShow")
    },100)
}

function searchBtn(){
    if(searchMobile==1){
        //if not active
        searchClear()
    }else{
        //if active
        makeSearchbarMobile()
    }
}


//3. Functions to manage cookies
//3.1. Set cookie for keeping cart data
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//3.2. Get cookie data
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//3.3. Remove cookies
function removeCookie(cname){
    return document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}



//4. JS for making AMP redirections working
//TODO: CHANGE THIS TO #SYSTEM INSTEAD TO BOOST SPEED SCORE as param creates an illusion of a separate slow page...
function getURLParam(param) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === param) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

//Check if contains the action parameter
function handleAmpRedirect(){
    var action=getURLParam("action")
    //var href=window.location.href;
    if(action){
        setTimeout(function(){
            var id;
            if(action=="search"){
                //Focus on search
                id="searchInput";
            }else if(action=="add"){
                //click on add
                id="product-add";
            }else if(action=="checkout"){
                //click on check out
                id="product-checkout";
            }else if(action=="signup"){
                id="button-login-signup"
            }
            //Remove params
            history.replaceState( {} , 'redirect', location.protocol + '//' + location.host + location.pathname );
            //Click the thing
            document.getElementById(id).click()
        },500)
    }
}

//6. Function to Toggle class for fullscreen images
function toggleClass(element, className){
    if (!element || !className){
        return;
    }
    var ele = document.querySelector(element)
    ele.classList.toggle(className);
}

//7. Add set timeout for lazy load image
var time=1500;
var newTime = 1500;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 newTime = 500;
 time=3000;
}
setTimeout(function(){
  //Add lazy-load class to element with data-src
  var imgs = document.getElementsByClassName('lazy-load');
  for(var i = 0; i < imgs.length; i++) {
    var currentSrc = imgs[i].getAttribute('data-src');
    imgs[i].setAttribute('src',currentSrc);
    imgs[i].style.visibility="visible"
  }
},time)

setTimeout(function(){
    //Add lazy-load class to element with data-src
    var imgs = document.getElementsByClassName('lazy-load-new');
    for(var i = 0; i < imgs.length; i++) {
      var currentSrc = imgs[i].getAttribute('data-src');
      imgs[i].setAttribute('src',currentSrc);
      imgs[i].style.visibility="visible" 
    }
  },newTime)

//10. Add event listener
document.addEventListener('DOMContentLoaded', function () {
    try{getCartQuantity()}catch(e){}
    try{handleAmpRedirect()}catch(e){}
    try{checkLogin()}catch(e){}
});