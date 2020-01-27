import React, { useState } from "react";
import styled from "styled-components";
import EventsFilter from "./EventsFilter";

import Card from "../styles/Card";

const EventsDisplay = styled(Card)`
  background: ${props => props.theme.gray0};
  max-width: 900px;
  box-shadow: none;
  margin-top: -2px;
  /* border-radius:  5px 5px 5px; */
`;
const DancerTabs = styled(Card)`
  display: flex;
  align-items: center;
  box-shadow: none;
  margin-bottom: 0;
  padding: 0;
  background: transparent;
`;
const Tab = styled.div`
    width: auto;
    max-width: 150px;
    min-width: 50px;
    border-radius: 5px 5px 0 0;
    margin: 0 1px 0 0;
    color: ${props =>
      props.active ? props.theme.highlightedText : props.theme.blackText};
    /* border-style: solid;
    border-color: ${props =>
      props.active ? props.theme.gray0 : "transparent"}; */
    /* border-width: ${props => (props.active ? `2px 2px 0 2px` : `0`)}; */
    background-color: ${props =>
      props.active ? props.theme.gray0 : props.theme.gray1};
    /* :hover {
      background-color: ${props => props.theme.gray1};
    } */
    button {
      background: inherit;
      margin: 0;
      overflow: hidden;
      /* text-overflow: ellipsis; */
      white-space: nowrap;
      width: 100%;
      :focus {
        outline: ${props => (props.active ? "none" : "auto")};
        background-color: ${props => props.theme.gray0};
        /* color: ${props => (props.active ? "inherit" : props.theme.teal9)}; */
      }
    }
  `;

const EventsContent = () => {
  const [eventFilter, setFilter] = useState({
    competitions: true,
    conventions: false,
    rehearsals: false,
    recital: false
  });

  return (
    <div>
      <EventsFilter eventFilter={eventFilter} setFilter={setFilter} />
      <EventsDisplay>
        {Object.keys(eventFilter).map(
          eventCategory =>
            eventFilter[eventCategory] && <p>show all {eventCategory}scaf</p>
        )}
      </EventsDisplay>
    </div>
  );
};

export default EventsContent;

{
  /* <div>
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
        </div> */
}
