const checkException = (inputText, errorMessage) => {
  if (!inputText.trim()) {
    return errorMessage;
  }
  if (/[@#$%^&*(),.?":{}|<>]/g.test(inputText)) {
    return '특수문자는 입력할 수 없습니다';
  }
  return null;
};

export default checkException;
