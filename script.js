const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzRD5PKwZPEfwPORp_WJWnsdM5QSI9_AvAAwhQ4q92iDyAGksIQlsV9Ll5tqA8_Llw/exec";
const CONFIG = getSchoolConfig();
/** 교사계정 시트(getHomeroomRoster)에서 채움 */
let homeroomTeachers = CONFIG.classes.slice();

async function refreshHomeroomTeachersFromSheet() {
  try {
    const u = new URL(GOOGLE_SCRIPT_URL);
    u.searchParams.set("action", "getHomeroomRoster");
    u.searchParams.set("t", String(Date.now()));
    const response = await fetch(u.toString());
    const data = await response.json();
    if (data.success && Array.isArray(data.classes)) {
      homeroomTeachers = data.classes.filter((item) => item && item.className && item.teacher);
    }
  } catch (err) {
    console.error("refreshHomeroomTeachersFromSheet", err);
  }
}
const TIME_SLOTS = [
  "07:30", "08:00", "12:30", "13:00", "15:30", "16:00", "16:30", "17:00",
  "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00",
];

const form = document.querySelector("#requestForm");
const submitButtonPrimary = document.querySelector("#submitButton");
const submitMessages = document.querySelectorAll(".js-submit-message");
const heroSchoolName = document.querySelector("#heroSchoolName");
const messageCounter = document.querySelector("#messageCounter");
const slotBoard = document.querySelector("#slotBoard");
const slotBoardTitle = document.querySelector("#slotBoardTitle");
const slotBoardGuide = document.querySelector("#slotBoardGuide");
const slotBoardSummary = document.querySelector("#slotBoardSummary");
const timeSlotGrid = document.querySelector("#timeSlotGrid");
const checkAvailabilityBtn = document.querySelector("#checkAvailabilityBtn");
const checkAvailabilityBtnText = document.querySelector("#checkAvailabilityBtnText");
const step1InfoGrid = document.querySelector("#step1InfoGrid");
const teacherInfoCard = document.querySelector("#teacherInfoCard");
const teacherInfoText = document.querySelector("#teacherInfoText");
const settingInfoCard = document.querySelector("#settingInfoCard");
const settingInfoText = document.querySelector("#settingInfoText");
const step1Card = document.querySelector("#step1Card");
const step2Card = document.querySelector("#step2Card");
const step3Card = document.querySelector("#step3Card");
const step1Badge = document.querySelector("#step1Badge");
const step2Badge = document.querySelector("#step2Badge");
const step3Badge = document.querySelector("#step3Badge");
const mainTabStudentBtn = document.querySelector("#mainTabStudentBtn");
const mainTabTeacherBtn = document.querySelector("#mainTabTeacherBtn");
const mainPanelStudent = document.querySelector("#mainPanelStudent");
const mainPanelTeacher = document.querySelector("#mainPanelTeacher");
const teacherLoginPanel = document.querySelector("#teacherPanelAuth");
const teacherDashboardEl = document.querySelector("#teacherPanelDashboard");
const teacherAuthSubmitBtn = document.querySelector("#teacherAuthSubmitBtn");
const teacherAuthSubmitBtnText = document.querySelector("#teacherAuthSubmitBtnText");
const teacherLoginIdInput = document.querySelector("#teacherLoginIdInput");
const teacherLoginPasswordInput = document.querySelector("#teacherLoginPasswordInput");
const teacherAuthMessage = document.querySelector("#teacherAuthMessage");
const teacherSessionInfo = document.querySelector("#teacherSessionInfo");
const teacherSessionClassText = document.querySelector("#teacherSessionClassText");
const teacherSessionTeacherText = document.querySelector("#teacherSessionTeacherText");
const teacherLogoutBtn = document.querySelector("#teacherLogoutBtn");
const teacherAccountOpenBtn = document.querySelector("#teacherAccountOpenBtn");
const teacherAccountModal = document.querySelector("#teacherAccountModal");
const teacherAccountModalCloseBtn = document.querySelector("#teacherAccountModalCloseBtn");
const currentTeacherPasswordInput = document.querySelector("#currentTeacherPasswordInput");
const newTeacherPasswordInput = document.querySelector("#newTeacherPasswordInput");
const confirmTeacherPasswordInput = document.querySelector("#confirmTeacherPasswordInput");
const saveTeacherPasswordBtn = document.querySelector("#saveTeacherPasswordBtn");
const teacherPasswordChangeMessage = document.querySelector("#teacherPasswordChangeMessage");
const settingTeacherInfo = document.querySelector("#settingTeacherInfo");
const settingApplyStart = document.querySelector("#settingApplyStart");
const settingApplyEnd = document.querySelector("#settingApplyEnd");
const settingDateGrid = document.querySelector("#settingDateGrid");
const settingPrevMonthBtn = document.querySelector("#settingPrevMonthBtn");
const settingNextMonthBtn = document.querySelector("#settingNextMonthBtn");
const settingCalendarMonthLabel = document.querySelector("#settingCalendarMonthLabel");
const settingTimeGrid = document.querySelector("#settingTimeGrid");
const settingTimeSelectionHint = document.querySelector("#settingTimeSelectionHint");
const settingRemoveDateBtn = document.querySelector("#settingRemoveDateBtn");
const saveTeacherSettingsBtn = document.querySelector("#saveTeacherSettingsBtn");
const saveTeacherSettingsBtnText = document.querySelector("#saveTeacherSettingsBtnText");
const teacherSettingsMessage = document.querySelector("#teacherSettingsMessage");
const teacherSchedulePrevMonthBtn = document.querySelector("#teacherSchedulePrevMonthBtn");
const teacherScheduleNextMonthBtn = document.querySelector("#teacherScheduleNextMonthBtn");
const teacherScheduleMonthLabel = document.querySelector("#teacherScheduleMonthLabel");
const teacherScheduleCalendarGrid = document.querySelector("#teacherScheduleCalendarGrid");
const teacherScheduleSelectedDateTitle = document.querySelector("#teacherScheduleSelectedDateTitle");
const teacherScheduleListHint = document.querySelector("#teacherScheduleListHint");
const teacherScheduleList = document.querySelector("#teacherScheduleList");
const teacherScheduleRefreshBtn = document.querySelector("#teacherScheduleRefreshBtn");
const teacherSchedulePrintBtn = document.querySelector("#teacherSchedulePrintBtn");
const teacherSchedulePrintModal = document.querySelector("#teacherSchedulePrintModal");
const teacherSchedulePrintModalCloseBtn = document.querySelector("#teacherSchedulePrintModalCloseBtn");
const teacherSchedulePrintStart = document.querySelector("#teacherSchedulePrintStart");
const teacherSchedulePrintEnd = document.querySelector("#teacherSchedulePrintEnd");
const teacherSchedulePrintMessage = document.querySelector("#teacherSchedulePrintMessage");
const teacherSchedulePrintDownloadBtn = document.querySelector("#teacherSchedulePrintDownloadBtn");
const teacherScheduleDetailModal = document.querySelector("#teacherScheduleDetailModal");
const teacherScheduleDetailModalCloseBtn = document.querySelector("#teacherScheduleDetailModalCloseBtn");
const teacherScheduleDetailContent = document.querySelector("#teacherScheduleDetailContent");
const teacherScheduleStatusSelect = document.querySelector("#teacherScheduleStatusSelect");
const saveTeacherScheduleStatusBtn = document.querySelector("#saveTeacherScheduleStatusBtn");
const teacherScheduleStatusMessage = document.querySelector("#teacherScheduleStatusMessage");
const teacherScheduleEditBtn = document.querySelector("#teacherScheduleEditBtn");
const teacherScheduleCancelEditBtn = document.querySelector("#teacherScheduleCancelEditBtn");
const teacherScheduleSaveEditBtn = document.querySelector("#teacherScheduleSaveEditBtn");
const teacherScheduleDeleteBtn = document.querySelector("#teacherScheduleDeleteBtn");
const teacherScheduleDeleteModal = document.querySelector("#teacherScheduleDeleteModal");
const teacherScheduleDeleteModalCloseBtn = document.querySelector("#teacherScheduleDeleteModalCloseBtn");
const teacherScheduleDeletePreview = document.querySelector("#teacherScheduleDeletePreview");
const teacherScheduleDeleteMessage = document.querySelector("#teacherScheduleDeleteMessage");
const teacherScheduleDeleteConfirmBtn = document.querySelector("#teacherScheduleDeleteConfirmBtn");
const studentRequestCompleteModal = document.querySelector("#studentRequestCompleteModal");
const studentRequestCompleteModalCloseBtn = document.querySelector("#studentRequestCompleteModalCloseBtn");
const studentRequestCompleteModalOkBtn = document.querySelector("#studentRequestCompleteModalOkBtn");

const fields = {
  teacher: document.querySelector("#teacher"),
  name: document.querySelector("#studentName"),
  grade: document.querySelector("#studentGrade"),
  classNumber: document.querySelector("#studentClassNumber"),
  className: document.querySelector("#studentClass"),
  number: document.querySelector("#studentNumber"),
  date: document.querySelector("#requestDate"),
  time: document.querySelector("#requestTime"),
  urgency: document.querySelector("#urgency"),
  topic: document.querySelector("#topic"),
  message: document.querySelector("#message"),
};

const BOOKED_TIMES_FETCH_ERROR_MESSAGE = "예약 현황을 불러오지 못했습니다. 새로고침 후 다시 시도해주세요.";
const SETTINGS_FETCH_ERROR_MESSAGE = "예약 설정을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.";
const DEFAULT_SETTING_MESSAGE = "담임 정보가 여기에 표시됩니다.";

const teacherSettingsState = {
  /** @type {Record<string, Set<string>>} */
  scheduleByDate: {},
  /** 편집 중인 상담 일자 (YYYY-MM-DD) */
  selectedDateKey: "",
};
const settingCalendarState = {
  monthCursor: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
};
const teacherScheduleState = {
  monthCursor: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  selectedDate: "",
  consultations: [],
  filteredConsultations: [],
  selectedItemId: "",
  isLoaded: false,
  isEditing: false,
  editDraft: null,
};
let activeMainTab = "student";
let teacherDashboardBootstrapped = false;
let toastTimer = null;
const studentSettingsCache = {};
const CONSULTATION_DATE_PLACEHOLDER = "상담 가능 일자를 선택하세요";

// 학생 Step2 캘린더(아코디언)
const studentCalendarToggleBtn = document.querySelector("#studentCalendarToggleBtn");
const studentCalendarPanel = document.querySelector("#studentCalendarPanel");
const studentCalendarPrevMonthBtn = document.querySelector("#studentCalendarPrevMonthBtn");
const studentCalendarNextMonthBtn = document.querySelector("#studentCalendarNextMonthBtn");
const studentCalendarMonthLabel = document.querySelector("#studentCalendarMonthLabel");
const studentCalendarGrid = document.querySelector("#studentCalendarGrid");
const studentCalendarSlotsTitle = document.querySelector("#studentCalendarSlotsTitle");
const studentCalendarSlots = document.querySelector("#studentCalendarSlots");
const studentCalendarHint = document.querySelector("#studentCalendarHint");
const studentCalendarSelection = document.querySelector("#studentCalendarSelection");

const studentCalendarState = {
  monthCursor: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  expandedDateKey: "",
};

const studentBookedCache = {};
let studentCalendarSlotsRenderSeq = 0;

const teacherSession = {
  isLoggedIn: false,
  teacherId: "",
  teacherName: "",
  className: "",
  forcePasswordChange: false,
  token: "",
};

void (async function bootstrapHomeroomAndUi() {
  await refreshHomeroomTeachersFromSheet();
  initStep1GradeClassSelectors();
  addTeacherOptions();
  setSchoolName();
  applyDateInputBySettings(null);
  setDefaultUrgency();
  initMessageCounter();
  resetSlotBoardBeforeCheck();
  updateStepProgress();
  initializeTeacherSettingsUI();
  initializeStudentCalendarUI();
})();

if (fields.grade) {
  fields.grade.addEventListener("change", async () => {
    if (fields.classNumber) {
      fields.classNumber.value = "";
    }
    if (fields.className) {
      fields.className.value = "";
    }
    const g = fields.grade ? String(fields.grade.value).trim() : "";
    populateClassNumberSelectForGrade(g);
    await resetStep1DependentUI();
  });
}
if (fields.classNumber) {
  fields.classNumber.addEventListener("change", async () => {
    await applyStudentClassSelection();
  });
}
if (fields.date) {
  fields.date.addEventListener("change", () => {
    fields.time.value = "";
    validateSelectedDateByTeacherSettings();
    resetSlotBoardBeforeCheck();
    updateStepProgress();
    syncCheckAvailabilityButtonState();
  });
}
if (checkAvailabilityBtn) {
  checkAvailabilityBtn.addEventListener("click", async () => {
    syncHiddenStudentClassFromSelectors();
    if (!fields.className || !fields.className.value || !fields.teacher || !fields.teacher.value) {
      showMessage("먼저 학년과 반을 선택해 주세요.", true);
      return;
    }
    if (!fields.date || !fields.date.value) {
      showMessage("희망 날짜를 먼저 선택해 주세요.", true);
      return;
    }
    setAvailabilityLoading(true);
    await renderTimeSlotBoard({ forceFetch: true, forceSettingsReload: true });
    setAvailabilityLoading(false);
    updateStepProgress();
  });
}

if (fields.number) {
  fields.number.addEventListener("input", updateStepProgress);
}
if (fields.name) {
  fields.name.addEventListener("input", updateStepProgress);
}
if (fields.topic) {
  fields.topic.addEventListener("change", updateStepProgress);
}
if (fields.message) {
  fields.message.addEventListener("input", updateStepProgress);
}

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    syncHiddenStudentClassFromSelectors();
    if (!fields.className || !String(fields.className.value).trim()) {
      showMessage("학년과 반을 모두 선택해 주세요.", true);
      return;
    }
    const requestData = collectRequestData();

    if (!requestData.date) {
      const className = String(fields.className ? fields.className.value : "").trim();
      const settings = className ? studentSettingsCache[className] : null;
      if (
        settings &&
        !settings.fetchFailed &&
        settings.applyStart &&
        settings.applyEnd &&
        !isApplicationWindowOpen(settings)
      ) {
        showMessage("지금은 상담 신청 기간이 아닙니다.", true);
      } else {
        showMessage("희망 날짜를 선택해 주세요.", true);
      }
      return;
    }

    const dateValidation = validateSelectedDateByTeacherSettings();
    if (!dateValidation.valid) {
      const submitDateMessages = {
        settings: "담임 선생님이 아직 상담 예약 설정을 준비 중입니다.",
        times: "담임 선생님 쪽에 상담 가능 시간이 아직 설정되지 않았습니다.",
        closed: "지금은 상담 신청 기간이 아닙니다.",
        date: "상담 가능 일자에서 선택한 날짜가 아닙니다.",
      };
      showMessage(submitDateMessages[dateValidation.reason] || submitDateMessages.date, true);
      return;
    }

    if (!requestData.time) {
      showMessage("가능한 시간을 선택해 주세요.", true);
      return;
    }

    setSubmitting(true);
    showMessage("");
    try {
      const result = await sendToGoogleSheets(requestData);
      if (!result.success) {
        if (result.duplicateSlot) {
          showMessage("이미 예약된 시간입니다. 다른 시간을 선택해주세요.", true);
          void renderTimeSlotBoard({ forceFetch: true });
          return;
        }
        if (result.duplicate) {
          showMessage(result.message || "오늘은 이미 신청했어요.", true);
          return;
        }
        showMessage(result.message || "저장에 실패했습니다. 잠시 후 다시 시도해주세요.", true);
        return;
      }

      restoreFrequentFields(requestData);
      setDefaultUrgency();
      updateMessageCounter();
      showMessage("");
      openStudentRequestCompleteModal();
      void renderTimeSlotBoard({ forceFetch: true });
      updateStepProgress();
      if (fields.name) {
        fields.name.focus();
      }
    } catch (error) {
      console.error(error);
      showMessage("저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.", true);
    } finally {
      setSubmitting(false);
    }
  });
}

function initializeTeacherSettingsUI() {
  renderSettingTimeButtons();
  initializeSettingCalendar();
  updateSettingSelectionHints();
  syncTeacherMainPanels();

  if (mainTabStudentBtn) {
    mainTabStudentBtn.addEventListener("click", () => setMainTab("student"));
  }
  if (mainTabTeacherBtn) {
    mainTabTeacherBtn.addEventListener("click", () => setMainTab("teacher"));
  }
  if (teacherAuthSubmitBtn) {
    teacherAuthSubmitBtn.addEventListener("click", submitTeacherLogin);
  }
  if (teacherLoginIdInput) {
    teacherLoginIdInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        submitTeacherLogin();
      }
    });
  }
  if (teacherLoginPasswordInput) {
    teacherLoginPasswordInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        submitTeacherLogin();
      }
    });
  }
  if (teacherLogoutBtn) {
    teacherLogoutBtn.addEventListener("click", () => {
      logoutTeacher();
    });
  }
  if (teacherAccountOpenBtn) {
    teacherAccountOpenBtn.addEventListener("click", () => {
      openTeacherAccountModal();
    });
  }
  if (teacherAccountModalCloseBtn) {
    teacherAccountModalCloseBtn.addEventListener("click", () => {
      closeTeacherAccountModal();
    });
  }
  if (teacherAccountModal) {
    teacherAccountModal.addEventListener("click", (event) => {
      if (event.target === teacherAccountModal) {
        closeTeacherAccountModal();
      }
    });
  }
  if (saveTeacherPasswordBtn) {
    saveTeacherPasswordBtn.addEventListener("click", submitTeacherPasswordChange);
  }
  if (settingRemoveDateBtn) {
    settingRemoveDateBtn.addEventListener("click", () => {
      const key = teacherSettingsState.selectedDateKey;
      if (!key || !teacherSettingsState.scheduleByDate[key]) {
        return;
      }
      delete teacherSettingsState.scheduleByDate[key];
      const remaining = Object.keys(teacherSettingsState.scheduleByDate).sort();
      teacherSettingsState.selectedDateKey = remaining.length ? remaining[0] : "";
      updateSettingSelectionHints();
      renderSettingCalendar();
      updateSettingTimeButtonState();
    });
  }
  if (settingPrevMonthBtn) {
    settingPrevMonthBtn.addEventListener("click", () => {
      shiftSettingCalendarMonth(-1);
    });
  }
  if (settingNextMonthBtn) {
    settingNextMonthBtn.addEventListener("click", () => {
      shiftSettingCalendarMonth(1);
    });
  }
  if (saveTeacherSettingsBtn) {
    saveTeacherSettingsBtn.addEventListener("click", handleTeacherSettingsSave);
  }
  if (teacherSchedulePrevMonthBtn) {
    teacherSchedulePrevMonthBtn.addEventListener("click", () => shiftTeacherScheduleMonth(-1));
  }
  if (teacherScheduleNextMonthBtn) {
    teacherScheduleNextMonthBtn.addEventListener("click", () => shiftTeacherScheduleMonth(1));
  }
  if (saveTeacherScheduleStatusBtn) {
    saveTeacherScheduleStatusBtn.addEventListener("click", handleTeacherScheduleStatusSave);
  }
  if (teacherScheduleEditBtn) {
    teacherScheduleEditBtn.addEventListener("click", () => {
      teacherScheduleState.isEditing = true;
      teacherScheduleState.editDraft = null;
      renderTeacherScheduleDetail();
    });
  }
  if (teacherScheduleCancelEditBtn) {
    teacherScheduleCancelEditBtn.addEventListener("click", () => {
      teacherScheduleState.isEditing = false;
      teacherScheduleState.editDraft = null;
      renderTeacherScheduleDetail();
    });
  }
  if (teacherScheduleSaveEditBtn) {
    teacherScheduleSaveEditBtn.addEventListener("click", handleTeacherConsultationUpdateSave);
  }
  if (teacherScheduleDeleteBtn) {
    teacherScheduleDeleteBtn.addEventListener("click", () => openTeacherScheduleDeleteModal());
  }
  if (teacherScheduleDeleteModalCloseBtn) {
    teacherScheduleDeleteModalCloseBtn.addEventListener("click", () => closeTeacherScheduleDeleteModal());
  }
  if (teacherScheduleDeleteModal) {
    teacherScheduleDeleteModal.addEventListener("click", (event) => {
      if (event.target === teacherScheduleDeleteModal) {
        closeTeacherScheduleDeleteModal();
      }
    });
  }
  if (teacherScheduleDeleteConfirmBtn) {
    teacherScheduleDeleteConfirmBtn.addEventListener("click", handleTeacherConsultationDeleteConfirm);
  }
  if (teacherScheduleRefreshBtn) {
    teacherScheduleRefreshBtn.addEventListener("click", async () => {
      await ensureTeacherScheduleLoaded(true);
      showToast("상담 일정을 새로고침했습니다.");
    });
  }
  if (teacherSchedulePrintBtn) {
    teacherSchedulePrintBtn.addEventListener("click", () => {
      openTeacherSchedulePrintModal();
    });
  }
  if (teacherScheduleDetailModalCloseBtn) {
    teacherScheduleDetailModalCloseBtn.addEventListener("click", () => closeTeacherScheduleDetailModal());
  }
  if (teacherScheduleDetailModal) {
    teacherScheduleDetailModal.addEventListener("click", (event) => {
      if (event.target === teacherScheduleDetailModal) {
        closeTeacherScheduleDetailModal();
      }
    });
  }
  if (teacherSchedulePrintModalCloseBtn) {
    teacherSchedulePrintModalCloseBtn.addEventListener("click", () => closeTeacherSchedulePrintModal());
  }
  if (teacherSchedulePrintModal) {
    teacherSchedulePrintModal.addEventListener("click", (event) => {
      if (event.target === teacherSchedulePrintModal) {
        closeTeacherSchedulePrintModal();
      }
    });
  }
  if (studentRequestCompleteModalCloseBtn) {
    studentRequestCompleteModalCloseBtn.addEventListener("click", () => closeStudentRequestCompleteModal());
  }
  if (studentRequestCompleteModalOkBtn) {
    studentRequestCompleteModalOkBtn.addEventListener("click", () => closeStudentRequestCompleteModal());
  }
  if (studentRequestCompleteModal) {
    studentRequestCompleteModal.addEventListener("click", (event) => {
      if (event.target === studentRequestCompleteModal) {
        closeStudentRequestCompleteModal();
      }
    });
  }
  if (teacherSchedulePrintDownloadBtn) {
    teacherSchedulePrintDownloadBtn.addEventListener("click", handleTeacherSchedulePdfDownload);
  }
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    if (isStudentRequestCompleteModalOpen()) {
      closeStudentRequestCompleteModal();
      return;
    }
    if (isTeacherAccountModalOpen()) {
      closeTeacherAccountModal();
      return;
    }
    if (isTeacherSchedulePrintModalOpen()) {
      closeTeacherSchedulePrintModal();
      return;
    }
    if (isTeacherScheduleDeleteModalOpen()) {
      closeTeacherScheduleDeleteModal();
      return;
    }
    if (isTeacherScheduleDetailModalOpen()) {
      closeTeacherScheduleDetailModal();
      return;
    }
    if (activeMainTab === "teacher") {
      setMainTab("student");
    }
  });
}

function isStudentRequestCompleteModalOpen() {
  return Boolean(studentRequestCompleteModal && !studentRequestCompleteModal.hidden);
}

function openStudentRequestCompleteModal() {
  if (!studentRequestCompleteModal) {
    return;
  }
  studentRequestCompleteModal.hidden = false;
  studentRequestCompleteModal.setAttribute("aria-hidden", "false");
  const focusTarget = studentRequestCompleteModalOkBtn || studentRequestCompleteModalCloseBtn;
  if (focusTarget && typeof focusTarget.focus === "function") {
    window.requestAnimationFrame(() => focusTarget.focus());
  }
}

function closeStudentRequestCompleteModal() {
  if (!studentRequestCompleteModal) {
    return;
  }
  studentRequestCompleteModal.hidden = true;
  studentRequestCompleteModal.setAttribute("aria-hidden", "true");
}

function isTeacherAccountModalOpen() {
  return Boolean(teacherAccountModal && !teacherAccountModal.hidden);
}

function isTeacherSchedulePrintModalOpen() {
  return Boolean(teacherSchedulePrintModal && !teacherSchedulePrintModal.hidden);
}

function isTeacherScheduleDeleteModalOpen() {
  return Boolean(teacherScheduleDeleteModal && !teacherScheduleDeleteModal.hidden);
}

function isTeacherScheduleDetailModalOpen() {
  return Boolean(teacherScheduleDetailModal && !teacherScheduleDetailModal.hidden);
}

function openTeacherScheduleDetailModal() {
  if (!teacherScheduleDetailModal) {
    return;
  }
  teacherScheduleDetailModal.hidden = false;
  teacherScheduleDetailModal.setAttribute("aria-hidden", "false");
}

function closeTeacherScheduleDetailModal() {
  if (!teacherScheduleDetailModal) {
    return;
  }
  teacherScheduleDetailModal.hidden = true;
  teacherScheduleDetailModal.setAttribute("aria-hidden", "true");
  teacherScheduleState.isEditing = false;
  teacherScheduleState.editDraft = null;
  setModalMessage(teacherScheduleStatusMessage, "");
}

function openTeacherScheduleDeleteModal() {
  if (!teacherScheduleDeleteModal || !teacherScheduleDeletePreview) {
    return;
  }
  const item = teacherScheduleState.consultations.find((it) => it.id === teacherScheduleState.selectedItemId);
  if (!item) {
    return;
  }
  setModalMessage(teacherScheduleDeleteMessage, "");
  teacherScheduleDeletePreview.textContent = `${item.date} ${item.time} · ${item.studentName} (${item.studentNumber || "-"})`;
  teacherScheduleDeleteModal.hidden = false;
  teacherScheduleDeleteModal.setAttribute("aria-hidden", "false");
}

function closeTeacherScheduleDeleteModal() {
  if (!teacherScheduleDeleteModal) {
    return;
  }
  setModalMessage(teacherScheduleDeleteMessage, "");
  teacherScheduleDeleteModal.hidden = true;
  teacherScheduleDeleteModal.setAttribute("aria-hidden", "true");
}

function openTeacherSchedulePrintModal() {
  if (!teacherSchedulePrintModal) {
    return;
  }
  setModalMessage(teacherSchedulePrintMessage, "");
  // 기본값: 현재 달 전체
  const cursor = teacherScheduleState.monthCursor || new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const end = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);
  if (teacherSchedulePrintStart) {
    teacherSchedulePrintStart.value = formatDateKey(start);
  }
  if (teacherSchedulePrintEnd) {
    teacherSchedulePrintEnd.value = formatDateKey(end);
  }
  teacherSchedulePrintModal.hidden = false;
  teacherSchedulePrintModal.setAttribute("aria-hidden", "false");
}

function closeTeacherSchedulePrintModal() {
  if (!teacherSchedulePrintModal) {
    return;
  }
  setModalMessage(teacherSchedulePrintMessage, "");
  teacherSchedulePrintModal.hidden = true;
  teacherSchedulePrintModal.setAttribute("aria-hidden", "true");
}

async function handleTeacherSchedulePdfDownload() {
  if (!teacherSession.isLoggedIn || !teacherSession.token) {
    handleTeacherSessionExpired();
    return;
  }
  const start = normalizeDateValue(teacherSchedulePrintStart ? teacherSchedulePrintStart.value : "");
  const end = normalizeDateValue(teacherSchedulePrintEnd ? teacherSchedulePrintEnd.value : "");
  if (!start || !end || start > end) {
    setModalMessage(teacherSchedulePrintMessage, "출력 기간을 올바르게 선택해 주세요.", true);
    return;
  }
  if (teacherSchedulePrintDownloadBtn) {
    teacherSchedulePrintDownloadBtn.disabled = true;
  }
  setModalMessage(teacherSchedulePrintMessage, "PDF를 만드는 중입니다. 잠시만 기다려 주세요...");
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "exportTeacherSchedulePdf",
        token: teacherSession.token,
        startDate: start,
        endDate: end,
      }),
    });
    const rawText = await response.text();
    let result = {};
    if (rawText) {
      result = JSON.parse(rawText);
    }
    if (!response.ok || !result.success) {
      if (result && result.sessionExpired) {
        handleTeacherSessionExpired();
        return;
      }
      setModalMessage(
        teacherSchedulePrintMessage,
        (result && result.message) ? String(result.message) : `PDF 생성에 실패했습니다. (HTTP ${response.status})`,
        true
      );
      return;
    }
    const base64 = String(result.pdfBase64 || "").trim();
    const filename = String(result.filename || "상담일정표.pdf").trim() || "상담일정표.pdf";
    if (!base64) {
      setModalMessage(teacherSchedulePrintMessage, "PDF 데이터를 받지 못했습니다. 다시 시도해 주세요.", true);
      return;
    }
    const binary = window.atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setModalMessage(teacherSchedulePrintMessage, "다운로드를 시작합니다.");
  } catch (error) {
    console.error("handleTeacherSchedulePdfDownload failed", error);
    setModalMessage(teacherSchedulePrintMessage, "PDF 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", true);
  } finally {
    if (teacherSchedulePrintDownloadBtn) {
      teacherSchedulePrintDownloadBtn.disabled = false;
    }
  }
}

function openTeacherAccountModal() {
  if (!teacherAccountModal) {
    return;
  }
  setModalMessage(teacherPasswordChangeMessage, "");
  clearTeacherPasswordChangeForm();
  teacherAccountModal.hidden = false;
  teacherAccountModal.setAttribute("aria-hidden", "false");
  if (currentTeacherPasswordInput) {
    window.setTimeout(() => {
      currentTeacherPasswordInput.focus();
    }, 0);
  }
}

function closeTeacherAccountModal() {
  if (!teacherAccountModal) {
    return;
  }
  teacherAccountModal.hidden = true;
  teacherAccountModal.setAttribute("aria-hidden", "true");
  clearTeacherPasswordChangeForm();
  setModalMessage(teacherPasswordChangeMessage, "");
}

function syncTeacherMainPanels() {
  if (!teacherLoginPanel || !teacherDashboardEl) {
    return;
  }
  if (!teacherSession.isLoggedIn) {
    closeTeacherAccountModal();
    teacherLoginPanel.hidden = false;
    teacherLoginPanel.setAttribute("aria-hidden", "false");
    teacherDashboardEl.hidden = true;
    teacherDashboardEl.setAttribute("aria-hidden", "true");
  } else {
    teacherLoginPanel.hidden = true;
    teacherLoginPanel.setAttribute("aria-hidden", "true");
    teacherDashboardEl.hidden = false;
    teacherDashboardEl.setAttribute("aria-hidden", "false");
  }
}

function setMainTab(tab) {
  const next = tab === "teacher" ? "teacher" : "student";
  activeMainTab = next;
  const isStudent = next === "student";

  if (isStudent) {
    closeTeacherAccountModal();
  }

  if (mainTabStudentBtn) {
    mainTabStudentBtn.classList.toggle("is-active", isStudent);
    mainTabStudentBtn.setAttribute("aria-selected", isStudent ? "true" : "false");
  }
  if (mainTabTeacherBtn) {
    mainTabTeacherBtn.classList.toggle("is-active", !isStudent);
    mainTabTeacherBtn.setAttribute("aria-selected", !isStudent ? "true" : "false");
  }
  if (mainPanelStudent) {
    mainPanelStudent.classList.toggle("is-active", isStudent);
    mainPanelStudent.toggleAttribute("hidden", !isStudent);
  }
  if (mainPanelTeacher) {
    mainPanelTeacher.classList.toggle("is-active", !isStudent);
    mainPanelTeacher.toggleAttribute("hidden", isStudent);
  }

  if (!isStudent) {
    if (teacherSession.isLoggedIn) {
      if (!teacherDashboardBootstrapped) {
        void renderTeacherDashboard();
      } else {
        syncTeacherMainPanels();
        updateTeacherSessionDisplay();
      }
    } else {
      syncTeacherMainPanels();
    }
  }
}

function showTeacherLoginView(options = {}) {
  if (!teacherLoginPanel) {
    return;
  }
  const clearFields = options.clearFields !== false;
  setMainTab("teacher");
  resetTeacherDashboardForms();
  if (clearFields) {
    setModalMessage(teacherAuthMessage, "");
    if (teacherLoginIdInput) {
      teacherLoginIdInput.value = "";
    }
    if (teacherLoginPasswordInput) {
      teacherLoginPasswordInput.value = "";
    }
  }
  if (!teacherSession.isLoggedIn) {
    syncTeacherMainPanels();
  }
  if (teacherLoginIdInput) {
    teacherLoginIdInput.focus();
  }
}

async function renderTeacherDashboard() {
  if (!teacherDashboardEl) {
    return;
  }
  hideTeacherLoginPanel();
  setModalMessage(teacherSettingsMessage, "");
  updateTeacherSessionDisplay();
  await applyTeacherSessionToSettings();
  if (!teacherDashboardBootstrapped) {
    teacherScheduleState.monthCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    teacherScheduleState.selectedDate = "";
    teacherScheduleState.selectedItemId = "";
    teacherScheduleState.consultations = [];
    teacherScheduleState.filteredConsultations = [];
    teacherScheduleState.isLoaded = false;
  }
  renderTeacherScheduleCalendar();
  renderTeacherScheduleList();
  renderTeacherScheduleDetail();
  renderSettingCalendar();
  await ensureTeacherScheduleLoaded(false);
  if (!teacherDashboardBootstrapped) {
    teacherDashboardBootstrapped = true;
  }
  syncTeacherMainPanels();
}

function hideTeacherLoginPanel() {
  if (!teacherLoginPanel) {
    return;
  }
  teacherLoginPanel.hidden = true;
  teacherLoginPanel.setAttribute("aria-hidden", "true");
}

function resetTeacherDashboardForms() {
  clearTeacherPasswordChangeForm();
  setModalMessage(teacherPasswordChangeMessage, "");
  setModalMessage(teacherScheduleStatusMessage, "");
}

function updateTeacherSessionDisplay() {
  if (!teacherSessionInfo) {
    return;
  }
  if (!teacherSession.isLoggedIn || !teacherSession.teacherName) {
    teacherSessionInfo.hidden = true;
    return;
  }
  const name = String(teacherSession.teacherName || "").trim();
  const klass = String(teacherSession.className || "").trim();
  if (teacherSessionClassText) {
    teacherSessionClassText.textContent = `🏫 ${klass || "학급 미지정"}`;
  }
  if (teacherSessionTeacherText) {
    teacherSessionTeacherText.textContent = `🧑‍🏫 ${formatTeacherHonorific(name)}`;
  }
  teacherSessionInfo.hidden = false;
}

async function applyTeacherSessionToSettings() {
  if (!teacherSession.isLoggedIn) {
    if (settingTeacherInfo) {
      settingTeacherInfo.textContent = DEFAULT_SETTING_MESSAGE;
    }
    teacherSettingsState.scheduleByDate = {};
    teacherSettingsState.selectedDateKey = "";
    updateSettingSelectionHints();
    renderSettingCalendar();
    updateSettingTimeButtonState();
    return;
  }

  const parsed = parseClassName(teacherSession.className);
  if (!parsed) {
    setModalMessage(
      teacherSettingsMessage,
      "담당 학급 정보를 확인할 수 없습니다. 관리자에게 문의해 주세요.",
      true
    );
    return;
  }

  const teacherLine = getTeacherFromGradeClass(parsed.grade, parsed.classNumber);
  if (settingTeacherInfo) {
    const name = String(teacherSession.teacherName || "").trim();
    const klass = String(teacherSession.className || "").trim();
    settingTeacherInfo.textContent =
      teacherLine || formatHomeroomTeacherLine(klass, name) || formatTeacherHonorific(name) || DEFAULT_SETTING_MESSAGE;
  }

  await loadTeacherSettingsToModal();
}

function logoutTeacher() {
  closeTeacherAccountModal();
  teacherSession.isLoggedIn = false;
  teacherSession.teacherId = "";
  teacherSession.teacherName = "";
  teacherSession.className = "";
  teacherSession.forcePasswordChange = false;
  teacherSession.token = "";
  teacherDashboardBootstrapped = false;
  teacherScheduleState.isLoaded = false;
  teacherScheduleState.consultations = [];
  teacherScheduleState.filteredConsultations = [];
  teacherScheduleState.selectedDate = "";
  teacherScheduleState.selectedItemId = "";
  teacherScheduleState.monthCursor = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  clearTeacherPasswordChangeForm();
  resetTeacherDashboardForms();
  if (settingApplyStart) {
    settingApplyStart.value = "";
  }
  if (settingApplyEnd) {
    settingApplyEnd.value = "";
  }
  teacherSettingsState.scheduleByDate = {};
  teacherSettingsState.selectedDateKey = "";
  updateSettingSelectionHints();
  renderSettingCalendar();
  updateSettingTimeButtonState();
  if (settingTeacherInfo) {
    settingTeacherInfo.textContent = DEFAULT_SETTING_MESSAGE;
  }
  setModalMessage(teacherAuthMessage, "");
  setModalMessage(teacherSettingsMessage, "");
  updateTeacherSessionDisplay();
  renderTeacherScheduleCalendar();
  renderTeacherScheduleList();
  renderTeacherScheduleDetail();
  syncTeacherMainPanels();
  showToast("로그아웃되었습니다.");
}

function getTeacherScheduleDateKey(date) {
  const normalized = normalizeDateValue(date);
  return normalized || "";
}

function normalizeConsultationStatus(value) {
  const text = String(value || "").trim();
  if (text === "상담 완료") {
    return "상담 완료";
  }
  if (text === "상담 전") {
    return "상담 전";
  }
  // 구버전 값 호환
  if (text === "완료") {
    return "상담 완료";
  }
  if (text === "처리안됨" || text === "확인중") {
    return "상담 전";
  }
  return "상담 전";
}

/** 시트·세션 학급명 공백 차이로 일정이 비는 것 방지 (서버 normalizeClassNameKey와 동일 규칙) */
function normalizeClassNameKeyLocal(name) {
  return String(name || "").replace(/\s+/g, " ").trim();
}

function handleTeacherSessionExpired() {
  teacherScheduleState.isLoaded = false;
  teacherScheduleState.consultations = [];
  teacherScheduleState.filteredConsultations = [];
  teacherScheduleState.selectedDate = "";
  teacherScheduleState.selectedItemId = "";
  teacherSession.isLoggedIn = false;
  teacherSession.teacherId = "";
  teacherSession.teacherName = "";
  teacherSession.className = "";
  teacherSession.forcePasswordChange = false;
  teacherSession.token = "";
  teacherDashboardBootstrapped = false;
  showTeacherLoginView();
  setModalMessage(teacherAuthMessage, "로그인이 만료되었습니다. 다시 로그인해 주세요.", true);
}

/** 학생 입력 등 사용자 텍스트 — textContent용 (innerHTML에 넣지 않음) */
function appendTeacherDetailLabeledRow(container, labelText, valueText) {
  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = labelText;
  p.appendChild(strong);
  const display = valueText === undefined || valueText === null || String(valueText).trim() === "" ? "-" : String(valueText);
  p.appendChild(document.createTextNode(` ${display}`));
  container.appendChild(p);
}

function normalizeConsultationItems(rawItems) {
  return (Array.isArray(rawItems) ? rawItems : [])
    .map((item, index) => {
      const dateKey = getTeacherScheduleDateKey(item.requestDate || item.date || "");
      const time = normalizeTime(item.requestTime || item.time || "");
      if (!dateKey || !time) {
        return null;
      }
      const className = String(item.className || teacherSession.className || "").trim();
      const teacherName = String(item.teacher || teacherSession.teacherName || "").trim();
      const studentName = String(item.name || item.studentName || "학생").trim() || "학생";
      const studentNumber = String(item.number || item.studentNumber || "").trim();
      const urgency = String(item.urgency || "").trim();
      const topic = String(item.topic || "").trim();
      const message = String(item.message || "").trim();
      const status = normalizeConsultationStatus(item.status || item.processStatus);
      const id = String(item.id || item.rowId || `${dateKey}-${time}-${studentName}-${index}`).trim();
      return {
        id,
        date: dateKey,
        time,
        className,
        teacherName,
        studentName,
        studentNumber,
        urgency,
        topic,
        message,
        status,
      };
    })
    .filter(Boolean)
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
}

async function fetchTeacherConsultationsFromApi() {
  const className = String(teacherSession.className || "").trim();
  const token = String(teacherSession.token || "").trim();
  if (!className || !token) {
    return [];
  }
  const richResponse = await fetch(buildApiUrl({
    action: "getTeacherConsultations",
    token,
    t: String(Date.now()),
  }));
  if (richResponse.ok) {
    const richResult = await richResponse.json();
    if (richResult && richResult.success === false) {
      if (richResult.sessionExpired) {
        handleTeacherSessionExpired();
      }
      throw new Error(richResult.message || "상담 일정을 불러올 수 없습니다.");
    }
    if (richResult && richResult.success && Array.isArray(richResult.consultations)) {
      return normalizeConsultationItems(richResult.consultations);
    }
  }

  throw new Error("상담 일정을 불러올 수 없습니다.");
}

async function ensureTeacherScheduleLoaded(forceReload = false) {
  if (!teacherSession.isLoggedIn || !teacherSession.className) {
    return;
  }
  if (!teacherSession.token) {
    handleTeacherSessionExpired();
    return;
  }
  if (teacherScheduleState.isLoaded && !forceReload) {
    return;
  }
  if (teacherScheduleListHint) {
    teacherScheduleListHint.textContent = "상담 일정을 불러오는 중...";
  }
  if (teacherScheduleRefreshBtn) {
    teacherScheduleRefreshBtn.disabled = true;
  }
  try {
    const items = await fetchTeacherConsultationsFromApi();
    const sessionClassKey = normalizeClassNameKeyLocal(teacherSession.className);
    teacherScheduleState.consultations = items.filter(
      (item) => normalizeClassNameKeyLocal(item.className) === sessionClassKey
    );
    teacherScheduleState.isLoaded = true;
    if (!teacherScheduleState.selectedDate && teacherScheduleState.consultations.length) {
      teacherScheduleState.selectedDate = teacherScheduleState.consultations[0].date;
    }
    renderTeacherScheduleCalendar();
    renderTeacherScheduleList();
    renderTeacherScheduleDetail();
  } catch (error) {
    console.error("ensureTeacherScheduleLoaded failed", error);
    if (!teacherSession.isLoggedIn) {
      teacherScheduleState.consultations = [];
      teacherScheduleState.filteredConsultations = [];
      renderTeacherScheduleCalendar();
      renderTeacherScheduleList();
      renderTeacherScheduleDetail();
      return;
    }
    teacherScheduleState.consultations = [];
    teacherScheduleState.filteredConsultations = [];
    renderTeacherScheduleCalendar();
    renderTeacherScheduleList();
    renderTeacherScheduleDetail();
    if (teacherScheduleListHint) {
      teacherScheduleListHint.textContent = "상담 일정을 불러오지 못했습니다. 네트워크 또는 웹앱 배포 상태를 확인해 주세요.";
    }
    setModalMessage(teacherScheduleStatusMessage, "일정 조회에 실패했습니다. 잠시 후 다시 시도해 주세요.", true);
  } finally {
    if (teacherScheduleRefreshBtn) {
      teacherScheduleRefreshBtn.disabled = false;
    }
  }
}

function shiftTeacherScheduleMonth(amount) {
  const cursor = teacherScheduleState.monthCursor;
  teacherScheduleState.monthCursor = new Date(cursor.getFullYear(), cursor.getMonth() + amount, 1);
  renderTeacherScheduleCalendar();
}

function renderTeacherScheduleCalendar() {
  if (!teacherScheduleCalendarGrid || !teacherScheduleMonthLabel) {
    return;
  }
  const cursor = teacherScheduleState.monthCursor;
  teacherScheduleMonthLabel.textContent = `${cursor.getFullYear()}년 ${cursor.getMonth() + 1}월`;
  teacherScheduleCalendarGrid.innerHTML = "";

  const itemsByDate = {};
  teacherScheduleState.consultations.forEach((item) => {
    const d = String(item.date || "").trim();
    if (!d) {
      return;
    }
    if (!itemsByDate[d]) {
      itemsByDate[d] = [];
    }
    itemsByDate[d].push(item);
  });
  Object.keys(itemsByDate).forEach((d) => {
    itemsByDate[d].sort((a, b) => String(a.time || "").localeCompare(String(b.time || "")));
  });

  const firstDay = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const startWeekday = firstDay.getDay();
  const startDate = new Date(cursor.getFullYear(), cursor.getMonth(), 1 - startWeekday);
  const todayKey = formatDateKeyInSeoul(new Date());

  for (let i = 0; i < 42; i += 1) {
    const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
    const dateKey = formatDateKey(date);
    const isCurrentMonth = date.getMonth() === cursor.getMonth();
    const isToday = dateKey === todayKey;
    const isSelectedDay = teacherScheduleState.selectedDate === dateKey;
    const items = itemsByDate[dateKey] || [];

    const cell = document.createElement("div");
    cell.className = "teacher-schedule-day";
    if (!isCurrentMonth) {
      cell.classList.add("is-outside");
    }
    if (isToday) {
      cell.classList.add("is-today");
    }
    if (isSelectedDay) {
      cell.classList.add("is-selected");
    }
    const numSpan = document.createElement("span");
    numSpan.className = "teacher-schedule-day__num";
    numSpan.textContent = String(date.getDate());
    cell.appendChild(numSpan);

    const list = document.createElement("div");
    list.className = "teacher-schedule-day__items";
    items.forEach((item) => {
      const entry = document.createElement("button");
      entry.type = "button";
      entry.className = "teacher-schedule-entry";
      if (normalizeConsultationStatus(item.status || "") === "상담 완료") {
        entry.classList.add("is-done");
      }
      if (item.id === teacherScheduleState.selectedItemId) {
        entry.classList.add("is-selected");
      }
      entry.textContent = `${String(item.time || "").trim()} ${String(item.studentName || "").trim()}`.trim();
      entry.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        teacherScheduleState.selectedDate = dateKey;
        teacherScheduleState.selectedItemId = item.id;
        teacherScheduleState.isEditing = false;
        teacherScheduleState.editDraft = null;
        renderTeacherScheduleCalendar();
        openTeacherScheduleDetailModal();
        renderTeacherScheduleDetail();
      });
      list.appendChild(entry);
    });
    cell.appendChild(list);

    teacherScheduleCalendarGrid.appendChild(cell);
  }
}

function renderTeacherScheduleList() {
  if (!teacherScheduleList || !teacherScheduleSelectedDateTitle || !teacherScheduleListHint) {
    return;
  }
  teacherScheduleList.innerHTML = "";
  const selectedDate = teacherScheduleState.selectedDate;
  if (!selectedDate) {
    teacherScheduleSelectedDateTitle.textContent = "날짜를 선택해 주세요";
    teacherScheduleListHint.textContent = "상담이 있는 날짜를 선택하면 해당 일자의 신청 목록을 확인할 수 있습니다.";
    teacherScheduleState.filteredConsultations = [];
    return;
  }

  teacherScheduleSelectedDateTitle.textContent = `${selectedDate} 상담 목록`;
  const items = teacherScheduleState.consultations.filter((item) => item.date === selectedDate);
  teacherScheduleState.filteredConsultations = items;
  if (!items.length) {
    teacherScheduleListHint.textContent = "선택한 날짜에 등록된 상담 신청이 없습니다.";
    return;
  }
  teacherScheduleListHint.textContent = "목록을 클릭하면 상담 상세를 확인할 수 있습니다.";

  items.forEach((item) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "teacher-schedule-list-item";
    if (item.id === teacherScheduleState.selectedItemId) {
      row.classList.add("is-selected");
    }
    const timeSpan = document.createElement("span");
    timeSpan.className = "teacher-schedule-list-item__time";
    timeSpan.textContent = item.time || "";
    const nameSpan = document.createElement("span");
    nameSpan.className = "teacher-schedule-list-item__name";
    nameSpan.textContent = item.studentName || "";
    const statusSpan = document.createElement("span");
    statusSpan.className = "teacher-schedule-list-item__status";
    statusSpan.textContent = item.status || "";
    row.appendChild(timeSpan);
    row.appendChild(nameSpan);
    row.appendChild(statusSpan);
    row.addEventListener("click", () => {
      teacherScheduleState.selectedItemId = item.id;
      renderTeacherScheduleList();
      renderTeacherScheduleDetail();
    });
    teacherScheduleList.appendChild(row);
  });
}

function renderTeacherScheduleDetail() {
  if (!teacherScheduleDetailContent || !teacherScheduleStatusSelect) {
    return;
  }
  const item = teacherScheduleState.consultations.find((it) => it.id === teacherScheduleState.selectedItemId);
  if (!item) {
    if (isTeacherScheduleDetailModalOpen()) {
      closeTeacherScheduleDetailModal();
    }
    return;
  }
  teacherScheduleDetailContent.textContent = "";
  if (!teacherScheduleState.isEditing) {
    appendTeacherDetailLabeledRow(teacherScheduleDetailContent, "학년반", item.className);
    appendTeacherDetailLabeledRow(teacherScheduleDetailContent, "번호", item.studentNumber);
    appendTeacherDetailLabeledRow(teacherScheduleDetailContent, "이름", item.studentName);
    appendTeacherDetailLabeledRow(teacherScheduleDetailContent, "희망날짜", item.date);
    appendTeacherDetailLabeledRow(teacherScheduleDetailContent, "희망시간", item.time);
    appendTeacherDetailLabeledRow(teacherScheduleDetailContent, "긴급도", item.urgency);
    appendTeacherDetailLabeledRow(teacherScheduleDetailContent, "주제", item.topic);
    appendTeacherDetailLabeledRow(teacherScheduleDetailContent, "상담 내용", item.message);
  } else {
    // draft 기본값
    if (!teacherScheduleState.editDraft) {
      teacherScheduleState.editDraft = {
        studentName: item.studentName || "",
        studentNumber: item.studentNumber || "",
        date: item.date || "",
        time: item.time || "",
        urgency: item.urgency || "",
        topic: item.topic || "",
        message: item.message || "",
        status: normalizeConsultationStatus(item.status || "상담 전"),
      };
    }
    const d = teacherScheduleState.editDraft;

    const buildField = (label, inputEl) => {
      const wrap = document.createElement("label");
      wrap.className = "field";
      const span = document.createElement("span");
      span.className = "field__label";
      span.textContent = label;
      wrap.appendChild(span);
      const iw = document.createElement("div");
      iw.className = "input-wrap";
      iw.appendChild(inputEl);
      wrap.appendChild(iw);
      return wrap;
    };

    const row2 = document.createElement("div");
    row2.className = "field-row field-row--2";

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = d.studentName;
    nameInput.addEventListener("input", () => (d.studentName = nameInput.value));

    const numInput = document.createElement("input");
    numInput.type = "number";
    numInput.min = "1";
    numInput.inputMode = "numeric";
    numInput.value = d.studentNumber;
    numInput.addEventListener("input", () => (d.studentNumber = numInput.value));

    row2.appendChild(buildField("이름", nameInput));
    row2.appendChild(buildField("번호", numInput));

    const rowDateTime = document.createElement("div");
    rowDateTime.className = "field-row field-row--2";

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.value = d.date;
    dateInput.addEventListener("input", () => (d.date = dateInput.value));

    const timeSelect = document.createElement("select");
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = "시간 선택";
    timeSelect.appendChild(placeholder);
    TIME_SLOTS.forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t;
      timeSelect.appendChild(opt);
    });
    timeSelect.value = d.time;
    timeSelect.addEventListener("change", () => (d.time = timeSelect.value));

    rowDateTime.appendChild(buildField("희망날짜", dateInput));
    rowDateTime.appendChild(buildField("희망시간", timeSelect));

    const rowMeta = document.createElement("div");
    rowMeta.className = "field-row field-row--2";

    const urgencySelect = document.createElement("select");
    ["", "긴급함", "보통", "천천히 가능"].forEach((v) => {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v || "긴급도 선택";
      urgencySelect.appendChild(opt);
    });
    urgencySelect.value = d.urgency || "";
    urgencySelect.addEventListener("change", () => (d.urgency = urgencySelect.value));

    const topicSelect = document.createElement("select");
    ["", "진로", "학업", "친구관계", "학교생활", "정서/가정", "기타"].forEach((v) => {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v || "상담 주제 선택";
      topicSelect.appendChild(opt);
    });
    topicSelect.value = d.topic || "";
    topicSelect.addEventListener("change", () => (d.topic = topicSelect.value));

    rowMeta.appendChild(buildField("긴급도", urgencySelect));
    rowMeta.appendChild(buildField("주제", topicSelect));

    const msgLabel = document.createElement("label");
    msgLabel.className = "field";
    const msgSpan = document.createElement("span");
    msgSpan.className = "field__label";
    msgSpan.textContent = "상담 내용";
    msgLabel.appendChild(msgSpan);
    const msgWrap = document.createElement("div");
    msgWrap.className = "input-wrap";
    const msg = document.createElement("textarea");
    msg.rows = 6;
    msg.value = d.message;
    msg.addEventListener("input", () => (d.message = msg.value));
    msgWrap.appendChild(msg);
    msgLabel.appendChild(msgWrap);

    teacherScheduleDetailContent.appendChild(row2);
    teacherScheduleDetailContent.appendChild(rowDateTime);
    teacherScheduleDetailContent.appendChild(rowMeta);
    teacherScheduleDetailContent.appendChild(msgLabel);
  }
  teacherScheduleStatusSelect.value = normalizeConsultationStatus(item.status);
  setModalMessage(teacherScheduleStatusMessage, "");

  if (teacherScheduleEditBtn) {
    teacherScheduleEditBtn.hidden = teacherScheduleState.isEditing;
  }
  if (teacherScheduleCancelEditBtn) {
    teacherScheduleCancelEditBtn.hidden = !teacherScheduleState.isEditing;
  }
  if (teacherScheduleSaveEditBtn) {
    teacherScheduleSaveEditBtn.hidden = !teacherScheduleState.isEditing;
  }
  if (teacherScheduleDeleteBtn) {
    teacherScheduleDeleteBtn.hidden = !teacherScheduleState.isEditing;
  }
  if (saveTeacherScheduleStatusBtn) {
    // 상담 여부 저장은 항상 가능(완료도 수정 가능)
    saveTeacherScheduleStatusBtn.hidden = false;
  }
}

async function handleTeacherScheduleStatusSave() {
  const item = teacherScheduleState.consultations.find((it) => it.id === teacherScheduleState.selectedItemId);
  if (!item) {
    setModalMessage(teacherScheduleStatusMessage, "상담 항목을 먼저 선택해 주세요.", true);
    return;
  }
  const nextStatus = normalizeConsultationStatus(teacherScheduleStatusSelect ? teacherScheduleStatusSelect.value : "");
  if (!teacherSession.token) {
    handleTeacherSessionExpired();
    return;
  }
  if (saveTeacherScheduleStatusBtn) {
    saveTeacherScheduleStatusBtn.disabled = true;
  }
  if (teacherScheduleRefreshBtn) {
    teacherScheduleRefreshBtn.disabled = true;
  }
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "updateConsultationStatus",
        token: teacherSession.token,
        consultationId: item.id,
        status: nextStatus,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP_${response.status}`);
    }
    const result = await response.json();
    if (!result.success) {
      if (result.sessionExpired) {
        handleTeacherSessionExpired();
      } else {
        setModalMessage(teacherScheduleStatusMessage, result.message || "처리 상태 저장에 실패했습니다.", true);
      }
      return;
    }
    await ensureTeacherScheduleLoaded(true);
    const refreshed = teacherScheduleState.consultations.find((it) => it.id === item.id);
    if (refreshed) {
      teacherScheduleState.selectedDate = refreshed.date;
      teacherScheduleState.selectedItemId = refreshed.id;
      renderTeacherScheduleCalendar();
      renderTeacherScheduleList();
      renderTeacherScheduleDetail();
    }
    setModalMessage(teacherScheduleStatusMessage, result.message || "처리 상태가 저장되었습니다.");
    showToast("처리 상태가 저장되었습니다.");
  } catch (error) {
    console.error("handleTeacherScheduleStatusSave failed", error);
    setModalMessage(teacherScheduleStatusMessage, "상태 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", true);
  } finally {
    if (saveTeacherScheduleStatusBtn) {
      saveTeacherScheduleStatusBtn.disabled = false;
    }
    if (teacherScheduleRefreshBtn) {
      teacherScheduleRefreshBtn.disabled = false;
    }
  }
}

async function handleTeacherConsultationUpdateSave() {
  const item = teacherScheduleState.consultations.find((it) => it.id === teacherScheduleState.selectedItemId);
  if (!item) {
    setModalMessage(teacherScheduleStatusMessage, "상담 항목을 먼저 선택해 주세요.", true);
    return;
  }
  if (!teacherSession.token) {
    handleTeacherSessionExpired();
    return;
  }
  const draft = teacherScheduleState.editDraft || {};
  const payload = {
    action: "updateConsultation",
    token: teacherSession.token,
    consultationId: item.id,
    // 모든 필드 수정 허용(학급은 세션 기준으로 검증)
    name: String(draft.studentName || "").trim(),
    number: String(draft.studentNumber || "").trim(),
    date: normalizeDateValue(String(draft.date || "").trim()),
    time: normalizeTime(String(draft.time || "").trim()),
    urgency: String(draft.urgency || "").trim(),
    topic: String(draft.topic || "").trim(),
    message: String(draft.message || "").trim(),
    status: normalizeConsultationStatus(teacherScheduleStatusSelect ? teacherScheduleStatusSelect.value : draft.status),
  };
  if (!payload.name || !payload.number || !payload.date || !payload.time) {
    setModalMessage(teacherScheduleStatusMessage, "이름/번호/날짜/시간은 필수입니다.", true);
    return;
  }
  if (teacherScheduleSaveEditBtn) {
    teacherScheduleSaveEditBtn.disabled = true;
  }
  if (teacherScheduleEditBtn) {
    teacherScheduleEditBtn.disabled = true;
  }
  if (teacherScheduleCancelEditBtn) {
    teacherScheduleCancelEditBtn.disabled = true;
  }
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`HTTP_${response.status}`);
    }
    const result = await response.json();
    if (!result.success) {
      if (result.sessionExpired) {
        handleTeacherSessionExpired();
      } else {
        setModalMessage(teacherScheduleStatusMessage, result.message || "수정 저장에 실패했습니다.", true);
      }
      return;
    }
    teacherScheduleState.isEditing = false;
    teacherScheduleState.editDraft = null;
    await ensureTeacherScheduleLoaded(true);
    const refreshed = teacherScheduleState.consultations.find((it) => it.id === item.id);
    if (refreshed) {
      teacherScheduleState.selectedDate = refreshed.date;
      teacherScheduleState.selectedItemId = refreshed.id;
    } else {
      teacherScheduleState.selectedItemId = "";
    }
    renderTeacherScheduleCalendar();
    renderTeacherScheduleDetail();
    setModalMessage(teacherScheduleStatusMessage, result.message || "수정이 저장되었습니다.");
    showToast("수정이 저장되었습니다.");
  } catch (error) {
    console.error("handleTeacherConsultationUpdateSave failed", error);
    setModalMessage(teacherScheduleStatusMessage, "수정 저장 중 오류가 발생했습니다.", true);
  } finally {
    if (teacherScheduleSaveEditBtn) {
      teacherScheduleSaveEditBtn.disabled = false;
    }
    if (teacherScheduleEditBtn) {
      teacherScheduleEditBtn.disabled = false;
    }
    if (teacherScheduleCancelEditBtn) {
      teacherScheduleCancelEditBtn.disabled = false;
    }
  }
}

async function handleTeacherConsultationDeleteConfirm() {
  const item = teacherScheduleState.consultations.find((it) => it.id === teacherScheduleState.selectedItemId);
  if (!item) {
    setModalMessage(teacherScheduleDeleteMessage, "삭제할 상담을 찾지 못했습니다.", true);
    return;
  }
  if (!teacherSession.token) {
    handleTeacherSessionExpired();
    return;
  }
  if (teacherScheduleDeleteConfirmBtn) {
    teacherScheduleDeleteConfirmBtn.disabled = true;
  }
  setModalMessage(teacherScheduleDeleteMessage, "");
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "deleteConsultation",
        token: teacherSession.token,
        consultationId: item.id,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP_${response.status}`);
    }
    const result = await response.json();
    if (!result.success) {
      if (result.sessionExpired) {
        handleTeacherSessionExpired();
        return;
      }
      setModalMessage(teacherScheduleDeleteMessage, result.message || "삭제에 실패했습니다.", true);
      return;
    }
    closeTeacherScheduleDeleteModal();
    teacherScheduleState.isEditing = false;
    teacherScheduleState.editDraft = null;
    teacherScheduleState.selectedItemId = "";
    await ensureTeacherScheduleLoaded(true);
    renderTeacherScheduleCalendar();
    renderTeacherScheduleDetail();
    setModalMessage(teacherScheduleStatusMessage, "삭제되었습니다.");
    showToast("삭제되었습니다.");
  } catch (error) {
    console.error("handleTeacherConsultationDeleteConfirm failed", error);
    setModalMessage(teacherScheduleDeleteMessage, "삭제 중 오류가 발생했습니다.", true);
  } finally {
    if (teacherScheduleDeleteConfirmBtn) {
      teacherScheduleDeleteConfirmBtn.disabled = false;
    }
  }
}

function showToast(message) {
  const text = String(message || "").trim();
  if (!text) {
    return;
  }
  let node = document.querySelector("#globalToast");
  if (!node) {
    node = document.createElement("div");
    node.id = "globalToast";
    node.className = "global-toast";
    node.setAttribute("role", "status");
    node.setAttribute("aria-live", "polite");
    document.body.appendChild(node);
  }
  node.textContent = text;
  node.classList.add("is-show");
  if (toastTimer) {
    window.clearTimeout(toastTimer);
  }
  toastTimer = window.setTimeout(() => {
    node.classList.remove("is-show");
  }, 1800);
}

function clearTeacherPasswordChangeForm() {
  if (currentTeacherPasswordInput) {
    currentTeacherPasswordInput.value = "";
  }
  if (newTeacherPasswordInput) {
    newTeacherPasswordInput.value = "";
  }
  if (confirmTeacherPasswordInput) {
    confirmTeacherPasswordInput.value = "";
  }
}

async function submitTeacherPasswordChange() {
  const teacherId = String(teacherSession.teacherId || "").trim();
  const currentPassword = String(currentTeacherPasswordInput ? currentTeacherPasswordInput.value : "").trim();
  const newPassword = String(newTeacherPasswordInput ? newTeacherPasswordInput.value : "").trim();
  const confirmPassword = String(confirmTeacherPasswordInput ? confirmTeacherPasswordInput.value : "").trim();

  if (!teacherSession.isLoggedIn || !teacherId) {
    setModalMessage(teacherPasswordChangeMessage, "로그인 정보가 없습니다. 다시 로그인해 주세요.", true);
    return;
  }
  if (!currentPassword || !newPassword || !confirmPassword) {
    setModalMessage(teacherPasswordChangeMessage, "모든 항목을 입력해 주세요.", true);
    return;
  }
  if (newPassword !== confirmPassword) {
    setModalMessage(teacherPasswordChangeMessage, "새 비밀번호와 확인 비밀번호가 일치하지 않습니다.", true);
    return;
  }
  if (newPassword.length < 4) {
    setModalMessage(teacherPasswordChangeMessage, "새 비밀번호는 4자 이상으로 입력해 주세요.", true);
    return;
  }
  if (currentPassword === newPassword) {
    setModalMessage(teacherPasswordChangeMessage, "현재 비밀번호와 다른 비밀번호를 입력해 주세요.", true);
    return;
  }

  if (saveTeacherPasswordBtn) {
    saveTeacherPasswordBtn.disabled = true;
  }
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "changeTeacherPassword",
        teacherId,
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP_${response.status}`);
    }
    const result = await response.json();
    if (!result.success) {
      setModalMessage(teacherPasswordChangeMessage, result.message || "비밀번호 변경에 실패했습니다.", true);
      return;
    }
    teacherSession.forcePasswordChange = false;
    teacherSession.token = "";
    teacherSession.isLoggedIn = false;
    teacherSession.teacherId = "";
    teacherSession.teacherName = "";
    teacherSession.className = "";
    clearTeacherPasswordChangeForm();
    resetTeacherDashboardForms();
    teacherDashboardBootstrapped = false;
    closeTeacherAccountModal();
    showTeacherLoginView();
    setModalMessage(teacherAuthMessage, "비밀번호가 변경되었습니다. 다시 로그인해 주세요.");
  } catch (error) {
    console.error("submitTeacherPasswordChange failed", error);
    setModalMessage(teacherPasswordChangeMessage, "비밀번호 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.", true);
  } finally {
    if (saveTeacherPasswordBtn) {
      saveTeacherPasswordBtn.disabled = false;
    }
  }
}

function pickTeacherSessionTokenFromLoginResult(result) {
  if (!result || typeof result !== "object") {
    return "";
  }
  const primary = result.sessionToken;
  const secondary = result.session_token;
  const raw = primary != null && String(primary).trim() !== "" ? primary : secondary;
  return String(raw != null ? raw : "").trim();
}

async function submitTeacherLogin() {
  const id = String(teacherLoginIdInput ? teacherLoginIdInput.value : "").trim();
  const password = String(teacherLoginPasswordInput ? teacherLoginPasswordInput.value : "").trim();
  if (!id || !password) {
    setModalMessage(teacherAuthMessage, "아이디와 비밀번호를 모두 입력해 주세요.", true);
    return;
  }
  if (teacherAuthSubmitBtn) {
    teacherAuthSubmitBtn.disabled = true;
    teacherAuthSubmitBtn.classList.add("is-loading");
  }
  if (teacherAuthSubmitBtnText) {
    teacherAuthSubmitBtnText.textContent = "로그인 중...";
  }
  setModalMessage(teacherAuthMessage, "로그인 정보를 확인하는 중입니다...");
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        action: "loginTeacher",
        id,
        password,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP_${response.status}`);
    }
    const result = await response.json();
    if (!result.success) {
      setModalMessage(teacherAuthMessage, result.message || "아이디 또는 비밀번호가 올바르지 않습니다.", true);
      return;
    }
    teacherSession.isLoggedIn = true;
    teacherSession.teacherId = String(result.teacherId || id).trim();
    teacherSession.teacherName = String(result.teacherName || "").trim();
    teacherSession.className = String(result.className || "").trim();
    teacherSession.forcePasswordChange = Boolean(result.forcePasswordChange);
    teacherSession.token = pickTeacherSessionTokenFromLoginResult(result);
    if (!parseClassName(teacherSession.className)) {
      teacherSession.isLoggedIn = false;
      teacherSession.teacherId = "";
      teacherSession.teacherName = "";
      teacherSession.className = "";
      teacherSession.forcePasswordChange = false;
      teacherSession.token = "";
      setModalMessage(
        teacherAuthMessage,
        "담당 학급 정보를 확인할 수 없습니다. 관리자에게 문의해 주세요.",
        true
      );
      return;
    }
    if (!teacherSession.token) {
      teacherSession.isLoggedIn = false;
      teacherSession.teacherId = "";
      teacherSession.teacherName = "";
      teacherSession.className = "";
      teacherSession.forcePasswordChange = false;
      console.warn("loginTeacher 응답에 sessionToken 없음. 응답 키:", result ? Object.keys(result) : []);
      setModalMessage(
        teacherAuthMessage,
        "로그인은 되었지만 세션 토큰(sessionToken)이 없습니다. Apps Script에서 배포를 '새 버전'으로 다시 했는지, script.js의 GOOGLE_SCRIPT_URL이 그 배포 주소와 같은지 확인해 주세요.",
        true
      );
      return;
    }
    hideTeacherLoginPanel();
    await renderTeacherDashboard();
  } catch (error) {
    console.error("submitTeacherLogin failed", error);
    setModalMessage(teacherAuthMessage, "로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", true);
  } finally {
    if (teacherAuthSubmitBtn) {
      teacherAuthSubmitBtn.disabled = false;
      teacherAuthSubmitBtn.classList.remove("is-loading");
    }
    if (teacherAuthSubmitBtnText) {
      teacherAuthSubmitBtnText.textContent = "로그인";
    }
  }
}

function updateSettingSelectionHints() {
  const key = teacherSettingsState.selectedDateKey;
  if (settingTimeSelectionHint) {
    if (!key) {
      settingTimeSelectionHint.textContent = "달력에서 날짜를 먼저 선택해 주세요.";
    } else {
      settingTimeSelectionHint.textContent = `${key}에 가능한 시간을 선택하세요.`;
    }
    settingTimeSelectionHint.hidden = false;
  }
  if (settingRemoveDateBtn) {
    const has = Boolean(key && teacherSettingsState.scheduleByDate[key]);
    settingRemoveDateBtn.hidden = !has;
  }
}

function renderSettingTimeButtons() {
  if (!settingTimeGrid) {
    return;
  }
  settingTimeGrid.innerHTML = "";
  TIME_SLOTS.forEach((time) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "slot-btn slot-btn--setting";
    button.textContent = time;
    button.dataset.time = time;
    button.addEventListener("click", () => {
      const dk = teacherSettingsState.selectedDateKey;
      if (!dk) {
        return;
      }
      if (!teacherSettingsState.scheduleByDate[dk]) {
        teacherSettingsState.scheduleByDate[dk] = new Set();
      }
      const normalized = normalizeTime(time);
      const slotSet = teacherSettingsState.scheduleByDate[dk];
      if (slotSet.has(normalized)) {
        slotSet.delete(normalized);
      } else {
        slotSet.add(normalized);
      }
      updateSettingTimeButtonState();
    });
    settingTimeGrid.appendChild(button);
  });
  updateSettingTimeButtonState();
}

function updateSettingTimeButtonState() {
  if (!settingTimeGrid) {
    return;
  }
  const dk = teacherSettingsState.selectedDateKey;
  const activeSet = dk && teacherSettingsState.scheduleByDate[dk] ? teacherSettingsState.scheduleByDate[dk] : null;
  const buttons = settingTimeGrid.querySelectorAll(".slot-btn--setting");
  buttons.forEach((button) => {
    const normalized = normalizeTime(button.dataset.time || "");
    button.disabled = !dk;
    button.classList.toggle("is-selected", Boolean(activeSet && activeSet.has(normalized)));
  });
}

function renderSettingDateChips() {
  // 날짜 선택 상태는 캘린더 셀 색상으로만 표시합니다.
}

function initializeSettingCalendar() {
  renderSettingCalendar();
}

function shiftSettingCalendarMonth(amount) {
  const cursor = settingCalendarState.monthCursor;
  settingCalendarState.monthCursor = new Date(cursor.getFullYear(), cursor.getMonth() + amount, 1);
  renderSettingCalendar();
}

function renderSettingCalendar() {
  if (!settingDateGrid || !settingCalendarMonthLabel) {
    return;
  }
  const cursor = settingCalendarState.monthCursor;
  settingCalendarMonthLabel.textContent = `${cursor.getFullYear()}년 ${cursor.getMonth() + 1}월`;
  settingDateGrid.innerHTML = "";

  const firstDay = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const startWeekday = firstDay.getDay();
  const startDate = new Date(cursor.getFullYear(), cursor.getMonth(), 1 - startWeekday);

  for (let i = 0; i < 42; i += 1) {
    const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
    const dateKey = formatDateKey(date);
    const isCurrentMonth = date.getMonth() === cursor.getMonth();
    const isConfigured = Boolean(teacherSettingsState.scheduleByDate[dateKey]);
    const isActive = teacherSettingsState.selectedDateKey === dateKey;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "setting-date-btn";
    if (!isCurrentMonth) {
      button.classList.add("is-outside");
    }
    if (isConfigured) {
      button.classList.add("is-selected");
    }
    if (isActive) {
      button.classList.add("is-active");
    }
    button.textContent = String(date.getDate());
    button.dataset.date = dateKey;
    button.addEventListener("click", () => {
      if (!teacherSettingsState.scheduleByDate[dateKey]) {
        teacherSettingsState.scheduleByDate[dateKey] = new Set();
      }
      teacherSettingsState.selectedDateKey = dateKey;
      updateSettingSelectionHints();
      renderSettingCalendar();
      updateSettingTimeButtonState();
    });
    settingDateGrid.appendChild(button);
  }
}

/** 교사계정 시트의 짧은 이름 → "OOO 선생님" (띄어쓰기 포함) */
function formatTeacherHonorific(shortName) {
  const n = String(shortName || "").trim();
  if (!n) {
    return "";
  }
  return `${n} 선생님`;
}

/** getHomeroomRoster와 동일: "2학년 1반 이왕혁 선생님" */
function formatHomeroomTeacherLine(className, shortTeacherName) {
  const cn = String(className || "").trim();
  const n = String(shortTeacherName || "").trim();
  if (!cn || !n) {
    return "";
  }
  return `${cn} ${n} 선생님`;
}

function getTeacherFromGradeClass(grade, classNumber) {
  const className = `${grade}학년 ${classNumber}반`;
  const found = homeroomTeachers.find((item) => item.className === className);
  return found ? found.teacher : "";
}

async function loadTeacherSettingsToModal() {
  if (!teacherSession.isLoggedIn) {
    if (settingTeacherInfo) {
      settingTeacherInfo.textContent = DEFAULT_SETTING_MESSAGE;
    }
    teacherSettingsState.scheduleByDate = {};
    teacherSettingsState.selectedDateKey = "";
    updateSettingSelectionHints();
    renderSettingCalendar();
    updateSettingTimeButtonState();
    return;
  }

  const className = String(teacherSession.className || "").trim();
  if (!className) {
    if (settingTeacherInfo) {
      settingTeacherInfo.textContent = DEFAULT_SETTING_MESSAGE;
    }
    return;
  }

  try {
    const response = await fetch(buildApiUrl({
      action: "getTeacherSettings",
      className,
      t: String(Date.now()),
    }));
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.message || "설정 조회 실패");
    }
    applyTeacherSettingsToModal(result);
  } catch (error) {
    console.error("loadTeacherSettingsToModal failed", error);
    if (settingApplyStart) {
      settingApplyStart.value = "";
    }
    if (settingApplyEnd) {
      settingApplyEnd.value = "";
    }
    teacherSettingsState.scheduleByDate = {};
    teacherSettingsState.selectedDateKey = "";
    updateSettingSelectionHints();
    renderSettingCalendar();
    updateSettingTimeButtonState();
    setModalMessage(teacherSettingsMessage, "설정을 불러오지 못했습니다. 다시 시도해주세요.", true);
  }
}

function applyTeacherSettingsToModal(result) {
  if (settingApplyStart) {
    settingApplyStart.value = normalizeDateValue(result.applyStart || "");
  }
  if (settingApplyEnd) {
    settingApplyEnd.value = normalizeDateValue(result.applyEnd || "");
  }
  teacherSettingsState.scheduleByDate = {};
  const fromApi = result.scheduleByDate && typeof result.scheduleByDate === "object" ? result.scheduleByDate : null;
  if (fromApi && Object.keys(fromApi).length) {
    Object.keys(fromApi).forEach((rawKey) => {
      const dk = normalizeDateValue(rawKey);
      if (!dk) {
        return;
      }
      const times = fromApi[rawKey];
      const set = new Set();
      (Array.isArray(times) ? times : []).forEach((item) => {
        const nt = normalizeTime(item);
        if (nt) {
          set.add(nt);
        }
      });
      teacherSettingsState.scheduleByDate[dk] = set;
    });
  } else {
    const dates = (result.availableDates || []).map((item) => normalizeDateValue(item)).filter(Boolean);
    const times = (result.availableTimes || []).map((item) => normalizeTime(item)).filter(Boolean);
    if (dates.length && times.length) {
      dates.forEach((d) => {
        teacherSettingsState.scheduleByDate[d] = new Set(times);
      });
    }
  }
  const sortedKeys = Object.keys(teacherSettingsState.scheduleByDate).sort();
  teacherSettingsState.selectedDateKey = sortedKeys.length ? sortedKeys[0] : "";
  if (sortedKeys.length) {
    const firstDate = sortedKeys[0];
    const parsed = new Date(`${firstDate}T00:00:00`);
    if (!Number.isNaN(parsed.getTime())) {
      settingCalendarState.monthCursor = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
    }
  }
  updateSettingSelectionHints();
  renderSettingCalendar();
  updateSettingTimeButtonState();
}

async function handleTeacherSettingsSave() {
  if (!teacherSession.isLoggedIn) {
    setModalMessage(teacherSettingsMessage, "로그인 후 저장할 수 있습니다.", true);
    return;
  }

  const parsedSessionClass = parseClassName(teacherSession.className);
  if (!parsedSessionClass) {
    setModalMessage(teacherSettingsMessage, "로그인 정보가 올바르지 않습니다. 다시 로그인해 주세요.", true);
    return;
  }
  const grade = parsedSessionClass.grade;
  const classNumber = parsedSessionClass.classNumber;
  const className = String(teacherSession.className || "").trim();
  const fromConfig = getTeacherFromGradeClass(grade, classNumber);
  const sessionName = String(teacherSession.teacherName || "").trim();
  let teacher =
    fromConfig ||
    formatHomeroomTeacherLine(className, sessionName) ||
    (sessionName ? formatTeacherHonorific(sessionName) : "");
  if (!String(teacher || "").trim()) {
    const tid = String(teacherSession.teacherId || "").trim();
    teacher = tid ? `${tid} 담임` : "담임";
  }

  const applyStart = normalizeDateValue(settingApplyStart ? settingApplyStart.value : "");
  const applyEnd = normalizeDateValue(settingApplyEnd ? settingApplyEnd.value : "");

  if (!className || !teacher) {
    setModalMessage(teacherSettingsMessage, "담당 학급 정보를 확인할 수 없습니다. 다시 로그인해 주세요.", true);
    return;
  }
  if (!applyStart || !applyEnd || applyStart > applyEnd) {
    setModalMessage(teacherSettingsMessage, "신청 가능 기간을 올바르게 입력해 주세요.", true);
    return;
  }

  const allDateKeys = Object.keys(teacherSettingsState.scheduleByDate).sort();
  if (!allDateKeys.length) {
    setModalMessage(teacherSettingsMessage, "상담 가능 일자를 1개 이상 달력에서 선택해 주세요.", true);
    return;
  }
  const scheduleByDate = {};
  let emptyTimesDate = "";
  allDateKeys.forEach((dk) => {
    const arr = Array.from(teacherSettingsState.scheduleByDate[dk] || [])
      .map((t) => normalizeTime(t))
      .filter(Boolean)
      .sort();
    if (!arr.length) {
      emptyTimesDate = dk;
    } else {
      scheduleByDate[dk] = arr;
    }
  });
  if (emptyTimesDate) {
    setModalMessage(
      teacherSettingsMessage,
      `각 상담 일자에 가능 시간을 1개 이상 지정해 주세요. (${emptyTimesDate})`,
      true
    );
    return;
  }
  const dateKeys = Object.keys(scheduleByDate).sort();

  const payload = {
    action: "saveTeacherSettings",
    grade,
    classNumber,
    className,
    teacher,
    applyStart,
    applyEnd,
    scheduleByDate,
  };

  setTeacherSettingsSaving(true);
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    const rawText = await response.text();
    let result = {};
    if (rawText) {
      try {
        result = JSON.parse(rawText);
      } catch (parseErr) {
        console.error("saveTeacherSettings JSON parse", parseErr, rawText.slice(0, 300));
        setModalMessage(
          teacherSettingsMessage,
          `서버 응답이 JSON이 아닙니다. 웹앱 배포 URL·권한(누구나)을 확인해 주세요. (HTTP ${response.status})`,
          true
        );
        return;
      }
    }
    if (!response.ok) {
      setModalMessage(
        teacherSettingsMessage,
        result.message || `저장 요청이 실패했습니다. (HTTP ${response.status})`,
        true
      );
      return;
    }
    if (!result.success) {
      setModalMessage(
        teacherSettingsMessage,
        result.message || "설정 저장에 실패했습니다.",
        true
      );
      return;
    }
    setModalMessage(teacherSettingsMessage, result.message || "설정이 저장되었습니다.");
    const cacheKey = payload.className;
    const unionTimes = [...new Set(dateKeys.flatMap((k) => scheduleByDate[k]))].sort();
    studentSettingsCache[cacheKey] = {
      success: true,
      applyStart,
      applyEnd,
      availableDates: dateKeys,
      availableTimes: unionTimes,
      scheduleByDate,
    };
    const currentClassName = String(fields.className ? fields.className.value : "").trim();
    if (currentClassName && currentClassName === cacheKey) {
      applyDateInputBySettings(studentSettingsCache[cacheKey]);
      updateSettingInfoCard(studentSettingsCache[cacheKey]);
      if (fields.date && fields.date.value) {
        await renderTimeSlotBoard({ forceFetch: true, forceSettingsReload: true });
      }
      setModalMessage(teacherSettingsMessage, "설정이 저장되었고 학생 화면에 반영되었습니다.");
    }
  } catch (error) {
    console.error("handleTeacherSettingsSave failed", error);
    const detail = error && error.message ? String(error.message).trim() : "";
    setModalMessage(
      teacherSettingsMessage,
      detail ? `설정 저장 중 오류: ${detail}` : "설정 저장 중 오류가 발생했습니다. 네트워크를 확인해 주세요.",
      true
    );
  } finally {
    setTeacherSettingsSaving(false);
  }
}

function setModalMessage(target, message, isError = false) {
  if (!target) {
    return;
  }
  target.textContent = message;
  target.classList.toggle("is-error", Boolean(isError));
}

function setTeacherSettingsSaving(isSaving) {
  if (!saveTeacherSettingsBtn) {
    return;
  }
  saveTeacherSettingsBtn.disabled = isSaving;
  saveTeacherSettingsBtn.classList.toggle("is-loading", Boolean(isSaving));
  if (saveTeacherSettingsBtnText) {
    saveTeacherSettingsBtnText.textContent = isSaving ? "설정 저장 중..." : "설정 저장";
  }
}

function collectRequestData() {
  return {
    teacher: fields.teacher ? fields.teacher.value : "",
    name: fields.name ? fields.name.value.trim() : "",
    className: fields.className ? fields.className.value : "",
    number: fields.number ? fields.number.value.trim() : "",
    date: fields.date ? fields.date.value : "",
    time: normalizeTime(fields.time ? fields.time.value : ""),
    urgency: fields.urgency ? fields.urgency.value : "",
    topic: fields.topic ? fields.topic.value : "",
    message: fields.message ? fields.message.value.trim() : "",
  };
}

function getDistinctGradesFromConfig() {
  const grades = new Set();
  homeroomTeachers.forEach((item) => {
    const matched = String(item.className || "").match(/^(\d)\s*학년/);
    if (matched) {
      grades.add(matched[1]);
    }
  });
  return Array.from(grades).sort((a, b) => Number(a) - Number(b));
}

function getClassNumbersForGrade(grade) {
  const g = String(grade || "").trim();
  if (!g) {
    return [];
  }
  const re = new RegExp(`^${g}\\s*학년\\s*(\\d{1,2})\\s*반$`);
  const nums = homeroomTeachers.map((item) => {
    const m = String(item.className || "").match(re);
    return m ? Number(m[1]) : null;
  }).filter((n) => n != null);
  return [...new Set(nums)].sort((a, b) => a - b);
}

function buildClassNameFromGradeAndClassNumber(grade, classNumber) {
  const g = String(grade || "").trim();
  const n = String(classNumber || "").trim();
  if (!g || !n) {
    return "";
  }
  return `${g}학년 ${Number(n)}반`;
}

function syncHiddenStudentClassFromSelectors() {
  if (!fields.className || !fields.grade || !fields.classNumber) {
    return;
  }
  const cn = buildClassNameFromGradeAndClassNumber(fields.grade.value, fields.classNumber.value);
  const valid = Boolean(cn && homeroomTeachers.some((item) => item.className === cn));
  fields.className.value = valid ? cn : "";
}

async function resetStep1DependentUI() {
  if (fields.teacher) {
    fields.teacher.value = "";
  }
  if (fields.time) {
    fields.time.value = "";
  }
  updateTeacherInfoCard();
  applyDateInputBySettings(null);
  updateSettingInfoCard(null);
  resetSlotBoardBeforeCheck();
  updateStepProgress();
  syncCheckAvailabilityButtonState();
}

async function applyStudentClassSelection() {
  syncHiddenStudentClassFromSelectors();
  updateTeacherByClass();
  updateTeacherInfoCard();
  if (!fields.className || !fields.className.value) {
    await resetStep1DependentUI();
    return;
  }
  if (fields.time) {
    fields.time.value = "";
  }
  const settings = await refreshStudentSettingsForCurrentClass(true);
  updateSettingInfoCard(settings);
  resetSlotBoardBeforeCheck();
  updateStepProgress();
  syncCheckAvailabilityButtonState();
}

function populateGradeSelect() {
  if (!fields.grade) {
    return;
  }
  fields.grade.innerHTML = `<option value="">학년을 선택하세요</option>`;
  getDistinctGradesFromConfig().forEach((g) => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = `${g}학년`;
    fields.grade.appendChild(opt);
  });
}

function populateClassNumberSelectForGrade(grade) {
  if (!fields.classNumber) {
    return;
  }
  const g = String(grade || "").trim();
  fields.classNumber.innerHTML = `<option value="">반을 선택하세요</option>`;
  if (!g) {
    fields.classNumber.disabled = true;
    fields.classNumber.removeAttribute("required");
    return;
  }
  getClassNumbersForGrade(g).forEach((num) => {
    const opt = document.createElement("option");
    opt.value = String(num);
    opt.textContent = `${num}반`;
    fields.classNumber.appendChild(opt);
  });
  fields.classNumber.disabled = false;
  fields.classNumber.setAttribute("required", "required");
}

function applyStoredClassNameToStep1Selectors(className) {
  const parsed = parseClassName(className);
  if (!parsed || !fields.grade || !fields.classNumber || !fields.className) {
    if (fields.grade) {
      fields.grade.value = "";
    }
    if (fields.classNumber) {
      populateClassNumberSelectForGrade("");
    }
    if (fields.className) {
      fields.className.value = "";
    }
    return;
  }
  const gr = parsed.grade;
  const num = parsed.classNumber;
  const canonical = `${gr}학년 ${Number(num)}반`;
  fields.grade.value = gr;
  populateClassNumberSelectForGrade(gr);
  fields.classNumber.value = num;
  fields.className.value = homeroomTeachers.some((item) => item.className === canonical) ? canonical : "";
  updateTeacherByClass();
  updateTeacherInfoCard();
}

function initStep1GradeClassSelectors() {
  populateGradeSelect();
  populateClassNumberSelectForGrade("");
}

function addTeacherOptions() {
  if (!fields.teacher) {
    return;
  }
  fields.teacher.innerHTML = `<option value="">학년과 반을 선택하면 자동으로 표시됩니다</option>`;
  homeroomTeachers.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.teacher;
    option.textContent = item.teacher;
    fields.teacher.appendChild(option);
  });
}

function updateTeacherByClass() {
  if (!fields.className || !fields.teacher) {
    return;
  }
  const homeroom = homeroomTeachers.find((item) => item.className === fields.className.value);
  fields.teacher.value = homeroom ? homeroom.teacher : "";
}

function updateTeacherInfoCard() {
  if (!teacherInfoCard || !teacherInfoText || !fields.teacher) {
    return;
  }
  const teacher = String(fields.teacher.value || "").trim();
  if (!teacher) {
    if (step1InfoGrid) {
      step1InfoGrid.hidden = true;
    }
    return;
  }
  teacherInfoText.textContent = `🧑‍🏫 ${teacher}`;
  if (step1InfoGrid) {
    step1InfoGrid.hidden = false;
  }
}

function settingsHasConfiguredConsultationSlots(settings) {
  if (!settings || settings.fetchFailed) {
    return false;
  }
  const sbd = settings.scheduleByDate;
  if (sbd && typeof sbd === "object") {
    const keys = Object.keys(sbd).filter((k) => Array.isArray(sbd[k]) && sbd[k].length);
    if (keys.length) {
      return true;
    }
  }
  return Boolean(
    settings.availableDates &&
      settings.availableDates.length &&
      settings.availableTimes &&
      settings.availableTimes.length
  );
}

function updateSettingInfoCard(settings) {
  if (!settingInfoCard || !settingInfoText) {
    return;
  }
  if (!fields.className || !fields.className.value) {
    settingInfoText.textContent = "📅";
    return;
  }
  if (!settings) {
    settingInfoText.textContent = "📅 상담 예약 설정 준비 중";
    return;
  }
  if (settings.fetchFailed) {
    settingInfoText.textContent = "📅 설정 확인 실패";
    return;
  }
  if (!settings.applyStart || !settings.applyEnd || !settingsHasConfiguredConsultationSlots(settings)) {
    settingInfoText.textContent = "📅 상담 예약 설정 준비 중";
    return;
  }
  settingInfoText.textContent = `📅 ${settings.applyStart} ~ ${settings.applyEnd}`;
}

function resetSlotBoardBeforeCheck() {
  if (!slotBoardGuide || !timeSlotGrid || !slotBoardTitle || !slotBoard) {
    return;
  }
  slotBoard.hidden = true;
  slotBoardTitle.textContent = "담당 선생님 상담 가능 시간";
  slotBoardGuide.textContent = "날짜를 선택하고 가능 시간 확인 버튼을 눌러 주세요.";
  if (slotBoardSummary) {
    slotBoardSummary.textContent = "";
  }
  timeSlotGrid.innerHTML = "";
}

async function refreshStudentSettingsForCurrentClass(forceReload) {
  const className = String(fields.className ? fields.className.value : "").trim();
  if (!className) {
    applyDateInputBySettings(null);
    updateSettingInfoCard(null);
    return null;
  }
  if (!forceReload && studentSettingsCache[className]) {
    applyDateInputBySettings(studentSettingsCache[className]);
    updateSettingInfoCard(studentSettingsCache[className]);
    return studentSettingsCache[className];
  }
  const parsed = parseClassName(className);
  if (!parsed) {
    applyDateInputBySettings(null);
    updateSettingInfoCard(null);
    return null;
  }
  try {
    const primaryResponse = await fetch(buildApiUrl({
      action: "getTeacherSettings",
      grade: parsed.grade,
      class: parsed.classNumber,
      t: String(Date.now()),
    }));
    if (!primaryResponse.ok) {
      throw new Error(`HTTP_${primaryResponse.status}`);
    }
    let result = await primaryResponse.json();
    if (!result.success) {
      const fallbackResponse = await fetch(buildApiUrl({
        action: "getTeacherSettings",
        className,
        t: String(Date.now()),
      }));
      if (!fallbackResponse.ok) {
        throw new Error(`HTTP_${fallbackResponse.status}`);
      }
      result = await fallbackResponse.json();
      if (!result.success) {
        throw new Error(result.message || "설정 조회 실패");
      }
    }
    const scheduleByDate = {};
    if (result.scheduleByDate && typeof result.scheduleByDate === "object") {
      Object.keys(result.scheduleByDate).forEach((rawKey) => {
        const dk = normalizeDateValue(rawKey);
        if (!dk) {
          return;
        }
        const arr = (Array.isArray(result.scheduleByDate[rawKey]) ? result.scheduleByDate[rawKey] : [])
          .map((item) => normalizeTime(item))
          .filter(Boolean)
          .sort();
        if (arr.length) {
          scheduleByDate[dk] = arr;
        }
      });
    }
    let availableDates = (result.availableDates || []).map((item) => normalizeDateValue(item)).filter(Boolean);
    let availableTimes = (result.availableTimes || []).map((item) => normalizeTime(item)).filter(Boolean);
    if (Object.keys(scheduleByDate).length) {
      availableDates = Object.keys(scheduleByDate).sort();
      const union = new Set();
      availableDates.forEach((d) => {
        (scheduleByDate[d] || []).forEach((t) => union.add(t));
      });
      availableTimes = Array.from(union).sort();
    } else if (availableDates.length && availableTimes.length) {
      availableDates.forEach((d) => {
        scheduleByDate[d] = availableTimes.slice();
      });
    }
    const normalized = {
      success: true,
      applyStart: normalizeDateValue(result.applyStart || ""),
      applyEnd: normalizeDateValue(result.applyEnd || ""),
      availableDates,
      availableTimes,
      scheduleByDate,
    };
    studentSettingsCache[className] = normalized;
    applyDateInputBySettings(normalized);
    updateSettingInfoCard(normalized);
    return normalized;
  } catch (error) {
    console.error("refreshStudentSettingsForCurrentClass failed", { className, parsed, error });
    applyDateInputBySettings(null);
    const failed = {
      success: false,
      fetchFailed: true,
      message: error && error.message ? String(error.message) : "설정 조회 실패",
      applyStart: "",
      applyEnd: "",
      availableDates: [],
      availableTimes: [],
      scheduleByDate: {},
    };
    studentSettingsCache[className] = failed;
    updateSettingInfoCard(failed);
    return failed;
  }
}

function isApplicationWindowOpen(settings) {
  if (!settings || settings.fetchFailed) {
    return false;
  }
  const start = settings.applyStart;
  const end = settings.applyEnd;
  if (!start || !end) {
    return false;
  }
  const today = formatDateKeyInSeoul(new Date());
  return today >= start && today <= end;
}

function formatConsultationOptionLabel(dateKey) {
  const parsed = new Date(`${dateKey}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return dateKey;
  }
  const weekday = parsed.toLocaleDateString("ko-KR", { weekday: "short" });
  return `${dateKey} (${weekday})`;
}

function populateConsultationDateSelect(sortedDateKeys, options = {}) {
  if (!fields.date || fields.date.tagName !== "SELECT") {
    return;
  }
  const previous = fields.date.value;
  const placeholder = options.placeholderText || CONSULTATION_DATE_PLACEHOLDER;
  fields.date.innerHTML = "";
  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = placeholder;
  fields.date.appendChild(placeholderOption);
  sortedDateKeys.forEach((key) => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = formatConsultationOptionLabel(key);
    fields.date.appendChild(opt);
  });
  if (previous && sortedDateKeys.includes(previous)) {
    fields.date.value = previous;
  }
}

function resolveAvailableDatesFromSettings(settings) {
  if (!settings || settings.fetchFailed) {
    return [];
  }
  const sbd = settings.scheduleByDate;
  if (sbd && typeof sbd === "object") {
    const keys = Object.keys(sbd)
      .map((raw) => {
        const dk = normalizeDateValue(raw);
        if (!dk || !Array.isArray(sbd[raw]) || !sbd[raw].length) {
          return "";
        }
        return dk;
      })
      .filter(Boolean);
    if (keys.length) {
      return [...new Set(keys)].sort();
    }
  }
  return [...new Set((settings.availableDates || []).map((d) => normalizeDateValue(d)).filter(Boolean))].sort();
}

function isCheckAvailabilityAllowed() {
  return Boolean(fields.date && !fields.date.disabled && fields.date.value);
}

function syncCheckAvailabilityButtonState() {
  if (!checkAvailabilityBtn) {
    return;
  }
  const isLoading = checkAvailabilityBtn.classList.contains("is-loading");
  checkAvailabilityBtn.disabled = isLoading || !isCheckAvailabilityAllowed();
}

function initializeStudentCalendarUI() {
  if (!studentCalendarToggleBtn || !studentCalendarPanel) {
    return;
  }
  studentCalendarToggleBtn.disabled = false;
  studentCalendarToggleBtn.addEventListener("click", async () => {
    const isOpen = !studentCalendarPanel.hasAttribute("hidden");
    if (isOpen) {
      studentCalendarPanel.setAttribute("hidden", "");
      studentCalendarToggleBtn.textContent = "상담 캘린더 보기";
      return;
    }
    studentCalendarToggleBtn.textContent = "캘린더 닫기";
    studentCalendarPanel.removeAttribute("hidden");
    await ensureStudentCalendarReady();
    renderStudentCalendar();
  });
  if (studentCalendarPrevMonthBtn) {
    studentCalendarPrevMonthBtn.addEventListener("click", () => {
      const c = studentCalendarState.monthCursor;
      studentCalendarState.monthCursor = new Date(c.getFullYear(), c.getMonth() - 1, 1);
      studentCalendarState.expandedDateKey = "";
      renderStudentCalendar();
    });
  }
  if (studentCalendarNextMonthBtn) {
    studentCalendarNextMonthBtn.addEventListener("click", () => {
      const c = studentCalendarState.monthCursor;
      studentCalendarState.monthCursor = new Date(c.getFullYear(), c.getMonth() + 1, 1);
      studentCalendarState.expandedDateKey = "";
      renderStudentCalendar();
    });
  }
}

async function ensureStudentCalendarReady() {
  const className = String(fields.className ? fields.className.value : "").trim();
  if (!className) {
    return;
  }
  // 설정 캐시가 없으면 로드
  if (!studentSettingsCache[className] || studentSettingsCache[className].fetchFailed) {
    await refreshStudentSettingsForCurrentClass(true);
  }
  // 현재 선택된 날짜가 설정 범위를 벗어나면 초기화
  if (fields.date && fields.date.value) {
    const valid = validateSelectedDateByTeacherSettings();
    if (!valid.valid) {
      fields.date.value = "";
      if (fields.time) {
        fields.time.value = "";
      }
    }
  }
  // 월 커서를 가능한 첫 날짜로 맞춤
  const settings = studentSettingsCache[className];
  const dates = resolveAvailableDatesFromSettings(settings);
  if (dates.length) {
    const d0 = dates[0];
    const parsed = new Date(`${d0}T00:00:00`);
    if (!Number.isNaN(parsed.getTime())) {
      studentCalendarState.monthCursor = new Date(parsed.getFullYear(), parsed.getMonth(), 1);
    }
  }
}

function studentBookedCacheKey(dateKey) {
  const teacher = String(fields.teacher ? fields.teacher.value : "").trim();
  const className = String(fields.className ? fields.className.value : "").trim();
  return `${className}__${teacher}__${dateKey}`;
}

async function getBookedTimesForStudentCalendar(dateKey) {
  const teacher = String(fields.teacher ? fields.teacher.value : "").trim();
  if (!teacher || !dateKey) {
    return new Set();
  }
  const key = studentBookedCacheKey(dateKey);
  if (studentBookedCache[key]) {
    return studentBookedCache[key];
  }
  const result = await getBookedTimesByDate(dateKey, teacher);
  const set = new Set((result.success ? result.times : []).map((t) => normalizeTime(t)).filter(Boolean));
  studentBookedCache[key] = set;
  return set;
}

function renderStudentCalendar() {
  if (!studentCalendarGrid || !studentCalendarMonthLabel || !studentCalendarToggleBtn) {
    return;
  }
  const className = String(fields.className ? fields.className.value : "").trim();
  const settings = className ? studentSettingsCache[className] : null;
  if (!settings || settings.fetchFailed || !settings.applyStart || !settings.applyEnd) {
    studentCalendarToggleBtn.disabled = true;
    if (studentCalendarHint) {
      studentCalendarHint.textContent = "먼저 STEP 01에서 학년·반을 선택해 주세요.";
    }
    return;
  }
  studentCalendarToggleBtn.disabled = false;
  const cursor = studentCalendarState.monthCursor;
  studentCalendarMonthLabel.textContent = `${cursor.getFullYear()}년 ${cursor.getMonth() + 1}월`;
  studentCalendarGrid.innerHTML = "";

  const allowedDates = resolveAvailableDatesFromSettings(settings);
  const allowedDateSet = new Set(allowedDates);
  const todayKey = formatDateKeyInSeoul(new Date());

  const firstDay = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const startWeekday = firstDay.getDay();
  const startDate = new Date(cursor.getFullYear(), cursor.getMonth(), 1 - startWeekday);

  for (let i = 0; i < 42; i += 1) {
    const d = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
    const dateKey = formatDateKey(d);
    const isCurrentMonth = d.getMonth() === cursor.getMonth();
    const isAllowed = allowedDateSet.has(dateKey) && dateKey >= todayKey && isApplicationWindowOpen(settings);
    const isSelected = studentCalendarState.expandedDateKey === dateKey;

    const cell = document.createElement("div");
    cell.className = "student-calendar-day";
    cell.dataset.date = dateKey;
    if (!isCurrentMonth) {
      cell.classList.add("is-outside");
    }
    if (!isAllowed) {
      cell.classList.add("is-disabled");
    } else {
      cell.classList.add("is-available");
    }
    if (isSelected) {
      cell.classList.add("is-selected");
    }
    const num = document.createElement("span");
    num.className = "student-calendar-day__num";
    num.textContent = String(d.getDate());
    cell.appendChild(num);

    cell.addEventListener("click", async () => {
      if (!isAllowed) {
        return;
      }
      const was = studentCalendarState.expandedDateKey === dateKey;
      studentCalendarState.expandedDateKey = was ? "" : dateKey;
      renderStudentCalendar();
      await renderStudentCalendarSlots();
    });

    studentCalendarGrid.appendChild(cell);
  }

  void renderStudentCalendarSlots();
}

async function renderStudentCalendarSlots() {
  const renderSeq = ++studentCalendarSlotsRenderSeq;
  if (!studentCalendarSlots || !studentCalendarSlotsTitle) {
    return;
  }
  const dateKey = String(studentCalendarState.expandedDateKey || "").trim();
  studentCalendarSlots.innerHTML = "";
  if (!dateKey) {
    studentCalendarSlotsTitle.textContent = "날짜를 선택해 주세요";
    return;
  }
  const className = String(fields.className ? fields.className.value : "").trim();
  const settings = className ? studentSettingsCache[className] : null;
  if (!settings) {
    return;
  }
  studentCalendarSlotsTitle.textContent = `${dateKey} 상담 가능 시간`;

  // 비동기 응답 도착 전에 다른 렌더가 시작됐다면 중단
  if (renderSeq !== studentCalendarSlotsRenderSeq) {
    return;
  }
  if (dateKey !== String(studentCalendarState.expandedDateKey || "").trim()) {
    return;
  }
  const allowedTimes = getAvailableTimesBySettings(settings, dateKey).map((t) => normalizeTime(t)).filter(Boolean);
  if (!allowedTimes.length) {
    studentCalendarSlotsTitle.textContent = `${dateKey} (가능한 시간이 없습니다)`;
    return;
  }

  const selectedDate = String(fields.date ? fields.date.value : "").trim();
  const selectedTime = normalizeTime(fields.time ? fields.time.value : "");
  const cacheKey = studentBookedCacheKey(dateKey);
  const cachedBooked = studentBookedCache[cacheKey] || null;
  if (studentCalendarHint) {
    studentCalendarHint.textContent = cachedBooked
      ? "날짜를 누르면 그 날의 상담 가능 시간이 표시됩니다."
      : "예약 현황을 불러오는 중입니다...";
  }
  const groupMap = {
    morning: [],
    lunch: [],
    after: [],
    other: [],
  };
  allowedTimes.forEach((t) => {
    const n = normalizeTime(t);
    if (!n) {
      return;
    }
    if (n <= "08:59") {
      groupMap.morning.push(n);
      return;
    }
    if (n >= "11:00" && n <= "13:59") {
      groupMap.lunch.push(n);
      return;
    }
    if (n >= "14:00") {
      groupMap.after.push(n);
      return;
    }
    groupMap.other.push(n);
  });
  const groups = [
    { title: "🌅 아침", slots: groupMap.morning },
    { title: "🍱 점심", slots: groupMap.lunch },
    { title: "🌇 방과후", slots: groupMap.after },
    { title: "🧩 기타", slots: groupMap.other },
  ];

  groups.forEach((group) => {
    const normalizedSlots = group.slots
      .map((t) => normalizeTime(t))
      .filter(Boolean);
    if (!normalizedSlots.length) {
      return;
    }
    const section = document.createElement("section");
    section.className = "student-time-group";
    const title = document.createElement("p");
    title.className = "student-time-group__title";
    title.textContent = group.title;
    section.appendChild(title);
    const slotWrap = document.createElement("div");
    slotWrap.className = "student-time-group__slots";

    normalizedSlots.forEach((t) => {
      const isPast = isPastTime(dateKey, t);
      const isBooked = cachedBooked ? cachedBooked.has(t) : false;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "student-slot-btn";
      btn.textContent = t;
      btn.dataset.time = t;
      btn.disabled = isPast || isBooked;
      if (selectedDate === dateKey && selectedTime === t) {
        btn.classList.add("is-selected");
      }
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (fields.date) {
          fields.date.value = dateKey;
        }
        if (fields.time) {
          fields.time.value = t;
        }
        if (studentCalendarSelection) {
          studentCalendarSelection.hidden = false;
          studentCalendarSelection.textContent = `선택됨: ${dateKey} ${t}`;
        }
        updateStepProgress();
        syncCheckAvailabilityButtonState();
        renderStudentCalendar();
      });
      slotWrap.appendChild(btn);
    });

    section.appendChild(slotWrap);
    studentCalendarSlots.appendChild(section);
  });

  // 캐시에 예약 정보가 없으면 백그라운드로 받아와 버튼 비활성만 갱신
  if (!cachedBooked) {
    const booked = await getBookedTimesForStudentCalendar(dateKey);
    if (renderSeq !== studentCalendarSlotsRenderSeq) {
      return;
    }
    if (dateKey !== String(studentCalendarState.expandedDateKey || "").trim()) {
      return;
    }
    const buttons = studentCalendarSlots.querySelectorAll(".student-slot-btn");
    buttons.forEach((btn) => {
      const t = normalizeTime(btn.dataset.time || "");
      const isPast = isPastTime(dateKey, t);
      const isBooked = booked.has(t);
      btn.disabled = isPast || isBooked;
    });
    if (studentCalendarHint) {
      studentCalendarHint.textContent = "날짜를 누르면 그 날의 상담 가능 시간이 표시됩니다.";
    }
  }
}

function applyDateInputBySettings(settings) {
  if (!fields.date || fields.date.tagName !== "SELECT") {
    return;
  }
  if (studentCalendarToggleBtn) {
    const usable = Boolean(
      settings &&
        !settings.fetchFailed &&
        settings.applyStart &&
        settings.applyEnd &&
        resolveAvailableDatesFromSettings(settings).length &&
        isApplicationWindowOpen(settings)
    );
    studentCalendarToggleBtn.disabled = !usable;
    if (!usable && studentCalendarPanel && !studentCalendarPanel.hasAttribute("hidden")) {
      studentCalendarPanel.setAttribute("hidden", "");
      studentCalendarToggleBtn.textContent = "상담 캘린더 보기";
    }
  }
  if (!settings || settings.fetchFailed || !settings.applyStart || !settings.applyEnd) {
    populateConsultationDateSelect([]);
    fields.date.disabled = true;
    fields.date.value = "";
    syncCheckAvailabilityButtonState();
    return;
  }
  const sortedDates = [...new Set(resolveAvailableDatesFromSettings(settings))].sort();
  const todayKey = formatDateKeyInSeoul(new Date());
  const selectableDates = sortedDates.filter((d) => d >= todayKey);

  if (!isApplicationWindowOpen(settings)) {
    populateConsultationDateSelect([], {
      placeholderText: `상담 신청 기간이 아닙니다 (${settings.applyStart} ~ ${settings.applyEnd})`,
    });
    fields.date.disabled = true;
    fields.date.value = "";
    syncCheckAvailabilityButtonState();
    return;
  }

  fields.date.disabled = false;
  if (!selectableDates.length) {
    populateConsultationDateSelect([], { placeholderText: "예약 가능한 상담 일자가 없습니다." });
    fields.date.value = "";
    syncCheckAvailabilityButtonState();
    return;
  }

  populateConsultationDateSelect(selectableDates);
  if (fields.date.value && !selectableDates.includes(fields.date.value)) {
    fields.date.value = "";
  }
  syncCheckAvailabilityButtonState();
}

function validateSelectedDateByTeacherSettings() {
  const className = String(fields.className ? fields.className.value : "").trim();
  const date = String(fields.date ? fields.date.value : "").trim();
  if (!className || !date) {
    return { valid: true };
  }
  const settings = studentSettingsCache[className];
  if (!settings) {
    return { valid: false, reason: "settings" };
  }
  if (settings.fetchFailed) {
    return { valid: false, reason: "settings" };
  }
  if (!settings.applyStart || !settings.applyEnd) {
    return { valid: false, reason: "settings" };
  }
  const allowedDates = resolveAvailableDatesFromSettings(settings);
  if (!allowedDates.length) {
    return { valid: false, reason: "settings" };
  }
  if (!isApplicationWindowOpen(settings)) {
    return { valid: false, reason: "closed" };
  }
  const normalizedDate = normalizeDateValue(date);
  if (!allowedDates.includes(normalizedDate)) {
    return { valid: false, reason: "date" };
  }
  const slotTimes = getAvailableTimesBySettings(settings, normalizedDate);
  if (!slotTimes.length) {
    return { valid: false, reason: "times" };
  }
  return { valid: true };
}

function getAvailableTimesBySettings(settings, date) {
  if (!settings) {
    return [];
  }
  const d = normalizeDateValue(date);
  if (!d) {
    return [];
  }
  const sbd = settings.scheduleByDate;
  if (sbd && typeof sbd === "object" && Object.keys(sbd).length) {
    let arr = sbd[d];
    if (!Array.isArray(arr)) {
      const rawHit = Object.keys(sbd).find((k) => normalizeDateValue(k) === d);
      arr = rawHit ? sbd[rawHit] : null;
    }
    if (!Array.isArray(arr)) {
      return [];
    }
    return arr.map((item) => normalizeTime(item)).filter(Boolean);
  }
  if (!settings.availableTimes || !settings.availableTimes.length) {
    return [];
  }
  if (settings.availableDates && settings.availableDates.length && !settings.availableDates.includes(d)) {
    return [];
  }
  return settings.availableTimes.map((item) => normalizeTime(item)).filter(Boolean);
}

function parseClassName(className) {
  const matched = String(className || "")
    .trim()
    .match(/^(\d+)\s*학년\s*(\d{1,2})\s*반$/);
  if (!matched) {
    return null;
  }
  return { grade: matched[1], classNumber: String(Number(matched[2])) };
}

async function renderTimeSlotBoard(options = {}) {
  if (!timeSlotGrid || !slotBoardGuide || !slotBoardTitle || !slotBoard) {
    return;
  }

  const teacher = fields.teacher ? fields.teacher.value : "";
  const date = fields.date ? fields.date.value : "";
  const selected = normalizeTime(fields.time ? fields.time.value : "");
  const forceFetch = Boolean(options.forceFetch);
  const forceSettingsReload = Boolean(options.forceSettingsReload);

  if (!teacher || !date) {
    slotBoardTitle.textContent = "담당 선생님 상담 가능 시간";
    slotBoardGuide.textContent = "학년·반과 날짜를 먼저 선택해 주세요.";
    if (slotBoardSummary) {
      slotBoardSummary.textContent = "";
    }
    timeSlotGrid.innerHTML = "";
    return;
  }

  if (!forceFetch) {
    slotBoardTitle.textContent = `${teacher} 상담 가능 시간`;
    slotBoardGuide.textContent = "가능 시간 확인 버튼을 눌러 최신 예약 현황을 불러오세요.";
    if (slotBoardSummary) {
      slotBoardSummary.textContent = "";
    }
    timeSlotGrid.innerHTML = "";
    return;
  }

  slotBoard.hidden = false;
  slotBoardTitle.textContent = `${teacher} 상담 가능 시간`;
  slotBoardGuide.textContent = "가능 시간을 눌러 바로 선택할 수 있어요.";

  const className = String(fields.className ? fields.className.value : "").trim();
  const settings = className ? (await refreshStudentSettingsForCurrentClass(forceSettingsReload)) : null;
  if (settings && settings.fetchFailed) {
    const detail = settings.message ? ` (${settings.message})` : "";
    slotBoardGuide.textContent = `${SETTINGS_FETCH_ERROR_MESSAGE}${detail}`;
    if (slotBoardSummary) {
      slotBoardSummary.textContent = "";
    }
    timeSlotGrid.innerHTML = "";
    return;
  }
  if (!settings || !settings.applyStart || !settings.applyEnd) {
    slotBoardGuide.textContent = "담임 선생님이 상담 예약 설정을 준비중입니다.";
    if (slotBoardSummary) {
      slotBoardSummary.textContent = "";
    }
    timeSlotGrid.innerHTML = "";
    return;
  }
  if (!isApplicationWindowOpen(settings)) {
    slotBoardGuide.textContent = "지금은 상담 신청 기간이 아닙니다.";
    if (slotBoardSummary) {
      slotBoardSummary.textContent = `신청 가능: ${settings.applyStart} ~ ${settings.applyEnd}`;
    }
    timeSlotGrid.innerHTML = "";
    return;
  }
  const normalizedPick = normalizeDateValue(date);
  const consultDates = resolveAvailableDatesFromSettings(settings);
  if (!consultDates.length || !consultDates.includes(normalizedPick)) {
    slotBoardGuide.textContent = "선택한 날짜는 상담 가능 일자가 아닙니다.";
    if (slotBoardSummary) {
      slotBoardSummary.textContent = consultDates.length ? `가능 일자: ${consultDates.join(", ")}` : "";
    }
    timeSlotGrid.innerHTML = "";
    return;
  }
  const previewSlots = getAvailableTimesBySettings(settings, normalizedPick);
  if (!previewSlots.length) {
    slotBoardGuide.textContent = "담임 선생님 쪽에 해당 날짜의 상담 가능 시간이 아직 설정되지 않았습니다.";
    if (slotBoardSummary) {
      slotBoardSummary.textContent = "";
    }
    timeSlotGrid.innerHTML = "";
    return;
  }

  const bookedResult = await getBookedTimesByDate(normalizedPick, teacher);
  if (!bookedResult.success) {
    const detail = bookedResult.message ? ` (${bookedResult.message})` : "";
    slotBoardGuide.textContent = `${BOOKED_TIMES_FETCH_ERROR_MESSAGE}${detail}`;
    if (slotBoardSummary) {
      slotBoardSummary.textContent = "";
    }
    timeSlotGrid.innerHTML = "";
    return;
  }
  const booked = new Set(bookedResult.times);
  timeSlotGrid.innerHTML = "";

  let openCount = 0;
  let bookedCount = 0;
  let pastCount = 0;

  const allowedTimes = getAvailableTimesBySettings(settings, normalizedPick);
  const groupedSlots = [
    { title: "🌅 아침", slots: ["07:30", "08:00"] },
    { title: "🍱 점심", slots: ["12:30", "13:00"] },
    { title: "🌇 방과후", slots: ["15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"] },
  ].map((group) => ({
    title: group.title,
    slots: group.slots.filter((time) => allowedTimes.includes(normalizeTime(time))),
  })).filter((group) => group.slots.length > 0);

  if (!groupedSlots.length) {
    slotBoardGuide.textContent = "상담 가능 시간이 설정되지 않았습니다.";
    if (slotBoardSummary) {
      slotBoardSummary.textContent = "";
    }
    timeSlotGrid.innerHTML = "";
    return;
  }

  groupedSlots.forEach((group) => {
    const section = document.createElement("section");
    section.className = "slot-group";
    section.innerHTML = `<p class="slot-group__title">${group.title}</p>`;

    const groupGrid = document.createElement("div");
    groupGrid.className = "slot-grid";

    group.slots.forEach((time) => {
    const normalized = normalizeTime(time);
    const isBooked = booked.has(normalized);
    const isPast = isPastTime(normalizedPick, normalized);
    const isDisabled = isBooked || isPast;
    const isSelected = selected && selected === normalized;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "slot-btn";
    button.dataset.time = normalized;

    if (isDisabled) {
      button.classList.add("is-booked");
      button.disabled = true;
      if (isPast) {
        pastCount += 1;
      } else {
        bookedCount += 1;
      }
    } else {
      button.classList.add("is-open");
      openCount += 1;
    }
    if (isSelected) {
      button.classList.add("is-selected");
    }

      button.textContent = normalized;

      if (!isDisabled) {
      button.addEventListener("click", () => {
        fields.time.value = normalized;
        updateSlotSelectionUI(normalized);
        updateStepProgress();
      });
    }

      groupGrid.appendChild(button);
    });

    section.appendChild(groupGrid);
    timeSlotGrid.appendChild(section);
  });

  if (slotBoardSummary) {
    slotBoardSummary.textContent = `${formatDateDisplayShort(normalizedPick)} 상담 가능 ${openCount}개 / 예약됨 ${bookedCount}개`;
  }

  if (openCount === 0) {
    if (pastCount === allowedTimes.length) {
      slotBoardGuide.textContent = "선택한 날짜의 시간이 모두 지났어요. 다른 날짜를 선택해 주세요.";
    } else {
      slotBoardGuide.textContent = "오늘은 예약이 모두 마감되었어요 🙂 다른 날짜를 선택해 주세요.";
    }
  }

  slotBoard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function updateSlotSelectionUI(selectedTime) {
  if (!timeSlotGrid) {
    return;
  }
  const selected = normalizeTime(selectedTime);
  const buttons = timeSlotGrid.querySelectorAll(".slot-btn");
  buttons.forEach((button) => {
    const time = normalizeTime(button.dataset.time || "");
    const isDisabled = button.disabled || button.classList.contains("is-booked");
    const shouldSelect = !isDisabled && selected && time === selected;
    button.classList.toggle("is-selected", Boolean(shouldSelect));
  });
}

function updateStepProgress() {
  const step1Done = Boolean(
    fields.grade && fields.grade.value &&
    fields.classNumber && fields.classNumber.value &&
    fields.className && fields.className.value &&
    fields.number && String(fields.number.value || "").trim() &&
    fields.name && String(fields.name.value || "").trim() &&
    fields.teacher && fields.teacher.value
  );
  const step2Done = Boolean(step1Done && fields.date && fields.date.value && fields.time && fields.time.value);
  const step3Done = Boolean(
    step2Done &&
    fields.topic && fields.topic.value &&
    fields.message && String(fields.message.value || "").trim().length > 0
  );

  setStepVisual(step1Card, step1Badge, !step1Done, step1Done);
  setStepVisual(step2Card, step2Badge, step1Done && !step2Done, step2Done);
  setStepVisual(step3Card, step3Badge, step2Done && !step3Done, step3Done);
}

function setStepVisual(card, badge, isActive, isComplete) {
  if (!card || !badge) {
    return;
  }
  card.classList.toggle("is-active", Boolean(isActive));
  card.classList.toggle("is-complete", Boolean(isComplete));
  badge.classList.toggle("is-complete", Boolean(isComplete));
  const defaultNumber = badge.id === "step1Badge" ? "1" : badge.id === "step2Badge" ? "2" : "3";
  badge.textContent = isComplete ? "✓" : defaultNumber;
}

async function getBookedTimesByDate(date, teacher) {
  if (!date || !teacher) {
    return { success: false, times: [], message: "date 또는 teacher 값이 비어 있습니다." };
  }
  try {
    const response = await fetch(buildApiUrl({
      action: "getBookedSlots",
      date,
      teacher,
      t: String(Date.now()),
    }));
    if (!response.ok) {
      throw new Error(`HTTP_${response.status}`);
    }
    const result = await response.json();
    if (!result.success || !Array.isArray(result.bookedTimes)) {
      console.error("getBookedSlots invalid response", result);
      return {
        success: false,
        times: [],
        message: result && result.message ? String(result.message) : "응답 형식이 올바르지 않습니다.",
      };
    }
    return {
      success: true,
      times: result.bookedTimes.map((time) => normalizeTime(time)).filter(Boolean),
      message: "",
    };
  } catch (error) {
    console.error("getBookedSlots fetch failed", { date, teacher, error });
    return { success: false, times: [], message: error && error.message ? String(error.message) : "요청 실패" };
  }
}

function buildApiUrl(params) {
  const url = new URL(GOOGLE_SCRIPT_URL);
  Object.keys(params || {}).forEach((key) => {
    const value = params[key];
    if (value === undefined || value === null || value === "") {
      return;
    }
    url.searchParams.set(key, String(value));
  });
  return url.toString();
}

async function isTimeBlocked(date, time, teacher) {
  if (!date || !time || !teacher) {
    return false;
  }
  const bookedResult = await getBookedTimesByDate(date, teacher);
  if (!bookedResult.success) {
    console.error("isTimeBlocked could not verify booked slots", { date, teacher, time });
    return null;
  }
  return bookedResult.times.includes(normalizeTime(time)) || isPastTime(date, time);
}

async function sendToGoogleSheets(requestData) {
  if (GOOGLE_SCRIPT_URL === "여기에_웹앱_URL_입력") {
    throw new Error("Google Apps Script URL을 입력해주세요.");
  }
  const response = await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(requestData),
  });
  if (!response.ok) {
    throw new Error(`HTTP_${response.status}`);
  }
  return response.json();
}

function restoreFrequentFields(requestData) {
  applyStoredClassNameToStep1Selectors(requestData.className || "");
  if (fields.teacher) {
    fields.teacher.value = requestData.teacher || "";
  }
  const restoredClass = String(fields.className ? fields.className.value : "").trim();
  if (restoredClass && studentSettingsCache[restoredClass]) {
    applyDateInputBySettings(studentSettingsCache[restoredClass]);
  } else {
    applyDateInputBySettings(null);
  }
  if (fields.date && requestData.date) {
    const hasOption = Array.from(fields.date.options).some((opt) => opt.value === requestData.date);
    fields.date.value = hasOption ? requestData.date : "";
  }
  if (fields.name) {
    fields.name.value = requestData.name || "";
  }
  if (fields.number) {
    fields.number.value = requestData.number || "";
  }
  if (fields.time) {
    fields.time.value = "";
  }
  if (fields.message) {
    fields.message.value = "";
  }
  updateTeacherInfoCard();
  const className = String(fields.className ? fields.className.value : "").trim();
  updateSettingInfoCard(className ? (studentSettingsCache[className] || null) : null);
}

function setDefaultUrgency() {
  if (fields.urgency) {
    fields.urgency.value = "보통";
  }
}

function setSchoolName() {
  const schoolName = CONFIG.schoolName || "우리 학교";
  document.title = `${schoolName} 티쳐톡`;
  if (heroSchoolName) {
    heroSchoolName.textContent = schoolName;
  }
}

function initMessageCounter() {
  if (!fields.message || !messageCounter) {
    return;
  }
  fields.message.addEventListener("input", updateMessageCounter);
  updateMessageCounter();
}

function updateMessageCounter() {
  if (!fields.message || !messageCounter) {
    return;
  }
  const maxLength = Number(fields.message.getAttribute("maxlength")) || 500;
  messageCounter.textContent = `${fields.message.value.length}/${maxLength}`;
}

function setSubmitting(isSubmitting) {
  const label = isSubmitting ? "접수 중..." : "상담 신청하기";
  if (submitButtonPrimary) {
    submitButtonPrimary.disabled = isSubmitting;
    const labelSpan = submitButtonPrimary.querySelector("span:last-child");
    if (labelSpan) {
      labelSpan.textContent = label;
    }
  }
}

function showMessage(message, isError = false) {
  submitMessages.forEach((node) => {
    node.textContent = message;
    node.classList.toggle("is-error", isError);
  });
}

function isPastTime(dateKey, timeValue) {
  if (!dateKey || !timeValue) {
    return false;
  }
  const normalized = normalizeTime(timeValue);
  const slotInstant = new Date(`${dateKey}T${normalized}:00+09:00`);
  if (Number.isNaN(slotInstant.getTime())) {
    return false;
  }
  return slotInstant.getTime() < Date.now();
}

/** 서버(Code.gs)의 Asia/Seoul과 같은 날짜 키 — 브라우저 타임존과 무관하게 신청 기간·일자 필터를 맞춤 */
function formatDateKeyInSeoul(date) {
  const d = date instanceof Date && !Number.isNaN(date.getTime()) ? date : new Date();
  try {
    const s = new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(d);
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) {
      return s;
    }
  } catch (_err) {
    /* Intl 미지원 */
  }
  return formatDateKey(d);
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateDisplayShort(dateKey) {
  const parsed = new Date(`${dateKey}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return dateKey;
  }
  return `${parsed.getMonth() + 1}월 ${parsed.getDate()}일`;
}

function setAvailabilityLoading(isLoading) {
  if (!checkAvailabilityBtn) {
    return;
  }
  checkAvailabilityBtn.classList.toggle("is-loading", isLoading);
  checkAvailabilityBtn.disabled = isLoading || !isCheckAvailabilityAllowed();
  if (checkAvailabilityBtnText) {
    checkAvailabilityBtnText.textContent = isLoading ? "시간 확인 중..." : "시간 확인";
  }
}

function normalizeTime(value) {
  const text = String(value || "").trim();
  if (!text) {
    return "";
  }
  const matched = text.match(/^(\d{1,2}):(\d{1,2})(?::\d{1,2})?$/);
  if (matched) {
    return `${String(Number(matched[1])).padStart(2, "0")}:${String(Number(matched[2])).padStart(2, "0")}`;
  }
  const date = new Date(text);
  if (!Number.isNaN(date.getTime())) {
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  }
  return text;
}

function normalizeDateValue(value) {
  const text = String(value || "").trim();
  if (!text) {
    return "";
  }
  const matched = text.replace(/\s+/g, "").match(/^(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})\.?$/);
  if (matched) {
    return `${matched[1]}-${String(Number(matched[2])).padStart(2, "0")}-${String(Number(matched[3])).padStart(2, "0")}`;
  }
  const date = new Date(text);
  if (!Number.isNaN(date.getTime())) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }
  return "";
}

function getSchoolConfig() {
  const defaultConfig = { schoolName: "우리 학교", classes: [] };
  if (typeof SCHOOL_CONFIG === "undefined" || !SCHOOL_CONFIG) {
    return defaultConfig;
  }
  const rawClasses = Array.isArray(SCHOOL_CONFIG.classes) ? SCHOOL_CONFIG.classes : [];
  const safeClasses = rawClasses
    .map((item) => ({
      className: String(item && item.className ? item.className : "").trim(),
      teacher: String(item && item.teacher ? item.teacher : "").trim(),
    }))
    .filter((item) => item.className && item.teacher);
  const schoolName = String(SCHOOL_CONFIG.schoolName || defaultConfig.schoolName).trim() || defaultConfig.schoolName;
  return { schoolName, classes: safeClasses };
}
