/* eslint-disable consistent-return */
import airtableApi from "./api";
import airtableConfig from "./config";

/* eslint-disable import/prefer-default-export */
export const createEarlyAccessEntry = async (data: any) => {
  try {
    const tableId = airtableConfig.tables.earlyAccess.id;
    const { fields } = airtableConfig.tables.earlyAccess;
    const url = `${airtableConfig.base}/${tableId}`;

    const cleanData = {};

    Object.keys(fields).forEach((field) => {
      // @ts-ignore
      cleanData[fields[field]] = data[field];
    });

    const res = await airtableApi.post(url, {
      records: [{ fields: cleanData }],
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const checkEmailExists = async (email: string) => {
  const tableId = airtableConfig.tables.earlyAccess.id;
  const { fields } = airtableConfig.tables.earlyAccess;
  const url = `${
    airtableConfig.base
  }/${tableId}?filterByFormula=${encodeURIComponent(
    `{Email Address} = "${email}"`
  )}&returnFieldsByFieldId=true`;

  const res = await airtableApi.get(url);

  return res.data.records.some(
    (record: any) => record.fields[fields.email] === email
  );
};
