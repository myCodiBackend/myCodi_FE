import React from "react";
import styled from "styled-components";

const GlobalLayout = ({ children }) => {
  return (
    <div>
      <StGlobalLayout>{children}</StGlobalLayout>
    </div>
  );
};

const StGlobalLayout = styled.div`
  max-width: 1400px;
  min-width: 800px;
  margin: 0 auto;
  padding: 24px;
  box-sizing: border-box;
  position: relative;
  background-color: #d8eefe;
`;

export default GlobalLayout;
