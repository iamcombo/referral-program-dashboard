import Header from '../../components/Header'
import { API_URL } from '../../config'
import { parseCookies } from '../../helper'
import Head from "next/head"
import styled from 'styled-components'
import { Table } from 'antd'

export default function Details({ data }) {
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => {
        return (
          <span style={{wordBreak: 'break-all', color: 'blue'}}>{email}</span>
        )
      }
    },
    {
      title: 'Wallet',
      key: 'wallet',
      dataIndex: 'wallet',
      render: (wallet) => {
        return (
          <span style={{wordBreak: 'break-all', color: 'blue'}}>{wallet}</span>
        )
      }
    },
    {
      title: 'Session',
      dataIndex: 'session',
      key: 'session',
      render: (session) => {
        return (
          <span style={{color: 'blue'}}>{session}</span>
        )
      }
    },
  ];

  return (
    <div>
      <Head>
        <title>Details</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Header/>
      <Container>
        <DetailContainer>
          <div style={{padding: '1em 0'}}/>
          <Table columns={columns} dataSource={data} rowKey={record => record._id} />
        </DetailContainer>
      </Container>
    </div>
  )
}

export const getServerSideProps = async ({ query: { id }, req }) => {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/airdrop/get/userReferred/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json();
  
  return {
    props: {
      data: data.data,
    }
  }
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #e2f3f5;
`
const DetailContainer = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  @media (max-width: 56rem) {
    padding: 0 1em;
  } 
`