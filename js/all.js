const keyword = document.querySelector(".keyword");
const list = document.querySelector(".list");
const btn = document.querySelector(".btn");

function init(data){  
    let str = "";
  
    data.forEach(function(item){
      str += `<li>${item[2]}</li>`;
    })
    list.innerHTML = str;
}

function getWord1475() {
    return axios.get('https://ting0812.github.io/finalhw_a1073305/txt/word1475.txt');
}
function getWeight1() {
    return axios.get('https://ting0812.github.io/finalhw_a1073305/txt/weight1.txt');
}
function getFilename() {
    return axios.get('https://ting0812.github.io/finalhw_a1073305/txt/filename.txt');
}

btn.addEventListener("click",function(e){
    //輸入的值為 keyword.value
    let num = -1;
    let weight=[];

    
    const word = keyword.value;
    axios.all([getWord1475(), getWeight1(), getFilename()])
    .then(axios.spread(function (getWord, getWei, getFile) {
        // getWord讀第幾個關鍵字
        let ary1 = "";
        ary1 = getWord.data;
        var strAry1 = ary1.split('\n');
        
        strAry1.forEach(function(item,index){
            if(word === item){
                num += index+1;              
            }
        })

        // getWei讀權重
        let ary2 = "";
        ary2 = getWei.data;
        var strAry2 = ary2.split('\n');
        strAry2.forEach(function(item,index){
            strAry2[index]=strAry2[index].split(' ');
        }
        strAry2.forEach(function(item,index){
            if(num != -1){
                if((item[num] !=0) && (item[num] != undefined)){
                    let a=[];
                    a.push(parseFloat(item[num]));
                    a.push(index);
                    weight.push(a);
                }
            } 
        })

        // getFile
        let ary3 = "";
        ary3 = getFile.data;
        var strAry3 = ary3.split('\n');
        weight.forEach(function(item,index){
            item.push(strAry3[item[1]])
        })

        // 排序
        weight.sort(function(x, y){
            return y[0] - x[0];
        });

        init(weight);
        console.log(weight)
        // console.log(parseInt("12"))

    }));
    
})
