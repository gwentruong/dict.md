import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Row, Col, Button, Input, Typography, Layout, Upload } from 'antd';
import { SearchOutlined, UploadOutlined} from '@ant-design/icons';
import marked from 'marked';

const App = () => {
  const [wordText, setWordText] = useState()
  const [definitionMD, setDefinitionMD] = useState();
  const [formatedMD, setFormatedMD] = useState();

  const header = 'Access-Control-Allow-Headers: *'

  const handleChange = (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
      let fileList = [...info.fileList]

      fileList.map(file => {
        if (file.response) {
          console.log('response', file.response)
          let rawString = definitionMD ? definitionMD : ""
          setDefinitionMD(rawString.concat(file.response))
        }
      })
    } else if (info.file.status === 'error') {
      console.error(`${info.file.name} file upload failed.`);
    }
  }

  const props = {
    name: "file",
    action: "http://127.0.0.1:8000/upload/",
    headers: {
      "Access-Control-Allow-Headers": '*'
    },
    onChange: handleChange
  }
  useEffect(() => {
    if (definitionMD) {
      let blockMD = {
        __html: marked(definitionMD, {sanitize: true})
      }
      setFormatedMD(blockMD)
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
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Upload .txt</Button>
            </Upload>
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
          <Layout.Content>
            <div id="md" dangerouslySetInnerHTML={formatedMD} />
          </Layout.Content>
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
