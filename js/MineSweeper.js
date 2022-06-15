// 전역변수

let mines = []; // 지뢰 위치 배열
let tds = []; // 각 박스 배열

// 지뢰 이미지 객체 생성
let mine = new Image();
// 깃발 이미지 객체 생성
let flag = new Image();

// 함수

function init(){ // 초기화 함수
    
    // 지뢰 위치 초기화 하기
    mines = []; // 배열 초기화
    mines[0] = Math.floor(Math.random()*81);
    while (true){
        let m = Math.floor(Math.random()*81);
        for (let i = 0; i < mines.length; i++){
            if (mines[i] == m){
                m = -1;
            }
        }
        if (m != -1){
            mines.push(m);
        }

        if (mines.length == 10){
            break;
        }
    }
    
    // 박스 배열 생성
    tds = document.getElementsByTagName('td');
    // 전 게임 지뢰 초기화
    for (let i = 0; i < 81; i++){
        tds[i].class = "";
    }
    // 지뢰 있는 박스들의 class를 mine으로 지정
    for (let i = 0; i < 10; i++){ 
        tds[mines[i]].class = "mine";
    }

    // 지뢰 이미지 객체 생성
    mine.src = "imgs/MineSweeper/mine.png";
    // 깃발 이미지 객체 생성
    flag.src = "imgs/MineSweeper/flag.png";

    alert(mines);

    // 이미지 다 지우기 & 색 초기화 & 숫자 지우기
    for (let i = 0; i < tds.length; i++){
        if(tds[i].children.length > 0){
            let ch = tds[i].lastElementChild;
            tds[i].removeChild(ch);
        }
        tds[i].style.backgroundColor = 'forestgreen';
        tds[i].innerHTML = "";
    }
}

// 마우스 우클릭 시 메뉴 뜨는거 방지
document.oncontextmenu = function(){
    return false;
}

function clicked(e, obj){ // 클릭 함수
    // 마우스 우클릭이면 깃발 설치
    if(e.button == 2){
        if (obj.children.length == 0){
            let img = document.createElement('img');
            img.src = flag.src;
            obj.append(img)
        }
        else {
            let img = obj.lastElementChild;
            obj.removeChild(img);
        }
        return;     
    }
    if(e.button != 2 && obj.children.length != 0){ // 깃발이 있으면 클릭 안됨
        return;
    }
    // 지뢰 밟았는지 감지
    //alert(obj.id); 
    if (obj.class == "mine"){
        //alert(obj.class);
        obj.style.backgroundColor = 'red';
        //지뢰 위치에 지뢰 띄우기
        for (let i = 0; i < mines.length; i++){
            if (tds[mines[i]].children.length > 0){ // 깃발 있으면 이미지 변경
                let ch = tds[mines[i]].lastElementChild;
                ch.src = mine.src;
            }
            else { // 깃발 없으면 지뢰 이미지 추가
                let mineImg = document.createElement('img');
            mineImg.src = mine.src
            tds[mines[i]].append(mineImg);
            }        
        }
        // 게임 오버 메시지 띄우기
        setTimeout( function (){
            alert("GAME OVER..");
            // 초기화
            init();
            return;
        }, 100);     
    }
    else{
        // 주변 지뢰 개수 조사
        check(obj);
    }
}

// 주변 지뢰 개수 조사 함수
function check(obj){
    
    obj.style.backgroundColor = 'azure' // 색 없에기
    let area = [-10, -9, -8, -1, +1, 8, 9, 10]; // 조사할 위치 배열
    let mineCnt = 0; // 주변의 지뢰 개수
    for (let i = 0; i < 8; i++){

        // 벽에 충돌하는 경우 처리하기
        if ((i==0 || i==1 || i==2) && obj.id < 9){ // 위쪽 벽
            continue;
        }
        else if ((i==5 || i==6 || i==7) && obj.id > 71){ // 아래쪽 벽
            continue;
        }
        else if ((i==0 || i==3 || i==5) && obj.id%9 == 0){ // 왼쪽 벽
            continue;
        }
        else if ((i==2 || i==4 || i==7) && obj.id%9 == 8){ // 오른쪽 벽
            continue;
        }

        let search = parseInt(obj.id) + parseInt(area[i]) // 찾을 위치   
        if (tds[search].class == 'mine'){
            mineCnt++;
        }
    }
    if(mineCnt > 0){
        obj.innerHTML = mineCnt; // 주변에 지뢰가 있다면 숫자로 표시
    }
    else if (mineCnt == 0){ // 주변에 지뢰가 하나도 없다면 그 주변을 탐색
        for (let i = 0; i < 8; i++){
            // 벽에 충돌하는 경우 처리하기
            if ((i==0 || i==1 || i==2) && obj.id < 9){ // 위쪽 벽
                continue;
            }
            else if ((i==5 || i==6 || i==7) && obj.id > 71){ // 아래쪽 벽
                continue;
            }
            else if ((i==0 || i==3 || i==5) && obj.id%9 == 0){ // 왼쪽 벽
                continue;
            }
            else if ((i==2 || i==4 || i==7) && obj.id%9 == 8){ // 오른쪽 벽
                continue;
            }
            let search = parseInt(obj.id) + parseInt(area[i]) // 찾을 위치
            if (tds[search].style.backgroundColor == 'azure'){ // 이미 조사했던 블록이면 패스
                continue;
            }
            check(tds[search]);
        }
    }
    
}