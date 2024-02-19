'use strict'
// 1行目に記載している 'use strict' は削除しないでください



///////////////////////////////////////////////////////////////////
///  メニューごとの分量　　//////////////////////////////////////////
///////////////////////////////////////////////////////////////////

const curryRecipe = {
  rice: 0.5,
  potato: 0.5,
  carrot: 0.5,
  onion: 0.8,
  beef: 100,
  water: 150,
  roux: 0.2,
}

const bbqRecipe = {
  beef: 300,
  sausage: 1,
  greenpepper: 2,
  onion: 0.5,
}

const hotSandRecipe = {
  bread: 2, 
  egg: 1,
  bacon: 2,
  soup: 1, //人数分ほしい
}

///////////////////////////////////////////////////////////////////
///  お金計算用　///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

const curryMoney = {
  potato: 130,
  carrot: 100,
  onion: 80,
  beef: 400,
  water: 0,
  roux: 500,
}

const bbqMoney = {
  beef: 400,
  sausage: 200,
  greenpepper: 30,
  onion: 80,
}

const hotSandMoney = {
  bread: 20,
  egg: 30,
  bacon: 40,
  soup: 100,
}


///////////////////////////////////////////////////////////////////
///  waightの宣言（大人に対しての割合）　　　　　　　　　//////////////
///////////////////////////////////////////////////////////////////

const weightAdult = 1;         //中学生以上は大人と同じ
const weightElementary = 0.5;  //小学生は大人の半分
const weithtChild = 0.2;       //幼児は大人の1/5


/**　重みづけ人数
 * @param {number}  - 年代別の参加人数
 * @param {number}  - 大人を1としたときの重み
 * @returns {number} -重みづけされた人数。小数点あり。
 */
function weightPeopleCal() {
  return (Number(adultNum.value) * weightAdult) + (Number(elementaryNum.value) * weightElementary) + (Number(childNum.value) * weithtChild);
}



/**　参加者全人数
 * @param {number}  - 年代別の参加人数
 * @returns {number} - 参加人数の総和
 */
function allPeopleCal(){
  return (Number(adultNum.value) + Number(elementaryNum.value) + Number(childNum.value) ) ;
}


/**　材料の分量
 * @param {object} obj - メニューごとの材料:分量
 * @returns {object}　objResult - 分量に重みづけ人数をかけている
 */
function meelCount(obj) {
  let objResult = {};
  for (let key in obj) {
    if (key === "sausage" ){
      objResult[key] = (obj[key] * allPeopleCal()); //ソーセージは1人1本（骨付きイメージ）
      console.log("人数分必要です", key) ;
    } else  if(key === "soup" ){
      objResult[key] = (obj[key] * allPeopleCal()); //スープは1人1杯
      console.log("人数分必要です", key) ;
    } else if(key === "bread" ){
      objResult[key] = (obj[key] * allPeopleCal()); //朝のパンはホットサンドなので1人2枚
      console.log("人数分必要です", key) ;
    } else {
      objResult[key] = Math.ceil(obj[key] * weightPeopleCal());//小数点以下切り上げ
      console.log("重みづけ計算しました", key);
    }
  }
  return objResult;
}




//htmlのIDを変数に格納する
const curryOutput = document.getElementById("curry"); //カレーの材料表示場所を変数に代入
const bbqOutput = document.getElementById("bbq"); //BBQの材料表示場所を変数に代入
const hotsandOutput = document.getElementById("hotsand"); //ホットサンドの材料表示場所を変数に代入


//  「入力完了」ボタンを押したときの動作  /////
//.addEventListenerのコールバック関数には引数を設定できない。（引数付けるとすぐ実行される）
//ここでは以前の結果を初期化する関数initialをコールして、その中で引数が必要となる関数を実行
const button = document.getElementById("finish");
button.addEventListener("click", initial);



/**　output画面初期化、計算関数をメニューごとに呼出
 * @param {object} curryRecipe - カレーの材料:分量
 * @param {object} bbqRecipe - BBQの材料:分量
 * @param {object} hotSandRecipe - ホットサンドの材料:分量
 * @param {object} curryOutput　- htmlでカレーの材料:分量を表示するID
 * @param {object} bbqOutput　- htmlでBBQの材料:分量を表示するID
 * @param {object} hotsandOutput　- htmlでホットサンドの材料:分量を表示するID
 */
function initial(){
  document.getElementById("curry").innerHTML = "";
  document.getElementById("bbq").innerHTML = "";
  document.getElementById("hotsand").innerHTML = "";
  outputBlows(curryRecipe,curryOutput);
  outputBlows(bbqRecipe,bbqOutput);
  outputBlows(hotSandRecipe,hotsandOutput);
}

/**　材料の分量
 * @param {object} objRecipe - 重みづけ計算後の材料:分量
 * @param {object} domOutput - 重みづけ計算後の材料:分量を表示するhtmlのID
 */
function outputBlows(objRecipe,domOutput) {
  const recipeResult = meelCount(objRecipe);
  for(let key in recipeResult){
    if (key === "rice"){
      let value = `${key}  :  ${recipeResult[key]} 合 `;
      const paragraph = document.createElement("p");
      paragraph.textContent = value;
      domOutput.appendChild(paragraph);
    }else if (key === "beef"){
      let value = `${key}  :  ${recipeResult[key]} g `;
      const paragraph = document.createElement("p");
      paragraph.textContent = value;
      domOutput.appendChild(paragraph);
    }else if (key === "water"){
      let value = `${key}  :  ${recipeResult[key]} ml `;
      const paragraph = document.createElement("p");
      paragraph.textContent = value;
      domOutput.appendChild(paragraph);
    }else if (key === "bread"){
      let value = `${key}  :  ${recipeResult[key]} 枚 `;
      const paragraph = document.createElement("p");
      paragraph.textContent = value;
      domOutput.appendChild(paragraph);
    }else if (key === "roux"){
      let value = `${key}  :  ${recipeResult[key]} 箱 `;
      const paragraph = document.createElement("p");
      paragraph.textContent = value;
      domOutput.appendChild(paragraph);
    }else {
      let value = `${key}  :  ${recipeResult[key]} 個 `;
      const paragraph = document.createElement("p");
      paragraph.textContent = value;
      domOutput.appendChild(paragraph);
    }
  }
  //　入力値確認用　コンソール表示
  console.log("大人 = ", adultNum.value);
  console.log("子供 = ", elementaryNum.value);
  console.log("幼児 = ", childNum.value);
  console.log("参加人数合計= ", allPeopleCal());
  console.log("重みづけ大人 = ", Number(adultNum.value) * weightAdult);
  console.log("重みづけ子供 = ", Number(elementaryNum.value) * weightElementary);
  console.log("重みづけ幼児 = ", Number(childNum.value) * weithtChild);
  console.log("重みづけ人数合計= ", weightPeopleCal());
  console.log("カレー材料= ", meelCount(curryRecipe));
  console.log("BBQ材料= ", meelCount(bbqRecipe));
  console.log("ホットサンド材料= ", meelCount(hotSandRecipe));
}




