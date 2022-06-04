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

let cntClick = 0;
let cntGame = 0; // 턴 카운트


// 함수 선언

// 모드 설정 함수
function clickP(obj){
    // P2 이미지 변수
    let P2 = document.getElementById('P2');

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

// 이미지 랜덤 배치 함수
function init(){
    card.sort(() => Math.random() - 0.5);
}

// 클릭 함수
function clicked(obj){
    if (cntClick == 0){
        // 사진 뒤집기
        let img = document.createElement('img');
        img.src ='imgs/MemoryGame/'+card[obj.id]+'.jpeg';
        img.style.width = '100px';
        obj.append(img);

        cntClick++;
        return 0;
    }
}