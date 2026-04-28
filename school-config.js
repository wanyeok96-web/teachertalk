/*
  티쳐톡 학교 설정 파일
  ---------------------------------
  이 파일만 수정하면 다른 학교에서도 바로 사용할 수 있습니다.

  [수정 순서]
  1) schoolName: 학교 이름 입력
  2) classes: 반/담임 선생님 목록 입력 (1~3학년 섞어서 사용 가능)

  [중요]
  - className은 화면에 그대로 표시됩니다. (예: "1학년 1반", "3학년 2반")
  - teacher는 className과 동일한 교사명을 사용해야 필터가 정확히 맞습니다.
    (예: "2학년 1반 이왕혁 선생님")
  - 쉼표(,)와 따옴표(" ") 형식을 그대로 지켜주세요.
*/
const SCHOOL_CONFIG = {
  // 학교 이름 (예: 이솔고등학교, 은하고등학교)
  schoolName: "이솔고등학교",

  // 반/담임 목록 (학년 혼합 가능)
  classes: [
    { className: "1학년 1반", teacher: "1학년 1반 전은현 선생님" },
    { className: "1학년 2반", teacher: "1학년 2반 신혜돈 선생님" },
    { className: "1학년 3반", teacher: "1학년 3반 정호영 선생님" },
    { className: "1학년 4반", teacher: "1학년 4반 신재이 선생님" },
    { className: "1학년 5반", teacher: "1학년 5반 박선영 선생님" },
    { className: "1학년 6반", teacher: "1학년 6반 이미영 선생님" },
    { className: "1학년 7반", teacher: "1학년 7반 이성민 선생님" },
    { className: "1학년 8반", teacher: "1학년 8반 김건희 선생님" },
    { className: "1학년 9반", teacher: "1학년 9반 노성희 선생님" },
    { className: "1학년 10반", teacher: "1학년 10반 김효숙 선생님" },
    { className: "1학년 11반", teacher: "1학년 11반 김선영 선생님" },
    { className: "1학년 12반", teacher: "1학년 12반 박상미 선생님" },

    { className: "2학년 1반", teacher: "2학년 1반 이왕혁 선생님" },
    { className: "2학년 2반", teacher: "2학년 2반 김혜숙 선생님" },
    { className: "2학년 3반", teacher: "2학년 3반 김주희 선생님" },
    { className: "2학년 4반", teacher: "2학년 4반 황수진 선생님" },
    { className: "2학년 5반", teacher: "2학년 5반 강소연 선생님" },
    { className: "2학년 6반", teacher: "2학년 6반 임혜진 선생님" },
    { className: "2학년 7반", teacher: "2학년 7반 배수현 선생님" },
    { className: "2학년 8반", teacher: "2학년 8반 이주경 선생님" },
    { className: "2학년 9반", teacher: "2학년 9반 전진 선생님" },
    { className: "2학년 10반", teacher: "2학년 10반 윤대영 선생님" },
    { className: "2학년 11반", teacher: "2학년 11반 김선유 선생님" },
    { className: "2학년 12반", teacher: "2학년 12반 박은희 선생님" },

    { className: "3학년 1반", teacher: "3학년 1반 김범진 선생님" },
    { className: "3학년 2반", teacher: "3학년 2반 이상호 선생님" },
    { className: "3학년 3반", teacher: "3학년 3반 조성용 선생님" },
    { className: "3학년 4반", teacher: "3학년 4반 강하리 선생님" },
    { className: "3학년 5반", teacher: "3학년 5반 차우정 선생님" },
    { className: "3학년 6반", teacher: "3학년 6반 박민영 선생님" },
    { className: "3학년 7반", teacher: "3학년 7반 김영미 선생님" },
    { className: "3학년 8반", teacher: "3학년 8반 이규형 선생님" },
    { className: "3학년 9반", teacher: "3학년 9반 김상훈 선생님" },
    { className: "3학년 10반", teacher: "3학년 10반 박관수 선생님" },
    { className: "3학년 11반", teacher: "3학년 11반 백가원 선생님" },
    { className: "3학년 12반", teacher: "3학년 12반 정유철 선생님" },
  ],
};
