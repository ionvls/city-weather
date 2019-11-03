import styled from 'styled-components'

const PrimaryColor = '#1BB7BF'
const HoverColor = '#209aa0'

const Container = styled.div`
  padding-top: 3.2rem
`
const Button = styled.button`
  color: white;
  background-color: ${PrimaryColor};
  border-color: ${PrimaryColor};
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: ${HoverColor};
    border-color: ${HoverColor};
  }
`

export {
  Button,
  Container
}
