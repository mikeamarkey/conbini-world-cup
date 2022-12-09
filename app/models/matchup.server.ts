const BASE_URL = 'https://api.airtable.com/v0/appy4ar57OXD2UHpz';
const MATCHUPS_ID = 'tblbPELOSCf0HguCJ';

export async function getMatchups({
  airtableToken,
}: {
  airtableToken: unknown;
}) {
  const matchupsResponse = await fetch(`${BASE_URL}/${MATCHUPS_ID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${airtableToken}`,
    },
  });
  const matchups = (await matchupsResponse.json()) as { records: any[] };
  return matchups.records;
}
