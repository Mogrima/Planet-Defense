# Planet-Defense
<img src="https://img.shields.io/badge/JavaScript-004524?style=for-the-badge&logo=javascript&logoColor=yellow" alt="JavaScript"> <img src="https://img.shields.io/badge/Canvas-6495ed?style=for-the-badge&logo=html5&logoColor=#E34F26" alt="Canvas">
<img src="https://img.shields.io/badge/HTML5-004524?style=for-the-badge&logo=html5&logoColor=#E34F26" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-004524?style=for-the-badge&logo=css3&logoColor=#E34F26" alt="css3">

## About
Анализ прошел успешно: контакт с врагом подтвержден. Похоже наши лазары запускают клеточный митоз у этого вида. Что это значит? Если мы выстрелим в них, они разделяться на множество более мелких существ. Значит, сначала мы должны разделить их и нацелиться на клонов. Атакующие монстры все пребывают и единственное, что нам остается, это уничтожить их с помощью супер-лазера. Для этого, нам надо продержаться до его полной зарядки, чтобы уничтожить всех врагов разом. Лазер заряжется от высвободившейся энергии от уничтоженных врагов, он захватывает ее из открытого космоса и перенаправляет в свою батарею. Поэтому нам надо как можно быстрее и больше уничтожить монстров, стремящихся к нашей планете.

## Demo
![Изображение][1]

## Enemies
В игре 4 типа врагов, каждый из которых имеет свое количество жизней, очков и другие особенности. 
Первый из 4 типов - это Лобстеморф. У него самое большое количество жизней и при попадании в него снаряда, он раздваивается на более мелких врагов.

![Изображение][2] ![Изображение][3] ![Изображение][4] ![Изображение][5]

Второй тип - это Риноморф. У него 4 жизни и с каждым попаданием снаряда можно видеть, как разрушается его мощная броня.

![Изображение][6] ![Изображение][7] ![Изображение][8] ![Изображение][9]

Третий тип - это Битлморф. У него 1 жизнь и из-за этого он легко уничтожается, но сам наносит разрушение ничуть не хуже предыдущих своих товарищей, недооценивайте его!

![Изображение][10] ![Изображение][11] ![Изображение][12] ![Изображение][13]

Последний тип - Астероид. Технологический прогресс уже помог легко расправляться с этими космическими пришельцами, но они добаваются своего не качеством, а количеством!

![Изображение][14]

## Control
Космический корабль перемещается вокруг планеты при помощи мыши, стрельба осуществляется при нажатии левой кнопки мыши или на клавишу '1'.

## How to play
1. Открыть игру в браузере можно по [ссылке](https://mogrima.github.io/Planet-Defense/)
2. Или скачать архив с игрой из репозитория. Для того, чтобы запустить игру локально:
  * Убедиться, что на ПК установлена node.js
  * Открыть консоль в корне проекта и набрать команду:
  ```node server.js ```
  * Если страница браузера не откроется автоматически, это можно сделать самостоятельно, просто указав в адресной строке: ```http://127.0.0.1:8125/```

## Acknowledgments
Lessons and support:

<img src="https://img.shields.io/badge/Franks laboratory -ffd700?style=for-the-badge&logo=youtube&logoColor=#FF0000" alt="Franks laboratory ">

Sounds:

<img src="https://img.shields.io/badge/DavidKBD -ffd700?style=for-the-badge&logo=itchdotio&logoColor=#FA5C5C" alt="DavidKBD "> <img src="https://img.shields.io/badge/Yo Frankie! -ffd700?style=for-the-badge&logo=itchdotio&logoColor=#FA5C5C" alt="Yo Frankie! "> <img src="https://img.shields.io/badge/NenadSimic -ffd700?style=for-the-badge&logo=itchdotio&logoColor=#FA5C5C" alt="NenadSimic "> <img src="https://img.shields.io/badge/SFX 1 Wrong Choice -ffd700?style=for-the-badge&logo=itchdotio&logoColor=#FA5C5C" alt="SFX 1 Wrong Choice "> <img src="https://img.shields.io/badge/Franks laboratory -ffd700?style=for-the-badge&logo=youtube&logoColor=#FF0000" alt="Franks laboratory ">

Sprites and background:

<img src="https://img.shields.io/badge/Franks laboratory -ffd700?style=for-the-badge&logo=youtube&logoColor=#FF0000" alt="Franks laboratory ">

## License

Unlicense

[1]:https://github.com/Mogrima/Planet-Defense/blob/master/Assets/preview/preview.png
[2]:Assets/preview/enemy1.png
[3]:Assets/preview/enemy2.png
[4]:Assets/preview/enemy3.png
[5]:Assets/preview/enemy4.png
[6]:Assets/preview/enemy5.png
[7]:Assets/preview/enemy6.png
[8]:Assets/preview/enemy7.png
[9]:Assets/preview/enemy8.png
[10]:Assets/preview/enemy9.png
[11]:Assets/preview/enemy10.png
[12]:Assets/preview/enemy11.png
[13]:Assets/preview/enemy12.png
[14]:Assets/preview/enemy13.png
