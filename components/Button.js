import styled, { css } from 'styled-components'

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  svg{
    height: 16px;
    margin-right: 5px;
  }
  ${props => props.$white && !props.$outline && css`
    background-color: #fff;
    color: #000;
  `}
  ${props => props.$white && props.$outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  `}
  ${props => props.$primary && css`
    background-color: #5542F6;
    color: #fff;
    border: 1px solid #5542F6;
  `}
`

const StyledButton = styled.button`
  ${ButtonStyle}
`

const Button = (props) => {
  return (
    <StyledButton {...props}>{props.children}</StyledButton>
  )
}

export default Button
