import dayjs from 'dayjs';

console.log(dayjs()
.format('YYYY.MM.DD A hh:mm')
.replace('AM', '오전')
.replace('PM', '오후')
.toString());
