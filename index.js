function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(employee => {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(timeIn) {
    let [date, hour] = timeIn.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this;
}

function createTimeOutEvent(timeOut) {
    let [date, hour] = timeOut.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this;
}

function hoursWorkedOnDate(date) {
    let inTime = this.timeInEvents.find(i => {
        return i.date === date;
    })

    let outTime = this.timeOutEvents.find(i => {
        return i.date === date;
    })
    let hoursWorked = outTime.hour - inTime.hour;
    return hoursWorked / 100;
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

function calculatePayroll(array) {
    return array.reduce(function(amount, record) {
        return amount + allWagesFor.call(record);
        }, 0)
}

function findEmployeeByFirstName(records, name) {
    return records.find(firstName => name);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

