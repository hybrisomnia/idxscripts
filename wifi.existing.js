function process(record, ctx, logger, next) {

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
    zipcode: record.ZIP_CODE,
    country: record.profile.country,
    phone: record.Phone_Number,
    addressOne: record.ADDRESS,
    city: record.CITY,
    state: record.STATE
  };
  if (!record.profile.country && record.Country) {
    record.profile.country = record.Country;
  }
  if (!record.profile.languages && record.Language) {
    record.profile.languages = record.Language;
  }

  record.data.locale = record.profile.languages.toLowerCase() + ' ' + record.profile.country;
  record.isActive = true;
  record.profile.email = record.Email;
  record.addLoginEmails = record.Email;

  logger.debug("handle.existing.records", "Updated Record", record);


  return record;
}