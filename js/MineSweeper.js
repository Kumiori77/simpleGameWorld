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
    // 지뢰 있는 박스들의 class를 mine으로 지정
    for (let i = 0; i < mines.length; i++){ 
        tds[mines[i]].class = "mine";
    }

    // 지뢰 이미지 객체 생성
    mine.src = "imgs/MineSweeper/mine.png";
    // 깃발 이미지 객체 생성
    flag.src = "imgs/MineSweeper/flag.png";

    alert(mines);
}

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
    if (obj.class== "mine"){
        alert(obj.class);
        obj.style.backgroundColor = 'red';
        //지뢰 위치에 지뢰 띄우기
        for (let i = 0; i < mines.length; i++){
            let mineImg = document.createElement('img');
            mineImg.src = mine.src
            tds[mines[i]].append(mineImg);
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
    for (let i = 0; i < area.length; i++){
        let search = parseInt(obj.id) + parseInt(area[i]) // 찾을 위치   
        if (tds[search].class == 'mine'){
            mineCnt++;
        }
    }
    if(mineCnt > 0){
        obj.innerHTML = mineCnt; // 주변에 지뢰가 있다면 숫자로 표시
    }
}