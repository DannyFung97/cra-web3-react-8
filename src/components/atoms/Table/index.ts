import styled, { css } from 'styled-components'
import { GeneralProps, GeneralCss } from '../../general'
import { GeneralTextProps, GeneralTextCss } from '../Text'
import { Text3Css } from '../Text/fonts'
import { Z_TABLE } from '../../../constants/'

interface TableProps extends GeneralTextProps, GeneralProps {
  headers?: string[]
  inheritBg?: boolean
}

interface TableHeadProps {
  zIndex?: number
  sticky?: boolean
  translation?: number
}

export const Table = styled.table<TableProps>`
  width: 100%;
  border-spacing: 0px 10px;
  th,
  td {
    ${GeneralTextCss}
  }
  ${GeneralCss}
`

export const TableRow = styled.tr<TableProps>`
  ${(props) => {
    let stuff = css``
    if (props.inheritBg) {
      stuff = css`
        background-color: inherit;
        td {
          background-color: inherit;
        }
      `
    } else {
      stuff = css`
        background-color: ${props.theme.backgroundInteractive};
        td {
          background-color: ${props.theme.backgroundInteractive};
        }
      `
    }

    return css`
      ${stuff}
      th,
  td {
        ${GeneralTextCss}
      }
    `
  }}
`

export const TableBody = styled.tbody``

export const TableHead = styled.thead<TableHeadProps>`
  ${(props) =>
    props.sticky &&
    `
    position: sticky;
    transform: translateY(-${props.translation ?? 7}px);
    top: ${props.translation ?? 7}px;
    background-color: ${props.theme.background};
    z-index: ${props.zIndex ? props.zIndex : `${Z_TABLE}`};
    th {
      padding-top: 20px;
    }
  `};
`

export const TableFoot = styled.tfoot<TableHeadProps>`
  ${(props) =>
    props.sticky &&
    `
    position: sticky;
    transform: translateY(${props.translation ?? 7}px);
    bottom: ${props.translation ?? 7}px;
    background-color: ${props.theme.background};
    z-index: ${props.zIndex ? props.zIndex : `${Z_TABLE}`};
    th {
      padding-bottom: 20px;
    }
  `};
`

export const TableHeader = styled.th<TableProps>`
  ${(props) => props.width && `max-width: ${props.width}px !important`};
  padding: 4px 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  white-space: nowrap;
  ${Text3Css}
  ${GeneralTextCss}
  ${GeneralCss}
`

export const TableData = styled.td<TableProps>`
  ${(props) => props.width && `max-width: ${props.width}px !important`};
  padding: 14px 18px;
  &:first-child {
    border-radius: 10px 0 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }
  &:first-child:last-child {
    border-radius: 10px;
  }
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 16px;
  ${GeneralTextCss}
  ${GeneralCss}
`
