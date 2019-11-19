import React from "react";
import Link from "next/link";
import styled from "styled-components";

import Card from "../../components/styles/Card";

const ModalNav = styled.nav`
  display: flex;
  flex-direction: column;
`;

const EventsLinksModal = () => {
  return (
    <Card>
      <ModalNav>
        <Link href="/parent/notes/competitions">
          <a>Competitions</a>
        </Link>
        <Link href="/parent/notes/conventions">
          <a>Conventions</a>
        </Link>
        <Link href="#">
          <a>Rehearsals</a>
        </Link>
        <Link href="#">
          <a>Recital</a>
        </Link>
      </ModalNav>
    </Card>
  );
};
export default EventsLinksModal;
