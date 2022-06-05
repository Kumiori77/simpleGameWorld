// 전역 변수 선언

let mode; //  모드 변수

let card = []; // 카드 배열 변수
let cnt = 0;
for (let i = 0; i < 30; i++){
    card[i] = cnt;
    if (i%2==1){

        
        cnt++;
    }
}

let cntClick; // 클릭 카운트
let cntGame;// 턴 카운트
// 점수 변수
let P1Score;
let P2Score;
// 점수 표시 점수
let P1ScoreScreen;
let P2ScoreScreen;

let picked; // 카드 체크 변수

// 플레이어 이미지 변수
let P1;
let P2;

// 함수 선언

// 모드 설정 함수
function clickP(obj){
    // P2 이미지 변수
    

    if (obj.id == 'P1switch'){ // 1인 플레이
        // 이미지 설정
        P2.src = "imgs/MemoryGame/AI.png";
        // 모드 설정
        mode = 1;
    }else if (obj.id == 'P2switch'){ // 2인 플레이
        // 이미지 설정
        P2.src = "imgs/MemoryGame/player2.png";
        // 모드 설정
        mode = 2;
    }
    
    // 설명창 삭제
    let section = document.getElementsByTagName('section');
    let explainBox = document.getElementById('explainBox');
    section[0].removeChild(explainBox);
}

// 게임 초기화 함수
function init(){
    card.sort(() => Math.random() - 0.5); // 카드 랜덤 배치

    cntClick = 0; // 클릭 카운트
    cntGame = 0; // 턴 카운트
    // 점수 변수
    P1Score = 0;
    P2Score = 0;
    // 점수 표시 변수
    P1ScoreScreen = document.getElementById('P1Score');
    P2ScoreScreen = document.getElementById('P2Score');
    P1ScoreScreen.innerHTML = P1Score;
    P2ScoreScreen.innerHTML = P2Score;

    // 플레이어 이미지 변수
    P1 = document.getElementById('P1');
    P2 = document.getElementById('P2');
    // 시작할 때  P1 부터 시작
    P1.style.border = '2px solid blue';
    P2.style.border = '0px'

    // 이벤트 리스너 추가
    for (let i = 0; i < 30; i++){ // 칸 다시 체우기
        let box = document.getElementById(i);
        box.addEventListener("mouseover", over);
        box.addEventListener("mouseout", out);
    }

}

// 호버 이벤트 함수
function over(){
    this.style.boxShadow = '0px 0px 10px forestgreen';
}
function out(){
    this.style.boxShadow = 'none';
}

// 클릭 함수
function clicked(obj){
    if (cntClick == 0 && obj.style.backgroundColor == 'forestgreen'){ // 첫번째 클릭
        // 사진 뒤집기
        let img1 = document.createElement('img');
        img1.src ='imgs/MemoryGame/'+card[obj.id]+'.jpeg';
        img1.style.width = '100px';
        obj.append(img1);
        picked = obj; // 비교 카드 변수에 뽑은 카드 대입
        // 클릭횟수 1 증가
        cntClick++;
        //return 0;
    }else if(cntClick == 1 && obj.style.backgroundColor == 'forestgreen'){ // 두번째 클릭

        // 사진 뒤집기
        let img2 = document.createElement('img');
        img2.src ='imgs/MemoryGame/'+card[obj.id]+'.jpeg';
        img2.style.width = '100px';
        obj.append(img2);

        cntClick++;// 클릭 추가

        setTimeout(function(){

            // 사진 체크하기
            if (card[obj.id] == card[picked.id]){ // 맞추면
                if (cntGame % 2 == 0){
                    P1Score++;
                    P1ScoreScreen.innerHTML = P1Score;
                }else if(cntGame % 2 == 1){
                    P2Score++;
                    P2ScoreScreen.innerHTML = P2Score;
                }
                // 이미지 지우기
                let img1 = picked.lastChild;
                picked.removeChild(img1);
                obj.removeChild(img2);
                picked.style.backgroundColor = 'azure';
                obj.style.backgroundColor = 'azure';
                // 이벤트 리스너 지우기
                obj.removeEventListener("mouseover", over);
                picked.removeEventListener("mouseover", over);

                setTimeout( function(){
                    if (P1Score + P2Score == 15){ // 게임 오버
                        if (P1Score > P2Score){
                            alert("P1 승리!!!");
                        }else if (P1Score < P2Score){
                            alert("p2 승리!!!");
                        }else {
                            alert("무승부..");
                        }
                        for (let i = 0; i < 30; i++){ // 칸 다시 체우기
                            let box = document.getElementById(i);
                            box.style.backgroundColor = 'forestgreen';
                        }
                        init(); // 초기화
                    }
                }, 100);
                

            }else { //못맞추면

                // 이미지 지우기
                let img1 = picked.lastChild;
                picked.removeChild(img1);
                obj.removeChild(img2);

                if (mode==2){
                    //  2인용이면 턴 넘기기
                    cntGame++;
                    // 플레이어 턴 표시
                    if (cntGame % 2 == 0){
                        P1.style.border = '2px solid blue';
                        P2.style.border = '0px';
                    }else {
                        P2.style.border = '2px solid red';
                        P1.style.border = '0px'
                    }
                }else{ // 1인용이면
                    ai(); // ai 공격
                }            

            }
            cntClick = 0;

        }, 700); // 1초 딜레이

    }else{
        return 0;
    }
}

// function ai(){

// }
