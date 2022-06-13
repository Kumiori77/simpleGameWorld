// 전역변수




// 함수

function init(){ // 초기화 함수
    
    // 지뢰 위치 초기화 하기
    let mine = [];
    mine[0] = Math.floor(Math.random()*100);
    while (true){
        let m = Math.floor(Math.random()*100);
        for (let i = 0; i < mine.length; i++){
            if (mine[i] == m){
                break;
            }
        }
        if (mine[mine.length-1] != m){
            mine.push(m);
        }

        if (mine.length == 10){
            break;
        }
    }
    alert(mine);
}

function clicked(){ // 클릭 함수
    alert("click");
}