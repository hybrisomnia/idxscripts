function process(record, ctx, logger, next) {

  record.UID = uuidv4();

  record.profile = {
    firstName: record.Name,
    lastName: record.LastName,
    languages: record.Language,
    country: record.Country
  };

  if (record.Gender) {
    record.profile.gender = record.Gender;
  }

  if (record.BIRTHDAY) {
    var yr = record.BIRTHDAY.split('/')[2];
    record.profile.birthYear = yr;
    record.profile.birthMonth = record.BIRTHDAY.split('/')[1];
    record.profile.birthDay = record.BIRTHDAY.split('/')[0];
  }

  record.data = {
    addSource: record.Source
  };

  record.data.email = {};
  record.data.email.garage = {};
  record.data.email.dynamite = {};

  if (record.GarageOptInDate) {
    record.data.email.garage.dateJoined = convertDateToISO8601(record.GarageOptInDate);
  }
  if (record.DynamiteOptInDate) {
    record.data.email.dynamite.dateJoined = convertDateToISO8601(record.DynamiteOptInDate);
  }

  if (record.isGarage) {
    record.data.email.garage.isOptedIn = true;
  } else {
    record.data.email.garage.isOptedIn = false;
  }
  if (record.isDynamite) {
    record.data.email.dynamite.isOptedIn = true;
  } else {
    record.data.email.dynamite.isOptedIn = false;
  }
  record.data.addresses = {
    zipcode: String(record.ZIP_CODE),
    country: record.profile.country,
    phone: String(record.Phone_Number),
    addressOne: record.ADDRESS,
    city: record.CITY,
    state: record.STATE
  };

  record.data.locale = record.profile.languages.toLowerCase() + ' ' + record.profile.country;
  record.profile.email = record.Email;

  logger.debug("handle.new.records", "New Record", record);
  return record;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function convertDateToISO8601(strDate) {
  if (strDate) {
    if (strDate.indexOf("T") !== -1) {
      return strDate;
    } else {
      var dateParts = strDate.split(" ");
      var datePart = dateParts[0];

      var date = datePart.split("/");
      var yearValue = parseInt(date[2], 10);
      if (yearValue.toString().length === 2) {
        yearValue = "20" + yearValue;
      }

      var monthValue = parseInt(date[1], 10) - 1;
      var dayValue = parseInt(date[0], 10);
      var ampm = dateParts[2];
      var toAdd = ampm === "PM" ? 12 : 0;

      var timePart = dateParts[1];
      var time = timePart.split(":");

      var secondValue = time[2];
      if (!secondValue) {
        secondValue = 0;
      }

      var hourValue = parseInt(time[0], 10) + toAdd;
      var minuteValue = parseInt(time[1], 10);

      var mydate = new Date(yearValue, monthValue, dayValue, hourValue, minuteValue, secondValue, 0);
      return mydate.toISOString();
    }

  }
}