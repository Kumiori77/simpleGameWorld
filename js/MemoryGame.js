// 전역 변수 선언

let mode; //  모드 변수
let level = 0; // 난이도 변수

let card = []; // 카드 배열 변수
let cnt = 0;
for (let i = 0; i < 30; i++){
    card[i] = cnt;
    if (i%2==1){     
        cnt++;
    }
}

let cardImg = []; // 카드 이미지 객체 배열
let i0, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13, i14; 
cardImg = [i0, i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12, i13, i14];
for (let i = 0; i < 15; i++){ // 카드 이미지 객체 미리 로드시켜놓기
    cardImg[i] = new Image();
    cardImg[i].src = 'imgs/MemoryGame/'+i+'.jpeg';
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

// ai 변수
let imgData = []; // 선택한 이미지 데이터



// 함수 선언  //

// 모드 설정 함수
function clickP(obj){    
    if (obj.id == 'P1switch'){ // 1인 플레이
        // 이미지 설정
        P2.src = "imgs/MemoryGame/AI.png";
        // 모드 설정
        mode = 1;
        let levelBox = document.getElementById('levelBox');
        levelBox.style.visibility = 'visible';
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

// 난이도 설정 함수
function clickLevel(obj){
    if (obj.id == 'easy'){
        level = 4; // 10개 까지만 기억하기
    }
    else if (obj.id == 'nomal'){
        level = 7; // 20개 까지만 기억하기
    }
    else if (obj.id == 'hard'){
        level = 30; // 30개 까지만 기억하기
    }

    // 난이도 설정 창 지우기
    if (level != 0){
        let section = document.getElementsByTagName('section');
        let levelBox = document.getElementById('levelBox');
        section[0].removeChild(levelBox);
    }
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

    // ai 변수 초기화
    imgData = []; // 선택한 이미지 데이터

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
    if (cntClick<2&&obj.style.backgroundColor=='forestgreen'&&(mode==2||(mode==1&&cntGame%2==0))){
        play(obj);
    }
}


// 게임 실행 함수
function play(obj){
    if (cntClick==0){ // 첫번째 클릭
        // 사진 뒤집기
        let img1 = document.createElement('img');
        img1.src = cardImg[card[obj.id]].src;
        img1.style.width = '100px';
        obj.append(img1);
        picked = obj; // 비교 카드 변수에 뽑은 카드 대입
        // 클릭횟수 1 증가
        cntClick++;

        // ai 정보 수집
        if (mode == 1){
            let find = 0; // 데이터베이스에 겹치는 데이터가 있는지 검출
            for(let i = 0; i < imgData.length; i++){
                if (imgData[i] == obj.id){
                    find = 1;
                    break;
                }
            }
            if (find == 0){
                imgData.push(obj.id); // 데이터베이스에 클릭한 객체 정보가 없으면 추가
            }

            // 난이도에 따라 기억력 조절
            if (imgData.length > level){
                imgData.shift(); // 배열 맨 앞의 요소 삭제
                //alert(imgData);
            }
        }

    }else if(cntClick==1){ // 두번째 클릭
        // 클릭한 거 또 클릭했는지 체크
        if (picked == obj){
            return 0;
        }
        // 사진 뒤집기
        let img2 = document.createElement('img');
        img2.src = cardImg[card[obj.id]].src;
        img2.style.width = '100px';
        obj.append(img2);

        // ai 정보 수집
        if (mode == 1){
            let find = 0; // 데이터베이스에 겹치는 데이터가 있는지 검출
            for(let i = 0; i < imgData.length; i++){
                if (imgData[i] == obj.id){
                    find = 1;
                    break;
                }
            }
            if (find == 0){
                imgData.push(obj.id); // 데이터베이스에 클릭한 객체 정보가 없으면 추가
            }
            
            // 난이도에 따라 기억력 조절
            if (imgData.length > level){
                imgData.shift(); // 배열 맨 앞의 요소 삭제
                //alert(imgData);
            }
        }

        cntClick++;// 클릭 추가

        setTimeout(function(){
            cntClick = 0;
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

                // ai 데이터에서 삭제하기
                if (mode==1){
                    for (let i = 0; i < imgData.length; i++){
                        if (imgData[i] == obj.id || imgData[i] == picked.id){
                            imgData.splice(i, 1);
                            i--;
                        }
                    }
                }

                setTimeout( function(){
                    if (P1Score + P2Score == 15){ // 게임 오버
                        if (P1Score > P2Score){
                            alert("P1 승리!!!");
                        }else if (P1Score < P2Score){
                            alert("p2 승리!!!");
                        }
                        for (let i = 0; i < 30; i++){ // 칸 다시 체우기
                            let box = document.getElementById(i);
                            box.style.backgroundColor = 'forestgreen';
                        }
                        init(); // 초기화
                        return 0;
                    }    
                }, 100);

                if(mode==1 && cntGame%2==1 && P1Score + P2Score < 15){
                    setTimeout(function(){
                        ai();
                    }, 150)
                }
                

            }else { //못맞추면

                // 이미지 지우기
                let img1 = picked.lastChild;
                picked.removeChild(img1);
                obj.removeChild(img2);

                
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
                setTimeout( function(){
                    if (mode == 1 && cntGame % 2 == 1){ // 1인용이고 ai 차례면
                        ai(); // ai 공격
                    }
                }, 100);
                            

            }

        }, 750); // 1초 딜레이

    }else{
        return 0;
    }
}

function ai(){
    //cntClick = 2; // 클릭 방지
    // ai 선택 변수
    let aiPick1;
    let aiPick2;
    let find = false; // 답을 찾았는지 확인하는 변수
    // 지금까지 나온 이미지 중에 같은 이미지가 있는지 찾기
    for (let i = 0; i < imgData.length - 1; i++){
        for (let j = i+1; j < imgData.length; j++){
            if (!find && card[imgData[i]] == card[imgData[j]] && imgData[i]!= imgData[j]){
                aiPick1 = imgData[i];
                aiPick2 = imgData[j];
                find = true;
                break;
            }
            if (find){
                break;
            }
        }
        if (find){
            break;
        }
    }
        

    if (!find){ // 못찾았을 때는 랜덤으로 입력하기
        
        
        while (true){
            aiPick1 = Math.floor(Math.random()*30);
            let aiPickObj1 = document.getElementById(aiPick1);
            if(aiPickObj1.style.backgroundColor == 'forestgreen'){
                break;
            }
        }
        let luckey = false;
        // 랜덤으로 했는데 나왔었던게 나온 경우
        for (let i = 0; i < imgData.length; i++){
            if(card[aiPick1] == card[imgData[i]] && aiPick1 != imgData[i]){
                aiPick2 = imgData[i];
                luckey = true;
            }
        }

        while(true && !luckey){
            aiPick2 = Math.floor(Math.random()*30);
            let aiPickObj2 = document.getElementById(aiPick2);
            if (aiPick1 != aiPick2 && aiPickObj2.style.backgroundColor == 'forestgreen'){
                break;
            }
        }
    }

    // ai 선택 입력하기
    let aiPickObj1 = document.getElementById(aiPick1);
    let aiPickObj2 = document.getElementById(aiPick2);
    play(aiPickObj1);
    setTimeout( function(){play(aiPickObj2)}, 750);

}
