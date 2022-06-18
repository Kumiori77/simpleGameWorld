// 전역변수

let tds; // 박스 배열

let turn; // 턴 변수

// 점수 변수
let P1Score;   
let P2Score;
// 점수 화면 표시 변수
let P1ScoreScreen;
let P2ScoreScreen;

// 플레이어 변수
let P1;
let P2;

// 바꿀 박스 배열
let maybeChange;    // 바꿀지 확인중인 박스들
let change;         // 바꾸는게 확정된 박스들

// 게임 모드 변수
let mode;

// 함수
function init(){    // 초기화 함수
    tds = [];
    tds = document.getElementsByTagName('td'); // 박스 배열 생성
    // 색 초기화
    for (let i = 0; i < 64; i++){
        if (i == 27 || i == 36){
            tds[i].style.backgroundColor = 'blue';
        }
        else if (i == 28 || i == 35){
            tds[i].style.backgroundColor = 'red';
        }
        else {
            tds[i].style.backgroundColor = 'lavender'
        }
    }

    turn = 0; // 턴 초기화
    // 점수 초기화
    P1Score = 0;
    P2Score = 0;
    // 점수 화면 표시 변수
    P1ScoreScreen = document.getElementById('P1Score');
    P2ScoreScreen = document.getElementById('P2Score');

    // 바꿀 박스 리스트 초기화
    maybeChange = [];
    change = [];

    // 플레이어 변수 초기화
    P1 = document.getElementById('P1');
    P2 = document.getElementById('P2');
    // 플레이어 턴 표시
    P1.style.border = '2px solid black'; 
    P2.style.border = '0px solid black';

    // 스코어 표시
    for (let i = 0; i < 64; i++){
        if(tds[i].style.backgroundColor == 'red'){
            P1Score++;
        }
        else if (tds[i].style.backgroundColor == 'blue'){
            P2Score++;
        }
    }
    P1ScoreScreen.innerHTML = P1Score;
    P2ScoreScreen.innerHTML = P2Score;

}

function clicked(obj){  // 클릭 함수
    if (obj.style.backgroundColor != 'lavender'){   // 이미 선택된 박스를 클릭한 경우 패스
        return;
    }
    turn++; // 턴 1 증가
    check(obj); // 점수가 있나 체크

    if (change.length == 0){    // 바꿀 수 있는 박스가 없는 경우
        alert("잘못된 위치를 클릭했습니다."); // 오류 알림
        turn--; //턴 무르고 다시 하기
        return;
    }
    else {  // 바꿀 박스가 있는 경우 바꾸기
        let color;  // 바꿀 색 변수
        // 해당 플레이어의 색으로 변경
        if (turn%2 == 1){
            color = 'red';
        }else {
            color = 'blue';
        }
        obj.style.backgroundColor = color;    // 클릭한 박스 색 변경
        for (let i = 0; i < change.length; i++){
            change[i].style.backgroundColor = color;   // 확정 변수의 박스들 색 변경
        }
    }
    
    // 스코어 표시
    P1Score = 0, P2Score = 0;   // 점수 초기화
    let checkDone = 0 // 다 했는지 확인하는 변수
    for (let i = 0; i < 64; i++){
        if(tds[i].style.backgroundColor == 'red'){
            P1Score++;
        }
        else if (tds[i].style.backgroundColor == 'blue'){
            P2Score++;
        }
        else if(tds[i].style.backgroundColor == 'lavender'){
            checkDone++;    // 빈 박스 카운트
        }
    }
    P1ScoreScreen.innerHTML = P1Score;
    P2ScoreScreen.innerHTML = P2Score;

    // 게임 오버 처리하기
    setTimeout(function(){
        // 한쪽이 전멸하면 게임 종료
        if (P1Score == 0 || P2Score == 0){
            gameover(); // 게임 종료
            return;
        }
        // 모두 뒤집으면 게임 종료
        else if (checkDone == 0){    // 빈 박스가 없는 경우
            gameover(); // 게임 종료
            return;
        }
        else{
            // 놓을 곳이 없으면 턴을 넘기고 두번 넘어가면 게임 종료
            let passCheck = false; // 패스 여부 확인
            turn++; // 턴이 넘어갔다고 가정
            for (let i = 0; i < 64; i++){   // 남은 경우 확인해서 놓을 곳 있나 확인
                if(tds[i].style.backgroundColor == 'lavender'){ // 빈곳을 찾으면 
                    check(tds[i]); // 탐색하기
                    if (change.length > 0){ // 바꿀 수 있는 블럭이 있으면
                        passCheck = true;
                    }
                }
            }
            if (!passCheck){    // 바꿀 수 있는 블럭이 없는 경우
                alert("바꿀 수 있는 블럭이 없어서 턴을 넘깁니다."); // 알림
                turn++; // 턴 넘기기
                // 한 번 더 돌려보기
                for (let i = 0; i < 64; i++){   // 남은 경우 확인해서 놓을 곳 있나 확인
                    if(tds[i].style.backgroundColor != 'lavender'){ // 빈곳을 찾으면 
                        check(tds[i]); // 탐색하기
                        if (change.length > 0){ // 바꿀 수 있는 블럭이 있으
                            passCheck = true;
                        }
                    }
                }
                if (!passCheck){    // 또 바꿀 수 없는 경우
                    alert("두 번 연속 바꿀 수 있는 블럭이 없어서 게임을 종료합니다.");
                    gameover(); // 게임 오버
                    return;
                }
                else {  //  바꿀 수 있는 경우
                    turn--;
                }
            }
            else { // 바꿀 박스가 있는 경우
                turn--; // 턴 변수 원위치
            }
        }
        //플레이어 턴 표시
        if (turn%2==1){
            P1.style.border = '0px solid black';
            P2.style.border = '2px solid black';
        }
        else {
            P1.style.border = '2px solid black';
            P2.style.border = '0px solid black';
        }

        // 1인 모드인 경우 ai 공격 개시
        if(mode == 1 && turn%2==1){
            setTimeout(function(){
                ai();   //  ai  공격 
            }, 700)
        }

    },50)
}

function check(obj){    // 체크 함수
    // 바꿀 박스 리스트 초기화
    maybeChange = [];
    change = []; 
    
    let direction = [-9, -8, -7, -1, 1, 7, 8, 9]; // 체크를 진행할 방향
    for (let i = 0; i < 8; i++){    // 각 방향 별로 체크
        let search = parseInt(obj.id);   // 체크할 박스
        // 테두리와 충돌하는지 검출
        if ((i==0||i==1||i==2)&&search<8){
            continue;
        }
        else if ((i==5||i==6||i==7)&&search>55){
            continue;
        }else if ((i==0||i==3||i==5)&&search%8==0){
            continue;
        }else if ((i==2||i==4||i==7)&&search%8==7){
            continue;
        }

        search += direction[i]; //체크할 박스
        //alert(search);
        //진행 방향으로 자신과 다른 색의 블록들이 있는지 체크
        if ((tds[search].style.backgroundColor=='red'&&turn%2==0)||(tds[search].style.backgroundColor=='blue'&& turn%2==1)){
            // 임시 배열에 저장
            maybeChange.push(tds[search])
            while (1){ // 자신과 같은 색의 블록을 만날때까지 반복
                
                // 테두리와 충돌하는지 검출 충돌 하면 다음 방향으로 넘어감
                if ((i==0||i==1||i==2)&&search<8){
                    maybeChange = [];
                    break;
                }else if ((i==5||i==6||i==7)&&search>55){
                    maybeChange = [];
                    break;
                }else if ((i==0||i==3||i==5)&&search%8==0){
                    maybeChange = [];
                    break;
                }else if ((i==2||i==4||i==7)&&search%8==7){
                    maybeChange = [];
                    break;
                }

                search += direction[i]; // 진행 방향으로 한 칸 전진

                // 나랑 달라서 뒤집을 수 있는 경우
                if ((tds[search].style.backgroundColor=='red'&&turn%2==0)||(tds[search].style.backgroundColor=='blue'&& turn%2==1)){
                    maybeChange.push(tds[search]);  // 임시 배열에 저장
                }
                // 나랑 같아서 탐색을 종료하고 임시배열에 있던 박스들을 확정 배열로 옮김
                else if ((tds[search].style.backgroundColor=='red'&&turn%2==1)||(tds[search].style.backgroundColor=='blue'&& turn%2==0)){
                    for (let i = 0; i < maybeChange.length; i++){
                        change.push(maybeChange[i])
                    }
                    maybeChange = [];
                    break;
                }
                // 빈 박스를 만나면 탐색을 종료하고 다음 방향으로 넘어감
                else if (tds[search].style.backgroundColor=='lavender'){
                    maybeChange = [];   // 임시 변수 초기화
                    break;
                }
            }
        }
    }  
    return;
}

function gameover(){    // 게임 종료 함수
    let msg = String(P1Score) + " : " + String(P2Score) + "\n";  // 스코어 출력
    if (P1Score > P2Score){
        msg += "P1 승리!";
    }else if (P1Score < P2Score){
        msg += "P2 승리!";
    }
    else {
        msg += "무승부";
    }
    setTimeout(function(){
        alert(msg); //  게임 결과 출력
        init();  // 게임 초기화
    },100);
}

// over & out 함수
function over(obj){ 
    if (obj.style.backgroundColor == 'lavender'){
        obj.style.border = '2px solid black';
    }
}
function out(obj){
    obj.style.border = '1px solid black'
}

// 게임 모드 선택 함수
function clickP(obj){
    if (obj.id == 'P1switch'){ // 1인 플레이
        // 이미지 설정
        P2.src = "imgs/Othelo/AI.png";
        // 모드 설정
        mode = 1;
    }else if (obj.id == 'P2switch'){ // 2인 플레이
        // 이미지 설정
        P2.src = "imgs/Othelo/player2.png";
        // 모드 설정
        mode = 2;
    }
    
    // 설명창 삭제
    let section = document.getElementsByTagName('section');
    let explainBox = document.getElementById('explainBox');
    section[0].removeChild(explainBox);
}

// AI 함수
function ai(){
    let scoreList = []; // 최고 득점 할 수 있는 위치
    let maxscore = 0;   // 최고 득점 스토어
    turn++; // 턴 1 증가
    for (let i = 0; i < 64; i++){   // 모든 경우의수 체크
        if (tds[i].style.backgroundColor == 'lavender'){ 
            check(tds[i]);  //  빈 칸이면 탐색
            if (change.length > maxscore){  // 기존보다 더 많은 점수를 받을 수 있는 경우
                scoreList = []; // 리스트 초기화
                scoreList.push(i);  // 리스트에 추가
                maxscore = change.length; // 최고 득점 갱신
            }
            else if(change.length != 0 && change.length == maxscore){ // 기존 점수와 같은 점수를 받을 수 있는 경우
                scoreList.push(i); // 리스트에 추가
            }
        }
    }
    // 랜점으로 클릭할 곳 선택하기
    let choice = Math.floor(Math.random()*(scoreList.length));
    turn--; // 턴 원위치
    clicked(tds[scoreList[choice]]); // 랜덤으로 선택한 블럭 클릭
}