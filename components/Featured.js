import styled from 'styled-components'
import Center from './Center'

const Bg = styled.div`
  background-color: #222;
`

export default function Featured () {
  return (
    <Bg>
      <Center>
        <h1>Pro Anywhere</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt voluptates obcaecati cum aut, totam spernatur corpAAAA.</p>
      </Center>
    </Bg>
  )
}
