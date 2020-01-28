import React from "react";
import styled from "styled-components";
import Card from "../../components/styles/Card";
import DancerCard from "../../components/Parent/DancerCard";
import Link from "next/link";
import CreateDancerForm from "./CreateDancerForm";
const WelcomeMessage = styled(Card)``;

const Dancers = ({ hasDancers, dancers }) => {
  // if has dancers, show dancers cards
  if (hasDancers) {
    return (
      <>
        {dancers.map(dancer => (
          <DancerCard key={dancer.id} dancer={dancer} />
        ))}
      </>
    );
  }

  // if no dancers, show welcome and add dancer/browse studios
  if (!hasDancers) {
    return (
      <>
        <WelcomeMessage>
          <p>
            Welcome to Dancernotes! To begin, use the form below to add a Dancer
            to your account.
          </p>
          {/* <Link href="/parent/account/addDancer">
      <a>Add a Dancer</a>
      </Link> */}
        </WelcomeMessage>
        <CreateDancerForm />
      </>
    );
  }
};

export default Dancers;
