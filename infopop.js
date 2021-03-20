
const additions = `
<style>
#tooltip {
  position:absolute;
  display:none;
  border:grey solid 1px;
  background:white;
}
#cal1{
  position:absolute;
  height:0px;
  width:0px;
  top:100px;
  left:100px;
  overflow:none;
  z-index:-100;
}
#cal2{
  position:absolute;
  height:0px;
  width:0px;
  top:0px;
  left:0px;
  overflow:none;
  z-index:-100;
}
</style>
<div id="cal1">&nbsp;</div>
<div id="cal2">&nbsp;</div>
<div id="tooltip">
  <img width='100' height='100' id='infopop'>
</div>
<script>axios.js</script>
`;

document.body.innerHTML += additions;

const TEST = '123abc';

const GOOGLE_API_URL = 'https://www.googleapis.com/customsearch/v1';
const API_KEY = 'AIzaSyDOW-85iv_Lg9oELduvYS2Fl0bmuLAK5E0';
const CS = '834ea7cbdfc762036';

//console.log('..ss..');

var ele = document.getElementById('tooltip');
var sel = window.getSelection();
var rel1= document.createRange();
rel1.selectNode(document.getElementById('cal1'));
var rel2= document.createRange();
rel2.selectNode(document.getElementById('cal2'));
window.addEventListener('mouseup', async function () {
  //console.log('mouse down');
  const text = getSelectedText();
  //console.log(text);
  const results = await google_image_search(text);
  const thumbNailURL = thumbNailFromResults(results);
  const imageElement = document.getElementById('infopop');
  imageElement.src = thumbNailURL;
    if (!sel.isCollapsed) {
        //debugger;
        var r = sel.getRangeAt(0).getBoundingClientRect();
        var rb1 = rel1.getBoundingClientRect();
        var rb2 = rel2.getBoundingClientRect();
        ele.style.top = (r.bottom - rb2.top)*100/(rb1.top-rb2.top) + 'px'; //this will place ele below the selection
        ele.style.left = (r.left - rb2.left)*100/(rb1.left-rb2.left) + 'px'; //this will align the right edges together
        ele.style.display = 'block';
    }
});

window.addEventListener('mousedown', function () {
    ele.style.display = 'none';
});

function getSelectedText() {
  var text = "";
  //console.log('text');
  if (typeof window.getSelection != "undefined") {
      text = window.getSelection().toString();
  } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
      text = document.selection.createRange().text;
  }
  return text;
}

function thumbNailFromResults(results, index = 0){
  return results.data.items[index].image.thumbnailLink;
}


async function google_image_search(searchTerm){
  //console.log('gis')
  console.log('start gis');
  const response = await axios({
    method:'GET',
    url:GOOGLE_API_URL,
    params:{
      q:searchTerm,
      num:1,
      searchType:'image',
      key:API_KEY,
      cx:CS,
    }
  });
  console.log('end gis');
  return response;
}






// const additions = `
// <style>
//   #tooltip {
//     position:absolute;
//     display:none;
//     border:grey solid 1px;
//     background:white;
//   }
//   #cal1{
//     position:absolute;
//     height:0px;
//     width:0px;
//     top:100px;
//     left:100px;
//     overflow:none;
//     z-index:-100;
//   }
//   #cal2{
//     position:absolute;
//     height:0px;
//     width:0px;
//     top:0px;
//     left:0px;
//     overflow:none;
//     z-index:-100;
//   }
// </style>
// <p>test</p>
// <div id="cal1">&nbsp;</div>
// <div id="cal2">&nbsp;</div>
// <div id="tooltip">
//   <p>...</p>
//   <img src='' width='100' height='100' id='infopop'>
// </div>
// <script src='https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js'></script>
// `;

// console.log('...');

// document.body.innerHTML += additions;
// const GOOGLE_API_URL = 'https://www.googleapis.com/customsearch/v1';
// const API_KEY = 'AIzaSyDOW-85iv_Lg9oELduvYS2Fl0bmuLAK5E0';
// const CX = '834ea7cbdfc762036';

// async function google_image_search(searchTerm){
//   console.log('gis');
//   const response = await axios({
//     method:'GET',
//     url:GOOGLE_API_URL,
//     params:{
//       q:searchTerm,
//       num:1,
//       searchType:'image',
//       key:API_KEY,
//       cx:CX,
//     }
//   });
//   console.log('ges');
//   return response;
// }

// var ele = document.getElementById('tooltip');
// var sel = window.getSelection();
// var rel1= document.createRange();
// rel1.selectNode(document.getElementById('cal1'));
// var rel2= document.createRange();
// rel2.selectNode(document.getElementById('cal2'));
// window.addEventListener('mouseup', async function () {
//   const text = getSelectedText();
//   const results = await google_image_search(text);
//   const thumbnailURL = thumbnailFromResults(results);
//   const imageElement = document.getElementById('infopop');
//   imageElement.src = thumbnailURL;
//     if (!sel.isCollapsed) {
//         debugger;
//         var r = sel.getRangeAt(0).getBoundingClientRect();
//         var rb1 = rel1.getBoundingClientRect();
//         var rb2 = rel2.getBoundingClientRect();
//         ele.style.top = (r.bottom - rb2.top)*100/(rb1.top-rb2.top) + 'px'; //this will place ele below the selection
//         ele.style.left = (r.left - rb2.left)*100/(rb1.left-rb2.left) + 'px'; //this will align the right edges together
//         ele.style.display = 'block';
//     }
// });

// window.addEventListener('mousedown', function () {
//     ele.style.display = 'none';
//     console.log('down');
// });

// function getSelectedText() {
//   var text = "";
//   if (typeof window.getSelection != "undefined") {
//       text = window.getSelection().toString();
//   } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
//       text = document.selection.createRange().text;
//   }
//   return text;
// }

// function thumbnailFromResults(results, index = 0){
//   return results.data.items[index].image.thumbnailLink;
// }

