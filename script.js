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
function v_play(elem) {
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
