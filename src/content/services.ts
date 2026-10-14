import {
  Boxes,
  CalendarRange,
  Container,
  Gauge,
  Route,
  type LucideIcon,
} from "lucide-react";

/**
 * Service catalog — proposed categories for a carrier of this type. Confirm
 * with Asia Prime Inc. which are actually offered before launch; every services
 * section reads from this list.
 */
export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string[];
  suitedFor: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    slug: "dry-van-truckload",
    title: "Dry van truckload",
    short:
      "A 53-foot dry van dedicated to your freight alone: loaded once, sealed, and delivered without transfers.",
    description: [
      "Truckload is the simplest way to move freight that fills a trailer or should not share one. Your shipment is the only thing on board, which keeps handling to a minimum and makes the schedule easy to plan around.",
      "We confirm pickup and receiving details before dispatch, so the plan we file is the plan the driver runs.",
    ],
    suitedFor: [
      "Palletized freight of roughly ten pallets or more",
      "Firm delivery appointments",
      "Product that should not be re-handled",
    ],
    icon: Container,
  },
  {
    slug: "partials",
    title: "Partials & consolidated",
    short:
      "Trailer space for a few pallets when a full truck is more than you need, priced for what you ship.",
    description: [
      "Partial loads share a trailer with compatible freight moving in the same direction. It keeps cost in line with volume while avoiding the extra terminals of a traditional LTL network.",
      "Good packaging and accurate dimensions matter more here; we will ask for both when quoting.",
    ],
    suitedFor: [
      "Two to ten pallets",
      "Flexible pickup and delivery windows",
      "Freight that can ride with other shipments",
    ],
    icon: Boxes,
  },
  {
    slug: "long-haul",
    title: "Cross-country",
    short:
      "Interstate long-haul planned around hours-of-service, weather and the receiver's dock schedule.",
    description: [
      "For freight headed to the Midwest, the Southeast or the West Coast, the delivery date we give you is the one we expect to meet: it is built from driver hours and real transit, not optimism.",
      "You hear from us when the load is picked up, if anything changes en route, and when it delivers.",
    ],
    suitedFor: [
      "Multi-day transits with scheduled delivery",
      "Plant-to-warehouse and warehouse-to-customer moves",
      "Freight beyond a day's drive",
    ],
    icon: Route,
  },
  {
    slug: "dedicated",
    title: "Dedicated capacity",
    short:
      "Trucks assigned to your lanes on a fixed schedule, so capacity is settled before the week begins.",
    description: [
      "Dedicated arrangements reserve capacity for shippers with consistent volume. Lanes, pickup windows and receiving requirements are agreed up front and repeat each cycle.",
      "Fewer surprises at the dock, one point of contact, and a driver who already knows your product.",
    ],
    suitedFor: [
      "Weekly or daily lanes with steady volume",
      "Scheduled distribution routes",
      "Shippers who want a consistent crew",
    ],
    icon: CalendarRange,
  },
  {
    slug: "expedited",
    title: "Time-definite & expedited",
    short:
      "For deliveries with no slack in the window: direct dispatch, continuous movement and a confirmed ETA.",
    description: [
      "Some freight has a date that cannot move: a production line, a trade show, a contractual delivery. Expedited service means the truck leaves when the freight is ready and runs direct.",
      "We tell you up front whether the window is realistic, then keep you updated until the proof of delivery is in your inbox.",
    ],
    suitedFor: [
      "Fixed delivery windows",
      "Line-down and recovery shipments",
      "High-value freight that needs continuous attention",
    ],
    icon: Gauge,
  },
];
