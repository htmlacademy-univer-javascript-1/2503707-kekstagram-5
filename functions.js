/* eslint-disable no-unused-vars */
function checkLength (str, maxLength) {
  return str.length <= maxLength;
}


function isPalindrome (str) {
  const NORMAL_STR = str.replaceAll().toLowerCase();

  let reverseStr = '';

  for (let i = NORMAL_STR.length - 1; i >= 0; i--) {
    reverseStr += NORMAL_STR[i];
  }

  return reverseStr === NORMAL_STR;
}


function extractNumber (input) {
  const STR = input.toString();
  let result = '';

  for (const char of STR) {
    if (!Number.isNaN(parseInt(char, 10))) {
      result += char;
    }
  }

  if (result.length > 0) {
    return parseInt(result, 10);
  }
  return NaN;
}


function IsInWorkingHours(startOfDay, endOfDay,startOfMeeting, meetingDuration) {
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':'.map(Number));
    return hours * 60 + minutes;
  };

  const startDay = timeToMinutes(startOfDay);
  const endDay = timeToMinutes(endOfDay);
  const startMeeting = timeToMinutes(startOfMeeting);
  const endMeeting = startMeeting + meetingDuration;

  return startMeeting >= startDay && endMeeting <= endDay;
}
