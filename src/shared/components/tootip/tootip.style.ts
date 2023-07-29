import styled from 'styled-components'

export const ContainerTootip = styled.div`
    position: relative;
    :hover {
        div {
            display: block;
        }
    }
`
export const ContainerExternal = styled.div`
    display: none;
    position: absolute;
    botton: -36px;
    padding: 4px;
    border-radius: 4px;
    background-color: rgba(0,0,0,0.4);
    z-index: 10
`