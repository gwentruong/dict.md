import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Row, Col, Button, Input, Typography, Layout } from 'antd';
import { SearchOutlined, UploadOutlined} from '@ant-design/icons';

const App = () => {
  const [wordText, setWordText] = useState()
  const [definitionMD, setDefinitionMD] = useState();
  const header = 'Access-Control-Allow-Headers: *'

  useEffect(() => {
    if (!definitionMD) {
      axios.get('http://127.0.0.1:8000/md', {header: header})
        .then(
          res => {
            console.log('res', res.data)
            setDefinitionMD(res.data)
          },
          err => {
            console.error(err)
          }
        )
    }
  }, [definitionMD])

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Layout.Header style={{ textAlign: 'center', backgroundColor: '#FFF' }}>
            <Typography.Title>Dict.md</Typography.Title>
          </Layout.Header>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12} offset={6}>
          <Input.TextArea rows={4} />
        </Col>
        <Col span={6}>
          <Row>
            <Button icon={<SearchOutlined />}>Search</Button>
          </Row>
          <Row>
            <Button icon={<UploadOutlined />}>Upload .txt</Button>
          </Row>
        </Col>
      </Row>
      <Row gutter={16} justify="space-between">
        <Col flex={2}>
          <Input.TextArea
            className="code"
            rows={10} 
            placeholder="Edit .md" 
            value={definitionMD} />
        </Col>
        <Col flex={3}>
          <Layout.Content> Content</Layout.Content>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Layout.Footer style={{ textAlign: 'center', backgroundColor: '#FFF'  }}>Uyen Truong, Yifan Yu ©2021</Layout.Footer>
        </Col>
      </Row>
    </>
  );
}

export default App;
