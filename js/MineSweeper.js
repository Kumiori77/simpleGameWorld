// 전역변수

let mines = []; // 지뢰 위치 배열
let tds = []; // 각 박스 배열

// 지뢰 이미지 객체 생성
let mine = new Image();
// 깃발 이미지 객체 생성
let flag = new Image();

let totalCnt; // 총 체크한 횟수

let flagCnt; // 깃발 카운트
let flagscreen; // 깃발 스크린에 표시

let time; // 시간 변수
let timerscreen; // 타이머 스크린에 표시
let timerID;   // 타이머 아이디

// 함수

function init(){ // 초기화 함수
    // 깃발 카운트 초기화
    flagCnt = 10;
    // 깃발 스크린에 표시
    flagscreen = document.getElementById('flag');
    flagscreen.innerHTML = flagCnt;
    // 시간 초기화
    time = 0;
    timerscreen = document.getElementById('timer');
    timerscreen.innerHTML = "00";
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
        // 이벤트 리스너 추가
        tds[i].addEventListener("mouseover", over);
        tds[i].addEventListener("mouseout", out);
    }
    // 지뢰 있는 박스들의 class를 mine으로 지정
    for (let i = 0; i < 10; i++){ 
        tds[mines[i]].class = "mine";
    }

    // 지뢰 이미지 객체 생성
    mine.src = "imgs/MineSweeper/mine.png";
    // 깃발 이미지 객체 생성
    flag.src = "imgs/MineSweeper/flag.png";

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

function over(){ // ommouseover 함수
    this.style.border = '2px solid black';
}
function out(){ // ommouseout 함수
    this.style.border = '1px solid black';
}

function clicked(e, obj){ // 클릭 함수
    // 첫 클릭이면 타이머 실행
    if (time == 0){
        timer();
    }

    // 마우스 우클릭이면 깃발 설치
    if(e.button == 2){
        if (obj.children.length == 0){
            let img = document.createElement('img');
            img.src = flag.src;
            obj.append(img)
            flagCnt--;
        }
        else {
            let img = obj.lastElementChild;
            obj.removeChild(img);
            flagCnt++;
        }
        flagscreen.innerHTML = flagCnt; // 남은 깃발 개수 표시
        return;     
    }
    if(e.button != 2 && obj.children.length != 0){ // 깃발이 있으면 클릭 안됨
        return;
    }
    // 지뢰 밟았는지 감지
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
            clearTimeout(timerID); // 타이머 종료
            alert("GAME OVER..");
            // 초기화
            init();
            return;
        }, 50);     
    }
    else{
        // 주변 지뢰 개수 조사
        check(obj);
    }
}

// 주변 지뢰 개수 조사 함수
function check(obj){
    
    obj.style.backgroundColor = 'lavender' // 색 없에기
    obj.removeEventListener("mouseover", over); // onmouseover 이벤트 제거

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
    totalCnt = 0;
    for (let i = 0; i < 81; i++){
        if (tds[i].style.backgroundColor == "lavender"){
            totalCnt++
        }
    }
    if (totalCnt == 71){ // 게임 클리어
        
        setTimeout(function(){
            let msg = "Congratulations\n";
            msg += "기록  =>  ";
            let sec = parseInt(time / 10);  // 초
            if (sec < 10){ // 항상 2자리로 표시
                sec = "0" + String(sec); 
            }
            let mil = parseInt(time % 10);   // 밀리초
            if (mil < 10){ // 항상 2자리로 표시
                mil = "0" + String(mil); 
            }
            msg += String(sec) + " : " + String(mil);
            alert(msg);
            clearTimeout(timerID); // 타이머 종료
            init();
            return;
        }, 50);
        
    }

    if (mineCnt == 0){ // 주변에 지뢰가 하나도 없다면 그 주변을 탐색
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
            if (tds[search].style.backgroundColor == 'lavender'){ // 이미 조사했던 블록이면 패스
                continue;
            }
            check(tds[search]);
        }
    }
    
}

function timer(){   // 타이머 함수
    time++;
    timerscreen.innerHTML = timePrint(time);
    
    timerID = setTimeout(timer, 100); // 0.01 초 뒤에 제 호출    
    
}
function timePrint(time) {  // 시간 정리 함수
    let sec = parseInt(time / 10);  // 초
    if (sec < 10){ // 항상 2자리로 표시
        sec = "0" + String(sec); 
    }
    let string = String(sec);
    return string; // 정리된 시간 출력
}