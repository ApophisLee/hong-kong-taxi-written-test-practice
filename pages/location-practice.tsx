import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextPage } from 'next';
import { CSSProperties } from 'react';
import { Question, UserAnswer } from '../types';

// 基於香港的士筆試地方題庫的真實地點試題（319個地點）
const locationQuestions: Question[] = [
  // 醫院（1-50）
  {
    id: 1,
    category: "location",
    question: "瑪麗醫院位於哪個地方？",
    options: ["A. 薄扶林", "B. 沙田", "C. 西營盤", "D. 上環"],
    correct: 0,
    explanation: "瑪麗醫院位於薄扶林"
  },
  {
    id: 2,
    category: "location",
    question: "威爾斯親王醫院位於哪個地方？",
    options: ["A. 薄扶林", "B. 沙田", "C. 西營盤", "D. 柴灣"],
    correct: 1,
    explanation: "威爾斯親王醫院位於沙田"
  },
  {
    id: 3,
    category: "location",
    question: "贊育醫院位於哪個地方？",
    options: ["A. 西營盤", "B. 沙田", "C. 上環", "D. 灣仔"],
    correct: 0,
    explanation: "贊育醫院位於西營盤"
  },
  {
    id: 4,
    category: "location",
    question: "東華醫院位於哪個地方？",
    options: ["A. 西營盤", "B. 上環", "C. 薄扶林", "D. 灣仔"],
    correct: 1,
    explanation: "東華醫院位於上環"
  },
  {
    id: 5,
    category: "location",
    question: "東華三院馮堯敬醫院位於哪個地方？",
    options: ["A. 薄扶林", "B. 沙田", "C. 西營盤", "D. 上環"],
    correct: 0,
    explanation: "東華三院馮堯敬醫院位於薄扶林"
  },
  {
    id: 6,
    category: "location",
    question: "葛量洪醫院位於哪個地方？",
    options: ["A. 薄扶林", "B. 黃竹坑", "C. 柴灣", "D. 沙田"],
    correct: 1,
    explanation: "葛量洪醫院位於黃竹坑"
  },
  {
    id: 7,
    category: "location",
    question: "東區尤德夫人那打素醫院位於哪個地方？",
    options: ["A. 柴灣", "B. 黃竹坑", "C. 薄扶林", "D. 沙田"],
    correct: 0,
    explanation: "東區尤德夫人那打素醫院位於柴灣"
  },
  {
    id: 8,
    category: "location",
    question: "東華東院位於哪個地方？",
    options: ["A. 大坑", "B. 柴灣", "C. 薄扶林", "D. 灣仔"],
    correct: 0,
    explanation: "東華東院位於大坑"
  },
  {
    id: 9,
    category: "location",
    question: "鄧肇堅醫院位於哪個地方？",
    options: ["A. 灣仔", "B. 大坑", "C. 中環", "D. 上環"],
    correct: 0,
    explanation: "鄧肇堅醫院位於灣仔"
  },
  {
    id: 10,
    category: "location",
    question: "律敦治醫院位於哪個地方？",
    options: ["A. 灣仔", "B. 大坑", "C. 銅鑼灣", "D. 北角"],
    correct: 0,
    explanation: "律敦治醫院位於灣仔"
  },
  {
    id: 11,
    category: "location",
    question: "黃竹坑醫院位於哪個地方？",
    options: ["A. 黃竹坑", "B. 黃竹坑徑", "C. 薄扶林", "D. 香港仔"],
    correct: 1,
    explanation: "黃竹坑醫院位於黃竹坑徑"
  },
  {
    id: 12,
    category: "location",
    question: "伊利沙伯醫院位於哪個地方？",
    options: ["A. 九龍城", "B. 油麻地", "C. 樂富", "D. 黃大仙"],
    correct: 1,
    explanation: "伊利沙伯醫院位於油麻地"
  },
  {
    id: 13,
    category: "location",
    question: "九龍醫院位於哪個地方？",
    options: ["A. 九龍城", "B. 油麻地", "C. 樂富", "D. 黃大仙"],
    correct: 0,
    explanation: "九龍醫院位於九龍城"
  },
  {
    id: 14,
    category: "location",
    question: "香港佛教醫院位於哪個地方？",
    options: ["A. 九龍城", "B. 樂富", "C. 油麻地", "D. 黃大仙"],
    correct: 1,
    explanation: "香港佛教醫院位於樂富"
  },
  {
    id: 15,
    category: "location",
    question: "香港眼科醫院位於哪個地方？",
    options: ["A. 九龍城", "B. 樂富", "C. 油麻地", "D. 黃大仙"],
    correct: 0,
    explanation: "香港眼科醫院位於九龍城"
  },
  {
    id: 16,
    category: "location",
    question: "東華三院黃大仙醫院位於哪個地方？",
    options: ["A. 黃大仙", "B. 沙田坳道", "C. 九龍城", "D. 樂富"],
    correct: 1,
    explanation: "東華三院黃大仙醫院位於沙田坳道"
  },
  {
    id: 17,
    category: "location",
    question: "聖母醫院位於哪個地方？",
    options: ["A. 黃大仙", "B. 沙田坳道", "C. 九龍城", "D. 樂富"],
    correct: 0,
    explanation: "聖母醫院位於黃大仙"
  },
  {
    id: 18,
    category: "location",
    question: "廣華醫院位於哪個地方？",
    options: ["A. 油麻地", "B. 黃大仙", "C. 九龍城", "D. 樂富"],
    correct: 0,
    explanation: "廣華醫院位於油麻地"
  },
  {
    id: 19,
    category: "location",
    question: "明愛醫院位於哪個地方？",
    options: ["A. 長沙灣", "B. 油麻地", "C. 黃大仙", "D. 九龍城"],
    correct: 0,
    explanation: "明愛醫院位於長沙灣"
  },
  {
    id: 20,
    category: "location",
    question: "瑪嘉烈醫院位於哪個地方？",
    options: ["A. 荔景", "B. 長沙灣", "C. 油麻地", "D. 黃大仙"],
    correct: 0,
    explanation: "瑪嘉烈醫院位於荔景"
  },
  {
    id: 21,
    category: "location",
    question: "葵涌醫院位於哪個地方？",
    options: ["A. 荔景", "B. 葵涌", "C. 長沙灣", "D. 荃灣"],
    correct: 0,
    explanation: "葵涌醫院位於荔景"
  },
  {
    id: 22,
    category: "location",
    question: "仁濟醫院位於哪個地方？",
    options: ["A. 荃灣", "B. 荔景", "C. 葵涌", "D. 長沙灣"],
    correct: 0,
    explanation: "仁濟醫院位於荃灣"
  },
  {
    id: 23,
    category: "location",
    question: "基督教聯合醫院位於哪個地方？",
    options: ["A. 秀茂坪", "B. 荃灣", "C. 荔景", "D. 觀塘"],
    correct: 0,
    explanation: "基督教聯合醫院位於秀茂坪"
  },
  {
    id: 24,
    category: "location",
    question: "靈實醫院位於哪個地方？",
    options: ["A. 將軍澳", "B. 秀茂坪", "C. 荃灣", "D. 觀塘"],
    correct: 0,
    explanation: "靈實醫院位於將軍澳"
  },
  {
    id: 25,
    category: "location",
    question: "將軍澳醫院位於哪個地方？",
    options: ["A. 寶寧里", "B. 將軍澳", "C. 秀茂坪", "D. 觀塘"],
    correct: 0,
    explanation: "將軍澳醫院位於寶寧里"
  },
  {
    id: 26,
    category: "location",
    question: "沙田醫院位於哪個地方？",
    options: ["A. 亞公角街", "B. 沙田", "C. 大埔", "D. 上水"],
    correct: 0,
    explanation: "沙田醫院位於亞公角街"
  },
  {
    id: 27,
    category: "location",
    question: "雅麗氏何妙齡那打素醫院位於哪個地方？",
    options: ["A. 大埔", "B. 亞公角街", "C. 沙田", "D. 上水"],
    correct: 0,
    explanation: "雅麗氏何妙齡那打素醫院位於大埔"
  },
  {
    id: 28,
    category: "location",
    question: "大埔醫院位於哪個地方？",
    options: ["A. 全安路", "B. 大埔", "C. 亞公角街", "D. 沙田"],
    correct: 0,
    explanation: "大埔醫院位於全安路"
  },
  {
    id: 29,
    category: "location",
    question: "北區醫院位於哪個地方？",
    options: ["A. 上水", "B. 全安路", "C. 大埔", "D. 粉嶺"],
    correct: 0,
    explanation: "北區醫院位於上水"
  },
  {
    id: 30,
    category: "location",
    question: "屯門醫院位於哪個地方？",
    options: ["A. 青松觀路", "B. 上水", "C. 屯門", "D. 元朗"],
    correct: 0,
    explanation: "屯門醫院位於青松觀路"
  },
  {
    id: 31,
    category: "location",
    question: "博愛醫院位於哪個地方？",
    options: ["A. 元朗", "B. 青松觀路", "C. 屯門", "D. 天水圍"],
    correct: 0,
    explanation: "博愛醫院位於元朗"
  },
  {
    id: 32,
    category: "location",
    question: "嘉諾撒醫院位於哪個地方？",
    options: ["A. 半山", "B. 元朗", "C. 中環", "D. 山頂"],
    correct: 0,
    explanation: "嘉諾撒醫院位於半山"
  },
  {
    id: 33,
    category: "location",
    question: "明德國際醫院位於哪個地方？",
    options: ["A. 山頂", "B. 半山", "C. 中環", "D. 薄扶林"],
    correct: 0,
    explanation: "明德國際醫院位於山頂"
  },
  {
    id: 34,
    category: "location",
    question: "香港港安醫院位於哪個地方？",
    options: ["A. 跑馬地", "B. 山頂", "C. 半山", "D. 銅鑼灣"],
    correct: 0,
    explanation: "香港港安醫院位於跑馬地"
  },
  {
    id: 35,
    category: "location",
    question: "聖保祿醫院位於哪個地方？",
    options: ["A. 東院道", "B. 跑馬地", "C. 山頂", "D. 銅鑼灣"],
    correct: 0,
    explanation: "聖保祿醫院位於東院道"
  },
  {
    id: 36,
    category: "location",
    question: "養和醫院位於哪個地方？",
    options: ["A. 跑馬地", "B. 東院道", "C. 銅鑼灣", "D. 灣仔"],
    correct: 0,
    explanation: "養和醫院位於跑馬地"
  },
  {
    id: 37,
    category: "location",
    question: "寶血醫院（明愛）位於哪個地方？",
    options: ["A. 深水埗", "B. 跑馬地", "C. 東院道", "D. 長沙灣"],
    correct: 0,
    explanation: "寶血醫院（明愛）位於深水埗"
  },
  {
    id: 38,
    category: "location",
    question: "播道醫院位於哪個地方？",
    options: ["A. 九龍城", "B. 深水埗", "C. 九龍塘", "D. 黃大仙"],
    correct: 0,
    explanation: "播道醫院位於九龍城"
  },
  {
    id: 39,
    category: "location",
    question: "聖德肋撒醫院位於哪個地方？",
    options: ["A. 九龍城", "B. 九龍塘", "C. 深水埗", "D. 黃大仙"],
    correct: 0,
    explanation: "聖德肋撒醫院位於九龍城"
  },
  {
    id: 40,
    category: "location",
    question: "香港浸信會醫院位於哪個地方？",
    options: ["A. 九龍塘", "B. 九龍城", "C. 深水埗", "D. 沙田"],
    correct: 0,
    explanation: "香港浸信會醫院位於九龍塘"
  },
  {
    id: 41,
    category: "location",
    question: "荃灣港安醫院位於哪個地方？",
    options: ["A. 荃景圍", "B. 荃灣", "C. 九龍塘", "D. 深水埗"],
    correct: 0,
    explanation: "荃灣港安醫院位於荃景圍"
  },
  {
    id: 42,
    category: "location",
    question: "沙田國際醫務中心仁安醫院位於哪個地方？",
    options: ["A. 富健街", "B. 荃景圍", "C. 沙田", "D. 九龍塘"],
    correct: 0,
    explanation: "沙田國際醫務中心仁安醫院位於富健街"
  },
  {
    id: 43,
    category: "location",
    question: "青山醫院位於哪個地方？",
    options: ["A. 屯門", "B. 富健街", "C. 荃景圍", "D. 元朗"],
    correct: 0,
    explanation: "青山醫院位於屯門"
  },
  {
    id: 44,
    category: "location",
    question: "小欖醫院位於哪個地方？",
    options: ["A. 青松觀路", "B. 屯門", "C. 富健街", "D. 元朗"],
    correct: 0,
    explanation: "小欖醫院位於青松觀路"
  },
  {
    id: 45,
    category: "location",
    question: "大口環根德公爵夫人兒童醫院位於哪個地方？",
    options: ["A. 薄扶林", "B. 青松觀路", "C. 屯門", "D. 黃竹坑"],
    correct: 0,
    explanation: "大口環根德公爵夫人兒童醫院位於薄扶林"
  },
  {
    id: 46,
    category: "location",
    question: "北大嶼山醫院位於哪個地方？",
    options: ["A. 松仁路", "B. 東涌", "C. 薄扶林", "D. 青松觀路"],
    correct: 0,
    explanation: "北大嶼山醫院位於松仁路"
  },
  {
    id: 47,
    category: "location",
    question: "天水圍醫院位於哪個地方？",
    options: ["A. 天壇街", "B. 天水圍", "C. 松仁路", "D. 東涌"],
    correct: 0,
    explanation: "天水圍醫院位於天壇街"
  },
  {
    id: 48,
    category: "location",
    question: "港怡醫院位於哪個地方？",
    options: ["A. 黃竹坑", "B. 天壇街", "C. 天水圍", "D. 薄扶林"],
    correct: 0,
    explanation: "港怡醫院位於黃竹坑"
  },
  {
    id: 49,
    category: "location",
    question: "香港兒童醫院位於哪個地方？",
    options: ["A. 九龍灣", "B. 黃竹坑", "C. 觀塘", "D. 九龍城"],
    correct: 0,
    explanation: "香港兒童醫院位於九龍灣"
  },
  {
    id: 50,
    category: "location",
    question: "香港中文大學醫院位於哪個地方？",
    options: ["A. 澤祥街", "B. 九龍灣", "C. 沙田", "D. 觀塘"],
    correct: 0,
    explanation: "香港中文大學醫院位於澤祥街"
  },

  // 旅遊景點（51-85）
  {
    id: 51,
    category: "location",
    question: "星光大道位於哪個地方？",
    options: ["A. 尖沙咀", "B. 銅鑼灣", "C. 中環", "D. 灣仔"],
    correct: 0,
    explanation: "星光大道位於尖沙咀"
  },
  {
    id: 52,
    category: "location",
    question: "金紫荊廣場位於哪個地方？",
    options: ["A. 灣仔", "B. 尖沙咀", "C. 中環", "D. 銅鑼灣"],
    correct: 0,
    explanation: "金紫荊廣場位於灣仔"
  },
  {
    id: 53,
    category: "location",
    question: "香港迪士尼樂園位於哪個地方？",
    options: ["A. 竹篙灣", "B. 東涌", "C. 赤鱲角", "D. 昂坪"],
    correct: 0,
    explanation: "香港迪士尼樂園位於竹篙灣"
  },
  {
    id: 54,
    category: "location",
    question: "香港濕地公園位於哪個地方？",
    options: ["A. 天水圍", "B. 元朗", "C. 屯門", "D. 竹篙灣"],
    correct: 0,
    explanation: "香港濕地公園位於天水圍"
  },
  {
    id: 55,
    category: "location",
    question: "玉器市場位於哪個地方？",
    options: ["A. 油麻地", "B. 旺角", "C. 深水埗", "D. 尖沙咀"],
    correct: 0,
    explanation: "玉器市場位於油麻地"
  },
  {
    id: 56,
    category: "location",
    question: "九龍寨城公園位於哪個地方？",
    options: ["A. 九龍城", "B. 觀塘", "C. 黃大仙", "D. 深水埗"],
    correct: 0,
    explanation: "九龍寨城公園位於九龍城"
  },
  {
    id: 57,
    category: "location",
    question: "昂坪纜車 - 東涌纜車站位於哪個地方？",
    options: ["A. 達東路", "B. 東涌", "C. 昂坪", "D. 赤鱲角"],
    correct: 0,
    explanation: "昂坪纜車 - 東涌纜車站位於達東路"
  },
  {
    id: 58,
    category: "location",
    question: "香港海洋公園位於哪個地方？",
    options: ["A. 黃竹坑", "B. 赤柱", "C. 薄扶林", "D. 柴灣"],
    correct: 0,
    explanation: "香港海洋公園位於黃竹坑"
  },
  {
    id: 59,
    category: "location",
    question: "寶蓮禪寺位於哪個地方？",
    options: ["A. 昂坪", "B. 東涌", "C. 大嶼山", "D. 竹篙灣"],
    correct: 0,
    explanation: "寶蓮禪寺位於昂坪"
  },
  {
    id: 60,
    category: "location",
    question: "凌霄閣位於哪個地方？",
    options: ["A. 山頂道", "B. 山頂", "C. 半山", "D. 薄扶林"],
    correct: 0,
    explanation: "凌霄閣位於山頂道"
  },
  {
    id: 61,
    category: "location",
    question: "亞洲國際博覽館位於哪個地方？",
    options: ["A. 赤鱲角", "B. 東涌", "C. 機場", "D. 昂坪"],
    correct: 0,
    explanation: "亞洲國際博覽館位於赤鱲角"
  },
  {
    id: 62,
    category: "location",
    question: "屏山文物徑位於哪個地方？",
    options: ["A. 元朗", "B. 天水圍", "C. 屯門", "D. 大埔"],
    correct: 0,
    explanation: "屏山文物徑位於元朗"
  },
  {
    id: 63,
    category: "location",
    question: "香港會議展覽中心位於哪個地方？",
    options: ["A. 灣仔", "B. 中環", "C. 銅鑼灣", "D. 金鐘"],
    correct: 0,
    explanation: "香港會議展覽中心位於灣仔"
  },
  {
    id: 64,
    category: "location",
    question: "香港文化博物館位於哪個地方？",
    options: ["A. 沙田", "B. 大埔", "C. 馬鞍山", "D. 粉嶺"],
    correct: 0,
    explanation: "香港文化博物館位於沙田"
  },
  {
    id: 65,
    category: "location",
    question: "香港歷史博物館位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 油麻地", "D. 紅磡"],
    correct: 0,
    explanation: "香港歷史博物館位於尖沙咀"
  },
  {
    id: 66,
    category: "location",
    question: "香港科學館位於哪個地方？",
    options: ["A. 尖沙咀", "B. 紅磡", "C. 旺角", "D. 油麻地"],
    correct: 0,
    explanation: "香港科學館位於尖沙咀"
  },
  {
    id: 67,
    category: "location",
    question: "香港太空館位於哪個地方？",
    options: ["A. 尖沙咀", "B. 紅磡", "C. 中環", "D. 銅鑼灣"],
    correct: 0,
    explanation: "香港太空館位於尖沙咀"
  },
  {
    id: 68,
    category: "location",
    question: "香港大會堂位於哪個地方？",
    options: ["A. 中環", "B. 灣仔", "C. 金鐘", "D. 尖沙咀"],
    correct: 0,
    explanation: "香港大會堂位於中環"
  },
  {
    id: 69,
    category: "location",
    question: "香港體育館位於哪個地方？",
    options: ["A. 紅磡", "B. 尖沙咀", "C. 旺角", "D. 灣仔"],
    correct: 0,
    explanation: "香港體育館位於紅磡"
  },
  {
    id: 70,
    category: "location",
    question: "香港文化中心位於哪個地方？",
    options: ["A. 尖沙咀", "B. 紅磡", "C. 旺角", "D. 中環"],
    correct: 0,
    explanation: "香港文化中心位於尖沙咀"
  },
  {
    id: 71,
    category: "location",
    question: "伊利沙伯體育館位於哪個地方？",
    options: ["A. 灣仔", "B. 銅鑼灣", "C. 中環", "D. 金鐘"],
    correct: 0,
    explanation: "伊利沙伯體育館位於灣仔"
  },
  {
    id: 72,
    category: "location",
    question: "沙田大會堂位於哪個地方？",
    options: ["A. 源禾路", "B. 沙田", "C. 大圍", "D. 火炭"],
    correct: 0,
    explanation: "沙田大會堂位於源禾路"
  },
  {
    id: 73,
    category: "location",
    question: "尖沙咀天星碼頭位於哪個地方？",
    options: ["A. 尖沙咀", "B. 中環", "C. 灣仔", "D. 紅磡"],
    correct: 0,
    explanation: "尖沙咀天星碼頭位於尖沙咀"
  },
  {
    id: 74,
    category: "location",
    question: "1881位於哪個地方？",
    options: ["A. 廣東道", "B. 尖沙咀", "C. 中環", "D. 銅鑼灣"],
    correct: 0,
    explanation: "1881位於廣東道"
  },
  {
    id: 75,
    category: "location",
    question: "沙田車公廟位於哪個地方？",
    options: ["A. 大圍", "B. 沙田", "C. 火炭", "D. 馬鞍山"],
    correct: 0,
    explanation: "沙田車公廟位於大圍"
  },
  {
    id: 76,
    category: "location",
    question: "文武廟位於哪個地方？",
    options: ["A. 上環", "B. 中環", "C. 西環", "D. 灣仔"],
    correct: 0,
    explanation: "文武廟位於上環"
  },
  {
    id: 77,
    category: "location",
    question: "林村許願廣場位於哪個地方？",
    options: ["A. 大埔", "B. 沙田", "C. 粉嶺", "D. 上水"],
    correct: 0,
    explanation: "林村許願廣場位於大埔"
  },
  {
    id: 78,
    category: "location",
    question: "龍躍頭文物徑位於哪個地方？",
    options: ["A. 粉嶺", "B. 上水", "C. 大埔", "D. 沙田"],
    correct: 0,
    explanation: "龍躍頭文物徑位於粉嶺"
  },
  {
    id: 79,
    category: "location",
    question: "美利樓位於哪個地方？",
    options: ["A. 赤柱", "B. 淺水灣", "C. 薄扶林", "D. 黃竹坑"],
    correct: 0,
    explanation: "美利樓位於赤柱"
  },
  {
    id: 80,
    category: "location",
    question: "和昌大押位於哪個地方？",
    options: ["A. 莊士敦道", "B. 灣仔", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "和昌大押位於莊士敦道"
  },
  {
    id: 81,
    category: "location",
    question: "大館位於哪個地方？",
    options: ["A. 荷李活道", "B. 中環", "C. 上環", "D. 半山"],
    correct: 0,
    explanation: "大館位於荷李活道"
  },
  {
    id: 82,
    category: "location",
    question: "香港藝術館位於哪個地方？",
    options: ["A. 尖沙咀", "B. 中環", "C. 灣仔", "D. 銅鑼灣"],
    correct: 0,
    explanation: "香港藝術館位於尖沙咀"
  },
  {
    id: 83,
    category: "location",
    question: "啟德郵輪碼頭位於哪個地方？",
    options: ["A. 承豐道", "B. 啟德", "C. 九龍城", "D. 觀塘"],
    correct: 0,
    explanation: "啟德郵輪碼頭位於承豐道"
  },
  {
    id: 84,
    category: "location",
    question: "香港故宮文化博物館位於哪個地方？",
    options: ["A. 博物館道", "B. 西九", "C. 尖沙咀", "D. 中環"],
    correct: 0,
    explanation: "香港故宮文化博物館位於博物館道"
  },
  {
    id: 85,
    category: "location",
    question: "戲曲中心位於哪個地方？",
    options: ["A. 柯士甸道西", "B. 西九", "C. 尖沙咀", "D. 旺角"],
    correct: 0,
    explanation: "戲曲中心位於柯士甸道西"
  },

  // 酒店（86-173）
  {
    id: 86,
    category: "location",
    question: "8度海逸酒店位於哪個地方？",
    options: ["A. 土瓜灣", "B. 紅磡", "C. 九龍城", "D. 黃大仙"],
    correct: 0,
    explanation: "8度海逸酒店位於土瓜灣"
  },
  {
    id: 87,
    category: "location",
    question: "九龍海逸君綽酒店位於哪個地方？",
    options: ["A. 紅磡", "B. 土瓜灣", "C. 九龍城", "D. 尖沙咀"],
    correct: 0,
    explanation: "九龍海逸君綽酒店位於紅磡"
  },
  {
    id: 88,
    category: "location",
    question: "九龍維景酒店位於哪個地方？",
    options: ["A. 何文田", "B. 紅磡", "C. 土瓜灣", "D. 九龍城"],
    correct: 0,
    explanation: "九龍維景酒店位於何文田"
  },
  {
    id: 89,
    category: "location",
    question: "九龍酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 何文田", "C. 紅磡", "D. 旺角"],
    correct: 0,
    explanation: "九龍酒店位於尖沙咀"
  },
  {
    id: 90,
    category: "location",
    question: "九龍香格里拉大酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 何文田", "D. 紅磡"],
    correct: 0,
    explanation: "九龍香格里拉大酒店位於尖沙咀"
  },
  {
    id: 91,
    category: "location",
    question: "六國酒店位於哪個地方？",
    options: ["A. 灣仔", "B. 尖沙咀", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "六國酒店位於灣仔"
  },
  {
    id: 92,
    category: "location",
    question: "北角海逸酒店位於哪個地方？",
    options: ["A. 英皇道", "B. 北角", "C. 鰂魚涌", "D. 太古"],
    correct: 0,
    explanation: "北角海逸酒店位於英皇道"
  },
  {
    id: 93,
    category: "location",
    question: "千禧新世界香港酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 中環", "D. 銅鑼灣"],
    correct: 0,
    explanation: "千禧新世界香港酒店位於尖沙咀"
  },
  {
    id: 94,
    category: "location",
    question: "君怡酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "君怡酒店位於尖沙咀"
  },
  {
    id: 95,
    category: "location",
    question: "嘉湖海逸酒店位於哪個地方？",
    options: ["A. 天水圍", "B. 元朗", "C. 屯門", "D. 大埔"],
    correct: 0,
    explanation: "嘉湖海逸酒店位於天水圍"
  },
  {
    id: 96,
    category: "location",
    question: "富豪九龍酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 紅磡", "D. 何文田"],
    correct: 0,
    explanation: "富豪九龍酒店位於尖沙咀"
  },
  {
    id: 97,
    category: "location",
    question: "富豪東方酒店位於哪個地方？",
    options: ["A. 九龍城", "B. 尖沙咀", "C. 紅磡", "D. 何文田"],
    correct: 0,
    explanation: "富豪東方酒店位於九龍城"
  },
  {
    id: 98,
    category: "location",
    question: "富豪香港酒店位於哪個地方？",
    options: ["A. 銅鑼灣", "B. 灣仔", "C. 中環", "D. 北角"],
    correct: 0,
    explanation: "富豪香港酒店位於銅鑼灣"
  },
  {
    id: 99,
    category: "location",
    question: "帝京酒店位於哪個地方？",
    options: ["A. 旺角", "B. 尖沙咀", "C. 深水埗", "D. 大角咀"],
    correct: 0,
    explanation: "帝京酒店位於旺角"
  },
  {
    id: 100,
    category: "location",
    question: "帝景酒店位於哪個地方？",
    options: ["A. 汀九", "B. 荃灣", "C. 青衣", "D. 葵涌"],
    correct: 0,
    explanation: "帝景酒店位於汀九"
  },
  {
    id: 101,
    category: "location",
    question: "帝苑酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 銅鑼灣", "D. 灣仔"],
    correct: 0,
    explanation: "帝苑酒店位於尖沙咀"
  },
  {
    id: 102,
    category: "location",
    question: "帝都酒店位於哪個地方？",
    options: ["A. 沙田", "B. 馬鞍山", "C. 大埔", "D. 火炭"],
    correct: 0,
    explanation: "帝都酒店位於沙田"
  },
  {
    id: 103,
    category: "location",
    question: "柏寧酒店位於哪個地方？",
    options: ["A. 銅鑼灣", "B. 灣仔", "C. 中環", "D. 北角"],
    correct: 0,
    explanation: "柏寧酒店位於銅鑼灣"
  },
  {
    id: 104,
    category: "location",
    question: "港島英迪格酒店位於哪個地方？",
    options: ["A. 灣仔", "B. 銅鑼灣", "C. 中環", "D. 金鐘"],
    correct: 0,
    explanation: "港島英迪格酒店位於灣仔"
  },
  {
    id: 105,
    category: "location",
    question: "皇家太平洋酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "皇家太平洋酒店位於尖沙咀"
  },
  {
    id: 106,
    category: "location",
    question: "諾富特東薈城酒店位於哪個地方？",
    options: ["A. 東涌", "B. 赤鱲角", "C. 機場", "D. 竹篙灣"],
    correct: 0,
    explanation: "諾富特東薈城酒店位於東涌"
  },
  {
    id: 107,
    category: "location",
    question: "都會海逸酒店位於哪個地方？",
    options: ["A. 紅磡", "B. 何文田", "C. 土瓜灣", "D. 九龍城"],
    correct: 0,
    explanation: "都會海逸酒店位於紅磡"
  },
  {
    id: 108,
    category: "location",
    question: "香港半島酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 中環", "C. 銅鑼灣", "D. 灣仔"],
    correct: 0,
    explanation: "香港半島酒店位於尖沙咀"
  },
  {
    id: 109,
    category: "location",
    question: "香港君悅酒店位於哪個地方？",
    options: ["A. 灣仔", "B. 金鐘", "C. 中環", "D. 銅鑼灣"],
    correct: 0,
    explanation: "香港君悅酒店位於灣仔"
  },
  {
    id: 110,
    category: "location",
    question: "香港喜來登酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "香港喜來登酒店位於尖沙咀"
  },
  {
    id: 111,
    category: "location",
    question: "香港四季酒店位於哪個地方？",
    options: ["A. 中環", "B. 金鐘", "C. 灣仔", "D. 銅鑼灣"],
    correct: 0,
    explanation: "香港四季酒店位於中環"
  },
  {
    id: 112,
    category: "location",
    question: "香港天際萬豪酒店位於哪個地方？",
    options: ["A. 赤鱲角", "B. 東涌", "C. 機場", "D. 竹篙灣"],
    correct: 0,
    explanation: "香港天際萬豪酒店位於赤鱲角"
  },
  {
    id: 113,
    category: "location",
    question: "香港康得思酒店位於哪個地方？",
    options: ["A. 上海街", "B. 旺角", "C. 油麻地", "D. 深水埗"],
    correct: 0,
    explanation: "香港康得思酒店位於上海街"
  },
  {
    id: 114,
    category: "location",
    question: "香港文華東方酒店位於哪個地方？",
    options: ["A. 中環", "B. 金鐘", "C. 灣仔", "D. 銅鑼灣"],
    correct: 0,
    explanation: "香港文華東方酒店位於中環"
  },
  {
    id: 115,
    category: "location",
    question: "香港朗廷酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "香港朗廷酒店位於尖沙咀"
  },
  {
    id: 116,
    category: "location",
    question: "香港沙田凱悅酒店位於哪個地方？",
    options: ["A. 澤祥街", "B. 沙田", "C. 火炭", "D. 大圍"],
    correct: 0,
    explanation: "香港沙田凱悅酒店位於澤祥街"
  },
  {
    id: 117,
    category: "location",
    question: "香港麗晶酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "香港麗晶酒店位於尖沙咀"
  },
  {
    id: 118,
    category: "location",
    question: "香港港麗酒店位於哪個地方？",
    options: ["A. 金鐘", "B. 中環", "C. 灣仔", "D. 銅鑼灣"],
    correct: 0,
    explanation: "香港港麗酒店位於金鐘"
  },
  {
    id: 119,
    category: "location",
    question: "香港灣仔帝盛酒店位於哪個地方？",
    options: ["A. 皇后大道東", "B. 灣仔", "C. 銅鑼灣", "D. 金鐘"],
    correct: 0,
    explanation: "香港灣仔帝盛酒店位於皇后大道東"
  },
  {
    id: 120,
    category: "location",
    question: "香港珀麗酒店位於哪個地方？",
    options: ["A. 銅鑼灣", "B. 灣仔", "C. 中環", "D. 北角"],
    correct: 0,
    explanation: "香港珀麗酒店位於銅鑼灣"
  },
  {
    id: 121,
    category: "location",
    question: "香港百樂酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "香港百樂酒店位於尖沙咀"
  },
  {
    id: 122,
    category: "location",
    question: "粵海華美灣際酒店位於哪個地方？",
    options: ["A. 灣仔", "B. 銅鑼灣", "C. 中環", "D. 金鐘"],
    correct: 0,
    explanation: "粵海華美灣際酒店位於灣仔"
  },
  {
    id: 123,
    category: "location",
    question: "香港萬麗海景酒店位於哪個地方？",
    options: ["A. 灣仔", "B. 銅鑼灣", "C. 中環", "D. 金鐘"],
    correct: 0,
    explanation: "香港萬麗海景酒店位於灣仔"
  },
  {
    id: 124,
    category: "location",
    question: "香港諾富特世紀酒店位於哪個地方？",
    options: ["A. 灣仔", "B. 銅鑼灣", "C. 中環", "D. 金鐘"],
    correct: 0,
    explanation: "香港諾富特世紀酒店位於灣仔"
  },
  {
    id: 125,
    category: "location",
    question: "（題目空缺）",
    options: ["A. --", "B. --", "C. --", "D. --"],
    correct: 0,
    explanation: "題目空缺"
  },
  {
    id: 126,
    category: "location",
    question: "香港金域假日酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "香港金域假日酒店位於尖沙咀"
  },
  {
    id: 127,
    category: "location",
    question: "香港銅鑼灣皇冠假日酒店位於哪個地方？",
    options: ["A. 禮頓道", "B. 銅鑼灣", "C. 灣仔", "D. 北角"],
    correct: 0,
    explanation: "香港銅鑼灣皇冠假日酒店位於禮頓道"
  },
  {
    id: 128,
    category: "location",
    question: "香港黃金海岸酒店位於哪個地方？",
    options: ["A. 掃管笏", "B. 屯門", "C. 元朗", "D. 天水圍"],
    correct: 0,
    explanation: "香港黃金海岸酒店位於掃管笏"
  },
  {
    id: 129,
    category: "location",
    question: "馬哥孛羅香港酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "馬哥孛羅香港酒店位於尖沙咀"
  },
  {
    id: 130,
    category: "location",
    question: "麗豪酒店位於哪個地方？",
    options: ["A. 沙田", "B. 馬鞍山", "C. 大埔", "D. 火炭"],
    correct: 0,
    explanation: "麗豪酒店位於沙田"
  },
  {
    id: 131,
    category: "location",
    question: "香港維港凱悅尚萃酒店位於哪個地方？",
    options: ["A. 北角", "B. 鰂魚涌", "C. 太古", "D. 西灣河"],
    correct: 0,
    explanation: "香港維港凱悅尚萃酒店位於北角"
  },
  {
    id: 132,
    category: "location",
    question: "唯港薈位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "唯港薈位於尖沙咀"
  },
  {
    id: 133,
    category: "location",
    question: "奧華酒店 南岸位於哪個地方？",
    options: ["A. 黃竹坑", "B. 香港仔", "C. 赤柱", "D. 薄扶林"],
    correct: 0,
    explanation: "奧華酒店 南岸位於黃竹坑"
  },
  {
    id: 134,
    category: "location",
    question: "南灣如心酒店位於哪個地方？",
    options: ["A. 香港仔", "B. 黃竹坑", "C. 赤柱", "D. 薄扶林"],
    correct: 0,
    explanation: "南灣如心酒店位於香港仔"
  },
  {
    id: 135,
    category: "location",
    question: "荃灣西如心酒店位於哪個地方？",
    options: ["A. 楊屋道", "B. 荃灣", "C. 葵涌", "D. 青衣"],
    correct: 0,
    explanation: "荃灣西如心酒店位於楊屋道"
  },
  {
    id: 136,
    category: "location",
    question: "九龍東如心酒店位於哪個地方？",
    options: ["A. 觀塘", "B. 九龍灣", "C. 牛頭角", "D. 藍田"],
    correct: 0,
    explanation: "九龍東如心酒店位於觀塘"
  },
  {
    id: 137,
    category: "location",
    question: "銅鑼灣如心酒店位於哪個地方？",
    options: ["A. 英皇道", "B. 銅鑼灣", "C. 灣仔", "D. 北角"],
    correct: 0,
    explanation: "銅鑼灣如心酒店位於英皇道"
  },
  {
    id: 138,
    category: "location",
    question: "富豪機場酒店會議中心位於哪個地方？",
    options: ["A. 赤鱲角", "B. 東涌", "C. 機場", "D. 竹篙灣"],
    correct: 0,
    explanation: "富豪機場酒店會議中心位於赤鱲角"
  },
  {
    id: 139,
    category: "location",
    question: "尖沙咀皇悅酒店位於哪個地方？",
    options: ["A. 金巴利道", "B. 尖沙咀", "C. 旺角", "D. 佐敦"],
    correct: 0,
    explanation: "尖沙咀皇悅酒店位於金巴利道"
  },
  {
    id: 140,
    category: "location",
    question: "海景嘉福洲際酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "海景嘉福洲際酒店位於尖沙咀"
  },
  {
    id: 141,
    category: "location",
    question: "港威酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "港威酒店位於尖沙咀"
  },
  {
    id: 142,
    category: "location",
    question: "港島海逸君綽酒店位於哪個地方？",
    options: ["A. 北角", "B. 鰂魚涌", "C. 太古", "D. 西灣河"],
    correct: 0,
    explanation: "港島海逸君綽酒店位於北角"
  },
  {
    id: 143,
    category: "location",
    question: "港島皇悅酒店位於哪個地方？",
    options: ["A. 軒尼詩道", "B. 灣仔", "C. 銅鑼灣", "D. 北角"],
    correct: 0,
    explanation: "港島皇悅酒店位於軒尼詩道"
  },
  {
    id: 144,
    category: "location",
    question: "港島香格里拉大酒店位於哪個地方？",
    options: ["A. 法院道", "B. 金鐘", "C. 中環", "D. 灣仔"],
    correct: 0,
    explanation: "港島香格里拉大酒店位於法院道"
  },
  {
    id: 145,
    category: "location",
    question: "美麗華酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "美麗華酒店位於尖沙咀"
  },
  {
    id: 146,
    category: "location",
    question: "華美達海景酒店位於哪個地方？",
    options: ["A. 皇后大道西", "B. 西環", "C. 上環", "D. 中環"],
    correct: 0,
    explanation: "華美達海景酒店位於皇后大道西"
  },
  {
    id: 147,
    category: "location",
    question: "迪士尼好萊塢酒店位於哪個地方？",
    options: ["A. 大嶼山", "B. 竹篙灣", "C. 東涌", "D. 赤鱲角"],
    correct: 0,
    explanation: "迪士尼好萊塢酒店位於大嶼山"
  },
  {
    id: 148,
    category: "location",
    question: "迪士尼探索家度假酒店位於哪個地方？",
    options: ["A. 竹篙灣", "B. 大嶼山", "C. 東涌", "D. 赤鱲角"],
    correct: 0,
    explanation: "迪士尼探索家度假酒店位於竹篙灣"
  },
  {
    id: 149,
    category: "location",
    question: "銅鑼灣皇悅酒店位於哪個地方？",
    options: ["A. 永興街", "B. 銅鑼灣", "C. 灣仔", "D. 北角"],
    correct: 0,
    explanation: "銅鑼灣皇悅酒店位於永興街"
  },
  {
    id: 150,
    category: "location",
    question: "香港W酒店位於哪個地方？",
    options: ["A. 柯士甸道西", "B. 西九", "C. 尖沙咀", "D. 旺角"],
    correct: 0,
    explanation: "香港W酒店位於柯士甸道西"
  },
  {
    id: 151,
    category: "location",
    question: "香港JW萬豪酒店位於哪個地方？",
    options: ["A. 金鐘道", "B. 金鐘", "C. 中環", "D. 灣仔"],
    correct: 0,
    explanation: "香港JW萬豪酒店位於金鐘道"
  },
  {
    id: 152,
    category: "location",
    question: "香港九龍東皇冠假日酒店位於哪個地方？",
    options: ["A. 將軍澳", "B. 觀塘", "C. 九龍灣", "D. 牛頭角"],
    correct: 0,
    explanation: "香港九龍東皇冠假日酒店位於將軍澳"
  },
  {
    id: 153,
    category: "location",
    question: "香港嘉里酒店位於哪個地方？",
    options: ["A. 紅磡", "B. 何文田", "C. 土瓜灣", "D. 九龍城"],
    correct: 0,
    explanation: "香港嘉里酒店位於紅磡"
  },
  {
    id: 154,
    category: "location",
    question: "香港尖沙咀凱悅酒店位於哪個地方？",
    options: ["A. 河內道", "B. 尖沙咀", "C. 旺角", "D. 佐敦"],
    correct: 0,
    explanation: "香港尖沙咀凱悅酒店位於河內道"
  },
  {
    id: 155,
    category: "location",
    question: "香港屯門貝爾特酒店位於哪個地方？",
    options: ["A. 震寰路", "B. 屯門", "C. 元朗", "D. 天水圍"],
    correct: 0,
    explanation: "香港屯門貝爾特酒店位於震寰路"
  },
  {
    id: 156,
    category: "location",
    question: "香港旺角帝盛酒店位於哪個地方？",
    options: ["A. 大角咀", "B. 旺角", "C. 深水埗", "D. 油麻地"],
    correct: 0,
    explanation: "香港旺角帝盛酒店位於大角咀"
  },
  {
    id: 157,
    category: "location",
    question: "香港東隅位於哪個地方？",
    options: ["A. 鰂魚涌", "B. 北角", "C. 太古", "D. 西灣河"],
    correct: 0,
    explanation: "香港東隅位於鰂魚涌"
  },
  {
    id: 158,
    category: "location",
    question: "香港沙田萬怡酒店位於哪個地方？",
    options: ["A. 安平街", "B. 沙田", "C. 火炭", "D. 大圍"],
    correct: 0,
    explanation: "香港沙田萬怡酒店位於安平街"
  },
  {
    id: 159,
    category: "location",
    question: "名迪港島酒店位於哪個地方？",
    options: ["A. 摩頓臺", "B. 銅鑼灣", "C. 灣仔", "D. 中環"],
    correct: 0,
    explanation: "名迪港島酒店位於摩頓臺"
  },
  {
    id: 160,
    category: "location",
    question: "香港瑰麗酒店位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 銅鑼灣", "D. 中環"],
    correct: 0,
    explanation: "香港瑰麗酒店位於尖沙咀"
  },
  {
    id: 161,
    category: "location",
    question: "香港美利酒店位於哪個地方？",
    options: ["A. 中環", "B. 金鐘", "C. 灣仔", "D. 上環"],
    correct: 0,
    explanation: "香港美利酒店位於中環"
  },
  {
    id: 162,
    category: "location",
    question: "香港萬怡酒店位於哪個地方？",
    options: ["A. 干諾道西", "B. 西環", "C. 上環", "D. 中環"],
    correct: 0,
    explanation: "香港萬怡酒店位於干諾道西"
  },
  {
    id: 163,
    category: "location",
    question: "香港觀塘帝盛酒店位於哪個地方？",
    options: ["A. 鴻圖道", "B. 觀塘", "C. 九龍灣", "D. 牛頭角"],
    correct: 0,
    explanation: "香港觀塘帝盛酒店位於鴻圖道"
  },
  {
    id: 164,
    category: "location",
    question: "香港迪士尼樂園酒店位於哪個地方？",
    options: ["A. 竹篙灣", "B. 大嶼山", "C. 東涌", "D. 赤鱲角"],
    correct: 0,
    explanation: "香港迪士尼樂園酒店位於竹篙灣"
  },
  {
    id: 165,
    category: "location",
    question: "香港逸東酒店位於哪個地方？",
    options: ["A. 佐敦", "B. 尖沙咀", "C. 旺角", "D. 油麻地"],
    correct: 0,
    explanation: "香港逸東酒店位於佐敦"
  },
  {
    id: 166,
    category: "location",
    question: "香港麗思卡爾頓酒店位於哪個地方？",
    options: ["A. 柯士甸道西", "B. 西九", "C. 尖沙咀", "D. 旺角"],
    correct: 0,
    explanation: "香港麗思卡爾頓酒店位於柯士甸道西"
  },
  {
    id: 167,
    category: "location",
    question: "帝逸酒店位於哪個地方？",
    options: ["A. 沙田", "B. 馬鞍山", "C. 大埔", "D. 火炭"],
    correct: 0,
    explanation: "帝逸酒店位於沙田"
  },
  {
    id: 168,
    category: "location",
    question: "WM酒店位於哪個地方？",
    options: ["A. 西貢", "B. 將軍澳", "C. 調景嶺", "D. 坑口"],
    correct: 0,
    explanation: "WM酒店位於西貢"
  },
  {
    id: 169,
    category: "location",
    question: "歷山酒店位於哪個地方？",
    options: ["A. 北角", "B. 鰂魚涌", "C. 太古", "D. 西灣河"],
    correct: 0,
    explanation: "歷山酒店位於北角"
  },
  {
    id: 170,
    category: "location",
    question: "香港瑞吉酒店位於哪個地方？",
    options: ["A. 灣仔", "B. 銅鑼灣", "C. 中環", "D. 金鐘"],
    correct: 0,
    explanation: "香港瑞吉酒店位於灣仔"
  },
  {
    id: 171,
    category: "location",
    question: "香港東涌世茂喜來登酒店位於哪個地方？",
    options: ["A. 怡東路", "B. 東涌", "C. 赤鱲角", "D. 竹篙灣"],
    correct: 0,
    explanation: "香港東涌世茂喜來登酒店位於怡東路"
  },
  {
    id: 172,
    category: "location",
    question: "香港富麗敦海洋公園酒店位於哪個地方？",
    options: ["A. 香港仔", "B. 黃竹坑", "C. 赤柱", "D. 薄扶林"],
    correct: 0,
    explanation: "香港富麗敦海洋公園酒店位於香港仔"
  },
  {
    id: 173,
    category: "location",
    question: "麗豪航天城酒店位於哪個地方？",
    options: ["A. 赤鱲角", "B. 東涌", "C. 機場", "D. 竹篙灣"],
    correct: 0,
    explanation: "麗豪航天城酒店位於赤鱲角"
  },

  // 政府樓宇（174-219）
  {
    id: 174,
    category: "location",
    question: "北角政府合署位於哪個地方？",
    options: ["A. 渣華道", "B. 北角", "C. 鰂魚涌", "D. 太古"],
    correct: 0,
    explanation: "北角政府合署位於渣華道"
  },
  {
    id: 175,
    category: "location",
    question: "長沙灣政府合署位於哪個地方？",
    options: ["A. 長沙灣道", "B. 長沙灣", "C. 深水埗", "D. 荔枝角"],
    correct: 0,
    explanation: "長沙灣政府合署位於長沙灣道"
  },
  {
    id: 176,
    category: "location",
    question: "何文田政府合署位於哪個地方？",
    options: ["A. 忠孝街", "B. 何文田", "C. 紅磡", "D. 土瓜灣"],
    correct: 0,
    explanation: "何文田政府合署位於忠孝街"
  },
  {
    id: 177,
    category: "location",
    question: "東九龍政府合署位於哪個地方？",
    options: ["A. 觀塘", "B. 九龍灣", "C. 牛頭角", "D. 藍田"],
    correct: 0,
    explanation: "東九龍政府合署位於觀塘"
  },
  {
    id: 178,
    category: "location",
    question: "九龍政府合署位於哪個地方？",
    options: ["A. 油麻地", "B. 旺角", "C. 深水埗", "D. 大角咀"],
    correct: 0,
    explanation: "九龍政府合署位於油麻地"
  },
  {
    id: 179,
    category: "location",
    question: "葵興政府合署位於哪個地方？",
    options: ["A. 興芳路", "B. 葵涌", "C. 荃灣", "D. 青衣"],
    correct: 0,
    explanation: "葵興政府合署位於興芳路"
  },
  {
    id: 180,
    category: "location",
    question: "荔枝角政府合署位於哪個地方？",
    options: ["A. 荔灣道", "B. 荔枝角", "C. 長沙灣", "D. 深水埗"],
    correct: 0,
    explanation: "荔枝角政府合署位於荔灣道"
  },
  {
    id: 181,
    category: "location",
    question: "馬頭角道政府合署位於哪個地方？",
    options: ["A. 馬頭角道", "B. 馬頭角", "C. 土瓜灣", "D. 紅磡"],
    correct: 0,
    explanation: "馬頭角道政府合署位於馬頭角道"
  },
  {
    id: 182,
    category: "location",
    question: "旺角政府合署位於哪個地方？",
    options: ["A. 聯運街", "B. 旺角", "C. 油麻地", "D. 深水埗"],
    correct: 0,
    explanation: "旺角政府合署位於聯運街"
  },
  {
    id: 183,
    category: "location",
    question: "梅窩政府合署位於哪個地方？",
    options: ["A. 銀鑛灣路", "B. 梅窩", "C. 大嶼山", "D. 東涌"],
    correct: 0,
    explanation: "梅窩政府合署位於銀鑛灣路"
  },
  {
    id: 184,
    category: "location",
    question: "牛頭角政府合署位於哪個地方？",
    options: ["A. 安華街", "B. 牛頭角", "C. 觀塘", "D. 九龍灣"],
    correct: 0,
    explanation: "牛頭角政府合署位於安華街"
  },
  {
    id: 185,
    category: "location",
    question: "北區政府合署位於哪個地方？",
    options: ["A. 粉嶺", "B. 上水", "C. 大埔", "D. 沙田"],
    correct: 0,
    explanation: "北區政府合署位於粉嶺"
  },
  {
    id: 186,
    category: "location",
    question: "培正道政府合署位於哪個地方？",
    options: ["A. 何文田", "B. 培正道", "C. 紅磡", "D. 土瓜灣"],
    correct: 0,
    explanation: "培正道政府合署位於何文田"
  },
  {
    id: 187,
    category: "location",
    question: "西貢政府合署位於哪個地方？",
    options: ["A. 親民街", "B. 西貢", "C. 將軍澳", "D. 坑口"],
    correct: 0,
    explanation: "西貢政府合署位於親民街"
  },
  {
    id: 188,
    category: "location",
    question: "沙田政府合署位於哪個地方？",
    options: ["A. 上禾輋路", "B. 沙田", "C. 大圍", "D. 火炭"],
    correct: 0,
    explanation: "沙田政府合署位於上禾輋路"
  },
  {
    id: 189,
    category: "location",
    question: "深水埗政府合署位於哪個地方？",
    options: ["A. 元州街", "B. 深水埗", "C. 長沙灣", "D. 荔枝角"],
    correct: 0,
    explanation: "深水埗政府合署位於元州街"
  },
  {
    id: 190,
    category: "location",
    question: "大興政府合署位於哪個地方？",
    options: ["A. 屯門", "B. 大興", "C. 元朗", "D. 天水圍"],
    correct: 0,
    explanation: "大興政府合署位於屯門"
  },
  {
    id: 191,
    category: "location",
    question: "大埔政府合署位於哪個地方？",
    options: ["A. 汀角路", "B. 大埔", "C. 粉嶺", "D. 上水"],
    correct: 0,
    explanation: "大埔政府合署位於汀角路"
  },
  {
    id: 192,
    category: "location",
    question: "土瓜灣政府合署位於哪個地方？",
    options: ["A. 馬頭圍道", "B. 土瓜灣", "C. 紅磡", "D. 何文田"],
    correct: 0,
    explanation: "土瓜灣政府合署位於馬頭圍道"
  },
  {
    id: 193,
    category: "location",
    question: "荃灣政府合署位於哪個地方？",
    options: ["A. 西樓角路", "B. 荃灣", "C. 葵涌", "D. 青衣"],
    correct: 0,
    explanation: "荃灣政府合署位於西樓角路"
  },
  {
    id: 194,
    category: "location",
    question: "屯門政府合署位於哪個地方？",
    options: ["A. 屯喜路", "B. 屯門", "C. 元朗", "D. 天水圍"],
    correct: 0,
    explanation: "屯門政府合署位於屯喜路"
  },
  {
    id: 195,
    category: "location",
    question: "元朗政府合署位於哪個地方？",
    options: ["A. 橋樂坊", "B. 元朗", "C. 天水圍", "D. 屯門"],
    correct: 0,
    explanation: "元朗政府合署位於橋樂坊"
  },
  {
    id: 196,
    category: "location",
    question: "觀塘區警署位於哪個地方？",
    options: ["A. 鯉魚門道", "B. 觀塘", "C. 九龍灣", "D. 牛頭角"],
    correct: 0,
    explanation: "觀塘區警署位於鯉魚門道"
  },
  {
    id: 197,
    category: "location",
    question: "旺角區警署位於哪個地方？",
    options: ["A. 太子道西", "B. 旺角", "C. 油麻地", "D. 深水埗"],
    correct: 0,
    explanation: "旺角區警署位於太子道西"
  },
  {
    id: 198,
    category: "location",
    question: "將軍澳區警署位於哪個地方？",
    options: ["A. 寶琳北路", "B. 將軍澳", "C. 坑口", "D. 調景嶺"],
    correct: 0,
    explanation: "將軍澳區警署位於寶琳北路"
  },
  {
    id: 199,
    category: "location",
    question: "荃灣區警署位於哪個地方？",
    options: ["A. 荃景圍", "B. 荃灣", "C. 葵涌", "D. 青衣"],
    correct: 0,
    explanation: "荃灣區警署位於荃景圍"
  },
  {
    id: 200,
    category: "location",
    question: "中區警區總部位於哪個地方？",
    options: ["A. 中港道", "B. 中環", "C. 金鐘", "D. 上環"],
    correct: 0,
    explanation: "中區警區總部位於中港道"
  },
  {
    id: 201,
    category: "location",
    question: "東區法院大樓位於哪個地方？",
    options: ["A. 西灣河", "B. 北角", "C. 鰂魚涌", "D. 太古"],
    correct: 0,
    explanation: "東區法院大樓位於西灣河"
  },
  {
    id: 202,
    category: "location",
    question: "終審法院位於哪個地方？",
    options: ["A. 中環", "B. 金鐘", "C. 上環", "D. 灣仔"],
    correct: 0,
    explanation: "終審法院位於中環"
  },
  {
    id: 203,
    category: "location",
    question: "立法會綜合大樓位於哪個地方？",
    options: ["A. 金鐘", "B. 中環", "C. 灣仔", "D. 上環"],
    correct: 0,
    explanation: "立法會綜合大樓位於金鐘"
  },
  {
    id: 204,
    category: "location",
    question: "香港禮賓府位於哪個地方？",
    options: ["A. 中環", "B. 半山", "C. 金鐘", "D. 上環"],
    correct: 0,
    explanation: "香港禮賓府位於中環"
  },
  {
    id: 205,
    category: "location",
    question: "香港中央圖書館位於哪個地方？",
    options: ["A. 銅鑼灣", "B. 灣仔", "C. 北角", "D. 中環"],
    correct: 0,
    explanation: "香港中央圖書館位於銅鑼灣"
  },
  {
    id: 206,
    category: "location",
    question: "醫院管理局大樓位於哪個地方？",
    options: ["A. 九龍城", "B. 何文田", "C. 紅磡", "D. 土瓜灣"],
    correct: 0,
    explanation: "醫院管理局大樓位於九龍城"
  },
  {
    id: 207,
    category: "location",
    question: "九龍城法院大樓位於哪個地方？",
    options: ["A. 亞皆老街", "B. 九龍城", "C. 何文田", "D. 紅磡"],
    correct: 0,
    explanation: "九龍城法院大樓位於亞皆老街"
  },
  {
    id: 208,
    category: "location",
    question: "觀塘法院大樓位於哪個地方？",
    options: ["A. 鯉魚門道", "B. 觀塘", "C. 九龍灣", "D. 牛頭角"],
    correct: 0,
    explanation: "觀塘法院大樓位於鯉魚門道"
  },
  {
    id: 209,
    category: "location",
    question: "粉嶺法院大樓位於哪個地方？",
    options: ["A. 璧峰路", "B. 粉嶺", "C. 上水", "D. 大埔"],
    correct: 0,
    explanation: "粉嶺法院大樓位於璧峰路"
  },
  {
    id: 210,
    category: "location",
    question: "沙田法院大樓位於哪個地方？",
    options: ["A. 宜正里", "B. 沙田", "C. 大圍", "D. 火炭"],
    correct: 0,
    explanation: "沙田法院大樓位於宜正里"
  },
  {
    id: 211,
    category: "location",
    question: "屯門法院大樓位於哪個地方？",
    options: ["A. 屯喜路", "B. 屯門", "C. 元朗", "D. 天水圍"],
    correct: 0,
    explanation: "屯門法院大樓位於屯喜路"
  },
  {
    id: 212,
    category: "location",
    question: "西九龍法院大樓位於哪個地方？",
    options: ["A. 通州街", "B. 深水埗", "C. 長沙灣", "D. 荔枝角"],
    correct: 0,
    explanation: "西九龍法院大樓位於通州街"
  },
  {
    id: 213,
    category: "location",
    question: "高等法院位於哪個地方？",
    options: ["A. 金鐘道", "B. 金鐘", "C. 中環", "D. 灣仔"],
    correct: 0,
    explanation: "高等法院位於金鐘道"
  },
  {
    id: 214,
    category: "location",
    question: "勞資審裁處位於哪個地方？",
    options: ["A. 加士居道", "B. 尖沙咀", "C. 旺角", "D. 油麻地"],
    correct: 0,
    explanation: "勞資審裁處位於加士居道"
  },
  {
    id: 215,
    category: "location",
    question: "土地審裁處位於哪個地方？",
    options: ["A. 加士居道", "B. 尖沙咀", "C. 旺角", "D. 油麻地"],
    correct: 0,
    explanation: "土地審裁處位於加士居道"
  },
  {
    id: 216,
    category: "location",
    question: "區域法院位於哪個地方？",
    options: ["A. 港灣道", "B. 灣仔", "C. 銅鑼灣", "D. 金鐘"],
    correct: 0,
    explanation: "區域法院位於港灣道"
  },
  {
    id: 217,
    category: "location",
    question: "西九龍政府合署位於哪個地方？",
    options: ["A. 海庭道", "B. 西九", "C. 深水埗", "D. 長沙灣"],
    correct: 0,
    explanation: "西九龍政府合署位於海庭道"
  },
  {
    id: 218,
    category: "location",
    question: "入境事務處總部位於哪個地方？",
    options: ["A. 將軍澳", "B. 坑口", "C. 調景嶺", "D. 寶林"],
    correct: 0,
    explanation: "入境事務處總部位於將軍澳"
  },
  {
    id: 219,
    category: "location",
    question: "機電工程署總部大樓位於哪個地方？",
    options: ["A. 啟成街", "B. 九龍灣", "C. 觀塘", "D. 牛頭角"],
    correct: 0,
    explanation: "機電工程署總部大樓位於啟成街"
  },

  // 商業大廈 (Commercial Buildings) - Questions 220-246
  {
    id: 220,
    category: "location",
    question: "中環中心位於哪個地方？",
    options: ["A. 皇后大道中", "B. 德輔道中", "C. 夏慤道", "D. 花園道"],
    correct: 0,
    explanation: "中環中心位於皇后大道中"
  },
  {
    id: 221,
    category: "location",
    question: "如心廣場位於哪個地方？",
    options: ["A. 荃灣", "B. 葵涌", "C. 青衣", "D. 荔枝角"],
    correct: 0,
    explanation: "如心廣場位於荃灣"
  },
  {
    id: 222,
    category: "location",
    question: "長江集團中心位於哪個地方？",
    options: ["A. 中環", "B. 金鐘", "C. 灣仔", "D. 銅鑼灣"],
    correct: 0,
    explanation: "長江集團中心位於中環"
  },
  {
    id: 223,
    category: "location",
    question: "利園位於哪個地方？",
    options: ["A. 銅鑼灣", "B. 灣仔", "C. 中環", "D. 北角"],
    correct: 0,
    explanation: "利園位於銅鑼灣"
  },
  {
    id: 224,
    category: "location",
    question: "新鴻基中心位於哪個地方？",
    options: ["A. 灣仔", "B. 中環", "C. 銅鑼灣", "D. 金鐘"],
    correct: 0,
    explanation: "新鴻基中心位於灣仔"
  },
  {
    id: 225,
    category: "location",
    question: "華懋交易廣場位於哪個地方？",
    options: ["A. 鰂魚涌", "B. 北角", "C. 太古", "D. 西灣河"],
    correct: 0,
    explanation: "華懋交易廣場位於鰂魚涌"
  },
  {
    id: 226,
    category: "location",
    question: "力寶中心位於哪個地方？",
    options: ["A. 金鐘", "B. 中環", "C. 灣仔", "D. 夏慤道"],
    correct: 0,
    explanation: "力寶中心位於金鐘"
  },
  {
    id: 227,
    category: "location",
    question: "美麗華廣場位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 油麻地", "D. 佐敦"],
    correct: 0,
    explanation: "美麗華廣場位於尖沙咀"
  },
  {
    id: 228,
    category: "location",
    question: "太古廣場位於哪個地方？",
    options: ["A. 金鐘", "B. 中環", "C. 灣仔", "D. 銅鑼灣"],
    correct: 0,
    explanation: "太古廣場位於金鐘"
  },
  {
    id: 229,
    category: "location",
    question: "英國保誠保險大樓位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 油麻地", "D. 佐敦"],
    correct: 0,
    explanation: "英國保誠保險大樓位於尖沙咀"
  },
  {
    id: 230,
    category: "location",
    question: "中國太平大廈位於哪個地方？",
    options: ["A. 新寧道", "B. 尖沙咀", "C. 梳士巴利道", "D. 彌敦道"],
    correct: 0,
    explanation: "中國太平大廈位於新寧道"
  },
  {
    id: 231,
    category: "location",
    question: "電視廣播有限公司電視廣播城位於哪個地方？",
    options: ["A. 將軍澳", "B. 調景嶺", "C. 坑口", "D. 寶林"],
    correct: 0,
    explanation: "電視廣播有限公司電視廣播城位於將軍澳"
  },
  {
    id: 232,
    category: "location",
    question: "港威大廈位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 油麻地", "D. 佐敦"],
    correct: 0,
    explanation: "港威大廈位於尖沙咀"
  },
  {
    id: 233,
    category: "location",
    question: "貿易廣場位於哪個地方？",
    options: ["A. 長沙灣", "B. 深水埗", "C. 荔枝角", "D. 美孚"],
    correct: 0,
    explanation: "貿易廣場位於長沙灣"
  },
  {
    id: 234,
    category: "location",
    question: "海富中心位於哪個地方？",
    options: ["A. 夏慤道", "B. 中環", "C. 金鐘", "D. 灣仔"],
    correct: 0,
    explanation: "海富中心位於夏慤道"
  },
  {
    id: 235,
    category: "location",
    question: "統一中心位於哪個地方？",
    options: ["A. 金鐘", "B. 中環", "C. 灣仔", "D. 夏慤道"],
    correct: 0,
    explanation: "統一中心位於金鐘"
  },
  {
    id: 236,
    category: "location",
    question: "環球大廈位於哪個地方？",
    options: ["A. 中環", "B. 金鐘", "C. 灣仔", "D. 銅鑼灣"],
    correct: 0,
    explanation: "環球大廈位於中環"
  },
  {
    id: 237,
    category: "location",
    question: "國際金融中心位於哪個地方？",
    options: ["A. 中環", "B. 金鐘", "C. 灣仔", "D. 夏慤道"],
    correct: 0,
    explanation: "國際金融中心位於中環"
  },
  {
    id: 238,
    category: "location",
    question: "環球貿易廣場位於哪個地方？",
    options: ["A. 柯士甸道西", "B. 尖沙咀", "C. 佐敦", "D. 旺角"],
    correct: 0,
    explanation: "環球貿易廣場位於柯士甸道西"
  },
  {
    id: 239,
    category: "location",
    question: "中環廣場位於哪個地方？",
    options: ["A. 港灣道", "B. 金鐘", "C. 灣仔", "D. 夏慤道"],
    correct: 0,
    explanation: "中環廣場位於港灣道"
  },
  {
    id: 240,
    category: "location",
    question: "中銀大廈位於哪個地方？",
    options: ["A. 花園道", "B. 中環", "C. 金鐘", "D. 德輔道中"],
    correct: 0,
    explanation: "中銀大廈位於花園道"
  },
  {
    id: 241,
    category: "location",
    question: "港島東中心位於哪個地方？",
    options: ["A. 鰂魚涌", "B. 北角", "C. 太古", "D. 西灣河"],
    correct: 0,
    explanation: "港島東中心位於鰂魚涌"
  },
  {
    id: 242,
    category: "location",
    question: "中遠大廈位於哪個地方？",
    options: ["A. 皇后大道中", "B. 中環", "C. 德輔道中", "D. 夏慤道"],
    correct: 0,
    explanation: "中遠大廈位於皇后大道中"
  },
  {
    id: 243,
    category: "location",
    question: "怡和大廈位於哪個地方？",
    options: ["A. 中環", "B. 金鐘", "C. 灣仔", "D. 銅鑼灣"],
    correct: 0,
    explanation: "怡和大廈位於中環"
  },
  {
    id: 244,
    category: "location",
    question: "永安集團大廈位於哪個地方？",
    options: ["A. 德輔道中", "B. 中環", "C. 皇后大道中", "D. 夏慤道"],
    correct: 0,
    explanation: "永安集團大廈位於德輔道中"
  },
  {
    id: 245,
    category: "location",
    question: "香港滙豐總行大廈位於哪個地方？",
    options: ["A. 中環", "B. 金鐘", "C. 灣仔", "D. 德輔道中"],
    correct: 0,
    explanation: "香港滙豐總行大廈位於中環"
  },
  {
    id: 246,
    category: "location",
    question: "合和中心位於哪個地方？",
    options: ["A. 灣仔", "B. 中環", "C. 銅鑼灣", "D. 金鐘"],
    correct: 0,
    explanation: "合和中心位於灣仔"
  },

  // 購物商場 (Shopping Malls) - Questions 247-274
  {
    id: 247,
    category: "location",
    question: "圓方位於哪個地方？",
    options: ["A. 柯士甸道西", "B. 尖沙咀", "C. 佐敦", "D. 旺角"],
    correct: 0,
    explanation: "圓方位於柯士甸道西"
  },
  {
    id: 248,
    category: "location",
    question: "又一城位於哪個地方？",
    options: ["A. 達之路", "B. 九龍塘", "C. 何文田", "D. 石硤尾"],
    correct: 0,
    explanation: "又一城位於達之路"
  },
  {
    id: 249,
    category: "location",
    question: "海港城位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 油麻地", "D. 佐敦"],
    correct: 0,
    explanation: "海港城位於尖沙咀"
  },
  {
    id: 250,
    category: "location",
    question: "置地廣場位於哪個地方？",
    options: ["A. 中環", "B. 金鐘", "C. 灣仔", "D. 銅鑼灣"],
    correct: 0,
    explanation: "置地廣場位於中環"
  },
  {
    id: 251,
    category: "location",
    question: "上水廣場位於哪個地方？",
    options: ["A. 龍琛路", "B. 上水", "C. 粉嶺", "D. 羅湖"],
    correct: 0,
    explanation: "上水廣場位於龍琛路"
  },
  {
    id: 252,
    category: "location",
    question: "朗豪坊位於哪個地方？",
    options: ["A. 旺角", "B. 尖沙咀", "C. 油麻地", "D. 大角咀"],
    correct: 0,
    explanation: "朗豪坊位於旺角"
  },
  {
    id: 253,
    category: "location",
    question: "荷里活廣場位於哪個地方？",
    options: ["A. 鑽石山", "B. 黃大仙", "C. 慈雲山", "D. 新蒲崗"],
    correct: 0,
    explanation: "荷里活廣場位於鑽石山"
  },
  {
    id: 254,
    category: "location",
    question: "時代廣場位於哪個地方？",
    options: ["A. 銅鑼灣", "B. 灣仔", "C. 中環", "D. 北角"],
    correct: 0,
    explanation: "時代廣場位於銅鑼灣"
  },
  {
    id: 255,
    category: "location",
    question: "西港城位於哪個地方？",
    options: ["A. 上環", "B. 中環", "C. 金鐘", "D. 灣仔"],
    correct: 0,
    explanation: "西港城位於上環"
  },
  {
    id: 256,
    category: "location",
    question: "黃埔新天地位於哪個地方？",
    options: ["A. 紅磡", "B. 土瓜灣", "C. 何文田", "D. 九龍城"],
    correct: 0,
    explanation: "黃埔新天地位於紅磡"
  },
  {
    id: 257,
    category: "location",
    question: "元創方位於哪個地方？",
    options: ["A. 鴨巴甸街", "B. 中環", "C. 上環", "D. 金鐘"],
    correct: 0,
    explanation: "元創方位於鴨巴甸街"
  },
  {
    id: 258,
    category: "location",
    question: "世貿中心位於哪個地方？",
    options: ["A. 告士打道", "B. 銅鑼灣", "C. 灣仔", "D. 北角"],
    correct: 0,
    explanation: "世貿中心位於告士打道"
  },
  {
    id: 259,
    category: "location",
    question: "K11購物藝術館位於哪個地方？",
    options: ["A. 河內道", "B. 尖沙咀", "C. 旺角", "D. 佐敦"],
    correct: 0,
    explanation: "K11購物藝術館位於河內道"
  },
  {
    id: 260,
    category: "location",
    question: "青衣城位於哪個地方？",
    options: ["A. 青敬路", "B. 青衣", "C. 葵涌", "D. 荃灣"],
    correct: 0,
    explanation: "青衣城位於青敬路"
  },
  {
    id: 261,
    category: "location",
    question: "新城市廣場位於哪個地方？",
    options: ["A. 沙田", "B. 大埔", "C. 火炭", "D. 馬鞍山"],
    correct: 0,
    explanation: "新城市廣場位於沙田"
  },
  {
    id: 262,
    category: "location",
    question: "奧海城2期位於哪個地方？",
    options: ["A. 海庭道", "B. 大角咀", "C. 深水埗", "D. 長沙灣"],
    correct: 0,
    explanation: "奧海城2期位於海庭道"
  },
  {
    id: 263,
    category: "location",
    question: "崇光銅鑼灣店位於哪個地方？",
    options: ["A. 軒尼詩道", "B. 銅鑼灣", "C. 灣仔", "D. 北角"],
    correct: 0,
    explanation: "崇光銅鑼灣店位於軒尼詩道"
  },
  {
    id: 264,
    category: "location",
    question: "屯門市廣場位於哪個地方？",
    options: ["A. 屯順街", "B. 屯門", "C. 元朗", "D. 天水圍"],
    correct: 0,
    explanation: "屯門市廣場位於屯順街"
  },
  {
    id: 265,
    category: "location",
    question: "中港城位於哪個地方？",
    options: ["A. 尖沙咀", "B. 旺角", "C. 油麻地", "D. 佐敦"],
    correct: 0,
    explanation: "中港城位於尖沙咀"
  },
  {
    id: 266,
    category: "location",
    question: "東薈城名店倉位於哪個地方？",
    options: ["A. 東涌", "B. 大嶼山", "C. 機場", "D. 亞洲國際博覽館"],
    correct: 0,
    explanation: "東薈城名店倉位於東涌"
  },
  {
    id: 267,
    category: "location",
    question: "利舞臺位於哪個地方？",
    options: ["A. 銅鑼灣", "B. 灣仔", "C. 中環", "D. 北角"],
    correct: 0,
    explanation: "利舞臺位於銅鑼灣"
  },
  {
    id: 268,
    category: "location",
    question: "南豐紗廠位於哪個地方？",
    options: ["A. 白田壩街", "B. 深水埗", "C. 長沙灣", "D. 荔枝角"],
    correct: 0,
    explanation: "南豐紗廠位於白田壩街"
  },
  {
    id: 269,
    category: "location",
    question: "K11人文購物藝術館位於哪個地方？",
    options: ["A. 梳士巴利道", "B. 尖沙咀", "C. 旺角", "D. 佐敦"],
    correct: 0,
    explanation: "K11人文購物藝術館位於梳士巴利道"
  },
  {
    id: 270,
    category: "location",
    question: "裕民坊位於哪個地方？",
    options: ["A. 觀塘", "B. 九龍灣", "C. 牛頭角", "D. 藍田"],
    correct: 0,
    explanation: "裕民坊位於觀塘"
  },
  {
    id: 271,
    category: "location",
    question: "AIRSIDE位於哪個地方？",
    options: ["A. 啟德", "B. 九龍城", "C. 土瓜灣", "D. 紅磡"],
    correct: 0,
    explanation: "AIRSIDE位於啟德"
  },
  {
    id: 272,
    category: "location",
    question: "圍方位於哪個地方？",
    options: ["A. 車公廟路", "B. 沙田", "C. 大圍", "D. 火炭"],
    correct: 0,
    explanation: "圍方位於車公廟路"
  },
  {
    id: 273,
    category: "location",
    question: "APM位於哪個地方？",
    options: ["A. 觀塘", "B. 九龍灣", "C. 牛頭角", "D. 藍田"],
    correct: 0,
    explanation: "APM位於觀塘"
  },
  {
    id: 274,
    category: "location",
    question: "V Walk位於哪個地方？",
    options: ["A. 深旺道", "B. 深水埗", "C. 長沙灣", "D. 荔枝角"],
    correct: 0,
    explanation: "V Walk位於深旺道"
  },

  // 住宅樓宇 (Residential Buildings) - Questions 275-307
  {
    id: 275,
    category: "location",
    question: "德福花園位於哪個地方？",
    options: ["A. 偉業街", "B. 九龍灣", "C. 觀塘", "D. 牛頭角"],
    correct: 0,
    explanation: "德福花園位於偉業街"
  },
  {
    id: 276,
    category: "location",
    question: "淘大花園位於哪個地方？",
    options: ["A. 九龍灣", "B. 觀塘", "C. 牛頭角", "D. 藍田"],
    correct: 0,
    explanation: "淘大花園位於九龍灣"
  },
  {
    id: 277,
    category: "location",
    question: "匯景花園位於哪個地方？",
    options: ["A. 藍田", "B. 觀塘", "C. 油塘", "D. 將軍澳"],
    correct: 0,
    explanation: "匯景花園位於藍田"
  },
  {
    id: 278,
    category: "location",
    question: "綠楊新邨位於哪個地方？",
    options: ["A. 荃灣", "B. 葵涌", "C. 青衣", "D. 荔枝角"],
    correct: 0,
    explanation: "綠楊新邨位於荃灣"
  },
  {
    id: 279,
    category: "location",
    question: "盈翠半島位於哪個地方？",
    options: ["A. 青衣", "B. 葵涌", "C. 荃灣", "D. 荔枝角"],
    correct: 0,
    explanation: "盈翠半島位於青衣"
  },
  {
    id: 280,
    category: "location",
    question: "港灣豪庭位於哪個地方？",
    options: ["A. 福利街", "B. 觀塘", "C. 九龍灣", "D. 牛頭角"],
    correct: 0,
    explanation: "港灣豪庭位於福利街"
  },
  {
    id: 281,
    category: "location",
    question: "新屯門中心位於哪個地方？",
    options: ["A. 龍門路", "B. 屯門", "C. 元朗", "D. 天水圍"],
    correct: 0,
    explanation: "新屯門中心位於龍門路"
  },
  {
    id: 282,
    category: "location",
    question: "錦綉花園位於哪個地方？",
    options: ["A. 元朗", "B. 屯門", "C. 天水圍", "D. 上水"],
    correct: 0,
    explanation: "錦綉花園位於元朗"
  },
  {
    id: 283,
    category: "location",
    question: "嘉湖山莊位於哪個地方？",
    options: ["A. 天水圍", "B. 元朗", "C. 屯門", "D. 上水"],
    correct: 0,
    explanation: "嘉湖山莊位於天水圍"
  },
  {
    id: 284,
    category: "location",
    question: "美孚新邨位於哪個地方？",
    options: ["A. 荔枝角", "B. 深水埗", "C. 長沙灣", "D. 大角咀"],
    correct: 0,
    explanation: "美孚新邨位於荔枝角"
  },
  {
    id: 285,
    category: "location",
    question: "太古城位於哪個地方？",
    options: ["A. 鰂魚涌", "B. 北角", "C. 太古", "D. 西灣河"],
    correct: 0,
    explanation: "太古城位於鰂魚涌"
  },
  {
    id: 286,
    category: "location",
    question: "沙田第一城位於哪個地方？",
    options: ["A. 小瀝源路", "B. 沙田", "C. 火炭", "D. 大圍"],
    correct: 0,
    explanation: "沙田第一城位於小瀝源路"
  },
  {
    id: 287,
    category: "location",
    question: "黃埔花園位於哪個地方？",
    options: ["A. 紅磡", "B. 土瓜灣", "C. 何文田", "D. 九龍城"],
    correct: 0,
    explanation: "黃埔花園位於紅磡"
  },
  {
    id: 288,
    category: "location",
    question: "海怡半島位於哪個地方？",
    options: ["A. 鴨脷洲", "B. 香港仔", "C. 薄扶林", "D. 黃竹坑"],
    correct: 0,
    explanation: "海怡半島位於鴨脷洲"
  },
  {
    id: 289,
    category: "location",
    question: "麗港城位於哪個地方？",
    options: ["A. 觀塘", "B. 九龍灣", "C. 牛頭角", "D. 藍田"],
    correct: 0,
    explanation: "麗港城位於觀塘"
  },
  {
    id: 290,
    category: "location",
    question: "愉景灣位於哪個地方？",
    options: ["A. 大嶼山", "B. 東涌", "C. 長洲", "D. 坪洲"],
    correct: 0,
    explanation: "愉景灣位於大嶼山"
  },
  {
    id: 291,
    category: "location",
    question: "新都城位於哪個地方？",
    options: ["A. 寶林", "B. 將軍澳", "C. 調景嶺", "D. 坑口"],
    correct: 0,
    explanation: "新都城位於寶林"
  },
  {
    id: 292,
    category: "location",
    question: "杏花邨位於哪個地方？",
    options: ["A. 柴灣", "B. 筲箕灣", "C. 西灣河", "D. 小西灣"],
    correct: 0,
    explanation: "杏花邨位於柴灣"
  },
  {
    id: 293,
    category: "location",
    question: "麗城花園位於哪個地方？",
    options: ["A. 荃灣", "B. 葵涌", "C. 青衣", "D. 荔枝角"],
    correct: 0,
    explanation: "麗城花園位於荃灣"
  },
  {
    id: 294,
    category: "location",
    question: "映灣園位於哪個地方？",
    options: ["A. 東涌", "B. 大嶼山", "C. 機場", "D. 亞洲國際博覽館"],
    correct: 0,
    explanation: "映灣園位於東涌"
  },
  {
    id: 295,
    category: "location",
    question: "珀麗灣位於哪個地方？",
    options: ["A. 馬灣", "B. 青衣", "C. 荃灣", "D. 大嶼山"],
    correct: 0,
    explanation: "珀麗灣位於馬灣"
  },
  {
    id: 296,
    category: "location",
    question: "維景灣畔位於哪個地方？",
    options: ["A. 調景嶺", "B. 將軍澳", "C. 坑口", "D. 寶林"],
    correct: 0,
    explanation: "維景灣畔位於調景嶺"
  },
  {
    id: 297,
    category: "location",
    question: "海逸豪園位於哪個地方？",
    options: ["A. 紅磡", "B. 土瓜灣", "C. 何文田", "D. 九龍城"],
    correct: 0,
    explanation: "海逸豪園位於紅磡"
  },
  {
    id: 298,
    category: "location",
    question: "置富花園位於哪個地方？",
    options: ["A. 薄扶林", "B. 香港仔", "C. 黃竹坑", "D. 鴨脷洲"],
    correct: 0,
    explanation: "置富花園位於薄扶林"
  },
  {
    id: 299,
    category: "location",
    question: "將軍澳中心位於哪個地方？",
    options: ["A. 唐德街", "B. 將軍澳", "C. 調景嶺", "D. 坑口"],
    correct: 0,
    explanation: "將軍澳中心位於唐德街"
  },
  {
    id: 300,
    category: "location",
    question: "大埔中心位於哪個地方？",
    options: ["A. 安邦路", "B. 大埔", "C. 太和", "D. 粉嶺"],
    correct: 0,
    explanation: "大埔中心位於安邦路"
  },
  {
    id: 301,
    category: "location",
    question: "東堤灣畔位於哪個地方？",
    options: ["A. 東涌", "B. 大嶼山", "C. 機場", "D. 亞洲國際博覽館"],
    correct: 0,
    explanation: "東堤灣畔位於東涌"
  },
  {
    id: 302,
    category: "location",
    question: "新港城位於哪個地方？",
    options: ["A. 馬鞍山", "B. 沙田", "C. 大圍", "D. 火炭"],
    correct: 0,
    explanation: "新港城位於馬鞍山"
  },
  {
    id: 303,
    category: "location",
    question: "富榮花園位於哪個地方？",
    options: ["A. 海庭道", "B. 大角咀", "C. 深水埗", "D. 長沙灣"],
    correct: 0,
    explanation: "富榮花園位於海庭道"
  },
  {
    id: 304,
    category: "location",
    question: "海山樓位於哪個地方？",
    options: ["A. 鰂魚涌", "B. 北角", "C. 太古", "D. 西灣河"],
    correct: 0,
    explanation: "海山樓位於鰂魚涌"
  },
  {
    id: 305,
    category: "location",
    question: "嘉匯位於哪個地方？",
    options: ["A. 沐寧街", "B. 長沙灣", "C. 深水埗", "D. 荔枝角"],
    correct: 0,
    explanation: "嘉匯位於沐寧街"
  },
  {
    id: 306,
    category: "location",
    question: "擎天半島位於哪個地方？",
    options: ["A. 柯士甸道西", "B. 尖沙咀", "C. 佐敦", "D. 旺角"],
    correct: 0,
    explanation: "擎天半島位於柯士甸道西"
  },
  {
    id: 307,
    category: "location",
    question: "形點位於哪個地方？",
    options: ["A. 朗日路", "B. 元朗", "C. 天水圍", "D. 屯門"],
    correct: 0,
    explanation: "形點位於朗日路"
  },

  // 大專院校 (Universities/Colleges) - Questions 308-319
  {
    id: 308,
    category: "location",
    question: "香港恒生大學位於哪個地方？",
    options: ["A. 小瀝源", "B. 沙田", "C. 大圍", "D. 火炭"],
    correct: 0,
    explanation: "香港恒生大學位於小瀝源"
  },
  {
    id: 309,
    category: "location",
    question: "香港城市大學位於哪個地方？",
    options: ["A. 九龍塘", "B. 何文田", "C. 石硤尾", "D. 深水埗"],
    correct: 0,
    explanation: "香港城市大學位於九龍塘"
  },
  {
    id: 310,
    category: "location",
    question: "香港浸會大學位於哪個地方？",
    options: ["A. 九龍塘", "B. 何文田", "C. 石硤尾", "D. 深水埗"],
    correct: 0,
    explanation: "香港浸會大學位於九龍塘"
  },
  {
    id: 311,
    category: "location",
    question: "香港樹仁大學位於哪個地方？",
    options: ["A. 北角", "B. 鰂魚涌", "C. 太古", "D. 筲箕灣"],
    correct: 0,
    explanation: "香港樹仁大學位於北角"
  },
  {
    id: 312,
    category: "location",
    question: "嶺南大學位於哪個地方？",
    options: ["A. 屯門", "B. 元朗", "C. 天水圍", "D. 上水"],
    correct: 0,
    explanation: "嶺南大學位於屯門"
  },
  {
    id: 313,
    category: "location",
    question: "香港中文大學位於哪個地方？",
    options: ["A. 沙田", "B. 大埔", "C. 火炭", "D. 馬鞍山"],
    correct: 0,
    explanation: "香港中文大學位於沙田"
  },
  {
    id: 314,
    category: "location",
    question: "香港教育大學位於哪個地方？",
    options: ["A. 大埔", "B. 沙田", "C. 粉嶺", "D. 上水"],
    correct: 0,
    explanation: "香港教育大學位於大埔"
  },
  {
    id: 315,
    category: "location",
    question: "香港理工大學位於哪個地方？",
    options: ["A. 紅磡", "B. 土瓜灣", "C. 何文田", "D. 九龍城"],
    correct: 0,
    explanation: "香港理工大學位於紅磡"
  },
  {
    id: 316,
    category: "location",
    question: "香港科技大學位於哪個地方？",
    options: ["A. 清水灣", "B. 將軍澳", "C. 調景嶺", "D. 坑口"],
    correct: 0,
    explanation: "香港科技大學位於清水灣"
  },
  {
    id: 317,
    category: "location",
    question: "香港都會大學位於哪個地方？",
    options: ["A. 何文田", "B. 九龍塘", "C. 石硤尾", "D. 紅磡"],
    correct: 0,
    explanation: "香港都會大學位於何文田"
  },
  {
    id: 318,
    category: "location",
    question: "香港大學本部大樓位於哪個地方？",
    options: ["A. 般咸道", "B. 薄扶林", "C. 中環", "D. 半山"],
    correct: 0,
    explanation: "香港大學本部大樓位於般咸道"
  },
  {
    id: 319,
    category: "location",
    question: "聖方濟各大學位於哪個地方？",
    options: ["A. 翠嶺里", "B. 堅尼地城", "C. 薄扶林", "D. 香港仔"],
    correct: 0,
    explanation: "聖方濟各大學位於翠嶺里"
  },
];

const LocationPractice: NextPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);

  const currentQ = locationQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === locationQuestions.length - 1;

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
    return Math.round((correctAnswers / locationQuestions.length) * 100);
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
          <title>地點練習結果 - 香港的士筆試練習</title>
          <meta name="description" content="香港的士筆試地點練習結果" />
        </Head>
        
        <main style={styles.main}>
          <div style={styles.container}>
            <div style={styles.header}>
              <Link href="/practice">
                <button style={styles.backButton}>← 返回練習選擇</button>
              </Link>
            </div>

            <div style={styles.resultCard}>
              <h1 style={styles.title}>🎉 地點練習完成！</h1>
              <div style={styles.scoreText}>
                你的得分：{score}% ({grade})
              </div>
              <p style={{ color: score >= 70 ? '#4CAF50' : '#f44336', fontSize: '1.2rem' }}>
                {score >= 70 ? '恭喜！你對香港地點有良好的認識' : '建議多熟悉香港各區域的地點'}
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
          <title>答案檢視 - 地點練習</title>
          <meta name="description" content="檢視地點練習的詳細答案" />
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
              <h1 style={styles.reviewTitle}>📋 答案檢視</h1>
              
              {locationQuestions.map((question, index) => {
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
        <title>地點試題練習 - 香港的士筆試練習</title>
        <meta name="description" content="練習香港各區地點、建築物和地標相關題目" />
      </Head>
      
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.header}>
            <Link href="/practice">
              <button style={styles.backButton}>← 返回練習選擇</button>
            </Link>
            <div style={styles.progress}>
              第 {currentQuestion + 1} 題，共 {locationQuestions.length} 題
            </div>
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
};

export default LocationPractice;
