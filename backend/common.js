// Define your API endpoints
var productListApiUrl = 'http://127.0.0.1:5000/getProducts';
var uomListApiUrl = 'http://127.0.0.1:5000/getUOM';
var productSaveApiUrl = 'http://127.0.0.1:5000/insertProduct';
var productDeleteApiUrl = 'http://127.0.0.1:5000/deleteProduct';
var orderListApiUrl = 'http://127.0.0.1:5000/getAllOrders';
var orderSaveApiUrl = 'http://127.0.0.1:5000/insertOrder';

// For product dropdown from test API
var productsApiUrl = 'https://fakestoreapi.com/products';

// Generic API call helper
function callApi(method, url, data) {
    $.ajax({
        method: method,
        url: url,
        data: data
    }).done(function (msg) {
        window.location.reload();
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert("Request failed: " + textStatus);
        console.error("Error: " + errorThrown);
    });
}

// Calculate total values dynamically
function calculateValue() {
    var total = 0;
    $(".product-item").each(function () {
        var qty = parseFloat($(this).find('.product-qty').val()) || 0;
        var price = parseFloat($(this).find('.product-price').val()) || 0;
        var itemTotal = price * qty;
        $(this).find('.product-total').val(itemTotal.toFixed(2));
        total += itemTotal;
    });
    $("#product_grand_total").val(total.toFixed(2));
}

// Order parser (for your actual order API fields)
function orderParser(order) {
    return {
        id: order.id,
        date: order.date,
        orderNo: order.order_number,
        customerName: order.customer_name,
        cost: parseFloat(order.total_cost)
    }
}

// Product parser (for your actual product API fields)
function productParser(product) {
    return {
        id: product.product_id,
        name: product.name,
        unit: product.unit,
        price: parseFloat(product.price_per_unit)
    }
}

// Product dropdown parser for fakestoreapi.com
function productDropParser(product) {
    return {
        id: product.id,
        name: product.title
    }
}

// To globally enable Bootstrap tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});