import React from 'react';
import styled from 'styled-components';
import getSymbolFromCurrency from 'currency-symbol-map';

const Input = styled.input`
  width: 100%;
  display: block;
  padding: 5px 7px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 7px;
  padding-left: ${({ $type }) => ($type === 'currency' ? '20px' : '7px')};
  margin: 0.6em 0;
  border-radius: 3px;
  border: 1px solid #a6a6a6;
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ${({ $style }) => $style ?? {}};
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
`;

const Message = styled.p`
  color: #a31616;
  margin-top: -7px;
  &:before {
    display: inline;
    content: '⚠ ';
  }
`;

const Wrapper = styled.div`
  position: relative;
`;

const Icon = styled.i`
  position: absolute;
  display: block;
  transform: translate(0, -50%);
  top: 50%;
  width: 25px;
  text-align: center;
  font-style: normal;
`;

const IconRight = styled(Icon)`
  right: 0;
`;

const RenderInput = ({
  placeholder,
  label,
  name,
  error,
  format,
  register,
  required,
  type = 'text',
}) => {
  const getValidation = () => {
    switch (type) {
      case 'alphanum':
        return {
          pattern: {
            value: /^[a-zA-Z0-9]*$/,
            message: 'should contain only alpha numeric',
          },
        };
      case 'alpha':
        return {
          pattern: {
            value: /^[A-Za-z]+$/,
            message: 'should contain only alphabhets',
          },
        };
      default:
        return null;
    }
  };

  const getType = () => {
    switch (type) {
      case 'alphanum':
        return 'text';
      case 'alpha':
        return 'text';
      case 'currency':
        return 'number';
      case 'percentage':
        return 'number';
      default:
        return type;
    }
  };

  const validation = { ...getValidation(), ...required };
  console.log(validation);

  const symbol = getSymbolFromCurrency(format);

  return (
    <>
      <Label>{label}</Label>
      <Wrapper>
        <Input
          name={name}
          $type={type}
          type={getType()}
          ref={register(validation)}
          placeholder={placeholder}
        ></Input>
        {type === 'currency' && <Icon>{symbol}</Icon>}
        {type === 'percentage' && <IconRight>%</IconRight>}
      </Wrapper>
      {error && <Message>{error.message}</Message>}
    </>
  );
};

export default RenderInput;
