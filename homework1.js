/*
Program name: homework1.html
Author: Thi Dang
Date created: 09/04/2024
Date last edited: 09/21/2024
Version: 1.0
Description: JS for homework1.HTML
*/

 {{javascript}}
        const d = new Date();
let text = d.toLocaleDateString();
document.getElementById("today").innerHTML = text;
