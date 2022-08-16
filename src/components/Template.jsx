import React from 'react';
import styled from 'styled-components';


const Template = ({ children }) => {
	return (
		<Container>
			
			<Section>{children}</Section>
			
		</Container>
	);
};

const Container = styled.section``;
const Section = styled.section`
	min-height: calc(100vh - 440px);
	justify-content: center;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
export default Template;