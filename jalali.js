function TOJALALI(datetime) {

  if (!datetime) return "";

  // =========================
  // 1. Parse input safely
  // =========================
  var baseDate = new Date(datetime);

  if (isNaN(baseDate.getTime())) return "";

  // =========================
  // 2. Apply timezone offset (+07:30)
  // =========================
  var OFFSET_MINUTES = (7 * 60) + 30;
  var date = new Date(baseDate.getTime() + OFFSET_MINUTES * 60 * 1000);

  // =========================
  // 3. Weekdays & Months
  // =========================
  var weekdays = [
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
    "شنبه"
  ];

  var months = [
    "فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور",
    "مهر","آبان","آذر","دی","بهمن","اسفند"
  ];

  // =========================
  // 4. Gregorian date parts
  // =========================
  var gy = date.getUTCFullYear();
  var gm = date.getUTCMonth() + 1;
  var gd = date.getUTCDate();

  var hour = ("0" + date.getUTCHours()).slice(-2);
  var minute = ("0" + date.getUTCMinutes()).slice(-2);

  var g_d_m = [0,31,59,90,120,151,181,212,243,273,304,334];

  // =========================
  // 5. Convert to Jalali
  // =========================
  var jy;
  if (gy > 1600) {
    jy = 979;
    gy -= 1600;
  } else {
    jy = 0;
    gy -= 621;
  }

  var gy2 = (gm > 2) ? (gy + 1) : gy;

  var days =
      (365 * gy)
    + parseInt((gy2 + 3) / 4)
    - parseInt((gy2 + 99) / 100)
    + parseInt((gy2 + 399) / 400)
    - 80
    + gd
    + g_d_m[gm - 1];

  jy += 33 * parseInt(days / 12053);
  days %= 12053;

  jy += 4 * parseInt(days / 1461);
  days %= 1461;

  if (days > 365) {
    jy += parseInt((days - 1) / 365);
    days = (days - 1) % 365;
  }

  var jm, jd;

  if (days < 186) {
    jm = 1 + parseInt(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + parseInt((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }

  // =========================
  // 6. Final output
  // =========================
  var weekday = weekdays[date.getUTCDay()];

  return weekday + " "
      + jd + " "
      + months[jm - 1] + " "
      + jy
      + " ساعت "
      + hour + ":" + minute;
}
