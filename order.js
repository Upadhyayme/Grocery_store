var productPrices = {};

$(function () {
    // Load product list via API
    $.get(productListApiUrl, function (response) {
        if (response) {
            var options = '<option value="">--Select--</option>';
            $.each(response, function (index, product) {
                options += '<option value="' + product.product_id + '">' + product.name + '</option>';
                productPrices[product.product_id] = product.price_per_unit;
            });
            $(".product-box").find("select").empty().html(options);
        }
    });
});

// Add product row
$("#addMoreButton").click(function () {
    var row = $(".product-box").html();
    $(".product-box-extra").append('<div class="row product-item">' + row + '</div>');

    var $newRow = $(".product-box-extra .product-item").last();
    $newRow.find(".remove-row").removeClass('hideit');
    $newRow.find(".product-price").val('0.0');
    $newRow.find(".product-qty").val('1');
    $newRow.find(".product-total").val('0.0');

    calculateValue();
});

// Remove product row
$(document).on("click", ".remove-row", function () {
    $(this).closest('.product-item').remove();
    calculateValue();
});

// Update price when product selected
$(document).on("change", ".cart-product", function () {
    var productId = $(this).val();
    var price = productPrices[productId] || 0.0;
    var $row = $(this).closest('.product-item');

    $row.find(".product-price").val(price);
    calculateValue();
});

// Recalculate total when quantity changes
$(document).on("change", ".product-qty", function () {
    calculateValue();
});

// Save Order button handler
$("#saveOrder").on("click", function () {
    var formData = $("form").serializeArray();
    var requestPayload = {
        customer_name: null,
        grand_total: null,
        order_details: []
    };

    var currentItem = null;
    $.each(formData, function (i, element) {
        switch (element.name) {
            case 'customerName':
                requestPayload.customer_name = element.value;
                break;
            case 'product_grand_total':
                requestPayload.grand_total = element.value;
                break;
            case 'product':
                currentItem = {
                    product_id: element.value,
                    quantity: null,
                    total_price: null
                };
                requestPayload.order_details.push(currentItem);
                break;
            case 'qty':
                if (currentItem) currentItem.quantity = element.value;
                break;
            case 'item_total':
                if (currentItem) currentItem.total_price = element.value;
                break;
        }
    });

    // Simple validation
    if (!requestPayload.customer_name) {
        alert("Please enter customer name.");
        return;
    }

    if (requestPayload.order_details.length === 0) {
        alert("Add at least one product to the order.");
        return;
    }

    callApi("POST", orderSaveApiUrl, {
        data: JSON.stringify(requestPayload)
    });
});

// Calculate total prices
function calculateValue() {
    var grandTotal = 0.0;

    $(".product-box-extra .product-item").each(function () {
        var price = parseFloat($(this).find(".product-price").val()) || 0;
        var qty = parseFloat($(this).find(".product-qty").val()) || 0;
        var total = price * qty;
        $(this).find(".product-total").val(total.toFixed(2));

        grandTotal += total;
    });

    $("#product_grand_total").val(grandTotal.toFixed(2));
}