import saree from "../assets/images/saree.jpeg";
import kurti from "../assets/images/kurthi fabric.jpeg";
import shirt from "../assets/images/shirts.jpeg";
import blanket from "../assets/images/blankets.jpeg";
import bedsheet from "../assets/images/bedsheetss.jpeg";


const products = [
  {
    id: 1,
    image: saree,
    name: "Bridal Saree",
    category: "Women",
    price: 7500,
    description:
      "This elegant bridal saree is crafted from premium quality fabric with beautiful traditional designs. It is perfect for weddings, festivals, and special occasions. The soft material provides comfort while giving a graceful and luxurious look. A timeless choice for every woman's wardrobe.",
  },
  {
    id: 2,
    image: kurti,
    name: "Ladies Kurti",
    category: "Women",
    price: 1850,
    description:
      "This stylish ladies kurti is designed for both comfort and elegance. Made from soft, breathable fabric, it is perfect for daily wear, office, or casual outings. Its modern design and comfortable fit make it suitable for every season. Pair it with leggings or jeans for a complete look.",
  },
  {
    id: 3,
    image: shirt,
    name: "Men Shirt",
    category: "Men",
    price: 1200,
    description:
      "This men's shirt is made from high-quality fabric that offers comfort and durability. Its modern design makes it suitable for both formal and casual occasions. The soft material keeps you comfortable throughout the day. A perfect addition to every gentleman's wardrobe.",
  },
  {
    id: 4,
    image: blanket,
    name: "Blanket",
    category: "Bedding",
    price: 2000,
    description:
      "This premium blanket is made from soft and warm fabric to keep you comfortable during cold weather. It is lightweight, durable, and easy to maintain. Suitable for home use, travel, and winter nights, it provides excellent warmth without feeling heavy.",
  },
  {
  id: 5,
  image: bedsheet,
  name: "Premium Cotton Bedsheet",
  category: "Bedding",
  price: 2500,
  description:
    "Premium cotton double bedsheet with two matching pillow covers. Soft, breathable, comfortable, and durable. Suitable for everyday use and all seasons.",
},

];

export default products;