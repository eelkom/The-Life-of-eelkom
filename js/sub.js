const PI2 = Math.PI * 2;
// 원 한 바퀴의 각도는 360도 또는 **2π 라디안(PI2)**입니다.

// const COLORS = [
//     "#4b45ab",
//     "#554fb8",
//     "#605ac7",
//     "#2a91a8",
//     "#2e9ab2",
//     "#32a5bf",
//     "#81b144",
//     "#85b944",
//     "#8fc549",
//     "#e0af27",
//     "#eeba2a",
//     "#fec72e",
//     "#bf342d",
//     "#ca3931",
//     "#d7423a",
// ];

const COLORS = [
    'rgba(255, 127, 80, 0.2)',
    '#DCDCDC',
    '#D3D3D3',
    '#C0C0C0',
    '#A9A9A9',
    '#778899',
    '#708090',
    '#808080',
    '#696969',
    '#2F4F4F',
    '#000000',
    '#00BFFF',
    '#1E90FF',
    '#6495ED',
    '#ADD8E6',
];
// poly = polygon(stageWidth / 2, stageHeight / 2, stageHeight / 3.5, 15);
export default function polygon(x, y, radius, sides) {
    let rotate = 0;


    function animate(context, moveX, buttons) {



        context.save(); // context.save(): 현재의 그리기 상태를 저장합니다.
        // save()를 호출하면 현재의 상태가 스택(stack) 구조에 저장됩니다.
        // 이후 restore()를 호출하면 마지막으로 저장된 상태로 돌아갑니다.

        /* context.save(): 현재의 그리기 상태를 저장합니다.
예: 기본 좌표계, 스타일(fillStyle), 회전 상태 등이 저장됩니다.
context.restore(): 상태를 되돌립니다.
도형을 그린 후 좌표계나 스타일을 원래 상태로 복원하여 다른 도형에 영향을 주지 않도록 합니다. */
        // context.fillStyle = '#000';
        // context.beginPath();

        const angle = PI2 / sides;

        context.translate(x, y); // 캔버스 좌표 이동
        rotate += moveX * 0.008;
        context.rotate(rotate);

        /* 
        
context.rotate(angle)은 HTML5 Canvas API에서 캔버스의 회전을 적용하는 메서드입니다. 이 메서드는 현재의 캔버스 좌표계를 기준으로 시계 방향으로 회전합니다. 회전하는 기준점은 항상 **(0, 0)**이므로, 도형이나 이미지가 원하는 위치에서 회전하도록 하려면 translate()로 중심점을 이동한 후 회전을 적용해야 합니다.
 */


        for (let i = 0; i < sides; i++) {
            const px = radius * Math.cos(angle * i);
            const py = radius * Math.sin(angle * i);
            // 사인(Sin θ): 반지름과 각도 θ가 이루는 y축 성분 (세로 방향)
            // 코사인(Cos θ): 반지름과 각도 θ가 이루는 x축 성분 (가로 방향)

            // (i == 0) ? context.moveTo(x, y) : context.lineTo(x, y);
            // 첫 번째 점은 (radius, 0) 위치. 이는 원의 오른쪽 끝입니다.
            // 두 번째 점은 (-0.5 * radius, 0.866 * radius) 위치에 놓입니다. 이는 원의 왼쪽 위에 해당합니다.
            // 세 번째 점은 (-0.5 * radius, -0.866 * radius) 위치에 놓입니다. 이는 원의 왼쪽 아래에 해당합니다.

            context.fillStyle = COLORS[0];

            context.beginPath();
            context.arc(px, py, 10, 0, PI2, false); // (원의 중심(x,y), radius, 시작각도, 끝 각도(PI2 => 전체 원(360도), 원을 그리는 방향(false = 시계방향 반대(기본값)으로))
            context.fill();
            context.closePath();

            // buttons[i].style.left = `${x + px}px`;
            // buttons[i].style.top = `${y + py}px`;

            // 버튼의 위치 업데이트 (캔버스의 좌표계 변화 반영)
            const rotatedX = x + (px * Math.cos(rotate) - py * Math.sin(rotate));
            const rotatedY = y + (px * Math.sin(rotate) + py * Math.cos(rotate));

            buttons[i].style.left = `${rotatedX}px`;
            buttons[i].style.top = `${rotatedY}px`;

            
            // if (i === 0 && rotatedX === (x + radius * Math.cos(angle * 0)) && rotatedY === (y + radius * Math.sin(angle * 0))) {
            //     buttons[i].style.transform = 'scale(1.5)';
            // } 
            // else {
            //     // 그 외의 경우 원래 크기로 되돌리기
            //     buttons[i].style.transform = 'scale(1)';
            // }
        }
        

        // context.fill();
        // context.closePath();
        context.restore();
        // console.log(x, y, radius, sides, rotate);
    }

    return { animate }; // 객체로 반환
}



