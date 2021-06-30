import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Row, Col, Button, Input, Typography, Layout, Upload, Spin} from 'antd';
import { SearchOutlined, UploadOutlined, DownloadOutlined} from '@ant-design/icons';
import marked from 'marked';

// var markdownpdf = require("markdown-pdf")

const App = () => {
  const [wordText, setWordText] = useState()
  const [definitionMD, setDefinitionMD] = useState();
  const [formatedMD, setFormatedMD] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const header = 'Access-Control-Allow-Headers: *'

  const handleChange = (info) => {
    if (info.file.status !== 'uploading') {
      setIsLoading(true)
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
      let fileList = [...info.fileList]

      fileList.map(file => {
        if (file.response) {
          let rawString = definitionMD ? definitionMD : ""
          setDefinitionMD(rawString.concat(file.response))
        }
        return definitionMD
      })
      setIsLoading(false)
    } else if (info.file.status === 'error') {
      console.error(`${info.file.name} file upload failed.`);
    }
  }

  const loadFileContent = (file) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      let rawText = wordText ? wordText : ""
      setWordText(rawText.concat(e.target.result))
    }

    reader.readAsText(file)
    return true
  }

  const searchText = () => {
    setIsLoading(true)
    let body = {
      text: wordText
    }
    
    axios.post("http://127.0.0.1:8000/uploadtext/", body, {header: header})
        .then(
          res => {
            setDefinitionMD(res.data)
            setIsLoading(false)
          },
          err => {
            console.error(err)
          }
        )
  }

  const downloadMD = () => {
    const blob = new Blob([definitionMD], {type: "text/plain"})
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dict-result.md";
    a.click();
  }

  // const downloadPDF = () => {
  //   markdownpdf().from.string(definitionMD).to.buffer
  // }

  const props = {
    name: "file",
    action: "http://127.0.0.1:8000/upload/",
    headers: {
      "Access-Control-Allow-Headers": '*'
    },
    onChange: handleChange,
    accept: ".txt",
    beforeUpload: loadFileContent,
    showUploadList: false
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
          <Input.TextArea 
            placeholder="Separate each word by new line" 
            rows={4} 
            value={wordText}
            onChange={(e) => setWordText(e.target.value)} />
        </Col>
        <Col span={6}>
          <Row>
            <Button
              className="but" 
              icon={<SearchOutlined />}
              onClick={searchText}
              shape="round">
                Search
            </Button>
          </Row>
          <Row>
            <Upload {...props}>
              <Button className="but" icon={<UploadOutlined />} shape="round">Upload .txt</Button>
            </Upload>
          </Row>
        </Col>
      </Row>
      <Row gutter={16} justify="space-between">
        <Col span={11}>
          <Input.TextArea
            className="code"
            rows={21} 
            placeholder="Edit .md"
            onChange={e => setDefinitionMD(e.target.value)}
            value={definitionMD} />
          {definitionMD ?
                <Row>
                  <Col>
                    <Button 
                      className="but" 
                      icon={<DownloadOutlined />} 
                      onClick={downloadMD} 
                      shape="round">
                        Download .md
                    </Button>
                  </Col>
                </Row> 
          : null}
        </Col>
        <Col span={13}>
          {isLoading ?
              <div className="spinner"><Spin size="large" /></div>
          :
            <Layout.Content>
              <div className="render-text" id="md" dangerouslySetInnerHTML={formatedMD} />
            </Layout.Content>}
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Layout.Footer className="footer">UI by Uyen Truong, Engine by Yifan Yu and Free Dictionary API ©2021</Layout.Footer>
        </Col>
      </Row>
    </>
  );
}

export default App;
