import styled from '@emotion/styled';

import space from 'app/styles/space';

const Heading = styled('h6')`
  margin: 0 !important;
  font-weight: 600;
`;

const Header = styled('div')`
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: ${space(0.5)};
  margin-bottom: ${space(2)};
`;

const Wrapper = styled('div')`
  margin-bottom: ${space(3)};
  display: grid;
  grid-gap: ${space(1)};
  justify-content: flex-start;
`;

export {Heading, Header, Wrapper};
