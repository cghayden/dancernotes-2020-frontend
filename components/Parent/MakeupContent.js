import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Card from "../styles/Card";
import Loading from "../Loading";
import Error from "../Error";
import StudioMakeup from "./StudioMakeup";

function MakeupContent({ studios }) {
  if (studios.length > 0) {
    return (
      <>
        {studios.map(studio => (
          <StudioMakeup studio={studio} key={studio.id} />
        ))}
      </>
    );
  }

  return <div>There Are No Makeup Sets to Display</div>;
  // compileMakeupSets = allRoutines => {
  //   const makeup = {};
  //   for (const dance of allRoutines) {
  //     if (dance.makeupSet) {
  //       const setName = dance.makeupSet.name;
  //       if (!makeup.hasOwnProperty(setName)) {
  //         const applyTo = [];
  //         applyTo.push(dance.name);
  //         dance.makeupSet.applyTo = applyTo;
  //         makeup[setName] = dance.makeupSet;
  //       } else {
  //         makeup[setName].applyTo.push(dance.name);
  //       }
  //     }
  //   }
  //   const makeupArray = Object.values(makeup);
  //   return makeupArray;
  // };

  // const makeup = this.compileMakeupSets(allRs);
}

export default MakeupContent;
// if (makeup.length < 1) {
//   return (
//     <Card>
//       <div className="card__section">
//         <p>
//           At this time, no Makeup guidelines are present for any of
//           the studios your dancers are enrolled in.
//         </p>
//         <p>
//           You can add your own notes in the details for any dance.
//         </p>
//       </div>
//     </Card>
//   );
// }
// return (
//   <>
//     {makeup.map((makeupSet, index) => {
//       return (
//         <Card key={index}>
//           <h2>{makeupSet.name}</h2>
//           <ul>
//             <li>Lipstick: {makeupSet.lipstick}</li>
//             <li>Eye Shadow: {makeupSet.eyeShadow}</li>
//           </ul>
//           <h3>Applies To:</h3>
//           <ul>
//             {makeupSet.applyTo.map(dance => (
//               <li key={dance}>{dance}</li>
//             ))}
//           </ul>
//         </Card>
//       );
//     })}
//   </>
// );
// }}
// </Query>
