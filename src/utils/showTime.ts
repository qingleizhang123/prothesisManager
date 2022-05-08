export function showTime(){
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() + 1;//0~11
  const date = d.getDate();

  let week = d.getDay();//0~6 0是周日
  week = numOfChinese(week);

  const hour = doubleNum(d.getHours());
  const min = doubleNum(d.getMinutes());
  const sec = doubleNum(d.getSeconds());

  const str = year + "年" + month + "月" + date + "日 星期" + week + " " + hour + ":" + min + ":" + sec;
  return str;
}

//数字转成中文
function numOfChinese(num){
  const arr = ["日","一","二","三","四","五","六"];
  return arr[num];
}

function doubleNum(n){
  if(n < 10){
      return "0" + n;
  }else{
      return n;
  }
}

