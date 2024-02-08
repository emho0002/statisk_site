const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

fetch("https://kea-alt-del.dk/t7/api/products?category=" + category)
  .then((response) => response.json())
  .then((data) => showProducts(data));

function showProducts(products) {
  // looper og kalder showProduct
  products.forEach(showProduct);
}

function showProduct(product) {
  console.log(product);

  //fange template
  const template = document.querySelector("#ProductTemplate").content;

  //   lav en kopi
  const copy = template.cloneNode(true);

  // ændre indhold
  copy.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/1000/${product.id}.webp`;
  copy.querySelector(".name").textContent = product.productdisplayname;
  copy.querySelector(".subcategory").textContent = product.subcategory;
  copy.querySelector(".data_price").textContent = product.price;
  copy.querySelector(".data_discount").textContent = product.discount;
  copy.querySelector(".brandname").textContent = product.brandname;
  copy.querySelector(".gender").textContent = product.gender;

  //DISCOUNT
  if (!product.discount) {
    //console.log("NOT DISCOUNT")
    copy.querySelector(".data_discount").classList.add("hidden");
    copy.querySelector(".udsalg_tekst").classList.add("hidden");
  } else {
    copy.querySelector(".data_discount").textContent = Math.round((100 - product.discount) * 0.01 * product.price) + ",-";
    copy.querySelector("article").classList.add("discount");
  }

  //SOLD OUT

  copy.querySelector(".data_price").textContent = product.price + ",-";
  if (product.soldout) {
    const p = document.createElement("p");
    p.textContent = "Sold Out";
    p.classList.add("soldout");
    copy.querySelector("article").appendChild(p);
  }

  if (product.soldout) {
    //   produktet er udolgt
    copy.querySelector("article").classList.add("soldOut");
  }

  copy.querySelector(".read_more").setAttribute("href", `product.html?id=${product.id}`);
  copy.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  // appende til DOM
  document.querySelector("main .grid2").appendChild(copy);
}
