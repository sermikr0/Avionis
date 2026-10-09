import { Container } from "@/components/ui/container";
import { driveLabel, lanes } from "@/content/lanes";
import { cn } from "@/lib/cn";

/**
 * Departure-board style table of highway distances from Morrisville, PA.
 * Rows drop in one after another on load (CSS only).
 */
export function LaneBoard() {
  return (
    <section
      aria-labelledby="lane-board-title"
      className="on-dark border-y border-white/10 bg-night-800 text-paper"
    >
      <Container className="py-14 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-accent-400">[ Departures ]</p>
            <h2 id="lane-board-title" className="display mt-4 text-4xl text-paper sm:text-5xl">
              From Morrisville, PA
              <span className="ml-1 inline-block h-[0.8em] w-[0.08em] translate-y-[0.1em] animate-blink bg-accent-600 align-baseline" aria-hidden="true" />
            </h2>
          </div>
          <p className="max-w-sm font-mono text-[12px] uppercase leading-relaxed tracking-[0.12em] text-paper/50">
            Approximate highway miles. Geography, not a transit promise — ask us for a real quote.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse font-mono text-[13px] uppercase tracking-[0.08em]">
            <thead>
              <tr className="border-b border-paper/15 text-left text-[11px] text-paper/45">
                <th scope="col" className="py-3 pr-4 font-medium">Destination</th>
                <th scope="col" className="py-3 pr-4 font-medium">State</th>
                <th scope="col" className="py-3 pr-4 text-right font-medium">Miles</th>
                <th scope="col" className="py-3 pr-4 font-medium">Route</th>
                <th scope="col" className="py-3 font-medium">Drive</th>
              </tr>
            </thead>
            <tbody>
              {lanes.map((lane, index) => {
                const dayTrip = lane.miles <= 500;
                return (
                  <tr
                    key={`${lane.city}-${lane.state}`}
                    className="group animate-board border-b border-paper/10 transition-colors hover:bg-night-900"
                    style={{ animationDelay: `${120 + index * 70}ms` }}
                  >
                    <td className="py-3.5 pr-4 text-paper">{lane.city}</td>
                    <td className="py-3.5 pr-4 text-paper/70">{lane.state}</td>
                    <td className="py-3.5 pr-4 text-right tabular-nums text-paper">{lane.miles}</td>
                    <td className="py-3.5 pr-4 text-paper/70">{lane.route}</td>
                    <td className="py-3.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-2",
                          dayTrip ? "text-accent-400" : "text-paper/60",
                        )}
                      >
                        <span
                          className={cn("h-1.5 w-1.5 rounded-full", dayTrip ? "bg-accent-500" : "bg-night-900")}
                          aria-hidden="true"
                        />
                        {driveLabel(lane.miles)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
