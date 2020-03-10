class Calendar {
  static MONTHS = [
    { name: 'January', abbrev: 'JAN' },
    { name: 'February', abbrev: 'FEB' },
    { name: 'March', abbrev: 'MAR' },
    { name: 'April', abbrev: 'APR' },
    { name: 'May', abbrev: 'MAY' },
    { name: 'June', abbrev: 'JUN' },
    { name: 'July', abbrev: 'JUL' },
    { name: 'August', abbrev: 'AUG' },
    { name: 'September', abbrev: 'SEPT' },
    { name: 'October', abbrev: 'OCT' },
    { name: 'November', abbrev: 'NOV' },
    { name: 'December', abbrev: 'DEC' }
  ];

  constructor (now = new Date()) {
    this.date = now;
  }

  getMonthName = () => {
    const month = this.date.getMonth();
    return Calendar.MONTHS[month].name;
  }

  getFirstDayOfMonth = () => {
    // returns the day of the week that the month starts on, from 0-6
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    const dayIndex = new Date(year, month, 1).getDay();
    return dayIndex;
  }

  getDaysInMonth = () => {
    // returns the number of days in the month
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    return lastDayOfMonth;
  }

  onNextClick = () => {
    this.date = new Date(this.date.setMonth(this.date.getMonth() + 1));
    this.renderCalendar();
  }

  onPrevClick = () => {
    this.date = new Date(this.date.setMonth(this.date.getMonth() - 1));
    this.renderCalendar();
  }

  clearCalendarElements = () => {
    const calendarEl = document.getElementById('calendar-days');
    while (calendarEl.firstChild) {
      calendarEl.removeChild(calendarEl.firstChild);
    }
  }

  renderMonthAndYear = () => {
    const monthName = this.getMonthName();
    const year = this.date.getFullYear();
    document.getElementById('month-year').innerHTML = monthName + ' ' + year;
  }

  isWeekend = (day) => {
    const year = this.date.getFullYear();
    const month = this.date.getMonth();
    const dayIndex = new Date(year, month, day).getDay();
    return dayIndex === 0 || dayIndex === 6;
  }

  renderDays = () => {
    const calendarDaysEl = document.getElementById('calendar-days');
    const firstDay = this.getFirstDayOfMonth();

    // add blank days
    let numOfBlankDays = 0;
    while (numOfBlankDays < firstDay) {
      calendarDaysEl.appendChild(document.createElement('div'));
      numOfBlankDays += 1;
    }

    // render days of the month
    const daysInMonth = this.getDaysInMonth();

    let dayOfMonth = 1;
    while (dayOfMonth <= daysInMonth) {
      let day = document.createElement('div');
      day.classList.add('day');

      // if day is a weekend, add special CSS class
      this.isWeekend(dayOfMonth) && day.classList.add('weekend-day');
      day.innerHTML = dayOfMonth;
      calendarDaysEl.appendChild(day);

      dayOfMonth += 1;
    }
  }

  renderCalendar = () => {
    this.renderMonthAndYear();

    // clear calendar of all child nodes before adding new ones
    this.clearCalendarElements();
    this.renderDays();
  }

}


window.addEventListener('DOMContentLoaded', (event) => {
  const calendar = new Calendar();
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  nextBtn.addEventListener('click', calendar.onNextClick);
  prevBtn.addEventListener('click', calendar.onPrevClick);
  calendar.renderCalendar();
});
