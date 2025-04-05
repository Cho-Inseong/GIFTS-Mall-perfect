// B모듈 모토토
function motto() {
  const img = [
    "url('../[2025년 지방] 웹디자인및개발 (과제)/선수제공파일/B-Module/나눔혁신.jpg')",
    "url('../[2025년 지방] 웹디자인및개발 (과제)/선수제공파일/B-Module/미래혁신.jpg')",
    "url('../[2025년 지방] 웹디자인및개발 (과제)/선수제공파일/B-Module/보안혁신.jpg')",
    "url('../[2025년 지방] 웹디자인및개발 (과제)/선수제공파일/B-Module/신뢰혁신.jpg')",
    "url('../[2025년 지방] 웹디자인및개발 (과제)/선수제공파일/B-Module/환경혁신.jpg')",
  ];

  const motto_parts = $(".motto_parts");

  motto_parts.each((index, element) => {
    $(element).css({
      "background-image": img[index],
      "background-size": "1300px auto",
      "background-position": "center",
      position: "relative",
    });
  });
}

// B모듈 비디오 컨트롤러
function vPlay(elem) {
  const button_text = elem.innerText;
  const video = $(".v_video")[0]; //이거 빼먹지 마라 꼭 기억ㄱ
  switch (button_text) {
    case "재생":
      video.play();
      break;
    case "일시정지":
      video.pause();
      break;
    case "정지":
      video.pause();
      video.currentTime = 0;
      break;
    case "되감기":
      video.currentTime -= 10;
      break;
    case "빨리감기":
      video.currentTime += 10;
      break;
    case "감속하기":
      video.playbackRate -= 0.1;
      break;
    case "배속하기":
      video.playbackRate += 0.1;
      break;
    case "배속초기화":
      video.playbackRate = 1;
      break;
    case "컨트롤러 숨기기":
      $(".v_btn_group").find(".v_btn:not(#vc_btn)").hide();
      $("#vc_btn").text("컨트롤러 보이기");
      break;
    case "컨트롤러 보이기":
      $(".v_btn_group").find(".v_btn:not(#vc_btn)").show();
      $("#vc_btn").text("컨트롤러 숨기기");
      break;
    case "반복 켜기":
      video.loop = true;
      elem.innerText = "반복 끄기";
      break;
    case "반복 끄기":
      video.loop = false;
      elem.innerText = "반복 켜기";
      break;
    case "자동재생 켜기":
      video.loop = true;
      elem.innerText = "자동재생 끄기";
      break;
    case "자동재생 끄기":
      video.loop = false;
      elem.innerText = "자동재생 켜기";
      break;
  }
}

// B모둘 비회원 주문하기
function showModal() {
  $(".noMember_modal").modal("show");
  random_id();
  addProducts();
}

function random_id(length = 6) {
  const char = "ABCDEFGHIJKLOMNPQRSTUVWZYZabcdefghijklmnopqrstuvwxyz1234567890";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * char.length);
    result += char[randomIndex];
  }
  $(".random_id").val(`${result}`);
}

// B모듈 비회원 주문하기/ 상품 띄우기
// json데이터 가져오기
function productData() {
  return $.getJSON("../data.json").then((data) => {
    return data["data"];
  });
}

function addProducts() {
  productData().then((data) => {
    data.forEach((category) => {
      category.detail.forEach((product) => {
        let j_item_box = `
        <div class="j_item_box" draggable="true">
             <div class="j_item_img">
                 <img src="../${product.img}" alt="img" title="img">
             </div>
             <div class="j_item_text">
                 <p>${product.title}</p>
                 <p>${product.categorys}</p>
                 <p>${product.price}</p>
             </div>
         </div>
        `;
        $(".j_item_box_area").append(j_item_box);
      });
    });
    dragAndDrop();
  });
}

// B모듈 비회원 주문하기/ 드래그 앤 드롭
function dragAndDrop() {
  const j_item_box = $(".j_item_box");
  const order1 = $(".order1");

  // j_item_box들이 드래그 가능하도록 하는거
  // 그리고 j_item_box들마다 고유 index값 주기
  j_item_box.each((index, element) => {
    const $item = $(element);
    $item.attr("data-id", index);

    $item.on("dragstart", (event) => {
      event.originalEvent.dataTransfer.setData(
        "text/plain",
        $item.attr("data-id")
      );
    });
  });

  // order1에 드래그한 요소들 드롭할 수 있도록 허용하는 거
  order1.on("dragover", (event) => {
    event.preventDefault();
  });

  // order1에 드롭하면 실행되는 이벤트
  order1.on("drop", (event) => {
    event.preventDefault();

    let itemId = event.originalEvent.dataTransfer.getData("text/plain");

    let draggedItem = $(".j_item_box[data-id='" + itemId + "']");

    if (draggedItem.length === 0) {
      //이미 들어간 j_item_box는 못 들어가게 하는 코드
      return;
    }

    let img = draggedItem.find("img").attr("src");
    let title = draggedItem.find("p").eq(0).text();
    let price = parseInt(
      draggedItem
        .find("p")
        .eq(2)
        .text()
        .replace(/[^0-9]/g, "")
    ); // ','뺴고 숫자만 추출

    let newRow = `
    <tr class="tr_detail">
        <td><img src="../${img}" alt="img" title="img"></td>
        <td>${title}</td>
        <td ><input type="number" oninput="updatePrice(this)" value="1" min="1" ></td>
        <td class="danga_price">${price.toLocaleString()}원</td>
        <td class="total_price">${price.toLocaleString()}원</td>
    </tr>
    `;
    // order테이블에 행 추가
    $(".order_table").append(newRow);

    // 드래그된 아이템 반투명 처리
    draggedItem.css("opacity", "0.5").off("dragstart"); // .off는 이게 뭔지 모르겠는데 그냥 이게 있어야 중복으로 안들어감
    updateTotalPrice();
  });
}

// 수량 조절시 수량에 맡게 금액 조정
function updatePrice(elem) {
  let sulyang = parseInt($(elem).val());
  //oninput속성이 포함된 수량td에 value값을 가지고 오는거 ($(elem)은 this니깐 oninput에서 실행된 자바스크립트 함수가 있는 태그를 넣는거 같다)

  let dangaPrice = parseInt(
    // parseInt()는 그냥 뭐가 같이 있든 숫자로 바꾸는거 숫자만
    $(elem)
      .closest("tr") // $(elem)즉 수량 입력창에서 가장 가까운 tr을 찾음 그럼 나머지 td도 막 부려먹을 수 있겠지?
      .find(".danga_price") // 찾은 tr안에서 classNmae이 danga_price인 새끼를 찾음
      .text() // 찾은 새끼 텍스트 가지고옴
      .replace(/[^0-9]/g, "") // 텍스트를 숫자만 남기고 전부 없앰
  );

  let totalprice = dangaPrice * sulyang;

  $(elem)
    .closest("tr")
    .find(".total_price")
    .text(totalprice.toLocaleString() + "원");

  updateTotalPrice();
}
let total = 0;

// 금액들 모두 더해서 합계금액에 업데이트
function updateTotalPrice() {

  $(".total_price").each(function () {
    total += parseInt(
      $(this)
        .text()
        .replace(/[^0-9]/g, "")
    );
  });

  $(".tototal_price").text("총 금액: " + total.toLocaleString() + "원");
}

// 주문하기 버튼
function order() {
  $(".noMember_modal").modal("hide");

  const userId = $(".random_id").val();

  $(".toast_show_price").text(userId + " 님이" + total.toLocaleString() + " 원을 결제하셨습니다!")

  $("#liveToast").toast('show');
}
