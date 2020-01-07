import React, { useState } from "react";

import SubNavMainControlsLayout from "../../../components/SubNavMainControlsLayout";
import NotesSubNav from "../../../components/Parent/NotesSubNav";

const initialView = {
  all: true,
  comp: false,
  conv: false,
  rehearsal: false,
  recital: false,
  other: false
};

function EventsPage() {
  const [filter, setFilter] = useState({ initialView });
  const showComp = filter.all || filter.comp;
  const showConv = filter.all || filter.conv;
  const showRehearsal = filter.all || filter.rehearsal;
  const showRecital = filter.all || filter.recital;
  return (
    <>
      <NotesSubNav />
      <SubNavMainControlsLayout page="Events">
        <div>
          <ul>
            <li>
              <button onClick={() => setFilter((filter.all = !filter.all))}>
                All
              </button>
            </li>
            <li>
              <button onClick={() => setFilter((filter.comp = !filter.comp))}>
                Competitions
              </button>
            </li>
            <li>
              <button onClick={() => setFilter((filter.conv = !filter.conv))}>
                Conventions
              </button>
            </li>
            <li>
              <button
                onClick={() => setFilter((filter.recital = !filter.recital))}
              >
                Recital
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  setFilter((filter.rehearsal = !filter.rehearsal))
                }
              >
                Rehearsal
              </button>
            </li>
          </ul>
          {showComp && <div>Comp Cards</div>}
          {showConv && <div>Conv Cards</div>}
          {showRecital && <div>Recital Cards</div>}
          {showRehearsal && <div>Rehearsal Cards</div>}
        </div>
      </SubNavMainControlsLayout>
    </>
  );
}

export default EventsPage;
