function process(record, ctx, logger, next) {
  record.profile = {
    firstName: record.Name,
    lastName: record.LastName,
    languages: record.Language,
    country: record.Country
  };

  record.data = {
    addSource: record.Source
  };
  record.data.email = {};
  record.data.email.garage = {};
  record.data.email.dynamite = {};

  if (record.data.email.garage.isOptedIn || record.isGarage) {
    record.data.email.garage.isOptedIn = true;
  } else {
    record.data.email.garage.isOptedIn = false;
  }
  if (record.data.email.dynamite.isOptedIn || record.isDynamite) {
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
  record.isActive = true;
  record.profile.email = record.Email;
  record.addLoginEmails = record.Email;

  logger.debug("handle.existing.records", "Updated Record", record);


  return record;
}