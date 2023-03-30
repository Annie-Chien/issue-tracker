import { Avatar, Card, Col, Layout, Row, theme, Typography } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useEffect, useState } from 'react';
const { Title } = Typography;

const HomePage = () => {
  const [rerender, setRerender] = useState(false);
  const [issues, setIssues] = useState<any>();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    //localStorage
    if (codeParam && localStorage.getItem('accessToken') === null) {
      async function getAccessToken() {
        await fetch('http://localhost:4000/getAccessToken?code=' + codeParam, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.access_token) {
              localStorage.setItem('accessToken', data.access_token);
              setRerender(true);
            }
          });
      }
      getAccessToken();
    }
    getUserIssues();
  }, []);

  const getUserIssues = async () => {
    await fetch('http://localhost:4000/getUserIssues', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIssues(data);
        console.log(data);
      });
  };

  console.log(issues);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <h1 style={{ color: 'white' }}>Issue Tracker</h1>
        <button
          onClick={() => {
            localStorage.removeItem('accessToken');
            setRerender(!rerender);
          }}
        >
          log out
        </button>
      </Header>
      <Layout>
        <Sider
          style={{
            background: 'white',
            textAlign: 'center',
            padding: '2rem 0.5rem',
          }}
        >
          <Avatar
            style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}
            size="large"
            src={issues?.avatar_url}
          >
            U
          </Avatar>
          <Title level={3}>Annie Chien</Title>
        </Sider>
        <Content style={{ padding: '1rem' }}>
          <Row>
            {issues?.map((issue: any) => (
              <Col span={8} key={issue.id}>
                <Card title={issue.title} extra={<a href="#">More</a>}>
                  <p>{issue.body}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default HomePage;
