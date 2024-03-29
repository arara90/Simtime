export function getStrYear(date) {
  return date.getFullYear().toString();
}

export function getStrMonth(date, type = "mm") {
  type.toLowerCase();
  if (type == "mm") {
    return ("0" + (date.getMonth() + 1).toString()).substr(-2);
  } else {
    return (date.getMonth() + 1).toString();
  }
}

export function getStrDate(date, type = "dd") {
  type.toLowerCase();
  if (type == "dd") {
    return ("0" + date.getDate().toString()).substr(-2);
  } else {
    return date.getDate().toString();
  }
}

export function getFullTime(date){
  return ('0'+date.getHours()).slice(-2) + ":" + ('0'+date.getMinutes()).slice(-2)
}


export function getStrFullDate(date, type = "yyyymmdd") {
  type.toLowerCase();

  if (type == "yyyymmdd") {
    return getStrYear(date) + getStrMonth(date) + getStrDate(date);
  } else if (type == "yyyy-mm-dd") {
    return `${getStrYear(date)}-${getStrMonth(date)}-${getStrDate(date)}`;
  } else if (type == "yyyy-m-d") {
    return `${getStrYear(date)}-${getStrMonth(date, "m")}-${getStrDate(
      date,
      "d"
    )}`;
  } else if (type == "yyyy/mm/dd") {
    return `${getStrYear(date)}/${getStrMonth(date)}/${getStrDate(date)}`;
  } else if (type == "yyyy/m/d") {
    return `${getStrYear(date)}/${getStrMonth(date, "m")}/${getStrDate(
      date,
      "d"
    )}`;
  } else {
    return `${getStrYear(date)}-${getStrMonth(date)}-${getStrDate(date)}`;
  }
}

export function addDate(date, num) {
  var res = new Date(getStrFullDate(date, "yyyy-m-d"))
  res.setDate(res.getDate() + num);
  return  res
}

export function subDate(date1, date2) {
  var res = Math.round((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
  return res
}

export function subWeek(date1, date2) {
  return Math.round(subDate(date1, date2) / 7);
}

//달력 일자 생성
export function generate(currDate, num=0) {
  // type: n -- 특점 시점으로부터 n주씩,
  // type: 0 -- monthly 달력
  const today = new Date();
  const firstDay = new Date(currDate.getFullYear(), currDate.getMonth(), 1); // 넘겨받은 달의 1일
  const lastDay = new Date(currDate.getFullYear(), currDate.getMonth() + 1, 0); // 넘겨받은 달의 말일
  
  var weekDay = 0;
  var offset = 0;
  var startDate = new Date();
  var endDate = new Date();


  if(num==0){
    weekDay = firstDay.getDay();
    offset = 7 - parseInt((lastDay.getDate() + weekDay) % 7);
    startDate = addDate(firstDay, weekDay * -1);
    endDate = addDate(lastDay, offset < 7 ? offset : 0);


  }else {
    weekDay = currDate.getDay();
    offset = ( (7 *( num -1 ))  + 6 - weekDay); // num weeks
    startDate = addDate(currDate, weekDay * -1);
    endDate = addDate(currDate, offset); 
  }

  var curr = new Date(startDate);

  //한 주차씩 담기용
  var weekDates_orgin = [];
  var weekDates = [];

  //최종 배열
  var dates_origin = [];
  var dates = [];


  while (curr <= endDate) {
    //week별 저장
    weekDates_orgin.push({ id: `${subDate(today, curr)}D`, day: curr });
    weekDates.push({
      id: `${subDate(today, curr)}D`,
      strDate: getStrFullDate(curr, "yyyy-mm-dd"), //"2020-04-15"
      year: curr.getUTCFullYear(),
      month: curr.getMonth() + 1,
      day: curr.getDay(), // 0~6
      isActive: getStrFullDate(curr) >= getStrFullDate(today),
      isActiveMonth:
        getStrFullDate(curr).substr(0, 6) ==
        getStrFullDate(currDate).substr(0, 6),
      date: curr.getDate().toString(), // "15"
    });

    //다음날 저장
    curr.setDate(curr.getDate() + 1);

    if (curr.getDay() == 0) {
      dates_origin.push({
        id: `${subWeek(today, curr)}W`,
        weekDates: weekDates_orgin,
      });

      dates.push({ id: `${subWeek(today, curr)}W`, weekDates: weekDates });
      weekDates_orgin = [];
      weekDates = [];
    }
  }

  return dates;
}
