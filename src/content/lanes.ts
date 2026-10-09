/**
 * Approximate highway distances from Morrisville, PA. Geography, not a
 * promise of service or transit time; shown on the homepage "departure board".
 */
export type Lane = {
  city: string;
  state: string;
  miles: number;
  route: string;
};

export const lanes: Lane[] = [
  { city: "Philadelphia", state: "PA", miles: 30, route: "I-95" },
  { city: "Newark", state: "NJ", miles: 60, route: "NJ Tpk" },
  { city: "New York City", state: "NY", miles: 70, route: "I-95" },
  { city: "Harrisburg", state: "PA", miles: 110, route: "PA Tpk" },
  { city: "Baltimore", state: "MD", miles: 115, route: "I-95" },
  { city: "Washington", state: "DC", miles: 155, route: "I-95" },
  { city: "Hartford", state: "CT", miles: 175, route: "I-95 / I-91" },
  { city: "Richmond", state: "VA", miles: 260, route: "I-95" },
  { city: "Boston", state: "MA", miles: 275, route: "I-95" },
  { city: "Pittsburgh", state: "PA", miles: 305, route: "PA Tpk" },
  { city: "Columbus", state: "OH", miles: 470, route: "I-70" },
  { city: "Charlotte", state: "NC", miles: 520, route: "I-95 / I-85" },
];

/** Rough drive classification used only as a label on the board. */
export function driveLabel(miles: number) {
  return miles <= 500 ? "Within a day's drive" : "Multi-day";
}
