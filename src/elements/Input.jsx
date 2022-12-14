import React from 'react';
import styled from 'styled-components';
import Text from './Text';

const Input = (props) => {
	const {
		hei,
		type,
		label,
		placeholder,
		multiLine,
		_onChange,
		_value,
		_onKeyPress,
	} = props;

	if (multiLine) {
		return (
			<React.Fragment>
				{label && <Text margin='20px 5px 10px 0'>{label}</Text>}
				<TextArea
					placeholder={placeholder}
					rows={20}
					onChange={_onChange}
					value={_value}
				/>
			</React.Fragment>
		);
	}

	return (
		<React.Fragment>
			{label && <Text margin='20px 5px 5px 0'>{label}</Text>}
			<NormalInput
				hei={hei}
				type={type}
				placeholder={placeholder}
				onChange={_onChange}
				value={_value}
				onKeyPress={_onKeyPress}
			/>
		</React.Fragment>
	);
};

Input.defaultProps = {
	label: false,
	type: 'text',
	placeholder: '',
	multiLine: false,
	_onChange: () => {},
	_onKeyPress: () => {},
};

const NormalInput = styled.input`
	height: ${(props) => props.hei};
	border: 1px solid #c4c4c4;
	border-radius: 4px;
	width: 200px;
	padding: 8px 8px;
	box-sizing: border-box;
	display: block;
	margin-top: 15px;
	&:focus {
		outline: none;
		border: 1px solid #ff7776;
	}
`;

const TextArea = styled.textarea`
	border: 1px solid #c4c4c4;
	border-radius: 4px;
	width: 100%;
	padding: 8px 8px;
	box-sizing: border-box;
	resize: none;
	overflow: auto;
	margin-top: 15px;
	&:focus {
		outline: none;
		border: 1px solid #ff7776;
	}
`;

export default Input;