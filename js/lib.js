// menu()
//메뉴 클릭하면 세부 내용 표시하기

//메뉴의 세부 내용 배열
let play1 = ["1Ball1Strike", "MemoryGame", "Othelo", "MineSweeper"];
let play2 = ["MemoryGame", "Othelo"];
// 메뉴 리스트 DOM 객체 생성
let newUlP1 = document.createElement("ul");
let newUlP2 = document.createElement("ul");
//메뉴 리스트 DOM 객체 세부 새용 설정
for (let i = 0; i < play1.length; i++){
    let newLi = document.createElement("li");
    let newA = document.createElement("a");
    newA.href = play1[i] + ".html";
    newA.innerHTML = play1[i];
    newLi.append(newA);
    newUlP1.append(newLi);   
}

for (let i = 0; i < play2.length; i++){
    let newLi = document.createElement("li");
    let newA = document.createElement("a");
    newA.href = play2[i] + ".html";
    newA.innerHTML = play2[i];
    newLi.append(newA);
    newUlP2.append(newLi);
}

//메뉴 세부 내용 보여주기 & 숨기기 함수
function menuOver(obj){
    if (obj.id == 'play1'){                
        obj.append(newUlP1);       
    } else if (obj.id == 'play2'){
        obj.append(newUlP2);
    }      
}

function menuOut(){                    
    let p1 = document.getElementById('play1')   
    let p2 = document.getElementById('play2')
    if (p1.lastChild == newUlP1){
        p1.removeChild(newUlP1);
    }
    if (p2.lastChild == newUlP2){
        p2.removeChild(newUlP2);
    }  
}