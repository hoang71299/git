// khi click ADD TO CART:
// từ vị tri thang nay (this) dựa theo class lay: img, name, price, id

// và tao objcon nhu sau:
//   {
//     img:...
//     price:..
//     name:..
//     qty:1
//   }

// va sau do dua objcon nay vao objCha, va dung chinh ID cua product làm key
// (ID chua co, nên tự them vao trong html, 6 product 6 ID)
// <!-- obcha[id] = obcjcha -->
// {
//   product1: {
//     img:...
//     price:..
//     name:..
//     qty:1
//   }
// }
// => dua vao local
// {
//   product1: {
//     img:...
//     price:..
//     name:..
//     qty:2
//   },
//   product2: {
//     img:...
//     price:..
//     name:..
//     qty:1
//   },
//   ...
// }

// va chu y giup a, 1 product mua nhieu lan thi tang qty cua no len

$(document).ready(function () {
  var cart = $('.shop-menu a[href="cart.html"] span#cart');
  $("a.add-to-cart").click(function (e) {
    e.preventDefault();
    var img = $(this).closest(".product-image-wrapper").find("img").attr("src");
    var price = $(this)
      .closest(".product-image-wrapper")
      .find(".product-overlay h2")
      .text();
    var name = $(this)
      .closest(".product-image-wrapper")
      .find(".product-overlay p")
      .text();
    var id = $(this).closest(".product-image-wrapper").attr("id");

    console.log(cart);
    var objCon = {};

    objCon.img = img;
    objCon.price = price;
    objCon.name = name;
    objCon.qty = 1;

    var objCha = JSON.parse(localStorage.getItem("demo") || "{}");

    if (objCha[id]) {
      objCha[id].qty += 1;
    } else {
      objCha[id] = objCon;
    }

    localStorage.setItem("demo", JSON.stringify(objCha));
    console.log(objCha);
    var cart2 = 0;
    Object.keys(objCha).forEach(function (key, index) {
      cart2 = cart2 + objCha[key].qty;
    });
    cart.text(cart2);
  });
  var objCha = {};
  var tong1 = $(".total_area li:last-child span");

  objCha = JSON.parse(localStorage.getItem("demo"));
  var html = "";
  Object.keys(objCha).map(function (key, index) {
    // console.log(key);
    var price = Number(objCha[key].price.slice(1));
    var total = price * objCha[key].qty;

    // console.log(price,total);
    // console.log(objCha[key].img, objCha[key].name );

    // html += "<tr>" +
    //   '<td href=""><img src='+  objCha[key].img +   '  alt="" /></td>' +
    //   "<td>" + objCha[key].name +"</td>" +
    //   "<td>" +price +"</td>" +
    //   "<td>" +total +"</td>" +
    // "</tr>";
    html += `
      <tr>
        <td id=${key} class="cart_product">
          <a href=""><img src="${objCha[key].img}" alt=""></a>
        </td>
        <td class="cart_description">
          <h4><a href="">${objCha[key].name}</a></h4>
          <p>Web ID: 1089772</p>
        </td>
        <td class="cart_price">
          <p>$${price}</p>
        </td>
        <td class="cart_quantity">
          <div class="cart_quantity_button">
            <a class="cart_quantity_up" href=""> + </a>
            <input class="cart_quantity_input" type="text" name="quantity" value="${objCha[key].qty}" autocomplete="off" size="2">
            <a class="cart_quantity_down" href=""> - </a>
          </div>
        </td>
        <td class="cart_total">
          <p class="cart_total_price">$${total}</p>
        </td>
        <td class="cart_delete">
          <a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a>
        </td>
      </tr>`;
  });
  $("table tbody").append(html);

  var tong = 0;
  var total2 = Object.keys(objCha).map((key, index) => {
    return Number(objCha[key].price.slice(1)) * objCha[key].qty;
  });
  total2.forEach(function (value, key) {
    tong += value;
  });
  // console.log(total2);
  var tongmoi = "$" + tong;
  tong1.text(tongmoi);
  var cart2 = 0;
  Object.keys(objCha).forEach(function (key, index) {
    cart2 = cart2 + objCha[key].qty;
  });
  cart.text(cart2);
  $("a.cart_quantity_up").click(function (e) {
    e.preventDefault();
    var so = $(this).closest("tr");
    console.log(so);
    var value = Number(
      $(this)
        .closest(".cart_quantity_button")
        .find("input.cart_quantity_input")
        .val()
    );
    var price = Number(
      $(this).closest("tr").find(".cart_price p").text().slice(1)
    );
    var total = $(this)
      .closest("tr")
      .find(".cart_total .cart_total_price")
      .text();
    var key = $(this).closest("tr").find("td").attr("id");
    console.log(key);
    value = value + 1;
    total = value * price;
    objCha[key].qty = value;
    console.log(objCha);
    var newPrice = value;
    var newToTal = "$" + total;
    localStorage.setItem("demo", JSON.stringify(objCha));
    $(this)
      .closest(".cart_quantity_button")
      .find("input.cart_quantity_input")
      .val(newPrice);
    $(this).closest("tr").find(".cart_total .cart_total_price").text(newToTal);
    // var subTotal = Object.keys(objCha)
    //   .map(
    //     (key, index) => parseFloat(objCha[key].price.slice(1)) * objCha[key].qty
    //   )
    //   .reduce((total, value) => total + value, 0);
    // console.log(subTotal);
    var tong = 0;
    var total2 = Object.keys(objCha).map(function (key, index) {
      return Number(objCha[key].price.slice(1)) * objCha[key].qty;
    });
    total2.forEach(function (value, key) {
      tong += value;
    });
    var tongmoi = "$" + tong;
    tong1.text(tongmoi);
    var cart2 = 0;
    Object.keys(objCha).forEach(function (key, index) {
      cart2 = cart2 + objCha[key].qty;
    });
    cart.text(cart2);
  });

  $("a.cart_quantity_down").click(function (e) {
    e.preventDefault();
    var value = Number(
      $(this)
        .closest(".cart_quantity_button")
        .find("input.cart_quantity_input")
        .val()
    );
    var price = Number(
      $(this).closest("tr").find(".cart_price p").text().slice(1)
    );
    var total = $(this)
      .closest("tr")
      .find(".cart_total .cart_total_price")
      .text();
    var key = $(this).closest("tr").find("td").attr("id");
    console.log(key);
    console.log(objCha[key].qty);
    value = value - 1;
    total = value * price;
    objCha[key].qty = value;
    if (objCha[key].qty < 1) {
      delete objCha[key];
      $(this).closest("tr").remove();
    }
    var newPrice = value;
    var newToTal = "$" + total;
    localStorage.setItem("demo", JSON.stringify(objCha));
    $(this)
      .closest(".cart_quantity_button")
      .find("input.cart_quantity_input")
      .val(newPrice);
    $(this).closest("tr").find(".cart_total .cart_total_price").text(newToTal);
    var tong = 0;
    var total2 = Object.keys(objCha).map(function (key, index) {
      return Number(objCha[key].price.slice(1)) * objCha[key].qty;
    });
    total2.forEach(function (value, key) {
      tong += value;
    });
    var tongmoi = "$" + tong;
    tong1.text(tongmoi);
    var cart2 = 0;
    Object.keys(objCha).forEach(function (key, index) {
      cart2 = cart2 + objCha[key].qty;
    });
    cart.text(cart2);
  });

  $("a.cart_quantity_delete").click(function (e) {
    e.preventDefault();
    var key = $(this).closest("tr").find("td").attr("id");
    delete objCha[key];
    $(this).closest("tr").remove();
    localStorage.setItem("demo", JSON.stringify(objCha));
    var tong = 0;
    var total2 = Object.keys(objCha).map(function (key, index) {
      return Number(objCha[key].price.slice(1)) * objCha[key].qty;
    });
    total2.forEach(function (value, key) {
      tong += value;
    });
    var tongmoi = "$" + tong;
    tong1.text(tongmoi);
    var cart2 = 0;
    Object.keys(objCha).forEach(function (key, index) {
      cart2 = cart2 + objCha[key].qty;
    });
    cart.text(cart2);
  });
});
// var subTotal = Object.keys(objCha)
//   .map(
//     (key, index) => parseFloat(objCha[key].price.slice(1)) * objCha[key].qty
//   )
//   .reduce((total, value) => total + value, 0);
// console.log(subTotal);
// map
// filter
// reduce
// sort
// Lấy phần tử <a> chứa thông tin giỏ hàng
