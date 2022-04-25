

$(".testimonial-slider").slick({
  slidesToShow: 1,
  dots: true,
  infinite: true,
  speed: 300,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
      },
    },
  ],
});
$(".top-seller").slick({
  dots: false,
  arrows: true,
  slidesToShow: 4,
  infinite: true,
  speed: 300,
  adaptiveHeight: true,
  prevArrow: $(".prev"),
  nextArrow: $(".next"),
  responsive: [
    {
      breakpoint: 1180,
      settings: {
        arrows: false,
        dots: true,

        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        dots: true,
  
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 992,
      settings: {
        arrows: false,
        dots: true,
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 580,
      settings: {
        dots: true,
        slidesToShow: 1,
      },
    },
  ],
});

$(function () {
  $(".loader").fadeOut();
  $(".footer-middle__links").removeClass("active");
  $(".links-heading").on("click", function () {
    $(this).next(".footer-middle__links").toggleClass("active");
    $(this).toggleClass("active");
  });

  if ($(window).width() < 1024) {
    $(".header").addClass("color-inverse");
  }

  
});



// faq
$(document).on('click', '.faq-list__question', function() {
  $(this).parent('.faq-list').toggleClass('faq-active');
});

$('.blog-wrap').slick({
  slidesToShow: 1,
  centerPadding: "200px",
  slidesToScroll: 1,
  arrows: false,
  dots: true,
  centerMode: true,
  focusOnSelect: true,
  cssEase: 'linear',
  touchMove: true,
  adaptiveHeight: true,
  responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          centerMode: false,
          touchMove: true,
          
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          centerMode: false,
          touchMove: true,
        },
      },
    ],
});



$('.product-slider__for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.product-slider__nav'
});
$('.product-slider__nav').slick({
  slidesToShow:6,
  slidesToScroll: 1,
  asNavFor: '.product-slider__for',
  dots: false,

  focusOnSelect: true,
  prevArrow: $(".prev"),
  nextArrow: $(".next"),
  centerPadding: '10px',

});

/*********minicart**************** */
$(document).ready(function(){
  //   	    document
  //     .querySelector(".product-form__submit")
  //     .addEventListener("click", (evnt) => {
  //       evnt.preventDefault();
  //       console.log("prevent  default!");
  //     });
      const submitButton = document.getElementById("addToCartButton");
        const errorWrap = document.getElementById('product-form__error-message');
        
      $('.product-form__submit').on('click', function(){
          submitButton.setAttribute('aria-disabled', true);
         submitButton.classList.add('loading');
          submitButton.querySelector('.loading-overlay__spinner').classList.remove('hidden');
         
        
           $(this).prev().val(+$(this).prev().val() + 1);
      var cartPvarinatID = $(this).attr("data-var-id");
      var quantityVal = $(this).parents(".add-to-cart").find(".quantity__input").val();
      
      
            
      $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        dataType: 'json',
        data: {
          quantity: quantityVal,
          id: cartPvarinatID
  
        },
        success: function (data){
          
          $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/cart.json',
            success: function(cart){
              var item_count = cart['item_count'];
              var total_price = cart['total_price']/100;
                 $('.mini-cart-items .no-item').removeClass('active');
                 $('.cart-count').text(item_count);
                 $('.drawer__title span').text(item_count);
              if ( item_count >= 0 ) {
                 // cart count
                                // mini cart data
                      
                                $('.drawer__wrapper').attr('id','mini-cart');
                                $('.mini-cart-subtotal .price').text( '$' + total_price.toFixed(2) );
                                 if ( total_price >= 200) {
                                             $('.free-shipping').addClass('active');
                                           }
                                else{  $('.free-shipping').removeClass('active');}
                                var cart_list = [];
  
                for( var i = 0; i < cart.items.length; i++ ){
                  if ( cart['items'][i]['id'] !== null ) {
                    var item_id = cart['items'][i]['id'];
                    var product_title = cart['items'][i]['product_title'];
                    // var product_title = cart['items'][i]['title'];
                    var product_handle = cart['items'][i]['handle'];
                    var quantity = cart['items'][i]['quantity'];
                                      var quantity_plus= quantity + 1;
                                      var quantity_minus = quantity - 1; 
                    var item_price = cart['items'][i]['price']/100;
  // 									var line_price = cart['items'][i]['line_price']/100;
                                    var line_price = '$'+ (cart['items'][i]['line_price']/100).toFixed(2);
                                    
                    var url = cart['items'][i]['url'];
                    var image_url = cart['items'][i]['image'];
                    var variants = cart['items'][i]['variant_options'];
                    
                    if ( product_title == 'Gift Wrap' ) {
                      var product_url = product_title;
                    } else {
                      var product_url = '<a href="' + url + '">' + product_title + '</a>';
                    }
  
                    var options = [];
                    for ( var o = 0; o < variants.length; o++ ) {
                      var selected = cart['items'][i]['variant_options'][o];
                      if ( selected !== 'Default Title' ) {
                        options.push( selected + '<br>' );
                      }
                    };
                    var selected_options = options.join('');
  
                    var item_line_price_elm = $('#line_price_'+item_id);
  
  // 									item_line_price_elm.html(Shopify.formatMoney(line_price).replace('$','£'));
      
                    cart_list.push('<li> <div class="cart-item"> <div class="cart-item__image"> <a href="' + url + '"><img src="' + image_url + '" alt="' + product_title + '"/></a> </div><div class="flex-grow"> <div class="title-flex"> <p class="mb-1 font-bold">' + product_url + ' <span class="variant">' + selected_options + '</span></p> <a href="javascript:;" class="button button--tertiary remove-product" data-line-id = "'+ item_id +'" aria-label="remove - '+ product_title +'"> <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.48913 6.5L12.7645 1.20109C13.0471 0.918478 13.0471 0.471014 12.7645 0.211957C12.4819 -0.0706522 12.0344 -0.0706522 11.7754 0.211957L6.5 5.51087L1.20109 0.211957C0.918478 -0.0706522 0.471014 -0.0706522 0.211957 0.211957C-0.0706522 0.494565 -0.0706522 0.942029 0.211957 1.20109L5.48732 6.5L0.211957 11.7989C-0.0706522 12.0815 -0.0706522 12.529 0.211957 12.788C0.353261 12.9293 0.541667 13 0.706522 13C0.871377 13 1.05978 12.9293 1.20109 12.788L6.5 7.48913L11.7989 12.788C11.9402 12.9293 12.1286 13 12.2935 13C12.4583 13 12.6467 12.9293 12.788 12.788C13.0707 12.5054 13.0707 12.058 12.788 11.7989L7.48913 6.5Z" fill="#010101"/></svg></a></div> <div class="flex justify-between"> <div class="flex items-center"> <quantity-input class="quantity"> <a class="quantity__button qminus no-js-hidden" title="Set quantity to '+ quantity_minus +'" href="javascript:;" data-quantity="'+ quantity_minus +'" data-line-id="'+ item_id +'" data-action="update-item-quantity"> <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-minus" fill="none" viewBox="0 0 10 2"><path fill-rule="evenodd" clip-rule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor"></path></svg> </a> <input class="quantity__input" type="number" name="updates[]" value="'+ quantity +'" min="0" id="Quantity-'+ quantity_minus +'"> <a class="quantity__button qplus no-js-hidden" title="Set quantity to '+ quantity_plus +'" href="javascript:;" data-quantity="'+ quantity_plus +'" data-line-id="'+ item_id +'" data-action="update-item-quantity"> <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-plus" fill="none" viewBox="0 0 10 10"> <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor"></path> </svg> </a> </quantity-input> </div><div class="cart-item__price"> <p class="text-lg">' + line_price + '</p></div></div></div></div></li>');
                                      const cartDrawer =  document.getElementById('drawer-cart');
                                       cartDrawer.classList.add('is-active');
                                      setTimeout(function () {
                                          cartDrawer.classList.add('is-visible');
                                      }, 500);
                  } //endif
                }; // endfor
                $('.mini-cart-items ul').html( cart_list.join('') );
                            submitButton.classList.remove('loading');
                            submitButton.removeAttribute('aria-disabled');
                            submitButton.querySelector('.loading-overlay__spinner').classList.add('hidden');
                            $(".product-form__error-message-wrapper").attr("hidden",true); 
                         
              }
                       
            }
          });
        },
               error: function (data) {
  //               console.log(data);
  //              console.log(JSON.parse(data.responseText).description);
               $(".product-form__error-message-wrapper").removeAttr('hidden');
                $('.product-form__error-message').text(JSON.parse(data.responseText).description);
                submitButton.classList.remove('loading');
                submitButton.removeAttribute('aria-disabled');
                submitButton.querySelector('.loading-overlay__spinner').classList.add('hidden');
             }
      });
    });
    
    
    });
