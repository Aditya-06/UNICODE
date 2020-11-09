import React, { Fragment, useState } from 'react';
import { Container, Button } from '@material-ui/core';
import Axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Upload() {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await Axios.post('http://localhost:5000/upload', formData, {
        headers: {
          Content: 'multipart/form-data',
        },
        onDownloadProgress: (ProgressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round(ProgressEvent.loaded * 100) / ProgressEvent.total
            )
          );
          setTimeout(() => {
            setUploadPercentage(0);
          }, 10000);
        },
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage('Photo Upload Was Successful!');
      toast.success('File Uploaded Successfuly!');
    } catch (err) {
      if (err.response.status === 500) {
        console.log('Server Error');
        setMessage('Server Error!');
        toast.error('Server Error!');
      } else {
        console.log(err.response.data.msg);
        setMessage(err.response.data.msg);
        toast.warn('Warning!');
      }
    }
  };

  return (
    <Container>
      <h4 className='text-center mb-4'>Upload Profile Picture</h4>
      <Fragment>
        <ToastContainer draggable={false} transition={Zoom} autoClose={8000} />
        {uploadPercentage !== 0 ? (
          <LinearProgress
            variant='determinate'
            value={uploadPercentage}
            className='mb-4'
          />
        ) : null}
        <form onSubmit={onSubmit}>
          <div className='custom-file'>
            <input
              type='file'
              className='custom-file-input'
              id='customFile'
              onChange={onChange}
            />
            <label className='custom-file-label' htmlFor='customFile'>
              {fileName}
            </label>
          </div>
          <Button variant='contained' color='primary' type='submit'>
            Submit
          </Button>
        </form>
        {uploadedFile ? (
          <div>
            <Container maxwidth='xs'>
              <h3>{uploadedFile.fileName}</h3>
              <img src={uploadedFile.filePath} alt='' />
            </Container>
          </div>
        ) : null}
      </Fragment>
    </Container>
  );
}
