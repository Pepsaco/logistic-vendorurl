import moment from 'moment'

export default {
    install(app) {
      app.config.globalProperties.$format_date = (value) => {
        if (value) {
            return moment(String(value)).format("dddd, MMMM Do YYYY, h:mm:ss a")
        }
      };
      app.config.globalProperties.$format_date_two = (value) => {
        if (value) {
            return moment(String(value)).format("MMMM Do YYYY, h:mm a")
        }
      };

      app.config.globalProperties.$NumbersOnly = (evt) => {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
            evt.preventDefault();pwallet__account_number.value = ''
        } else {
            return true;
        }
      };

      app.config.globalProperties.$formatPrice = (value) => {
        var formatter = new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2
        });
        return formatter.format(value);
      };

      app.config.globalProperties.$formatAmount = (event) => {
        let input = event.target;
        let cursorPosition = input.selectionStart; // Save cursor position
        let rawValue = input.value.replace(/,/g, "").replace(/[^0-9.]/g, ""); // Remove non-numeric characters except "."
    
        if (rawValue === "") {
            pwallet__transfer_amount.value = "";
            return;
        }
    
        let [integer, decimal] = rawValue.split(".");
        integer = parseInt(integer || "0", 10).toLocaleString("en-US"); // Format integer part with commas
        
        if (decimal !== undefined) {
            decimal = decimal.slice(0, 2); // Limit decimal places to 2
            pwallet__transfer_amount.value = `${integer}.${decimal}`;
        } else {
            pwallet__transfer_amount.value = `${integer}`; // No decimal yet
        }
    
        // Restore cursor position
        setTimeout(() => {
            input.setSelectionRange(cursorPosition, cursorPosition);
        }, 0);
      };

      app.config.globalProperties.$getRandomNumber = (digit) => {
        return Math.random().toFixed(digit).split('.')[1];
      };
    },
  };