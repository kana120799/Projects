var billRight = document.getElementById("billRight");
var billLeft = document.getElementById("billLeft");
var generate = document.getElementById("generate");
var table = document.getElementById("tableData");
var str = "",
  str2 = "";

// ========================================================================
class ProductAddon {
  constructor(
    id,
    product,
    milk,
    cream,
    latte,
    quantity,
    extraM,
    extraC,
    extraL
  ) {
    this.id = id;
    this.product = product;
    this.milk = milk;
    this.cream = cream;
    this.latte = latte;
    this.quantity = quantity;
    this.extraM = extraM;
    this.extraC = extraC;
    this.extraL = extraL;
  }
}
var Eprod0 = new ProductAddon(0, "Expresso", 60, 75, 100, 0, "", "", "");
var Eprod1 = new ProductAddon(1, "Cappuccino", 80, 90, 125, 0, "", "", "");
var Eprod2 = new ProductAddon(2, "Latte", 100, 125, 150, 0, "", "", "");
var arr2 = [Eprod0, Eprod1, Eprod2];

// ============================================================================

arr2.forEach((ele) => {
  str += `<tr><td class="product">${ele.product}</td><td class="milk">${ele.milk}</td><td class="cream">${ele.cream}</td><td class="latte">${ele.latte}</td></tr>
          `;
});
table.innerHTML = str;
arr2.forEach((ele, ind) => {
  document.getElementById(`order${ind}`).innerHTML = ele.quantity;
});

// =====================
// Amount of Coffee Order
// =====================

function ProductCount(id, addrem) {
  if (generate.innerText == "Order") generate.innerText = "Generate Bill";

  arr2.forEach((ele, ind) => {
    if (ele.id == id) {
      if (addrem == "add") {
        document.getElementById(`order${ind}`).innerHTML = ++ele.quantity;
      } else if (addrem == "rem") {
        if (ele.quantity > 0)
          document.getElementById(`order${ind}`).innerHTML = --ele.quantity;
        else {
          document.getElementById(`order${ind}`).innerHTML = 0;
        }
      }
    }
  });
}

// ============================================================================

arr2.forEach((ele, ind) => {
  document.getElementById(`extraM${ind}`).innerHTML = ele.extraM;
  document.getElementById(`extraL${ind}`).innerHTML = ele.extraC;
  document.getElementById(`extraC${ind}`).innerHTML = ele.extraL;
});
// =====================
// Amount of Add On
// =====================

function ExtraProductCount(id, mcl, addrem) {
  if (generate.innerText == "Order") generate.innerText = "Generate Bill";
  arr2.forEach((ele, ind) => {
    if (ele.id == id) {
      // ==========================   extra Milk   ==================================

      if (mcl == "extraM") {
        if (addrem == "add") {
          document.getElementById(`extraM${ind}`).innerHTML = ++ele.extraM;
        } else {
          if (ele.extraM > 0)
            document.getElementById(`extraM${ind}`).innerHTML = --ele.extraM;
        }
      }
      // ==========================   extra Cream   ==================================
      else if (mcl == "extraC") {
        if (addrem == "add") {
          document.getElementById(`extraC${ind}`).innerHTML = ++ele.extraC;
        } else {
          if (ele.extraC > 0)
            document.getElementById(`extraC${ind}`).innerHTML = --ele.extraC;
        }
      }
      // ==========================   extra Latte   ==================================
      else if (mcl == "extraL") {
        if (addrem == "add") {
          document.getElementById(`extraL${ind}`).innerHTML = ++ele.extraL;
        } else {
          if (ele.extraL > 0)
            document.getElementById(`extraL${ind}`).innerHTML = --ele.extraL;
        }
      }
    }
  });
}

function llpp() {
  if (generate.innerText == "Order") {
    if (confirm("Order Successfully placed")) window.location.reload(true);
  } else {
    str2 = "";
    str = "";

    arr2.forEach((ele, ind) => {
      if (ele.quantity > 0) {
        generate.innerText = "Order";

        str += `
      <div class="item">
      <div>${ele.quantity} </div>
      <div class="star">*</div>
      <div>${ele.product} </div>
      </div>
      `;

        if (ele.extraM > 0 || ele.extraC > 0 || ele.extraL > 0) {
          str2 += ` <div class="extraAdd"><div>${ele.extraM}</div><div class="billLeftEcream">${ele.extraC}</div><div>${ele.extraL}</div></div>`;
        }
      }
    });
    billRight.innerHTML = str;
    billLeft.innerHTML = str2;
  }
}
