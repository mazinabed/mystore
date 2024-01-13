import Img1 from "../images/img-1.png";
import Img2 from "../images/img-2.JPG";
import Img4 from "../images/img-4.JPG";
import Img5 from "../images/img-5.JPG";
import Img6 from "../images/img-6.JPG";
import Img8 from "../images/img-8.JPG";
import Img9 from "../images/img-9.JPG";


export function getData() {
  return [
    { title: "عصير سموثي كوري",description: "20x250 مل", price: 25000000, Image: Img1,id:1 },
    { title: "ريد بل زيرو سكر",description: "24x250 مل", price: 15, Image: Img2,id:2 },
    { title: "ريد بل معدني روسي",description: "24x250 مل", price: 3.5, Image: Img4 ,id:3},
    { title: "بيبسي ماكس زيرو",description: "24x330 مل", price: 13.99, Image: Img5,id:4 },
    { title: "عصير فارتونا فواكه دايت",description: "15x250 مل", price: 2.5, Image: Img6,id:5 },
    { title: " شاي لبتون الاخضر",description: "24x330 مل", price: 0.99, Image: Img8,id:6 },
    { title: "ريد بل انكليزي",description: "12x473 مل", price: 2.99, Image: Img9,id:7 },
  ];
}
