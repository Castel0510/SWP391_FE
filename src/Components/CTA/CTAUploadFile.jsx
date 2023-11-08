import * as React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import { useMutation } from 'react-query';
import { CloudUpload } from 'akar-icons';
import { Typography, Upload } from 'antd';
import axios from 'axios';

const { Paragraph } = Typography;

const { Dragger } = Upload;

const CTAUploadFile = ({ description }) => {
    const [currentUrl, setCurrentUrl] = React.useState('');

    const v1UploadFile = async (file) => {
        const url = 'https://api.monoinfinity.net/api/v1/upload-file/upload';
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post(url, formData, {
            headers: {
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQwNzdkN2ZlLTI4MGUtZWRiYi1kYzVkLWJjNTY0ZmQ1ZTQ2YyIsInR5cGUiOiJBVVRIIiwiZXhwaXJlZEF0IjoxNzAxOTAxNDk3NzA2LCJpYXQiOjE2OTkzMDk0OTd9.KUI2QvbC2mKcOC8Up5iOJQ3Pqs4p_BDS0CEx-RihA1A',
            },
        });
        return res.data.fileLocation;
    };

    const uploadMutation = useMutation(
        (file) => {
            return v1UploadFile(file);
        },
        {
            onSuccess: (data) => {
                setCurrentUrl(data);
            },
        }
    );

    return (
        <div className="flex flex-col w-full">
            <Dragger
                action={async (file) => {
                    const url = await uploadMutation.mutateAsync(file);

                    return url;
                }}
                showUploadList={false}
            >
                {uploadMutation.isLoading ? (
                    <>
                        <LoadingOutlined rev="" />{' '}
                    </>
                ) : (
                    <div className="p-4">
                        <p className="flex items-center justify-center ant-upload-drag-icon">
                            <CloudUpload strokeWidth={2} size={36} />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">{description}</p>
                    </div>
                )}
            </Dragger>
            {currentUrl && <Paragraph copyable={{ text: currentUrl }}>{currentUrl}</Paragraph>}
        </div>
    );
};

export default CTAUploadFile;
