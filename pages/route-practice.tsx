import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { CSSProperties } from 'react';
import { Question, UserAnswer } from '../types';

// 更多香港的士筆試路線試題
const routeQuestions: Question[] = [
  {
    id: 320,
    category: "route",
    question: "從沙田富豪花園去屯門市廣場，最直接可行的路線是？",
    options: [
      "A. 城門隧道公路、城門隧道、象鼻山路、屯門公路、屯喜路、屯隆街及屯順街",
      "B. 大老山隧道、觀塘繞道、西區海底隧道、屯門公路",
      "C. 獅子山隧道、大埔公路、青山公路",
      "D. 沙田鄉事會路、青沙公路、屯門公路"
    ],
    correct: 0,
    explanation: "從沙田富豪花園去屯門市廣場的最直接路線是經城門隧道公路、城門隧道、象鼻山路、屯門公路、屯喜路、屯隆街及屯順街"
  },
  {
    id: 321,
    category: "route",
    question: "從深水埗南昌邨去港鐵上水站，最直接可行的路線是？",
    options: [
      "A. 深旺道、連翔道、青沙公路、尖山隧道、吐露港公路、粉嶺公路及新運路",
      "B. 長沙灣道、獅子山隧道、大埔公路、粉嶺公路",
      "C. 彌敦道、大埔公路、吐露港公路",
      "D. 荔枝角道、青沙公路、大老山隧道"
    ],
    correct: 0,
    explanation: "從深水埗南昌邨去港鐵上水站的最直接路線是經深旺道、連翔道、青沙公路、尖山隧道、吐露港公路、粉嶺公路及新運路"
  },
  {
    id: 322,
    category: "route",
    question: "從西貢匡湖居去大口環根德公爵夫人兒童醫院，最直接可行的路線是？",
    options: [
      "A. 清水灣道、太子道東、亞皆老街、櫻桃街、西區海底隧道、干諾道西、城西道、域多利道及大口環道",
      "B. 西貢公路、觀塘繞道、紅磡海底隧道、港島南",
      "C. 清水灣道、將軍澳隧道、東區海底隧道",
      "D. 西貢公路、獅子山隧道、西區海底隧道"
    ],
    correct: 0,
    explanation: "從西貢匡湖居去大口環根德公爵夫人兒童醫院的最直接路線是經清水灣道、太子道東、亞皆老街、櫻桃街、西區海底隧道、干諾道西、城西道、域多利道及大口環道"
  },
  {
    id: 323,
    category: "route",
    question: "從旺角麥花臣遊樂場去海洋公園，最直接可行的路線是？",
    options: [
      "A. 山東街、染布房街、衛理道、康莊道、紅磡海底隧道、香港仔隧道及海洋公園道",
      "B. 彌敦道、西區海底隧道、薄扶林道、海洋公園道",
      "C. 太子道西、東區海底隧道、港島南",
      "D. 山東街、獅子山隧道、紅磡海底隧道"
    ],
    correct: 0,
    explanation: "從旺角麥花臣遊樂場去海洋公園的最直接路線是經山東街、染布房街、衛理道、康莊道、紅磡海底隧道、香港仔隧道及海洋公園道"
  },
  {
    id: 324,
    category: "route",
    question: "從香港大學去太古城中心，最直接可行的路線是？",
    options: [
      "A. 薄扶林道、干諾道西、中環及灣仔繞道隧道、東區走廊、太古灣道及太古城道",
      "B. 薄扶林道、西區海底隧道、觀塘繞道、太古城道",
      "C. 般咸道、紅磡海底隧道、東區走廊",
      "D. 薄扶林道、香港仔隧道、東區海底隧道"
    ],
    correct: 0,
    explanation: "從香港大學去太古城中心的最直接路線是經薄扶林道、干諾道西、中環及灣仔繞道隧道、東區走廊、太古灣道及太古城道"
  },
  {
    id: 325,
    category: "route",
    question: "從紅磡高山劇場去長沙灣廣場，最直接可行的路線是？",
    options: [
      "A. 信用街、佛光街、培正道、梭椏道、亞皆老街、彌敦道、荔枝角道、大南西街及長沙灣道",
      "B. 漆咸道北、西區海底隧道、長沙灣道",
      "C. 康莊道、獅子山隧道、荔枝角道",
      "D. 暢運道、東九龍走廊、長沙灣道"
    ],
    correct: 0,
    explanation: "從紅磡高山劇場去長沙灣廣場的最直接路線是經信用街、佛光街、培正道、梭椏道、亞皆老街、彌敦道、荔枝角道、大南西街及長沙灣道"
  },
  {
    id: 326,
    category: "route",
    question: "從荃灣沙咀道遊樂場去沙田中心，最直接可行的路線是？",
    options: [
      "A. 大河道、象鼻山道、城門隧道、沙田鄉事會路、源禾路及担杆莆街",
      "B. 荃灣路、青沙公路、沙田圍路",
      "C. 青山公路、獅子山隧道、沙田市中心",
      "D. 屯門公路、城門隧道、大埔公路"
    ],
    correct: 0,
    explanation: "從荃灣沙咀道遊樂場去沙田中心的最直接路線是經大河道、象鼻山道、城門隧道、沙田鄉事會路、源禾路及担杆莆街"
  },
  {
    id: 327,
    category: "route",
    question: "從九龍塘香港浸會大學大學會堂去灣仔鷹君中心，最直接可行的路線是？",
    options: [
      "A. 窩打老道、公主道、紅磡海底隧道、告士打道及港灣道",
      "B. 達之路、東九龍走廊、東區海底隧道",
      "C. 歌和老街、獅子山隧道、西區海底隧道",
      "D. 聯合道、大老山隧道、紅磡海底隧道"
    ],
    correct: 0,
    explanation: "從九龍塘香港浸會大學大學會堂去灣仔鷹君中心的最直接路線是經窩打老道、公主道、紅磡海底隧道、告士打道及港灣道"
  },
  {
    id: 328,
    category: "route",
    question: "從九龍公共圖書館去跑馬地馬場，最直接可行的路線是？",
    options: [
      "A. 培正道、公主道、康莊道、紅磡海底隧道、堅拿道天橋及黃泥涌道",
      "B. 彌敦道、西區海底隧道、跑馬地道",
      "C. 何文田街、東九龍走廊、東區海底隧道",
      "D. 窩打老道、大老山隧道、紅磡海底隧道"
    ],
    correct: 0,
    explanation: "從九龍公共圖書館去跑馬地馬場的最直接路線是經培正道、公主道、康莊道、紅磡海底隧道、堅拿道天橋及黃泥涌道"
  },
  {
    id: 329,
    category: "route",
    question: "從長沙灣政府合署去觀塘區警署，最直接可行的路線是？",
    options: [
      "A. 長沙灣道、界限街、太子道東、觀塘道及鯉魚門道",
      "B. 荔枝角道、西九龍走廊、觀塘繞道",
      "C. 青山公路、大老山隧道、觀塘道",
      "D. 美孚路、西區海底隧道、東區海底隧道"
    ],
    correct: 0,
    explanation: "從長沙灣政府合署去觀塘區警署的最直接路線是經長沙灣道、界限街、太子道東、觀塘道及鯉魚門道"
  },
  {
    id: 330,
    category: "route",
    question: "從西九文化區戲曲中心去九龍灣德福廣場，最直接可行的路線是？",
    options: [
      "A. 柯士甸道、漆咸道北、東九龍走廊、啟德隧道、啟福道及偉業街",
      "B. 廣東道、紅磡海底隧道、觀塘繞道",
      "C. 佐敦道、大老山隧道、偉業街",
      "D. 海泓道、西區海底隧道、東九龍走廊"
    ],
    correct: 0,
    explanation: "從西九文化區戲曲中心去九龍灣德福廣場的最直接路線是經柯士甸道、漆咸道北、東九龍走廊、啟德隧道、啟福道及偉業街"
  },
  {
    id: 331,
    category: "route",
    question: "從觀塘秀茂坪邨去香港中央圖書館，最直接可行的路線是？",
    options: [
      "A. 秀茂坪道、將軍澳道、啟田道、東區海底隧道、英皇道及高士威道",
      "B. 清水灣道、紅磡海底隧道、告士打道",
      "C. 順安道、大老山隧道、西區海底隧道",
      "D. 觀塘道、東九龍走廊、紅磡海底隧道"
    ],
    correct: 0,
    explanation: "從觀塘秀茂坪邨去香港中央圖書館的最直接路線是經秀茂坪道、將軍澳道、啟田道、東區海底隧道、英皇道及高士威道"
  },
  {
    id: 332,
    category: "route",
    question: "從海富中心去葵興政府合署，最直接可行的路線是？",
    options: [
      "A. 德立街、夏慤道、告士打道、紅磡海底隧道、西九龍走廊、葵涌道及興芳路",
      "B. 金鐘道、西區海底隧道、荃灣路、葵涌道",
      "C. 皇后大道中、東區海底隧道、觀塘繞道",
      "D. 干諾道中、青嶼幹線、葵涌道"
    ],
    correct: 0,
    explanation: "從海富中心去葵興政府合署的最直接路線是經德立街、夏慤道、告士打道、紅磡海底隧道、西九龍走廊、葵涌道及興芳路"
  },
  {
    id: 333,
    category: "route",
    question: "從青衣灝景灣去沙田車公廟，最直接可行的路線是？",
    options: [
      "A. 青衣鄉事會路、青衣南橋、呈祥道、青沙公路、尖山隧道、車公廟路及翠田街",
      "B. 青康路、城門隧道、沙田鄉事會路",
      "C. 青衣路、荃灣路、大老山隧道",
      "D. 楓樹窩路、屯門公路、獅子山隧道"
    ],
    correct: 0,
    explanation: "從青衣灝景灣去沙田車公廟的最直接路線是經青衣鄉事會路、青衣南橋、呈祥道、青沙公路、尖山隧道、車公廟路及翠田街"
  },
  {
    id: 334,
    category: "route",
    question: "從鴨脷洲利東邨去佐敦拔萃女書院，最直接可行的路線是？",
    options: [
      "A. 鴨脷洲大橋、香港仔隧道、紅磡海底隧道、加士居道及佐敦道",
      "B. 利東邨道、西區海底隧道、佐敦道",
      "C. 鴨脷洲徑、東區海底隧道、彌敦道",
      "D. 香港仔海傍道、薄扶林道、西區海底隧道"
    ],
    correct: 0,
    explanation: "從鴨脷洲利東邨去佐敦拔萃女書院的最直接路線是經鴨脷洲大橋、香港仔隧道、紅磡海底隧道、加士居道及佐敦道"
  },
  {
    id: 335,
    category: "route",
    question: "從上水廣場去入境事務處總部，最直接可行的路線是？",
    options: [
      "A. 粉嶺公路、吐露港公路、大老山公路、大老山隧道、觀塘繞道、將軍澳道、環保大道及寶邑路",
      "B. 新運路、大埔公路、獅子山隧道、將軍澳隧道",
      "C. 上水鄉事會路、青沙公路、東九龍走廊",
      "D. 龍琛路、東鐵綫、將軍澳綫"
    ],
    correct: 0,
    explanation: "從上水廣場去入境事務處總部的最直接路線是經粉嶺公路、吐露港公路、大老山公路、大老山隧道、觀塘繞道、將軍澳道、環保大道及寶邑路"
  },
  {
    id: 336,
    category: "route",
    question: "從九龍塘商業電台去電視廣播城，最直接可行的路線是？",
    options: [
      "A. 廣播道、竹園道、龍翔道、觀塘道、將軍澳道、環保大道及駿日街",
      "B. 歌和老街、大老山隧道、將軍澳隧道",
      "C. 達之路、東九龍走廊、將軍澳道",
      "D. 窩打老道、獅子山隧道、清水灣道"
    ],
    correct: 0,
    explanation: "從九龍塘商業電台去電視廣播城的最直接路線是經廣播道、竹園道、龍翔道、觀塘道、將軍澳道、環保大道及駿日街"
  },
  {
    id: 337,
    category: "route",
    question: "從九龍塘又一城去沙田大會堂，最直接可行的路線是？",
    options: [
      "A. 達之路、歌和老街、窩打老道、獅子山隧道、大涌橋路、沙田鄉事會路、源禾路及担杆莆街",
      "B. 聯合道、大老山隧道、沙田市中心",
      "C. 歌和老街、青沙公路、沙田圍路",
      "D. 窩打老道、城門隧道、沙田鄉事會路"
    ],
    correct: 0,
    explanation: "從九龍塘又一城去沙田大會堂的最直接路線是經達之路、歌和老街、窩打老道、獅子山隧道、大涌橋路、沙田鄉事會路、源禾路及担杆莆街"
  },
  {
    id: 338,
    category: "route",
    question: "從香港大球場去荔枝角公共圖書館，最直接可行的路線是？",
    options: [
      "A. 加路連山道、連道、黃泥涌道、堅拿道天橋、紅磡海底隧道、加士居道天橋、西九龍走廊、荔枝角道、美荔道及荔灣道",
      "B. 掃桿埔大球場徑、東區海底隧道、觀塘繞道",
      "C. 體育路、西區海底隧道、荔枝角道",
      "D. 東院道、紅磡海底隧道、彌敦道"
    ],
    correct: 0,
    explanation: "從香港大球場去荔枝角公共圖書館的最直接路線是經加路連山道、連道、黃泥涌道、堅拿道天橋、紅磡海底隧道、加士居道天橋、西九龍走廊、荔枝角道、美荔道及荔灣道"
  },
  {
    id: 339,
    category: "route",
    question: "從元朗形點I去港鐵大學站的士站，最直接可行的路線是？",
    options: [
      "A. 錦田公路、林錦公路、吐露港公路及澤祥街",
      "B. 青山公路、屯門公路、城門隧道、大埔公路",
      "C. 元朗安樂路、大欖隧道、青沙公路",
      "D. 朗日路、新田公路、粉嶺公路"
    ],
    correct: 0,
    explanation: "從元朗形點I去港鐵大學站的士站的最直接路線是經錦田公路、林錦公路、吐露港公路及澤祥街"
  },
  {
    id: 340,
    category: "route",
    question: "從荃灣環宇海灣去米埔自然保護區，最直接可行的路線是？",
    options: [
      "A. 荃灣路、屯門公路、大欖隧道、青朗公路、新田公路、青山公路米埔段及担竿洲路",
      "B. 青山公路、元朗公路、錦田公路",
      "C. 荃灣路、城門隧道、粉嶺公路",
      "D. 大河道、屯門公路、元朗公路"
    ],
    correct: 0,
    explanation: "從荃灣環宇海灣去米埔自然保護區的最直接路線是經荃灣路、屯門公路、大欖隧道、青朗公路、新田公路、青山公路米埔段及担竿洲路"
  },
  {
    id: 341,
    category: "route",
    question: "從薄扶林數碼港去灣仔胡忠大廈，最直接可行的路線是？",
    options: [
      "A. 數碼港道、沙灣徑、域多利道、沙宣道、薄扶林道、般咸道、堅道、上亞厘畢道、花園道、金鐘道及皇后大道東",
      "B. 數碼港道、西區海底隧道、灣仔道",
      "C. 沙灣徑、香港仔隧道、紅磡海底隧道",
      "D. 域多利道、東區海底隧道、告士打道"
    ],
    correct: 0,
    explanation: "從薄扶林數碼港去灣仔胡忠大廈的最直接路線是經數碼港道、沙灣徑、域多利道、沙宣道、薄扶林道、般咸道、堅道、上亞厘畢道、花園道、金鐘道及皇后大道東"
  },
  {
    id: 342,
    category: "route",
    question: "從薄扶林華富邨去大潭香港木球會，最直接可行的路線是？",
    options: [
      "A. 華富道、石排灣道、香港仔海傍道、南風道、深水灣道及黃泥涌峽道",
      "B. 華富道、薄扶林道、跑馬地道",
      "C. 瀑布灣道、香港仔隧道、大潭道",
      "D. 石排灣道、東區海底隧道、大潭路"
    ],
    correct: 0,
    explanation: "從薄扶林華富邨去大潭香港木球會的最直接路線是經華富道、石排灣道、香港仔海傍道、南風道、深水灣道及黃泥涌峽道"
  },
  {
    id: 343,
    category: "route",
    question: "從元朗大會堂去馬鞍山新港城中心，最直接可行的路線是？",
    options: [
      "A. 青山公路、錦田公路、林錦公路、吐露港公路、大老山公路、馬鞍山路及西沙路",
      "B. 青山公路、屯門公路、獅子山隧道、沙田公路",
      "C. 錦田公路、青沙公路、大老山隧道、馬鞍山路",
      "D. 朗日路、大欖隧道、城門隧道、馬鞍山路"
    ],
    correct: 0,
    explanation: "從元朗大會堂去馬鞍山新港城中心的最直接路線是經青山公路、錦田公路、林錦公路、吐露港公路、大老山公路、馬鞍山路及西沙路"
  },
  {
    id: 344,
    category: "route",
    question: "從大埔科學園去鑽石山星河明居，最直接可行的路線是？",
    options: [
      "A. 科學園路、大老山公路、大老山隧道、鳳德道及龍蟠街",
      "B. 澤祥街、吐露港公路、獅子山隧道、龍翔道",
      "C. 科學園路、粉嶺公路、青沙公路、大老山隧道",
      "D. 汀角路、大埔公路、獅子山隧道、彩虹道"
    ],
    correct: 0,
    explanation: "從大埔科學園去鑽石山星河明居的最直接路線是經科學園路、大老山公路、大老山隧道、鳳德道及龍蟠街"
  },
  {
    id: 345,
    category: "route",
    question: "從香港文華東方酒店去赤柱美利樓，最直接可行的路線是？",
    options: [
      "A. 遮打道、金鐘道、皇后大道東、司徒拔道、黃泥涌峽道、淺水灣道、赤柱峽道及赤柱村道",
      "B. 干諾道中、紅磡海底隧道、香港仔隧道、赤柱道",
      "C. 金鐘道、西區海底隧道、薄扶林道、赤柱峽道",
      "D. 皇后大道中、香港仔隧道、深水灣道、赤柱道"
    ],
    correct: 0,
    explanation: "從香港文華東方酒店去赤柱美利樓的最直接路線是經遮打道、金鐘道、皇后大道東、司徒拔道、黃泥涌峽道、淺水灣道、赤柱峽道及赤柱村道"
  },
  {
    id: 346,
    category: "route",
    question: "從何文田土木工程拓展署大樓去九龍灣機電工程署總部大樓，最直接可行的路線是？",
    options: [
      "A. 忠孝街、佛光街、馬頭圍道、土瓜灣道、承啟道及啟成街",
      "B. 常盛街、公主道、東九龍走廊、啟成街",
      "C. 培正道、太子道東、觀塘道、啟成街",
      "D. 迦密道、漆咸道北、啟德隧道、啟成街"
    ],
    correct: 0,
    explanation: "從何文田土木工程拓展署大樓去九龍灣機電工程署總部大樓的最直接路線是經忠孝街、佛光街、馬頭圍道、土瓜灣道、承啟道及啟成街"
  },
  {
    id: 347,
    category: "route",
    question: "從紅磡置富都會去北角廉政公署總部大樓，最直接可行的路線是？",
    options: [
      "A. 暢運道、科學館道、康莊道、紅磡海底隧道、東區走廊及渣華道",
      "B. 漆咸道北、東九龍走廊、東區海底隧道、渣華道",
      "C. 蕪湖街、加士居道、紅磡海底隧道、告士打道",
      "D. 紅磡道、西區海底隧道、干諾道中、告士打道"
    ],
    correct: 0,
    explanation: "從紅磡置富都會去北角廉政公署總部大樓的最直接路線是經暢運道、科學館道、康莊道、紅磡海底隧道、東區走廊及渣華道"
  },
  {
    id: 348,
    category: "route",
    question: "從香港體育學院去荃灣城門谷運動場，最直接可行的路線是？",
    options: [
      "A. 源禾路、大埔公路沙田段、城門隧道、象山邨西路及城門道",
      "B. 沙田鄉事會路、青沙公路、荃灣路、城門道",
      "C. 火炭路、大埔公路、城門隧道公路、城門道",
      "D. 源禾路、沙田第一城、城門隧道、荃灣路"
    ],
    correct: 0,
    explanation: "從香港體育學院去荃灣城門谷運動場的最直接路線是經源禾路、大埔公路沙田段、城門隧道、象山邨西路及城門道"
  },
  {
    id: 349,
    category: "route",
    question: "從葵芳葵青劇院去中環碼頭，最直接可行的路線是？",
    options: [
      "A. 荃灣路、青葵公路、西九龍公路、西區海底隧道、干諾道西及民光街",
      "B. 葵涌道、荃灣路、屯門公路、青朗公路、西區海底隧道",
      "C. 葵富路、青衣北橋、青衣南橋、長青隧道、西九龍公路",
      "D. 葵青路、青荃路、荃灣路、紅磡海底隧道、干諾道中"
    ],
    correct: 0,
    explanation: "從葵芳葵青劇院去中環碼頭的最直接路線是經荃灣路、青葵公路、西九龍公路、西區海底隧道、干諾道西及民光街"
  },
  {
    id: 350,
    category: "route",
    question: "從基督教聯合醫院去旺角區警署，最直接可行的路線是？",
    options: [
      "A. 協和街、順利邨道、新清水灣道、太子道東及太子道西",
      "B. 秀茂坪道、觀塘道、龍翔道、太子道西",
      "C. 順利邨道、將軍澳隧道、觀塘繞道、太子道東",
      "D. 協和街、清水灣道、獅子山隧道、太子道西"
    ],
    correct: 0,
    explanation: "從基督教聯合醫院去旺角區警署的最直接路線是經協和街、順利邨道、新清水灣道、太子道東及太子道西"
  },
  {
    id: 351,
    category: "route",
    question: "從佐敦(西九龍站)巴士總站去銅鑼灣皇悅酒店，最直接可行的路線是？",
    options: [
      "A. 佐敦道、加士居道天橋、康莊道、紅磡海底隧道、維園道及永興街",
      "B. 西九龍站、機場快線、中環站、紅磡海底隧道",
      "C. 佐敦道、彌敦道、紅磡海底隧道、告士打道",
      "D. 柯士甸道、漆咸道北、東九龍走廊、東區海底隧道"
    ],
    correct: 0,
    explanation: "從佐敦(西九龍站)巴士總站去銅鑼灣皇悅酒店的最直接路線是經佐敦道、加士居道天橋、康莊道、紅磡海底隧道、維園道及永興街"
  },
  {
    id: 352,
    category: "route",
    question: "從銅鑼灣禮頓山去九龍城喇沙書院，最直接可行的路線是？",
    options: [
      "A. 黃泥涌道、堅拿道天橋、紅磡海底隧道、公主道、窩打老道、對衡道及喇沙利道",
      "B. 禮頓道、紅磡海底隧道、漆咸道北、馬頭圍道",
      "C. 軒尼詩道、東區海底隧道、觀塘道、太子道東",
      "D. 怡和街、告士打道、紅磡海底隧道、土瓜灣道"
    ],
    correct: 0,
    explanation: "從銅鑼灣禮頓山去九龍城喇沙書院的最直接路線是經黃泥涌道、堅拿道天橋、紅磡海底隧道、公主道、窩打老道、對衡道及喇沙利道"
  },
  {
    id: 353,
    category: "route",
    question: "從將軍澳公共圖書館去香港體育館，最直接可行的路線是？",
    options: [
      "A. 寶康路、將軍澳隧道、觀塘繞道、啟德隧道、東九龍走廊、漆咸道北及暢運道",
      "B. 唐德街、將軍澳隧道、觀塘繞道、太子道東、漆咸道北",
      "C. 培成路、將軍澳公路、東區海底隧道、紅磡海底隧道",
      "D. 寶寧路、將軍澳隧道、啟德隧道、土瓜灣道"
    ],
    correct: 0,
    explanation: "從將軍澳公共圖書館去香港體育館的最直接路線是經寶康路、將軍澳隧道、觀塘繞道、啟德隧道、東九龍走廊、漆咸道北及暢運道"
  },
  {
    id: 354,
    category: "route",
    question: "從啟德工業貿易大樓去高等法院，最直接可行的路線是？",
    options: [
      "A. 協調道、太子道東、漆咸道北、紅磡海底隧道、告士打道、分域街、軒尼詩道及金鐘道",
      "B. 啟成街、觀塘道、龍翔道、獅子山隧道、西區海底隧道",
      "C. 協調道、東九龍走廊、東區海底隧道、告士打道",
      "D. 承啟道、啟德隧道、紅磡海底隧道、金鐘道"
    ],
    correct: 0,
    explanation: "從啟德工業貿易大樓去高等法院的最直接路線是經協調道、太子道東、漆咸道北、紅磡海底隧道、告士打道、分域街、軒尼詩道及金鐘道"
  },
  {
    id: 355,
    category: "route",
    question: "從荃灣荃豐中心去新蒲崗香港考試及評核局，最直接可行的路線是？",
    options: [
      "A. 青山公路荃灣段、青山公路葵涌段、呈祥道、龍翔道、蒲崗村道、彩虹道及爵祿街",
      "B. 荃灣路、青沙公路、大老山隧道、龍翔道、蒲崗村道",
      "C. 大河道、城門隧道、獅子山隧道、龍翔道、彩虹道",
      "D. 沙咀道、荃灣路、西九龍走廊、呈祥道、龍翔道"
    ],
    correct: 0,
    explanation: "從荃灣荃豐中心去新蒲崗香港考試及評核局的最直接路線是經青山公路荃灣段、青山公路葵涌段、呈祥道、龍翔道、蒲崗村道、彩虹道及爵祿街"
  },
  {
    id: 356,
    category: "route",
    question: "從稅務中心去牛頭角下邨，最直接可行的路線是？",
    options: [
      "A. 經協調道、承啟道、宏照道、啟祥道及牛頭角道",
      "B. 協調道、東九龍走廊、觀塘道、牛頭角道",
      "C. 啟成街、承啟道、觀塘繞道、牛頭角道",
      "D. 協調道、啟德隧道、觀塘道、牛頭角道"
    ],
    correct: 0,
    explanation: "從稅務中心去牛頭角下邨的最直接路線是經協調道、承啟道、宏照道、啟祥道及牛頭角道"
  }
];

const RoutePractice: NextPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);

  const currentQ = routeQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === routeQuestions.length - 1;

  const handleAnswerSelect = (answerIndex: number): void => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = (): void => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQ.correct;
    const userAnswer: UserAnswer = {
      questionId: currentQ.id,
      selected: selectedAnswer,
      correct: currentQ.correct,
      isCorrect
    };

    setUserAnswers(prev => [...prev, userAnswer]);
    setShowResult(true);
  };

  const handleNextQuestion = (): void => {
    if (isLastQuestion) {
      setIsCompleted(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const calculateScore = (): number => {
    const correctAnswers = userAnswers.filter(answer => answer.isCorrect).length;
    return Math.round((correctAnswers / routeQuestions.length) * 100);
  };

  const getScoreGrade = (score: number): string => {
    if (score >= 80) return "優秀";
    if (score >= 70) return "良好";
    if (score >= 60) return "及格";
    return "需要加強";
  };

  const resetPractice = (): void => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setUserAnswers([]);
    setIsCompleted(false);
    setShowReview(false);
  };

  if (isCompleted && !showReview) {
    const score = calculateScore();
    const grade = getScoreGrade(score);
    
    return (
      <div>
        <Head>
          <title>路線練習結果 - 香港的士筆試練習</title>
          <meta name="description" content="香港的士筆試路線練習結果" />
        </Head>
        
        <main style={styles.main}>
          <div style={styles.container}>
            <div style={styles.header}>
              <Link href="/practice">
                <button style={styles.backButton}>← 返回練習選擇</button>
              </Link>
            </div>

            <div style={styles.resultCard}>
              <h1 style={styles.title}>🛣️ 路線練習完成！</h1>
              <div style={styles.scoreText}>
                你的得分：{score}% ({grade})
              </div>
              <p style={{ color: score >= 70 ? '#4CAF50' : '#f44336', fontSize: '1.2rem' }}>
                {score >= 70 ? '恭喜！你對香港路線有良好的認識' : '建議多熟悉香港的主要道路和隧道'}
              </p>
              
              <div style={styles.buttonGroup}>
                <button 
                  style={styles.button}
                  onClick={() => setShowReview(true)}
                >
                  檢視答案
                </button>
                <button 
                  style={styles.button}
                  onClick={resetPractice}
                >
                  重新練習
                </button>
                <Link href="/practice" style={{...styles.button, ...styles.secondaryButton}}>
                  返回練習
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (showReview) {
    return (
      <div>
        <Head>
          <title>答案檢視 - 路線練習</title>
          <meta name="description" content="檢視路線練習的詳細答案" />
        </Head>
        
        <main style={styles.main}>
          <div style={styles.container}>
            <div style={styles.header}>
              <button 
                style={styles.backButton}
                onClick={() => setShowReview(false)}
              >
                ← 返回結果
              </button>
            </div>

            <div style={styles.reviewSection}>
              <h1 style={styles.reviewTitle}>🛣️ 答案檢視</h1>
              
              {routeQuestions.map((question, index) => {
                const userAnswer = userAnswers[index];
                return (
                  <div key={question.id} style={styles.reviewItem}>
                    <div style={styles.reviewQuestion}>
                      {index + 1}. {question.question}
                    </div>
                    <div style={styles.reviewAnswer}>
                      你的答案：{question.options[userAnswer.selected]} 
                      {userAnswer.isCorrect ? 
                        <span style={{ color: '#4CAF50', marginLeft: '10px' }}>✓ 正確</span> : 
                        <span style={{ color: '#f44336', marginLeft: '10px' }}>✗ 錯誤</span>
                      }
                    </div>
                    {!userAnswer.isCorrect && (
                      <div style={styles.reviewAnswer}>
                        正確答案：{question.options[question.correct]}
                      </div>
                    )}
                    <div style={styles.explanation}>
                      {question.explanation}
                    </div>
                  </div>
                );
              })}

              <div style={styles.buttonGroup}>
                <button 
                  style={styles.button}
                  onClick={resetPractice}
                >
                  重新練習
                </button>
                <Link href="/practice" style={{...styles.button, ...styles.secondaryButton}}>
                  返回練習選擇
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>路線試題練習 - 香港的士筆試練習</title>
        <meta name="description" content="練習香港道路、隧道和行車路線題目" />
      </Head>
      
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.header}>
            <Link href="/practice">
              <button style={styles.backButton}>← 返回練習選擇</button>
            </Link>
            <div style={styles.progress}>
              第 {currentQuestion + 1} 題，共 {routeQuestions.length} 題
            </div>
          </div>

          <div style={styles.disclaimer}>
            <p style={styles.disclaimerText}>
              📋 題庫內容適用於 2025 年 2 月 3 日及以後的考試，此題庫乃用作參考用途，並無任何法律效力，運輸署駕駛事務組可據實際情況或需要，作出修改，而不另行通知。
            </p>
          </div>

          <div style={styles.questionCard}>
            <h2 style={styles.questionText}>{currentQ.question}</h2>
            
            <div style={styles.optionsContainer}>
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  style={{
                    ...styles.optionButton,
                    ...(selectedAnswer === index ? styles.selectedOption : {}),
                    ...(showResult ? (
                      index === currentQ.correct ? styles.correctOption :
                      index === selectedAnswer && selectedAnswer !== currentQ.correct ? styles.incorrectOption : {}
                    ) : {})
                  }}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  {option}
                </button>
              ))}
            </div>

            {!showResult ? (
              <button
                style={{
                  ...styles.submitButton,
                  ...(selectedAnswer === null ? styles.disabledButton : {})
                }}
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                確認答案
              </button>
            ) : (
              <div style={styles.resultContainer}>
                <div 
                  style={{
                    ...styles.resultText,
                    color: selectedAnswer === currentQ.correct ? '#4CAF50' : '#f44336'
                  }}
                >
                  {selectedAnswer === currentQ.correct ? '✓ 答對了！' : '✗ 答錯了'}
                </div>
                <div style={styles.explanation}>
                  {currentQ.explanation}
                </div>
                <button
                  style={styles.nextButton}
                  onClick={handleNextQuestion}
                >
                  {isLastQuestion ? '查看結果' : '下一題'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  main: {
    minHeight: '100vh',
    padding: '2rem 0',
    background: 'linear-gradient(135deg, #003f7f 0%, #001a3a 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  } as const,
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 2rem',
  } as const,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  } as const,
  backButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  } as const,
  progress: {
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
  } as const,
  title: {
    textAlign: 'center' as const,
    color: '#333',
    fontSize: '2rem',
    marginBottom: '1rem',
  } as const,
  questionCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  } as const,
  questionText: {
    fontSize: '1.4rem',
    marginBottom: '2rem',
    color: '#333',
    lineHeight: '1.5',
  } as const,
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    marginBottom: '2rem',
  } as const,
  optionButton: {
    padding: '1rem',
    fontSize: '1.1rem',
    backgroundColor: '#f8f9fa',
    border: '2px solid transparent',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textAlign: 'left' as const,
  } as const,
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
  } as const,
  correctOption: {
    backgroundColor: '#e8f5e8',
    borderColor: '#4CAF50',
    color: '#2e7d32',
  } as const,
  incorrectOption: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    color: '#c62828',
  } as const,
  submitButton: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  } as const,
  disabledButton: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  } as const,
  resultContainer: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
  } as const,
  resultText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  } as const,
  explanation: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '1rem',
    lineHeight: '1.5',
  } as const,
  nextButton: {
    padding: '0.8rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  } as const,
  resultCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '2rem',
    textAlign: 'center' as const,
    marginBottom: '2rem',
  } as const,
  scoreText: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  } as const,
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '2rem',
  } as const,
  button: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
  } as const,
  secondaryButton: {
    backgroundColor: '#757575',
  } as const,
  reviewSection: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '2rem',
  } as const,
  reviewTitle: {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#333',
  } as const,
  reviewItem: {
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem',
    marginBottom: '1rem',
  } as const,
  reviewQuestion: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#333',
  } as const,
  reviewAnswer: {
    marginBottom: '0.5rem',
    fontWeight: '500',
  } as const,
  disclaimer: {
    maxWidth: '800px',
    margin: '0 auto 1.5rem auto',
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  } as const,
  disclaimerText: {
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 1.4,
    margin: 0,
    textAlign: 'center' as const,
  } as const,
};

export default RoutePractice;
