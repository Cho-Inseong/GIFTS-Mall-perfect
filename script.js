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
      "position" : "relative"
    });
  });
}
