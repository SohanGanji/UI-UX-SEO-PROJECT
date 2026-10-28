/**
 * LensBasket — calendar.js
 * Availability calendar with date-range selection and live price breakdown.
 */

class AvailabilityCalendar {
  /**
   * @param {HTMLElement|string} containerEl - Container element or element ID to render calendar into.
   * @param {Object} options
   * @param {string[]} options.unavailableDates - Array of 'YYYY-MM-DD' strings.
   * @param {number} options.dayRate - Price per day (₹).
   * @param {number} options.threeDayRate - Price per 3 days (₹).
   * @param {number} options.weeklyRate - Price per 7 days (₹).
   * @param {number} options.depositAmount - Refundable deposit (₹).
   */
  constructor(containerEl, options = {}) {
    this.container = typeof containerEl === 'string' ? document.getElementById(containerEl) : containerEl;
    if (!this.container) {
      console.error('AvailabilityCalendar: container element not found.');
      return;
    }

    this.unavailableDates = new Set(options.unavailableDates || []);
    this.dayRate = options.dayRate || 1299;
    this.threeDayRate = options.threeDayRate || 2999;
    this.weeklyRate = options.weeklyRate || 6499;
    this.depositAmount = options.depositAmount || 2000;

    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);

    this.viewYear = this.today.getFullYear();
    this.viewMonth = this.today.getMonth();

    this.startDate = null;
    this.endDate = null;
    this.selecting = false; // true = waiting for end date

    this.render();
  }

  /**
   * Format a Date to 'YYYY-MM-DD'.
   * @param {Date} d
   * @returns {string}
   */
  formatDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  /**
   * Parse 'YYYY-MM-DD' to a local Date (no timezone shift).
   * @param {string} str
   * @returns {Date}
   */
  parseDate(str) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  /**
   * Get month name for display.
   * @param {number} year
   * @param {number} month - 0-indexed.
   * @returns {string}
   */
  getMonthLabel(year, month) {
    return new Date(year, month, 1).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  }

  /**
   * Render the full calendar into container.
   */
  render() {
    this.container.innerHTML = '';
    const cal = document.createElement('div');
    cal.className = 'calendar';

    // Header
    const header = document.createElement('div');
    header.className = 'calendar__header';
    header.innerHTML = `
      <button class="calendar__nav" id="cal-prev" aria-label="Previous month">&#8249;</button>
      <span class="calendar__title font-headline-sm text-headline-sm text-ink">${this.getMonthLabel(this.viewYear, this.viewMonth)}</span>
      <button class="calendar__nav" id="cal-next" aria-label="Next month">&#8250;</button>
    `;
    cal.appendChild(header);

    // Weekday labels
    const weekdays = document.createElement('div');
    weekdays.className = 'calendar__weekdays';
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(d => {
      const el = document.createElement('div');
      el.className = 'calendar__weekday';
      el.textContent = d;
      weekdays.appendChild(el);
    });
    cal.appendChild(weekdays);

    // Days grid
    const grid = document.createElement('div');
    grid.className = 'calendar__days';

    const firstDay = new Date(this.viewYear, this.viewMonth, 1).getDay();
    const daysInMonth = new Date(this.viewYear, this.viewMonth + 1, 0).getDate();

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      const empty = document.createElement('div');
      empty.className = 'day day--empty';
      grid.appendChild(empty);
    }

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(this.viewYear, this.viewMonth, d);
      const dateStr = this.formatDate(date);
      const cell = document.createElement('div');
      cell.className = 'day';
      cell.textContent = d;
      cell.dataset.date = dateStr;

      const isPast = date < this.today;
      const isUnavailable = this.unavailableDates.has(dateStr);
      const isToday = dateStr === this.formatDate(this.today);

      if (isPast) {
        cell.classList.add('day--past');
      } else if (isUnavailable) {
        cell.classList.add('day--unavailable');
        cell.title = 'Unavailable / Already Booked';
      } else {
        cell.classList.add('day--available');
        cell.addEventListener('click', () => this.onDayClick(date, dateStr));
      }

      if (isToday) cell.classList.add('day--today');

      // Highlight selected range
      this.applyRangeClass(cell, date, dateStr);

      grid.appendChild(cell);
    }

    cal.appendChild(grid);
    this.container.appendChild(cal);

    // Nav listeners
    this.container.querySelector('#cal-prev').addEventListener('click', () => this.prevMonth());
    this.container.querySelector('#cal-next').addEventListener('click', () => this.nextMonth());

    // Update price summary if range is set
    if (this.startDate && this.endDate) {
      this.updatePriceSummary();
    }
  }

  /**
   * Apply CSS range classes to a day cell.
   * @param {HTMLElement} cell
   * @param {Date} date
   * @param {string} dateStr
   */
  applyRangeClass(cell, date, dateStr) {
    if (!this.startDate) return;

    const startStr = this.formatDate(this.startDate);
    const endStr = this.endDate ? this.formatDate(this.endDate) : null;

    if (dateStr === startStr) {
      cell.classList.add('day--selected-start');
    }
    if (endStr && dateStr === endStr) {
      cell.classList.add('day--selected-end');
    }
    if (endStr && date > this.startDate && date < this.endDate) {
      cell.classList.add('day--in-range');
    }
  }

  /**
   * Handle a day cell click.
   * @param {Date} date
   * @param {string} dateStr
   */
  onDayClick(date, dateStr) {
    if (!this.selecting) {
      // First click: set start date & default 1 day
      this.startDate = date;
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      this.endDate = nextDay;
      this.selecting = true;
      this.updatePriceSummary();
    } else {
      // Second click: set end date
      if (date < this.startDate) {
        // Earlier date clicked -> reset start date
        this.startDate = date;
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        this.endDate = nextDay;
        this.updatePriceSummary();
      } else if (date.getTime() === this.startDate.getTime()) {
        // Same date clicked -> 1 day rental
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        this.endDate = nextDay;
        this.selecting = false;
        this.updatePriceSummary();
      } else {
        // Verify no unavailable date in range
        const rangeOk = this.isRangeValid(this.startDate, date);
        if (!rangeOk) {
          this.showRangeError();
          return;
        }
        this.endDate = date;
        this.selecting = false;
        this.updatePriceSummary();
      }
    }
    this.render();
  }

  /**
   * Check if a date range contains any unavailable dates.
   * @param {Date} start
   * @param {Date} end
   * @returns {boolean}
   */
  isRangeValid(start, end) {
    const cur = new Date(start);
    cur.setDate(cur.getDate() + 1);
    while (cur <= end) {
      if (this.unavailableDates.has(this.formatDate(cur))) return false;
      cur.setDate(cur.getDate() + 1);
    }
    return true;
  }

  /**
   * Show an error when the range contains unavailable dates.
   */
  showRangeError() {
    const summary = document.getElementById('price-summary');
    if (summary) {
      summary.classList.remove('hidden');
      summary.innerHTML = `<p class="text-accent font-body-sm font-semibold">⚠ Selected range includes booked dates. Please pick another date range.</p>`;
    }
    this.startDate = null;
    this.endDate = null;
    this.selecting = false;
    this.render();
  }

  /**
   * Calculate rental cost based on number of days.
   * @param {number} days
   * @returns {{ rateLabel: string, total: number }}
   */
  calculateCost(days) {
    if (days >= 7) {
      const weeks = Math.floor(days / 7);
      const remainder = days % 7;
      const total = (weeks * this.weeklyRate) + (remainder * this.dayRate);
      return { rateLabel: `${weeks} week(s) @ ₹${this.weeklyRate.toLocaleString('en-IN')}${remainder > 0 ? ` + ${remainder}d @ ₹${this.dayRate}` : ''}`, total };
    } else if (days >= 3) {
      const threes = Math.floor(days / 3);
      const remainder = days % 3;
      const total = (threes * this.threeDayRate) + (remainder * this.dayRate);
      return { rateLabel: `${threes} × 3-day pack @ ₹${this.threeDayRate.toLocaleString('en-IN')}${remainder > 0 ? ` + ${remainder}d @ ₹${this.dayRate}` : ''}`, total };
    } else {
      return { rateLabel: `${days} day${days > 1 ? 's' : ''} × ₹${this.dayRate.toLocaleString('en-IN')}`, total: days * this.dayRate };
    }
  }

  /**
   * Update the price summary UI element
   */
  updatePriceSummary() {
    const summary = document.getElementById('price-summary');
    if (!summary || !this.startDate) return;

    const msPerDay = 1000 * 60 * 60 * 24;
    let days = 1;
    if (this.endDate) {
      days = Math.max(1, Math.round((this.endDate - this.startDate) / msPerDay));
    }

    const { rateLabel, total } = this.calculateCost(days);
    const grandTotal = total + this.depositAmount;

    summary.classList.remove('hidden');
    summary.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <span class="font-body-sm text-body-sm text-secondary font-medium">${rateLabel}</span>
        <span class="font-headline-sm text-headline-sm text-ink font-bold">₹${total.toLocaleString('en-IN')}</span>
      </div>
      <div class="flex items-center justify-between mb-2">
        <span class="font-body-sm text-body-sm text-secondary">Refundable Security Deposit</span>
        <span class="font-body-sm text-body-sm text-ink font-bold">₹${this.depositAmount.toLocaleString('en-IN')}</span>
      </div>
      <div class="flex items-center justify-between pt-2 border-t border-ink/20">
        <span class="font-label-lg text-label-lg text-ink font-bold">Total Payable</span>
        <span class="font-headline-sm text-headline-sm text-accent font-bold">₹${grandTotal.toLocaleString('en-IN')}</span>
      </div>
      <div class="mt-2.5 p-2 rounded-lg bg-soft-tint border border-ink/20 flex items-center justify-between text-xs text-ink font-semibold">
        <span>Dates: ${this.formatDate(this.startDate)} → ${this.formatDate(this.endDate || this.startDate)}</span>
        <span class="px-2 py-0.5 rounded bg-white border border-ink/30 text-accent font-bold">${days} ${days === 1 ? 'day' : 'days'}</span>
      </div>
      <p class="font-label-sm text-label-sm text-secondary mt-2">* ₹2,000 deposit is fully refunded within 24 hours of gear return.</p>
    `;

    // Store chosen dates into window state for easy add-to-cart
    window.selectedRentalDates = {
      startDate: this.formatDate(this.startDate),
      endDate: this.formatDate(this.endDate || this.startDate),
      days: days,
      rentalTotal: total,
      deposit: this.depositAmount,
      grandTotal: grandTotal
    };

    const lensApp = window.LensBasket || window.LensLoan;
    if (lensApp && typeof lensApp.saveRentalDates === 'function') {
      lensApp.saveRentalDates({
        startDate: this.formatDate(this.startDate),
        endDate: this.formatDate(this.endDate || this.startDate),
        days: days
      });
    }

    // Dispatch global event so page can update buttons and tier highlights
    window.dispatchEvent(new CustomEvent('rentalDatesChanged', {
      detail: {
        startDate: this.formatDate(this.startDate),
        endDate: this.formatDate(this.endDate || this.startDate),
        days: days,
        rentalTotal: total,
        deposit: this.depositAmount,
        grandTotal: grandTotal
      }
    }));
  }

  prevMonth() {
    if (this.viewMonth === 0) {
      this.viewMonth = 11;
      this.viewYear--;
    } else {
      this.viewMonth--;
    }
    this.render();
  }

  nextMonth() {
    if (this.viewMonth === 11) {
      this.viewMonth = 0;
      this.viewYear++;
    } else {
      this.viewMonth++;
    }
    this.render();
  }
}

// Expose globally
window.AvailabilityCalendar = AvailabilityCalendar;
